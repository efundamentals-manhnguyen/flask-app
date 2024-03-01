from library.library_ma import StudentSchema
from library.model import Students
from flask import request, jsonify
import jwt, os
from datetime import datetime, timedelta
from functools import wraps
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
        password = data['password']
      
        student = students_schema.dump(Students.query.filter_by(email = email, password = password))
        if(student):   
            token =  generate_token(student[0]['id']) 
            return token
        else:
            return jsonify({"message": "Login failed"}), 404
    else:
        return jsonify({"message": "Please fill login form!!!"}), 404
    

#decorator for verifying the JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
        
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, SECRET_KEY)
            current_user = Students.query.filter_by(id = data['id']).first()
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
            raise
        # returns the current logged in users context to the routes
        return  f(current_user, *args, **kwargs)
  
    return decorated