import time

import tmdbsimple as tmdb
from sqlalchemy.exc import IntegrityError

from app.models import db, Actor

tmdb.API_KEY = '3b1223f4067b19c69b5a3e35f5b0f938'


def add_actor_info(actor_id):
    time.sleep(0.1)
    person = tmdb.People(actor_id)
    response = person.info()
    m_credits = ''
    tv_credits = ''
    print(response)

    movies = []
    tv_shows = []
    characters = []

    # for credit in m_credits["cast"]:
    #     characters.append(credit["character"])
    #     movies.append(credit["title"])
    #
    # for credit in tv_credits["cast"]:
    #     characters.append(credit["character"])
    #     tv_shows.append(credit["name"])

    if 'birthday' not in response or response['birthday'] is None or len(response['birthday']) < 8:
        return

    # Create the character with the schema from models.py
    newEntry = Actor(actor_id, person.name, person.birthday, person.biography[:3000], person.profile_path)
    try:
        db.session.merge(newEntry)
    except IntegrityError:
        db.session.rollback()
    finally:
        db.session.commit()
    return newEntry


tv_ids = [68716, 61889, 72705, 62127, 1403, 62285, 61550, 34391, 62126, 38472, 59427, 67178, 67466, 66190, 40044, 63181,
          69088, 70784, 65215, 71106, 65247]


def main():
    marvel = tmdb.Companies(420)
    movies = marvel.movies()
    actor_ids = set()
    print(movies)
    for movie_result in movies["results"]:
        time.sleep(0.1)
        movie = tmdb.Movies(movie_result["id"])
        credits = movie.credits()

        for person in credits["cast"]:
            if person["order"] <= 20:
                actor_ids.add(person["id"])
    for tv_id in tv_ids:
        time.sleep(0.1)
        show = tmdb.TV(tv_id)
        credits = show.credits()
        for person in credits["cast"]:
            if person["order"] <= 20:
                actor_ids.add(person["id"])

    print(len(actor_ids))
    for actor_id in actor_ids:
        add_actor_info(actor_id)

    print('Done')


if __name__ == '__main__':
    main()
