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
        <p>Välkommen till den officiella webbplatsen för Skåre 2025!</p>
        
        {/* Placeholder for the main image - replace src with actual image */}
        <img 
          src="/placeholder-image.jpg" 
          alt="Skåre 2025" 
          className="hero-image"
          style={{ 
            maxWidth: '600px', 
            height: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            borderRadius: '10px'
          }}
        />
        
        <p style={{ marginTop: '2rem', fontSize: '1.1rem' }}>
          Här hittar du allt du behöver veta om evenemanget, deltagare, tävlingar och mycket mer.
        </p>
      </div>
      
      <div className="grid grid-2">
        <div className="card">
          <h3>Bildarkiv</h3>
          <p>Bläddra bland bilder från tidigare år, från 2022 och framåt. Reliviera minnen från tidigare evenemang.</p>
        </div>
        
        <div className="card">
          <h3>Tävlingar</h3>
          <p>Information om kommande tävlingar och resultat från tidigare tävlingar kommer att publiceras här.</p>
        </div>
        
        <div className="card">
          <h3>Snapsvisor</h3>
          <p>En samling av snapsvisor som kommer att läggas till här. Perfekt för att skapa stämning under evenemanget.</p>
        </div>
        
        <div className="card">
          <h3>Deltagare</h3>
          <p>Se alla deltagare och deras tillhörighet till de tre grupperna: Manägers, Assar och Gollar.</p>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Omröstning</h3>
        <p>Delta i omröstningar och rösta på olika alternativ. Din röst är viktig för att forma evenemanget!</p>
      </div>
      
      <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h3>Delta i Skåre 2025</h3>
        <p>Registrera dig för att få full tillgång till alla funktioner och delta i omröstningar.</p>
        <button 
          className="btn" 
          onClick={() => setShowRegister(true)}
          style={{ marginTop: '1rem' }}
        >
          Registrera dig
        </button>
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
            <Register onLogin={onRegister} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 