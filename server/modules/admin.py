# encoding: utf-8

import webapp2
import os
import jinja2
import logging
import json

loader = os.path.dirname(__file__).rsplit('/', 2)[0]
loader_path = os.path.join(loader, 'client/modules/admin')

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(loader_path),
    extensions=['jinja2.ext.autoescape'],
    autoescape=False,
    variable_start_string='{!',
    variable_end_string='!}',)

class AdminHandler(webapp2.RequestHandler):

    def get(self, url):
        template_path = 'release/admin.html'
        logging.info('release environment')
        if self.request.get('debug', None) or self.app.debug:
            template_path = 'build/admin.html'
            logging.info('build environment')

        template = JINJA_ENVIRONMENT.get_template(template_path)

        self.response.out.write(template.render())