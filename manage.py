from flask_script import Manager

from app import app
from app.scrape.clear_database import main as clear_database
from app.scrape.movie_scrape_tmdb import main as get_movies

manager = Manager(app)


@manager.command
def hello():
    "Just say hello"
    print "hello"


@manager.command
def scrape_movies():
    "Query TMDB for Marvel movies and populate database"
    get_movies()


@manager.command
def clear_db():
    "Query TMDB for Marvel movies and populate database"
    clear_database()


if __name__ == "__main__":
    manager.run()
