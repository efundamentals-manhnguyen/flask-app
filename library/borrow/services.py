from library.extension import db
from library.model import Author, Books, Borrows, Category, Students
from flask import jsonify, request
from sqlalchemy.sql import func


def get_borrow_author_cat_service(student_name):
    borrows = db.session.query(Borrows.id, Books.name, Category.name, Author.name).join(Students, Borrows.student_id == Students.id).join(Books, Borrows.book_id == Books.id).join(
        Category, Books.category_id == Category.id).join(Author, Books.author_id == Author.id).filter(func.lower(Students.name) == student_name.lower()).all()
    results = [tuple(row) for row in borrows]
    if results:
        return jsonify({f"{student_name} borrowed": results}), 200
    else:
        return jsonify({"message": "Not found borrow!"}), 404
   
def get_all_borrowed_book_service():
    books = db.session.query(Borrows.id, Books.name).join(Books).all()
    results = [tuple(row) for row in books]
    if results:
        return jsonify({"Borrowed books": results}), 200
    else:
        return jsonify({"message": "Borrowed book not found"}), 404
    
def add_borrow_book_service():
    data = request.json
    if (data and ('book_id' in data) and ('student_id' in data)
            and ('borrow_date' in data) and ('return_date' in data)):
        book_id = data['book_id']
        student_id = data['student_id']
        borrow_date = data['borrow_date']
        return_date = data['return_date']
        try:
            new_borrow = Borrows(book_id, student_id, borrow_date, return_date)
            db.session.add(new_borrow)
            db.session.commit()
            return jsonify({"message": "Add success!"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Can not add book borrow!"}), 400
    else:
        return jsonify({"message": "Request error"}), 400
    
def delete_borrow_book_by_id_service(id):
    borrow = Borrows.query.get(id)
    if borrow:
        try:
            db.session.delete(borrow)
            db.session.commit()
            return jsonify({"message": "Borrow book deleted"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Borrow book not deleted"}), 400
    else:
        return jsonify({"message": "Borrow book not found"}), 404
    
