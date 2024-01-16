import unittest
import requests


BASE_URL = "http://127.0.0.1:5000/book-management/book"
URL_GET_ALL_BOOKS = "http://127.0.0.1:5000/book-management/books"



class TestBookApi(unittest.TestCase):
    #test get_all_books
    def test_get_all_books(self):
        response = requests.get(URL_GET_ALL_BOOKS)
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.json()), 0)

    #test get_book_by_id
    def test_get_book_by_id(self):
        response = requests.get(BASE_URL + "/3")
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.json()), 1)

    #negative test get_book_by_id
    def test_get_book_by_id_negative(self):
        response = requests.get(BASE_URL + "/100")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(len(response.json()), 1)

    #test delete_book_by_id
    def test_delete_book_by_id(self):
        response = requests.get(BASE_URL + "/5")
        self.assertEqual(response.status_code, 200)

    #test delete_book_by_id_negative
    def test_delete_book_by_id_negative(self):
        response = requests.get(BASE_URL + "/100")
        self.assertEqual(response.status_code, 404)

    #test get_book_by_author
    def test_get_book_by_author(self):
        response = requests.get(BASE_URL + "/Michale")
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.json()), 0)

    #test get_book_by_author_nagative
    def test_get_book_by_author_negative(self):
        response = requests.get(BASE_URL + "/Manh")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(len(response.json()), 1)

    #test update_book_by_id
    def test_update_book_by_id(self):
        response = requests.put(BASE_URL + "/3", json={
            "name": "The Worm",
            "page_count": 100,
            "author_id" : 2,
            "category_id": 2
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], "Book updated")

    #test update_book_by_id_negative
    def test_update_book_by_id_negative(self):
        response = requests.put(BASE_URL + "/1", json={
            "name": "The Worm",
            "page_count": 100,
            "author_id" : 2,
            "category_id": 2
        })
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['message'], "Book not found")

    #test add_book
    def test_add_book(self):
        response = requests.post(BASE_URL, json={
            "name": "The Women Right",
            "page_count": 200,
            "author_id" : 2,
            "category_id": 4
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], "Add success!")

    #test add_book_negative
    def test_add_book_negative(self):
        response = requests.post(BASE_URL, json={
            "name": "The Women Right",
            "page_count": 200,
            "category_id": 4
        })
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['message'], "Request error")