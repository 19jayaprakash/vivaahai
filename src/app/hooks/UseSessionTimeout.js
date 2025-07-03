// hooks/useSessionTimeout.js
import { useEffect, useRef, useState } from 'react';
 
const POPUP_TIMEOUT = 30 * 60 * 1000; // 1 minute for testing
 
export default function useSessionTimeout(onConfirm) {
  const [showPopup, setShowPopup] = useState(false);
  const timeoutRef = useRef();
 
  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowPopup(true);
    }, POPUP_TIMEOUT);
  };
 
  useEffect(() => {
    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    const handleActivity = () => resetTimeout();
 
    events.forEach(event =>
      window.addEventListener(event, handleActivity)
    );
 
    resetTimeout();
 
    return () => {
      events.forEach(event =>
        window.removeEventListener(event, handleActivity)
      );
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
 
  const confirmLogout = () => {
    setShowPopup(false);
    onConfirm();
  };
 
  return { showPopup, confirmLogout, resetTimeout }; // 👈 include resetTimeout
}
 
 