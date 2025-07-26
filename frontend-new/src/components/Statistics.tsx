import React, { useState } from 'react';

interface TournamentStats {
  year: string;
  champion: string;
  runnerUp: string;
  totalTeams: number;
  totalMatches: number;
  averageGoals: number;
  attendance: number;
}

interface PlayerStats {
  name: string;
  goals: number;
  assists: number;
  matches: number;
  team: string;
  year: string;
}

const Statistics: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  const tournamentHistory: TournamentStats[] = [
    {
      year: '2024',
      champion: 'Team Alpha',
      runnerUp: 'Team Beta',
      totalTeams: 16,
      totalMatches: 31,
      averageGoals: 2.8,
      attendance: 125000
    },
    {
      year: '2023',
      champion: 'Team Gamma',
      runnerUp: 'Team Delta',
      totalTeams: 16,
      totalMatches: 31,
      averageGoals: 2.6,
      attendance: 118000
    },
    {
      year: '2022',
      champion: 'Team Epsilon',
      runnerUp: 'Team Zeta',
      totalTeams: 16,
      totalMatches: 31,
      averageGoals: 2.9,
      attendance: 132000
    },
    {
      year: '2021',
      champion: 'Team Eta',
      runnerUp: 'Team Theta',
      totalTeams: 16,
      totalMatches: 31,
      averageGoals: 2.7,
      attendance: 110000
    }
  ];

  const topScorers: PlayerStats[] = [
    { name: 'Alex Rodriguez', goals: 12, assists: 8, matches: 8, team: 'Team Alpha', year: '2024' },
    { name: 'Maria Santos', goals: 10, assists: 6, matches: 7, team: 'Team Beta', year: '2024' },
    { name: 'James Wilson', goals: 9, assists: 7, matches: 8, team: 'Team Gamma', year: '2024' },
    { name: 'Sarah Johnson', goals: 8, assists: 9, matches: 8, team: 'Team Delta', year: '2024' },
    { name: 'Michael Chen', goals: 7, assists: 5, matches: 7, team: 'Team Alpha', year: '2024' }
  ];

  const selectedTournament = tournamentHistory.find(t => t.year === selectedYear);

  return (
    <div>
      <div className="header">
        <h1>📊 Tournament Statistics</h1>
        <p>Historical data and performance metrics from previous championships</p>
      </div>

      {/* Year Selector */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Select Tournament Year</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {tournamentHistory.map((tournament) => (
            <button
              key={tournament.year}
              onClick={() => setSelectedYear(tournament.year)}
              className={`btn ${selectedYear === tournament.year ? 'btn-primary' : 'btn-secondary'}`}
            >
              {tournament.year}
            </button>
          ))}
        </div>
      </div>

      {/* Tournament Overview */}
      {selectedTournament && (
        <div className="grid">
          <div className="card">
            <h3>🏆 {selectedTournament.year} Championship</h3>
            <div style={{ fontSize: '1.1rem' }}>
              <p><strong>Champion:</strong> {selectedTournament.champion}</p>
              <p><strong>Runner-up:</strong> {selectedTournament.runnerUp}</p>
              <p><strong>Total Teams:</strong> {selectedTournament.totalTeams}</p>
              <p><strong>Total Matches:</strong> {selectedTournament.totalMatches}</p>
              <p><strong>Average Goals per Match:</strong> {selectedTournament.averageGoals}</p>
              <p><strong>Total Attendance:</strong> {selectedTournament.attendance.toLocaleString()}</p>
            </div>
          </div>

          <div className="card">
            <h3>📈 Performance Metrics</h3>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>
                {selectedTournament.averageGoals}
              </div>
              <p style={{ margin: 0, fontSize: '1.1rem' }}>Average Goals per Match</p>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Match Efficiency</span>
                <span>85%</span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                background: '#e5e7eb', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: '85%', 
                  height: '100%', 
                  background: '#3b82f6',
                  borderRadius: '4px'
                }}></div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>🎯 Tournament Highlights</h3>
            <ul style={{ fontSize: '1rem' }}>
              <li>Most goals in a single match: 6</li>
              <li>Longest winning streak: 5 matches</li>
              <li>Biggest upset: Team underdog vs favorite</li>
              <li>Most attended match: Final</li>
              <li>Fastest goal: 23 seconds</li>
            </ul>
          </div>
        </div>
      )}

      {/* Top Scorers */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>⚽ Top Scorers - {selectedYear}</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            marginTop: '1rem'
          }}>
            <thead>
              <tr style={{ 
                background: '#f8fafc',
                borderBottom: '2px solid #e2e8f0'
              }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Rank</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Player</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Team</th>
                <th style={{ padding: '0.75rem', textAlign: 'center' }}>Goals</th>
                <th style={{ padding: '0.75rem', textAlign: 'center' }}>Assists</th>
                <th style={{ padding: '0.75rem', textAlign: 'center' }}>Matches</th>
              </tr>
            </thead>
            <tbody>
              {topScorers.map((player, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{index + 1}</td>
                  <td style={{ padding: '0.75rem' }}>{player.name}</td>
                  <td style={{ padding: '0.75rem' }}>{player.team}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 'bold' }}>{player.goals}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>{player.assists}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>{player.matches}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Trends */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>📊 Historical Trends</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f0f9ff', borderRadius: '0.375rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0369a1' }}>
              {tournamentHistory.reduce((sum, t) => sum + t.totalMatches, 0)}
            </div>
            <p style={{ margin: 0, color: '#0c4a6e' }}>Total Matches (All Years)</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f0fdf4', borderRadius: '0.375rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>
              {(tournamentHistory.reduce((sum, t) => sum + t.averageGoals, 0) / tournamentHistory.length).toFixed(1)}
            </div>
            <p style={{ margin: 0, color: '#15803d' }}>Average Goals (All Years)</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#fef2f2', borderRadius: '0.375rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626' }}>
              {tournamentHistory.reduce((sum, t) => sum + t.attendance, 0).toLocaleString()}
            </div>
            <p style={{ margin: 0, color: '#991b1b' }}>Total Attendance (All Years)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 