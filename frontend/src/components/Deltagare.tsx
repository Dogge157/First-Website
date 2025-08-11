import React, { useState, useEffect } from 'react';

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
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

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

  const filteredParticipants = selectedGroup === 'all' 
    ? participants 
    : participants.filter(p => p.group === selectedGroup);

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
      
      {/* Group Filter */}
      <div style={{ marginBottom: '2rem' }}>
        <label htmlFor="group-filter" style={{ marginRight: '1rem', fontWeight: '500' }}>
          Filtrera efter grupp:
        </label>
        <select 
          id="group-filter"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '5px', border: '2px solid #ddd' }}
        >
          <option value="all">Alla grupper</option>
          <option value="Manägers">Manägers</option>
          <option value="Assar">Assar</option>
          <option value="Gollar">Gollar</option>
        </select>
      </div>
      
      {/* Participants List */}
      <div className="grid grid-2">
        {filteredParticipants.map(participant => (
          <div key={participant.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>{participant.name}</h3>
              <span 
                className="user-group"
                style={{
                  backgroundColor: 
                    participant.group === 'Manägers' ? '#dc3545' :
                    participant.group === 'Assar' ? '#28a745' : '#007bff'
                }}
              >
                {participant.group}
              </span>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Registrerad: {new Date(participant.created_at).toLocaleDateString('sv-SE')}
            </p>
          </div>
        ))}
      </div>
      
      {filteredParticipants.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Inga deltagare hittades för den valda gruppen.</p>
        </div>
      )}
      
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