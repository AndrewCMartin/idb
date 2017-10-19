import hashlib, requests
import time, json

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




import pprint as pp
for offset in range(0, 2000, 20):

    r = marvel_get('events', {'offset':str(offset)})

    d = json.loads(r.text)
    
    for event_keys, event_data in d['data'].items():
        if event_keys == 'results':
            for event in event_data:
                if event['id'] != "":
                    for event_attr_keys, event_attr in event.items():
                        if event_attr_keys == 'id':
                            id_name = str(event_attr)
                            print('ID: ' + id_name)
                        elif event_attr_keys == 'title':
                            title = str(event_attr)
                            print('Title: ' + title)
                        elif event_attr_keys == 'thumbnail':
                            path = str(event_attr['path'])
                            for v in path.split('/'):
                                if v == 'image_not_available':
                                    path = None

                            if path != None:
                                path = path + '.' + event_attr['extension']
                        elif event_attr_keys == 'description':
                            descr = event_attr.encode('utf-8')
                            print('Description: ' + descr)
                        elif event_attr_keys == 'creators':
                            creator_list = []
                            items = event_attr['items']
                            for create in items:
                                creator_list.append(create['name'].encode('utf-8'))
                            print('Creators: ')
                            print(creator_list)
                        elif event_attr_keys == 'characters':
                            char_list = []
                            items = event_attr['items']
                            for chars in items:
                                char_list.append(chars['name'].encode('utf-8'))
                            print('Characters: ')
                            print(char_list)
                        elif event_attr_keys == 'start':
                            date = str(event_attr)
                            #only get the date, remove the time
                            print(date.split(" ")[0])
                    print('\n')
                        
