from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import ForeignKey

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@127.0.0.1:3306/marvelus-db-v1'
db = SQLAlchemy(app)

character_event = db.Table('character_event', db.Column('character_id', db.Integer, ForeignKey('character_id')),
                                              db.Column('event_id', db.Integer, ForeignKey('event_id')))

character_actor = db.Table('character_actor', db.Column('character_id', db.Integer, ForeignKey('character_id')),
                                              db.Column('actor_id', db.Integer, ForeignKey('actor_id')))

character_movie = db.Table('character_movie', db.Column('character_id', db.Integer, ForeignKey('character_id')),
                                              db.Column('movie_id', db.Integer, ForeignKey('movie_id')))

character_tvshow = db.Table('character_tvshow', db.Column('character_id', db.Integer, ForeignKey('character_id')),
                                              db.Column('tvshow_id', db.Integer, ForeignKey('tvshow_id')))

character_comicseries = db.Table('character_comicseries', db.Column('character_id', db.Integer, ForeignKey('character_id')),
                                              db.Column('comicseries_id', db.Integer, ForeignKey('comicseries_id')))

event_comicseries = db.Table('event_comicseries', db.Column('event_id', db.Integer, ForeignKey('event_id')),
                                              db.Column('comicseries_id', db.Integer, ForeignKey('comicseries_id')))

actor_movie = db.Table('actor_movie', db.Column('actor_id', db.Integer, ForeignKey('actor_id')),
                                              db.Column('movie_id', db.Integer, ForeignKey('movie_id')))

actor_tvshow = db.Table('actor_tvshow', db.Column('actor_id', db.Integer, ForeignKey('actor_id')),
                                              db.Column('tvshow_id', db.Integer, ForeignKey('tvshow_id')))





class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    desc = db.Column(db.String(1500))
    thumbnail = db.Column(db.String(80))
    stories = db.Column(db.String(1500))

    events = db.Column(db.String(15000))
    series = db.Column(db.String(15000))

    # events = db.relationship('Event', secondary='character_event', backref=db.backref('characters'), lazy='dynamic')
    # series = db.relationship('ComicSeries', secondary='character_comicseries', backref=db.backref('characters'), lazy='dynamic')

    def __init__(self, id, name, desc, thumbnail, stories, events, series):
        assert name != ""
        self.id = id
        self.name = name
        self.desc = desc
        self.thumbnail = thumbnail
        self.stories = stories
        self.events = events
        self.series = series


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    desc = db.Column(db.String(1500))
    start = db.Column(db.Date)
    thumbnail = db.Column(db.String(80))
    creators = db.Column(db.String(1500))
    
    characters = db.Column(db.String(15000))
    series = db.Column(db.String(15000))

    # characters = db.relationship('Character', secondary='character_event', backref=db.backref('events'), lazy='dynamic')
    # series = db.relationship('ComicSeries', secondary='event_comicseries', backref=db.backref('events'), lazy='dynamic')

    def __init__(self, id, title, desc, thumbnail, start, creators, characters, num_series):
        self.id = id
        self.title = title
        self.desc = desc
        self.thumbnail = thumbnail
        self.start = start
        self.creators = creators
        self.characters = characters
        self.series = num_series


class Actor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    birthday = db.Column(db.Date)
    bio = db.Column(db.String(1500))
    image = db.Column(db.String(80))

    characters = db.Column(db.String(15000))
    movies = db.Column(db.String(15000))
    tvshows = db.Column(db.String(15000))


    # characters = db.relationship('Character', secondary='character_actor', backref=db.backref('actors'), lazy='dynamic')
    # movies = db.relationship('Movie', secondary='actor_movie', backref=db.backref('actors'), lazy='dynamic')
    # tvshows = db.relationship('TvShow', secondary='actor_tvshow', backref=db.backref('actors'), lazy='dynamic')
 
    def __init__(self, id, name, birthday, bio, image, characters, movies, tvshows):
        self.id = id
        self.name = name
        self.birthday = birthday
        self.bio = bio
        self.image = image
        self.characters = characters
        self.movies = movies
        self.tvshows = tvshows


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

    characters = db.Column(db.String(15000))
    actors = db.Column(db.String(15000))

    # characters = db.relationship('Character', secondary='character_movie', backref=db.backref('movies'), lazy='dynamic')
    # actors = db.relationship('Actor', secondary='actor_movie', backref=db.backref('movies'), lazy='dynamic')

    def __init__(self, id, title, overview, adult, poster_path, runtime, release_date, lang, rating, characters, actors):
        self.id = id
        self.title = title
        self.overview = overview
        self.adult = adult
        self.poster_path = poster_path
        self.runtime = runtime
        self.release_date = release_date
        self.lang = lang
        self.rating = rating
        self.characters = characters
        self.actors = actors


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

    characters = db.Column(db.String(15000))
    actors = db.Column(db.String(15000))

    # characters = db.relationship('Character', secondary='character_tvshow', backref=db.backref('tvshows'), lazy='dynamic')
    # actors = db.relationship('Actor', secondary='actor_tvshow', backref=db.backref('tvshows'), lazy='dynamic')

    def __init__(self, id, name, overview, poster_path, runtime, last_air_date, langs, rating, num_seasons, num_episodes):
        self.id = id
        self.name = name
        self.overview = overview
        self.poster_path = poster_path
        self.runtime = runtime
        self.last_air_date = last_air_date
        self.langs = langs
        self.rating = rating
        self.num_seasons = num_seasons
        self.num_episodes = num_episodes
        self.characters = characters
        self.actors = actors

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

    events = db.Column(db.String(15000))
    characters  = db.Column(db.String(15000))

    # events = db.relationship('Event', secondary='event_comicseries', backref=db.backref('comicseries'), lazy='dynamic')
    # characters = db.relationship('Character', secondary='character_comicseries', backref=db.backref('comicseries'), lazy='dynamic')

    def __init__(self, id, title, desc, thumbnail, runtime, start_year, end_year, rating, events, characters):
        self.id = id
        self.title = title
        self.desc = desc
        self.thumbnail = thumbnail
        self.runtime = runtime
        self.start_year = start_year
        self.end_year = end_year
        self.rating = rating
        self.events = events
        self.characters = characters


















