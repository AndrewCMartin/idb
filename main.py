from flask import Flask, Blueprint, render_template, abort
from jinja2 import TemplateNotFound

from flask_bootstrap import Bootstrap
from flask_nav import Nav
from flask_nav.elements import Navbar, View

from __init__ import create_app
from frontend import frontend

app = create_app()
app.register_blueprint(frontend)


# @app.route('/', defaults={'page': 'index.html'})
# @app.route('/<page>')
# def show(page):
#     if page.endswith('.html'):
#         try:
#             return render_template('%s' % page)
#         except TemplateNotFound:
#             abort(404)

# @app.route('/vendor/<path>')
# def vendor(path):
# 	send_from_directory('./vendor/',path)
