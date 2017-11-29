import os

import flask_whooshalchemyplus as whooshalchemy
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from flask_restless import APIManager
from flask_restless.views import API, get_relations
from flask_sqlalchemy import SQLAlchemy

from config import ProdConfig, LocalDevConfig, REACT_DIR, BASE_DIR

app = Flask(__name__, static_folder="../build/static")
CORS(app)

# Get configuration based on whether on local machine or production
if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
    app.config.from_object(ProdConfig)
else:
    app.config.from_object(LocalDevConfig)

# Search index folder
app.config['WHOOSH_BASE'] = os.path.join(BASE_DIR, 'whoosh_index')

db = SQLAlchemy(app)
from models import Actor, Character, ComicSeries, Event, Movie, TvShow

models_list = [Actor, Character, ComicSeries, Event, Movie, TvShow]

# Creates tables
db.create_all()
for model in models_list:
    whooshalchemy.whoosh_index(app, model)

# Create the Flask-Restless API manager.
manager = APIManager(app, flask_sqlalchemy_db=db)

# Flask-Restless config
kwargs = {
    'methods': frozenset(['GET', 'POST', 'PATCH']),
    'allow_functions': True,
    'results_per_page': 6}

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
for model in models_list:
    manager.create_api(model, **kwargs)


# Search endpoint template, fill in model to create response for that model
def make_search_response(model):
    search_query = request.args.get('query')
    q = model.query.whoosh_search(search_query)
    # Use Flask-restless' mechanism for generating responses from SQLAlchemy models
    api = API(db.session, model)
    deep = dict((r, {}) for r in get_relations(model))
    return jsonify(api._paginated(q, deep))


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


@app.route('/api/search/comic_series')
def search_series():
    return make_search_response(ComicSeries)


@app.route('/api/search/event')
def search_event():
    return make_search_response(Event)


@app.route('/vis')
def show_visualization():
    vis_dir = os.path.join(BASE_DIR, 'visualization')
    return send_from_directory(vis_dir, 'index.html')


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
