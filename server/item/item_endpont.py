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
        item_json = json.loads(cgi.escape(self.request.body))
        logging.info(item_json)
        item = read_json(item_json)
        item.put()

    def put(self, slash, item_id ):
        item_key = ndb.Key(urlsafe=item_id)
        item = item_key.get()

        item_json = json.loads(self.request.body)
        logging.info(item_json)
        item.model = item_json['model']
        item.brand = item_json['brand']
        item.type = item_json['type']
        item.cylinders = int(item_json['cylinders'])
        item.engine = float(item_json['engine'])
        item.price = int(item_json['price'])
        item.power = int(item_json['power'])
        item.airbags = item_json['airbags']
        item.sunroof = item_json['sunroof']
        item.airBreaks = item_json['airBreaks']
        item.gps = item_json['gps']
        item.blueTooth = item_json['blueTooth']
        item.description = item_json['description']
        item.images = item_json['images']
        item.updated = datetime.datetime.now()

        item.put()


def read_json(passed_dict):
    return Item(
        model=passed_dict['model'],
        brand=passed_dict['brand'],
        type=passed_dict['type'],
        cylinders=int(passed_dict['cylinders']),
        engine=float(passed_dict['engine']),
        price=int(passed_dict['price']),
        power=int(passed_dict['power']),
        airbags=passed_dict['airbags'],
        sunroof=passed_dict['sunroof'],
        airBreaks=passed_dict['airBreaks'],
        gps=passed_dict['gps'],
        blueTooth=passed_dict['blueTooth'],
        description=passed_dict['description'],
        images=passed_dict['images']
    )