#!/bin/bash

# Startup script for both backend and frontend servers
echo "Starting Skåre 2025 Application..."

# Function to cleanup background processes on exit
cleanup() {
    echo "Stopping all servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend in background
echo "Starting backend server..."
./start_backend.sh &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Check if backend is running
if ! curl -s http://localhost:5001/api/health > /dev/null; then
    echo "Error: Backend failed to start"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "Backend is running on http://localhost:5001"

# Start frontend in background
echo "Starting frontend server..."
./start_frontend.sh &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 5

# Check if frontend is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "Error: Frontend failed to start"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 1
fi

echo "Frontend is running on http://localhost:3000"
echo ""
echo "🎉 Skåre 2025 is now running!"
echo "   Backend:  http://localhost:5001"
echo "   Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop
wait
