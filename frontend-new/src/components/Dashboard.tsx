import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile');
        setProfile(response.data);
      } catch (error: any) {
        setError('Failed to load profile data');
        console.error('Profile fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <h1>Dashboard</h1>
        <p>Welcome to your personal dashboard</p>
      </div>

      <div className="grid">
        <div className="card">
          <h3>👤 Profile Information</h3>
          {profile && (
            <div>
              <p><strong>Username:</strong> {profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Member since:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
              <p><strong>User ID:</strong> {profile.id}</p>
            </div>
          )}
        </div>

        <div className="card">
          <h3>📊 Quick Stats</h3>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {profile ? '1' : '0'}
            </div>
            <p>Active Account</p>
          </div>
        </div>

        <div className="card">
          <h3>🔧 Account Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button className="btn btn-secondary">
              Edit Profile
            </button>
            <button className="btn btn-secondary">
              Change Password
            </button>
            <button className="btn btn-secondary">
              Account Settings
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>🚀 Recent Activity</h3>
        <p>Your recent activity will appear here.</p>
        <div style={{ 
          background: '#f8fafc', 
          padding: '1rem', 
          borderRadius: '0.375rem',
          border: '1px solid #e2e8f0'
        }}>
          <p style={{ margin: 0, color: '#64748b' }}>
            No recent activity to display.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>💡 Quick Tips</h3>
        <ul>
          <li>Use the navigation bar to access different sections of the app</li>
          <li>Visit the Users page to see all registered users</li>
          <li>Your session will automatically expire after 1 hour</li>
          <li>You can logout anytime using the logout button</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard; 