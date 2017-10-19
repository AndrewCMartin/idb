import pprint as pp
for offset in range(0, 2000, 20):

    r = marvel_get('series', {'offset':str(offset)})

    d = json.loads(r.text)
    
    for comic_keys, comic_data in d['data'].items():
        if comic_keys == 'results':
            #pp.pprint(comic_data)
            for comic in comic_data:
                if comic['id'] != "":
                    for comic_attr_keys, comic_attr in comic.items():
                        if comic_attr_keys == 'title':
                            title = str(comic_attr)
                            print('Title: ' + title)
                        elif comic_attr_keys == 'description':
                            descr = str(comic_attr)
                            print('Description: ' + descr)
                        elif comic_attr_keys == 'characters':
                            char_list = []
                            items = comic_attr['items']
                            for chars in items:
                                char_list.append(str(chars['name']))
                            print('Characters: ')
                            print(char_list)
                        elif comic_attr_keys == 'startYear':
                            year = str(comic_attr)
                            print("Year: " + year)
                        elif comic_attr_keys == 'creators':
                            creator_list = []
                            items = comic_attr['items']
                            for create in items:
                                creator_list.append(str(create['name']))
                            print('Creators: ')
                            print(creator_list)
                        elif comic_attr_keys == 'events':
                            # Events have their own dict to go through
                            event_list = []
                            items = comic_attr['items']
                            for event in items:
                                event_list.append(str(event['name']))
                            print('Events: ')
                            print(event_list)
                        print('\n')
    
        
