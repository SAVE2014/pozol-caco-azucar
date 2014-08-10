# encoding: utf-8
import logging
from google.appengine.api import search
from google.appengine.ext import ndb


class Request(ndb.Model):

    created = ndb.DateTimeProperty(auto_now_add=True)
    updated = ndb.DateTimeProperty(auto_now_add=True)
    name = ndb.StringProperty()
    email = ndb.StringProperty()
    phone = ndb.StringProperty()
    comments = ndb.TextProperty()
    status = ndb.StringProperty(default='No revisado')
    cars = ndb.StringProperty(repeated=True)