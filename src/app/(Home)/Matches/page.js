// "use client";
// import React, { useState } from 'react';
// import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Heart, SlidersHorizontal, X, Sparkles, Plane, Waves, Phone, MessageCircle } from 'lucide-react';
// import ScheduleMeet from '../../components/Profiles/ScheduleMeet';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// // Sample data for matches with working image URLs
// const dummyMatches = [
//   {
//     id: "1",
//     name: "Priya Sharma",
//     gender: "Female",
//     weight: "50kg",
//     age: 25,
//     height: "140cm",
//     state: "Tamil Nadu",
//     location: "Mumbai",
//     occupation: "Doctor",
//     caste: "Caste B",
//     educationlevel: "Master",
//     region: "South",
//     lifestyle: "Active",
//     photos: [
//       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face&auto=format",
//     ],
//   },
//   {
//     id: "2",
//     name: "Rahul Patel",
//     age: 32,
//     height: "160cm",
//     weight: "60kg",
//     state: "Maharashtra",
//     caste: "Caste A",
//     gender: "Male",
//     educationlevel: "Bachelor",
//     location: "Delhi",
//     lifestyle: "Sedentary",
//     region: "North",
//     occupation: "Teacher",
//     photos: [
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face&auto=format",
//     ],
//   },
//   {
//     id: "3",
//     name: "Ananya Gupta",
//     height: "150cm",
//     weight: "58kg",
//     caste: "Caste C",
//     educationlevel: "PhD",
//     occupation: "Engineer",
//     state: "Maharashtra",
//     region: "North",
//     age: 27,
//     gender: "Female",
//     lifestyle: "Moderate",
//     location: "Bangalore",
//     photos: [
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face&auto=format",
//     ],
//   },
//   {
//     id: "4",
//     name: "Vikram Singh",
//     state: "Kerala",
//     educationlevel: "High School",
//     occupation: "Artist",
//     region: "South",
//     caste: "Caste A",
//     height: "155cm",
//     weight: "68kg",
//     age: 36,
//     gender: "Male",
//     lifestyle: "Active",
//     location: "Kochi",
//     photos: [
//       "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=600&fit=crop&crop=face&auto=format",
//     ],
//   },
//   {
//     id: "5",
//     name: "Neha Kapoor",
//     age: 26,
//     caste: "Caste C",
//     educationlevel: "PhD",
//     region: "South",
//     occupation: "Doctor",
//     height: "165cm",
//     weight: "45kg",
//     state: "Tamil Nadu",
//     gender: "Female",
//     lifestyle: "Active",
//     location: "Chennai",
//     photos: [
//       "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=400&h=600&fit=crop&crop=face&auto=format",
//     ],
//   },
//   {
//     id: "6",
//     name: "Arjun Reddy",
//     age: 29,
//     height: "175cm",
//     weight: "75kg",
//     state: "Telangana",
//     caste: "Caste B",
//     gender: "Male",
//     educationlevel: "Master",
//     location: "Hyderabad",
//     lifestyle: "Active",
//     region: "South",
//     occupation: "Engineer",
//     photos: [
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&crop=face&auto=format",
//     ],
//   },
//   {
//     id: "7",
//     name: "Kavya Nair",
//     age: 24,
//     height: "158cm",  
//     weight: "52kg",
//     state: "Kerala",
//     caste: "Caste A",
//     gender: "Female",
//     educationlevel: "Master",
//     location: "Kochi",
//     lifestyle: "Moderate",
//     region: "South",
//     occupation: "Teacher",
//     photos: [
//       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face&auto=format",
//     ],
//   },
//   {
//     id: "8",
//     name: "Ravi Kumar",
//     age: 30,
//     height: "170cm",
//     weight: "72kg", 
//     state: "Maharashtra",
//     caste: "Caste B",
//     gender: "Male",
//     educationlevel: "Bachelor",
//     location: "Mumbai",
//     lifestyle: "Active",
//     region: "North", 
//     occupation: "Engineer",
//     photos: [
//       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face&auto=format",
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face&auto=format",
//     ],
//   }
// ];

// const ageRanges = ["18-25", "26-35", "36-45", "46+"];
// const heightRanges = ["140-150 cm", "151-160 cm", "161-170 cm", "171+ cm"]; 
// const weightRanges = ["40-50 kg", "51-60 kg", "61-70 kg", "71+ kg"];
// const educationLevels = ["High School", "Bachelor", "Master", "PhD"];
// const occupations = ["Engineer", "Doctor", "Artist", "Teacher"];
// const states = ["Tamil Nadu", "Kerala", "Maharashtra", "Telangana"];
// const cities = ["Chennai", "Mumbai", "Kochi", "Delhi", "Bangalore", "Hyderabad"];
// const regions = ["North", "South", "East", "West"];
// const castes = ["Caste A", "Caste B", "Caste C"];
// const lifestyles = ["Active", "Moderate", "Sedentary"];

