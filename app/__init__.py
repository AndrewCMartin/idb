import math
import os

import flask_whooshalchemyplus as whooshalchemy
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from flask_restless import APIManager
from flask_sqlalchemy import SQLAlchemy

from config import ProdConfig, LocalDevConfig, REACT_DIR

app = Flask(__name__, static_folder="../build/static")
CORS(app)

if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
    app.config.from_object(ProdConfig)
else:
    app.config.from_object(LocalDevConfig)

app.config['WHOOSH_BASE'] = './whoosh_index'

db = SQLAlchemy(app)
from models import Actor, Character, ComicSeries, Event, Movie, TvShow

models_list = [Actor, Character, ComicSeries, Event, Movie, TvShow]

db.create_all()
for model in models_list:
    whooshalchemy.whoosh_index(app, model)

# Create the Flask-Restless API manager.
manager = APIManager(app, flask_sqlalchemy_db=db)

# Flask-Restless config
kwargs = {
    'methods': frozenset(['GET', 'POST', 'PATCH']),
    'allow_functions': True,
    'results_per_page': 50}

# index_all(app)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
for model in models_list:
    manager.create_api(model, **kwargs)


@app.route('/api/search')
def search():
    results_per_page = int(request.args.get('results_per_page') or '6')
    page = int(request.args.get('page') or '1')
    search_query = request.args.get('query')

    response = {'num_results': 0, 'objects': [], 'page': 1, 'total_pages': 0}


def make_search_response(model):
    results_per_page = int(request.args.get('results_per_page') or '6')
    page = int(request.args.get('page') or '1')
    search_query = request.args.get('query')

    num_results = 0
    response = {'num_results': 0, 'objects': [], 'page': page, 'total_pages': 0}

    results = model.query.whoosh_search(search_query).all()
    response['total_pages'] = int(math.ceil(len(results) / float(results_per_page)))

    start_index = (page - 1) * results_per_page
    end_index = min(start_index + results_per_page, len(results))

    for i in range(start_index, end_index):
        a = results[i]
        d = {k: a.__dict__[k] for k in a.__dict__ if not k.startswith("_") and k != "birthday"}
        response['objects'].append(d)

    response['num_results'] = len(results)
    return jsonify(response)


@app.route('/api/search/actor')
def search_actor():
    return make_search_response(Actor)


@app.route('/api/search/movie')
def search_movie():
    return make_search_response(Movie)


@app.route('/api/search/character')
def search_character():
    return make_search_response(Character)


@app.route('/api/search/tvshow')
def search_tvshow():
    return make_search_response(TvShow)


@app.route('/api/search/series')
def search_series():
    return make_search_response(ComicSeries)


@app.route('/api/search/event')
def search_event():
    return make_search_response(Event)


# @app.route('/api/search/multi')
# def search_multi():




# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # return send_from_directory(REACT_DIR, 'index.html')
    if path == "":
        return send_from_directory(REACT_DIR, 'index.html')
    else:
        if os.path.exists(os.path.join(REACT_DIR, path)):
            return send_from_directory(REACT_DIR, path)
        else:
            return send_from_directory(REACT_DIR, 'index.html')
