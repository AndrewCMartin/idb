import hashlib
import json
import time

import requests
from sqlalchemy.exc import IntegrityError

from app.models import db, ComicSeries, Character, Event

base_url = 'https://gateway.marvel.com/v1/public/'
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
    data = {'ts':ts, 'hash': h, 'apikey': k_pub}
    if params:
        data.update(params)
    return requests.get(base_url+endpoint, params=data)


def main():
    for offset in range(0, 2000, 20):

        r = marvel_get('series', {'offset': str(offset)})

        d = json.loads(r.text)

        for comic_keys, comic_data in d['data'].items():
            if comic_keys == 'results':
                # pp.pprint(comic_data)
                for comic in comic_data:
                    character_entries = []
                    event_entries = []
                    id_name = 0
                    title = ""
                    path = ""
                    descr = ""
                    characters = ""
                    year = ""
                    creators = ""
                    events = ""
                    end_year = ""
                    if comic['id'] != "":
                        for comic_attr_keys, comic_attr in comic.items():
                            if comic_attr_keys == 'id':
                                id_name = int(comic_attr)
                            elif comic_attr_keys == 'title':
                                title = comic_attr.encode('utf-8')
                            elif comic_attr_keys == 'thumbnail':
                                path = comic_attr['path']
                                print(comic['id'])
                                print(path)
                                for v in path.split('/'):
                                    if v == 'image_not_available':
                                        path = None
                                if path != None:
                                    path = path + '.' + comic_attr['extension']
                            elif comic_attr_keys == 'description':
                                descr = comic_attr
                                if descr == None:
                                    descr = "None"
                                else:
                                    descr = comic_attr.encode('utf-8')
                            elif comic_attr_keys == 'characters':
                                items = comic_attr['items']
                                for chars in items:
                                    char_id = int(chars['resourceURI'].split('/')[-1])
                                    c = Character.query.filter_by(id=char_id).first()
                                    if c:
                                        character_entries.append(c)
                                    characters += (chars['name'].encode('utf-8')) + ", "
                            elif comic_attr_keys == 'startYear':
                                year = str(comic_attr)
                            elif comic_attr_keys == 'endYear':
                                end_year = str(comic_attr)
                            elif comic_attr_keys == 'creators':
                                items = comic_attr['items']
                                for create in items:
                                    creators += (create['name'].encode('utf-8')) + ", "
                            elif comic_attr_keys == 'events':
                                # Events have their own dict to go through
                                items = comic_attr['items']
                                for event in items:
                                    event_id = int(event['resourceURI'].split('/')[-1])
                                    c = Event.query.filter_by(id=event_id).first()
                                    if c:
                                        event_entries.append(c)
                                    events += (event['name'].encode('utf-8')) + ", "
                        # Create the event with the schema from models.py
                        newEntry = ComicSeries(id_name, title, descr, path, year, end_year)
                        for c in character_entries:
                            newEntry.characters.append(c)
                        for e in event_entries:
                            newEntry.events.append(e)
                        try:
                            db.session.merge(newEntry)
                        except IntegrityError:
                            print("FAIL")
                            db.session.rollback()
                        finally:
                            db.session.commit()


if __name__ == '__main__':
    main()
