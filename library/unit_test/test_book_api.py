import unittest
import requests


URL_GET_ALL_BOOKS = "http://127.0.0.1:5000/book-management/books"
URL_GET_BOOK_BY_ID = "http://127.0.0.1:5000/book-management/book"

class TestBookApi(unittest.TestCase):
    #Positive testcase
    def test_get_all_books(self):
        response = requests.get(URL_GET_ALL_BOOKS)
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.json()), 0)
    def test_get_book_by_id(self):
        response = requests.get(URL_GET_BOOK_BY_ID + "/3")
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.json()), 1)

    #Negative testcase
    def test_get_book_by_id_negative(self):
        response = requests.get(URL_GET_BOOK_BY_ID + "/100")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(len(response.json()), 1)