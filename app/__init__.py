import os

from flask import Flask
from flask_restless_swagger import SwagAPIManager as APIManager
from flask_sqlalchemy import SQLAlchemy

from config import ProdConfig, LocalDevConfig

app = Flask(__name__, static_url_path="/build", static_folder="../build")

if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
    app.config.from_object(ProdConfig)
else:
    app.config.from_object(LocalDevConfig)

db = SQLAlchemy(app)

from models import Actor, Character, ComicSeries, Event, Movie, TvShow


# Create the Flask-Restless API manager.
manager = APIManager(app, flask_sqlalchemy_db=db)

# Flask-Restless config
kargs = {'methods': frozenset(['GET', 'POST', 'PATCH']),
         'allow_functions': True}

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(Actor, **kargs)
manager.create_api(Character, **kargs)
manager.create_api(ComicSeries, **kargs)
manager.create_api(Event, **kargs)
manager.create_api(Movie, **kargs)
manager.create_api(TvShow, **kargs)

db.create_all()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return app.send_static_file('index.html')
