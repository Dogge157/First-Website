import React, { useState, useEffect } from 'react';
import { buildApiUrl } from '../config';

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
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
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
      ? buildApiUrl('/api/photos')
      : `${buildApiUrl('/api/photos')}?year=${selectedYear}`;
      
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
      const response = await fetch(buildApiUrl('/api/photos'), {
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
      const response = await fetch(`${buildApiUrl('/api/photos')}/${photoId}`, {
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

  const handleImageClick = (photo: Photo) => {
    setSelectedImage(photo);
    setShowImageModal(true);
  };

  // Handle keyboard events for the image modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showImageModal && event.key === 'Escape') {
        setShowImageModal(false);
      }
    };

    if (showImageModal) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showImageModal]);

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
          {!currentUser && (
            <p style={{ 
              fontSize: '0.9rem', 
              color: '#666', 
              fontStyle: 'italic',
              marginTop: '0.5rem'
            }}>
              Logga in för att ladda upp egna bilder till arkivet.
            </p>
          )}
        </div>
        {currentUser && (
          <button 
            className="btn"
            onClick={() => setShowUpload(true)}
            style={{ 
              backgroundColor: '#28a745',
              fontSize: '1.1rem',
              padding: '0.75rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
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
                <div className="grid grid-4">
                  {groupedPhotos[year].map(photo => (
                    <div key={photo.id} className="card" style={{ padding: '1rem' }}>
                      <div style={{ 
                        backgroundColor: '#f8f9fa', 
                        height: '150px', 
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.75rem',
                        border: '2px solid #dee2e6',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onClick={() => handleImageClick(photo)}
                      >
                        <img 
                          src={`${buildApiUrl('')}${photo.url}`}
                          alt={photo.title}
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '100%', 
                            objectFit: 'contain' 
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = `
                              <span style="color: #6c757d; font-size: 0.8rem;">
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
        <div className="grid grid-4">
          {photos.map(photo => (
            <div key={photo.id} className="card" style={{ padding: '1rem' }}>
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                height: '150px', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem',
                border: '2px solid #dee2e6',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onClick={() => handleImageClick(photo)}
              >
                <img 
                  src={`${buildApiUrl('')}${photo.url}`}
                  alt={photo.title}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%', 
                    objectFit: 'contain' 
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <span style="color: #6c757d; font-size: 0.8rem;">
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
      
      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.9)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 2000
        }}
        onClick={() => setShowImageModal(false)}
        >
          <div style={{ 
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setShowImageModal(false)}
              style={{ 
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none', 
                border: 'none', 
                fontSize: '2rem', 
                cursor: 'pointer',
                color: 'white',
                zIndex: 2001
              }}
            >
              ×
            </button>
            
            {/* Image */}
            <img 
              src={`${buildApiUrl('')}${selectedImage.url}`}
              alt={selectedImage.title}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '80vh', 
                objectFit: 'contain',
                borderRadius: '8px'
              }}
            />
            
            {/* Image info */}
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.95)', 
              padding: '1rem', 
              borderRadius: '8px',
              marginTop: '1rem',
              maxWidth: '100%',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                  {selectedImage.description}
                </p>
              )}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '1rem',
                fontSize: '0.8rem',
                color: '#666'
              }}>
                <span style={{ 
                  backgroundColor: '#667eea', 
                  color: 'white', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '15px'
                }}>
                  {selectedImage.year}
                </span>
                <span>Uppladdad av: {selectedImage.uploaded_by}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bildarkiv; 