import React, { useState, useEffect } from 'react';
import { buildApiUrl } from '../config';

interface Vote {
  id: number;
  user_name: string;
  vote_option: string;
  vote_value: string;
  created_at: string;
}

interface VotingQuestion {
  id: number;
  title: string;
  description: string;
  alternatives: string[];
  created_by: string;
  created_at: string;
  is_active: boolean;
}

interface QuestionWithVotes {
  question: VotingQuestion;
  votes: Vote[];
}

const Omröstning: React.FC = () => {
  const [questions, setQuestions] = useState<VotingQuestion[]>([]);
  const [questionVotes, setQuestionVotes] = useState<QuestionWithVotes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [voterName, setVoterName] = useState('');
  
  // Create question form state
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    alternatives: ['', ''] // Start with 2 empty alternatives
  });

  useEffect(() => {
    fetchQuestions();
    checkCurrentUser();
  }, []);

  const checkCurrentUser = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
      setVoterName(JSON.parse(userData).name);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/voting-questions'));
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
        
        // Fetch votes for each question
        const votesData = await Promise.all(
          data.map(async (question: VotingQuestion) => {
                         const votesResponse = await fetch(buildApiUrl(`/api/voting-questions/${question.id}/votes`));
            if (votesResponse.ok) {
              return await votesResponse.json();
            }
            return { question, votes: [] };
          })
        );
        setQuestionVotes(votesData);
      }
    } catch (err) {
      setError('Ett fel uppstod vid hämtning av röstningsfrågor');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!createForm.title.trim() || createForm.alternatives.filter(alt => alt.trim()).length < 2) {
      setError('Titel och minst 2 alternativ krävs');
      return;
    }

    // For anonymous users, require a name
    if (!currentUser && !voterName.trim()) {
      setError('Ange ditt namn för att skapa en röstningsfråga');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers: any = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(buildApiUrl('/api/voting-questions'), {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: createForm.title.trim(),
          description: createForm.description.trim(),
          alternatives: createForm.alternatives.filter(alt => alt.trim()),
          user_name: voterName.trim() || 'Anonym'
        })
      });

      if (response.ok) {
        setSuccess('Röstningsfråga skapad!');
        setShowCreateForm(false);
        setCreateForm({ title: '', description: '', alternatives: ['', ''] });
        fetchQuestions();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Kunde inte skapa röstningsfråga');
      }
    } catch (err) {
      setError('Ett fel uppstod vid skapande av röstningsfråga');
    }
  };

  const handleVote = async (questionId: number, voteValue: string) => {
    // For anonymous users, require a name
    if (!currentUser && !voterName.trim()) {
      setError('Ange ditt namn för att rösta');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers: any = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(buildApiUrl('/api/votes'), {
        method: 'POST',
        headers,
        body: JSON.stringify({
          vote_option: questionId.toString(),
          vote_value: voteValue,
          user_name: voterName.trim() || 'Anonym'
        })
      });

      if (response.ok) {
        setSuccess('Din röst har registrerats!');
        fetchQuestions(); // Refresh to get updated votes
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Kunde inte registrera röst');
      }
    } catch (err) {
      setError('Ett fel uppstod vid röstning');
    }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    if (!window.confirm('Är du säker på att du vill radera denna röstningsfråga?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(`/api/voting-questions/${questionId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Röstningsfråga raderad!');
        fetchQuestions();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Kunde inte radera röstningsfråga');
      }
    } catch (err) {
      setError('Ett fel uppstod vid radering');
    }
  };

  const addAlternative = () => {
    setCreateForm(prev => ({
      ...prev,
      alternatives: [...prev.alternatives, '']
    }));
  };

  const removeAlternative = (index: number) => {
    if (createForm.alternatives.length > 2) {
      setCreateForm(prev => ({
        ...prev,
        alternatives: prev.alternatives.filter((_, i) => i !== index)
      }));
    }
  };

  const updateAlternative = (index: number, value: string) => {
    setCreateForm(prev => ({
      ...prev,
      alternatives: prev.alternatives.map((alt, i) => i === index ? value : alt)
    }));
  };

  const hasUserVoted = (questionId: number) => {
    const questionVoteData = questionVotes.find(qv => qv.question.id === questionId);
    if (!questionVoteData) return false;
    
    const userName = currentUser ? currentUser.name : voterName;
    return questionVoteData.votes.some(vote => vote.user_name === userName);
  };

  const getUserVote = (questionId: number) => {
    const questionVoteData = questionVotes.find(qv => qv.question.id === questionId);
    if (!questionVoteData) return null;
    
    const userName = currentUser ? currentUser.name : voterName;
    const userVote = questionVoteData.votes.find(vote => vote.user_name === userName);
    return userVote ? userVote.vote_value : null;
  };

  const getVoteCounts = (questionId: number) => {
    const questionVoteData = questionVotes.find(qv => qv.question.id === questionId);
    if (!questionVoteData) return {};
    
    const counts: { [key: string]: number } = {};
    questionVoteData.votes.forEach(vote => {
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Omröstning</h1>
          <p>Skapa och delta i röstningar för att forma Skåre 2025! Alla kan rösta och skapa frågor.</p>
        </div>
        <button 
          className="btn"
          onClick={() => setShowCreateForm(true)}
          style={{ backgroundColor: '#28a745' }}
        >
          ➕ Skapa ny röstning
        </button>
      </div>
      
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
      
      {/* Anonymous user name input */}
      {!currentUser && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>Ditt namn</h3>
          <p>Ange ditt namn för att kunna rösta och skapa röstningsfrågor:</p>
          <input
            type="text"
            value={voterName}
            onChange={(e) => setVoterName(e.target.value)}
            placeholder="Ange ditt namn"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '2px solid #ddd' }}
          />
        </div>
      )}
      
      {/* Voting Questions */}
      {questions.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>Inga röstningsfrågor ännu</h3>
          <p>Bli den första att skapa en röstningsfråga!</p>
          <button 
            className="btn"
            onClick={() => setShowCreateForm(true)}
            style={{ marginTop: '1rem', backgroundColor: '#28a745' }}
          >
            Skapa första röstningen
          </button>
        </div>
      ) : (
        <div>
          {questions.map(question => {
            const voteCounts = getVoteCounts(question.id);
            const totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);
            const userVoted = hasUserVoted(question.id);
            const userVote = getUserVote(question.id);
            
            return (
              <div key={question.id} className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3>{question.title}</h3>
                    {question.description && (
                      <p style={{ color: '#666', marginBottom: '1rem' }}>{question.description}</p>
                    )}
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      Skapad av: {question.created_by} | 
                      {new Date(question.created_at).toLocaleDateString('sv-SE')}
                    </div>
                  </div>
                  {currentUser && question.created_by === currentUser.name && (
                    <button 
                      onClick={() => handleDeleteQuestion(question.id)}
                      style={{ 
                        background: 'none',
                        border: 'none',
                        color: '#dc3545',
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                      }}
                    >
                      🗑️
                    </button>
                  )}
                </div>
                
                {userVoted ? (
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ 
                      backgroundColor: '#d4edda', 
                      color: '#155724', 
                      padding: '0.5rem 1rem', 
                      borderRadius: '5px',
                      display: 'inline-block'
                    }}>
                      ✅ Du röstade på: <strong>{userVote}</strong>
                    </div>
                  </div>
                ) : (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4>Rösta här:</h4>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {question.alternatives.map((alternative, index) => (
                        <button
                          key={index}
                          onClick={() => handleVote(question.id, alternative)}
                          className="btn"
                          style={{ 
                            backgroundColor: '#667eea',
                            fontSize: '0.9rem',
                            padding: '0.5rem 1rem'
                          }}
                        >
                          {alternative}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Vote Results */}
                {totalVotes > 0 && (
                  <div>
                    <h4>Resultat ({totalVotes} röster):</h4>
                    {question.alternatives.map((alternative, index) => {
                      const count = voteCounts[alternative] || 0;
                      const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
                      
                      return (
                        <div key={index} style={{ marginBottom: '0.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.9rem' }}>{alternative}</span>
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
                  </div>
                )}
                
                {/* Who voted for what */}
                {totalVotes > 0 && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #dee2e6' }}>
                    <h4>Vem röstade på vad:</h4>
                    <div style={{ fontSize: '0.9rem' }}>
                      {question.alternatives.map((alternative, index) => {
                        const voters = questionVotes
                          .find(qv => qv.question.id === question.id)
                          ?.votes.filter(vote => vote.vote_value === alternative)
                          .map(vote => vote.user_name) || [];
                        
                        return (
                          <div key={index} style={{ marginBottom: '0.5rem' }}>
                            <strong>{alternative}:</strong> {voters.length > 0 ? voters.join(', ') : 'Inga röster'}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Create Question Modal */}
      {showCreateForm && (
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2>Skapa ny röstningsfråga</h2>
              <button 
                onClick={() => setShowCreateForm(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.5rem', 
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateQuestion}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Fråga *
                </label>
                <input
                  type="text"
                  id="title"
                  value={createForm.title}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="T.ex. Vilket tema ska vi ha för Skåre 2025?"
                  required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '2px solid #ddd' }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Beskrivning (valfritt)
                </label>
                <textarea
                  id="description"
                  value={createForm.description}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Lägg till mer information om frågan..."
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '2px solid #ddd', minHeight: '80px' }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Alternativ *
                </label>
                {createForm.alternatives.map((alternative, index) => (
                  <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                      type="text"
                      value={alternative}
                      onChange={(e) => updateAlternative(index, e.target.value)}
                      placeholder={`Alternativ ${index + 1}`}
                      required
                      style={{ flex: 1, padding: '0.5rem', borderRadius: '5px', border: '2px solid #ddd' }}
                    />
                    {createForm.alternatives.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeAlternative(index)}
                        style={{ 
                          padding: '0.5rem', 
                          borderRadius: '5px', 
                          border: '2px solid #dc3545',
                          background: 'white',
                          color: '#dc3545',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAlternative}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    borderRadius: '5px', 
                    border: '2px solid #28a745',
                    background: 'white',
                    color: '#28a745',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  ➕ Lägg till alternativ
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    borderRadius: '5px', 
                    border: '2px solid #ddd',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  className="btn"
                  style={{ backgroundColor: '#28a745' }}
                >
                  Skapa röstning
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Omröstning; 