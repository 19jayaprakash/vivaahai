'use client';
import { useEffect, useRef, useState } from 'react';

const BackgroundMusic = ({ src, volume = 0.5 }) => {
  const audioRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';

    const startMusic = () => {
      if (!hasStarted && audio) {
        audio.play().catch(err => {
          console.log('Audio play failed:', err);
        });
        setHasStarted(true);
        
        // Remove event listeners after first play
        document.removeEventListener('click', startMusic);
        document.removeEventListener('keydown', startMusic);
        document.removeEventListener('touchstart', startMusic);
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', startMusic);
    document.addEventListener('keydown', startMusic);
    document.addEventListener('touchstart', startMusic);

    // Cleanup
    return () => {
      document.removeEventListener('click', startMusic);
      document.removeEventListener('keydown', startMusic);
      document.removeEventListener('touchstart', startMusic);
    };
  }, [hasStarted, volume]);

  return (
    <audio
      ref={audioRef}
      style={{ display: 'none' }}
      preload="auto"
    >
      <source src={src} type="audio/mpeg" />
      <source src={src.replace('.mp3', '.ogg')} type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default BackgroundMusic;