import hashlib, requests
import time, json

from models import db, Character

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


for offset in range(0, 2000, 20):

    r = marvel_get('characters', {'offset':str(offset)})

    d = json.loads(r.text)


    for char_keys, char_data in d['data'].items():
        if char_keys == 'results':
            for char in char_data:

                id_num = 0
                name = ""
                path = ""
                desc = ""
                series_name = ""
                story_name = ""
                event_name = ""
                            
                if char['id'] != "":
                    for char_attr_keys, char_attr in char.items():
                        if char_attr_keys == 'name':
                            name = char_attr.encode('utf-8')
                        elif char_attr_keys == 'id':
                            id_num = int(char_attr)
                        elif char_attr_keys == 'thumbnail':
                            path = str(char_attr['path'])
                            for v in path.split('/'):
                                if v == 'image_not_available':
                                    path = None
                                    
                            if path != None:
                                path = path + '.' + char_attr['extension']
                        elif char_attr_keys == 'description':
                            desc = char_attr.encode('utf-8')
                        elif char_attr_keys == 'stories':
                            # Stories have their own dict to go through
                            for story in char_attr['items']:
                                story_name += story['name'].encode('utf-8') + ', \n'
                        elif char_attr_keys == 'events':
                            # Events have their own dict to go through
                            for event in char_attr['items']:
                                event_name += event['name'].encode('utf-8') + ', \n'
                        elif char_attr_keys == 'series':
                            # Series have their own dict to go through
                            for series in char_attr['items']:
                                series_name += series['name'].encode('utf-8') + ', \n'
                    #Create the character with the schema from models.py
                    print('we are here')
                    newEntry = Character(id_num, name, desc, path, story_name, event_name, series_name)
                    
                    db.session.merge(newEntry)
                    print('now we are here')
                    db.session.commit()
                    print("DONE WITH THIS")

print('Done')
