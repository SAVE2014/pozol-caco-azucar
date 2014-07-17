from google.appengine.ext import ndb
import webapp2
import cgi
import json
import logging
import datetime


from server.item.item import Item


class ItemEndpoint(webapp2.RequestHandler):

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
            items = Item.query().fetch()
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
        item_json = cgi.escape(self.request.body)
        item = read_json(item_json)
        item.put()

    def put(self, slash, item_id ):
        item_key = ndb.Key(urlsafe=item_id)
        item = item_key.get()

        item_json = json.loads(self.request.body)

        item.model = item_json['model']
        item.type = item_json['type']
        item.brand = item_json['brand']
        item.image = item_json['image']
        item.price = item_json['price']
        item.description = item_json['description']
        item.updated = datetime.datetime.now()

        item.put()


def read_json(passed_dict):
    return Item(
        name=passed_dict['model'],
        type=passed_dict['type'],
        brand=passed_dict['brand'],
        image=passed_dict['image'],
        price=passed_dict['price'],
        description=passed_dict['description']
    )