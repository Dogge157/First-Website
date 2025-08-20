#!/usr/bin/env python3
"""
Startup script for Railway deployment
"""
import os
import sys
from app import app, db

def main():
    """Initialize and start the Flask application"""
    print("Starting Skåre 2025 Backend...")
    
    # Create database tables
    with app.app_context():
        print("Creating database tables...")
        db.create_all()
        print("Database tables created successfully!")
    
    # Get port from environment (Railway sets this)
    port = int(os.environ.get('PORT', 5001))
    print(f"Starting server on port {port}")
    
    # Start the Flask app
    app.run(
        debug=False,
        host='0.0.0.0',
        port=port
    )

if __name__ == '__main__':
    main()
