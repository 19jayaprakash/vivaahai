// "use client"
// import React, { useState, useEffect } from 'react';
// import {
//   Heart,
//   Send,
//   Mail,
//   Eye,
//   Gift
// } from 'lucide-react';
// import InterestCard from './InterestCard';
 
// // Enhanced sample data with more profiles including viewed section
// const interestData = {
//   incoming: [
//     {
//       id: 1,
//       name: "Arjun Mehta",
//       age: 28,
//       location: "Mumbai",
//       profession: "Software Architect",
//       company: "Google",
//       photos: [
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face&auto=format",
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 94,
//       interests: ["Tech", "Travel", "Photography"],
//       timeAgo: "2h",
//       isOnline: true,
//       verified: true,
//       premium: true
//     },
//     {
//       id: 2,
//       name: "Vikram Singh",
//       age: 30,
//       location: "Delhi NCR",
//       profession: "Investment Banker",
//       company: "Goldman Sachs",
//       photos: [
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face&auto=format",
//         "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 91,
//       interests: ["Finance", "Fitness", "Books"],
//       timeAgo: "5h",
//       isOnline: false,
//       verified: true,
//       premium: false
//     },
//     {
//       id: 3,
//       name: "Rohan Kapoor",
//       age: 26,
//       location: "Bangalore",
//       profession: "Product Manager",
//       company: "Microsoft",
//       photos: [
//         "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 88,
//       interests: ["Tech", "Music", "Cooking"],
//       timeAgo: "1d",
//       isOnline: true,
//       verified: false,
//       premium: true
//     },
//     {
//       id: 10,
//       name: "Karthik Rao",
//       age: 29,
//       location: "Chennai",
//       profession: "Doctor",
//       company: "Apollo Hospital",
//       photos: [
//         "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 93,
//       interests: ["Medicine", "Fitness", "Travel"],
//       timeAgo: "3h",
//       isOnline: true,
//       verified: true,
//       premium: false
//     }
//   ],
//   sent: [
//     {
//       id: 4,
//       name: "Priya Sharma",
//       age: 25,
//       location: "Pune",
//       profession: "UX Designer",
//       company: "Adobe",
//       photos: [
//         "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face&auto=format",
//         "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 92,
//       interests: ["Design", "Art", "Travel"],
//       timeAgo: "3d",
//       status: "viewed",
//       isOnline: false,
//       verified: true,
//       premium: true
//     },
//     {
//       id: 5,
//       name: "Ananya Gupta",
//       age: 27,
//       location: "Hyderabad",
//       profession: "Data Scientist",
//       company: "Amazon",
//       photos: [
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 89,
//       interests: ["Data Science", "Yoga", "Movies"],
//       timeAgo: "1w",
//       status: "pending",
//       isOnline: true,
//       verified: true,
//       premium: false
//     },
//     {
//       id: 13,
//       name: "Shreya Patel",
//       age: 24,
//       location: "Ahmedabad",
//       profession: "Marketing Executive",
//       company: "HUL",
//       photos: [
//         "https://images.unsplash.com/photo-1488207632209-ca3af4378b5d?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 86,
//       interests: ["Marketing", "Dance", "Fashion"],
//       timeAgo: "2d",
//       status: "pending",
//       isOnline: true,
//       verified: false,
//       premium: true
//     }
//   ],
//   matched: [
//     {
//       id: 6,
//       name: "Kavya Nair",
//       age: 24,
//       location: "Kochi",
//       profession: "Marketing Manager",
//       company: "Unilever",
//       photos: [
//         "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 96,
//       interests: ["Marketing", "Dance", "Food"],
//       matchedDate: "2d",
//       lastMessage: "Hey! Thanks for connecting 😊",
//       isOnline: true,
//       verified: true,
//       premium: true
//     },
//     {
//       id: 16,
//       name: "Meera Iyer",
//       age: 25,
//       location: "Chennai",
//       profession: "Software Engineer",
//       company: "TCS",
//       photos: [
//         "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 94,
//       interests: ["Programming", "Books", "Travel"],
//       matchedDate: "1w",
//       lastMessage: "Would love to chat more!",
//       isOnline: false,
//       verified: true,
//       premium: false
//     },
//     {
//       id: 17,
//       name: "Divya Reddy",
//       age: 26,
//       location: "Hyderabad",
//       profession: "Architect",
//       company: "L&T",
//       photos: [
//         "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 92,
//       interests: ["Architecture", "Art", "Photography"],
//       matchedDate: "3d",
//       lastMessage: "Looking forward to meeting!",
//       isOnline: true,
//       verified: false,
//       premium: true
//     }
//   ],
//   viewed: [
//     {
//       id: 18,
//       name: "Rajesh Kumar",
//       age: 31,
//       location: "Kolkata",
//       profession: "Business Analyst",
//       company: "Accenture",
//       photos: [
//         "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 85,
//       interests: ["Business", "Cricket", "Music"],
//       viewedDate: "1d",
//       isOnline: false,
//       verified: true,
//       premium: false
//     },
//     {
//       id: 19,
//       name: "Sanjay Patel",
//       age: 29,
//       location: "Surat",
//       profession: "Textile Engineer",
//       company: "Reliance",
//       photos: [
//         "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 82,
//       interests: ["Engineering", "Photography", "Travel"],
//       viewedDate: "2d",
//       isOnline: true,
//       verified: false,
//       premium: true
//     },
//     {
//       id: 20,
//       name: "Amit Joshi",
//       age: 33,
//       location: "Indore",
//       profession: "Civil Engineer",
//       company: "L&T Construction",
//       photos: [
//         "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 87,
//       interests: ["Engineering", "Sports", "Movies"],
//       viewedDate: "3d",
//       isOnline: false,
//       verified: true,
//       premium: false
//     },
//     {
//       id: 21,
//       name: "Deepak Sharma",
//       age: 28,
//       location: "Lucknow",
//       profession: "Bank Manager",
//       company: "SBI",
//       photos: [
//         "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 90,
//       interests: ["Finance", "Reading", "Gardening"],
//       viewedDate: "4d",
//       isOnline: true,
//       verified: true,
//       premium: true
//     },
//     {
//       id: 22,
//       name: "Manish Agarwal",
//       age: 30,
//       location: "Nagpur",
//       profession: "Sales Manager",
//       company: "Tata Motors",
//       photos: [
//         "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 84,
//       interests: ["Sales", "Fitness", "Adventure"],
//       viewedDate: "5d",
//       isOnline: false,
//       verified: false,
//       premium: false
//     },
//     {
//       id: 23,
//       name: "Suresh Reddy",
//       age: 32,
//       location: "Vizag",
//       profession: "Marine Engineer",
//       company: "Shipping Corp",
//       photos: [
//         "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       compatibility: 88,
//       interests: ["Marine", "Travel", "Photography"],
//       viewedDate: "1w",
//       isOnline: true,
//       verified: true,
//       premium: true
//     }
//   ]
// };
 

 
// const ModernInterestsPage = () => {
//   const [activeTab, setActiveTab] = useState('incoming');
//   const [data, setData] = useState(interestData);
 
