import logging
from google.appengine.api import search
from google.appengine.ext import ndb


class Item(ndb.Model):

    created = ndb.DateTimeProperty(auto_now_add=True)
    updated = ndb.DateTimeProperty(auto_now_add=True)
    model = ndb.StringProperty(indexed=True)
    type = ndb.StringProperty(indexed=True)
    brand = ndb.StringProperty(indexed=True)
    price = ndb.FloatProperty(indexed=True)
    description =ndb.TextProperty()
    image = ndb.StringProperty()