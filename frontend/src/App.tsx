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

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  group: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [showMenu, setShowMenu] = useState(false);

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

  if (!isPasswordVerified) {
    return <Login onPasswordVerified={handlePasswordVerification} />;
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
      />
      
      <main className="main-content">
        {renderSection()}
      </main>
    </div>
  );
}

export default App; 