# WatchLess - TV Viewing Tracker

## Requirements & Architecture Documentation

---

## 1. Project Overview

**WatchLess** is a minimalist web application designed to help users track and reduce their TV viewing time through simple time tracking, data visualization, and AI-powered insights.

### Core Objectives

- Provide effortless TV viewing time tracking
- Export viewing data to Google Sheets for external analysis
- Offer AI-powered insights to help users reduce screen time
- Maintain extreme UI simplicity

---

## 2. Functional Requirements

### 2.1 Core Features

#### Timer Functionality

- **Start/Stop Button**: Single button interface that toggles between "Start Watching" and "Stop Watching"
- **Session Tracking**: Automatically tracks viewing time from start to stop
- **Show Name Entry**: After clicking "Stop", optional modal to enter the show name
- **Persistent Sessions**: Timer continues running even if browser is closed/refreshed

#### Notifications

- **1-Hour Alert**: Push notification after 60 minutes asking "Are you still watching TV?"
- **Notification Actions**:
  - "Yes, still watching" (continues timer)
  - "No, stop timer" (ends session)
- **Browser Permission**: Request notification permissions on first use

#### Data Export

- **Google Sheets Integration**: Export viewing data to user's Google Sheet
- **Time Aggregation**: Track viewing time by:
  - Daily totals
  - Weekly totals
  - Monthly totals
- **Show Tracking**: Log individual shows watched per session
- **Auto-sync**: Periodic background sync to Google Sheets

#### AI Analytics (Gemini)

- **Habit Analysis**: Analyze viewing patterns and identify trends
- **Personalized Suggestions**: Provide actionable recommendations to reduce viewing time
- **Weekly Reports**: Generate AI-powered summaries of viewing habits
- **Goal Setting**: Suggest realistic viewing time reduction goals

#### User Authentication

- **Google OAuth**: Use Google Cloud Identity for authentication
- **Session Management**: Maintain user sessions securely
- **Data Isolation**: Each user's data is completely separate

### 2.2 User Interface Requirements

#### Simplicity Principles

- **One-Button Interface**: Primary interaction is a single prominent button
- **Minimal Visual Clutter**: Clean, focused design with minimal elements
- **Clear Status Indication**: Obvious visual feedback for timer state
- **Mobile-First**: Optimized for mobile devices primarily

#### Layout Structure

```figma
┌─────────────────────────────┐
│        WatchLess            │
│                             │
│    [Current Session Time]   │
│                             │
│    [START/STOP BUTTON]      │
│                             │
│    [Today's Total: X hrs]   │
│                             │
│    [Weekly Total: X hrs]    │
│                             │
│    [AI Insights Button]     │
│                             │
│    [Export to Sheets]       │
│                             │
│    [Settings/Profile]       │
└─────────────────────────────┘
```

---

## 3. Technical Architecture

### 3.1 Technology Stack

#### Frontend

- **Framework**: React 18 with TypeScript
- **State Management**: React Context API + useReducer
- **Styling**: Tailwind CSS for utility-first styling
- **PWA Features**: Service Worker for offline functionality
- **Build Tool**: Vite for fast development and building

#### Backend

- **Runtime**: Node.js with Express.js
- **Database**: Cloud Firestore for real-time data
- **Authentication**: Google Cloud Identity Platform
- **API Integration**:
  - Google Sheets API v4
  - Google Gemini API
- **Background Jobs**: Cloud Tasks for scheduled operations

#### Cloud Infrastructure (Google Cloud Platform)

- **Hosting**: Cloud Run for containerized deployment
- **Database**: Cloud Firestore (NoSQL document database)
- **Authentication**: Identity Platform (Google OAuth)
- **Storage**: Cloud Storage for static assets
- **Functions**: Cloud Functions for background processing
- **Monitoring**: Cloud Logging and Cloud Monitoring
- **CDN**: Cloud CDN for global content delivery

### 3.2 System Architecture

```figma
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React PWA     │    │   Cloud Run     │    │  Cloud Firestore│
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│                 │    │                 │    │                 │
│ - Timer Logic   │    │ - REST APIs     │    │ - User Data     │
│ - Push Notifs   │    │ - Auth Handling │    │ - Session Data  │
│ - Offline Mode  │    │ - Data Sync     │    │ - Settings      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         │              │ Cloud Functions │              │
         │              │                 │              │
         │              │ - Sheet Export  │              │
         │              │ - AI Analysis   │              │
         │              │ - Notifications │              │
         │              └─────────────────┘              │
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│ External APIs   │◄─────────────┘
                        │                 │
                        │ - Google Sheets │
                        │ - Gemini AI     │
                        │ - Push Service  │
                        └─────────────────┘
```

### 3.3 Data Models

#### User Model

```typescript
interface User {
  id: string;
  email: string;
  displayName: string;
  googleSheetsId?: string; // Optional linked sheet
  createdAt: Date;
  preferences: {
    dailyGoal: number; // minutes
    notifications: boolean;
    autoExport: boolean;
  };
}
```

#### Viewing Session Model

```typescript
interface ViewingSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // minutes
  showName?: string;
  isActive: boolean;
  createdAt: Date;
}
```

#### Analytics Model

