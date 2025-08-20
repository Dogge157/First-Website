#!/bin/bash

# Startup script for the backend server
echo "Starting Skåre 2025 Backend Server..."

# Navigate to the backend directory
cd "$(dirname "$0")/backend"

# Activate virtual environment if it exists
if [ -d "../.venv" ]; then
    echo "Activating virtual environment..."
    source ../.venv/bin/activate
fi

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed or not in PATH"
    exit 1
fi

# Install requirements if needed
if [ ! -f "instance/app.db" ]; then
    echo "Installing Python requirements..."
    pip install -r requirements.txt
fi

# Start the Flask server
echo "Starting Flask server on http://localhost:5001"
echo "Press Ctrl+C to stop the server"
python app.py
