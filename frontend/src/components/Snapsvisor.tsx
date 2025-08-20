import React, { useState } from 'react';

interface Song {
  id: number;
  title: string;
  lyrics: string;
  melody?: string;
}

const Snapsvisor: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const songs: Song[] = [
    {
      id: 1,
      title: "Helan går (Lilleman stå)",
      lyrics: `Helan går (Lilleman stå)
Habbes lilleman står
alla andra dogga får.
Habbes lilleman står
när alla dogga får
Linus, Hugo shimmi klarat,
men vår Habbe han blir ratad.
Så hanns lilleman står,
utan dogg och kollar på.
Habbe måste steppa upp,
innan skålen tas och slår!
habbes lilleman ståååååår`
    },
    {
      id: 2,
      title: "Röda havet (Skåre Hamn)",
      lyrics: `Vi gingo ned till Röda havet.
Vi lågo i där minst en kvart.
Men inte blev vi röda av'et,
men Röda havet det blev sva-a-a-art!

/: Men utav akvavit,
människan till kropp och själ
blir oskuldsfull och vit. :/

Vi gingo ned till Lomma bukten
vi lågo i där minst en kvart.
Men inte blev vi av med lukten,
men Lomma bukten den blev sva-a-a-art!

/: Men utav akvavit... :/

Vi gingo ned till Skåre Hamnen
vi lågo i där minst en kvart.
Men inte såg vi nått bland tången,
för i Skåre hamnen är det sva-a-a-art!

/: Men utav akvavit…/

Väl efter middan' i Skåre badrum
där lågo Finn i minst en kvart
Grannen pikade detta avskum
men allt Finn såg var bara sva-a-a-art!

/: Men utav akvavit…`
    },
    {
      id: 3,
      title: "Fader vår",
      melody: "Bön",
      lyrics: `Fader alkohol, du som är i ölen
Helgad varde din smak.
Tillkomme ditt rus.
Ske din fylla, såsom i skallen, så ock i truten.
Vår dagliga öl giv oss idag,
och förlåt oss när vi är nyktra,
såsom vi förlåta de som dricker vatten.
Och inled oss icke i torka, utan fräls oss i snaps.
Ty helan är din, och halvan är härlig, i evighet.

Amen

Skål!`
    },
    {
      id: 4,
      title: "Måltidssången",
      melody: "Fredmans epistel nr 21, Carl Michael Bellman",
      lyrics: `Så lunka vi så småningom,
från Bacchi buller och tumult
när döden ropar: Granne kom
ditt timglas är nu fullt.

Du, gubbe fäll din krycka ner,
och du, du yngling lyd min lag:
den skönsta nymf som åt dig ler
inunder armen tag.

Tycker du att graven är för djup,
nå välan, så ta dig då en sup,
tag dig sen dito en,
dito två, dito tre
så dör du nöjdare.

Säg, är du nöjd, min granne säg?
Så prisa värden nu till slut
om vi har en och samma väg,
så följoms åt... Drick ut!

Men först med vinet rött och vitt,
för vår värdinna bugom oss
och halkom sen i graven fritt
vid aftonstjärnans bloss.

Tycker du...

Säg, är du nöjd, min granne säg?
Så prisa värden nu till slut
om vi har en och samma väg,
så följoms åt... Drick ut!
Men först med vinet rött och vitt,
för vår värdinna bugom oss
och halkom sen i graven fritt
vid aftonstjärnans bloss.

Tycker du…`
    },
    {
      id: 5,
      title: "Jag har aldrig var't på snusen",
      melody: "O, hur saligt att få vandra",
      lyrics: `Jag har aldrig var't på snusen
aldrig rökat en cigarr, halleluja
Mina dygder äro tusen
inga syndiga laster jag har
Jag har aldrig sett nåt naket
inte ens ett nyfött barn
Mina blickar går mot taket
därmed undgår jag frestarens garn

Halleluja, Halleluja…

Baccus spelar på gitarren
Satan spelar på sitt handklaver
alla djävlar dansar tango
säg, vad kan man väl önska sig mer?
Jo att alla bäckar vore brännvin
Skåre hamn full av bayerskt öl
konjak i varenda rännsten
och punch i varendaste pöl, Halleluja, Halleluja…`
    },
    {
      id: 6,
      title: "Hej-hå (Shimmi visan)",
      melody: "Hej-hå (Från snövit och de sju dvärgarna)",
      lyrics: `Hej-hå! Hej-hå! Till Shimmi Bagge gå
hej-hå hej-hå
hej-hå hej-hå
hej-håååå och dogga ska han få
Hej hå!`
    },
    {
      id: 7,
      title: "Axel på reddan",
      melody: "Blinka lilla stjärna där",
      lyrics: `Blinka röda lampan där, Axel tror att han är kär
Prossen lockar in hanns syn
likt en diamant i skyn
Blinka röda lampan där, lovis undrar var han är`
    },
    {
      id: 8,
      title: "Svinnsta skär",
      lyrics: `Dansen den går uppå Svinnsta skär, hör klackarna mot hällen,
gossen han svänger med flickan kär, i stilla sommarnatt.
Blommorna dofta från hagen där och många andra ställen,
och mitt i taltrastens kvällskonsert, hörs många muntra skratt.

Ljuvlig är sommarnatten, blånande vikens vatten,
och mellan bergen och tallarna, höres musiken och trallarna.
Flickan har blommor i håren, månen strör silver i snåren, aldrig förglömmer jag stunderna där uppå Svinnsta skär.

Gossen tar flickan uti sin hand och vandrar neråt stranden,
lossar sin julle och ror från land, bland klippor och bland skär.
Drömmande ser han mot vågens rand som rullar in mot stranden,
kysser sin flicka så ömt ibland, och viska "Hjärtans kär".

Ljuvlig är sommarnatten....................

Solen går upp bakom Konungssund, och stänker guld på vågen,
Fåglarna kvittra i varje lund, sin stilla morgonbön.
Gäddorna slå invid skär och grund, så lekfulla i hågen,
men sista valsen i morgonstund, man hör från Svinnerön.

Ljuvlig är sommarnatten...................

Till Spritbolaget
Melodi: Du kära lille snickerbo

Till spritbolaget ränner jag
Och bankar på dess port.
Jag vill ha nåt' som bränner bra
Och gör mig sketfull fort.
Expediten fråga och sa:
Hur gammal kan min herre va?
Har du nåt legg ditt fula drägg
Kom hit igen när du fått skägg.

Nej, detta var ju inte bra,
Jag ska bli full i kväll.
Då kom jag på en bra idé,
Dom har ju sprit på Shell.
Många flaskor stod där på rad.
Hurra, nu kan jag bli full och glad.
Den röda drycken rann ju ner.
Nu kan jag inte se nåt mer.`
    },
    {
      id: 9,
      title: "Finsk snapsvisa",
      lyrics: `Titta taket!`
    },
    {
      id: 10,
      title: "Tänk om jag hade lilla nubben",
      melody: "Hej tomtegubbar",
      lyrics: `Tänk om jag hade lilla nubben på ett snöre i halsen.
Tänk om jag hade lilla nubben på ett snöre i halsen.
Jag skulle dra den upp och ner,
så att den kändes som många fler.
Tänk om jag hade lilla nubben på ett snöre i halsen.`
    },
    {
      id: 11,
      title: "Imse vimse Hamme",
      melody: "Imse vimse spindel",
      lyrics: `Imse vimse hugo kommer in för dörn
Snäll är ju hugo, alla glada är
Men nu kom ju snapsen alla ryser till
Fram kommer bagge rolig, farlig han är
Imse vimse hamme ge inte boisen klamme
Maja faller ner, vakten han är arg men
Imse vimse hamme ge inte boisen klamme

Bagge skålar, snear och tackar`
    }
  ];

  return (
    <div className="section">
      <h1>Snapsvisor</h1>
      <p>En samling av snapsvisor för att skapa stämning under Skåre 2025!</p>
      
      {/* Song Grid */}
      <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
        {songs.map((song) => (
          <div 
            key={song.id} 
            className="card" 
            style={{ 
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              border: '2px solid #667eea'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }}
            onClick={() => setSelectedSong(song)}
          >
            <div style={{ 
              backgroundColor: '#667eea', 
              color: 'white', 
              padding: '0.5rem', 
              borderRadius: '5px',
              marginBottom: '1rem',
              textAlign: 'center',
              fontSize: '0.9rem'
            }}>
              🍺 {song.id}
            </div>
            <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>{song.title}</h3>
            {song.melody && (
              <p style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                Melodi: {song.melody}
              </p>
            )}
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Klicka för att läsa texten
            </p>
          </div>
        ))}
      </div>

      {/* Song Modal */}
      {selectedSong && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.8)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}
        onClick={() => setSelectedSong(null)}
        >
          <div style={{ 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '15px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedSong(null)}
              style={{ 
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none', 
                border: 'none', 
                fontSize: '1.5rem', 
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
            
            <div style={{ 
              backgroundColor: '#667eea', 
              color: 'white', 
              padding: '1rem', 
              borderRadius: '10px',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <h2 style={{ margin: '0 0 0.5rem 0' }}>🍺 {selectedSong.title}</h2>
              {selectedSong.melody && (
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                  Melodi: {selectedSong.melody}
                </p>
              )}
            </div>
            
            <div style={{ 
              whiteSpace: 'pre-line',
              lineHeight: '1.6',
              fontSize: '1rem',
              fontFamily: 'monospace',
              backgroundColor: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              {selectedSong.lyrics}
            </div>
          </div>
        </div>
      )}
      
      <div className="card" style={{ 
        marginTop: '2rem',
        backgroundColor: '#28a745',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>🎵 Skål!</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          Använd dessa snapsvisor för att skapa stämning under Skåre 2025!
        </p>
        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
          Kom ihåg att dricka ansvarsfullt och ha kul tillsammans!
        </p>
      </div>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>📝 Tips för snapsvisor</h3>
        <div className="grid grid-2">
          <div>
            <h4>🎤 Sångteknik</h4>
            <ul style={{ fontSize: '0.9rem', color: '#666' }}>
              <li>Sjung med entusiasm och glädje</li>
              <li>Inkludera alla i sången</li>
              <li>Variera tempot och stämningen</li>
              <li>Ha kul och var respektfull</li>
            </ul>
          </div>
          <div>
            <h4>🍺 Skåltraditioner</h4>
            <ul style={{ fontSize: '0.9rem', color: '#666' }}>
              <li>Se varandra i ögonen när ni skålar</li>
              <li>Vänta på alla innan ni dricker</li>
              <li>Skål för varje snapsvisa</li>
              <li>Ha kul men drick ansvarsfullt</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snapsvisor; 