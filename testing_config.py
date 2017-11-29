import os

import flask_whooshalchemyplus as whooshalchemy
from flask_testing import TestCase

from app import app, db
from app.models import Actor, Character, ComicSeries, Event, Movie, TvShow
from config import BASE_DIR


class BaseTestConfig(TestCase):

    def create_app(self):
        app.config.from_object('config.TestingConfig')
        return app

    def setUp(self):
        self.app = self.create_app().test_client()
        db.create_all()
        models_list = [Actor, Character, ComicSeries, Event, Movie, TvShow]
        app.config['WHOOSH_BASE'] = os.path.join(BASE_DIR, 'tests', 'whoosh_index')

        for model in models_list:
            whooshalchemy.whoosh_index(app, model)

        res = self.app.get()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
