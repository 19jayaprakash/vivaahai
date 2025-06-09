// "use client"
// import React, { useState } from 'react';
// import {
//   Heart,
//   MessageCircle,
//   Phone,
//   Clock,
//   CheckCircle,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   Gift,
//   Calendar,
//   ArrowRight,
//   Users,
//   Sparkles
// } from 'lucide-react';
// import Image from 'next/image';
 
// // Sample interest data
// const interestData = {
//   sentInterests: [
//     {
//       id: "1",
//       name: "Priya Sharma",
//       age: 25,
//       height: "140cm",
//       location: "Mumbai",
//       occupation: "Doctor",
//       photos: [
//         "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face&auto=format",
//         "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       status: "pending",
//       sentDate: "2 days ago",
//       compatibility: 92
//     },
//     {
//       id: "2",
//       name: "Ananya Gupta",
//       age: 27,
//       height: "150cm",
//       location: "Bangalore",
//       occupation: "Engineer",
//       photos: [
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face&auto=format",
//         "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       status: "accepted",
//       sentDate: "1 week ago",
//       compatibility: 88
//     },
//     {
//       id: "3",
//       name: "Kavya Nair",
//       age: 24,
//       height: "158cm",
//       location: "Kochi",
//       occupation: "Teacher",
//       photos: [
//         "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face&auto=format",
//         "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       status: "declined",
//       sentDate: "3 days ago",
//       compatibility: 85
//     }
//   ],
//   receivedInterests: [
//     {
//       id: "4",
//       name: "Rahul Patel",
//       age: 32,
//       height: "160cm",
//       location: "Delhi",
//       occupation: "Teacher",
//       photos: [
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face&auto=format",
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       status: "pending",
//       receivedDate: "1 day ago",
//       compatibility: 90
//     },
//     {
//       id: "5",
//       name: "Arjun Reddy",
//       age: 29,
//       height: "175cm",
//       location: "Hyderabad",
//       occupation: "Engineer",
//       photos: [
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face&auto=format",
//         "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       status: "pending",
//       receivedDate: "5 hours ago",
//       compatibility: 94
//     },
//     {
//       id: "6",
//       name: "Ravi Kumar",
//       age: 30,
//       height: "170cm",
//       location: "Mumbai",
//       occupation: "Engineer",
//       photos: [
//         "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face&auto=format",
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face&auto=format"
//       ],
//       status: "pending",
//       receivedDate: "2 days ago",
//       compatibility: 87
//     }
//   ]
// };
 
// const PhotoCarousel = ({ photos }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
 
//   const handleNext = () => {
//     setActiveIndex((prevIndex) => (prevIndex + 1) % photos.length);
//   };
 
//   const handlePrev = () => {
//     setActiveIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
//   };
 
//   return (
//     <div className="relative h-40 overflow-hidden rounded-xl group">
//       <Image
//         src={photos[activeIndex]}
//         alt="Profile"
//         width={400}
//         height={600}
//         className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//       />
     
//       {photos.length > 1 && (
//         <>
//           <button
//             onClick={handlePrev}
//             className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
//           >
//             <ChevronLeft size={12} />
//           </button>
//           <button
//             onClick={handleNext}
//             className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
//           >
//             <ChevronRight size={12} />
//           </button>
         
//           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
//             {photos.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setActiveIndex(index)}
//                 className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//                   index === activeIndex ? 'bg-white w-3' : 'bg-white/60'
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}
     
//       {/* Status overlay */}
//       <div className="absolute top-2 right-2">
//         <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
//           <Star size={10} className="text-yellow-500 fill-current" />
//           <span className="text-xs font-semibold text-gray-800">Premium</span>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// const StatusBadge = ({ status }) => {
//   const getStatusConfig = (status) => {
//     switch (status) {
//       case 'accepted':
//         return {
//           icon: CheckCircle,
//           text: 'Accepted',
//           bgColor: 'bg-green-100',
//           textColor: 'text-green-700',
//           iconColor: 'text-green-600'
//         };
//       case 'declined':
//         return {
//           icon: X,
//           text: 'Declined',
//           bgColor: 'bg-red-100',
//           textColor: 'text-red-700',
//           iconColor: 'text-red-600'
//         };
//       default:
//         return {
//           icon: Clock,
//           text: 'Pending',
//           bgColor: 'bg-yellow-100',
//           textColor: 'text-yellow-700',
//           iconColor: 'text-yellow-600'
//         };
//     }
//   };
 
//   const config = getStatusConfig(status);
//   const Icon = config.icon;
 
//   return (
//     <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bgColor}`}>
//       <Icon size={12} className={config.iconColor} />
//       <span className={`text-xs font-semibold ${config.textColor}`}>
//         {config.text}
//       </span>
//     </div>
//   );
// };
 
