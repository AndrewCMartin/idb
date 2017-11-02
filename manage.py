from flask_script import Manager

from app import app
from app.scrape.actor_scrape_tmdb import main as get_actors
from app.scrape.character_scrape_marvel import main as get_characters
from app.scrape.clear_database import main as clear_database
from app.scrape.comic_scrape_marvel import main as get_series
from app.scrape.event_scrape_marvel import main as get_events
from app.scrape.movie_scrape_tmdb import main as get_movies
from app.scrape.tvshow_scrape_tmdb import main as get_tv

manager = Manager(app)


@manager.command
def hello():
    "Just say hello"
    print "hello"


@manager.command
def scrape():
    "Query TMDB for Marvel movies and populate database"
    scrape_scripts = [get_characters, get_actors, get_tv, get_movies, get_events, get_series]
    for script in scrape_scripts:
        script()

@manager.command
def clear_db():
    "Query TMDB for Marvel movies and populate database"
    clear_database()



if __name__ == "__main__":
    manager.run()
