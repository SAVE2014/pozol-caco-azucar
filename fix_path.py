# encoding: utf-8

""" import this file into appengine_config.py so it automatically fixes the path for any request """

import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), 'libs'))