// const InterestCard = ({ interest, type, onAccept, onDecline }) => {
//   const [showActions, setShowActions] = useState(false);
 
//   const handleAccept = () => {
//     onAccept(interest.id);
//     setShowActions(false);
//   };
 
//   const handleDecline = () => {
//     onDecline(interest.id);
//     setShowActions(false);
//   };
 
//   return (
//     <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
//       <PhotoCarousel photos={interest.photos} />
     
//       <div className="p-4">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-3">
//           <div className="flex-1">
//             <h3 className="text-lg font-bold text-gray-900 mb-1">
//               {interest.name}
//             </h3>
//             <div className="text-sm text-gray-600 space-y-1">
//               <div className="flex items-center gap-1.5">
//                 <span>{interest.age} yrs</span>
//                 <span>•</span>
//                 <span>{interest.height}</span>
//                 <span>•</span>
//                 <span>{interest.location}</span>
//               </div>
//               <div className="text-xs text-gray-500">
//                 {interest.occupation}
//               </div>
//             </div>
//           </div>
         
//           {/* Contact Icons */}
//           <div className="flex gap-2 ml-2">
//             <button className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
//               <Phone size={12} className="text-blue-600" />
//             </button>
//             <button className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors">
//               <MessageCircle size={12} className="text-green-600" />
//             </button>
//           </div>
//         </div>
 
//         {/* Compatibility Score */}
//         <div className="flex items-center gap-2 mb-3">
//           <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1.5 rounded-full">
//             <Sparkles size={12} className="text-purple-600" />
//             <span className="text-xs font-semibold text-purple-700">
//               {interest.compatibility}% Match
//             </span>
//           </div>
//           <StatusBadge status={interest.status} />
//         </div>
 
//         {/* Date */}
//         <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
//           <Clock size={10} />
//           <span>
//             {type === 'sent' ? `Sent ${interest.sentDate}` : `Received ${interest.receivedDate}`}
//           </span>
//         </div>
 
//         {/* Action Buttons */}
//         {type === 'received' && interest.status === 'pending' ? (
//           <div className="flex gap-2">
//             <button
//               onClick={handleDecline}
//               className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm flex items-center justify-center gap-2"
//             >
//               <X size={12} />
//               Decline
//             </button>
//             <button
//               onClick={handleAccept}
//               className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200 text-sm flex items-center justify-center gap-2"
//             >
//               <Heart size={12} />
//               Accept
//             </button>
//           </div>
//         ) : (
//           <div className="flex gap-2">
//             <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm flex items-center justify-center gap-2">
//               <MessageCircle size={12} />
//               View Profile
//             </button>
//             {interest.status === 'accepted' && (
//               <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 text-sm flex items-center justify-center gap-2">
//                 <Calendar size={12} />
//                 Schedule Meet
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
 
// const StatsCard = ({ icon: Icon, title, count, subtitle, gradient, iconBg }) => (
//   <div className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl text-white relative overflow-hidden`}>
//     <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
//     <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-4 -translate-x-4"></div>
   
//     <div className="relative z-10">
//       <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
//         <Icon size={24} className="text-white" />
//       </div>
//       <div className="text-3xl font-bold mb-1">{count}</div>
//       <div className="text-lg font-semibold mb-1">{title}</div>
//       <div className="text-sm opacity-90">{subtitle}</div>
//     </div>
//   </div>
// );
 
// const InterestPage = () => {
//   const [activeTab, setActiveTab] = useState('received');
//   const [sentInterests, setSentInterests] = useState(interestData.sentInterests);
//   const [receivedInterests, setReceivedInterests] = useState(interestData.receivedInterests);
 
//   const handleAcceptInterest = (id) => {
//     setReceivedInterests(prev =>
//       prev.map(interest =>
//         interest.id === id
//           ? { ...interest, status: 'accepted' }
//           : interest
//       )
//     );
//   };
 
//   const handleDeclineInterest = (id) => {
//     setReceivedInterests(prev =>
//       prev.map(interest =>
//         interest.id === id
//           ? { ...interest, status: 'declined' }
//           : interest
//       )
//     );
//   };
 
//   const pendingReceivedCount = receivedInterests.filter(i => i.status === 'pending').length;
//   const acceptedCount = [...sentInterests, ...receivedInterests].filter(i => i.status === 'accepted').length;
//   const totalSentCount = sentInterests.length;
 
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="px-4 py-6">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//                 <Heart className="text-rose-500" size={28} />
//                 Interests
//               </h1>
//               <p className="text-gray-600 mt-1">Manage your sent and received interests</p>
//             </div>
//             <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
//               {pendingReceivedCount} New
//             </div>
//           </div>
 
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <StatsCard
//               icon={Users}
//               title="Received"
//               count={pendingReceivedCount}
//               subtitle="Awaiting your response"
//               gradient="from-blue-500 to-blue-600"
//               iconBg="bg-white/20"
//             />
//             <StatsCard
//               icon={Heart}
//               title="Sent"
//               count={totalSentCount}
//               subtitle="Interests you've sent"
//               gradient="from-rose-500 to-pink-600"
//               iconBg="bg-white/20"
//             />
//             <StatsCard
//               icon={CheckCircle}
//               title="Matches"
//               count={acceptedCount}
//               subtitle="Mutual interests"
//               gradient="from-green-500 to-green-600"
//               iconBg="bg-white/20"
//             />
//           </div>
 
//           {/* Tab Navigation */}
//           <div className="flex bg-gray-100 rounded-xl p-1">
//             <button
//               onClick={() => setActiveTab('received')}
//               className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-sm flex items-center justify-center cursor-pointer gap-2 ${
//                 activeTab === 'received'
//                   ? 'bg-white text-rose-600 shadow-sm'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               <Users size={16} />
//               Received ({receivedInterests.length})
//             </button>
//             <button
//               onClick={() => setActiveTab('sent')}
//               className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-sm flex items-center justify-center cursor-pointer gap-2 ${
//                 activeTab === 'sent'
//                   ? 'bg-white text-rose-600 shadow-sm'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               <Heart size={16} />
//               Sent ({sentInterests.length})
//             </button>
//           </div>
//         </div>
//       </div>
 
//       {/* Content */}
//       <div className="px-4 py-6">
//         {activeTab === 'received' ? (
//           <div>
//             {receivedInterests.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {receivedInterests.map((interest) => (
//                   <InterestCard
//                     key={interest.id}
//                     interest={interest}
//                     type="received"
//                     onAccept={handleAcceptInterest}
//                     onDecline={handleDeclineInterest}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-16">
//                 <div className="text-6xl mb-4">💕</div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">No interests received yet</h3>
//                 <p className="text-gray-600 mb-6">Make your profile more attractive to get more interests</p>
//                 <button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 mx-auto">
//                   <Gift size={16} />
//                   Upgrade Profile
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div>
//             {sentInterests.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {sentInterests.map((interest) => (
//                   <InterestCard
//                     key={interest.id}
//                     interest={interest}
//                     type="sent"
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-16">
//                 <div className="text-6xl mb-4">💌</div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">No interests sent yet</h3>
//                 <p className="text-gray-600 mb-6">Start sending interests to find your perfect match</p>
//                 <button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 mx-auto">
//                   <ArrowRight size={16} />
//                   Browse Matches
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
 
// export default InterestPage;


"use client"
import React, { useState, useEffect } from 'react';
import {
  Heart,
  MessageSquare,
  Phone,
  Video,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  MapPin,
  Briefcase,
  Calendar,
  Zap,
  Sparkles,
  Users,
  TrendingUp,
  Award,
  Coffee,
  Music,
  Camera,
  BookOpen,
  Plane,
  Dumbbell,
  Send,
  Mail,
  Eye,
  Gift
} from 'lucide-react';
 
