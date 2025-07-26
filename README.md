# Full-Stack Web Application

A modern web application with Python backend and React frontend.

## Project Structure

```
├── backend/          # Python Flask API
├── frontend/         # React application
├── requirements.txt  # Python dependencies
└── README.md        # This file
```

## Features

- **Backend**: Python Flask API with RESTful endpoints
- **Frontend**: React with TypeScript for type safety
- **Database**: SQLite (easily switchable to PostgreSQL/MySQL)
- **Authentication**: JWT-based authentication
- **Modern UI**: Responsive design with Tailwind CSS

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r ../requirements.txt
   ```

4. Run the Flask server:
   ```bash
   python app.py
   ```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/<id>` - Get user by ID
- `PUT /api/users/<id>` - Update user
- `DELETE /api/users/<id>` - Delete user

## Development

- Backend uses Flask with Flask-CORS for cross-origin requests
- Frontend uses React 18 with TypeScript
- Styling with Tailwind CSS for modern, responsive design
- Hot reloading enabled for both frontend and backend

## Deployment

This project can be easily deployed to:
- **Backend**: Heroku, Railway, or any Python hosting service
- **Frontend**: Vercel, Netlify, or any static hosting service 