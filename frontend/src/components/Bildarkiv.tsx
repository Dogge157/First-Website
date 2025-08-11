import React, { useState, useEffect } from 'react';

interface Photo {
  id: number;
  filename: string;
  original_filename: string;
  title: string;
  description: string;
  year: number;
  uploaded_by: string;
  uploaded_at: string;
  url: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  group: string;
}

const Bildarkiv: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear(),
    file: null as File | null
  });
  const [uploading, setUploading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const years = [2022, 2023, 2024, 2025];

  useEffect(() => {
    fetchPhotos();
    checkCurrentUser();
  }, [selectedYear]);

  const checkCurrentUser = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  };

  const fetchPhotos = async () => {
    try {
      const url = selectedYear === 'all' 
        ? 'http://localhost:5001/api/photos'
        : `http://localhost:5001/api/photos?year=${selectedYear}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file || !uploadForm.title || !currentUser) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', uploadForm.file);
    formData.append('title', uploadForm.title);
    formData.append('description', uploadForm.description);
    formData.append('year', uploadForm.year.toString());

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/photos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setShowUpload(false);
        setUploadForm({ title: '', description: '', year: new Date().getFullYear(), file: null });
        fetchPhotos();
      } else {
        const error = await response.json();
        alert(`Fel vid uppladdning: ${error.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Ett fel uppstod vid uppladdning');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photoId: number) => {
    if (!window.confirm('Är du säker på att du vill radera denna bild?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/photos/${photoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchPhotos();
      } else {
        const error = await response.json();
        alert(`Fel vid radering: ${error.error}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Ett fel uppstod vid radering');
    }
  };

  const groupedPhotos = photos.reduce((acc, photo) => {
    if (!acc[photo.year]) {
      acc[photo.year] = [];
    }
    acc[photo.year].push(photo);
    return acc;
  }, {} as Record<number, Photo[]>);

  if (loading) {
    return (
      <div className="section">
        <h1>Bildarkiv</h1>
        <p>Laddar bilder...</p>
      </div>
    );
  }

  return (
    <div className="section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Bildarkiv</h1>
          <p>Bläddra bland bilder från Skåre evenemang från 2022 och framåt.</p>
        </div>
        {currentUser && (
          <button 
            className="btn"
            onClick={() => setShowUpload(true)}
            style={{ backgroundColor: '#28a745' }}
          >
            📸 Ladda upp bild
          </button>
        )}
      </div>
      
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
      
      {/* Year Folders */}
      {selectedYear === 'all' ? (
        <div>
          {years.map(year => (
            <div key={year} className="card" style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: '#667eea', 
                borderBottom: '2px solid #667eea', 
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
              }}>
                📁 {year}
              </h2>
              
              {groupedPhotos[year] && groupedPhotos[year].length > 0 ? (
                <div className="grid grid-3">
                  {groupedPhotos[year].map(photo => (
                    <div key={photo.id} className="card">
                      <div style={{ 
                        backgroundColor: '#f8f9fa', 
                        height: '200px', 
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        border: '2px solid #dee2e6',
                        overflow: 'hidden'
                      }}>
                        <img 
                          src={`http://localhost:5001${photo.url}`}
                          alt={photo.title}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = `
                              <span style="color: #6c757d; font-size: 0.9rem;">
                                Bild från ${photo.year}
                              </span>
                            `;
                          }}
                        />
                      </div>
                      <h3>{photo.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: '#666' }}>
                        {photo.description}
                      </p>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginTop: '1rem'
                      }}>
                        <div style={{ 
                          backgroundColor: '#667eea', 
                          color: 'white', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '15px', 
                          fontSize: '0.8rem'
                        }}>
                          {photo.year}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>
                          Uppladdad av: {photo.uploaded_by}
                        </div>
                      </div>
                      {currentUser && (
                        <button 
                          onClick={() => handleDelete(photo.id)}
                          style={{ 
                            background: 'none',
                            border: 'none',
                            color: '#dc3545',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            marginTop: '0.5rem'
                          }}
                        >
                          🗑️ Radera
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#666', fontStyle: 'italic' }}>
                  Inga bilder från {year} ännu.
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-3">
          {photos.map(photo => (
            <div key={photo.id} className="card">
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                height: '200px', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                border: '2px solid #dee2e6',
                overflow: 'hidden'
              }}>
                <img 
                  src={`http://localhost:5001${photo.url}`}
                  alt={photo.title}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <span style="color: #6c757d; font-size: 0.9rem;">
                        Bild från ${photo.year}
                      </span>
                    `;
                  }}
                />
              </div>
              <h3>{photo.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                {photo.description}
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: '1rem'
              }}>
                <div style={{ 
                  backgroundColor: '#667eea', 
                  color: 'white', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '15px', 
                  fontSize: '0.8rem'
                }}>
                  {photo.year}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  Uppladdad av: {photo.uploaded_by}
                </div>
              </div>
              {currentUser && (
                <button 
                  onClick={() => handleDelete(photo.id)}
                  style={{ 
                    background: 'none',
                    border: 'none',
                    color: '#dc3545',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginTop: '0.5rem'
                  }}
                >
                  🗑️ Radera
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      
      {photos.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Inga bilder hittades för det valda året.</p>
          {currentUser && (
            <button 
              className="btn"
              onClick={() => setShowUpload(true)}
              style={{ marginTop: '1rem', backgroundColor: '#28a745' }}
            >
              📸 Ladda upp första bilden
            </button>
          )}
        </div>
      )}
      
      {/* Upload Modal */}
      {showUpload && (
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
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2>Ladda upp bild</h2>
              <button 
                onClick={() => setShowUpload(false)}
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
            
            <form onSubmit={handleUpload}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Titel *
                </label>
                <input
                  type="text"
                  id="title"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '2px solid #ddd' }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Beskrivning
                </label>
                <textarea
                  id="description"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '2px solid #ddd', minHeight: '80px' }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="year" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  År *
                </label>
                <select
                  id="year"
                  value={uploadForm.year}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '2px solid #ddd' }}
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="file" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Bildfil *
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '2px solid #ddd' }}
                />
                <small style={{ color: '#666' }}>
                  Tillåtna format: PNG, JPG, JPEG, GIF, WEBP
                </small>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
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
                  disabled={uploading || !uploadForm.file || !uploadForm.title}
                  className="btn"
                  style={{ backgroundColor: uploading ? '#6c757d' : '#28a745' }}
                >
                  {uploading ? 'Laddar upp...' : 'Ladda upp'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bildarkiv; 