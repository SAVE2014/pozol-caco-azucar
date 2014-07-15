
import webapp2
import logging
from webapp2_extras import routes

from server.item.item_endpoint import ItemEndpoint

webapp2.WSGIApplication([
    routes.DomainRoute('admin.sauci-catalog.appspot.com', [
        webapp2.Route('/', handler=AdminHandler, name='admin-home'),
    ]),
    webapp2.Route(r'/api/v1/items<:/?><:(.*)>', handler=ItemEndpoint, name='words-endpoint'),
    # webapp2.Route('/admin', handler=AdminHandler, name='test'),
    #webapp2.Route('/seed/<:\w*>', handler=SeedEntities, name='seed'),
    webapp2.Route('/', handler=AppHandler, name='home'),
], debug=True)