# Skåre 2025 - Full-Stack Web Application

En modern webbapplikation för Skåre 2025 med Python backend och React frontend.

## Projektstruktur

```
├── backend/          # Python Flask API
│   ├── uploads/      # Bildarkiv med årskataloger (2022-2025)
│   └── app.py        # Flask-applikation
├── frontend/         # React applikation
├── requirements.txt  # Python dependencies
└── README.md        # Denna fil
```

## Funktioner

- **Backend**: Python Flask API med RESTful endpoints
- **Frontend**: React med TypeScript för typsäkerhet
- **Databas**: SQLite (enkel att byta till PostgreSQL/MySQL)
- **Autentisering**: JWT-baserad autentisering
- **Lösenordsskydd**: Webbplatsen skyddas av lösenord "Trellehulla"
- **Modern UI**: Responsiv design med modern styling
- **Svenskt innehåll**: Allt innehåll på svenska
- **Bilduppladdning**: Användare kan ladda upp bilder till årskataloger

## Funktioner

### Hemsida
- Huvudsida med plats för huvudbild
- Logo "Skåre 2025"
- Navigationsmeny med alla sektioner

### Menysektioner
- **Bildarkiv**: Fotoarkiv från 2022 och framåt med årskataloger
  - Automatiska årskataloger (2022, 2023, 2024, 2025)
  - Bilduppladdning för inloggade användare
  - Bildradering (endast för uppladdaren)
  - Filtrering efter år
- **Tävlingar**: Information om tävlingar (kommer senare)
- **Snapsvisor**: Samling av snapsvisor (kommer senare)
- **Deltagare**: Visa alla deltagare och deras grupptillhörighet
- **Omröstning**: Röstningssystem för olika alternativ
  - Öppet för alla (registrerade användare och besökare)
  - Användare kan skapa egna röstningsfrågor med anpassade alternativ
  - En röst per användare per fråga
  - Detaljerad statistik visar vem som röstade på vad
  - Realtidsresultat och procentuell fördelning

### Användarhantering
- Lösenordsskydd för webbplatsen
- Användarregistrering med namn och gruppval (e-post valfritt)
- Tre grupper: Manägers, Assar, Gollar
- Inloggning och utloggning för befintliga användare
- Profilhantering med möjlighet att radera konto
- Automatisk inloggning efter registrering
- Persistent användardata (profiler sparas tills användaren raderar dem)

### Bilduppladdning
- Stöd för PNG, JPG, JPEG, GIF, WEBP
- Automatisk organisering i årskataloger
- Säker filnamnshantering
- Metadata: titel, beskrivning, år, uppladdare

## Snabbstart

### Backend Setup

1. Navigera till backend-katalogen:
   ```bash
   cd backend
   ```

2. Skapa en virtuell miljö:
   ```bash
   python -m venv venv
   source venv/bin/activate  # På Windows: venv\Scripts\activate
   ```

3. Installera dependencies:
   ```bash
   pip install -r ../requirements.txt
   ```

4. Kör Flask-servern:
   ```bash
   python app.py
   ```

Backend kommer att vara tillgänglig på `http://localhost:5001`

### Frontend Setup

1. Navigera till frontend-katalogen:
   ```bash
   cd frontend
   ```

2. Installera dependencies:
   ```bash
   npm install
   ```

3. Starta utvecklingsservern:
   ```bash
   npm start
   ```

Frontend kommer att vara tillgänglig på `http://localhost:3000`

## API Endpoints

- `POST /api/verify-password` - Verifiera webbplatslösenord
- `GET /api/health` - Hälsokontroll
- `GET /api/users` - Hämta alla användare
- `POST /api/users` - Skapa ny användare
- `GET /api/users/<id>` - Hämta användare efter ID
- `PUT /api/users/<id>` - Uppdatera användare
- `DELETE /api/users/<id>` - Radera användare
- `POST /api/login` - Användarinloggning
- `GET /api/profile` - Hämta användarprofil
- `GET /api/groups` - Hämta tillgängliga grupper
- `GET /api/votes` - Hämta röster
- `POST /api/votes` - Skapa ny röst
- `GET /api/voting-questions` - Hämta röstningsfrågor
- `POST /api/voting-questions` - Skapa ny röstningsfråga
- `GET /api/voting-questions/<id>/votes` - Hämta röster för specifik fråga
- `DELETE /api/voting-questions/<id>` - Radera röstningsfråga
- `GET /api/photos` - Hämta bilder (med årfiltrering)
- `POST /api/photos` - Ladda upp bild
- `DELETE /api/photos/<id>` - Radera bild
- `GET /uploads/<path:filename>` - Hämta uppladdade bilder

## Utveckling

- Backend använder Flask med Flask-CORS för cross-origin requests
- Frontend använder React 18 med TypeScript
- Styling med modern CSS för responsiv design
- Hot reloading aktiverat för både frontend och backend
- Bilduppladdning med säker filnamnshantering

## Deployment

Detta projekt kan enkelt deployas till:
- **Backend**: Heroku, Railway eller vilken Python-hosting som helst
- **Frontend**: Vercel, Netlify eller vilken statisk hosting som helst
- **Bilder**: S3, Cloudinary eller liknande för produktion 