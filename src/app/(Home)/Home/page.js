
"use client"
import React, { useState,useEffect } from 'react';
import { Search, Bell, Menu, Camera, Shield, Star, Heart, MapPin, ArrowRight, Plus, Sparkles, Briefcase, Clock, Phone, MessageSquare, Video, Calendar, Eye, Scale, Ruler, XCircle, CheckCircle2 } from 'lucide-react';
import ViewDrive from '../../components/User/ViewDrives';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { axiosPublic } from '../../base/constant';

const MatrimonyHomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Regular');
  const [Name,setName] = useState('User');
  const router = useRouter();

  const[profilePic,setProfilePic] = useState(null);

  useEffect(()=>{
    async function fetchImages() {
          try {
            const res = await axiosPublic.get('/user/userPhoto-details', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
           
            fetchProfileImage(res.data);
          } catch (error) {
            console.error('Error fetching image data:', error);
          }
        };
        fetchImages();
  },[]);

  async function fetchProfileImage(url) {
   
      const profilePic = url.find(pic => pic.isProfilePhoto === true);
      if(profilePic){
        const picName = profilePic.photoUrl.split("/");
        try {
          const res = await axiosPublic.get(
            `/user/display-photo?filename=ProfilePics/${picName[picName.length-1]}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              responseType: 'blob',
            }
          );
          const blobUrl = URL.createObjectURL(res.data);
          setProfilePic(blobUrl);
        } catch (error) {
          console.error('Failed to fetch image', error);
        }
      }
      }

  useEffect(()=>{
    const storedName = localStorage.getItem('firstName');
    if (storedName) {
      setName(storedName);
    }
  },[]);

  const[filteredMatches,setFilteredMatches] = useState([]);
    useEffect(()=>{
        axiosPublic.get(`/user/profile-recommendations`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
        .then(res =>{
          if(res.status === 200){
            setFilteredMatches(res.data.recommendations);
          }
        })
    },[]);


  const InterestCard = ({ person,type="incoming" }) => {

  function calculateAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
 
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
 
  return age;
}
 
  // useEffect(() => {
  //   if (person.photos.length > 1) {
  //     const interval = setInterval(() => {
  //       setCurrentPhotoIndex((prev) => (prev + 1) % person.photos.length);
  //     }, 4000);
  //     return () => clearInterval(interval);
  //   }
  // }, [person.photos.length]);
 
  return (
    <div className="bg-white  cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden ">
        {!person.photos ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-400 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">👤</span>
                    </div>
                    <p className="text-sm">Photo unavailable</p>
                  </div>
                </div>
              ) : (
                <Image
                  src={person.image}
                  width={400}
                  height={600}
                  alt="Profile"
                  className="w-full h-full object-cover  transition-transform duration-500 hover:scale-105 cursor-pointer"
                  loading="lazy"
                />
              )}
       
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
          {90}%
        </div>
 
        {/* Photo Indicators */}
        {/* {person.photos.length > 1 && (
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
        )} */}
      </div>
 
      {/* Content */}
      <div className="p-3">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-sm truncate">{person.firstName}</h3>
            <p className="text-xs text-gray-600">{calculateAge(person.dateOfBirth)} years • {person.city}</p>
          </div>
          {/* {type === 'sent' && person.status && (
            <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              person.status === 'viewed'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {person.status === 'viewed' ? 'Viewed' : 'Pending'}
            </div>
          )} */}
        </div>
 
        {/* Profession */}
        <div className="flex items-center text-xs text-gray-600 mb-2">
          <Ruler size={10} className="mr-1 text-gray-400" />
          <span className="truncate">{person.height} cm</span>
        </div>
 
        {/* Interests */}
        <div className="flex flex-wrap gap-1 mb-2">
            <span
              
              className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium"
            >
              {person.religion}
            </span>

            <span
              
              className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium"
            >
              {person.caste}
            </span>
         
        </div>
 
        {/* Time */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock size={10} />
             2h ago
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
 
        
          <button className="w-full  cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1" onClick={e =>{ router.push(`/Matches/${person.profileId}`);}}>
            <Eye size={10} />
            View Profile
          </button>
      </div>
    </div>
  );
};

const [timeLeft, setTimeLeft] = useState('');
 
  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // Set time to midnight
 
      const diff = midnight - now;
 
      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
 
      setTimeLeft(`${hours}h:${minutes}m:${seconds}s`);
    };
 
    updateTimeLeft(); // Call immediately
    const interval = setInterval(updateTimeLeft, 1000); // Update every second
 
    return () => clearInterval(interval); // Clean up
  }, []);

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
                  {profilePic ?
                  <Image
                  src={profilePic}
                  width={400}
                  height={600}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-105 cursor-pointer"
                  loading="lazy"
                /> 
                :
                 <> 👤 </>}
                </div>
                {/* <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Camera size={12} className="text-white" />
                </div> */}
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
            { icon: Camera, label: 'Add', sublabel: 'Photo(s)', color: 'green', bgColor: 'bg-green-50', onClick:()=>{router.push("/Profile")} },
            { icon: Shield, label: 'Verify', sublabel: 'Profile', color: 'blue', bgColor: 'bg-blue-50', onClick:()=>{} },
            { icon: Star, label: 'Add', sublabel: 'Horoscope', color: 'purple', bgColor: 'bg-purple-50', onClick:()=>{} }
          ].map((action, index) => (
            <button key={index} className="flex flex-col items-center group " onClick={action.onClick}>
              <div className="relative mb-3 cursor-pointer">
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
              <p className="font-bold">{timeLeft}</p>
            </div>
          </div>

          {/* Profile Cards */}
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 min-w-max md:grid md:grid-cols-5 md:gap-4 md:min-w-0">
              {filteredMatches.map((profile) => (
                <div key={profile.profileId}>
                <InterestCard person={profile}  />
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-white border-2 cursor-pointer border-red-400 text-red-400 hover:bg-red-50 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition-colors" onClick={e => {router.push("/Matches")}}>
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

         
         
          <div>
            <ViewDrive />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrimonyHomeScreen;