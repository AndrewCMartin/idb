from flask_script import Manager

from app import app
from app.scrape.clear_database import main as clear_database
from app.scrape.movie_scrape_tmdb import main as get_movies
from app.scrape.tvshow_scrape_tmdb import main as get_tv

manager = Manager(app)


@manager.command
def hello():
    "Just say hello"
    print "hello"


@manager.command
def scrape(to_scrape):
    "Query TMDB for Marvel movies and populate database"
    scrape_scripts = {'movies': get_movies,
                      'tv': get_tv}
    if to_scrape == 'all':
        for name in scrape_scripts:
            scrape_scripts[name]()
    elif to_scrape in scrape_scripts:
        scrape_scripts[to_scrape]()

@manager.command
def clear_db():
    "Query TMDB for Marvel movies and populate database"
    clear_database()



if __name__ == "__main__":
    manager.run()
