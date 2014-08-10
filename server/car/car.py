import logging
from google.appengine.api import search
from google.appengine.ext import ndb


class Car(ndb.Model):

    created = ndb.DateTimeProperty(auto_now_add=True)
    updated = ndb.DateTimeProperty(auto_now_add=True)
    model = ndb.StringProperty()
    brand = ndb.StringProperty()
    type = ndb.StringProperty(indexed=True)
    cylinders = ndb.IntegerProperty(indexed=True)
    engine = ndb.FloatProperty()
    price = ndb.IntegerProperty(indexed=True)
    power = ndb.IntegerProperty()
    airbags = ndb.BooleanProperty()
    sunroof = ndb.BooleanProperty()
    airBreaks = ndb.BooleanProperty()
    gps = ndb.BooleanProperty()
    blueTooth = ndb.BooleanProperty()
    description =ndb.TextProperty()
    images = ndb.JsonProperty(repeated=True)