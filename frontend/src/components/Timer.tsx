import React, { useState } from 'react';
import { useTimer } from '../hooks/useTimer';
import type { ViewingSession } from '../types';

interface ShowNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (showName: string) => void;
}

const ShowNameModal: React.FC<ShowNameModalProps> = ({ isOpen, onClose, onSave }) => {
  const [showName, setShowName] = useState('');

  const handleSave = () => {
    onSave(showName.trim());
    setShowName('');
    onClose();
  };

  const handleSkip = () => {
    onSave('');
    setShowName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What did you watch?
        </h3>
        <input
          type="text"
          value={showName}
          onChange={(e) => setShowName(e.target.value)}
          placeholder="Enter show name (optional)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 mb-4"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSave();
            } else if (e.key === 'Escape') {
              handleSkip();
            }
          }}
        />
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleSkip}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export const Timer: React.FC = () => {
  const { isRunning, formattedDuration, startTimer, stopTimer } = useTimer();
  const [showModal, setShowModal] = useState(false);
  const [completedSession, setCompletedSession] = useState<ViewingSession | null>(null);

  const handleToggleTimer = () => {
    if (isRunning) {
      const session = stopTimer();
      if (session) {
        setCompletedSession(session);
        setShowModal(true);
      }
    } else {
      startTimer();
    }
  };

  const handleSaveShowName = (showName: string) => {
    if (completedSession && showName) {
      // In Phase 1, we'll just log the session with show name
      // In later phases, this will be saved to the backend
      console.log('Session completed:', { ...completedSession, showName });
    }
    setCompletedSession(null);
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-8">
        {/* Current Session Time */}
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-600 mb-2">
            Current Session
          </h2>
          <div className="text-6xl font-mono font-light text-gray-900">
            {formattedDuration}
          </div>
        </div>

        {/* Main Timer Button */}
        <button
          onClick={handleToggleTimer}
          className={`
            w-64 h-16 rounded-full text-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2
            ${isRunning 
              ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-300' 
              : 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-300'
            }
          `}
        >
          {isRunning ? 'Stop Watching' : 'Start Watching'}
        </button>

        {/* Status Indicator */}
        {isRunning && (
          <div className="flex items-center space-x-2 text-green-600">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Timer running...</span>
          </div>
        )}
      </div>

      {/* Show Name Modal */}
      <ShowNameModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCompletedSession(null);
        }}
        onSave={handleSaveShowName}
      />
    </>
  );
};