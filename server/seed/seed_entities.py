# encoding: utf-8
from google.appengine.ext import ndb
import webapp2
from server.car.car import Car
import random

class SeedEntities(webapp2.RequestHandler):

    def get(self, type):
        response  = ''
        if not type:
            response += make_items()
        else:
            if type == 'items':
                response += make_items()
            elif type == 'somethig else':
                pass

        self.response.write(response)


def make_items():
    types = ['Computadora', 'Laptop', 'Impresora', 'Monitor', 'accesorio']
    brands = ['HP', 'Apple', 'Dell', 'Access', 'Patito']
    prices = [7000, 5334, 12999, 9999, 8000]
    items = []

    for x in range(0, 100):
        item = Car(
            model='Item ' + str(x),
            type=types[random.randint(0, 4)],
            brand=brands[random.randint(0, 4)],
            price=prices[random.randint(0,4)],
            description='Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.')
        items.append(item)

    ndb.put_multi(items)
    return "seeded %s items" % len(items)