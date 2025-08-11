import React from 'react';

const Tävlingar: React.FC = () => {
  return (
    <div className="section">
      <h1>Tävlingar</h1>
      <p>Information om tävlingar kommer att publiceras här när de blir tillgängliga.</p>
      
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ 
          fontSize: '4rem', 
          marginBottom: '1rem',
          opacity: 0.5
        }}>
          🏆
        </div>
        <h2>Inga tävlingar just nu</h2>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
          Tävlingsinformation kommer att läggas till här när den blir tillgänglig.
        </p>
        <p>
          Håll utkik efter uppdateringar om kommande tävlingar och evenemang!
        </p>
      </div>
      
      <div className="grid grid-2">
        <div className="card">
          <h3>Kommande tävlingar</h3>
          <p>Information om framtida tävlingar kommer att visas här.</p>
          <ul style={{ marginTop: '1rem', color: '#666' }}>
            <li>Datum och tid</li>
            <li>Plats</li>
            <li>Regler och format</li>
            <li>Priser</li>
          </ul>
        </div>
        
        <div className="card">
          <h3>Tidigare resultat</h3>
          <p>Resultat från tidigare tävlingar kommer att arkiveras här.</p>
          <ul style={{ marginTop: '1rem', color: '#666' }}>
            <li>Vinnare och placeringar</li>
            <li>Statistik</li>
            <li>Bildgalleri</li>
            <li>Höjdare</li>
          </ul>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Kontakt</h3>
        <p>
          Om du har frågor om tävlingar eller vill föreslå nya tävlingsformat, 
          kontakta arrangörerna.
        </p>
      </div>
    </div>
  );
};

export default Tävlingar; 