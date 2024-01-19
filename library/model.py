from .extension import db


class Students(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    dob = db.Column(db.String(10))
    gender = db.Column(db.String(10))
    class_name = db.Column(db.String(10))

    def __init__(self, name, email, password,  dob, gender, class_name):
        self.name = name
        self.email = email
        self.password = password
        self.dob = dob
        self.gender = gender
        self.class_name = class_name


class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))

    def __init__(self, name, image_url, description, author_id, category_id):
        self.name = name
        self.image_url = image_url
        self.description = description
        self.author_id = author_id
        self.category_id = category_id


class Borrows(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"))
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    borrow_date = db.Column(db.String(10))
    return_date = db.Column(db.String(10))

    def __init__(self, book_id, student_id, borrow_date, return_date):
        self.book_id = book_id
        self.student_id = student_id
        self.borrow_date = borrow_date
        self.return_date = return_date


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    def __init__(self, name):
        self.name = name


class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    def __init__(self, name):
        self.name = name