// const AIMatchIcon = () => (
//   <div className="relative w-4 h-4 bg-yellow-100 rounded-lg flex items-center justify-center">
//     <Sparkles className="w-2.5 h-2.5 text-yellow-600" />
//   </div>
// );

// const SwimIcon = () => (
//   <div className="relative w-4 h-4 bg-blue-100 rounded-lg flex items-center justify-center">
//     <Waves className="w-2.5 h-2.5 text-blue-600" />
//   </div>
// );

// const TravelIcon = () => (
//   <div className="relative w-4 h-4 bg-purple-100 rounded-lg flex items-center justify-center">
//     <Plane className="w-2.5 h-2.5 text-purple-600" />
//   </div>
// );

// const PhotoCarousel = ({ photos }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [imageError, setImageError] = useState(false);

//   const handleNext = () => {
//     setActiveIndex((prevIndex) => (prevIndex + 1) % photos.length);
//   };

//   const handlePrev = () => {
//     setActiveIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
//   };

//   const handleImageError = () => {
//     setImageError(true);
//   };

//   return (
//     <div className="relative h-48 overflow-hidden rounded-t-2xl group">
//       {imageError ? (
//         <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//           <div className="text-gray-400">
//             <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-2">
//               <span className="text-2xl">👤</span>
//             </div>
//             <p className="text-sm">Photo unavailable</p>
//           </div>
//         </div>
//       ) : (
//         <Image
//           src={photos[activeIndex]} 
//           alt="Profile" 
//           width={400}
//           height={600}
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//           onError={handleImageError}
//           loading="lazy"
//         />
//       )}

//       {photos.length > 1 && !imageError && (
//         <>
//           <button
//             onClick={handlePrev}
//             className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
//           >
//             <ChevronLeft size={14} />
//           </button>

//           <button
//             onClick={handleNext}
//             className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
//           >
//             <ChevronRight size={14} />
//           </button>

//           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
//             {photos.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setActiveIndex(index)}
//                 className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//                   index === activeIndex 
//                     ? 'bg-white w-3' 
//                     : 'bg-white/50 hover:bg-white/80'
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}

//       {/* ID Verified Badge */}
//       <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
//         <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
//         <span className='text-xs'>ID verified</span>
//       </div>
//     </div>
//   );
// };

// const ScheduleMeetModal = ({ isOpen, onClose, matchName }) => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');
//   const [meetingType, setMeetingType] = useState('video');

//   const handleSchedule = () => {
//     if (selectedDate && selectedTime) {
//       alert(`Meeting scheduled with ${matchName} on ${selectedDate} at ${selectedTime} via ${meetingType} call`);
//       onClose();
//       setSelectedDate('');
//       setSelectedTime('');
//       setMeetingType('video');
//     } else {
//       alert('Please select date and time');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       {/* <div className="bg-white rounded-2xl p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold text-gray-900">Schedule Meeting</h3>
//           <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
//             <X size={20} className="text-gray-600" />
//           </button>
//         </div>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Meeting with: {matchName}
//             </label>
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Select Date
//             </label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               min={new Date().toISOString().split('T')[0]}
//               className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Select Time
//             </label>
//             <select
//               value={selectedTime}
//               onChange={(e) => setSelectedTime(e.target.value)}
//               className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
//             >
//               <option value="">Choose time</option>
//               <option value="10:00 AM">10:00 AM</option>
//               <option value="11:00 AM">11:00 AM</option>
//               <option value="12:00 PM">12:00 PM</option>
//               <option value="2:00 PM">2:00 PM</option>
//               <option value="3:00 PM">3:00 PM</option>
//               <option value="4:00 PM">4:00 PM</option>
//               <option value="5:00 PM">5:00 PM</option>
//               <option value="6:00 PM">6:00 PM</option>
//               <option value="7:00 PM">7:00 PM</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Meeting Type
//             </label>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setMeetingType('video')}
//                 className={`flex-1 p-2 rounded-lg font-medium transition-colors ${
//                   meetingType === 'video' 
//                     ? 'bg-rose-500 text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Video Call
//               </button>
//               <button
//                 onClick={() => setMeetingType('phone')}
//                 className={`flex-1 p-2 rounded-lg font-medium transition-colors ${
//                   meetingType === 'phone' 
//                     ? 'bg-rose-500 text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 Phone Call
//               </button>
//             </div>
//           </div>
          
//           <div className="flex gap-3 pt-4">
//             <button
//               onClick={onClose}
//               className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSchedule}
//               className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-700"
//             >
//               Schedule
//             </button>
//           </div>
//         </div>
//       </div> */}
//       <ScheduleMeet />
//     </div>
//   );
// };

// const MatchCard = ({ match }) => {
//   const [showScheduleModal, setShowScheduleModal] = useState(false);
//     const router = useRouter();
//   return (
//     <>
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
//         <PhotoCarousel photos={match.photos} />
        
