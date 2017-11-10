import hashlib
import json
import os
import time

import requests

from app import db
from app.models import TvShow, Movie, Actor, ComicSeries, Character, Event
from app.scrape import tmdb
from config import BASE_DIR

models_list = [Actor, Character, ComicSeries, Event, Movie, TvShow]
DATA_DIR = os.path.join(BASE_DIR, "app", "data")

k_priv = 'fdf9c8bc5c83cbe565fdd6ddc4df9d0fb1e38a83'
k_pub = '7f39855a0661b5fe55f842d7afa8cd9f'


def compute_hash():
    m = hashlib.md5()
    ts = str(time.time())
    m.update(ts.encode('utf-8'))
    m.update(k_priv.encode('utf-8'))
    m.update(k_pub.encode('utf-8'))
    h = m.hexdigest()
    return (ts, h)


def marvel_get(endpoint, params=None):
    ts, h = compute_hash()
    base_url = 'https://gateway.marvel.com/v1/public/'

    data = {'ts': ts, 'hash': h, 'apikey': k_pub}
    if params:
        data.update(params)
    return requests.get(base_url + endpoint, params=data)


def get_movie_data():
    print("Scraping Movies")
    movies_list = []
    movie_ids = set()
    marvel = tmdb.Companies(420)
    result = marvel.movies()
    total_pages = result["total_pages"]
    for page in range(1, total_pages + 1):
        result = marvel.movies(page=page)
        for m in result["results"]:
            movie_ids.add(m["id"])
    for m_id in movie_ids:
        time.sleep(0.04)
        movie = tmdb.Movies(m_id)
        info = movie.info(append_to_response="credits")
        movies_list.append(info)
    return movies_list


def get_tvshow_data():
    print("Scraping TV Shows")
    tv_ids = set()
    s = tmdb.Search()
    r = s.tv(query="marvel\'s")
    for t in r["results"]:
        tv_ids.add(t["id"])
    for page in range(2, r["total_pages"] + 1):
        r = s.tv(query="marvel\'s", page=page)
        for t in r["results"]:
            tv_ids.add(t["id"])
    tv_info = []
    for tv_id in tv_ids:
        time.sleep(0.04)
        tv = tmdb.TV(tv_id)
        info = tv.info(append_to_response="credits")
        tv_info.append(info)
    return tv_info


def get_actor_data(*m):
    print("Scraping Actor data (must first get movies and tv shows)")
    actor_ids = set()
    for l in m:
        for movie in l:
            cast = movie["credits"]["cast"]
            for p in cast:
                if p["order"] <= 20:
                    actor_ids.add(p["id"])
    actor_data = []
    for actor_id in actor_ids:
        time.sleep(0.05)
        actor = tmdb.People(actor_id)
        info = actor.info()
        actor_data.append(info)
    return actor_data


def marvel_get_all(endpoint, chunk_size=20):
    print("Scraping all " + endpoint)
    data = []
    r = marvel_get(endpoint)
    d = json.loads(r.text)
    total = d["data"]["total"]
    for offset in range(0, total, chunk_size):
        print("Fetching " + str(offset) + " of " + str(total))
        r = marvel_get(endpoint, {'offset': str(offset), 'limit': str(chunk_size)})
        d = json.loads(r.text)
        if len(d['data']['results']) == 0:
            break
        data += d['data']['results']
    return data


def save_results(**kwargs):
    for file_name in kwargs:
        data = json.dumps(kwargs[file_name])
        if os.path.exists(os.path.join(DATA_DIR, file_name + '.json')):
            os.remove(os.path.join(DATA_DIR, file_name + '.json'))
        with open(os.path.join(DATA_DIR, file_name + '.json'), "w+") as f:
            f.write(data)
            print ("Saved file " + str(os.path.join(DATA_DIR, file_name + '.json')))


def scrape_all_and_save():
    m = get_movie_data()
    t = get_tvshow_data()
    a = get_actor_data(m, t)
    e = marvel_get_all('events')
    s = marvel_get_all('series')
    c = marvel_get_all('characters')
    save_results(movies=m, actors=a, tvshows=t, events=e, series=s, characters=c)


def load_results(*models):
    files = [f.split('.')[0] for f in os.listdir(DATA_DIR) if f.endswith(".json")]
    if models:
        files = [f for f in files if f in models]
    results = {}
    for file_name in files:
        with open(os.path.join(DATA_DIR, file_name + '.json')) as f:
            data = json.loads(f.read())
            results[file_name] = data
    return results


