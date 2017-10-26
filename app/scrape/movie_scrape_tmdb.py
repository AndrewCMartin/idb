from app.models import db, Movie, Character, Actor
from app.scrape import tmdb

character_set = set()


def get_actor(actor_id):
    a = Actor.query.filter_by(id=actor_id).first()
    print(a)
    if a:
        return a
    print ("NOT FOUND, ADDING")
    p = tmdb.People(actor_id)
    d = p.info()
    print(d)
    if len(d['biography']) > 3000:
        d['biography'] = d['biography'][:3000]
    if len(d['biography']) == 0 or 'birthday' not in d or not d['birthday']:
        return
    if len(d['birthday']) < 6:
        return
    a = Actor(actor_id, d['name'], d['birthday'], d['biography'], d['profile_path'])
    db.session.merge(a)
    db.session.commit()
    return a


def get_character(character_name):
    character_name = character_name.replace('(voice)', '')
    character_name = character_name.replace('\"', '')
    character_name = character_name.replace('  ', ' ')
    character_name = character_name.replace('The', '')
    character_name = character_name.replace('Dr. Stephen Strange', 'Doctor Strange')
    if character_name.strip() == '':
        return None
    split_by_slash = [s.strip() for s in character_name.split('/')]
    # Check full name split by slash
    for s in reversed(split_by_slash):
        c = Character.query.filter(Character.name.ilike(s)).first()
        if c:
            return c
    # Check part of name from split by slash
    for s in reversed(split_by_slash):
        c = Character.query.filter(Character.name.ilike('%' + s + '%')).first()
        if c:
            return c
    # Split each word
    split_by_space = [s.strip() for s in character_name.split(' ')]
    for s in split_by_space:
        c = Character.query.filter(Character.name.ilike(s)).first()
        if c:
            return c


def add_movie_info(movie_id):
    a = Movie.query.filter_by(id=movie_id).first()
    if a:
        return
    movie = tmdb.Movies(movie_id)
    response = movie.info(append_to_response='credits')
    print(response)

    # Create the character with the schema from models.py
    newMovieEntry = Movie(movie_id, movie.title, movie.overview, movie.adult, movie.poster_path, movie.runtime,
                          movie.release_date, movie.original_language, movie.vote_average)

    found_count = 0
    not_found_count = 0
    for credit in response["credits"]["cast"]:

        character_name = credit["character"]
        if credit["order"] > 20:
            continue
        print("Character: " + str(character_name))
        character = get_character(character_name)
        if (character):
            newMovieEntry.characters.append(character)

        actor_id = credit["id"]
        actor = Actor.query.filter_by(id=actor_id).first()
        if (actor):
            print(actor.name)
            newMovieEntry.actors.append(actor)
        if actor and character:
            actor.characters.append(character)
    print (movie_id, movie.title)

    db.session.merge(newMovieEntry)
    db.session.commit()


def main():
    marvel = tmdb.Companies(420)
    movies = marvel.movies()

    for movie in movies["results"]:
        add_movie_info(movie["id"])

    print('Done')


if __name__ == '__main__':
    main()
