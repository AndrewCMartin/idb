# From https://github.com/mbr/flask-bootstrap/blob/master/sample_app/__init__.py

from flask import Flask
from flask_bootstrap import Bootstrap

from frontend import frontend
from nav import nav

def create_app():
	app = Flask(__name__)
	Bootstrap(app)
	nav.init_app(app)
	return app