
# This contains our frontend; since it is a bit messy to use the @app.route
# decorator style when using application factories, all of our routes are
# inside blueprints. This is the front-facing blueprint.
#
# You can find out more about blueprints at
# http://flask.pocoo.org/docs/blueprints/

from flask import Blueprint, render_template, flash, redirect, url_for
from nav import nav


frontend = Blueprint('frontend', __name__)



# Our index-page just shows a quick explanation. Check out the template
# "templates/index.html" documentation for more details.
@frontend.route('/')
def index():
    return render_template('index.html')

@frontend.route('/<page>')
def show(page):
    if page.endswith('.html'):
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
	
