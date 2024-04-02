from flask import Blueprint
from .services import get_all_categories_service, add_category_service, delete_category_by_id_service, add_author_service, get_all_authors_service, delete_author_by_id_service
category = Blueprint("category", __name__)


# add a category
@category.route("/category-management/category", methods=['POST'])
def add_category():
    return add_category_service()


# get all categories
@category.route("/category-management/categories", methods=['GET'])
def get_all_categories():
    return get_all_categories_service()


# delete category
@category.route("/category-management/category/<int:id>", methods=['DELETE'])
def delete_category_by_id(id):
    return delete_category_by_id_service(id)


# add an author
@category.route("/author-management/author", methods=['POST'])
def add_author():
    return add_author_service()


# get all authors
@category.route("/author-management/authors", methods=['GET'])
def get_all_authors():
    return get_all_authors_service()


# delete author
@category.route("/author-management/author/<int:id>", methods=['DELETE'])
def delete_author_by_id(id):
    return delete_author_by_id_service(id)
