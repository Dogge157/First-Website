import React from 'react';

const Snapsvisor: React.FC = () => {
  return (
    <div className="section">
      <h1>Snapsvisor</h1>
      <p>En samling av snapsvisor för att skapa stämning under evenemanget.</p>
      
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ 
          fontSize: '4rem', 
          marginBottom: '1rem',
          opacity: 0.5
        }}>
          🍺
        </div>
        <h2>Snapsvisor kommer snart</h2>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
          En samling av snapsvisor kommer att läggas till här.
        </p>
        <p>
          Håll utkik efter klassiska och nya snapsvisor!
        </p>
      </div>
      
      <div className="grid grid-2">
        <div className="card">
          <h3>Klassiska snapsvisor</h3>
          <p>Traditionella snapsvisor som alltid fungerar.</p>
          <ul style={{ marginTop: '1rem', color: '#666' }}>
            <li>Helan går</li>
            <li>Vår borg är bränd</li>
            <li>Den blomstertid nu kommer</li>
            <li>Och flickan hon går i ringen</li>
          </ul>
        </div>
        
        <div className="card">
          <h3>Nya snapsvisor</h3>
          <p>Moderna snapsvisor för att variera stämningen.</p>
          <ul style={{ marginTop: '1rem', color: '#666' }}>
            <li>Lokala variationer</li>
            <li>Skånska snapsvisor</li>
            <li>Föreslagna nya visor</li>
            <li>Favoriter från deltagarna</li>
          </ul>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Bidra med snapsvisor</h3>
        <p>
          Har du en favorit snapsvisa som du vill dela? 
          Kontakta arrangörerna för att föreslå nya visor som kan läggas till i samlingen.
        </p>
      </div>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Tips för snapsvisor</h3>
        <p>Några tips för att göra snapsvisorna ännu roligare:</p>
        <ul style={{ marginTop: '1rem', color: '#666' }}>
          <li>Sjung med entusiasm</li>
          <li>Inkludera alla i sången</li>
          <li>Variera tempot och stämningen</li>
          <li>Ha kul och var respektfull</li>
        </ul>
      </div>
    </div>
  );
};

export default Snapsvisor; 