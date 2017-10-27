from app import db

character_event = db.Table('character_event', db.Model.metadata,
                           db.Column('character_id', db.Integer, db.ForeignKey('character.id')),
                           db.Column('event_id', db.Integer, db.ForeignKey('event.id')))

character_actor = db.Table('character_actor', db.Model.metadata,
                           db.Column('character_id', db.Integer, db.ForeignKey('character.id')),
                           db.Column('actor_id', db.Integer, db.ForeignKey('actor.id')))

character_movie = db.Table('character_movie', db.Model.metadata,
                           db.Column('character_id', db.Integer, db.ForeignKey('character.id')),
                           db.Column('movie_id', db.Integer, db.ForeignKey('movie.id')))

character_tvshow = db.Table('character_tvshow', db.Model.metadata,
                            db.Column('character_id', db.Integer, db.ForeignKey('character.id')),
                            db.Column('tvshow_id', db.Integer, db.ForeignKey('tv_show.id')))

character_comicseries = db.Table('character_comicseries',
                                 db.Column('character_id', db.Integer, db.ForeignKey('character.id')),
                                 db.Column('comicseries_id', db.Integer, db.ForeignKey('comic_series.id')))

event_comicseries = db.Table('event_comicseries', db.Model.metadata,
                             db.Column('event_id', db.Integer, db.ForeignKey('event.id')),
                             db.Column('comicseries_id', db.Integer, db.ForeignKey('comic_series.id')))

actor_movie = db.Table('actor_movie', db.Model.metadata, db.Column('actor_id', db.Integer, db.ForeignKey('actor.id')),
                       db.Column('movie_id', db.Integer, db.ForeignKey('movie.id')))

actor_tvshow = db.Table('actor_tvshow', db.Model.metadata, db.Column('actor_id', db.Integer, db.ForeignKey('actor.id')),
                        db.Column('tvshow_id', db.Integer, db.ForeignKey('tv_show.id')))


class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    desc = db.Column(db.String(1500))
    thumbnail = db.Column(db.String(80))
    stories = db.Column(db.String(1500))

    events = db.relationship('Event', secondary='character_event', backref=db.backref('characters'), lazy='dynamic')
    series = db.relationship('ComicSeries', secondary='character_comicseries', backref=db.backref('characters'),
                             lazy='dynamic')

    def __init__(self, id, name, desc, thumbnail, stories):
        assert name != ""
        self.id = id
        self.name = name
        self.desc = desc
        self.thumbnail = thumbnail
        self.stories = stories
        # self.events = events
        # self.series = series


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    desc = db.Column(db.String(1500))
    start = db.Column(db.Integer)
    thumbnail = db.Column(db.String(80))
    creators = db.Column(db.String(1500))

    series = db.relationship('ComicSeries', secondary='event_comicseries', backref=db.backref('events'), lazy='dynamic')

    def __init__(self, id, title, desc, thumbnail, start, creators):
        self.id = id
        self.title = title
        self.desc = desc
        self.thumbnail = thumbnail
        self.start = start
        self.creators = creators
        # self.characters = characters
        # self.series = num_series


class Actor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    birthday = db.Column(db.Date)
    bio = db.Column(db.String(3000))
    image = db.Column(db.String(80))

    characters = db.relationship('Character', secondary='character_actor', backref=db.backref('actors'), lazy='dynamic')
    tvshows = db.relationship('TvShow', secondary='actor_tvshow', backref=db.backref('actors'), lazy='dynamic')

    def __init__(self, id, name, birthday, bio, image):
        self.id = id
        self.name = name
        self.birthday = birthday
        self.bio = bio
        self.image = image


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

    characters = db.relationship('Character', secondary='character_movie', backref=db.backref('movies'), lazy='dynamic')
    actors = db.relationship('Actor', secondary='actor_movie', backref=db.backref('movies'), lazy='dynamic')

    def __init__(self, id, title, overview, adult, poster_path, runtime, release_date, lang, rating):
        self.id = id
        self.title = title
        self.overview = overview
        self.adult = adult
        self.poster_path = poster_path
        self.runtime = runtime
        self.release_date = release_date
        self.lang = lang
        self.rating = rating



class TvShow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    overview = db.Column(db.String(1300))
    # genres
    poster_path = db.Column(db.String(200))
    last_air_date = db.Column(db.Date)
    rating = db.Column(db.Float)
    num_seasons = db.Column(db.Integer)
    num_episodes = db.Column(db.Integer)

    characters = db.relationship('Character', secondary='character_tvshow', backref=db.backref('tvshows'),
                                 lazy='dynamic')


    def __init__(self, id, name, overview, poster_path, last_air_date, rating, num_seasons, num_episodes):
        self.id = id
        self.name = name
        self.overview = overview
        self.poster_path = poster_path
        self.last_air_date = last_air_date
        self.rating = rating
        self.num_seasons = num_seasons
        self.num_episodes = num_episodes


class ComicSeries(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    desc = db.Column(db.String(1300))
    # genres
    thumbnail = db.Column(db.String(200))

    start_year = db.Column(db.Integer)
    end_year = db.Column(db.Integer)

    rating = db.Column(db.Float)

    def __init__(self, id, title, desc, thumbnail, start_year, end_year):
        self.id = id
        self.title = title
        self.desc = desc
        self.thumbnail = thumbnail
        self.end_year = end_year
        self.start_year = start_year
