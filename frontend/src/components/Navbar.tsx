import React from 'react';

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
}

const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  setCurrentSection,
  showMenu,
  setShowMenu,
  isAuthenticated,
  currentUser,
  onLogout
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
        <a href="#" className="logo" onClick={() => handleNavClick('home')}>
          Skåre 2025
        </a>
        
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
        
        {isAuthenticated && currentUser && (
          <div className="user-section">
            <div className="user-info">
              <span>{currentUser.name}</span>
              <span className="user-group">{currentUser.group}</span>
            </div>
            <button className="logout-btn" onClick={onLogout}>
              Logga ut
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 