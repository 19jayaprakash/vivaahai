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
        const response = await axiosPublic.get('/drive/drives/selectedUsers', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if(response.status === 200){
          setDrive([...response.data.allDrives,...response.data.matchingDrives] || []);
        }
      } catch (error) {
        console.error('Error fetching drives:', error);
      }
    }
    fetchDrives();
  }, []);
 
  const CARD_WIDTH = screenWidth < 768 ? screenWidth * 0.85 : screenWidth < 1024 ? screenWidth * 0.45 : 420;
  const CARD_MARGIN = screenWidth < 768 ? 15 : 25;
 
  const handleScroll = (event) => {
    const scrollPosition = event.target.scrollLeft;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_MARGIN));
    setActiveIndex(index);
  };
 
  const scrollToIndex = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        left: index * (CARD_WIDTH + CARD_MARGIN),
        behavior: 'smooth',
      });
    }
    setActiveIndex(index);
  };
 
  const getDriveTypeTheme = (type) => {
    switch (type) {
      case 'Free':
        return {
          accentColor: 'text-emerald-600',
          ribbonBg: 'bg-emerald-500',
          buttonGradient: 'from-emerald-500 to-teal-600',
          icon: '🎉',
          label: 'COMPLIMENTARY'
        };
      case 'Paid':
        return {
          accentColor: 'text-amber-600',
          ribbonBg: 'bg-amber-500',
          buttonGradient: 'from-amber-500 to-orange-600',
          icon: '💎',
          label: 'PREMIUM EVENT'
        };
      case 'Invitation':
        return {
          accentColor: 'text-purple-600',
          ribbonBg: 'bg-purple-500',
          buttonGradient: 'from-purple-500 to-pink-600',
          icon: '✨',
          label: 'BY INVITATION ONLY'
        };
      default:
        return {
          accentColor: 'text-gray-600',
          ribbonBg: 'bg-gray-500',
          buttonGradient: 'from-gray-500 to-gray-600',
          icon: '📅',
          label: 'SPECIAL EVENT'
        };
    }
  };
 
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-IN', { month: 'long' }),
      year: date.getFullYear(),
      weekday: date.toLocaleDateString('en-IN', { weekday: 'long' }),
      ordinal: getOrdinal(date.getDate()),
      fullDate: date.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    };
  };
 
  const getOrdinal = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
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
    localStorage.setItem("driveData", JSON.stringify(driveData));
    router.push('/RegisterDrive');
  };
 
  // if (screenWidth === 0 || drives.length === 0) {
  //   return (
  //     <div className="flex items-center justify-center h-64 bg-gradient-to-br from-slate-50 to-blue-50">
  //       <div className="text-center p-8 bg-white rounded-3xl shadow-xl border-4 border-dashed border-gray-300">
  //         <div className="text-6xl mb-4">📮</div>
  //         <div className="text-2xl font-bold text-gray-700 mb-2">No Invitations Available</div>
  //         <div className="text-gray-500">Your mailbox is empty. Check back soon!</div>
  //       </div>
  //     </div>
  //   );
  // }
 
  return (
    <div className="py-8  min-h-screen">
      {/* Header */}
      <div className='flex justify-between items-center px-6 mb-8'>
        <div>
          <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Upcoming Drives
          </h2>
          <p className="text-gray-600 text-md font-light italic">Curated experiences await your presence</p>
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
        className="flex overflow-x-auto scrollbar-hide pb-6"
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          paddingLeft: `${CARD_MARGIN}px`,
          paddingRight: `${CARD_MARGIN}px`,
        }}
        onScroll={handleScroll}
      >
        {drives.length > 0 ?
        (
        drives.map((drive, index) => {
          const theme = getDriveTypeTheme(drive.driveType);
          const dateInfo = formatDate(drive.driveDate);
         
          return (
            <div
              key={drive.driveId}
              className="flex-shrink-0"
              style={{
                width: `${CARD_WIDTH}px`,
                marginRight: `${CARD_MARGIN}px`,
                scrollSnapAlign: 'start',
              }}
            >
              {/* Floral Template Invitation Card */}
              <div className="relative w-full h-[540px] md:h-[620px] mx-auto mt-6 cursor-pointer group">
               
                {/* Floral Background Template */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-2xl shadow-2xl overflow-hidden">
                 
                  {/* Floral Corner Decorations - Top */}
                  <div className="absolute top-0 right-0 w-48 h-48 opacity-30">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <g fill="url(#floral-gradient)">
                        <path d="M150,50 Q170,30 190,50 Q170,70 150,50 Q130,30 150,50" />
                        <path d="M160,40 Q180,20 200,40 Q180,60 160,40" />
                        <circle cx="165" cy="45" r="3" fill="#c084fc" />
                        <circle cx="155" cy="55" r="2" fill="#a855f7" />
                        <path d="M140,60 Q150,50 160,60 L150,70 Z" fill="#86efac" />
                        <path d="M170,65 Q180,55 190,65 L180,75 Z" fill="#86efac" />
                        <path d="M145,35 Q155,25 165,35 L155,45 Z" fill="#86efac" />
                      </g>
                      <defs>
                        <linearGradient id="floral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#d8b4fe'}} />
                          <stop offset="50%" style={{stopColor: '#c084fc'}} />
                          <stop offset="100%" style={{stopColor: '#a855f7'}} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                 
                  {/* Floral Corner Decorations - Bottom Left */}
                  <div className="absolute bottom-0 left-0 w-32 h-32 opacity-30 transform rotate-180">
                    <svg viewBox="0 0 150 150" className="w-full h-full">
                      <g fill="url(#floral-gradient-2)">
                        <path d="M50,50 Q70,30 90,50 Q70,70 50,50 Q30,30 50,50" />
                        <circle cx="55" cy="45" r="2" fill="#34d399" />
                        <circle cx="65" cy="55" r="3" fill="#10b981" />
                        <path d="M40,60 Q50,50 60,60 L50,70 Z" fill="#86efac" />
                        <path d="M70,35 Q80,25 90,35 L80,45 Z" fill="#86efac" />
                      </g>
                      <defs>
                        <linearGradient id="floral-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#a7f3d0'}} />
                          <stop offset="50%" style={{stopColor: '#6ee7b7'}} />
                          <stop offset="100%" style={{stopColor: '#34d399'}} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                 
                  {/* Delicate Border Frame */}
                  <div className="absolute inset-4 border-2 border-purple-200 rounded-xl opacity-40"></div>
                  <div className="absolute inset-6 border border-purple-100 rounded-lg opacity-60"></div>
                </div>
               
                {/* Ribbon/Label */}
                <div className={`absolute -top-3 -right-3 ${theme.ribbonBg} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12 border-2 border-white z-10`}>
                  {theme.icon} {theme.label}
                </div>
               
                {/* Card Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 py-12">
                 
                  {/* Elegant Header */}
                  <div className="text-center mb-6">
                    <div className="text-xs font-serif tracking-widest text-gray-500 uppercase mb-3 font-medium">You Are Cordially Invited</div>
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mx-auto mb-4"></div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 leading-tight mb-4">
                      {drive.driveName}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="w-6 h-px bg-purple-300"></div>
                      <div className="w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
                      <div className="w-6 h-px bg-purple-300"></div>
                    </div>
                  </div>
 
                  {/* Description */}
                  <div className="text-center mb-6">
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium italic max-w-xs">
                      &quot;{drive.driveDescription?.charAt(0).toUpperCase() + drive.driveDescription?.slice(1) || ''}&quot;
                    </p>
                  </div>
 
                  {/* Event Details */}
                  <div className="flex-grow space-y-4 text-center">
                   
                    {/* Date */}
                    <div>
                      <div className="text-xs font-serif tracking-wider text-gray-500 uppercase mb-1 font-medium">Date</div>
                      <div className="text-lg font-serif font-bold text-gray-800">
                        {dateInfo.fullDate}
                      </div>
                      <div className="text-sm font-serif text-gray-600">
                        at {formatTime(drive.driveDate)}
                      </div>
                    </div>
 
                    {/* Venue */}
                    <div>
                      <div className="text-xs font-serif tracking-wider text-gray-500 uppercase mb-1 font-medium">Venue</div>
                      <div className="text-sm font-serif text-gray-700 font-medium">
                        📍 {drive.location}
                      </div>
                    </div>
 
                    {/* Fee for Paid Events */}
                    {drive.driveType === 'Paid' && (
                      <div>
                        <div className="text-xs font-serif tracking-wider text-emerald-600 uppercase mb-1 font-medium">Registration Fee</div>
                        <div className="text-xl font-serif font-bold text-emerald-700">
                          ₹{drive.registrationFee?.toLocaleString()}
                        </div>
                        <div className="text-xs font-serif text-emerald-600">per person</div>
                      </div>
                    )}
                  </div>
 
                  {/* RSVP Button */}
                  <div className="text-center mt-6">
                    <div className="text-xs font-serif tracking-wider text-gray-500 uppercase mb-3 font-medium">Kindly Respond</div>
                    <button
                      className={`bg-gradient-to-r ${theme.buttonGradient} text-white cursor-pointer font-serif font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToRegisterPage(drive);
                      }}
                    >
                      <span className="text-sm">
                        {drive.driveType === 'Invitation' ? '🎫 Request Attendance' : '✍️ Confirm Attendance'}
                      </span>
                    </button>
                    <div className="text-xs font-serif text-gray-500 mt-2 italic">
                      {drive.driveType === 'Invitation' ? 'Subject to approval' : 'Your presence is requested'}
                    </div>
                  </div>
                </div>
               
                {/* Signature */}
                <div className="absolute bottom-4 right-6 text-xs font-serif text-gray-400 opacity-70 italic">
                  With warm regards
                </div>
              </div>
            </div>
          );
        })
      )

        : 
        <div className="flex items-center justify-center h-64 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border-4 border-dashed border-gray-300">
          <div className="text-6xl mb-4">📮</div>
          <div className="text-2xl font-bold text-gray-700 mb-2">No Invitations Available</div>
          <div className="text-gray-500">Your mailbox is empty. Check back soon!</div>
        </div>
      </div>
      }
      </div>
 
      {/* Elegant Pagination */}
      <div className="flex justify-center items-center mt-8 px-6">
        <div className="flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-xl border border-purple-200">
          {drives.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className="focus:outline-none transition-all duration-300"
            >
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 w-6 shadow-md'
                    : 'bg-gray-300 w-2.5 hover:bg-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
 
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </div>
  );
};
 
export default HorizontalDrivesCarousel;
 
 
// 'use client';
// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { axiosPublic } from '../../base/constant';
 
// const DriveTemplateCard = ({ drive }) => {
//   const router = useRouter();
//   const { driveName, driveDate, location, driveDescription, driveType } = drive;
 
//   const formattedDate = new Date(driveDate).toLocaleDateString('en-IN', {
//     weekday: 'long',
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   });
 
//   const handleRSVP = () => {
//     localStorage.setItem("driveData", JSON.stringify(drive));
//     router.push('/RegisterDrive');
//   };
 
//   return (
//     <div className="flex-shrink-0 w-[380px] h-[540px] md:w-[420px] md:h-[620px] relative">
//       {/* Background Image */}
//       <div className="relative w-full h-full">
//         <Image
//           src="/vivaahai/drivetemplate1.png"
//           alt="Invitation Template"
//           layout="fill"
//           objectFit="cover"
//           className="rounded-xl"
//           priority
//         />
       
//         {/* Text positioned in template's empty space */}
//         <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
//           {/* Main title - positioned in the large white space */}
//           <div className="mb-8">
//             <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 leading-tight max-w-[300px]">
//               {driveName}
//             </h2>
//           </div>
         
//           {/* Date and location - in the middle white area */}
//           <div className="space-y-3 mb-6">
//             <p className="text-lg italic text-gray-700 font-medium">
//               {formattedDate}
//             </p>
//             <p className="text-base text-gray-600 flex items-center justify-center gap-2">
//               <span className="text-lg">📍</span> {location}
//             </p>
//           </div>
         
//           {/* Description - expanded in the available white space */}
//           <div className="mb-6 max-w-[280px]">
//             <p className="text-sm text-gray-600 leading-relaxed mb-4">
//               "{driveDescription}"
//             </p>
           
//             {/* Additional details to fill space */}
//             <div className="space-y-2 text-xs text-gray-500">
//               <p>Join us for an amazing experience</p>
//               <p>Don't miss this opportunity</p>
//               <p>Limited seats available</p>
//             </div>
//           </div>
         
//           {/* Price if applicable */}
//           {driveType === 'Paid' && (
//             <div className="mb-4">
//               <p className="text-lg text-amber-600 font-bold">
//                 ₹{drive.registrationFee?.toLocaleString()} per person
//               </p>
//               <p className="text-xs text-gray-500">Registration fee includes refreshments</p>
//             </div>
//           )}
         
//           {/* Call to action button */}
//           <button
//             onClick={handleRSVP}
//             className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
//           >
//             {driveType === 'Invitation' ? '🎫 Request Attendance' : '✍️ Confirm Attendance'}
//           </button>
         
//           {/* Additional footer text */}
//           <div className="mt-4 text-xs text-gray-500">
//             <p>RSVP required • Dress code: Casual</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// const ViewDrives = () => {
//   const [drives, setDrives] = useState([]);
 
//   useEffect(() => {
//     async function fetchDrives() {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axiosPublic.get('/drive/drives', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setDrives(response.data || []);
//       } catch (error) {
//         console.error('Failed to fetch drives:', error);
//       }
//     }
//     fetchDrives();
//   }, []);
 
//   if (drives.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-64 bg-gradient-to-br from-slate-50 to-blue-50">
//         <div className="text-center p-8 bg-white rounded-3xl shadow-xl border-4 border-dashed border-gray-300">
//           <div className="text-6xl mb-4">📮</div>
//           <div className="text-2xl font-bold text-gray-700 mb-2">No Invitations Available</div>
//           <div className="text-gray-500">Your mailbox is empty. Check back soon!</div>
//         </div>
//       </div>
//     );
//   }
 
//   return (
//     <div className="py-10 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 min-h-screen">
//       <h1 className="text-4xl font-serif text-center font-bold text-gray-800 mb-10 px-4">
//         Your Invitations
//       </h1>
     
//       {/* Horizontal scroll container */}
//       <div className="px-4">
//         <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
//           {/* Custom scrollbar styling */}
//           <style jsx>{`
//             .scrollbar-hide::-webkit-scrollbar {
//               height: 8px;
//             }
//             .scrollbar-hide::-webkit-scrollbar-track {
//               background: #f1f5f9;
//               border-radius: 4px;
//             }
//             .scrollbar-hide::-webkit-scrollbar-thumb {
//               background: #cbd5e1;
//               border-radius: 4px;
//             }
//             .scrollbar-hide::-webkit-scrollbar-thumb:hover {
//               background: #94a3b8;
//             }
//           `}</style>
         
//           {drives.map((drive, index) => (
//             <DriveTemplateCard key={drive.id || index} drive={drive} />
//           ))}
//         </div>
//       </div>
     
//       {/* Scroll indicator */}
//       {drives.length > 1 && (
//         <div className="text-center mt-4">
//           <p className="text-sm text-gray-500">← Scroll to view more invitations →</p>
//         </div>
//       )}
//     </div>
//   );
// };
 
// export default ViewDrives;
 