//         <div className="p-4">
//           {/* Header with Contact Icons */}
//           <div className="flex justify-between items-start mb-3">
//             <div className="flex-1">
//               <h2 className="text-lg font-bold text-gray-900 mb-1">
//                 {match.name}
//               </h2>
//               <div className="text-sm text-gray-600 space-y-1">
//                 <div>M11594600</div>
//                 <div className="flex items-center gap-1.5 flex-wrap">
//                   <span>{match.age} yrs</span>
//                   <span>•</span>
//                   <span>{match.height}</span>
//                   <span>•</span>
//                   <span >{match.location}</span>
//                 </div>
//               </div>
//             </div>
            
//             {/* Contact Icons */}
//             <div className="flex gap-2 ml-2">
//               <button className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors" title="Contact">
//                 <Phone size={14} className="text-orange-600" />
//               </button>
//               <button className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors" title="WhatsApp">
//                 <MessageCircle size={14} className="text-green-600" />
//               </button>
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="flex gap-2 mb-3 flex-wrap">
//             <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-md">
//               <AIMatchIcon />
//               <span className="text-xs font-semibold text-yellow-800">AI 90%</span>
//             </div>
//             <div className="flex items-center gap-1.5 bg-purple-50 px-2 py-1 rounded-md">
//               <TravelIcon />
//               <span className="text-xs font-semibold text-purple-800">Travel</span>
//             </div>
//             <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md">
//               <SwimIcon />
//               <span className="text-xs font-semibold text-blue-800">Swim</span>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2 mb-2">
//             <button className="flex cursor-pointer items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
//               <X size={12} />
//               Don&apos;t Show
//             </button>
//             <button className="flex-1 cursor-pointer bg-[#FF6B6B] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#FF6B6E] transition-colors text-sm flex items-center justify-center gap-2">
//               <Heart size={12} />
//               Send Interest
//             </button>
//           </div>
          
//           {/* Schedule Meet Button */}
//           <button 
//             onClick={() => router.push("/ScheduleMeet")}
//             className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm flex items-center justify-center gap-2"
//           >
//             <Calendar size={12} />
//             Schedule Meet
//           </button>
//         </div>
//       </div>

//       <ScheduleMeetModal 
//         isOpen={showScheduleModal}
//         onClose={() => setShowScheduleModal(false)}
//         matchName={match.name}
//       />
//     </>
//   );
// };

