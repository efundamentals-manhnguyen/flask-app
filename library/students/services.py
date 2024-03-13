from library.extension import db
from library.library_ma import StudentSchema
from library.model import Author, Books, Category, Students
from flask import request, jsonify, make_response
from sqlalchemy.sql import func
import json, hashlib
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

def hash_password(password):
    password_bytes = password.encode('utf-8')
    hashed_password = hashlib.sha256(password_bytes)
    hex_dig_password = hashed_password.hexdigest()
    return hex_dig_password

def add_student_service():
    data = request.json
    if (data and ('name' in data) and ('email' in data) and ('password' in data) and ('dob' in data)
            and ('gender' in data) and ('class_name' in data)):
        name = data['name']
        email = data['email']
        password =  hash_password(data['password'])
        dob = data['dob']
        gender = data['gender']
        class_name = data['class_name']
        try:
            new_student = Students(name, email, password, dob, gender, class_name)
            db.session.add(new_student)
            db.session.commit()
            return jsonify({"message": "Add success!"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Can not add student!"}), 400
    else:
        return jsonify({"message": "Request error"}), 400
    

def get_all_students_service():
    students = Students.query.all()
    if students :
        return students_schema.jsonify(students)
    else:
        return jsonify({"message": "Students not found"}), 404
    

def delete_student_by_id_service(id):
    student = Students.query.get(id)
    if student:
        try:
            db.session.delete(student)
            db.session.commit()
            return jsonify({"message": "Student deleted"}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Student not deleted"}), 400
    else:
        return jsonify({"message": "Student not found"}), 404
    

def get_student_by_id_service(id):
    student = Students.query.get(id)
    if student:
        return student_schema.jsonify(student)
    else:
        return jsonify({"message": "Student not found"}), 404
    

def update_student_by_id_service(id):
    student = Students.query.get(id)
    data = request.json
    if student:
        if (data and ("name" in data) and ("birth_date" in data) and ("gender" in data) and ("class_name" in data)):
            try:
                student.name = data['name']
                student.birth_date = data['birth_date']
                student.gender = data['gender']
                student.class_name = data['class_name']
                db.session.commit()
                return jsonify({"message": "Student updated"}), 200
            except IndentationError:
                db.session.rollback()
                return jsonify({"message": "Student can not be updated"}), 400
    else:
        return jsonify({"message": "Student not found"}), 404