//   const handleAction = (personId, action) => {
//     if (action === 'accept') {
//       const person = data.incoming.find(p => p.id === personId);
//       if (person) {
//         setData(prev => ({
//           ...prev,
//           incoming: prev.incoming.filter(p => p.id !== personId),
//           matched: [...prev.matched, { ...person, matchedDate: 'now' }]
//         }));
//       }
//     } else if (action === 'decline') {
//       setData(prev => ({
//         ...prev,
//         incoming: prev.incoming.filter(p => p.id !== personId)
//       }));
//     } else if (action === 'send_interest') {
//       const person = data.viewed.find(p => p.id === personId);
//       if (person) {
//         setData(prev => ({
//           ...prev,
//           viewed: prev.viewed.filter(p => p.id !== personId),
//           sent: [...prev.sent, { ...person, timeAgo: 'now', status: 'pending' }]
//         }));
//       }
//     }
//   };
 
//   const tabs = [
//     { id: 'incoming', label: 'New Interests', count: data.incoming.length, icon: Mail },
//     { id: 'matched', label: 'Matches', count: data.matched.length, icon: Heart },
//     { id: 'sent', label: 'Sent', count: data.sent.length, icon: Send },
//     { id: 'viewed', label: 'Viewed', count: data.viewed.length, icon: Eye }
//   ];
 
//   const currentData = data[activeTab] || [];
 
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
//       {/* Compact Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="px-4 py-3">
//           {/* Title */}
//           <div className="flex items-center justify-between mb-3">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
//                 <Heart className="text-white" size={16} />
//               </div>
//               <div>
//                 <h1 className="text-lg font-bold text-gray-900">Interests</h1>
//                 <p className="text-xs text-gray-500">Manage your connections</p>
//               </div>
//             </div>
           
