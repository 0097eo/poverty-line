from config import app, api, db, bcrypt
from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import smtplib
from models import User, Profile
from email.mime.text import MIMEText
import secrets

def send_verification_email(email, verification_code):
    sender = 'emmanuelokello294@gmail.com'
    recipient = email
    subject = 'PovertyLine - Verify your email'
    body = f'Your verification code is : {verification_code}'

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = recipient

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
            smtp.starttls()
            smtp.login('emmanuelokello294@gmail.com', 'quzo ygrw gcse maim')
            smtp.send_message(msg)
    except smtplib.SMTPException as e:
        print(f"Error sending verification email: {e}")
        raise e
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise e

class Register(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if User.query.filter_by(username=username).first():
            return {"error": "Username already exists"}, 400
        if User.query.filter_by(email=email).first():
            return {"error": "Email already exists"}, 400

        verification_code = secrets.token_hex(3)
        new_user = User(username=username, email=email, verification_code=verification_code)
        new_user.password = password

        try:
            db.session.add(new_user)
            db.session.commit()
            send_verification_email(email, verification_code)
            return {"message": "User registered successfully. Please check your email for verification."}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

class Verify(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        verification_code = data.get('verification_code')

        user = User.query.filter_by(email=email).first()
        if not user:
            return {"error": "User not found"}, 404

        if user.verification_code != verification_code:
            return {"error": "Invalid verification code"}, 400

        user.is_verified = True
        user.verification_code = None
        db.session.commit()

        return {"message": "Email verified successfully"}, 200

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()
        if not user or not user.verify_password(password):
            return {"error": "Invalid username or password"}, 401
        
        if not user.is_verified:
            return {"error": "Email is not verified"}, 403
        
        access_token = create_access_token(identity=user.id)
        return {"access_token": access_token}, 200

class ProfileResource(Resource):
    @jwt_required()
    def post(self):
        current_user_id = get_jwt_identity()
        data = request.get_json()

        user = db.session.get(User, current_user_id)
        if user.profile:
            return {"error": "Profile already exists"}, 400

        new_profile = Profile(
            user_id=current_user_id,
            full_name=data.get('full_name'),
            bio=data.get('bio'),
            location=data.get('location')
        )

        try:
            db.session.add(new_profile)
            db.session.commit()
            return {"message": "Profile created successfully"}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        user = db.session.get(User, current_user_id)

        if not user.profile:
            return {"error": "Profile not found"}, 404

        return {
            "id": user.profile.id,
            "full_name": user.profile.full_name,
            "bio": user.profile.bio,
            "location": user.profile.location,
            "created_at": user.profile.created_at.isoformat(),
            "updated_at": user.profile.updated_at.isoformat()
        }, 200
    
    @jwt_required()
    def put(self):
        current_user_id = get_jwt_identity()
        profile = Profile.query.filter_by(user_id=current_user_id).first()

        if not profile:
            return {"error": "Profile not found"}, 404

        data = request.get_json()
        profile.full_name = data.get('full_name', profile.full_name)
        profile.bio = data.get('bio', profile.bio)
        profile.location = data.get('location', profile.location)

        try:
            db.session.commit()
            return {"message": "Profile updated successfully"}, 200
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500
        
    @jwt_required()
    def delete(self):
        current_user_id = get_jwt_identity()
        profile = Profile.query.filter_by(user_id=current_user_id).first()

        if not profile:
            return {"error": "Profile not found"}, 404

        try:
            db.session.delete(profile)
            db.session.commit()
            return {"message": "Profile deleted successfully"}, 200
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

api.add_resource(Register, '/register')
api.add_resource(Verify, '/verify')
api.add_resource(Login, '/login')
api.add_resource(ProfileResource, '/profile')

if __name__ == "__main__":
    app.run(port=5555, debug=True)