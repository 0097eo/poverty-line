from config import app, api, db, bcrypt
from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import smtplib
from models import User, Profile, Record, SocialBackground, Region
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

class ProfileListResource(Resource):
    @jwt_required()
    def get(self):
        # Get pagination parameters from query string
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        location = request.args.get('location', '')

        # Limit per_page to a maximum of 100 to prevent excessive data requests
        per_page = min(per_page, 100)

        # Base query
        query = Profile.query

        # Apply location filter if provided
        if location:
            # Using ILIKE for case-insensitive search
            query = query.filter(Profile.location.ilike(f'%{location}%'))

        # Apply pagination
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)

        # Prepare the response
        profiles = [{
            "id": profile.id,
            "full_name": profile.full_name,
            "bio": profile.bio,
            "location": profile.location
        } for profile in pagination.items]

        # Add pagination metadata
        meta = {
            "page": page,
            "per_page": per_page,
            "total_pages": pagination.pages,
            "total_items": pagination.total
        }

        return {
            "profiles": profiles,
            "meta": meta
        }, 200
    

class RecordResource(Resource):
    @jwt_required()
    def post(self):
        current_user_id = get_jwt_identity()
        data = request.get_json()

        new_record = Record(
            user_id=current_user_id,
            region_id=data['region_id'],
            social_background_id=data['social_background_id'],
            income=data['income'],
            education_level=data['education_level'],
            employment_status=data['employment_status']
        )

        try:
            db.session.add(new_record)
            db.session.commit()
            return {"message": "Record created successfully", "id": new_record.id}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

    @jwt_required()
    def get(self, record_id=None):
        if record_id:
            record = Record.query.get(record_id)
            if not record:
                return {"error": "Record not found"}, 404
            return {
                "id": record.id,
                "region": record.region.name,
                "social_background": record.social_background.name,
                "income": record.income,
                "education_level": record.education_level,
                "employment_status": record.employment_status
            }, 200
        
        # Get all records with filtering and pagination
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        region = request.args.get('region')
        social_background = request.args.get('social_background')
        min_income = request.args.get('min_income', type=float)
        max_income = request.args.get('max_income', type=float)

        query = Record.query

        if region:
            query = query.join(Region).filter(Region.name.ilike(f'%{region}%'))
        if social_background:
            query = query.join(SocialBackground).filter(SocialBackground.name.ilike(f'%{social_background}%'))
        if min_income:
            query = query.filter(Record.income >= min_income)
        if max_income:
            query = query.filter(Record.income <= max_income)

        pagination = query.paginate(page=page, per_page=per_page)
        
        records = [{
            "id": record.id,
            "region": record.region.name,
            "social_background": record.social_background.name,
            "income": record.income,
            "education_level": record.education_level,
            "employment_status": record.employment_status
        } for record in pagination.items]

        return {
            "records": records,
            "meta": {
                "page": page,
                "per_page": per_page,
                "total_pages": pagination.pages,
                "total_items": pagination.total
            }
        }, 200

    @jwt_required()
    def put(self, record_id):
        current_user_id = get_jwt_identity()
        record = Record.query.filter_by(id=record_id, user_id=current_user_id).first()
        
        if not record:
            return {"error": "Record not found or unauthorized"}, 404

        data = request.get_json()
        for key, value in data.items():
            if hasattr(record, key):
                setattr(record, key, value)

        try:
            db.session.commit()
            return {"message": "Record updated successfully"}, 200
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

    @jwt_required()
    def delete(self, record_id):
        current_user_id = get_jwt_identity()
        record = Record.query.filter_by(id=record_id, user_id=current_user_id).first()
        
        if not record:
            return {"error": "Record not found or unauthorized"}, 404

        try:
            db.session.delete(record)
            db.session.commit()
            return {"message": "Record deleted successfully"}, 200
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500


    
api.add_resource(Register, '/register')
api.add_resource(Verify, '/verify')
api.add_resource(Login, '/login')
api.add_resource(ProfileResource, '/profile')
api.add_resource(ProfileListResource, '/profiles')
api.add_resource(RecordResource, '/records', '/records/<int:record_id>')


if __name__ == "__main__":
    app.run(port=5555, debug=True)