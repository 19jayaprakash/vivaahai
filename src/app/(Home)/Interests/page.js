"use client"
import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Phone,
  Clock,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Gift,
  Calendar,
  ArrowRight,
  Users,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
 
// Sample interest data
const interestData = {
  sentInterests: [
    {
      id: "1",
      name: "Priya Sharma",
      age: 25,
      height: "140cm",
      location: "Mumbai",
      occupation: "Doctor",
      photos: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face&auto=format",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      status: "pending",
      sentDate: "2 days ago",
      compatibility: 92
    },
    {
      id: "2",
      name: "Ananya Gupta",
      age: 27,
      height: "150cm",
      location: "Bangalore",
      occupation: "Engineer",
      photos: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face&auto=format",
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      status: "accepted",
      sentDate: "1 week ago",
      compatibility: 88
    },
    {
      id: "3",
      name: "Kavya Nair",
      age: 24,
      height: "158cm",
      location: "Kochi",
      occupation: "Teacher",
      photos: [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face&auto=format",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      status: "declined",
      sentDate: "3 days ago",
      compatibility: 85
    }
  ],
  receivedInterests: [
    {
      id: "4",
      name: "Rahul Patel",
      age: 32,
      height: "160cm",
      location: "Delhi",
      occupation: "Teacher",
      photos: [
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face&auto=format",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      status: "pending",
      receivedDate: "1 day ago",
      compatibility: 90
    },
    {
      id: "5",
      name: "Arjun Reddy",
      age: 29,
      height: "175cm",
      location: "Hyderabad",
      occupation: "Engineer",
      photos: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face&auto=format",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      status: "pending",
      receivedDate: "5 hours ago",
      compatibility: 94
    },
    {
      id: "6",
      name: "Ravi Kumar",
      age: 30,
      height: "170cm",
      location: "Mumbai",
      occupation: "Engineer",
      photos: [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face&auto=format",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face&auto=format"
      ],
      status: "pending",
      receivedDate: "2 days ago",
      compatibility: 87
    }
  ]
};
 
const PhotoCarousel = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
 
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };
 
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };
 
  return (
    <div className="relative h-40 overflow-hidden rounded-xl group">
      <Image
        src={photos[activeIndex]}
        alt="Profile"
        width={400}
        height={600}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
     
      {photos.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ChevronRight size={12} />
          </button>
         
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-white w-3' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
     
      {/* Status overlay */}
      <div className="absolute top-2 right-2">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star size={10} className="text-yellow-500 fill-current" />
          <span className="text-xs font-semibold text-gray-800">Premium</span>
        </div>
      </div>
    </div>
  );
};
 
const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'accepted':
        return {
          icon: CheckCircle,
          text: 'Accepted',
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          iconColor: 'text-green-600'
        };
      case 'declined':
        return {
          icon: X,
          text: 'Declined',
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          iconColor: 'text-red-600'
        };
      default:
        return {
          icon: Clock,
          text: 'Pending',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-700',
          iconColor: 'text-yellow-600'
        };
    }
  };
 
  const config = getStatusConfig(status);
  const Icon = config.icon;
 
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bgColor}`}>
      <Icon size={12} className={config.iconColor} />
      <span className={`text-xs font-semibold ${config.textColor}`}>
        {config.text}
      </span>
    </div>
  );
};
 
const InterestCard = ({ interest, type, onAccept, onDecline }) => {
  const [showActions, setShowActions] = useState(false);
 
  const handleAccept = () => {
    onAccept(interest.id);
    setShowActions(false);
  };
 
  const handleDecline = () => {
    onDecline(interest.id);
    setShowActions(false);
  };
 
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
      <PhotoCarousel photos={interest.photos} />
     
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {interest.name}
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-1.5">
                <span>{interest.age} yrs</span>
                <span>•</span>
                <span>{interest.height}</span>
                <span>•</span>
                <span>{interest.location}</span>
              </div>
              <div className="text-xs text-gray-500">
                {interest.occupation}
              </div>
            </div>
          </div>
         
          {/* Contact Icons */}
          <div className="flex gap-2 ml-2">
            <button className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
              <Phone size={12} className="text-blue-600" />
            </button>
            <button className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors">
              <MessageCircle size={12} className="text-green-600" />
            </button>
          </div>
        </div>
 
        {/* Compatibility Score */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1.5 rounded-full">
            <Sparkles size={12} className="text-purple-600" />
            <span className="text-xs font-semibold text-purple-700">
              {interest.compatibility}% Match
            </span>
          </div>
          <StatusBadge status={interest.status} />
        </div>
 
        {/* Date */}
        <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <Clock size={10} />
          <span>
            {type === 'sent' ? `Sent ${interest.sentDate}` : `Received ${interest.receivedDate}`}
          </span>
        </div>
 
        {/* Action Buttons */}
        {type === 'received' && interest.status === 'pending' ? (
          <div className="flex gap-2">
            <button
              onClick={handleDecline}
              className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <X size={12} />
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200 text-sm flex items-center justify-center gap-2"
            >
              <Heart size={12} />
              Accept
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm flex items-center justify-center gap-2">
              <MessageCircle size={12} />
              View Profile
            </button>
            {interest.status === 'accepted' && (
              <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 text-sm flex items-center justify-center gap-2">
                <Calendar size={12} />
                Schedule Meet
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
 
const StatsCard = ({ icon: Icon, title, count, subtitle, gradient, iconBg }) => (
  <div className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl text-white relative overflow-hidden`}>
    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-4 -translate-x-4"></div>
   
    <div className="relative z-10">
      <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="text-3xl font-bold mb-1">{count}</div>
      <div className="text-lg font-semibold mb-1">{title}</div>
      <div className="text-sm opacity-90">{subtitle}</div>
    </div>
  </div>
);
 
