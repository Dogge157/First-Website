import React, { useState } from 'react';
import { buildApiUrl } from '../config';

interface LoginProps {
  onPasswordVerified?: (verified: boolean) => void;
  onLogin?: (user: any, token: string) => void;
  onClose?: () => void;
  mode?: 'password' | 'user'; // 'password' for website password, 'user' for user login
}

const Login: React.FC<LoginProps> = ({ onPasswordVerified, onLogin, onClose, mode = 'password' }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(buildApiUrl('/api/verify-password'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok && data.verified) {
        if (onPasswordVerified) {
          onPasswordVerified(true);
        }
      } else {
        setError('Felaktigt lösenord');
      }
    } catch (err) {
      setError('Ett fel uppstod. Kontrollera att servern är igång.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', { username: formData.username, password: '***' });
      
      const response = await fetch(buildApiUrl('/api/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();
      console.log('Login response:', { status: response.status, data });

      if (response.ok) {
        if (onLogin) {
          onLogin(data.user, data.access_token);
        }
        if (onClose) {
          onClose();
        }
        // Clear form data after successful login
        setFormData({ username: '', password: '' });
      } else {
        setError(data.error || 'Inloggning misslyckades');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Ett fel uppstod. Kontrollera att servern är igång.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = mode === 'password' ? handlePasswordVerification : handleUserLogin;

  return (
    <div className="form-container">
      {mode === 'password' ? (
        <>
          <h1>Ange lösenord</h1>
          <p>Ange webbplatsens lösenord för att komma åt Skåre 2025</p>
        </>
      ) : (
        <>
          <h1>Logga in</h1>
          <p>Logga in på ditt befintliga konto</p>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Använd ditt användarnamn och lösenord som du angav vid registrering
          </p>
        </>
      )}
      
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {mode === 'user' && (
          <div className="form-group">
            <label htmlFor="username">Användarnamn:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ange ditt användarnamn"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="password">
            {mode === 'password' ? 'Webbplatslösenord:' : 'Lösenord:'}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={mode === 'password' ? 'Ange lösenord' : 'Ange ditt lösenord'}
            required
          />
        </div>
        
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Kontrollerar...' : (mode === 'password' ? 'Logga in' : 'Logga in')}
        </button>
      </form>
      
      {mode === 'user' && onClose && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button 
            onClick={onClose}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#667eea', 
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Avbryt
          </button>
        </div>
      )}
    </div>
  );
};

export default Login; 