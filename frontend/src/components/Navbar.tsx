import React from 'react';
import { currentVersion } from '../utils/updates';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  group: string;
}

interface NavbarProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
  isAuthenticated: boolean;
  currentUser: User | null;
  onLogout: () => void;
  onShowLogin?: () => void;
  onShowProfile?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  setCurrentSection,
  showMenu,
  setShowMenu,
  isAuthenticated,
  currentUser,
  onLogout,
  onShowLogin,
  onShowProfile
}) => {
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleNavClick = (section: string) => {
    setCurrentSection(section);
    setShowMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#" className="logo" onClick={() => handleNavClick('home')}>
            Skåre 2025
          </a>
          <div style={{ 
            fontSize: '0.7rem', 
            color: '#6c757d',
            display: 'flex',
            flexDirection: 'column',
            lineHeight: '1.2'
          }}>
            <span>v{currentVersion.version}</span>
            <span>Uppdaterad: {new Date(currentVersion.releaseDate).toLocaleDateString('sv-SE')}</span>
          </div>
        </div>
        
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        
        <ul className={`nav-menu ${showMenu ? 'show' : ''}`}>
          <li>
            <a 
              href="#" 
              className={currentSection === 'home' ? 'active' : ''}
              onClick={() => handleNavClick('home')}
            >
              Hem
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentSection === 'bildarkiv' ? 'active' : ''}
              onClick={() => handleNavClick('bildarkiv')}
            >
              Bildarkiv
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentSection === 'tävlingar' ? 'active' : ''}
              onClick={() => handleNavClick('tävlingar')}
            >
              Tävlingar
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentSection === 'snapsvisor' ? 'active' : ''}
              onClick={() => handleNavClick('snapsvisor')}
            >
              Snapsvisor
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentSection === 'deltagare' ? 'active' : ''}
              onClick={() => handleNavClick('deltagare')}
            >
              Deltagare
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentSection === 'omröstning' ? 'active' : ''}
              onClick={() => handleNavClick('omröstning')}
            >
              Omröstning
            </a>
          </li>
        </ul>
        
        {isAuthenticated && currentUser ? (
          <div className="user-section">
            <div className="user-info">
              <span>{currentUser.name}</span>
              <span className="user-group">{currentUser.group}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn"
                onClick={onShowProfile}
                style={{ 
                  fontSize: '0.8rem', 
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#667eea'
                }}
              >
                Min Profil
              </button>
              <button className="logout-btn" onClick={onLogout}>
                Logga ut
              </button>
            </div>
          </div>
        ) : (
          <div className="user-section">
            <button 
              className="btn"
              onClick={onShowLogin}
              style={{ 
                fontSize: '0.9rem', 
                padding: '0.5rem 1rem',
                backgroundColor: '#28a745'
              }}
            >
              Logga in
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 