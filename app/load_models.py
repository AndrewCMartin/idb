import json
from app.models import *
def load():
    shows = []
    with open('app/static/tv_response.json') as file:
        shows = json.loads(file.read())['results']
    for s in shows:
        print (s, type(s))
        new_show = TV_Show(id=s['id'], name=s['name'])
        show_key = new_show.put()
        print(show_key)
