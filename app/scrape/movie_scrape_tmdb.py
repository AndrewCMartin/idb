from app.models import db, Movie
from app.scrape import tmdb

def add_movie_info(movie_id):
    movie = tmdb.Movies(movie_id)
    response = movie.info()

    credits = movie.credits()

    characters = []
    actors = []

    for person in credits["cast"]:
        characters.append(person["character"])
        actors.append(person["name"])

    print (movie_id, movie.title)

    # Create the character with the schema from models.py
    newEntry = Movie(movie_id, movie.title, movie.overview, movie.adult, movie.poster_path, movie.runtime,
                     movie.release_date, movie.original_language, movie.vote_average)
    db.session.merge(newEntry)
    db.session.commit()


def main():
    marvel = tmdb.Companies(420)
    movies = marvel.movies()

    for movie in movies["results"]:
        add_movie_info(movie["id"])

    print('Done')


if __name__ == '__main__':
    main()
