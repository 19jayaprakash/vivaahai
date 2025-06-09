"use client";
import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  Ruler,
  Weight,
  Activity,
  Shield,
  ChevronLeft,
  ChevronRight,
  Star,
  X,
  CheckCircle,
  Camera
} from 'lucide-react';
import { useRouter, useParams} from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
 
// Sample profile data - in real app this would come from props/API
const profileData = {
  id: "1",
  name: "Priya Sharma",
  gender: "Female",
  weight: "50kg",
  age: 25,
  height: "140cm",
  state: "Tamil Nadu",
  location: "Chennai",
  occupation: "Doctor",
  caste: "Brahmin",
  educationlevel: "MBBS",
  region: "South",
  lifestyle: "Active",
  religion: "Hindu",
  motherTongue: "Tamil",
  maritalStatus: "Never Married",
  profileId: "M11594600",
  aboutMe: "I am a passionate doctor who loves helping people. I enjoy traveling, reading books, and practicing yoga in my free time. Looking for a life partner who shares similar values and supports my career aspirations.",
  familyDetails: {
    fatherOccupation: "Business",
    motherOccupation: "Teacher",
    siblings: "1 Sister (Married)",
    familyType: "Nuclear",
    familyValues: "Traditional"
  },
  interests: ["Travel", "Reading", "Yoga", "Cooking", "Music"],
  photos: [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face&auto=format",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face&auto=format",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face&auto=format",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face&auto=format"
  ],
  isVerified: true,
  lastActive: "2 hours ago",
  responseRate: "95%",
  preferences: {
    ageRange: "26-32",
    heightRange: "165cm-180cm",
    education: "Graduate or above",
    occupation: "Professional"
  }
};
 
