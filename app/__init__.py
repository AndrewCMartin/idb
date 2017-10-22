# From https://github.com/mbr/flask-bootstrap/blob/master/sample_app/__init__.py

from flask import Flask
from flask_restless_swagger import SwagAPIManager as APIManager


from models import *

def create_app():
    app = Flask(__name__)
    # Create the Flask-Restless API manager.
    manager = APIManager(app, flask_sqlalchemy_db=models.db)

    # Create API endpoints, which will be available at /api/<tablename> by
    # default. Allowed HTTP methods can be specified as well.
    manager.create_api(models.Actor, methods=['GET', 'POST'])
    manager.create_api(models.Character, methods=['GET'])
    manager.create_api(models.ComicSeries, methods=['GET'])
    manager.create_api(models.Event, methods=['GET'])
    manager.create_api(models.Movie, methods=['GET'])
    manager.create_api(models.TvShow, methods=['GET'])
    models.db.create_all()
    return app