```typescript
interface ViewingAnalytics {
  userId: string;
  date: string; // YYYY-MM-DD
  dailyTotal: number; // minutes
  weeklyTotal: number; // minutes
  monthlyTotal: number; // minutes
  sessionsCount: number;
  averageSessionLength: number;
  mostWatchedShows: Array<{
    name: string;
    totalTime: number;
  }>;
}
```

---

## 4. API Design

### 4.1 REST Endpoints

#### Authentication

- `POST /api/auth/login` - Google OAuth login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

#### Timer Operations

- `POST /api/sessions/start` - Start viewing session
- `PUT /api/sessions/:id/stop` - Stop viewing session
- `GET /api/sessions/active` - Get active session
- `PUT /api/sessions/:id/update` - Update session (add show name)

#### Data Retrieval

- `GET /api/analytics/daily/:date` - Get daily viewing stats
- `GET /api/analytics/weekly/:week` - Get weekly viewing stats
- `GET /api/analytics/monthly/:month` - Get monthly viewing stats

#### Export & AI

- `POST /api/export/sheets` - Export data to Google Sheets
- `GET /api/ai/insights` - Get AI-powered viewing insights
- `POST /api/ai/suggestions` - Get personalized suggestions

### 4.2 Real-time Features

- WebSocket connection for timer synchronization across devices
- Real-time notifications for viewing milestones

---

## 5. Security & Privacy

### 5.1 Authentication & Authorization

- Google OAuth 2.0 for user authentication
- JWT tokens for session management
- Role-based access control (single user role)
- Automatic token refresh

### 5.2 Data Protection

- All API communications over HTTPS
- Data encryption at rest (Firestore default)
- User data isolation per Google Cloud best practices
- GDPR compliance for EU users

### 5.3 Privacy Considerations

- Minimal data collection (only viewing time and show names)
- User consent for notifications and data export
- Option to delete all data
- Transparent privacy policy

---

## 6. Performance & Scalability

### 6.1 Frontend Optimization

- Code splitting by route
- Lazy loading of AI insights components
- Service Worker caching for offline use
- Optimized bundle size with tree shaking

### 6.2 Backend Performance

- Cloud Run auto-scaling based on traffic
- Firestore indexing for fast queries
- Cloud CDN for static asset delivery
- Connection pooling for database connections

### 6.3 Monitoring & Observability

- Cloud Monitoring for application metrics
- Cloud Logging for error tracking
- Performance monitoring with Core Web Vitals
- User analytics with privacy-focused approach

---

## 7. Deployment Strategy

### 7.1 CI/CD Pipeline

```yaml
# GitHub Actions workflow
Build → Test → Deploy to Staging → Manual Approval → Deploy to Production
```

### 7.2 Environment Configuration

- **Development**: Local development with Firebase emulator
- **Staging**: Cloud Run staging environment
- **Production**: Cloud Run production with custom domain

### 7.3 Infrastructure as Code

- Terraform scripts for GCP resource provisioning
- Docker containerization for consistent deployments
- Environment-specific configuration management

---

## 8. Development Phases

### Phase 1: MVP (Weeks 1-2)

- Basic timer functionality (start/stop)
- Simple UI with one button
- Local data storage
- Basic Google authentication

### Phase 2: Core Features (Weeks 3-4)

- Cloud Firestore integration
- Google Sheets export functionality
- Push notifications
- Show name entry modal

### Phase 3: AI Integration (Weeks 5-6)

- Gemini AI integration for insights
- Basic analytics dashboard
- Viewing habit analysis
- Simple suggestions

### Phase 4: Polish & Launch (Weeks 7-8)

- PWA features and offline mode
- Performance optimization
- User testing and bug fixes
- Production deployment

---

## 9. File Structure

```figma
watchless/
├── frontend/
│   ├── public/
│   │   ├── manifest.json
│   │   └── sw.js
│   ├── src/
│   │   ├── components/
│   │   │   ├── Timer/
│   │   │   ├── Auth/
│   │   │   ├── Analytics/
│   │   │   └── Layout/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── types/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── server.ts
│   ├── Dockerfile
│   └── package.json
├── infrastructure/
│   ├── terraform/
│   └── docker-compose.yml
└── docs/
    └── api-docs.md
```

---

## 10. Getting Started with Claude Code

### Prerequisites

- Node.js 18+
- Google Cloud Account
- Firebase CLI
- Docker (optional)

### Initial Setup Commands

```bash
# Create project structure
mkdir watchless && cd watchless
mkdir frontend backend infrastructure docs

# Initialize frontend
cd frontend && npx create-react-app . --template typescript
npm install @tailwindcss/cli tailwindcss

# Initialize backend
cd ../backend && npm init -y
npm install express cors helmet dotenv
npm install -D @types/node @types/express nodemon

# Setup GCP
gcloud init
gcloud config set project watchless-app
```

### Environment Variables

```env
# Backend .env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key
FIRESTORE_PROJECT_ID=watchless-app
NODE_ENV=development

# Frontend .env
VITE_API_URL=http://localhost:3001
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_FIREBASE_CONFIG=your_firebase_config
```

This documentation provides a comprehensive foundation for building WatchLess. Each section can be expanded as you develop the application with Claude Code.
