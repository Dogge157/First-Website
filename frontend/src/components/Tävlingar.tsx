import React from 'react';

const Tävlingar: React.FC = () => {
  return (
    <div className="section">
      <h1>Clash of Lads</h1>
      <p>Välkommen till Skåre 2025 tävlingar! Här hittar du information om alla tävlingar och deras regler.</p>
      
      <div className="grid grid-1" style={{ marginTop: '2rem' }}>
        
        {/* Competition 1 */}
        <div className="card" style={{ 
          border: '2px solid #667eea',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem',
          backgroundColor: '#f8f9ff'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1.5rem',
            gap: '1rem'
          }}>
            <div style={{ 
              fontSize: '3rem',
              backgroundColor: '#667eea',
              color: 'white',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              1
            </div>
            <div>
              <h2 style={{ margin: 0, color: '#667eea' }}>Down in the valley!</h2>
              <div style={{ 
                backgroundColor: '#667eea', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '15px', 
                fontSize: '0.9rem',
                display: 'inline-block'
              }}>
                Max poäng: 6
              </div>
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>Regler:</h3>
            <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
              Varje lag får 1 sugrör som man kan suga med. På snabbast tid ska hela kastrullen drickas och endast 1 person får dricka åt gången.
            </p>
            <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
              <strong>Poängfördelning:</strong> Vinnare 6 poäng och sedan 4, och 2 fortsätter neråt.
            </p>
            <p style={{ lineHeight: '1.6', fontStyle: 'italic', color: '#666' }}>
              Säger man lovali måste alla höra för att det ska gällas.
            </p>
          </div>
        </div>

        {/* Competition 2 */}
        <div className="card" style={{ 
          border: '2px solid #28a745',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem',
          backgroundColor: '#f8fff9'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1.5rem',
            gap: '1rem'
          }}>
            <div style={{ 
              fontSize: '3rem',
              backgroundColor: '#28a745',
              color: 'white',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              2
            </div>
            <div>
              <h2 style={{ margin: 0, color: '#28a745' }}>På Hardebergaspåret!</h2>
              <div style={{ 
                backgroundColor: '#28a745', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '15px', 
                fontSize: '0.9rem',
                display: 'inline-block'
              }}>
                Max poäng: 3 per person
              </div>
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>Regler:</h3>
            <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
              Gameleaders kommer att berätta om en person som alla känner till. Vi börjar på ledtråden för 3 poäng därefter 2, och till sist 1 poäng.
            </p>
            <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
              Ni gissar när ni tror att ni vet svaret och skriver ner på en lapp och ger till gameleader. Det kommer finnas 3 personer som ni kommer få chansen att gissa på.
            </p>
            <p style={{ lineHeight: '1.6', fontStyle: 'italic', color: '#666' }}>
              För varje gissning ska en halv enhet konsumeras.
            </p>
          </div>
        </div>

        {/* Competition 3 */}
        <div className="card" style={{ 
          border: '2px solid #dc3545',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '2rem',
          backgroundColor: '#fff8f8'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1.5rem',
            gap: '1rem'
          }}>
            <div style={{ 
              fontSize: '3rem',
              backgroundColor: '#dc3545',
              color: 'white',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              3
            </div>
            <div>
              <h2 style={{ margin: 0, color: '#dc3545' }}>Clan wars</h2>
              <div style={{ 
                backgroundColor: '#dc3545', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '15px', 
                fontSize: '0.9rem',
                display: 'inline-block'
              }}>
                Först till 11 poäng
              </div>
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>Boule med wildcards</h3>
            <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
              En klassisk match boule där varje lag får två klot vardera. Varje lag har dessutom 3 wildcards man kan använda under matchens gång för att få en edge mot sina motståndare.
            </p>
            
            <h4 style={{ color: '#333', marginTop: '1.5rem', marginBottom: '1rem' }}>De tre wildcardsen är följande:</h4>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#dc3545' }}>Doggy:</strong> Välj en motståndare som måste kasta sitt nästa klot baklänges mellan benen. (Kan användas när som helst.)
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#dc3545' }}>Triple captain:</strong> Lagkaptenens kula räknas trippelt kommande runda
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#dc3545' }}>Coach boost:</strong> Coachen hoppar in och kastar en extra kula. Laget får alltså tre klot den rundan. (Kan användas när som helst.)
            </div>
            
            <p style={{ lineHeight: '1.6', marginTop: '1.5rem', fontStyle: 'italic', color: '#666' }}>
              Första laget som når 11 poäng vinner och de poängen man får adderas till den totala poängpotten i Clash of Lads. Må bäste lag vinna!
            </p>
          </div>
        </div>
      </div>
      
      <div className="card" style={{ 
        marginTop: '2rem',
        backgroundColor: '#667eea',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>🏆 Total Poängställning</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          Alla poäng från tävlingarna samlas i den totala poängpotten för Clash of Lads.
        </p>
        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
          Må bäste lag vinna den ultimata titeln!
        </p>
      </div>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>📋 Tävlingsinformation</h3>
        <p>
          Alla tävlingar kommer att genomföras under Skåre 2025. Gameleaders kommer att förklara reglerna mer i detalj innan varje tävling börjar.
        </p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          För frågor om tävlingar eller regler, kontakta arrangörerna.
        </p>
      </div>
    </div>
  );
};

export default Tävlingar; 