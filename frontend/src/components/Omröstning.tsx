import React, { useState, useEffect } from 'react';

interface Vote {
  id: number;
  user_name: string;
  vote_option: string;
  vote_value: string;
  created_at: string;
}

interface VoteOption {
  id: string;
  title: string;
  description: string;
  options: string[];
}

const Omröstning: React.FC = () => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedVoteOption, setSelectedVoteOption] = useState('');
  const [selectedVoteValue, setSelectedVoteValue] = useState('');

  const voteOptions: VoteOption[] = [
    {
      id: 'event_theme',
      title: 'Evenemangets tema',
      description: 'Välj tema för Skåre 2025',
      options: ['Klassisk', 'Moderne', 'Skånsk tradition', 'Internationell', 'Naturinspirerad']
    },
    {
      id: 'food_preference',
      title: 'Matpreferens',
      description: 'Vilken typ av mat föredrar du?',
      options: ['Traditionell svensk', 'Internationell', 'Vegetarisk', 'Fisk och skaldjur', 'Grillmat']
    },
    {
      id: 'activity_type',
      title: 'Aktiviteter',
      description: 'Vilka aktiviteter vill du ha?',
      options: ['Sport och spel', 'Musik och underhållning', 'Natur och friluftsliv', 'Kultur och historia', 'Blandning av allt']
    }
  ];

  useEffect(() => {
    fetchVotes();
  }, []);

  const fetchVotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/votes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setVotes(data);
      } else {
        setError('Kunde inte hämta röster');
      }
    } catch (err) {
      setError('Ett fel uppstod vid hämtning av röster');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVoteOption || !selectedVoteValue) {
      setError('Välj både röstningsalternativ och värde');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          vote_option: selectedVoteOption,
          vote_value: selectedVoteValue
        })
      });

      if (response.ok) {
        setSuccess('Din röst har registrerats!');
        setSelectedVoteOption('');
        setSelectedVoteValue('');
        fetchVotes(); // Refresh votes
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Kunde inte registrera röst');
      }
    } catch (err) {
      setError('Ett fel uppstod vid röstning');
    }
  };

  const getVoteCounts = (optionId: string) => {
    const optionVotes = votes.filter(vote => vote.vote_option === optionId);
    const counts: { [key: string]: number } = {};
    
    optionVotes.forEach(vote => {
      counts[vote.vote_value] = (counts[vote.vote_value] || 0) + 1;
    });
    
    return counts;
  };

  if (loading) {
    return (
      <div className="section">
        <h1>Omröstning</h1>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="section">
      <h1>Omröstning</h1>
      <p>Delta i omröstningar och hjälp till att forma Skåre 2025!</p>
      
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
      
      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}
      
      {/* Voting Form */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Rösta här</h3>
        <form onSubmit={handleVote}>
          <div className="form-group">
            <label htmlFor="vote-option">Välj röstningsalternativ:</label>
            <select
              id="vote-option"
              value={selectedVoteOption}
              onChange={(e) => setSelectedVoteOption(e.target.value)}
              required
            >
              <option value="">Välj alternativ</option>
              {voteOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>
          
          {selectedVoteOption && (
            <div className="form-group">
              <label htmlFor="vote-value">Ditt val:</label>
              <select
                id="vote-value"
                value={selectedVoteValue}
                onChange={(e) => setSelectedVoteValue(e.target.value)}
                required
              >
                <option value="">Välj ditt svar</option>
                {voteOptions.find(opt => opt.id === selectedVoteOption)?.options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <button type="submit" className="btn">
            Rösta
          </button>
        </form>
      </div>
      
      {/* Vote Results */}
      <div className="grid grid-2">
        {voteOptions.map(option => {
          const voteCounts = getVoteCounts(option.id);
          const totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);
          
          return (
            <div key={option.id} className="card">
              <h3>{option.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                {option.description}
              </p>
              
              {totalVotes > 0 ? (
                <div>
                  {option.options.map(opt => {
                    const count = voteCounts[opt] || 0;
                    const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
                    
                    return (
                      <div key={opt} style={{ marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '0.9rem' }}>{opt}</span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                            {count} röster ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div style={{ 
                          width: '100%', 
                          height: '8px', 
                          backgroundColor: '#e9ecef', 
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            width: `${percentage}%`, 
                            height: '100%', 
                            backgroundColor: '#667eea',
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                      </div>
                    );
                  })}
                  <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '1rem' }}>
                    Totalt: {totalVotes} röster
                  </p>
                </div>
              ) : (
                <p style={{ color: '#666', fontStyle: 'italic' }}>
                  Inga röster ännu
                </p>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Om röstningen</h3>
        <p>
          Din röst är viktig för att forma evenemanget! Alla registrerade användare kan rösta en gång per alternativ.
          Resultaten kommer att användas för att planera Skåre 2025.
        </p>
      </div>
    </div>
  );
};

export default Omröstning; 