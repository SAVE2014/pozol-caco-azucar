# encoding: utf-8

import os
import sys
import shutil

try:
    script, param = sys.argv
except ValueError as e:
    param = None

root = os.getcwd()
print 'root', root
module_root = os.path.join(root, 'modules')


def check_dir(folder):
    if not os.path.exists(folder):
        return False

    no_folders = True
    contents = os.listdir(folder)
    for each in contents:
        if os.path.isdir(each):
            no_folders = False

    return no_folders


def npm_install():
    os.chdir(root)
    os.system('npm install')


def bower_install():
    os.chdir(root)
    os.chdir('manage')
    os.system('bower cache clean')
    os.system('bower install')


def build():
    print 'building apps'
    print 'module root', module_root
    os.chdir(module_root)
    for module in os.listdir(module_root):

        if not os.path.isdir(module):
            continue

        print 'module', module
        os.chdir(module)
        print 'root', os.getcwd()
        os.system('grunt')
        os.chdir(module_root)
        print 'root', os.getcwd()
        print ''


def remove_all():
    paths = ['node_modules', 'manage/vendor']
    for path in paths:
        if os.path.exists(path):
            shutil.rmtree(path)


if param:
    if param == 'remove':
        remove_all()

npm_install()
bower_install()
build()


