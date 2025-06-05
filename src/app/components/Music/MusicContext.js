'use client';
import { createContext, useContext, useRef, useEffect, useState } from 'react';

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasStarted && audioRef.current) {
        audioRef.current.play().catch(console.error);
        setHasStarted(true);
        
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        document.removeEventListener('scroll', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      // Cleanup event listeners
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [hasStarted]);

  return (
    <MusicContext.Provider value={{ audioRef, hasStarted }}>
      {children}
      <audio
        ref={audioRef}
        loop
        autoPlay={false} // We'll start it manually after user interaction
        preload="auto"
        style={{ display: 'none' }} // Hide the audio element
      >
        <source src="/music/background.mp3" type="audio/mpeg" />
        <source src="/music/background.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
    </MusicContext.Provider>
  );
}

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};