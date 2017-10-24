import json
import requests

import tmdbsimple as tmdb

from app.models import db, TvShow
from app.scrape import tmdb


def tvshow_info(tvshow_id):
    tvshow = tmdb.TV(tvshow_id)
    tvshow.info()

    credits = tvshow.credits()

    characters = []
    actors = []

    for person in credits["cast"]:
        characters.append(person["character"])
        actors.append(person["name"])

    print (tvshow_id, tvshow.name)

    #Create the character with the schema from models.py
    newEntry = TvShow(tvshow_id, tvshow.name, tvshow.overview, tvshow.poster_path, tvshow.last_air_date, tvshow.vote_average, tvshow.number_of_seasons, tvshow.number_of_episodes)
    db.session.merge(newEntry)
    db.session.commit()

def marvel_shows(page_num):
    params['page'] = page_num

    r = requests.get(base_url, params)
    tvshows = json.loads(r.text)

    for tvshow in tvshows["results"]:
        tvshow_info(tvshow["id"])


# There are only 44 results total, the results are in 3 pages
base_url = 'https://api.themoviedb.org/3/search/tv'
params = { 'api_key' : 'ad40b463da9a53ce7faffa8cc87d4d6a', 
            'language' : 'en-US',
            'query' : 'marvel\'s',
            'page' : 0
         }

for i in range(1, 4):
    marvel_shows(i)

print('Done')
