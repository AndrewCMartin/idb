import json

import requests
from sqlalchemy.exc import IntegrityError

from app.models import db, TvShow, Actor
from app.scrape import tmdb
from app.scrape.movie_scrape_tmdb import get_character


def tvshow_info(tvshow_id):
    tvshow = tmdb.TV(tvshow_id)
    tvshow.info()

    credits = tvshow.credits()

    characters = []
    actors = []
    newTvShow = TvShow(tvshow_id, tvshow.name, tvshow.overview, tvshow.poster_path, tvshow.last_air_date,
                       tvshow.vote_average, tvshow.number_of_seasons, tvshow.number_of_episodes)

    for person in credits["cast"]:
        characters.append(person["character"])
        c = get_character(person["character"])
        if c:
            newTvShow.characters.append(c)
        a = Actor.query.filter_by(id=person["id"]).first()
        if a:
            newTvShow.actors.append(a)
        if c and a:
            c.actors.append(a)
        actors.append(person["name"])

    print (tvshow_id, tvshow.name)
    try:
        db.session.merge(newTvShow)
        print("SUCCESS")
    except IntegrityError:
        print("FAIL")
        db.session.rollback()
    finally:
        db.session.commit()

def marvel_shows(page_num):
    params['page'] = page_num

    r = requests.get(base_url, params)
    tvshows = json.loads(r.text)
    tvlist = []
    for tvshow in tvshows["results"]:
        # tvlist.append( tvshow["id"])
        tvshow_info(tvshow["id"])

# There are only 44 results total, the results are in 3 pages
base_url = 'https://api.themoviedb.org/3/search/tv'
params = { 'api_key' : 'ad40b463da9a53ce7faffa8cc87d4d6a', 
            'language' : 'en-US',
            'query' : 'marvel\'s',
            'page' : 0
         }

def main():
    for i in range(1, 4):
        marvel_shows(i)
    print('Done')


if __name__ == '__main__':
    main()

