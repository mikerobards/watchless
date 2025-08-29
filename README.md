# WatchLess - TV Viewing Tracker

A minimalist web application to help users track and reduce their TV viewing time through simple time tracking, data visualization, and AI-powered insights.

## 🚀 Phase 1 MVP Features

- ✅ **Basic Timer Functionality**: Start/stop viewing sessions with one button
- ✅ **Persistent Sessions**: Timer continues running even if browser is closed/refreshed
- ✅ **Simple UI**: Clean, mobile-first design with minimal clutter
- ✅ **Local Data Storage**: All timer data stored locally in browser
- ✅ **Show Name Entry**: Optional modal to enter show name after stopping timer
- ✅ **Google OAuth Setup**: Basic authentication infrastructure (UI placeholder)
- ✅ **Express.js Backend**: REST API with authentication routes

## 🛠️ Technology Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Local Storage** for data persistence

### Backend

- **Node.js** with Express.js
- **TypeScript** for type safety
- **JWT** for authentication
- **Google Auth Library** for OAuth

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### 1. Clone and Setup

```bash
git clone <repository-url>
cd watchless
```

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your Google Client ID
npm run dev
```

### 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### 4. Environment Configuration

#### Backend (.env)

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:3001
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## 🎯 Usage

1. **Start the Backend**: `cd backend && npm run dev`
2. **Start the Frontend**: `cd frontend && npm run dev`
3. **Open Browser**: Navigate to `http://localhost:5173`
4. **Start Tracking**: Click "Start Watching" to begin timing your TV sessions
5. **Stop & Log**: Click "Stop Watching" and optionally enter the show name

## 📱 Features in Detail

### Timer Functionality

- **One-Button Interface**: Single prominent button toggles between start/stop
- **Real-time Display**: Shows current session time in MM:SS or H:MM:SS format
- **Persistent State**: Timer continues running across browser sessions
- **Session Management**: Automatically creates and manages viewing sessions

### User Interface

- **Mobile-First Design**: Optimized for mobile devices primarily
- **Clean Layout**: Minimal visual clutter with clear status indication
- **Responsive**: Works on all screen sizes
- **Accessibility**: Proper focus management and keyboard navigation

### Data Storage

- **Local Storage**: All data stored in browser's localStorage
- **Session Persistence**: Timer state survives browser restarts
- **Data Types**: Timer state, user preferences, session history

## 🚧 Coming in Later Phases

- **Phase 2**: Cloud Firestore integration, Google Sheets export, Push notifications
- **Phase 3**: AI insights with Gemini, Viewing habit analysis, Personalized suggestions
- **Phase 4**: PWA features, Performance optimization, Production deployment

## 🔧 Development

### Frontend Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Scripts

```bash
npm run dev          # Start development server with nodemon
npm run build        # Compile TypeScript to JavaScript
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📊 Project Structure

```tree
watchless/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   └── Timer.tsx     # Main timer component
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useTimer.ts   # Timer logic hook
│   │   ├── services/         # Service layers
│   │   │   └── localStorage.ts
│   │   ├── types/            # TypeScript definitions
│   │   └── App.tsx           # Main app component
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   │   ├── auth.ts      # Authentication routes
│   │   │   ├── sessions.ts  # Session management
│   │   │   └── analytics.ts # Analytics endpoints
│   │   └── server.ts        # Main server file
│   └── package.json
└── README.md
```

## 🔒 Security

- **CORS Protection**: Configured for frontend origin only
- **Helmet**: Security headers and protection
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Request validation and sanitization
- **Environment Variables**: Sensitive data in .env files

## 🤝 Contributing

This is Phase 1 MVP. Future phases will expand functionality significantly.

## 📄 License

MIT License - see LICENSE file for details.
