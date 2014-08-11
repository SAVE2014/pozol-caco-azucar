from google.appengine.ext import ndb
from google.appengine.ext import blobstore
import webapp2
import cgi
import json
import logging
import datetime


from server.car.car import Car


class CarEndpoint(webapp2.RequestHandler):

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

            type = self.request.get('type', default_value=None)
            cylinders = self.request.get('cylinders', default_value=None)
            minPrice = self.request.get('minPrice', default_value=None)
            maxPrice = self.request.get('maxPrice', default_value=None)

            items = Car.query()

            if type is not None:
                items = items.filter(Car.type == type)

            if cylinders is not None:
                items = items.filter(Car.cylinders == int(cylinders))

            if minPrice is not None:
                items = items.filter(Car.price >= int(minPrice))

            if maxPrice is not None:
                items = items.filter(Car.price <= int(maxPrice))

            items_dict = []
            for i in items:
                item = i.to_dict()
                item['id'] = i.key.urlsafe()
                item['key_id'] = i.key.id()
                item['created'] = i.created.date().strftime("%d, %b %Y")
                item['updated'] = i.created.date().strftime("%d, %b %Y")
                items_dict.append(item)

            logging.info(len(items_dict))
            self.response.out.write(json.dumps(items_dict))

    def post(self, slash, item_id):
        item_json = json.loads(cgi.escape(self.request.body))
        logging.info(item_json)
        item = read_json(item_json)
        item.put()

        item_dict = item.to_dict()
        item_dict['id'] = item.key.urlsafe()
        item_dict['key_id'] = item.key.id()
        item_dict['created'] = item.created.date().strftime("%d, %b %Y")
        item_dict['updated'] = item.created.date().strftime("%d, %b %Y")
        self.response.out.write(json.dumps(item_dict))

    def put(self, slash, item_id ):
        item_key = ndb.Key(urlsafe=item_id)
        item = item_key.get()

        item_json = json.loads(cgi.escape(self.request.body))
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

    def delete(self, slash, item_id):
        item_key = ndb.Key(urlsafe=item_id)
        item = item_key.get()
        images = item.images
        for image  in images:
            blobstore.delete(image['blob_key'])
        item_key.delete()



def read_json(passed_dict):
    return Car(
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