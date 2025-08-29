import type { TimerState, User } from '../types';
import { STORAGE_KEYS } from '../types';

class LocalStorageService {
  // Timer State Management
  getTimerState(): TimerState | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TIMER_STATE);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        if (parsed.startTime) {
          parsed.startTime = new Date(parsed.startTime);
        }
        if (parsed.currentSession?.startTime) {
          parsed.currentSession.startTime = new Date(parsed.currentSession.startTime);
        }
        if (parsed.currentSession?.endTime) {
          parsed.currentSession.endTime = new Date(parsed.currentSession.endTime);
        }
        return parsed;
      }
      return null;
    } catch (error) {
      console.error('Error reading timer state from localStorage:', error);
      return null;
    }
  }

  setTimerState(state: TimerState): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TIMER_STATE, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving timer state to localStorage:', error);
    }
  }

  clearTimerState(): void {
    localStorage.removeItem(STORAGE_KEYS.TIMER_STATE);
  }

  // User Data Management
  getUser(): User | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.createdAt = new Date(parsed.createdAt);
        return parsed;
      }
      return null;
    } catch (error) {
      console.error('Error reading user data from localStorage:', error);
      return null;
    }
  }

  setUser(user: User): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user data to localStorage:', error);
    }
  }

  clearUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  // Auth Token Management
  getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  clearAuthToken(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  // Settings Management
  getSettings(): any {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error reading settings from localStorage:', error);
      return {};
    }
  }

  setSettings(settings: any): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
    }
  }

  // Utility Methods
  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Check if localStorage is available
  isAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }
}

export const localStorageService = new LocalStorageService();