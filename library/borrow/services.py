from library.extension import db
from library.model import Author, Books, Borrows, Category, Students
from flask import jsonify
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
