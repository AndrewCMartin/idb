from flask import Flask, Blueprint, render_template, abort
from jinja2 import TemplateNotFound

app = Flask(__name__)

@app.route('/', defaults={'page': 'index.html'})
@app.route('/<page>')
def show(page):
    if page.endswith('.html'):
        try:
            return render_template('%s' % page)
        except TemplateNotFound:
            abort(404)
