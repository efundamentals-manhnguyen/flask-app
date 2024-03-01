from flask import Flask, request, Blueprint, render_template
from flask_cors import CORS
from .books.controller import books
from .borrow.controller import borrow
from .students.controller import students
from .category_author.controller import category
from .authen.controller import authen
from .extension import db, ma
from .model import Students, Books, Author, Category, Borrows


def create_app(config_file = "config.py"):
    app = Flask(__name__, static_url_path='',
                  static_folder='../front_end',
                  template_folder='../front_end')
    CORS(app)
    app.config.from_pyfile(config_file)
    @app.route('/')
    def index():
        return render_template('index.html')
    db.init_app(app)
    ma.init_app(app)
    with app.app_context():
        db.create_all()
    app.register_blueprint(books)
    app.register_blueprint(borrow)
    app.register_blueprint(category)
    app.register_blueprint(students)
    app.register_blueprint(authen)
    return app