import json

from app.models import db, Character, Movie
from testing_config import BaseTestConfig


class TestAPI(BaseTestConfig):
    def test_get_from_index(self):
        result = self.app.get("/")
        self.assertIn('<html', result.data.decode("utf-8"))

    def test_add_character(self):
        c = Character(123, "Example_name", "Description", "/.jpg", "")
        db.session.merge(c)
        db.session.commit()
        q = Character.query.filter_by(id=123).first()
        self.assertEqual(q.id, c.id)
        self.assertEqual(q.name, c.name)

    def test_add_movie(self):
        m = Movie(443, "Example_movie", "", False, "", 200, None, "en", 5)
        db.session.merge(m)
        db.session.commit()
        q = Movie.query.filter_by(id=443).first()
        self.assertEqual(q.id, m.id)
        self.assertEqual(q.title, m.title)

    def test_get_character(self):
        c = Character(123, "Example_name", "Description", "/.jpg", "")
        db.session.merge(c)
        db.session.commit()
        correct_data = {'id': 123, 'name': 'Example_name'}
        result = self.app.get("/api/character/123")
        result_data = json.loads(result.data.decode("utf-8"))
        for key in correct_data:
            self.assertEqual(correct_data[key], result_data[key])
