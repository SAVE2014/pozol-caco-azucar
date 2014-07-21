
import webapp2
import logging
from webapp2_extras import routes

from server.modules.app import AppHandler
from server.modules.admin import AdminHandler
from server.item.item_endpont import ItemEndpoint
from server.seed.seed_entities import SeedEntities
from server.services.blob_service import UploadService
from server.services.blob_service import DownloadService


app = webapp2.WSGIApplication([
    routes.DomainRoute('admin.sauci-catalog.appspot.com', [
        webapp2.Route('/', handler=AdminHandler, name='admin-home'),
    ]),
    webapp2.Route(r'/api/v1/items<:/?><:(.*)>', handler=ItemEndpoint, name='words-endpoint'),
    webapp2.Route(r'/api/v1/services/upload', handler=UploadService, name='upload-service'),
    webapp2.Route(r'/serve/<blob_key:>', handler=DownloadService, name='download-service'),
    webapp2.Route('/admin', handler=AdminHandler, name='admin-home'),
    webapp2.Route('/seed/<:\w*>', handler=SeedEntities, name='seed'),
    webapp2.Route('/', handler=AppHandler, name='home'),
], debug=True)