from flask import Blueprint
from .services import get_borrow_author_cat_service, get_all_borrowed_book_service
borrow = Blueprint("borrow", __name__)

#get all borrowed books by student name
@borrow.route("/borrow-management/borrow/<string:student_name>", methods=['GET'])
def get_borrow_author_cat(student_name):
    return get_borrow_author_cat_service(student_name)

#get all borrowed books
@borrow.route("/borrow-management/borrow/books", methods=['GET'])
def get_all_borrowed_books():
    return get_all_borrowed_book_service()