def add_characters(characters):
    for c in characters:
        path = c['thumbnail']['path']
        if path == 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif':
            continue
        if 'image_not_available' in path.split('/'):
            continue
        path = path + '.' + c['thumbnail']['extension']
        stories = ", ".join([s["name"] for s in c['stories']['items']])
        new_character = Character(c["id"], c["name"], c["description"][:1500], path, stories)
        db.session.merge(new_character)
        db.session.commit()
        print("Added " + c["name"])


def add_actors(actors):
    for a in actors:
        if 'birthday' not in a or not a['birthday'] or len(a['birthday']) < 8:
            continue
        actor = Actor(a["id"], a["name"], a["birthday"], a["biography"][:3000], a["profile_path"])
        db.session.merge(actor)
        db.session.commit()
        print("Added " + a["name"])


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


def add_movies(movies):
    for m in movies:
        movie = Movie(m["id"], m["title"], m["overview"], m["adult"], m["poster_path"], m["runtime"], m["release_date"],
                      m["original_language"], m["vote_average"])
        for c in m["credits"]["cast"]:
            character_name = c["character"]
            if c["order"] > 20:
                continue
            character = get_character(character_name)
            if (character):
                movie.characters.append(character)
            actor_id = c["id"]
            actor = Actor.query.filter_by(id=actor_id).first()
            if actor:
                movie.actors.append(actor)
            if actor and character:
                actor.characters.append(character)
        db.session.merge(movie)
        db.session.commit()
        print ("Added " + m["title"])


def add_tvshows(tvshows):
    for t in tvshows:
        tvshow = TvShow(t["id"], t["name"], t["overview"], t["poster_path"], t["last_air_date"],
                        t["vote_average"], t["number_of_seasons"], t["number_of_episodes"])
        for c in t["credits"]["cast"]:
            character_name = c["character"]
            if c["order"] > 20:
                continue
            character = get_character(character_name)
            if (character):
                tvshow.characters.append(character)
            actor_id = c["id"]
            actor = Actor.query.filter_by(id=actor_id).first()
            if actor:
                tvshow.actors.append(actor)
            if actor and character:
                actor.characters.append(character)

        db.session.merge(tvshow)
        try:
            db.session.commit()
        except Exception:
            db.session.rollback()
        print ("Added " + t["name"])


def add_events(events):
    for e in events:
        path = e['thumbnail']['path']
        if path == 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif':
            continue
        if 'image_not_available' in path.split('/'):
            continue
        if not e['start']:
            continue
        path = path + '.' + e['thumbnail']['extension']
        event = Event(e["id"], e["title"], e["description"], path, e["start"][:4], "")
        for c in e["characters"]["items"]:
            char_id = int(c['resourceURI'].split('/')[-1])
            character = Character.query.filter_by(id=char_id).first()
            if character:
                event.characters.append(character)
        db.session.merge(event)
        db.session.commit()
        print("Added " + e["title"])


def add_series(series):
    for s in series:
        # print (s)
        if ComicSeries.query.filter_by(id=s["id"]).first():
            continue
        path = s['thumbnail']['path']
        if path == 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif':
            continue
        if 'image_not_available' in path.split('/'):
            continue

        path = path + '.' + s['thumbnail']['extension']
        series = ComicSeries(s["id"], s["title"], s["description"], path, s["startYear"], s["endYear"])

        for c in s["characters"]["items"]:
            char_id = int(c['resourceURI'].split('/')[-1])
            character = Character.query.filter_by(id=char_id).first()
            if character:
                series.characters.append(character)
        for e in s["events"]["items"]:
            e_id = int(e['resourceURI'].split('/')[-1])
            event = Event.query.filter_by(id=e_id).first()
            if event:
                series.events.append(event)

        db.session.merge(series)
        db.session.commit()
        print("Added " + s["title"])


def load_all():
    r = load_results()
    # add_characters(r["characters"])
    # add_actors(r["actors"])
    # add_movies(r["movies"])
    # add_tvshows(r["tvshows"])
    add_events(r["events"])
    add_series(r["series"])


if __name__ == '__main__':
    load_all()


# In[58]:





# In[71]:
