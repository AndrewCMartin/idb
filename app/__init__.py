# From https://github.com/mbr/flask-bootstrap/blob/master/sample_app/__init__.py

from flask import Flask
import flask_restless


from models import *

def create_app():
    app = Flask(__name__)
    # Create the Flask-Restless API manager.
    manager = flask_restless.APIManager(app, flask_sqlalchemy_db=models.db)

    # Create API endpoints, which will be available at /api/<tablename> by
    # default. Allowed HTTP methods can be specified as well.
    manager.create_api(models.Actor, methods=['GET'])
    manager.create_api(models.Character, methods=['GET'])
    manager.create_api(models.ComicSeries, methods=['GET'])
    manager.create_api(models.Event, methods=['GET'])
    manager.create_api(models.Movie, methods=['GET'])
    manager.create_api(models.TvShow, methods=['GET'])

    return app
