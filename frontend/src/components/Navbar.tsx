import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      background: 'white',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      padding: '1rem 0',
      marginBottom: '2rem'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ 
          textDecoration: 'none', 
          color: '#3b82f6', 
          fontSize: '1.5rem', 
          fontWeight: 'bold' 
        }}>
          Full-Stack App
        </Link>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/statistics" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            Statistics
          </Link>
          <Link to="/players" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            Players
          </Link>
          
          {isAuthenticated ? (
            <>
              <span style={{ color: '#6b7280' }}>
                Welcome, {user?.username}!
              </span>
              <Link to="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                Dashboard
              </Link>
              <Link to="/users" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                Users
              </Link>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 