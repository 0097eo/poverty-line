from faker import Faker
from app import app
from models import db, User, Profile, Region, SocialBackground, Record
import random

fake = Faker()

def seed_database():
    with app.app_context():
        print("Seeding database...")

        # Clear existing data
        db.drop_all()
        db.create_all()

        print("Seeding regions...")
        regions = [
            Region(name="Sub-Saharan Africa", country="Various", poverty_rate=42.0),
            Region(name="South Asia", country="Various", poverty_rate=16.0),
            Region(name="East Asia and Pacific", country="Various", poverty_rate=7.0),
            Region(name="Latin America and Caribbean", country="Various", poverty_rate=4.0),
            Region(name="Middle East and North Africa", country="Various", poverty_rate=5.0)
        ]
        db.session.add_all(regions)
        db.session.commit()

        print("Seeding backgrounds...")
        backgrounds = [
            SocialBackground(name="Urban Poor", description="Low-income individuals in urban areas"),
            SocialBackground(name="Rural Poor", description="Low-income individuals in rural areas"),
            SocialBackground(name="Unemployed", description="Individuals without formal employment"),
            SocialBackground(name="Informal Workers", description="Individuals working in the informal sector"),
            SocialBackground(name="Displaced Persons", description="Refugees or internally displaced individuals")
        ]
        db.session.add_all(backgrounds)
        db.session.commit()

        print("Seeding users and their profiles...")
        for _ in range(50):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                is_verified=random.choice([True, False])
            )
            user.password = "password123" 
            db.session.add(user)
            db.session.commit()

            profile = Profile(
                user_id=user.id,
                full_name=fake.name(),
                bio=fake.text(max_nb_chars=200),
                location=fake.city()
            )
            db.session.add(profile)
            db.session.commit()

            print("Seeding records for each user...")
            for _ in range(random.randint(1, 5)):
                record = Record(
                    user_id=user.id,
                    region_id=random.choice(regions).id,
                    social_background_id=random.choice(backgrounds).id,
                    income=round(random.uniform(50, 500), 2),
                    education_level=random.choice(["Primary", "Secondary", "Tertiary", "None"]),
                    employment_status=random.choice(["Employed", "Unemployed", "Self-employed", "Student"])
                )
                db.session.add(record)
                db.session.commit()

        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()