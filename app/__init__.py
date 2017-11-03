import os

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_restless import APIManager
# from flask_whooshalchemyplus import index_all
from flask_sqlalchemy import SQLAlchemy

from config import ProdConfig, LocalDevConfig, REACT_DIR

app = Flask(__name__, static_folder="../build/static")

CORS(app)

if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
    app.config.from_object(ProdConfig)
else:
    app.config.from_object(LocalDevConfig)

db = SQLAlchemy(app)
from models import Actor, Character, ComicSeries, Event, Movie, TvShow
# Create the Flask-Restless API manager.
manager = APIManager(app, flask_sqlalchemy_db=db)

# Flask-Restless config
kargs = {
    'methods': frozenset(['GET', 'POST', 'PATCH']),
    'allow_functions': True,
    'results_per_page': 50}

# index_all(app)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(Actor, **kargs)
manager.create_api(Character, **kargs)
manager.create_api(ComicSeries, **kargs)
manager.create_api(Event, **kargs)
manager.create_api(Movie, **kargs)
manager.create_api(TvShow, **kargs)


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
