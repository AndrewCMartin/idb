from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    desc = db.Column(db.String(1500))
    start = db.Column(db.Date)
    end = db.Column(db.Date)
    thumbnail = db.Column(db.String(80))
    # characters
    # series

class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    desc = db.Column(db.String(1500))
    thumbnail = db.Column(db.String(80))
    # events
    # series

class Actor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    birthday = db.Column(db.Date)
    bio = db.Column(db.String(1500))
    image = db.Column(db.String(80))
    # character
    # movies
    # tv show

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    overview = db.Column(db.String(1300))
    adult = db.Column(db.Boolean)
    # genres
    poster_path = db.Column(db.String(200))
    runtime = db.Column(db.Integer)
    release_date = db.Column(db.Date)
    lang = db.Column(db.String(80))
    rating = db.Column(db.Float)

    # characters
    # actors

class TvShow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    overview = db.Column(db.String(1300))
    # genres
    poster_path = db.Column(db.String(200))
    runtime = db.Column(db.Integer)
    last_air_date = db.Column(db.Date)
    langs = db.Column(db.String(80))
    rating = db.Column(db.Float)
    num_seasons = db.Column(db.Integer)
    num_episodes = db.Column(db.Integer)

    # characters
    # actors

class ComicSeries(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    desc = db.Column(db.String(1300))
    # genres
    thumbnail = db.Column(db.String(200))
    runtime = db.Column(db.Integer)

    start_year = db.Column(db.Integer)
    end_year = db.Column(db.Integer)

    rating = db.Column(db.Float)

    # events
    # characters
























