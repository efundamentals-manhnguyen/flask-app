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
        response = requests.get(BASE_URL + "/Timmy")
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.json()), 0)

    #test get_all_borrowed_by_student_name_negative
    def test_get_all_borrowed_by_student_name_negative(self):
        response = requests.get(BASE_URL + "/Manh Nguyen")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['message'], "Not found borrow!")

    #test delete_borrow_by_id
    def test_delete_borrow_by_id(self):
        response = requests.delete(BASE_URL + "/2")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], "Borrow book deleted")

    #test delete_borrow_by_id_negative
    def test_delete_borrow_by_id_negative(self):
        response = requests.delete(BASE_URL + "/100")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['message'], "Borrow book not found")

    #test add_borrow_book
    def test_add_borrow_book(self):
        response = requests.post(BASE_URL, json={
            "book_id": 8,
            "student_id": 1,
            "borrow_date" : "17/01/2024",
            "return_date": "31/02/2024"
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], "Add success!")

    #test add_borrow_book_negative
    def test_add_borrow_book_negative(self):
        response = requests.post(BASE_URL, json={
            "book_id": 8,
            "student_id": 1,
            "genre" : "Action",
            "return_date": "31/02/2024"
        })
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['message'], "Request error")