from flask_script import Manager

from app import app
from app.scrape.clear_database import main as clear_database

manager = Manager(app)


@manager.command
def hello():
    "Just say hello"
    print "hello"



@manager.command
def clear_db():
    "Query TMDB for Marvel movies and populate database"
    clear_database()



if __name__ == "__main__":
    manager.run()
