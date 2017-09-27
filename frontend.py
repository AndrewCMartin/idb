
# This contains our frontend; since it is a bit messy to use the @app.route
# decorator style when using application factories, all of our routes are
# inside blueprints. This is the front-facing blueprint.
#
# You can find out more about blueprints at
# http://flask.pocoo.org/docs/blueprints/

from flask import Blueprint, render_template, flash, redirect, url_for
from nav import nav
import json

frontend = Blueprint('frontend', __name__)



# Our index-page just shows a quick explanation. Check out the template
# "templates/index.html" documentation for more details.
@frontend.route('/')
def index():
    return render_template('index.html')

@frontend.route('/<page>')
def show(page):
    if page == 'tvshows.html':
        shows_list = []
        with open('./static/tv_response.json') as static_response_file:
            shows_list = json.loads(static_response_file.read())['results']
        return render_template('tvshows.html', shows=shows_list)


    elif page.endswith('.html'):
        try:
            return render_template('%s' % page)
        except TemplateNotFound:
            abort(404)

@frontend.route('/movie/<name>')
def movie(name):
    try:
        return render_template('%s.html' % name)
    except TemplateNotFound:
        abort(404)

@frontend.route('/character/<name>')
def character(name):
    try:
        return render_template('%s.html' % name)
    except TemplateNotFound:
        abort(404)

@frontend.route('/comic/<name>')
def comic(name):
    try:
        return render_template('%s.html' % name)
    except TemplateNotFound:
        abort(404)

@frontend.route('/actor/<name>')
def actor(name):
    try:
        return render_template('%s.html' % name)
    except TemplateNotFound:
        abort(404)

@frontend.route('/event/<name>')
def event(name):
    try:
        return render_template('%s.html' % name)
    except TemplateNotFound:
        abort(404)

@frontend.route('/tvshow/<id>')
def tvshow():
    abort(404)
