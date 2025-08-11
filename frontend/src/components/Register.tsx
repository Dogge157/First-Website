import React, { useState } from 'react';

interface RegisterProps {
  onLogin: (user: any, token: string) => void;
  onClose?: () => void; // Add optional close function
}

const Register: React.FC<RegisterProps> = ({ onLogin, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '', // Keep for optional use
    password: '',
    confirmPassword: '',
    group: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const groups = ['Manägers', 'Assar', 'Gollar'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Lösenorden matchar inte');
      return;
    }

    if (formData.password.length < 6) {
      setError('Lösenordet måste vara minst 6 tecken långt');
      return;
    }

    if (!formData.group) {
      setError('Välj en grupp');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email || '', // Make email optional
          password: formData.password,
          group: formData.group
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Auto-login after successful registration
        const loginResponse = await fetch('http://localhost:5001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          }),
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          onLogin(loginData.user, loginData.access_token);
          // Close the modal if onClose function is provided
          if (onClose) {
            onClose();
          }
        }
      } else {
        setError(data.error || 'Registrering misslyckades');
      }
    } catch (err) {
      setError('Ett fel uppstod. Kontrollera att servern är igång.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Registrera dig</h1>
      <p>Skapa ett konto för att delta i Skåre 2025</p>
      
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Namn:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ditt fullständiga namn"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Användarnamn:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Välj ett användarnamn"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-post (valfritt):</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="din.email@example.com (valfritt)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="group">Grupp:</label>
          <select
            id="group"
            name="group"
            value={formData.group}
            onChange={handleChange}
            required
          >
            <option value="">Välj din grupp</option>
            {groups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Minst 6 tecken"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Bekräfta lösenord:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Upprepa lösenordet"
            required
          />
        </div>
        
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Registrerar...' : 'Registrera dig'}
        </button>
      </form>
      
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Genom att registrera dig godkänner du att delta i Skåre 2025.
        </p>
      </div>
    </div>
  );
};

export default Register; 