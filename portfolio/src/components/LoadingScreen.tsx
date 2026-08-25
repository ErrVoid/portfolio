import React from 'react';
import { config } from '../data/config';

interface LoadingScreenProps {
  progress: number;
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, onComplete }) => {
  React.useEffect(() => {
    if (progress >= 100 && onComplete) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-text">
          {progress < 100 ? (
            <>
              LOADING EXPERIENCE
              <br />
              <span style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>
                {String(progress).padStart(2, '0')}%
              </span>
            </>
          ) : (
            <span style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>
              {config.personal.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
