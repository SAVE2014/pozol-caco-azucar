import logging
from google.appengine.api import search
from google.appengine.ext import ndb


class Item(ndb.Model):
    INDEX = 'Items'

    model = ndb.StringProperty(indexed=True)
    type = ndb.StringProperty(indexed=True)
    brand = ndb.StringProperty(indexed=True)
    image = ndb.StringProperty()
    price = ndb.IntegerProperty(indexed=True)



    def _post_put_hook(self, future):

        fields = [
            search.TextField(name='search_name', value=self.build_suggestions(self.name)),
            search.TextField(name='name', value=self.name)

        ]

        doc = search.Document(doc_id=self.key.urlsafe(), fields=fields)

        try:
            search.Index(name=self.INDEX).put(doc)
        except search.Error:
            logging.exception('Add failed')


    @staticmethod
    def build_suggestions(value):
        suggestions = []
        for word in value.split():
            prefix = ""
            for letter in word:
                prefix += letter
                suggestions.append(prefix)
        return ' '.join(suggestions)