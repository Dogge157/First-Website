import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🏆 Championship Tournament 2024</h1>
        <p>Welcome to the premier competition platform!</p>
        <div style={{ marginTop: '2rem' }}>
          <h2>Live Updates</h2>
          <div style={{ 
            padding: '1rem', 
            background: '#fef2f2', 
            borderRadius: '0.375rem',
            marginBottom: '1rem'
          }}>
            <h3 style={{ color: '#dc2626', margin: '0 0 0.5rem 0' }}>
              Championship Final - Live
            </h3>
            <p style={{ margin: 0 }}>
              Team Alpha vs Team Beta - Current Score: 2-1 (75th minute)
            </p>
          </div>
          <div style={{ 
            padding: '1rem', 
            background: '#f0fdf4', 
            borderRadius: '0.375rem'
          }}>
            <h3 style={{ color: '#16a34a', margin: '0 0 0.5rem 0' }}>
              Quarter Finals Results
            </h3>
            <p style={{ margin: 0 }}>
              Team Gamma advances to semi-finals after defeating Team Delta 3-0
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App; 