import json

from testing_config import BaseTestConfig


class TestAPI(BaseTestConfig):
    def test_get_from_index(self):
        result = self.app.get("/")
        self.assertIn('<html', result.data.decode("utf-8"))

    def test_get_character(self):
        correct_data = {'id': 1009610, 'name': 'Spider-Man'}
        result = self.app.get("/api/character/1009610")
        print(result.data)
        result_data = json.loads(result.data.decode("utf-8"))
        print(result_data)
        for key in correct_data:
            self.assertEqual(correct_data[key], result_data[key])
