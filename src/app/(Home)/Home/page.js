
"use client"
import React, { useState,useEffect } from 'react';
import { Search, Bell, Menu, Camera, Shield, Star, Heart, MapPin, ArrowRight, Plus } from 'lucide-react';
import ViewDrive from '../../components/User/ViewDrives';
import Image from 'next/image';

const MatrimonyHomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Regular');
  const [Name,setName] = useState('User');

  useEffect(()=>{
    const storedName = localStorage.getItem('firstName');
    if (storedName) {
      setName(storedName);
    }
  },[]);

  const profileCards = [
    {
      id: 1,
      name: 'Rajilakshmi',
      age: 20,
      height: "5'0\"",
      location: 'Chennai',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c9c1293a?w=200&h=250&fit=crop&crop=face',
      isOnline: true
    },
    {
      id: 2,
      name: 'Sweetrani',
      age: 18,
      height: "5'0\"",
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=250&fit=crop&crop=face',
      isOnline: true
    },
    {
      id: 3,
      name: 'Sujitha.M',
      age: 22,
      height: "5'1\"",
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=250&fit=crop&crop=face',
      isOnline: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
       {/* <div className="relative z-10 bg-gray-50">
              <div className="container mx-auto px-4 py-6 flex justify-between">
                <div>
                 <h1 className="text-3xl font-bold text-[#FF6B6B]">
                     VivaahAI
                    </h1>
                </div>
                <div>
                  <span className='mr-3 mt-4 text-black'>Hi ,Karthik kumar</span>

                  <button><Bell className='text-[#FF6B6B] mr-4 h-5 w-5'/></button>
                 <button className='bg-[#FF6B6B] p-1 text-white rounded-md cursor-pointer transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm'>Logout</button>
                </div>
              </div>
            </div> */}
      <header className="bg-gradient-to-r from-red-400 to-pink-400 text-white px-4 md:px-6 py-4 rounded-b-3xl shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('Regular')}
              className={`px-5 py-2.5 rounded-full font-semibold transition-all ${
                activeTab === 'Regular'
                  ? 'bg-white/30 text-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Regular
            </button>
            <button
              onClick={() => setActiveTab('PRIME')}
              className={`px-5 py-2.5 rounded-full font-semibold transition-all ${
                activeTab === 'PRIME'
                  ? 'bg-white/30 text-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              PRIME ●
            </button>
          </div>
         
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* User Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 -mt-3 mb-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-red-50 border-4 border-red-400 rounded-full flex items-center justify-center text-3xl">
                  👤
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Camera size={12} className="text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{Name}</h2>
                <p className="text-gray-600 text-sm">VivaahAI Matrimony</p>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-gray-600 text-sm">Free Member</span>
                  <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-1 rounded-full text-xs font-semibold transition-colors">
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Camera, label: 'Add', sublabel: 'Photo(s)', color: 'green', bgColor: 'bg-green-50' },
            { icon: Shield, label: 'Verify', sublabel: 'Profile', color: 'blue', bgColor: 'bg-blue-50' },
            { icon: Star, label: 'Add', sublabel: 'Horoscope', color: 'purple', bgColor: 'bg-purple-50' }
          ].map((action, index) => (
            <button key={index} className="flex flex-col items-center group">
              <div className="relative mb-3">
                <div className={`w-16 h-16 ${action.bgColor} rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                  <action.icon size={24} className={`text-${action.color}-800`} />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-${action.color}-500 rounded-full flex items-center justify-center border-2 border-[#FF6B6B]`}>
                  <Plus size={12} className="text-[#FF6B6B]" />
                </div>
              </div>
              <span className="font-semibold text-gray-900 text-sm">{action.label}</span>
              <span className="text-gray-600 text-xs">{action.sublabel}</span>
            </button>
          ))}
        </div>

        {/* Recommendations Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">💕 Daily Recommendations</h3>
              <p className="text-gray-600">Recommended matches for today</p>
            </div>
            <div className="bg-green-500 text-white px-4 py-3 rounded-xl text-center min-w-fit">
              <p className="text-xs mb-1">⏰ Time left to view</p>
              <p className="font-bold">09h:35m:07s</p>
            </div>
          </div>

          {/* Profile Cards */}
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 min-w-max md:grid md:grid-cols-3 md:gap-4 md:min-w-0">
              {profileCards.map((profile) => (
                <div key={profile.id} className="bg-white rounded-2xl shadow-lg overflow-hidden min-w-[200px] md:min-w-0 group hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      width={200}
                      height={250}
                      className="w-full h-56 object-cover"
                    />
                    {profile.isOnline && (
                      <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                    <button className="absolute bottom-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors">
                      <Heart size={16} className="text-red-400" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{profile.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{profile.age} Yrs, {profile.height}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={12} className="text-red-400 mr-1" />
                      {profile.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-white border-2 border-red-400 text-red-400 hover:bg-red-50 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition-colors">
            <span>View all matches</span>
            <ArrowRight size={16} />
          </button>

          {/* Stats Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Your Profile Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-red-400 mb-1">127</p>
                <p className="text-sm text-gray-600">Profile Views</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-400 mb-1">23</p>
                <p className="text-sm text-gray-600">Interests</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-400 mb-1">8</p>
                <p className="text-sm text-gray-600">Matches</p>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mb-8 py-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Profile Tips</h3>
            <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4">
              <div className="bg-red-400 p-3 rounded-full flex-shrink-0">
                <Camera size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 mb-3">Add more photos to get 3x more profile views!</p>
                <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-100 transition-colors">
                  Add Photos
                </button>
              </div>
            </div>
          </div>
          <div>
            <ViewDrive />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrimonyHomeScreen;