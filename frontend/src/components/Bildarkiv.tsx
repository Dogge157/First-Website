import React, { useState } from 'react';

interface Photo {
  id: number;
  year: number;
  title: string;
  description: string;
  imageUrl: string;
}

const Bildarkiv: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  
  // Mock data - replace with actual photos
  const photos: Photo[] = [
    {
      id: 1,
      year: 2022,
      title: 'Skåre 2022 - Gruppbild',
      description: 'En fantastisk gruppbild från Skåre 2022',
      imageUrl: '/placeholder-2022.jpg'
    },
    {
      id: 2,
      year: 2022,
      title: 'Tävling 2022',
      description: 'Spännande tävling under Skåre 2022',
      imageUrl: '/placeholder-2022-2.jpg'
    },
    {
      id: 3,
      year: 2023,
      title: 'Skåre 2023 - Öppning',
      description: 'Öppningen av Skåre 2023',
      imageUrl: '/placeholder-2023.jpg'
    },
    {
      id: 4,
      year: 2023,
      title: 'Snapsvisor 2023',
      description: 'Underhållande snapsvisor under 2023',
      imageUrl: '/placeholder-2023-2.jpg'
    },
    {
      id: 5,
      year: 2024,
      title: 'Skåre 2024 - Deltagare',
      description: 'Alla deltagare samlade 2024',
      imageUrl: '/placeholder-2024.jpg'
    }
  ];

  const years = Array.from(new Set(photos.map(photo => photo.year))).sort();
  
  const filteredPhotos = selectedYear === 'all' 
    ? photos 
    : photos.filter(photo => photo.year === selectedYear);

  return (
    <div className="section">
      <h1>Bildarkiv</h1>
      <p>Bläddra bland bilder från Skåre evenemang från 2022 och framåt.</p>
      
      {/* Year Filter */}
      <div style={{ marginBottom: '2rem' }}>
        <label htmlFor="year-filter" style={{ marginRight: '1rem', fontWeight: '500' }}>
          Filtrera efter år:
        </label>
        <select 
          id="year-filter"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
          style={{ padding: '0.5rem', borderRadius: '5px', border: '2px solid #ddd' }}
        >
          <option value="all">Alla år</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      
      {/* Photo Grid */}
      <div className="grid grid-3">
        {filteredPhotos.map(photo => (
          <div key={photo.id} className="card">
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              height: '200px', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              border: '2px dashed #dee2e6'
            }}>
              <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                Bild från {photo.year}
              </span>
            </div>
            <h3>{photo.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              {photo.description}
            </p>
            <div style={{ 
              backgroundColor: '#667eea', 
              color: 'white', 
              padding: '0.25rem 0.5rem', 
              borderRadius: '15px', 
              fontSize: '0.8rem',
              display: 'inline-block'
            }}>
              {photo.year}
            </div>
          </div>
        ))}
      </div>
      
      {filteredPhotos.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Inga bilder hittades för det valda året.</p>
        </div>
      )}
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Kommer snart</h3>
        <p>
          Fler bilder kommer att läggas till här när de blir tillgängliga. 
          Kontakta administratören om du har bilder att dela från tidigare evenemang.
        </p>
      </div>
    </div>
  );
};

export default Bildarkiv; 