// const FilterModal = ({ isOpen, onClose, title, options, onSelect }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl p-5 w-full max-w-md max-h-80 overflow-hidden">
//         <h3 className="text-lg font-bold text-gray-900 text-center mb-3">{title}</h3>
//         <div className="max-h-52 overflow-y-auto">
//           {options.map((option) => (
//             <button
//               key={option}
//               onClick={() => {
//                 onSelect(option);
//                 onClose();
//               }}
//               className="w-full text-left py-2.5 px-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-black"
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const MatchesScreen = () => {
//   const [showFilter, setShowFilter] = useState(false);
//   const [filteredMatches, setFilteredMatches] = useState(dummyMatches);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalTitle, setModalTitle] = useState("");
//   const [modalOptions, setModalOptions] = useState([]);
//   const [onSelectModalOption, setOnSelectModalOption] = useState(() => () => {});

//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedAge, setSelectedAge] = useState("");
//   const [selectedHeight, setSelectedHeight] = useState("");
//   const [selectedWeight, setSelectedWeight] = useState("");
//   const [selectedEducation, setSelectedEducation] = useState("");
//   const [selectedOccupation, setSelectedOccupation] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedRegion, setSelectedRegion] = useState("");
//   const [selectedCaste, setSelectedCaste] = useState("");
//   const [selectedLifestyle, setSelectedLifestyle] = useState("");

//   const showFilterModal = (title, options, onSelect) => {
//     setModalTitle(title);
//     setModalOptions(options);
//     setOnSelectModalOption(() => onSelect);
//     setModalVisible(true);
//   };

//   const applyFilters = () => {
//     let filtered = dummyMatches.filter((match) => {
//       // Gender filter
//       if (selectedGender && match.gender !== selectedGender) return false;
      
//       // Age filter - Fixed the logic
//       if (selectedAge) {
//         const ageNum = match.age;
//         if (selectedAge === "18-25" && (ageNum < 18 || ageNum > 25)) return false;
//         if (selectedAge === "26-35" && (ageNum < 26 || ageNum > 35)) return false;
//         if (selectedAge === "36-45" && (ageNum < 36 || ageNum > 45)) return false;
//         if (selectedAge === "46+" && ageNum < 46) return false;
//       }
      
//       // Height filter - Fixed the logic
//       if (selectedHeight) {
//         const heightNum = parseInt(match.height.replace('cm', ''));
//         if (selectedHeight === "140-150 cm" && (heightNum < 140 || heightNum > 150)) return false;
//         if (selectedHeight === "151-160 cm" && (heightNum < 151 || heightNum > 160)) return false;
//         if (selectedHeight === "161-170 cm" && (heightNum < 161 || heightNum > 170)) return false;
//         if (selectedHeight === "171+ cm" && heightNum < 171) return false;
//       }
      
//       // Weight filter - Fixed the logic
//       if (selectedWeight) {
//         const weightNum = parseInt(match.weight.replace('kg', ''));
//         if (selectedWeight === "40-50 kg" && (weightNum < 40 || weightNum > 50)) return false;
//         if (selectedWeight === "51-60 kg" && (weightNum < 51 || weightNum > 60)) return false;
//         if (selectedWeight === "61-70 kg" && (weightNum < 61 || weightNum > 70)) return false;
//         if (selectedWeight === "71+ kg" && weightNum < 71) return false;
//       }
      
//       // Other filters
//       if (selectedEducation && match.educationlevel !== selectedEducation) return false;
//       if (selectedOccupation && match.occupation !== selectedOccupation) return false;
//       if (selectedState && match.state !== selectedState) return false;
//       if (selectedCity && match.location !== selectedCity) return false;
//       if (selectedRegion && match.region !== selectedRegion) return false;
//       if (selectedCaste && match.caste !== selectedCaste) return false;
//       if (selectedLifestyle && match.lifestyle !== selectedLifestyle) return false;
      
//       return true;
//     });

//     setFilteredMatches(filtered);
//     setShowFilter(false);
//   };

//   const clearFilters = () => {
//     setSelectedGender("");
//     setSelectedAge("");
//     setSelectedHeight("");
//     setSelectedWeight("");
//     setSelectedEducation("");
//     setSelectedOccupation("");
//     setSelectedState("");
//     setSelectedCity("");
//     setSelectedRegion("");
//     setSelectedCaste("");
//     setSelectedLifestyle("");
//     setFilteredMatches(dummyMatches);
//     setShowFilter(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">


//       {/* Filters */}
//       <div className="px-3 py-3">
//         <div className="flex items-center gap-2 overflow-x-auto pb-1">
//           <button
//             onClick={() => setShowFilter(true)}
//             className="flex ml-2 cursor-pointer items-center gap-2 bg-gradient-to-r from-rose-400 to-[#FF6B6B] text-white px-3 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm"
//           >
//             <SlidersHorizontal size={16} />
//             Filters
//           </button>

//           {/* {[
//             { label: "Gender", value: selectedGender, options: ["Male", "Female"], setter: setSelectedGender },
//             { label: "Age", value: selectedAge, options: ageRanges, setter: setSelectedAge },
//             { label: "State", value: selectedState, options: states, setter: setSelectedState },
//             { label: "City", value: selectedCity, options: cities, setter: setSelectedCity },
//           ].map((filter) => (
//             <button
//               key={filter.label}
//               onClick={() => showFilterModal(filter.label, filter.options, filter.setter)}
//               className={`flex items-center gap-1.5 px-3 py-2 rounded-full border-2 font-medium transition-all duration-300 whitespace-nowrap text-sm ${
//                 filter.value
//                   ? 'bg-rose-500 text-white border-rose-500'
//                   : 'bg-white text-gray-700 border-gray-200 hover:border-rose-300'
//               }`}
//             >
//               {filter.value || filter.label}
//               <ChevronDown size={14} />
//             </button>
//           ))} */}
//            <p className="text-sm font-medium text-gray-600">
//           {filteredMatches.length} matches found
//         </p>
//         </div>
//       </div>


//       {/* Matches Grid */}
//       <div className="px-4 pb-6">
//         {filteredMatches.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {filteredMatches.map((match) => (
//               <MatchCard key={match.id} match={match} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="text-5xl mb-3">💔</div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">No matches found</h3>
//             <p className="text-gray-600">Try adjusting your filters</p>
//           </div>
//         )}
//       </div>

//       {/* Filter Overlay */}
//       {showFilter && (
//         <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4">
//           <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden">
//             <div className="flex items-center justify-between p-4 border-b">
//               <h2 className="text-xl font-bold text-gray-900">Filter Matches</h2>
//               <button
//                 onClick={() => setShowFilter(false)}
//                 className="p-2 cursor-pointer rounded-full transition-colors"
//               >
//                 <X size={20} style={{color:"black"}} />
//               </button>
//             </div>

//             <div className="p-4 overflow-y-auto max-h-80">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {[
//                   { label: "Gender", value: selectedGender, options: ["Male", "Female"], setter: setSelectedGender },
//                   { label: "Age", value: selectedAge, options: ageRanges, setter: setSelectedAge },
//                   { label: "Height", value: selectedHeight, options: heightRanges, setter: setSelectedHeight },
//                   { label: "Weight", value: selectedWeight, options: weightRanges, setter: setSelectedWeight },
//                   { label: "Education", value: selectedEducation, options: educationLevels, setter: setSelectedEducation },
//                   { label: "Occupation", value: selectedOccupation, options: occupations, setter: setSelectedOccupation },
//                   { label: "State", value: selectedState, options: states, setter: setSelectedState },
//                   { label: "City", value: selectedCity, options: cities, setter: setSelectedCity },
//                   { label: "Region", value: selectedRegion, options: regions, setter: setSelectedRegion },
//                   { label: "Caste", value: selectedCaste, options: castes, setter: setSelectedCaste },
//                   { label: "Lifestyle", value: selectedLifestyle, options: lifestyles, setter: setSelectedLifestyle },
//                 ].map((filter) => (
//                   <div key={filter.label}>
//                     <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                       {filter.label}
//                     </label>
//                     <select
//                       value={filter.value}
//                       onChange={(e) => filter.setter(e.target.value)}
//                       className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-black bg-white text-sm"
//                     >
//                       <option value="">Select {filter.label}</option>
//                       {filter.options.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex gap-3 p-4 border-t">
//               <button
//                 onClick={clearFilters}
//                 className="flex-1 cursor-pointer bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
//               >
//                 Clear All
//               </button>
//               <button
//                 onClick={applyFilters}
//                 className="flex-1 cursor-pointer bg-gradient-to-r from-rose-500 to-[#FF6B6B] text-white py-2.5 rounded-lg font-semibold hover:to-rose-600 hover:from-[#FF6B6B] transition-all duration-200 shadow-md"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Filter Modal */}
//       <FilterModal
//         isOpen={modalVisible}
//         onClose={() => setModalVisible(false)}
//         title={modalTitle}
//         options={modalOptions}
//         onSelect={onSelectModalOption}
//       />
//     </div>
//   );
// };

// export default MatchesScreen;


"use client";
import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Heart, SlidersHorizontal, X, Sparkles, Plane, Waves, Phone, MessageCircle, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
// Sample data for matches with working image URLs
const dummyMatches = [
  {
    id: "1",
    name: "Priya Sharma",
    gender: "Female",
    weight: "50kg",
    age: 25,
    height: "140cm",
    state: "Tamil Nadu",
    location: "Mumbai",
    occupation: "Doctor",
    caste: "Caste B",
    educationlevel: "Master",
    region: "South",
    lifestyle: "Active",
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face&auto=format",
    ],
  },
  {
    id: "2",
    name: "Rahul Patel",
    age: 32,
    height: "160cm",
    weight: "60kg",
    state: "Maharashtra",
    caste: "Caste A",
    gender: "Male",
    educationlevel: "Bachelor",
    location: "Delhi",
    lifestyle: "Sedentary",
    region: "North",
    occupation: "Teacher",
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face&auto=format",
    ],
  },
  {
    id: "3",
    name: "Ananya Gupta",
    height: "150cm",
    weight: "58kg",
    caste: "Caste C",
    educationlevel: "PhD",
    occupation: "Engineer",
    state: "Maharashtra",
    region: "North",
    age: 27,
    gender: "Female",
    lifestyle: "Moderate",
    location: "Bangalore",
    photos: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face&auto=format",
    ],
  },
  {
    id: "4",
    name: "Vikram Singh",
    state: "Kerala",
    educationlevel: "High School",
    occupation: "Artist",
    region: "South",
    caste: "Caste A",
    height: "155cm",
    weight: "68kg",
    age: 36,
    gender: "Male",
    lifestyle: "Active",
    location: "Kochi",
    photos: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=600&fit=crop&crop=face&auto=format",
    ],
  },
  {
    id: "5",
    name: "Neha Kapoor",
    age: 26,
    caste: "Caste C",
    educationlevel: "PhD",
    region: "South",
    occupation: "Doctor",
    height: "165cm",
    weight: "45kg",
    state: "Tamil Nadu",
    gender: "Female",
    lifestyle: "Active",
    location: "Chennai",
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=400&h=600&fit=crop&crop=face&auto=format",
    ],
  },
  {
    id: "6",
    name: "Arjun Reddy",
    age: 29,
    height: "175cm",
    weight: "75kg",
    state: "Telangana",
    caste: "Caste B",
    gender: "Male",
    educationlevel: "Master",
    location: "Hyderabad",
    lifestyle: "Active",
    region: "South",
    occupation: "Engineer",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&crop=face&auto=format",
    ],
  },
  {
    id: "7",
    name: "Kavya Nair",
    age: 24,
    height: "158cm",  
    weight: "52kg",
    state: "Kerala",
    caste: "Caste A",
    gender: "Female",
    educationlevel: "Master",
    location: "Kochi",
    lifestyle: "Moderate",
    region: "South",
    occupation: "Teacher",
    photos: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face&auto=format",
    ],
  },
  {
    id: "8",
    name: "Ravi Kumar",
    age: 30,
    height: "170cm",
    weight: "72kg",
    state: "Maharashtra",
    caste: "Caste B",
    gender: "Male",
    educationlevel: "Bachelor",
    location: "Mumbai",
    lifestyle: "Active",
    region: "North",
    occupation: "Engineer",
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face&auto=format",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face&auto=format",
    ],
  }
];
 
