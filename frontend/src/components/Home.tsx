import React, { useState } from 'react';
import Register from './Register';

interface HomeProps {
  onRegister: (user: any, token: string) => void;
}

const Home: React.FC<HomeProps> = ({ onRegister }) => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="section">
      <div className="hero-section">
        <h1>Skåre 2025</h1>
        
        {/* Main page image */}
        <img 
          src="/Main_page.jpeg" 
          alt="Skåre 2025" 
          className="hero-image"
          style={{ 
            maxWidth: '800px', 
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
            marginTop: '2rem',
            marginBottom: '2rem'
          }}
        />
        
        {/* Registration button */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            className="btn" 
            onClick={() => setShowRegister(true)}
            style={{ 
              fontSize: '1.2rem',
              padding: '1rem 2rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Registrera dig
          </button>
        </div>
      </div>
      
      {showRegister && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '15px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button 
              onClick={() => setShowRegister(false)}
              style={{ 
                float: 'right', 
                background: 'none', 
                border: 'none', 
                fontSize: '1.5rem', 
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              ×
            </button>
            <Register onLogin={onRegister} onClose={() => setShowRegister(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 