# Skåre 2025 - Setup Instructions

## 🎯 Quick Start (Recommended)

To start the entire application with one command:

```bash
./start_all.sh
```

This will:
1. Start the backend server on http://localhost:5001
2. Start the frontend server on http://localhost:3000
3. Open your browser to the application

## 🔧 Manual Setup

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm (comes with Node.js)

### Step 1: Start Backend Server

Open a terminal and run:
```bash
./start_backend.sh
```

Or manually:
```bash
cd backend
python app.py
```

The backend will start on http://localhost:5001

### Step 2: Start Frontend Server

Open another terminal and run:
```bash
./start_frontend.sh
```

Or manually:
```bash
cd frontend
npm start
```

The frontend will start on http://localhost:3000

## 🌐 Using the Application

1. **Open your browser** and go to http://localhost:3000
2. **Enter the website password**: `Trellehulla`
3. **Register a new account** or **login** with existing credentials
4. **Enjoy all features**:
   - Upload photos to the archive
   - Vote on questions
   - View participant list
   - And more!

## 🛠️ Troubleshooting

### "Can't connect to server" Error
- Make sure the backend is running on port 5001
- Check that no other application is using port 5001
- Try restarting the backend server

### "Node.js not found" Error
- Install Node.js from https://nodejs.org/
- Make sure it's added to your system PATH

### "Python not found" Error
- Install Python 3.8+ from https://python.org/
- Make sure it's added to your system PATH

### Port Already in Use
If you get port conflicts:
```bash
# Check what's using the ports
lsof -i :3000
lsof -i :5001

# Kill processes if needed
kill -9 <PID>
```

### Database Issues
The database will be automatically recreated if there are any issues. Just restart the backend server.

## 📁 File Structure

```
Vibe_coding/
├── start_all.sh          # Start both servers
├── start_backend.sh      # Start backend only
├── start_frontend.sh     # Start frontend only
├── backend/              # Flask backend
├── frontend/             # React frontend
└── README.md            # Main documentation
```

## 🔑 Important Notes

- **Website Password**: `Trellehulla`
- **Backend URL**: http://localhost:5001
- **Frontend URL**: http://localhost:3000
- **Database**: Automatically created in `backend/instance/app.db`
- **Photo Uploads**: Stored in `backend/uploads/` by year

## 🚀 Features Working Independently

✅ **User Registration** - Create new accounts
✅ **User Login** - Login with existing accounts  
✅ **Photo Upload** - Upload photos to the archive
✅ **Photo Gallery** - Browse photos by year
✅ **Voting System** - Create and vote on questions
✅ **User Profiles** - Manage your account
✅ **Participant List** - View all registered users

## 🎉 Success!

Once both servers are running, you can:
1. Register new users
2. Upload photos to the archive
3. Use all voting features
4. Manage user profiles
5. Everything works independently of Cursor!

The application is now fully functional and ready for use!
