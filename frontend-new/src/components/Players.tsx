import React, { useState } from 'react';

interface Player {
  id: number;
  name: string;
  position: string;
  team: string;
  age: number;
  nationality: string;
  height: string;
  weight: string;
  goals: number;
  assists: number;
  matches: number;
  bio: string;
  achievements: string[];
  imageUrl?: string;
}

const Players: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [selectedPosition, setSelectedPosition] = useState('All Positions');

  const players: Player[] = [
    {
      id: 1,
      name: 'Alex Rodriguez',
      position: 'Forward',
      team: 'Team Alpha',
      age: 24,
      nationality: 'Spanish',
      height: '1.78m',
      weight: '75kg',
      goals: 12,
      assists: 8,
      matches: 8,
      bio: 'Alex is a dynamic forward known for his exceptional speed and clinical finishing. He joined Team Alpha in 2022 and has quickly become one of the most feared strikers in the league. His ability to create chances out of nothing and his leadership on the field make him a valuable asset to any team.',
      achievements: ['Top Scorer 2024', 'Player of the Month (March 2024)', 'Team Captain 2023-2024']
    },
    {
      id: 2,
      name: 'Maria Santos',
      position: 'Midfielder',
      team: 'Team Beta',
      age: 26,
      nationality: 'Brazilian',
      height: '1.65m',
      weight: '58kg',
      goals: 10,
      assists: 6,
      matches: 7,
      bio: 'Maria is a creative midfielder with exceptional vision and passing ability. Her technical skills and tactical awareness have made her one of the most respected players in the league. She excels at controlling the tempo of the game and creating scoring opportunities for her teammates.',
      achievements: ['Best Midfielder 2023', 'Assist Leader 2023', 'Fans\' Favorite 2024']
    },
    {
      id: 3,
      name: 'James Wilson',
      position: 'Defender',
      team: 'Team Gamma',
      age: 28,
      nationality: 'English',
      height: '1.85m',
      weight: '82kg',
      goals: 9,
      assists: 7,
      matches: 8,
      bio: 'James is a commanding central defender known for his aerial dominance and tactical intelligence. His leadership qualities and ability to organize the defense have been crucial to Team Gamma\'s success. He\'s also a threat from set-pieces.',
      achievements: ['Best Defender 2022', 'Team Captain 2021-2023', 'Clean Sheet Record Holder']
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      position: 'Forward',
      team: 'Team Delta',
      age: 23,
      nationality: 'American',
      height: '1.70m',
      weight: '65kg',
      goals: 8,
      assists: 9,
      matches: 8,
      bio: 'Sarah is a versatile forward who can play both as a striker and winger. Her pace, dribbling skills, and ability to score from various positions make her a constant threat to opposing defenses. She\'s known for her work ethic and team-first mentality.',
      achievements: ['Young Player of the Year 2023', 'Most Improved Player 2024', 'Community Service Award']
    },
    {
      id: 5,
      name: 'Michael Chen',
      position: 'Goalkeeper',
      team: 'Team Alpha',
      age: 29,
      nationality: 'Chinese',
      height: '1.88m',
      weight: '78kg',
      goals: 0,
      assists: 2,
      matches: 7,
      bio: 'Michael is an agile goalkeeper with excellent reflexes and shot-stopping ability. His communication skills and ability to organize the defense from the back have been instrumental in Team Alpha\'s defensive record. He\'s also known for his distribution skills.',
      achievements: ['Best Goalkeeper 2023', 'Most Clean Sheets 2024', 'Golden Glove Award']
    },
    {
      id: 6,
      name: 'Elena Petrov',
      position: 'Midfielder',
      team: 'Team Beta',
      age: 25,
      nationality: 'Russian',
      height: '1.72m',
      weight: '62kg',
      goals: 6,
      assists: 12,
      matches: 8,
      bio: 'Elena is a technically gifted midfielder with exceptional ball control and passing range. Her ability to dictate play from the center of the field and her vision for creating scoring opportunities make her one of the most valuable players in the league.',
      achievements: ['Playmaker of the Year 2024', 'Best Passer 2023', 'Team MVP 2022']
    }
  ];

  const teams = ['All Teams', ...Array.from(new Set(players.map(p => p.team)))];
  const positions = ['All Positions', ...Array.from(new Set(players.map(p => p.position)))];

  const filteredPlayers = players.filter(player => {
    const teamMatch = selectedTeam === 'All Teams' || player.team === selectedTeam;
    const positionMatch = selectedPosition === 'All Positions' || player.position === selectedPosition;
    return teamMatch && positionMatch;
  });

  return (
    <div>
      <div className="header">
        <h1>👥 Player Profiles</h1>
        <p>Meet the talented athletes competing in this year's championship</p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Filter Players</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <label className="form-label">Team:</label>
            <select 
              value={selectedTeam} 
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="form-input"
              style={{ width: 'auto' }}
            >
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Position:</label>
            <select 
              value={selectedPosition} 
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="form-input"
              style={{ width: 'auto' }}
            >
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Player Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {filteredPlayers.map(player => (
          <div key={player.id} className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginRight: '1rem'
              }}>
                {player.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{player.name}</h3>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                  {player.position} • {player.team}
                </p>
              </div>
            </div>

            {/* Player Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1rem',
              marginBottom: '1rem',
              padding: '1rem',
              background: '#f8fafc',
              borderRadius: '0.375rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626' }}>
                  {player.goals}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Goals</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
                  {player.assists}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Assists</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>
                  {player.matches}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Matches</div>
              </div>
            </div>

            {/* Player Info */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
                <div><strong>Age:</strong> {player.age}</div>
                <div><strong>Nationality:</strong> {player.nationality}</div>
                <div><strong>Height:</strong> {player.height}</div>
                <div><strong>Weight:</strong> {player.weight}</div>
              </div>
            </div>

            {/* Bio */}
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Biography</h4>
              <p style={{ fontSize: '0.875rem', lineHeight: '1.5', color: '#374151' }}>
                {player.bio}
              </p>
            </div>

            {/* Achievements */}
            <div>
              <h4 style={{ marginBottom: '0.5rem' }}>Achievements</h4>
              <ul style={{ fontSize: '0.875rem', margin: 0, paddingLeft: '1.5rem' }}>
                {player.achievements.map((achievement, index) => (
                  <li key={index} style={{ marginBottom: '0.25rem', color: '#374151' }}>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Player Statistics Summary */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>📊 Player Statistics Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f0f9ff', borderRadius: '0.375rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0369a1' }}>
              {players.length}
            </div>
            <p style={{ margin: 0, color: '#0c4a6e' }}>Total Players</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f0fdf4', borderRadius: '0.375rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>
              {players.reduce((sum, p) => sum + p.goals, 0)}
            </div>
            <p style={{ margin: 0, color: '#15803d' }}>Total Goals</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#fef2f2', borderRadius: '0.375rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>
              {players.reduce((sum, p) => sum + p.assists, 0)}
            </div>
            <p style={{ margin: 0, color: '#991b1b' }}>Total Assists</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#fef3c7', borderRadius: '0.375rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>
              {Math.round(players.reduce((sum, p) => sum + p.age, 0) / players.length)}
            </div>
            <p style={{ margin: 0, color: '#92400e' }}>Average Age</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Players; 