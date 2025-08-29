import { useState, useEffect, useRef, useCallback } from 'react';
import type { TimerState, ViewingSession } from '../types';
import { localStorageService } from '../services/localStorage';

export const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState(0); // in milliseconds
  const [currentSession, setCurrentSession] = useState<ViewingSession | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load timer state from localStorage on mount
  useEffect(() => {
    const savedState = localStorageService.getTimerState();
    if (savedState) {
      setIsRunning(savedState.isRunning);
      if (savedState.startTime) {
        setStartTime(savedState.startTime);
        // Calculate current duration if timer is running
        if (savedState.isRunning) {
          const now = new Date();
          const elapsed = now.getTime() - savedState.startTime.getTime();
          setDuration(elapsed);
        } else {
          setDuration(savedState.totalDuration);
        }
      }
      if (savedState.currentSession) {
        setCurrentSession(savedState.currentSession);
      }
    }
  }, []);

  // Update duration every second when running
  useEffect(() => {
    if (isRunning && startTime) {
      intervalRef.current = setInterval(() => {
        const now = new Date();
        const elapsed = now.getTime() - startTime.getTime();
        setDuration(elapsed);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, startTime]);

  // Save timer state whenever it changes
  useEffect(() => {
    const state: TimerState = {
      isRunning,
      startTime: startTime || undefined,
      currentSession: currentSession || undefined,
      totalDuration: duration,
    };
    localStorageService.setTimerState(state);
  }, [isRunning, startTime, currentSession, duration]);

  const startTimer = useCallback(() => {
    const now = new Date();
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newSession: ViewingSession = {
      id: sessionId,
      userId: 'local_user', // For Phase 1, we'll use a placeholder
      startTime: now,
      duration: 0,
      isActive: true,
      createdAt: now,
    };

    setIsRunning(true);
    setStartTime(now);
    setCurrentSession(newSession);
    setDuration(0);
  }, []);

  const stopTimer = useCallback(() => {
    if (!startTime || !currentSession) return null;

    const now = new Date();
    const finalDuration = now.getTime() - startTime.getTime();
    
    const finalSession: ViewingSession = {
      ...currentSession,
      endTime: now,
      duration: Math.floor(finalDuration / 60000), // Convert to minutes
      isActive: false,
    };

    setIsRunning(false);
    setStartTime(null);
    setCurrentSession(null);

    // Clear timer state from localStorage
    localStorageService.clearTimerState();

    return finalSession;
  }, [startTime, currentSession]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setStartTime(null);
    setDuration(0);
    setCurrentSession(null);
    localStorageService.clearTimerState();
  }, []);

  // Format duration for display
  const formatDuration = useCallback((ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    isRunning,
    duration,
    formattedDuration: formatDuration(duration),
    currentSession,
    startTimer,
    stopTimer,
    resetTimer,
  };
};