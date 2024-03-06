from flask import Blueprint
from ..auth_security.auth_middleware import token_required
from .services import get_borrow_author_cat_service, get_all_borrowed_book_service, add_borrow_book_service, delete_borrow_book_by_id_service
borrow = Blueprint("borrow", __name__)

#get all borrowed books by student name
@borrow.route("/borrow-management/borrow/<string:student_name>", methods=['GET'])
def get_borrow_author_cat(student_name):
    return get_borrow_author_cat_service(student_name)

#get all borrowed books
@borrow.route("/borrow-management/borrow/books", methods=['GET'])
def get_all_borrowed_books():
    return get_all_borrowed_book_service()

#add book borrow
@borrow.route("/borrow-management/borrow", methods=['POST'])
@token_required
def add_book_borrow():
    return add_borrow_book_service()

#delete book borrow
@borrow.route("/borrow-management/borrow/<int:id>", methods=['DELETE'])
@token_required
def delete_book_borrow(id):
    return delete_borrow_book_by_id_service(id)