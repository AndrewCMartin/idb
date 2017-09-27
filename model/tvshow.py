from google.appengine.ext.ndb import ndb

class TVShow (ndb.Model):
    data = ndb.JsonProperty()
