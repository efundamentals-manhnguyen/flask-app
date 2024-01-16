import unittest
import requests

BASE_URL = "http://127.0.0.1:5000/borrow-management/borrow"


class TestBorrowApi(unittest.TestCase):
    #test get_all_borrowed_books
    def test_get_all_borrowed_books(self):
        response = requests.get(BASE_URL + "/books")
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.json()), 0)

    #test get_all_borrowed_by_student_name
    def test_get_all_borrowed_by_student_name(self):
        response = requests.get(BASE_URL + "/Tommy Beer")
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.json()), 0)

    #test get_all_borrowed_by_student_name_negative
    def test_get_all_borrowed_by_student_name_negative(self):
        response = requests.get(BASE_URL + "/manh Nguyen")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['message'], "Not found borrow!")