const ageRanges = ["18-25", "26-35", "36-45", "46+"];
const heightRanges = ["140-150 cm", "151-160 cm", "161-170 cm", "171+ cm"];
const weightRanges = ["40-50 kg", "51-60 kg", "61-70 kg", "71+ kg"];
const educationLevels = ["High School", "Bachelor", "Master", "PhD"];
const occupations = ["Engineer", "Doctor", "Artist", "Teacher"];
const states = ["Tamil Nadu", "Kerala", "Maharashtra", "Telangana"];
const cities = ["Chennai", "Mumbai", "Kochi", "Delhi", "Bangalore", "Hyderabad"];
const regions = ["North", "South", "East", "West"];
const castes = ["Caste A", "Caste B", "Caste C"];
const lifestyles = ["Active", "Moderate", "Sedentary"];
 
const AIMatchIcon = () => (
  <div className="relative w-4 h-4 bg-yellow-100 rounded-lg flex items-center justify-center">
    <Sparkles className="w-2.5 h-2.5 text-yellow-600" />
  </div>
);
 
const SwimIcon = () => (
  <div className="relative w-4 h-4 bg-blue-100 rounded-lg flex items-center justify-center">
    <Waves className="w-2.5 h-2.5 text-blue-600" />
  </div>
);
 
