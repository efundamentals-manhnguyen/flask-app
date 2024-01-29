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
    if (data and ('name' in data) and ('image_url' in data) and ('description' in data) 
            and ('author_id' in data) and ('category_id' in data)):
        name = data['name']
        image_url = data['image_url']
        description = data['description']
        author_id = data['author_id']
        category_id = data['category_id']
        try:
            new_book = Books(name, image_url, description, author_id, category_id)
            db.session.add(new_book)
            db.session.commit()
            return jsonify({"message": "Add success!"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Can not add book!"}), 400
    else:
        return jsonify({"message": "Request error"}), 400
    

def get_book_by_id_service(id):
    book = db.session.query(Books.name, Books.image_url, Books.description, Category.name, Author.name).join(Author, Books.author_id== Author.id).join(Category, Books.category_id == Category.id).filter(
        Books.id == id
    )
    results = [tuple(row) for row in book]
    if results:
        return jsonify({"Books": results}), 200
    else:
        return jsonify({"message": "Books not found"}), 404
    

def get_all_books_service():
    books = db.session.query(Books.name, Books.image_url, Category.name, Books.author_id, Books.category_id, Books.id).join(Category).all()
    results = [tuple(row) for row in books]
    if results:
        return jsonify({"Books": results}), 200
    else:
        return jsonify({"message": "Books not found"}), 404
    


def update_book_by_id_service(id):
    book = Books.query.get(id)
    data = request.json
    if book:
        if (data and ('name' in data) and ('image_url' in data) and ('description' in data) 
                and ('author_id' in data) and ('category_id' in data)):
            try:
                book.name = data['name']
                book.image_url = data['image_url']
                book.description = data['description']
                book.author_id = data['author_id']
                book.category_id = data['category_id']
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
    books = db.session.query(Books.name, Books.image_url, Category.name, Books.author_id, Books.category_id, Books.id).join(Category).join(Author).filter(
        func.lower(Author.name) == author.lower()).all()
    results = [tuple(row) for row in books]
    if results:
        return jsonify({"Books": results}), 200
    else:
        return jsonify({"message": "Books not found"}), 404


def get_book_by_category_name_service(category):
    books = db.session.query(Books.name, Books.image_url, Category.name, Books.author_id, Books.category_id, Books.id).join(Author).join(Category).filter(
        func.lower(Category.name) == category.lower()).all()
    results = [tuple(row) for row in books]
    if results:
        return jsonify({"Books": results}), 200
    else:
        return jsonify({"message": "Books not found"}), 404
   
    
