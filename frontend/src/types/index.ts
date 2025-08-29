// User Model
export interface User {
  id: string;
  email: string;
  displayName: string;
  googleSheetsId?: string;
  createdAt: Date;
  preferences: {
    dailyGoal: number; // minutes
    notifications: boolean;
    autoExport: boolean;
  };
}

// Viewing Session Model
export interface ViewingSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // minutes
  showName?: string;
  isActive: boolean;
  createdAt: Date;
}

// Analytics Model
export interface ViewingAnalytics {
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

// Timer State for local storage
export interface TimerState {
  isRunning: boolean;
  startTime?: Date;
  currentSession?: ViewingSession;
  totalDuration: number; // milliseconds
}

// Auth State
export interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  token?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Local Storage Keys
export const STORAGE_KEYS = {
  TIMER_STATE: 'watchless_timer_state',
  USER_DATA: 'watchless_user_data',
  AUTH_TOKEN: 'watchless_auth_token',
  SETTINGS: 'watchless_settings',
} as const;