from flask import Flask, Blueprint, render_template, abort, url_for
from jinja2 import TemplateNotFound

from flask_bootstrap import Bootstrap
from flask_nav import Nav
from flask_nav.elements import Navbar, View

from flask_restplus import Api

from __init__ import create_app
from frontend import frontend

app = create_app()
app.register_blueprint(frontend)
api = Api(app)
