from flask import Flask
from flask_restless_swagger import SwagAPIManager as APIManager
from flask_sqlalchemy import SQLAlchemy
from config import ProdConfig, LocalDevConfig
import os

app = Flask(__name__)

if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
    app.config.from_object(ProdConfig)
else:
    app.config.from_object(LocalDevConfig)

db = SQLAlchemy(app)

from models import Actor, Character, ComicSeries, Event, Movie, TvShow


# Create the Flask-Restless API manager.
manager = APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(models.Actor, methods=['GET', 'POST'])
manager.create_api(models.Character, methods=['GET'])
manager.create_api(models.ComicSeries, methods=['GET'])
manager.create_api(models.Event, methods=['GET'])
manager.create_api(models.Movie, methods=['GET'])
manager.create_api(models.TvShow, methods=['GET'])


db.create_all()
