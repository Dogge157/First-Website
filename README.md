# Skåre 2025 - Official Website

This is the official website for the Skåre 2025 event, featuring user registration, photo uploads, voting, and more.

## 🚀 Quick Start

### Option 1: Start Everything at Once (Recommended)
```bash
./start_all.sh
```

This will start both the backend and frontend servers automatically.

### Option 2: Start Servers Individually

#### Start Backend Server
```bash
./start_backend.sh
```
The backend will run on http://localhost:5001

#### Start Frontend Server
```bash
./start_frontend.sh
```
The frontend will run on http://localhost:3000

## 📋 Prerequisites

### Required Software
- **Python 3.8+** - For the backend server
- **Node.js 16+** - For the frontend server
- **npm** - Package manager for Node.js

### Installation

1. **Clone the repository** (if you haven't already)
2. **Install Python dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
3. **Install Node.js dependencies**:
   ```bash
   cd frontend
   npm install
   ```

## 🔧 Manual Setup

### Backend Setup
```bash
cd backend
python app.py
```

### Frontend Setup
```bash
cd frontend
npm start
```

## 🌐 Accessing the Application

Once both servers are running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001

## 🔑 Default Password

The website password is: `Trellehulla`

## 📸 Features

### User Management
- User registration with group selection (Manägers, Assar, Gollar)
- User login/logout
- User profile management

### Photo Archive
- Upload photos with titles and descriptions
- Browse photos by year (2022-2025)
- Delete your own photos
- View photos in a modal gallery

### Voting System
- Create voting questions
- Vote on questions
- View voting results

### Other Features
- Participant list
- Competition section
- Drinking songs section

## 🛠️ Troubleshooting

### Common Issues

1. **"Can't connect to server" error**
   - Make sure the backend server is running on port 5001
   - Check that no other application is using port 5001

2. **"Node.js not found" error**
   - Install Node.js from https://nodejs.org/
   - Make sure it's added to your PATH

3. **"Python not found" error**
   - Install Python 3.8+ from https://python.org/
   - Make sure it's added to your PATH

4. **Port already in use**
   - Stop any existing servers
   - Check for processes using ports 3000 or 5001:
     ```bash
     lsof -i :3000
     lsof -i :5001
     ```

### Database Issues
If you encounter database issues, the database will be automatically recreated when you restart the backend server.

## 📁 Project Structure

```
Vibe_coding/
├── backend/                 # Flask backend server
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   └── uploads/           # Photo upload directory
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.tsx        # Main App component
│   │   └── config.ts      # API configuration
│   └── package.json       # Node.js dependencies
├── start_backend.sh       # Backend startup script
├── start_frontend.sh      # Frontend startup script
├── start_all.sh          # Combined startup script
└── README.md             # This file
```

## 🔒 Security Notes

- The website password is hardcoded in the backend
- User passwords are stored in plain text (not recommended for production)
- JWT tokens are used for authentication
- CORS is enabled for local development

## 🚀 Deployment

### Backend Deployment
The backend is configured for deployment on Railway with the `railway.json` file.

### Frontend Deployment
The frontend is configured for deployment on Vercel with the `vercel.json` file.

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Check the terminal output for server errors
3. Ensure both servers are running
4. Verify the correct ports are being used

## 🎉 Enjoy Skåre 2025! 