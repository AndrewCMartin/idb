import hashlib
import json
import time

import requests
from sqlalchemy.exc import IntegrityError

from app.models import db, Event, Character

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
    for offset in range(0, 2000, 100):

        r = marvel_get('series', {'offset': str(offset), 'limit': '100'})

        d = json.loads(r.text)

        for comic_keys, comic_data in d['data'].items():
            if comic_keys == 'results':
                # pp.pprint(comic_data)
                for comic in comic_data:
                    character_entries = []
                    id_name = 0
                    title = ""
                    path = ""
                    descr = ""
                    characters = ""
                    year = ""
                    creators = ""
                    comics = ""

                    if comic['id'] != "":
                        for comic_attr_keys, comic_attr in comic.items():
                            if comic_attr_keys == 'id':
                                id_name = int(comic_attr)
                                # print('ID: ')
                                # print(id_name)
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
                                    characters += (chars['name'].encode('utf-8')) + ", "
                                    print (chars)
                                    char_id = int(chars['resourceURI'].split('/')[-1])
                                    c = Character.query.filter_by(id=char_id).first()
                                    if c:
                                        character_entries.append(c)
                                        #  print('Characters: ')
                                        #  print(characters)
                            elif comic_attr_keys == 'startYear':
                                year = str(comic_attr)
                            elif comic_attr_keys == 'creators':
                                items = comic_attr['items']
                                for create in items:
                                    creators += (create['name'].encode('utf-8')) + ", "
                                    #   print('Creators: ')
                                    #  print(creators)
                            elif comic_attr_keys == 'comics':
                                # Events have their own dict to go through
                                items = comic_attr['items']
                                for comic in items:
                                    comics += (comic['name'].encode('utf-8')) + ", "
                                    # print('Comics: ')
                            elif comic_attr_keys == 'series':
                                # Events have their own dict to go through
                                items = comic_attr['items']
                                for series in items:
                                    id = series['id']
                                    # s = ComicSeries

                                    # print('Comics: ')
                        # Create the event with the schema from models.py
                        newEntry = Event(id_name, title, descr, path, year, creators)
                        for c in character_entries:
                            newEntry.characters.append(c)
                        try:
                            db.session.merge(newEntry)
                        except IntegrityError:
                            print("FAIL")
                            db.session.rollback()
                        finally:
                            db.session.commit()




if __name__ == '__main__':
    main()
