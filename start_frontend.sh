#!/bin/bash

# Startup script for the frontend server
echo "Starting Skåre 2025 Frontend Server..."

# Navigate to the frontend directory
cd "$(dirname "$0")/frontend"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed or not in PATH"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Start the React development server
echo "Starting React development server on http://localhost:3000"
echo "Press Ctrl+C to stop the server"
npm start