//             {/* Quick Stats */}
//             <div className="flex items-center gap-4 text-center">
//               <div>
//                 <div className="text-lg font-bold text-emerald-600">{data.matched.length}</div>
//                 <div className="text-xs text-gray-500">Matches</div>
//               </div>
//               <div className="w-px h-6 bg-gray-200"></div>
//               <div>
//                 <div className="text-lg font-bold text-purple-600">{data.incoming.length}</div>
//                 <div className="text-xs text-gray-500">Received</div>
//               </div>
//               <div className="w-px h-6 bg-gray-200"></div>
//               <div>
//                 <div className="text-lg font-bold text-blue-600">{data.viewed.length}</div>
//                 <div className="text-xs text-gray-500">Viewed</div>
//               </div>
//             </div>
//           </div>
 
//           {/* Tab Navigation */}
//           <div className="flex gap-2">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`relative cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
//                     activeTab === tab.id
//                       ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   <Icon size={14} />
//                   {tab.label}
//                   {tab.count > 0 && (
//                     <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
//                       activeTab === tab.id ? 'bg-white text-gray-800' : 'bg-red-500 text-white'
//                     }`}>
//                       {tab.count}
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
 
//       {/* Content Grid - More Compact */}
//       <div className="p-3">
//         {currentData.length > 0 ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-7 gap-3">
//             {currentData.map((person) => (
//               <div key={person.id}>
//               <InterestCard
//                 person={person}
//                 type={activeTab}
//                 onAction={handleAction}
//               />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
//               {activeTab === 'incoming' && <Mail className="text-white" size={24} />}
//               {activeTab === 'matched' && <Heart className="text-white" size={24} />}
//               {activeTab === 'sent' && <Send className="text-white" size={24} />}
//               {activeTab === 'viewed' && <Eye className="text-white" size={24} />}
//             </div>
//             <h3 className="text-lg font-bold text-gray-800 mb-2">
//               {activeTab === 'incoming' && 'No new interests'}
//               {activeTab === 'matched' && 'No matches yet'}
//               {activeTab === 'sent' && 'No sent interests'}
//               {activeTab === 'viewed' && 'No viewed profiles'}
//             </h3>
//             <p className="text-gray-600 mb-6 text-sm max-w-xs mx-auto">
//               {activeTab === 'incoming' && 'Complete your profile to receive more interests'}
//               {activeTab === 'matched' && 'Start liking profiles to create connections'}
//               {activeTab === 'sent' && 'Browse and send interests to people you like'}
//               {activeTab === 'viewed' && 'Start browsing profiles to see them here'}
//             </p>
//             <button className="bg-gradient-to-r cursor-pointer from-pink-500 to-rose-500 text-white px-6 py-2.5 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transition-all flex items-center gap-2 mx-auto text-sm">
//               <Gift size={14} />
//               {activeTab === 'viewed' ? 'Browse Profiles' : activeTab === 'incoming' ? 'Enhance Profile' : 'Discover Matches'}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
 
// export default ModernInterestsPage;

