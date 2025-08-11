import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Bildarkiv from './components/Bildarkiv';
import Tävlingar from './components/Tävlingar';
import Snapsvisor from './components/Snapsvisor';
import Deltagare from './components/Deltagare';
import Omröstning from './components/Omröstning';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import { currentVersion, getLatestUpdates } from './utils/updates';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  group: string;
  created_at: string;
}

// Footer component to show what's new
const Footer: React.FC = () => {
  const [showWhatsNew, setShowWhatsNew] = useState(false);

  const whatsNewItems = getLatestUpdates(3);

  return (
    <footer style={{ 
      backgroundColor: '#f8f9fa', 
      padding: '2rem 0', 
      marginTop: '3rem',
      borderTop: '1px solid #dee2e6'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '2rem'
      }}>
        <div>
          <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>Skåre 2025</h4>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
            Den officiella webbplatsen för Skåre 2025 evenemanget.
          </p>
        </div>
        
        <div>
          <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>Snabb länkar</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <button 
                onClick={() => window.scrollTo(0, 0)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#666', 
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Bildarkiv
              </button>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <button 
                onClick={() => window.scrollTo(0, 0)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#666', 
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Deltagare
              </button>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <button 
                onClick={() => window.scrollTo(0, 0)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#666', 
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Omröstning
              </button>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>Vad är nytt</h4>
          <button 
            onClick={() => setShowWhatsNew(!showWhatsNew)}
            style={{ 
              background: 'none', 
              border: '1px solid #667eea', 
              color: '#667eea',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            {showWhatsNew ? 'Dölj' : 'Visa'} senaste uppdateringar
          </button>
          
          {showWhatsNew && (
            <div style={{ marginTop: '1rem' }}>
              {whatsNewItems.map(item => (
                <div key={item.id} style={{ marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#667eea', fontWeight: 'bold' }}>
                    {new Date(item.date).toLocaleDateString('sv-SE')}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#333', fontWeight: 'bold' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '2rem', 
        paddingTop: '1rem',
        borderTop: '1px solid #dee2e6',
        fontSize: '0.8rem',
        color: '#666'
      }}>
        <p style={{ margin: 0 }}>
          © 2024 Skåre 2025. Alla rättigheter förbehållna. | 
          Version {currentVersion.version} | 
          Senast uppdaterad: {new Date(currentVersion.releaseDate).toLocaleDateString('sv-SE')}
        </p>
      </div>
    </footer>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const userData = localStorage.getItem('user');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    }
  }, []);

  const handlePasswordVerification = (verified: boolean) => {
    setIsPasswordVerified(verified);
  };

  const handleLogin = (user: User, token: string) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleRegister = (user: User, token: string) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home onRegister={handleRegister} />;
      case 'bildarkiv':
        return <Bildarkiv />;
      case 'tävlingar':
        return <Tävlingar />;
      case 'snapsvisor':
        return <Snapsvisor />;
      case 'deltagare':
        return <Deltagare />;
      case 'omröstning':
        return <Omröstning />;
      default:
        return <Home onRegister={handleRegister} />;
    }
  };

  // Show password popup if not verified
  if (!isPasswordVerified) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '3rem', 
          borderRadius: '15px',
          maxWidth: '500px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <h1 style={{ color: '#667eea', marginBottom: '1rem' }}>Skåre 2025</h1>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            Ange lösenord för att komma åt webbplatsen
          </p>
          <Login onPasswordVerified={handlePasswordVerification} />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar 
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        onLogout={handleLogout}
        onShowLogin={() => setShowLogin(true)}
        onShowProfile={() => setShowProfile(true)}
      />
      
      <main className="main-content">
        {renderSection()}
      </main>
      
      {/* Login Modal */}
      {showLogin && (
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
            <Login 
              mode="user"
              onLogin={handleLogin}
              onClose={() => setShowLogin(false)}
            />
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && currentUser && (
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
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <UserProfile 
              user={currentUser}
              onLogout={handleLogout}
              onClose={() => setShowProfile(false)}
            />
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default App; 