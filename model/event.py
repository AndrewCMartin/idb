from google.appengine.ext.ndb import ndb

class Event (ndb.Model):
    id = ndb.IntegerProperty(required=True)
