import React, { useState, useEffect } from 'react';
import { buildApiUrl } from '../config';

interface Participant {
  id: number;
  name: string;
  group: string;
  email: string;
  created_at: string;
}

const Deltagare: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/users'));

      if (response.ok) {
        const data = await response.json();
        setParticipants(data);
      } else {
        setError('Kunde inte hämta deltagare');
      }
    } catch (err) {
      setError('Ett fel uppstod vid hämtning av deltagare');
    } finally {
      setLoading(false);
    }
  };



  const groupCounts = {
    'Manägers': participants.filter(p => p.group === 'Manägers').length,
    'Assar': participants.filter(p => p.group === 'Assar').length,
    'Gollar': participants.filter(p => p.group === 'Gollar').length
  };

  if (loading) {
    return (
      <div className="section">
        <h1>Deltagare</h1>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="section">
      <h1>Deltagare</h1>
      <p>Se alla deltagare och deras tillhörighet till de tre grupperna.</p>
      
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
      
      {/* Group Statistics */}
      <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#dc3545' }}>Manägers</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>
            {groupCounts['Manägers']}
          </div>
          <p>deltagare</p>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#28a745' }}>Assar</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
            {groupCounts['Assar']}
          </div>
          <p>deltagare</p>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#007bff' }}>Gollar</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
            {groupCounts['Gollar']}
          </div>
          <p>deltagare</p>
        </div>
      </div>
      

      
      {/* Participants List - Grouped by Group */}
      <div className="grid grid-3">
        {/* Manägers Group */}
        <div className="card">
          <h3 style={{ color: '#dc3545', textAlign: 'center', marginBottom: '1rem' }}>
            Manägers ({participants.filter(p => p.group === 'Manägers').length})
          </h3>
          <div style={{ minHeight: '100px' }}>
            {participants
              .filter(p => p.group === 'Manägers')
              .map(participant => (
                <div key={participant.id} style={{ 
                  padding: '0.5rem', 
                  margin: '0.25rem 0', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '5px',
                  borderLeft: '3px solid #dc3545'
                }}>
                  <strong>{participant.name}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    Registrerad: {new Date(participant.created_at).toLocaleDateString('sv-SE')}
                  </div>
                </div>
              ))}
            {participants.filter(p => p.group === 'Manägers').length === 0 && (
              <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                Inga deltagare ännu
              </p>
            )}
          </div>
        </div>

        {/* Assar Group */}
        <div className="card">
          <h3 style={{ color: '#28a745', textAlign: 'center', marginBottom: '1rem' }}>
            Assar ({participants.filter(p => p.group === 'Assar').length})
          </h3>
          <div style={{ minHeight: '100px' }}>
            {participants
              .filter(p => p.group === 'Assar')
              .map(participant => (
                <div key={participant.id} style={{ 
                  padding: '0.5rem', 
                  margin: '0.25rem 0', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '5px',
                  borderLeft: '3px solid #28a745'
                }}>
                  <strong>{participant.name}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    Registrerad: {new Date(participant.created_at).toLocaleDateString('sv-SE')}
                  </div>
                </div>
              ))}
            {participants.filter(p => p.group === 'Assar').length === 0 && (
              <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                Inga deltagare ännu
              </p>
            )}
          </div>
        </div>

        {/* Gollar Group */}
        <div className="card">
          <h3 style={{ color: '#007bff', textAlign: 'center', marginBottom: '1rem' }}>
            Gollar ({participants.filter(p => p.group === 'Gollar').length})
          </h3>
          <div style={{ minHeight: '100px' }}>
            {participants
              .filter(p => p.group === 'Gollar')
              .map(participant => (
                <div key={participant.id} style={{ 
                  padding: '0.5rem', 
                  margin: '0.25rem 0', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '5px',
                  borderLeft: '3px solid #007bff'
                }}>
                  <strong>{participant.name}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    Registrerad: {new Date(participant.created_at).toLocaleDateString('sv-SE')}
                  </div>
                </div>
              ))}
            {participants.filter(p => p.group === 'Gollar').length === 0 && (
              <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                Inga deltagare ännu
              </p>
            )}
          </div>
        </div>
      </div>
      

      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Om grupperna</h3>
        <div className="grid grid-3">
          <div>
            <h4 style={{ color: '#dc3545' }}>Manägers</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Traditionell grupp med lång historia i evenemanget.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#28a745' }}>Assar</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Dynamisk grupp känd för sin energi och entusiasm.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#007bff' }}>Gollar</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Kreativ grupp som bidrar med innovation och idéer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deltagare; 