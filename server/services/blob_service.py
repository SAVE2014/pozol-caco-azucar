# encoding: utf-8

import urllib
import logging
import json
from google.appengine.api import images
from google.appengine.ext import blobstore
from google.appengine.ext.blobstore import BlobReader, BlobInfo, BlobKey
from google.appengine.ext.webapp import blobstore_handlers


class UploadService(blobstore_handlers.BlobstoreUploadHandler):

    def get(self):

        post_url = self.request.get('url', '/api/v1/services/upload')
        resp = {'url': blobstore.create_upload_url(post_url)}
        self.response.out.write(json.dumps(resp))

    def post(self):

        upload_files = self.get_uploads()
        blob_info = upload_files[0]

        resp = {
            'blob_key': str(blob_info.key()),
            'content_type': blob_info.content_type,
            'created': str(blob_info.creation),
            'file_name': blob_info.filename,
            'size': blob_info.size,
            'url': '/serve/{}'.format(str(blob_info.key()))
        }
        self.response.out.write(json.dumps(resp))


class DownloadService(blobstore_handlers.BlobstoreDownloadHandler):

    def get(self, blob_key):

        logging.info('BLOB_KEY: {}'.format(blob_key))

        resource = str(urllib.unquote(blob_key))
        blob_info = blobstore.BlobInfo.get(resource)

        try:

            img = images.Image(blob_key=resource)
            img.resize(height=220, width=220)

            if blob_info.content_type == 'images/jpeg':
                encoding = 1
            else:
                encoding = 0

            resp = img.execute_transforms(output_encoding=encoding)

            self.response.headers['Content-Type'] = str(blob_info.content_type)
            return self.response.out.write(resp)
        except Exception as e:
            self.send_blob(blob_info)