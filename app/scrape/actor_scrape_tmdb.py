import tmdbsimple as tmdb

from app.models import db, Actor

tmdb.API_KEY = '3b1223f4067b19c69b5a3e35f5b0f938'

def add_actor_info(actor_id):
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

    #Create the character with the schema from models.py
    newEntry = Actor(actor_id, person.name, person.birthday, person.biography, person.profile_path, str(characters), str(movies), str(tv_shows))
    db.session.merge(newEntry)
    db.session.commit()


def main():
    marvel = tmdb.Companies(420)
    movies = marvel.movies()
    actor_ids = set()
    print(movies)
    for movie_result in movies["results"]:

        movie = tmdb.Movies(movie_result["id"])
        credits = movie.credits()

        for person in credits["cast"]:
            actor_ids.add(person["id"])

    for actor_id in actor_ids:
        add_actor_info(actor_id)

    print('Done')

if __name__ == '__main__':
    main()

