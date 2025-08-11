# Skåre 2025 - Full-Stack Web Application

En modern webbapplikation för Skåre 2025 med Python backend och React frontend.

## Projektstruktur

```
├── backend/          # Python Flask API
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

## Funktioner

### Hemsida
- Huvudsida med plats för huvudbild
- Logo "Skåre 2025"
- Navigationsmeny med alla sektioner

### Menysektioner
- **Bildarkiv**: Fotoarkiv från 2022 och framåt
- **Tävlingar**: Information om tävlingar (kommer senare)
- **Snapsvisor**: Samling av snapsvisor (kommer senare)
- **Deltagare**: Visa alla deltagare och deras grupptillhörighet
- **Omröstning**: Röstningssystem för olika alternativ

### Användarhantering
- Lösenordsskydd för webbplatsen
- Användarregistrering med namn och gruppval
- Tre grupper: Manägers, Assar, Gollar
- Inloggning och utloggning

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

Backend kommer att vara tillgänglig på `http://localhost:5000`

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

## Utveckling

- Backend använder Flask med Flask-CORS för cross-origin requests
- Frontend använder React 18 med TypeScript
- Styling med modern CSS för responsiv design
- Hot reloading aktiverat för både frontend och backend

## Deployment

Detta projekt kan enkelt deployas till:
- **Backend**: Heroku, Railway eller vilken Python-hosting som helst
- **Frontend**: Vercel, Netlify eller vilken statisk hosting som helst 