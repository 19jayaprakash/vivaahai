"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useSessionTimeout from "./UseSessionTimeout";
 
export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
 
  const excludeRoutes = ["/"];
  const shouldExclude = excludeRoutes.includes(pathname);
 
  const [isFadingOut, setIsFadingOut] = useState(false);
 
  const { showPopup, confirmLogout: logoutNow, resetTimeout } = useSessionTimeout(() => {
    localStorage.clear();
    router.push("/");
  });
 
  useEffect(() => {
    if (!shouldExclude) {
      resetTimeout(); // Reset on route change to valid page
    }
  }, [pathname]);
 
  const confirmLogout = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      logoutNow();
    }, 400); // match fadeOut duration
  };
 
  return (
    <>
      {children}
 
      {!shouldExclude && showPopup && (
        <div
          className={`popup-overlay ${isFadingOut ? "fade-out" : "fade-in"}`}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            className="popup-content"
            style={{
              background: '#fff',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              width: '90%',
              maxWidth: '400px',
              textAlign: 'center',
              fontFamily: 'sans-serif',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#111827' }}>
              Session Timeout
            </h2>
            <p style={{ color: '#4B5563', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Your session has been inactive for a while. Please click below to logout.
            </p>
            <button
              onClick={confirmLogout}
              style={{
                backgroundColor: '#ef4444',
                color: '#fff',
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#dc2626')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#ef4444')}
            >
              Logout
            </button>
          </div>
 
          <style jsx>{`
            .fade-in {
              animation: fadeIn 0.4s forwards;
            }
            .fade-out {
              animation: fadeOut 0.4s forwards;
            }
 
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
 
            @keyframes fadeOut {
              from {
                opacity: 1;
                transform: scale(1);
              }
              to {
                opacity: 0;
                transform: scale(0.95);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
 
 