const PhotoGallery = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
 
 
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };
 
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };
 
  return (
    <>
      <div className="relative">
        <div className="aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
          width={600}
          height={800}
            src={photos[activeIndex]}
            alt="Profile"
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setShowFullscreen(true)}
          />
        </div>
 
        {photos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
 
            <button
              onClick={handleNext}
              className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
 
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 cursor-pointer rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
 
        {/* Photo count badge */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <Camera size={12} />
          {photos.length}
        </div>
      </div>
 
      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
          >
            <X size={20} />
          </button>
         
          <Image
          width={600}
          height={800}
            src={photos[activeIndex]}
            alt="Profile"
            className="max-w-full max-h-full object-contain"
          />
         
          {photos.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3"
              >
                <ChevronLeft size={24} />
              </button>
 
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};
 
const InfoCard = ({ title, children, icon: Icon }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-[#FF6B6B] rounded-xl flex items-center justify-center">
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="text-lg font-bold text-[#FF6B6B]">{title}</h3>
    </div>
    {children}
  </div>
);
 
const ProfileViewPage = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  console.log(id);
 
  const handleBack = () => {
    // In real app, this would use router.back() or navigate back
    // console.log("Navigate back to matches");
    router.back();
  };
 
  const handleSendInterest = () => {
    toast.success(`Interest sent to ${profileData.name}!`);
  };
 
  const handleScheduleMeet = () => {
    setShowScheduleModal(true);
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
         
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full cursor-pointer bg-orange-100 hover:bg-orange-200 transition-colors">
              <Phone size={18} className="text-orange-600" />
            </button>
            <button className="p-2 rounded-full cursor-pointer bg-green-100 hover:bg-green-200 transition-colors">
              <MessageCircle size={18} className="text-green-600" />
            </button>
          </div>
        </div>
      </div>
 
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Photos and Quick Info */}
          <div className="lg:col-span-1 space-y-6">
            <PhotoGallery photos={profileData.photos} />
           
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSendInterest}
                className="bg-gradient-to-r cursor-pointer from-rose-500 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Heart size={16} />
                Send Interest
              </button>
              <button
                onClick={handleScheduleMeet}
                className="bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Calendar size={16} />
                Schedule Meet
              </button>
            </div>
 
            {/* Activity Status */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Activity</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Active</span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Last seen: {profileData.lastActive}</div>
                <div>Response rate: {profileData.responseRate}</div>
              </div>
            </div>
          </div>
 
          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-[#FF6B6B]">{profileData.name}</h1>
                    {profileData.isVerified && (
                      <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full">
                        <Shield size={12} className="text-blue-600" />
                        <span className="text-xs font-medium text-blue-800">Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-1">{profileData.profileId}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{profileData.age} years</span>
                    <span>•</span>
                    <span>{profileData.height}</span>
                    <span>•</span>
                    <span>{profileData.location}</span>
                  </div>
                </div>
               
                <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                  <Star size={14} className="text-yellow-600 fill-current" />
                  <span className="text-sm font-semibold text-yellow-800">90% Match</span>
                </div>
              </div>
 
              {profileData.aboutMe && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-[#FF6B6B] mb-2">About Me</h4>
                  <p className="text-gray-700 leading-relaxed">{profileData.aboutMe}</p>
                </div>
              )}
            </div>
 
            {/* Basic Details */}
            <InfoCard title="Basic Details" icon={Users}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-600">Location</span>
                      <p className="font-medium text-gray-900">{profileData.location}, {profileData.state}</p>
                    </div>
                  </div>
                 
                  <div className="flex items-center gap-3">
                    <Ruler size={16} className="text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-600">Height</span>
                      <p className="font-medium text-gray-900">{profileData.height}</p>
                    </div>
                  </div>
 
                  <div className="flex items-center gap-3">
                    <Weight size={16} className="text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-600">Weight</span>
                      <p className="font-medium text-gray-900">{profileData.weight}</p>
                    </div>
                  </div>
                </div>
 
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Religion</span>
                    <p className="font-medium text-gray-900">{profileData.religion}</p>
                  </div>
                 
                  <div>
                    <span className="text-sm text-gray-600">Mother Tongue</span>
                    <p className="font-medium text-gray-900">{profileData.motherTongue}</p>
                  </div>
 
                  <div>
                    <span className="text-sm text-gray-600">Marital Status</span>
                    <p className="font-medium text-gray-900">{profileData.maritalStatus}</p>
                  </div>
                </div>
              </div>
            </InfoCard>
 
            {/* Professional Details */}
            <InfoCard title="Professional Details" icon={Briefcase}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Briefcase size={16} className="text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Occupation</span>
                    <p className="font-medium text-gray-900">{profileData.occupation}</p>
                  </div>
                </div>
               
                <div className="flex items-center gap-3">
                  <GraduationCap size={16} className="text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Education</span>
                    <p className="font-medium text-gray-900">{profileData.educationlevel}</p>
                  </div>
                </div>
              </div>
            </InfoCard>
 
            {/* Family Details */}
            <InfoCard title="Family Details" icon={Users}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Father&apos;s Occupation</span>
                    <p className="font-medium text-gray-900">{profileData.familyDetails.fatherOccupation}</p>
                  </div>
                 
                  <div>
                    <span className="text-sm text-gray-600">Mother&apos;s Occupation</span>
                    <p className="font-medium text-gray-900">{profileData.familyDetails.motherOccupation}</p>
                  </div>
                </div>
 
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Siblings</span>
                    <p className="font-medium text-gray-900">{profileData.familyDetails.siblings}</p>
                  </div>
                 
                  <div>
                    <span className="text-sm text-gray-600">Family Type</span>
                    <p className="font-medium text-gray-900">{profileData.familyDetails.familyType}</p>
                  </div>
                </div>
              </div>
            </InfoCard>
 
            {/* Interests & Hobbies */}
            <InfoCard title="Interests & Hobbies" icon={Activity}>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-[#FF6B6B] text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </InfoCard>
 
            {/* Partner Preferences */}
            <InfoCard title="Partner Preferences" icon={Heart}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Age Range</span>
                  <p className="font-medium text-gray-900">{profileData.preferences.ageRange} years</p>
                </div>
               
                <div>
                  <span className="text-sm text-gray-600">Height Range</span>
                  <p className="font-medium text-gray-900">{profileData.preferences.heightRange}</p>
                </div>
               
                <div>
                  <span className="text-sm text-gray-600">Education</span>
                  <p className="font-medium text-gray-900">{profileData.preferences.education}</p>
                </div>
               
                <div>
                  <span className="text-sm text-gray-600">Occupation</span>
                  <p className="font-medium text-gray-900">{profileData.preferences.occupation}</p>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
 
      {/* Floating Action Buttons for Mobile */}
      <div className="fixed bottom-4 left-4 right-4 lg:hidden">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleSendInterest}
            className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <Heart size={16} />
            Send Interest
          </button>
          <button
            onClick={handleScheduleMeet}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <Calendar size={16} />
            Schedule Meet
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default ProfileViewPage;