// Enhanced sample data with more profiles
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
    },
    {
      id: 11,
      name: "Aditya Sharma",
      age: 27,
      location: "Pune",
      profession: "Consultant",
      company: "McKinsey",
      photos: [
        "https://images.unsplash.com/photo-1558203728-00f45181dd84?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 89,
      interests: ["Business", "Travel", "Sports"],
      timeAgo: "6h",
      isOnline: false,
      verified: true,
      premium: true
    },
    {
      id: 12,
      name: "Nikhil Gupta",
      age: 25,
      location: "Gurgaon",
      profession: "Startup Founder",
      company: "TechCorp",
      photos: [
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 87,
      interests: ["Entrepreneurship", "Tech", "Gaming"],
      timeAgo: "8h",
      isOnline: true,
      verified: false,
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
    },
    {
      id: 14,
      name: "Riya Singh",
      age: 26,
      location: "Jaipur",
      profession: "Teacher",
      company: "DPS",
      photos: [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 91,
      interests: ["Education", "Reading", "Music"],
      timeAgo: "4d",
      status: "viewed",
      isOnline: false,
      verified: true,
      premium: false
    },
    {
      id: 15,
      name: "Pooja Nair",
      age: 23,
      location: "Kochi",
      profession: "Graphic Designer",
      company: "Ogilvy",
      photos: [
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      compatibility: 88,
      interests: ["Design", "Photography", "Art"],
      timeAgo: "5d",
      status: "pending",
      isOnline: true,
      verified: true,
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
  ]
};
 
const InterestCard = ({ person, type, onAction }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
 
  useEffect(() => {
    if (person.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % person.photos.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [person.photos.length]);
 
  return (
    <div className="bg-white  cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden ">
        <img
          src={person.photos[currentPhotoIndex]}
          alt={person.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
       
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-2 left-2 flex items-center gap-1">
          {person.isOnline && (
            <div className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
              Online
            </div>
          )}
          {person.verified && (
            <div className="bg-blue-500 text-white p-1 rounded-full">
              <CheckCircle2 size={10} />
            </div>
          )}
          {person.premium && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-1 rounded-full">
              <Star size={10} />
            </div>
          )}
        </div>
       
        <div className="absolute top-2 right-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
          <Sparkles size={8} />
          {person.compatibility}%
        </div>
 
        {/* Photo Indicators */}
        {person.photos.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {person.photos.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
 
      {/* Content */}
      <div className="p-3">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-sm truncate">{person.name}</h3>
            <p className="text-xs text-gray-600">{person.age} years • {person.location}</p>
          </div>
          {type === 'sent' && person.status && (
            <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              person.status === 'viewed'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {person.status === 'viewed' ? 'Viewed' : 'Pending'}
            </div>
          )}
        </div>
 
        {/* Profession */}
        <div className="flex items-center text-xs text-gray-600 mb-2">
          <Briefcase size={10} className="mr-1 text-gray-400" />
          <span className="truncate">{person.profession}</span>
        </div>
 
        {/* Interests */}
        <div className="flex flex-wrap gap-1 mb-2">
          {person.interests.slice(0, 2).map((interest, index) => (
            <span
              key={index}
              className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
 
        {/* Time */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock size={10} />
            {type === 'matched' ? `${person.matchedDate} ago` :
             type === 'sent' ? `${person.timeAgo} ago` :
             `${person.timeAgo} ago`}
          </div>
          <div className="flex gap-1">
            <button className="w-5 h-5 cursor-pointer bg-blue-50 hover:bg-blue-100 rounded-full flex items-center justify-center">
              <Phone size={8} className="text-blue-600" />
            </button>
            <button className="w-5 h-5  cursor-pointer bg-green-50 hover:bg-green-100 rounded-full flex items-center justify-center">
              <MessageSquare size={8} className="text-green-600" />
            </button>
          </div>
        </div>
 
        {/* Actions */}
        {type === 'incoming' && (
          <div className="flex gap-2">
            <button
              onClick={() => onAction(person.id, 'decline')}
              className="flex-1  cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1"
            >
              <XCircle size={10} />
              Pass
            </button>
            <button
              onClick={() => onAction(person.id, 'accept')}
              className="flex-1  cursor-pointer bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1"
            >
              <Heart size={10} />
              Like
            </button>
          </div>
        )}
       
        {type === 'matched' && (
          <div className="space-y-1.5">
            <button className="w-full  cursor-pointer bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1">
              <MessageSquare size={10} />
              Message
            </button>
            <div className="flex gap-1.5">
              <button className="flex-1  cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1">
                <Phone size={8} />
                Call
              </button>
              <button className="flex-1  cursor-pointer bg-purple-50 hover:bg-purple-100 text-purple-600 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1">
                <Video size={8} />
                Video
              </button>
              <button className="flex-1  cursor-pointer bg-pink-50 hover:bg-pink-100 text-pink-600 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1">
                <Calendar size={8} />
                Meet
              </button>
            </div>
          </div>
        )}
 
        {type === 'sent' && (
          <button className="w-full  cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1">
            <Eye size={10} />
            View Profile
          </button>
        )}
      </div>
    </div>
  );
};
 
const ModernInterestsPage = () => {
  const [activeTab, setActiveTab] = useState('incoming');
  const [data, setData] = useState(interestData);
 
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
    }
  };
 
  const tabs = [
    { id: 'incoming', label: 'New Interests', count: data.incoming.length, icon: Mail },
    { id: 'matched', label: 'Matches', count: data.matched.length, icon: Heart },
    { id: 'sent', label: 'Sent', count: data.sent.length, icon: Send }
  ];
 
  const currentData = data[activeTab] || [];
 
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
                  className={`relative  cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
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
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {activeTab === 'incoming' && 'No new interests'}
              {activeTab === 'matched' && 'No matches yet'}
              {activeTab === 'sent' && 'No sent interests'}
            </h3>
            <p className="text-gray-600 mb-6 text-sm max-w-xs mx-auto">
              {activeTab === 'incoming' && 'Complete your profile to receive more interests'}
              {activeTab === 'matched' && 'Start liking profiles to create connections'}
              {activeTab === 'sent' && 'Browse and send interests to people you like'}
            </p>
            <button className="bg-gradient-to-r  cursor-pointer from-pink-500 to-rose-500 text-white px-6 py-2.5 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transition-all flex items-center gap-2 mx-auto text-sm">
              <Gift size={14} />
              {activeTab === 'incoming' ? 'Enhance Profile' : 'Discover Matches'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default ModernInterestsPage;
 