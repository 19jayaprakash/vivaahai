"use client";
import React, { useState, useEffect } from 'react';
import { axiosPublic } from '../../../base/constant';
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
  Camera,
  Mail,
  User,
  Clock,
  Home,
  Globe,
  Languages,
  Utensils,
  Cigarette,
  Wine,
  FileText,
  Building,
  DollarSign,
  UserCheck,
  Zap,
  Target,
  Award,
  School,
  MapPin as Location,
  PhoneCall,
  Hash,
  Eye,
  UserPlus
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
 
// Default/placeholder photos - you might want to add a default photo field to your API
const defaultPhotos = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face&auto=format"
];
 
const PhotoGallery = ({ photos = defaultPhotos }) => {
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
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-[#FF6B6B] rounded-xl flex items-center justify-center">
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="text-lg font-bold text-[#FF6B6B]">{title}</h3>
    </div>
    {children}
  </div>
);
 
const DetailItem = ({ icon: Icon, label, value, iconColor = "text-gray-400" }) => (
  <div className="flex items-start gap-3 py-2">
    <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5">
      <Icon size={16} className={iconColor} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="font-medium text-gray-900 break-words">{value || 'N/A'}</div>
    </div>
  </div>
);
 
const ProfileViewPage = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id;
 
  // Helper function to calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
 
  // Helper function to get full name
  const getFullName = (profile) => {
    if (!profile) return '';
    const firstName = profile.firstName || '';
    const lastName = profile.lastName || '';
    return `${firstName} ${lastName}`.trim();
  };
 
  // Helper function to format siblings data
  const formatSiblings = (siblings) => {
    if (!siblings || !Array.isArray(siblings) || siblings.length === 0) {
      return 'No siblings';
    }
   
    return siblings.map(sibling => {
      const type = sibling.type || '';
      const gender = sibling.gender || '';
      const status = sibling.maritalStatus || '';
      return `${type} ${gender} (${status})`;
    }).join(', ');
  };
 
  // Helper function to format text
  const formatText = (text) => {
    if (!text) return 'N/A';
    return text.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };
 
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axiosPublic.get(
          `/user/get-full-userProfile?selectedUserId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
             
            }
          }
        );
        setProfileData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to load profile data');
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    }
 
    if (id) {
      fetchData();
    }
  }, [id]);
 
  const handleBack = () => {
    router.back();
  };
 
  const handleSendInterest = () => {
    const name = getFullName(profileData?.userProfile);
    toast.success(`Interest sent to ${name}!`);
  };
 
  const handleScheduleMeet = () => {
    setShowScheduleModal(true);
  };
 
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF6B6B] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }
 
  // Error state
  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Profile not found'}</p>
          <button
            onClick={handleBack}
            className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#FF5555] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
 
  const { userProfile, partnerPreference, professional, family, interests } = profileData;
 
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
         
          {/* <div className="flex items-center gap-3">
            <button className="p-2 rounded-full cursor-pointer bg-orange-100 hover:bg-orange-200 transition-colors">
              <Phone size={18} className="text-orange-600" />
            </button>
            <button className="p-2 rounded-full cursor-pointer bg-green-100 hover:bg-green-200 transition-colors">
              <MessageCircle size={18} className="text-green-600" />
            </button>
          </div> */}
        </div>
      </div>
 
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Photos and Quick Info */}
          <div className="lg:col-span-1 space-y-6">
            <PhotoGallery photos={defaultPhotos} />
           
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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Activity Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">Active</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Hash size={12} className="text-gray-400" />
                    Profile ID
                  </span>
                  <span className="font-medium text-gray-900">{userProfile?.profileId || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <UserPlus size={12} className="text-gray-400" />
                    Member since
                  </span>
                  <span className="font-medium text-gray-900">
                    {userProfile?.createdAt ? new Date(userProfile.createdAt).getFullYear() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
 
          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-2xl font-bold text-[#FF6B6B]">
                      {getFullName(userProfile)}
                    </h1>
                    {userProfile?.isBasicProfileSubmitted && (
                      <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full">
                        <Shield size={12} className="text-blue-600" />
                        <span className="text-xs font-medium text-blue-800">Verified</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={14} className="text-gray-400" />
                      <span>{calculateAge(userProfile?.dateOfBirth)} years old</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Ruler size={14} className="text-gray-400" />
                      <span>{userProfile?.height || 'N/A'} cm</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={14} className="text-gray-400" />
                      <span>{userProfile?.city || 'N/A'}</span>
                    </div>
                  </div>
                </div>
               
                <div className="flex items-center gap-1 bg-yellow-100 px-3 py-2 rounded-full">
                  <Star size={14} className="text-yellow-600 fill-current" />
                  <span className="text-sm font-semibold text-yellow-800">Featured Profile</span>
                </div>
              </div>
            </div>
 
            {/* Basic Details */}
            <InfoCard title="Basic Details" icon={User}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <DetailItem
                  icon={Location}
                  label="Location"
                  value={`${userProfile?.city || 'N/A'}, ${userProfile?.state || 'N/A'}`}
                  iconColor="text-blue-500"
                />
                
                <DetailItem
                  icon={Globe}
                  label="Religion"
                  value={userProfile?.religion}
                  iconColor="text-indigo-500"
                />
               
                <DetailItem
                  icon={Calendar}
                  label="Date of Birth"
                  value={userProfile?.dateOfBirth ? new Date(userProfile.dateOfBirth).toLocaleDateString() : 'N/A'}
                  iconColor="text-red-500"
                />
 
                <DetailItem
                  icon={Users}
                  label="Caste"
                  value={userProfile?.caste}
                  iconColor="text-teal-500"
                />
 
                <DetailItem
                  icon={Ruler}
                  label="Height"
                  value={`${userProfile?.height || 'N/A'} cm`}
                  iconColor="text-green-500"
                />
               
                <DetailItem
                  icon={Languages}
                  label="Mother Tongue"
                  value={userProfile?.motherTongue}
                  iconColor="text-pink-500"
                />
 
                <DetailItem
                  icon={Weight}
                  label="Weight"
                  value={`${userProfile?.weight || 'N/A'} kg`}
                  iconColor="text-purple-500"
                />
 
                <DetailItem
                  icon={UserCheck}
                  label="Marital Status"
                  value={formatText(userProfile?.maritalStatus)}
                  iconColor="text-cyan-500"
                />
              </div>
            </InfoCard>
 
            {/* Additional Personal Details */}
            <InfoCard title="Lifestyle & Preferences" icon={Activity}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <DetailItem
                  icon={Star}
                  label="Zodiac Sign"
                  value={userProfile?.zodiacSign}
                  iconColor="text-yellow-500"
                />
               
                <DetailItem
                  icon={Utensils}
                  label="Diet Preferences"
                  value={formatText(userProfile?.dietPreferences)}
                  iconColor="text-green-600"
                />
 
                <DetailItem
                  icon={Zap}
                  label="Star Sign"
                  value={userProfile?.starSign}
                  iconColor="text-amber-500"
                />
 
                <DetailItem
                  icon={Cigarette}
                  label="Smoking Habits"
                  value={formatText(userProfile?.smokingHabits)}
                  iconColor="text-gray-600"
                />
 
                <DetailItem
                  icon={Activity}
                  label="Body Type"
                  value={formatText(userProfile?.bodyType)}
                  iconColor="text-blue-600"
                />
 
                <DetailItem
                  icon={Wine}
                  label="Drinking Habits"
                  value={formatText(userProfile?.drinkingHabits)}
                  iconColor="text-red-600"
                />
              </div>
            </InfoCard>
 
            {/* Professional Details */}
            {professional && (
              <InfoCard title="Professional Background" icon={Briefcase}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <DetailItem
                    icon={Briefcase}
                    label="Occupation"
                    value={professional.occupation}
                    iconColor="text-blue-600"
                  />
                 
                  <DetailItem
                    icon={GraduationCap}
                    label="Education Level"
                    value={professional.education}
                    iconColor="text-green-600"
                  />
 
                  <DetailItem
                    icon={Building}
                    label="Employment Type"
                    value={formatText(professional.employedIn)}
                    iconColor="text-purple-600"
                  />
 
                  <DetailItem
                    icon={DollarSign}
                    label="Annual Income"
                    value={professional.annualIncome}
                    iconColor="text-green-500"
                  />
 
                  <DetailItem
                    icon={Award}
                    label="Degree"
                    value={professional.degree}
                    iconColor="text-indigo-600"
                  />
 
                  <DetailItem
                    icon={School}
                    label="College/University"
                    value={professional.college}
                    iconColor="text-teal-600"
                  />
                </div>
              </InfoCard>
            )}
 
            {/* Family Details */}
            {family && (
              <InfoCard title="Family Information" icon={Users}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <DetailItem
                    icon={Home}
                    label="Family Type"
                    value={formatText(family.familyType)}
                    iconColor="text-blue-600"
                  />
                 
                  <DetailItem
                    icon={Heart}
                    label="Family Values"
                    value={formatText(family.familyValues)}
                    iconColor="text-red-500"
                  />
 
                  <DetailItem
                    icon={Briefcase}
                    label="Parents' Occupation"
                    value={family.parentsOccupations}
                    iconColor="text-gray-600"
                  />
 
                  <DetailItem
                    icon={Users}
                    label="Siblings"
                    value={formatSiblings(family.sibilings)}
                    iconColor="text-green-600"
                  />
                </div>
              </InfoCard>
            )}
 
            {/* Partner Preferences */}
            {partnerPreference && (
              <InfoCard title="Partner Preferences" icon={Heart}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <DetailItem
                    icon={Clock}
                    label="Preferred Age Range"
                    value={`${partnerPreference.minAge || 'N/A'} - ${partnerPreference.maxAge || 'N/A'} years`}
                    iconColor="text-orange-500"
                  />
                 
                  <DetailItem
                    icon={Ruler}
                    label="Preferred Height Range"
                    value={`${partnerPreference.minHeight || 'N/A'} - ${partnerPreference.maxHeight || 'N/A'} cm`}
                    iconColor="text-green-500"
                  />
 
                  <DetailItem
                    icon={Weight}
                    label="Preferred Weight Range"
                    value={`${partnerPreference.minWeight || 'N/A'} - ${partnerPreference.maxWeight || 'N/A'} kg`}
                    iconColor="text-purple-500"
                  />
 
                  <DetailItem
                    icon={GraduationCap}
                    label="Education Preference"
                    value={partnerPreference.educationLevel}
                    iconColor="text-blue-600"
                  />
                 
                  <DetailItem
                    icon={Briefcase}
                    label="Occupation Preference"
                    value={partnerPreference.occupation}
                    iconColor="text-indigo-600"
                  />
 
                  <DetailItem
                    icon={MapPin}
                    label="Location Preference"
                    value={`${partnerPreference.city || 'N/A'}, ${partnerPreference.state || 'N/A'}`}
                    iconColor="text-teal-500"
                  />
                </div>
              </InfoCard>
            )}
 
            {/* Contact Information */}
            <InfoCard title="Contact Information" icon={Phone}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <DetailItem
                  icon={Phone}
                  label="Primary Contact"
                  value={userProfile?.primaryContact}
                  iconColor="text-blue-600"
                />
               
                <DetailItem
                  icon={Mail}
                  label="Email Address"
                  value={userProfile?.email}
                  iconColor="text-red-500"
                />
 
                <DetailItem
                  icon={PhoneCall}
                  label="Secondary Contact"
                  value={userProfile?.secondaryContact}
                  iconColor="text-green-600"
                />
 
                <DetailItem
                  icon={Mail}
                  label="Alternate Email"
                  value={userProfile?.alternateEmail}
                  iconColor="text-purple-500"
                />
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
 
      {/* Floating Action Buttons for Mobile */}
      
    </div>
  );
};
 
export default ProfileViewPage;