const TravelIcon = () => (
  <div className="relative w-4 h-4 bg-purple-100 rounded-lg flex items-center justify-center">
    <Plane className="w-2.5 h-2.5 text-purple-600" />
  </div>
);
 
const PhotoCarousel = ({ photos, onImageClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
 
  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };
 
  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };
 
  const handleImageError = () => {
    setImageError(true);
  };
 
  const handleImageClick = (e) => {
    e.stopPropagation();
    onImageClick();
  };
 
  return (
    <div className="relative h-48 overflow-hidden rounded-t-2xl group">
      {imageError ? (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="text-gray-400">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">👤</span>
            </div>
            <p className="text-sm">Photo unavailable</p>
          </div>
        </div>
      ) : (
        <Image
          src={photos[activeIndex]}
          width={400}
          height={600}

          alt="Profile"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
          onError={handleImageError}
          onClick={handleImageClick}
          loading="lazy"
        />
      )}
 
      {photos.length > 1 && !imageError && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
          >
            <ChevronLeft size={14} />
          </button>
 
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
          >
            <ChevronRight size={14} />
          </button>
 
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(index);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-white w-3'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
 
      {/* ID Verified Badge */}
      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        <span className='text-xs'>ID verified</span>
      </div>
 
      {/* View Profile Button */}
      <button
        onClick={handleImageClick}
        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
        title="View Profile"
      >
        <Eye size={12} />
      </button>
    </div>
  );
};
 
