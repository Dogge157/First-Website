import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

interface CompetitionUpdate {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  type: 'match' | 'announcement' | 'result';
}

const Home: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [liveUpdates, setLiveUpdates] = useState<CompetitionUpdate[]>([
    {
      id: 1,
      title: "Championship Final - Live",
      description: "Team Alpha vs Team Beta - Current Score: 2-1 (75th minute)",
      timestamp: new Date().toISOString(),
      type: 'match'
    },
    {
      id: 2,
      title: "Quarter Finals Results",
      description: "Team Gamma advances to semi-finals after defeating Team Delta 3-0",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: 'result'
    },
    {
      id: 3,
      title: "Tournament Schedule Update",
      description: "Semi-finals moved to Saturday due to weather conditions",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      type: 'announcement'
    }
  ]);

  return (
    <div>
      <div className="header">
        <h1>🏆 Championship Tournament 2024</h1>
        <p>
          Welcome to the premier competition platform. Follow live updates, view historical statistics,
          and discover amazing players in this year's championship.
        </p>
      </div>

      {/* Live Competition Updates */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>🔴 LIVE UPDATES</h2>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {liveUpdates.map((update) => (
            <div 
              key={update.id} 
              style={{ 
                padding: '1rem', 
                border: '1px solid #e5e7eb', 
                borderRadius: '0.375rem',
                marginBottom: '1rem',
                background: update.type === 'match' ? '#fef2f2' : 
                           update.type === 'result' ? '#f0fdf4' : '#f0f9ff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ margin: 0, color: update.type === 'match' ? '#dc2626' : 
                           update.type === 'result' ? '#16a34a' : '#0369a1' }}>
                  {update.title}
                </h4>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {new Date(update.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '1rem' }}>{update.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h3>📊 Tournament Statistics</h3>
          <ul>
            <li>Historical performance data</li>
            <li>Player rankings and achievements</li>
            <li>Team statistics and records</li>
            <li>Championship history</li>
            <li>Performance analytics</li>
          </ul>
          <Link to="/statistics" className="btn btn-primary" style={{ marginTop: '1rem', textDecoration: 'none' }}>
            View Statistics
          </Link>
        </div>

        <div className="card">
          <h3>👥 Player Profiles</h3>
          <ul>
            <li>Detailed player biographies</li>
            <li>Career achievements and stats</li>
            <li>Team affiliations</li>
            <li>Performance highlights</li>
            <li>Personal information</li>
          </ul>
          <Link to="/players" className="btn btn-primary" style={{ marginTop: '1rem', textDecoration: 'none' }}>
            Meet the Players
          </Link>
        </div>

        <div className="card">
          <h3>🏆 Live Competition</h3>
          <ul>
            <li>Real-time match updates</li>
            <li>Live scoring and commentary</li>
            <li>Tournament brackets</li>
            <li>Schedule and results</li>
            <li>Championship standings</li>
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