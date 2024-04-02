from flask import Blueprint
from .services import add_student_service, get_all_students_service, delete_student_by_id_service, get_student_by_id_service, update_student_by_id_service
students = Blueprint("students", __name__)


# add a new student
@students.route("/student-management/student", methods=['POST'])
def add_student():
    return add_student_service()


# get all students
@students.route("/student-management/students", methods=['GET'])
def get_all_students():
    return get_all_students_service()


# get a student by id
@students.route("/student-management/student/<int:id>", methods=['GET'])
def get_student_by_id(id):
    return get_student_by_id_service(id)


# delete student
@students.route("/student-management/student/<int:id>", methods=['DELETE'])
def delete_student(id):
    return delete_student_by_id_service(id)


# update student
@students.route("/student-management/student/<int:id>", methods=['PUT'])
def update_student(id):
    return update_student_by_id_service(id)
