from config import db, bcrypt
from sqlalchemy import func, Index

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    _password = db.Column(db.String(255), nullable=False)
    is_verified = db.Column(db.Boolean, default=False)
    verification_code = db.Column(db.String(6), nullable=True)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    profile = db.relationship('Profile', back_populates='user', uselist=False, cascade="all, delete")
    records = db.relationship('Record', back_populates='user', cascade="all, delete")

    # Add a named index for the email column
    __table_args__ = (Index('ix_users_email', 'email'),)

    @property
    def password(self):
        raise AttributeError("Password is not readable")
    
    @password.setter
    def password(self, password):
        try:
            self._password = bcrypt.generate_password_hash(password).decode('utf-8')
        except Exception as e:
            raise ValueError("Password encryption failed")

    def verify_password(self, password):
        return bcrypt.check_password_hash(self._password, password)

    def __repr__(self):
        return f"<User {self.username}>"

class Profile(db.Model):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    user = db.relationship('User', back_populates='profile')

    def __repr__(self):
        return f"<Profile {self.full_name}>"

class Record(db.Model):
    __tablename__ = 'records'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey('regions.id'), nullable=False)
    social_background_id = db.Column(db.Integer, db.ForeignKey('social_backgrounds.id'), nullable=False)
    income = db.Column(db.Float, nullable=False)
    education_level = db.Column(db.String(50))
    employment_status = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    user = db.relationship('User', back_populates='records')
    region = db.relationship('Region', back_populates='records')
    social_background = db.relationship('SocialBackground', back_populates='records')

    def __repr__(self):
        return f"<Record {self.id} for User {self.user_id}>"

class Region(db.Model):
    __tablename__ = 'regions'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    poverty_rate = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    records = db.relationship('Record', back_populates='region')

    def __repr__(self):
        return f"<Region {self.name}>"

class SocialBackground(db.Model):
    __tablename__ = 'social_backgrounds'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    records = db.relationship('Record', back_populates='social_background')

    def __repr__(self):
        return f"<SocialBackground {self.name}>"