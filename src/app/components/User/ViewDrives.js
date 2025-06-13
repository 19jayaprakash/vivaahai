'use client'
 
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { axiosPublic } from '../../base/constant'; // adjust path if needed
 
const HorizontalDrivesCarousel = () => {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [drives, setDrive] = useState([]);
 
  useEffect(() => {
    const updateScreenWidth = () => {
      if (typeof window !== 'undefined') {
        setScreenWidth(window.innerWidth);
      }
    };
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);
 
  useEffect(() => {
    async function fetchDrives() {
      try {
        const response = await axiosPublic.get('/drive/drives', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDrive(response.data || []);
      } catch (error) {
        console.error('Error fetching drives:', error);
      }
    }
    fetchDrives();
  }, []);
 
  const CARD_WIDTH = screenWidth < 1000 ?screenWidth * 0.8 : screenWidth * 0.3;
  const CARD_MARGIN = 10;
 
  const handleScroll = (event) => {
    const scrollPosition = event.target.scrollLeft;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_MARGIN * 2));
    setActiveIndex(index);
  };
 
  const scrollToIndex = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        left: index * (CARD_WIDTH + CARD_MARGIN * 2),
        behavior: 'smooth',
      });
    }
    setActiveIndex(index);
  };
 
  const getDriveTypeColor = (type) => {
    switch (type) {
      case 'Free': return '#4CAF50';
      case 'Paid': return '#FF9800';
      case 'Invitation': return '#9C27B0';
      default: return '#757575';
    }
  };
 
  const getDriveTypeIcon = (type) => {
    switch (type) {
      case 'free': return '🆓';
      case 'paid': return '💰';
      case 'invitation': return '💌';
      default: return '📅';
    }
  };
 
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };
 
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };


 
 
  const navigateToRegisterPage = (driveData) => {
    if (!driveData?.driveId) return;
    localStorage.setItem("driveData",JSON.stringify(driveData));
    router.push('/RegisterDrive');
  };
 
  if (screenWidth === 0 || drives.length === 0) return <div className='text-black text-2xl font-bold'>No Drives At this Moment</div>;
 
  return (
    <div className="py-6">
      <div className='flex justify-between items-center px-6 mb-4'>
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Upcoming Drives</h2>
    <p className="text-gray-600">Discover and join amazing community drives</p>
  </div>
  <button
    className="bg-pink-500 text-white font-semibold px-5 py-2 rounded-xl cursor-pointer shadow-md hover:bg-pink-600 hover:scale-105 transition-transform duration-300 ease-in-out"
    onClick={() => router.push('/UserDrive')}
    >
    My Drives
  </button>
</div>
 
 
      <div
        ref={scrollViewRef}
        className="flex overflow-x-auto scrollbar-hide pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          gap: `${CARD_MARGIN * 2}px`,
          paddingLeft: `${CARD_MARGIN}px`,
          paddingRight: `${CARD_MARGIN}px`,
        }}
        onScroll={handleScroll}
      >
        {drives.map((drive, index) => (
          <div
            key={drive.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
            style={{
              width: `${CARD_WIDTH}px`,
              marginTop: '10px',
              marginBottom: '10px',
              scrollSnapAlign: 'start',
            }}
            
          >
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">{drive.driveName}</h3>
                 
                </div>
                <div
                  className="px-3 py-1 rounded-full flex items-center ml-2"
                  style={{ backgroundColor: getDriveTypeColor(drive.driveType) + '20' }}
                >
                  <span className="text-xs mr-1">{getDriveTypeIcon(drive.driveType)}</span>
                  <span
                    className="text-xs font-semibold capitalize"
                    style={{ color: getDriveTypeColor(drive.driveType) }}
                  >
                    {drive.driveType}
                  </span>
                </div>
              </div>
 
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {drive.driveDescription}
              </p>
 
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">📅</span>
                <div>
                  <p className="font-semibold text-gray-800"> {formatDate(drive.driveDate)}</p>
                  <p className="text-sm text-gray-500"> {formatTime(drive.driveDate)}</p>
                </div>
              </div>
 
              <div className="flex items-center mb-4">
                <span className="text-lg mr-3">📍</span>
                <p className="text-sm text-gray-600 flex-1 line-clamp-2">{drive.location}</p>
              </div>
 
              {drive.driveType === 'Paid' && (
                <div className="flex items-center mb-4">
                  <span className="text-lg mr-3">💳</span>
                  <span className="font-semibold text-green-600">
                    ₹{drive.registrationFee?.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">registration fee</span>
                </div>
              )}
 
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 py-3 px-6 rounded-xl flex items-center justify-center transition-colors cursor-pointer duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToRegisterPage(drive);
                }}
              >
                <span className="text-white font-semibold mr-2">
                  {drive.driveType === 'invitation' ? 'Request Invitation' : 'Register Now'}
                </span>
                <span className="text-white">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
 
      <div className="flex justify-center items-center mt-6 px-6">
        {drives.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className="mx-1 focus:outline-none"
          >
            <div
              className={`h-2 rounded-full transition-all duration-200 ${
                index === activeIndex ? 'bg-blue-500 w-6' : 'bg-gray-300 w-2'
              }`}
            />
          </button>
        ))}
      </div>
 
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};
 
export default HorizontalDrivesCarousel;