const ScheduleMeetModal = ({ isOpen, onClose, matchName }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingType, setMeetingType] = useState('video');
 
  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      toast.done(`Meeting scheduled with ${matchName} on ${selectedDate} at ${selectedTime} via ${meetingType} call`);
      onClose();
      setSelectedDate('');
      setSelectedTime('');
      setMeetingType('video');
    } else {
      toast.error('Please select date and time');
    }
  };
 
  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Schedule Meeting</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={20} className="text-gray-600" />
          </button>
        </div>
       
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Meeting with: {matchName}
            </label>
          </div>
         
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            />
          </div>
         
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            >
              <option value="">Choose time</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
              <option value="7:00 PM">7:00 PM</option>
            </select>
          </div>
         
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Meeting Type
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setMeetingType('video')}
                className={`flex-1 p-2 rounded-lg font-medium transition-colors ${
                  meetingType === 'video'
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Video Call
              </button>
              <button
                onClick={() => setMeetingType('phone')}
                className={`flex-1 p-2 rounded-lg font-medium transition-colors ${
                  meetingType === 'phone'
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Phone Call
              </button>
            </div>
          </div>
         
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSchedule}
              className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-700"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
const MatchCard = ({ match }) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
 
  const router = useRouter();
 
  // const handleViewProfile = ({id}) => {
  //   alert(`Viewing profile for ${match.name}`);
  //   router.push("/Matches?")
  // };
 
  const handleViewProfile = () => {
    router.push(`/Matches/${match.id}`);
  };
 
  const handleScheduleMeet = (e) => {
    e.stopPropagation();
    router.push("/ScheduleMeet")
    // setShowScheduleModal(true);
  };
 
  const handleSendInterest = (e) => {
    e.stopPropagation();
  };
 
  const handleDontShow = (e) => {
    e.stopPropagation();
  };
 
  const handleContact = (e, type) => {
    e.stopPropagation();
  };
 
  return (
    <>
      <div
        className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
        onClick={handleViewProfile}
      >
        <PhotoCarousel
          photos={match.photos}
          onImageClick={handleViewProfile}
        />
       
        <div className="p-4">
          {/* Header with Contact Icons */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                {match.name}
              </h2>
              <div className="text-sm text-gray-600 space-y-1">
                <div>M11594600</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span>{match.age} yrs</span>
                  <span>•</span>
                  <span>{match.height}</span>
                  <span>•</span>
                  <span>{match.location}</span>
                </div>
              </div>
            </div>
           
            {/* Contact Icons */}
            <div className="flex gap-2 ml-2">
              <button
                onClick={(e) => handleContact(e, 'phone')}
                className="w-8  cursor-pointer h-8 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors"
                title="Contact"
              >
                <Phone size={14} className="text-orange-600" />
              </button>
              <button
                onClick={(e) => handleContact(e, 'WhatsApp')}
                className="w-8 h-8 cursor-pointer bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle size={14} className="text-green-600" />
              </button>
            </div>
          </div>
 
          {/* Tags */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-md">
              <AIMatchIcon />
              <span className="text-xs font-semibold text-yellow-800">AI 90%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 px-2 py-1 rounded-md">
              <TravelIcon />
              <span className="text-xs font-semibold text-purple-800">Travel</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md">
              <SwimIcon />
              <span className="text-xs font-semibold text-blue-800">Swim</span>
            </div>
          </div>
 
          {/* Action Buttons */}
          <div className="flex gap-2 mb-2">
            <button
              onClick={handleDontShow}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <X size={12} />
              Don&apos;t Show
            </button>
            <button
              onClick={handleSendInterest}
              className="flex-1 cursor-pointer bg-[#FF6B6B] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#FF6B6E] transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Heart size={12} />
              Send Interest
            </button>
          </div>
         
          {/* Schedule Meet Button */}
          <button
            onClick={handleScheduleMeet}
            className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm flex items-center justify-center gap-2"
          >
            <Calendar size={12} />
            Schedule Meet
          </button>
 
          {/* View Profile Link */}
          <button
            onClick={handleViewProfile}
            className="w-full mt-2 text-rose-600 hover:text-rose-700 cursor-pointer font-medium text-sm py-1 transition-colors"
          >
            View Full Profile →
          </button>
        </div>
      </div>
 
      <ScheduleMeetModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        matchName={match.name}
      />
    </>
  );
};
 
const FilterModal = ({ isOpen, onClose, title, options, onSelect }) => {
  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-5 w-full max-w-md max-h-80 overflow-hidden">
        <h3 className="text-lg font-bold text-gray-900 text-center mb-3">{title}</h3>
        <div className="max-h-52 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                onClose();
              }}
              className="w-full text-left py-2.5 px-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-black"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
 
const MatchesScreen = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filteredMatches, setFilteredMatches] = useState(dummyMatches);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalOptions, setModalOptions] = useState([]);
  const [onSelectModalOption, setOnSelectModalOption] = useState(() => () => {});
 
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedHeight, setSelectedHeight] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCaste, setSelectedCaste] = useState("");
  const [selectedLifestyle, setSelectedLifestyle] = useState("");
 
  const showFilterModal = (title, options, onSelect) => {
    setModalTitle(title);
    setModalOptions(options);
    setOnSelectModalOption(() => onSelect);
    setModalVisible(true);
  };
 
  const applyFilters = () => {
    let filtered = dummyMatches.filter((match) => {
      // Gender filter
      if (selectedGender && match.gender !== selectedGender) return false;
     
      // Age filter
      if (selectedAge) {
        const ageNum = match.age;
        if (selectedAge === "18-25" && (ageNum < 18 || ageNum > 25)) return false;
        if (selectedAge === "26-35" && (ageNum < 26 || ageNum > 35)) return false;
        if (selectedAge === "36-45" && (ageNum < 36 || ageNum > 45)) return false;
        if (selectedAge === "46+" && ageNum < 46) return false;
      }
     
      // Height filter
      if (selectedHeight) {
        const heightNum = parseInt(match.height.replace('cm', ''));
        if (selectedHeight === "140-150 cm" && (heightNum < 140 || heightNum > 150)) return false;
        if (selectedHeight === "151-160 cm" && (heightNum < 151 || heightNum > 160)) return false;
        if (selectedHeight === "161-170 cm" && (heightNum < 161 || heightNum > 170)) return false;
        if (selectedHeight === "171+ cm" && heightNum < 171) return false;
      }
     
      // Weight filter
      if (selectedWeight) {
        const weightNum = parseInt(match.weight.replace('kg', ''));
        if (selectedWeight === "40-50 kg" && (weightNum < 40 || weightNum > 50)) return false;
        if (selectedWeight === "51-60 kg" && (weightNum < 51 || weightNum > 60)) return false;
        if (selectedWeight === "61-70 kg" && (weightNum < 61 || weightNum > 70)) return false;
        if (selectedWeight === "71+ kg" && weightNum < 71) return false;
      }
     
      // Other filters
      if (selectedEducation && match.educationlevel !== selectedEducation) return false;
      if (selectedOccupation && match.occupation !== selectedOccupation) return false;
      if (selectedState && match.state !== selectedState) return false;
      if (selectedCity && match.location !== selectedCity) return false;
      if (selectedRegion && match.region !== selectedRegion) return false;
      if (selectedCaste && match.caste !== selectedCaste) return false;
      if (selectedLifestyle && match.lifestyle !== selectedLifestyle) return false;
     
      return true;
    });
 
    setFilteredMatches(filtered);
    setShowFilter(false);
  };
 
  const clearFilters = () => {
    setSelectedGender("");
    setSelectedAge("");
    setSelectedHeight("");
    setSelectedWeight("");
    setSelectedEducation("");
    setSelectedOccupation("");
    setSelectedState("");
    setSelectedCity("");
    setSelectedRegion("");
    setSelectedCaste("");
    setSelectedLifestyle("");
    setFilteredMatches(dummyMatches);
    setShowFilter(false);
  };
 
   return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
 
 
      {/* Filters */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setShowFilter(true)}
            className="flex ml-2 cursor-pointer items-center gap-2 bg-gradient-to-r from-rose-400 to-[#FF6B6B] text-white px-3 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
 
          {/* {[
            { label: "Gender", value: selectedGender, options: ["Male", "Female"], setter: setSelectedGender },
            { label: "Age", value: selectedAge, options: ageRanges, setter: setSelectedAge },
            { label: "State", value: selectedState, options: states, setter: setSelectedState },
            { label: "City", value: selectedCity, options: cities, setter: setSelectedCity },
          ].map((filter) => (
            <button
              key={filter.label}
              onClick={() => showFilterModal(filter.label, filter.options, filter.setter)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border-2 font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                filter.value
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-rose-300'
              }`}
            >
              {filter.value || filter.label}
              <ChevronDown size={14} />
            </button>
          ))} */}
           <p className="text-sm font-medium text-gray-600">
          {filteredMatches.length} matches found
        </p>
        </div>
      </div>
 
 
      {/* Matches Grid */}
      <div className="px-4 pb-6">
        {filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">💔</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No matches found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        )}
      </div>
 
      {/* Filter Overlay */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Filter Matches</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="p-2 cursor-pointer rounded-full transition-colors"
              >
                <X size={20} style={{color:"black"}} />
              </button>
            </div>
 
            <div className="p-4 overflow-y-auto max-h-80">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Gender", value: selectedGender, options: ["Male", "Female"], setter: setSelectedGender },
                  { label: "Age", value: selectedAge, options: ageRanges, setter: setSelectedAge },
                  { label: "Height", value: selectedHeight, options: heightRanges, setter: setSelectedHeight },
                  { label: "Weight", value: selectedWeight, options: weightRanges, setter: setSelectedWeight },
                  { label: "Education", value: selectedEducation, options: educationLevels, setter: setSelectedEducation },
                  { label: "Occupation", value: selectedOccupation, options: occupations, setter: setSelectedOccupation },
                  { label: "State", value: selectedState, options: states, setter: setSelectedState },
                  { label: "City", value: selectedCity, options: cities, setter: setSelectedCity },
                  { label: "Region", value: selectedRegion, options: regions, setter: setSelectedRegion },
                  { label: "Caste", value: selectedCaste, options: castes, setter: setSelectedCaste },
                  { label: "Lifestyle", value: selectedLifestyle, options: lifestyles, setter: setSelectedLifestyle },
                ].map((filter) => (
                  <div key={filter.label}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {filter.label}
                    </label>
                    <select
                      value={filter.value}
                      onChange={(e) => filter.setter(e.target.value)}
                      className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-black bg-white text-sm"
                    >
                      <option value="">Select {filter.label}</option>
                      {filter.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
 
            <div className="flex gap-3 p-4 border-t">
              <button
                onClick={clearFilters}
                className="flex-1 cursor-pointer bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
              >
                Clear All
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 cursor-pointer bg-gradient-to-r from-rose-500 to-[#FF6B6B] text-white py-2.5 rounded-lg font-semibold hover:to-rose-600 hover:from-[#FF6B6B] transition-all duration-200 shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
 
      {/* Filter Modal */}
      <FilterModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        options={modalOptions}
        onSelect={onSelectModalOption}
      />
    </div>
  );
};
 
export default MatchesScreen;