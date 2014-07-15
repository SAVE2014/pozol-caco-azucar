import logging
from google.appengine.api import search
from google.appengine.ext import ndb


class Item(ndb.Model):
    INDEX = 'Items'

    model = ndb.StringProperty(indexed=True)
    type = ndb.StringProperty(indexed=True)
    brand = ndb.StringProperty(indexed=True)
    image = ndb.StringProperty()
    price = ndb.FloatProperty(indexed=True)
    description =ndb.TextProperty()