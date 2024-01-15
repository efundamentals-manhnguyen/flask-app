from library.extension import db
from library.library_ma import BookSchema
from library.model import Author, Books, Category
from flask import request, jsonify
from sqlalchemy.sql import func
import json
book_schema = BookSchema()
books_schema = BookSchema(many=True)


def add_book_service():
    data = request.json
    if (data and ('name' in data) and ('page_count' in data)
            and ('author_id' in data) and ('category_id' in data)):
        name = data['name']
        page_count = data['page_count']
        author_id = data['author_id']
        category_id = data['category_id']
        try:
            new_book = Books(name, page_count, author_id, category_id)
            db.session.add(new_book)
            db.session.commit()
            return jsonify({"message": "Add success!"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Can not add book!"}), 400
    else:
        return jsonify({"message": "Request error"}), 400
    

def get_book_by_id_service(id):
    book = Books.query.get(id)
    if book:
        return book_schema.jsonify(book)
    else:
        return jsonify({"message": "Book not found"}), 404
    

def get_all_books_service():
    books = Books.query.all()
    if books:
        return books_schema.jsonify(books)
    else:
        return jsonify({"message": "Book not found"}), 404
    


def update_book_by_id_service(id):
    book = Books.query.get(id)
    data = request.json
    if book:
        if data and "page_count" in data:
            try:
                book.page_count = data["page_count"]
                db.session.commit()
                return jsonify({"message": "Book updated"}), 200
            except IndentationError:
                db.session.rollback()
                return jsonify({"message": "Book can not be updated"}), 400
    else:
        return jsonify({"message": "Book not found"}), 404
    

def delete_book_by_id_service(id):
    book = Books.query.get(id)
    if book:
        try:
            db.session.delete(book)
            db.session.commit()
            return jsonify({"message": "Book deleted"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Book not deleted"}), 400
    else:
        return jsonify({"message": "Book not found"}), 404
    

def get_book_by_author_service(author):
    books = Books.query.join(Author).filter(
        func.lower(Author.name) == author.lower()).all()
    if books:
        return books_schema.jsonify(books)
    else:
        return jsonify({"message": f"Books not found {author}"}), 404
    
