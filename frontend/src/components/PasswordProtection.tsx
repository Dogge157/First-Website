import React, { useState, useEffect } from 'react';

interface PasswordProtectionProps {
  correctPassword: string;
  children: React.ReactNode;
  title: string;
  description?: string;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ 
  correctPassword, 
  children, 
  title,
  description 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Check if already authenticated (stored in localStorage)
  useEffect(() => {
    const authKey = `auth_${title.toLowerCase().replace(/\s+/g, '_')}`;
    const isAuth = localStorage.getItem(authKey);
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, [title]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toLowerCase() === correctPassword.toLowerCase()) {
      setIsAuthenticated(true);
      setError('');
      setAttempts(0);
      // Store authentication in localStorage
      const authKey = `auth_${title.toLowerCase().replace(/\s+/g, '_')}`;
      localStorage.setItem(authKey, 'true');
    } else {
      setError('Fel lösenord! Försök igen.');
      setAttempts(attempts + 1);
      setPassword('');
    }
  };

  const handleReset = () => {
    setIsAuthenticated(false);
    setPassword('');
    setError('');
    setAttempts(0);
    // Remove authentication from localStorage
    const authKey = `auth_${title.toLowerCase().replace(/\s+/g, '_')}`;
    localStorage.removeItem(authKey);
  };

  if (isAuthenticated) {
    return (
      <div>
        <div style={{ 
          backgroundColor: '#28a745', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '10px',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>🔓 {title} - Tillgänglig</h3>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.9 }}>
              Du har åtkomst till detta innehåll
            </p>
          </div>
          <button 
            onClick={handleReset}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Lås igen
          </button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="section">
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem 2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '15px',
        border: '2px dashed #dee2e6'
      }}>
        <div style={{ 
          fontSize: '4rem', 
          marginBottom: '1rem',
          opacity: 0.7
        }}>
          🔒
        </div>
        
        <h2 style={{ marginBottom: '1rem', color: '#333' }}>{title}</h2>
        
        {description && (
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#666', 
            marginBottom: '2rem',
            maxWidth: '500px',
            margin: '0 auto 2rem auto'
          }}>
            {description}
          </p>
        )}
        
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ange lösenord..."
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#dee2e6';
              }}
            />
          </div>
          
          {error && (
            <div style={{ 
              backgroundColor: '#f8d7da', 
              color: '#721c24', 
              padding: '0.75rem', 
              borderRadius: '5px',
              marginBottom: '1rem',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}
          
          {attempts > 0 && (
            <div style={{ 
              fontSize: '0.8rem', 
              color: '#666', 
              marginBottom: '1rem' 
            }}>
              Försök: {attempts}
            </div>
          )}
          
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#667eea',
              color: 'white',
              padding: '1rem',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#5a6fd8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#667eea';
            }}
          >
            🔓 Lås upp innehåll
          </button>
        </form>
        
        <div style={{ 
          marginTop: '2rem', 
          fontSize: '0.9rem', 
          color: '#666' 
        }}>
          <p>💡 Tips: Kontakta arrangörerna om du inte har lösenordet</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordProtection;
