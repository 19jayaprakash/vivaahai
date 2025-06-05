import { Sparkles } from 'lucide-react';
import React from 'react';

const ToastComponent = ({message}) => {
  return (
    <>
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-black px-6 py-4 rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="font-medium">{message}</span>
            </div>
          </div>
        </div>

        <style jsx>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #FF6B6B;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #FF8E8E;
        }

        /* Remove default date input styling */
        input[type="date"]::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }
      `}</style>
      </>
  )
}

export default ToastComponent