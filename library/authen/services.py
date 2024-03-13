from library.library_ma import StudentSchema
from library.model import Students
from flask import request, jsonify
import jwt, os, hashlib
from datetime import datetime, timedelta
from ..students.services import hash_password
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

SECRET_KEY = os.environ.get("KEY")
SECURITY_ALGORITHM = 'HS256'


def generate_token(student_id):
    expire = datetime.utcnow() + timedelta(
        seconds = 60 * 60 * 24 * 3 # Expired after 3 days
    )
    to_encode = {
        "exp": expire, "student_id": student_id
    }
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=SECURITY_ALGORITHM)

    return encoded_jwt


def login_service():
    data = request.json
    if (data and("email" in data) and ("password" in data)):
        email = data['email']
        password = hash_password(data['password'])
        student = students_schema.dump(Students.query.filter_by(email = email, password = password))
        if(student):   
            token =  generate_token(student[0]['id']) 
            return jsonify({'x-access-token': token, 'x-user-name': student[0]['name']}), 200
        else:
            return jsonify({"message": "Login failed"}), 401
    else:
        return jsonify({"message": "Please fill login form!!!"}), 404
    