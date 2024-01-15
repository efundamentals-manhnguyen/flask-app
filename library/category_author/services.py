from library.extension import db
from library.library_ma import BookSchema, AuthorSchema
from library.model import Category, Author
from flask import jsonify, request
from sqlalchemy.sql import func
categories_schema = BookSchema(many=True)
authors_schema = AuthorSchema(many=True)


def add_category_service():
    data = request.json
    if (data and ('name' in data)):
        name = data['name']
        try:
            new_category = Category(name)
            db.session.add(new_category)
            db.session.commit()
            return jsonify({"message": "Add success!"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Can not add category!"}), 400
    else:
        return jsonify({"message": "Request error"}), 400


def get_all_categories_service():
    categories = Category.query.all()
    if categories:
        return categories_schema.jsonify(categories)
    else:
        return jsonify({"message": "Categories not found"}), 404
    

def delete_category_by_id_service(id):
    category = Category.query.get(id)
    if category:
        try:
            db.session.delete(category)
            db.session.commit()
            return jsonify({"message": "Category deleted"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Category not deleted"}), 400
    else:
        return jsonify({"message": "Category not found"}), 404
    

def add_author_service():
    data = request.json
    if (data and ('name' in data)):
        name = data['name']
        try:
            new_author = Author(name)
            db.session.add(new_author)
            db.session.commit()
            return jsonify({"message": "Add success!"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Can not add author"}), 400
    else:
        return jsonify({"message": "Request error"}), 400
    


def get_all_authors_service():
    authors = Author.query.all()
    if authors:
        return authors_schema.jsonify(authors)
    else:
        return jsonify({"message": "Authors not found"}), 404
    

def delete_author_by_id_service(id):
    author = Author.query.get(id)
    if author:
        try:
            db.session.delete(author)
            db.session.commit()
            return jsonify({"message": "Author deleted"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Author dnot deleted"}), 400
    else:
        return jsonify({"message": "Author dnot found"}), 404
    
    


    