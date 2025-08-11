import React, { useState } from 'react';

interface LoginProps {
  onPasswordVerified: (verified: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onPasswordVerified }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        onPasswordVerified(true);
      } else {
        setError(data.message || 'Fel lösenord');
      }
    } catch (err) {
      setError('Ett fel uppstod. Kontrollera att servern är igång.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Skåre 2025</h1>
      <p>Ange lösenord för att komma åt webbplatsen</p>
      
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ange lösenord"
            required
          />
        </div>
        
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Kontrollerar...' : 'Logga in'}
        </button>
      </form>
    </div>
  );
};

export default Login; 