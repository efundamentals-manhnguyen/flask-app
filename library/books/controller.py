from flask import Blueprint
import os
from flask import request
from ..auth_security.auth_middleware import token_required
from .services import add_book_service, get_book_by_id_service, get_all_books_service, update_book_by_id_service, delete_book_by_id_service, get_book_by_author_service, get_book_by_category_name_service
books = Blueprint("books", __name__)


#add a new book
@books.route("/book-management/book", methods=['POST'])
@token_required
def add_book():
    return add_book_service()

@books.route("/book-management/book/upload/<filename>", methods=["POST"])
def post_file(filename):
    """Upload a file."""

    # if "/" in filename:
    #     # Return 400 BAD REQUEST
    #     abort(400, "no subdirectories allowed")
    dirname = os.path.dirname(__file__)
    with open(os.path.join(dirname, "../../front_end/img/", filename), "wb") as fp:
        fp.write(request.data)

    # Return 201 CREATED
    return "", 201

#get a book by id
@books.route("/book-management/book/<int:id>", methods=['GET'])
def get_book_by_id(id):
    return get_book_by_id_service(id)


#get all books
@books.route("/book-management/books", methods=['GET'])
def get_all_books():
    return get_all_books_service()


#update a book
@books.route("/book-management/book/<int:id>", methods=['PUT'])
@token_required
def update_book_by_id(id):
    return update_book_by_id_service(id)


#delete a book
@books.route("/book-management/book/<int:id>", methods=['DELETE'])
@token_required
def delete_book_by_id(id):
    return delete_book_by_id_service(id)


#get a book by author
@books.route("/book-management/book/author/<string:author>", methods=['GET'])
def get_book_by_author(author):
    return get_book_by_author_service(author)

#get a book by category name
@books.route("/book-management/book/category/<string:category>", methods=['GET'])
def get_book_by_category_name(category):
    return get_book_by_category_name_service(category)