"use client"
import React, { useState, useEffect } from 'react';
import InterestCard from './InterestCard';
import {
  Heart,
  XCircle,
  Send,
  Mail,
  Eye,
  Gift
} from 'lucide-react';
import { axiosPublic } from '../../base/constant';
 
 
// Sample data without the viewed section (will come from API)
const interestData = {
  incoming: [
    {
      id: 1,
      name: "Arjun Mehta",
      age: 28,
      location: "Mumbai",
      profession: "Software Architect",
      company: "Google",
      photos: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face&auto=format",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 94,
      interests: ["Tech", "Travel", "Photography"],
      timeAgo: "2h",
      isOnline: true,
      verified: true,
      premium: true
    },
    {
      id: 2,
      name: "Vikram Singh",
      age: 30,
      location: "Delhi NCR",
      profession: "Investment Banker",
      company: "Goldman Sachs",
      photos: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face&auto=format",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 91,
      interests: ["Finance", "Fitness", "Books"],
      timeAgo: "5h",
      isOnline: false,
      verified: true,
      premium: false
    },
    {
      id: 3,
      name: "Rohan Kapoor",
      age: 26,
      location: "Bangalore",
      profession: "Product Manager",
      company: "Microsoft",
      photos: [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 88,
      interests: ["Tech", "Music", "Cooking"],
      timeAgo: "1d",
      isOnline: true,
      verified: false,
      premium: true
    },
    {
      id: 10,
      name: "Karthik Rao",
      age: 29,
      location: "Chennai",
      profession: "Doctor",
      company: "Apollo Hospital",
      photos: [
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 93,
      interests: ["Medicine", "Fitness", "Travel"],
      timeAgo: "3h",
      isOnline: true,
      verified: true,
      premium: false
    }
  ],
  sent: [
    {
      id: 4,
      name: "Priya Sharma",
      age: 25,
      location: "Pune",
      profession: "UX Designer",
      company: "Adobe",
      photos: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face&auto=format",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 92,
      interests: ["Design", "Art", "Travel"],
      timeAgo: "3d",
      status: "viewed",
      isOnline: false,
      verified: true,
      premium: true
    },
    {
      id: 5,
      name: "Ananya Gupta",
      age: 27,
      location: "Hyderabad",
      profession: "Data Scientist",
      company: "Amazon",
      photos: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 89,
      interests: ["Data Science", "Yoga", "Movies"],
      timeAgo: "1w",
      status: "pending",
      isOnline: true,
      verified: true,
      premium: false
    },
    {
      id: 13,
      name: "Shreya Patel",
      age: 24,
      location: "Ahmedabad",
      profession: "Marketing Executive",
      company: "HUL",
      photos: [
        "https://images.unsplash.com/photo-1488207632209-ca3af4378b5d?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 86,
      interests: ["Marketing", "Dance", "Fashion"],
      timeAgo: "2d",
      status: "pending",
      isOnline: true,
      verified: false,
      premium: true
    }
  ],
  matched: [
    {
      id: 6,
      name: "Kavya Nair",
      age: 24,
      location: "Kochi",
      profession: "Marketing Manager",
      company: "Unilever",
      photos: [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 96,
      interests: ["Marketing", "Dance", "Food"],
      matchedDate: "2d",
      lastMessage: "Hey! Thanks for connecting 😊",
      isOnline: true,
      verified: true,
      premium: true
    },
    {
      id: 16,
      name: "Meera Iyer",
      age: 25,
      location: "Chennai",
      profession: "Software Engineer",
      company: "TCS",
      photos: [
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 94,
      interests: ["Programming", "Books", "Travel"],
      matchedDate: "1w",
      lastMessage: "Would love to chat more!",
      isOnline: false,
      verified: true,
      premium: false
    },
    {
      id: 17,
      name: "Divya Reddy",
      age: 26,
      location: "Hyderabad",
      profession: "Architect",
      company: "L&T",
      photos: [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 92,
      interests: ["Architecture", "Art", "Photography"],
      matchedDate: "3d",
      lastMessage: "Looking forward to meeting!",
      isOnline: true,
      verified: false,
      premium: true
    }
  ],
  viewed: [] // This will be populated from API
};
 
const ModernInterestsPage = () => {
  const [activeTab, setActiveTab] = useState('incoming');
  const [data, setData] = useState(interestData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
 
  // Helper function to transform API data to match your component structure
  const transformApiData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
   
    return apiData.map(item => ({
      id: item.viewer.UserProfile.profileId || item._id,
      name: item.viewer.UserProfile.firstName + (item.viewer.UserProfile.lastName ? '' + item.viewer.UserProfile.lastName:'')|| `${item.firstName || ''} ${item.lastName || ''}`.trim(),
      //{match.firstName + (match.lastName ? ' ' + match.lastName : '')}
      age: calculateAge(item.viewer.UserProfile.dateOfBirth),
      location: item.viewer.UserProfile.city || 'Location not specified',
      profession: item.profession || item.occupation || 'Profession not specified',
      company: item.company || item.workplace || 'Company not specified',
      religion:item.viewer.UserProfile.religion,
      caste:item.viewer.UserProfile.caste,
      photos: item.photos || item.profilePictures || item.images || [],
      compatibility: item.compatibility || item.matchPercentage || Math.floor(Math.random() * 20) + 80, // Random if not provided
      interests: item.interests || item.hobbies || [],
      viewedDate: item.viewedDate || item.viewedAt || formatTimeAgo(item.lastViewedAt),
      isOnline: item.isOnline || item.online || false,
      verified: item.verified || item.isVerified || false,
      premium: item.premium || item.isPremium || false
    }));
  };
 
  // Helper function to calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
 
  // Helper function to format time ago
  const formatTimeAgo = (date) => {
    if (!date) return 'Recently';
    const now = new Date();
    const viewDate = new Date(date);
    const diffInHours = Math.floor((now - viewDate) / (1000 * 60 * 60));
   
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInHours < 48) return '1d';
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d`;
    return `${Math.floor(diffInHours / 168)}w`;
  };
 
  const handleAction = (personId, action) => {
    if (action === 'accept') {
      const person = data.incoming.find(p => p.id === personId);
      if (person) {
        setData(prev => ({
          ...prev,
          incoming: prev.incoming.filter(p => p.id !== personId),
          matched: [...prev.matched, { ...person, matchedDate: 'now' }]
        }));
      }
    } else if (action === 'decline') {
      setData(prev => ({
        ...prev,
        incoming: prev.incoming.filter(p => p.id !== personId)
      }));
    } else if (action === 'send_interest') {
      const person = data.viewed.find(p => p.id === personId);
      if (person) {
        setData(prev => ({
          ...prev,
          viewed: prev.viewed.filter(p => p.id !== personId),
          sent: [...prev.sent, { ...person, timeAgo: 'now', status: 'pending' }]
        }));
      }
    }
  };
 
  const tabs = [
    { id: 'incoming', label: 'New Interests', count: data.incoming.length, icon: Mail },
    { id: 'matched', label: 'Matches', count: data.matched.length, icon: Heart },
    { id: 'sent', label: 'Sent', count: data.sent.length, icon: Send },
    { id: 'viewed', label: 'Viewed', count: data.viewed.length, icon: Eye }
  ];
 
  const currentData = data[activeTab] || [];
 
  useEffect(() => {
    async function fetchProfileViews() {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found');
        return;
      }
 
      setLoading(true);
      setError(null);
 
      try {
        const res = await axiosPublic.get('/views/who-viewed-me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        console.log('API Response:', res.data);
       
        // Transform and set the viewed data
        const transformedData = transformApiData(res.data.data || res.data);
       
        setData(prev => ({
          ...prev,
          viewed: transformedData
        }));
       
      } catch (error) {
        console.error('Error fetching profile views:', error);
        setError(error.response?.data?.message || 'Failed to fetch profile views');
      } finally {
        setLoading(false);
      }
    }
 
    fetchProfileViews();
  }, []);
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Compact Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          {/* Title */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <Heart className="text-white" size={16} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Interests</h1>
                <p className="text-xs text-gray-500">Manage your connections</p>
              </div>
            </div>
           
            {/* Quick Stats */}
            <div className="flex items-center gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-emerald-600">{data.matched.length}</div>
                <div className="text-xs text-gray-500">Matches</div>
              </div>
              <div className="w-px h-6 bg-gray-200"></div>
              <div>
                <div className="text-lg font-bold text-purple-600">{data.incoming.length}</div>
                <div className="text-xs text-gray-500">Received</div>
              </div>
              <div className="w-px h-6 bg-gray-200"></div>
              <div>
                <div className="text-lg font-bold text-blue-600">{data.viewed.length}</div>
                <div className="text-xs text-gray-500">Viewed</div>
              </div>
            </div>
          </div>
 
          {/* Tab Navigation */}
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                  {tab.count > 0 && (
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      activeTab === tab.id ? 'bg-white text-gray-800' : 'bg-red-500 text-white'
                    }`}>
                      {tab.count}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
 
      {/* Loading State */}
      {loading && activeTab === 'viewed' && (
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile views...</p>
        </div>
      )}
 
      {/* Error State */}
      {error && activeTab === 'viewed' && (
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="text-red-500" size={24} />
          </div>
          <p className="text-red-600 mb-2">Error loading data</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      )}
 
      {/* Content Grid - More Compact */}
      <div className="p-3">
        {currentData.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-7 gap-3">
            {currentData.map((person) => (
              <InterestCard
                key={person.id}
                person={person}
                type={activeTab}
                onAction={handleAction}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'incoming' && <Mail className="text-white" size={24} />}
              {activeTab === 'matched' && <Heart className="text-white" size={24} />}
              {activeTab === 'sent' && <Send className="text-white" size={24} />}
              {activeTab === 'viewed' && <Eye className="text-white" size={24} />}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {activeTab === 'incoming' && 'No new interests'}
              {activeTab === 'matched' && 'No matches yet'}
              {activeTab === 'sent' && 'No sent interests'}
              {activeTab === 'viewed' && 'No viewed profiles'}
            </h3>
            <p className="text-gray-600 mb-6 text-sm max-w-xs mx-auto">
              {activeTab === 'incoming' && 'Complete your profile to receive more interests'}
              {activeTab === 'matched' && 'Start liking profiles to create connections'}
              {activeTab === 'sent' && 'Browse and send interests to people you like'}
              {activeTab === 'viewed' && 'Start browsing profiles to see them here'}
            </p>
            <button className="bg-gradient-to-r cursor-pointer from-pink-500 to-rose-500 text-white px-6 py-2.5 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transition-all flex items-center gap-2 mx-auto text-sm">
              <Gift size={14} />
              {activeTab === 'viewed' ? 'Browse Profiles' : activeTab === 'incoming' ? 'Enhance Profile' : 'Discover Matches'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default ModernInterestsPage;
 