const InterestPage = () => {
  const [activeTab, setActiveTab] = useState('received');
  const [sentInterests, setSentInterests] = useState(interestData.sentInterests);
  const [receivedInterests, setReceivedInterests] = useState(interestData.receivedInterests);
 
  const handleAcceptInterest = (id) => {
    setReceivedInterests(prev =>
      prev.map(interest =>
        interest.id === id
          ? { ...interest, status: 'accepted' }
          : interest
      )
    );
  };
 
  const handleDeclineInterest = (id) => {
    setReceivedInterests(prev =>
      prev.map(interest =>
        interest.id === id
          ? { ...interest, status: 'declined' }
          : interest
      )
    );
  };
 
  const pendingReceivedCount = receivedInterests.filter(i => i.status === 'pending').length;
  const acceptedCount = [...sentInterests, ...receivedInterests].filter(i => i.status === 'accepted').length;
  const totalSentCount = sentInterests.length;
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Heart className="text-rose-500" size={28} />
                Interests
              </h1>
              <p className="text-gray-600 mt-1">Manage your sent and received interests</p>
            </div>
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {pendingReceivedCount} New
            </div>
          </div>
 
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatsCard
              icon={Users}
              title="Received"
              count={pendingReceivedCount}
              subtitle="Awaiting your response"
              gradient="from-blue-500 to-blue-600"
              iconBg="bg-white/20"
            />
            <StatsCard
              icon={Heart}
              title="Sent"
              count={totalSentCount}
              subtitle="Interests you've sent"
              gradient="from-rose-500 to-pink-600"
              iconBg="bg-white/20"
            />
            <StatsCard
              icon={CheckCircle}
              title="Matches"
              count={acceptedCount}
              subtitle="Mutual interests"
              gradient="from-green-500 to-green-600"
              iconBg="bg-white/20"
            />
          </div>
 
          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('received')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-sm flex items-center justify-center cursor-pointer gap-2 ${
                activeTab === 'received'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Users size={16} />
              Received ({receivedInterests.length})
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-sm flex items-center justify-center cursor-pointer gap-2 ${
                activeTab === 'sent'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Heart size={16} />
              Sent ({sentInterests.length})
            </button>
          </div>
        </div>
      </div>
 
      {/* Content */}
      <div className="px-4 py-6">
        {activeTab === 'received' ? (
          <div>
            {receivedInterests.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {receivedInterests.map((interest) => (
                  <InterestCard
                    key={interest.id}
                    interest={interest}
                    type="received"
                    onAccept={handleAcceptInterest}
                    onDecline={handleDeclineInterest}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">💕</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No interests received yet</h3>
                <p className="text-gray-600 mb-6">Make your profile more attractive to get more interests</p>
                <button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 mx-auto">
                  <Gift size={16} />
                  Upgrade Profile
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {sentInterests.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sentInterests.map((interest) => (
                  <InterestCard
                    key={interest.id}
                    interest={interest}
                    type="sent"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">💌</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No interests sent yet</h3>
                <p className="text-gray-600 mb-6">Start sending interests to find your perfect match</p>
                <button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 mx-auto">
                  <ArrowRight size={16} />
                  Browse Matches
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
 
export default InterestPage;