# PovertyLine

## Overview
A comprehensive platform for tracking, analyzing, and managing poverty-related data across different regions and social backgrounds. This project aims to contribute to poverty eradication, employment generation, and social integration by providing tools for data collection, analysis, and visualization.

## Features
- User registration and login
- Profile creation and management
- Create, read, update, and delete records
- Categorization and sorting by:
   - Regions
   - Social backgrounds
   - Economic indicators
- Search functionality
- User directory

## Tech Stack
- Frontend: React (JavaScript)
- Backend: Flask (Python)
- Database: SQLite
- ORM: SQLAlchemy
- Dependency Management: pipenv (Python), npm (JavaScript)

## Screenshot
![Screenshot from 2024-10-22 10-14-00](https://github.com/user-attachments/assets/499e98a0-e1bb-4db1-b3fc-2c8007710bc3)

## Getting Started

To set up the application locally, follow these steps:

1. **Clone the Repository**

   ```
   git clone https://github.com/0097eo/poverty-line
   ```
2. **Install dependencies**
   - backend
   ```
   pipenv install
   ```
   - frontend
   ```
   npm i
   ```
3. **Activate the virtual environment**

   ```
   pipenv shell
   ```
   
3. **Setup the database**

   ```
   flask db init
   ```

   ```
   flask db migrate
   ```

   ```
   flask db upgrade
   ```

4. **Seed the database**

   ```
   python seed.py
   ```
6. **Run the application**
   server
   ```
   python app.py
   ```
   client
   ```
   npm run dev
   ```

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) 
