# encoding: utf-8
from google.appengine.ext import ndb
import webapp2
import cgi
import json
import logging
import datetime

from server.request.request import Request

class RequestEndpoint(webapp2.RequestHandler):

    def get(self, slash, item_id):

        if item_id:
            item_key = ndb.Key(urlsafe=item_id)
            i = item_key.get()
            item = i.to_dict()
            item['id'] = i.key.urlsafe()
            item['key_id'] = i.key.id()
            item['created'] = i.created.date().strftime("%d, %b %Y")
            item['updated'] = i.created.date().strftime("%d, %b %Y")
            self.response.out.write(json.dumps(item))

        else:
            items = Request.query().fetch()
            items_dict = []
            for i in items:
                item = i.to_dict()
                item['id'] = i.key.urlsafe()
                item['key_id'] = i.key.id()
                item['created'] = i.created.date().strftime("%d, %b %Y")
                item['updated'] = i.created.date().strftime("%d, %b %Y")
                items_dict.append(item)
            self.response.out.write(json.dumps(items_dict))

    def post(self, slash, item_id):
        item_json = json.loads(cgi.escape(self.request.body))
        logging.info(item_json)
        item = read_json(item_json)
        item.put()

    def put(self, slash, item_id):
        item_key = ndb.Key(urlsafe=item_id)
        item = item_key.get()

        item_json = json.loads(cgi.escape(self.request.body))
        logging.info(item_json)
        item.name = item_json['name']
        item.email = item_json['email']
        item.phone = item_json['phone']
        item.comments = item_json['comments']
        item.status = item_json['status']
        item.cars = item_json['cars']
        item.updated = datetime.datetime.now()
        item.put()

    def delete(self, slash, item_id):
        item_key = ndb.Key(urlsafe=item_id)
        item_key.delete()


def read_json(passed_dict):
    return Request(
        name=passed_dict['name'],
        email=passed_dict['email'],
        phone=passed_dict['phone'],
        comments=passed_dict['comments'],
        cars=passed_dict['cars']
    )