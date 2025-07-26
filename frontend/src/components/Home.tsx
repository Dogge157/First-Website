import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

const Home: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <div className="header">
        <h1>Welcome to Your Full-Stack Web Application</h1>
        <p>
          A modern web application built with Python Flask backend and React TypeScript frontend.
          Experience the power of full-stack development with authentication, user management, and more.
        </p>
      </div>

      <div className="grid">
        <div className="card">
          <h3>🚀 Backend Features</h3>
          <ul>
            <li>Python Flask REST API</li>
            <li>SQLAlchemy ORM with SQLite</li>
            <li>JWT Authentication</li>
            <li>CORS enabled for frontend integration</li>
            <li>User management endpoints</li>
          </ul>
        </div>

        <div className="card">
          <h3>⚛️ Frontend Features</h3>
          <ul>
            <li>React 18 with TypeScript</li>
            <li>React Router for navigation</li>
            <li>Context API for state management</li>
            <li>Axios for API communication</li>
            <li>Responsive design</li>
          </ul>
        </div>

        <div className="card">
          <h3>🔐 Security Features</h3>
          <ul>
            <li>JWT token-based authentication</li>
            <li>Protected routes</li>
            <li>Secure password handling</li>
            <li>Session management</li>
            <li>Input validation</li>
          </ul>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        {isAuthenticated ? (
          <div>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              You're logged in! Explore the application features.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
              <Link to="/users" className="btn btn-secondary">
                View Users
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              Get started by creating an account or logging in.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/register" className="btn btn-primary">
                Create Account
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>🛠️ Getting Started</h3>
        <p>
          This project demonstrates a complete full-stack web application with modern best practices.
          The backend provides a RESTful API with authentication, while the frontend offers a
          responsive user interface with real-time data management.
        </p>
        <p>
          <strong>Backend:</strong> Run the Flask server from the backend directory<br/>
          <strong>Frontend:</strong> Start the React development server from the frontend directory
        </p>
      </div>
    </div>
  );
};

export default Home; 