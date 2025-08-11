import React, { useState } from 'react';
import { buildApiUrl } from '../config';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  group: string;
  created_at: string;
}

interface UserProfileProps {
  user: User;
  onLogout: () => void;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout, onClose }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDeleteAccount = async () => {
    if (!window.confirm('Är du säker på att du vill radera ditt konto? Detta går inte att ångra.')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      console.log('Delete account - User ID:', user.id);
      console.log('Delete account - Token:', token ? 'Present' : 'Missing');
      console.log('Full token for debugging:', token);
      
      const response = await fetch(`${buildApiUrl('/api/users')}/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Delete response status:', response.status);
      
      if (response.ok) {
        setSuccess('Ditt konto har raderats');
        setTimeout(() => {
          onLogout();
          onClose();
        }, 2000);
      } else {
        const data = await response.json();
        console.log('Delete error response:', data);
        
        // Check for specific JWT errors
        if (response.status === 401 || (data.msg && data.msg.includes('Subject must be a string'))) {
          setError('Din session har utgått. Logga in igen för att radera ditt konto.');
          // Automatically logout and close modal
          setTimeout(() => {
            onLogout();
            onClose();
          }, 3000);
        } else if (response.status === 422) {
          setError('JWT token problem - logga in igen för att radera ditt konto.');
          // Automatically logout and close modal
          setTimeout(() => {
            onLogout();
            onClose();
          }, 3000);
        } else {
          setError(data.error || 'Kunde inte radera kontot');
        }
      }
    } catch (err) {
      console.error('Delete account error:', err);
      setError('Ett fel uppstod vid radering av kontot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Min Profil</h1>
        <button 
          onClick={onClose}
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '1.5rem', 
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Kontoinformation</h3>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Namn:</strong> {user.name}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Användarnamn:</strong> {user.username}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>E-post:</strong> {user.email || 'Ingen e-post angiven'}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Grupp:</strong> {user.group}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Registrerad:</strong> {new Date(user.created_at).toLocaleDateString('sv-SE')}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Kontohantering</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={onLogout}
            className="btn"
            style={{ backgroundColor: '#6c757d' }}
          >
            Logga ut
          </button>
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="btn"
            style={{ backgroundColor: '#dc3545' }}
          >
            Radera konto
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="card" style={{ border: '2px solid #dc3545', backgroundColor: '#f8d7da' }}>
          <h3 style={{ color: '#721c24' }}>Bekräfta radering</h3>
          <p style={{ color: '#721c24', marginBottom: '1rem' }}>
            Är du säker på att du vill radera ditt konto? Detta kommer att:
          </p>
          <ul style={{ color: '#721c24', marginBottom: '1rem' }}>
            <li>Radera all din data permanent</li>
            <li>Ta bort alla dina röster</li>
            <li>Ta bort alla dina uppladdade bilder</li>
            <li>Detta går inte att ångra</li>
          </ul>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={handleDeleteAccount}
              disabled={loading}
              className="btn"
              style={{ backgroundColor: '#dc3545' }}
            >
              {loading ? 'Raderar...' : 'Ja, radera mitt konto'}
            </button>
            <button 
              onClick={() => setShowDeleteConfirm(false)}
              className="btn"
              style={{ backgroundColor: '#6c757d' }}
            >
              Avbryt
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Tack för att du deltar i Skåre 2025!
        </p>
      </div>
    </div>
  );
};

export default UserProfile; 