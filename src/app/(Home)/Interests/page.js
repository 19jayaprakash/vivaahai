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
 
const ModernInterestsPage = () => {
  const [activeTab, setActiveTab] = useState('incoming');
  const [data, setData] = useState({
    incoming: [],
    sent: [],
    matched: [],
    viewed: []
  });
  const [loading, setLoading] = useState({
    incoming: false,
    sent: false,
    matched: false,
    viewed: false
  });
  const [error, setError] = useState({
    incoming: null,
    sent: null,
    matched: null,
    viewed: null
  });
 
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
 
  // Transform API data for viewed profiles
  const transformViewedData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
   
    return apiData.map(item => ({
      id: item.viewer.UserProfile.profileId || item._id,
      name: item.viewer.UserProfile.firstName + (item.viewer.UserProfile.lastName ? ' ' + item.viewer.UserProfile.lastName : ''),
      age: calculateAge(item.viewer.UserProfile.dateOfBirth),
      location: item.viewer.UserProfile.city || 'Location not specified',
      profession: item.profession || item.occupation || 'Profession not specified',
      company: item.company || item.workplace || 'Company not specified',
      religion: item.viewer.UserProfile.religion,
      caste: item.viewer.UserProfile.caste,
      photos: item.photos || item.profilePictures || item.images || [],
      compatibility: item.compatibility || item.matchPercentage || Math.floor(Math.random() * 20) + 80,
      interests: item.interests || item.hobbies || [],
      viewedDate: item.viewedDate || item.viewedAt || formatTimeAgo(item.lastViewedAt),
      isOnline: item.isOnline || item.online || false,
      verified: item.verified || item.isVerified || false,
      premium: item.premium || item.isPremium || false
    }));
  };
 
  // Transform API data for incoming interests
  const transformIncomingData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
   
    return apiData.map(item => ({
      id: item.profileId || item.senderId || item._id,
      name: item.firstName + (item.lastName ? ' ' + item.lastName : ''),
      age: calculateAge(item.dateOfBirth),
      location: item.city || 'Location not specified',
      profession:item.UserRegistration.ProfessionalDetail.occupation || item.sender?.occupation || 'Profession not specified',
      company: item.sender?.company || item.sender?.workplace || 'Company not specified',
      religion: item.religion,
      caste: item.caste,
      photos: item.sender?.photos || item.sender?.profilePictures || item.sender?.images || [],
      compatibility: item.compatibility || item.matchPercentage || Math.floor(Math.random() * 20) + 80,
      interests: item.sender?.interests || item.sender?.hobbies || [],
      timeAgo: formatTimeAgo(item.createdAt || item.sentAt),
      isOnline: item.sender?.isOnline || item.sender?.online || false,
      verified: item.sender?.verified || item.sender?.isVerified || false,
      premium: item.sender?.premium || item.sender?.isPremium || false
    }));
  };
 
  // Transform API data for sent interests
  const transformSentData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
   
    return apiData.map(item => ({
      id: item.profileId || item.receiverId || item._id,
      name: item.firstName + (item.lastName ? ' ' + item.lastName : ''),
      age: calculateAge(item.dateOfBirth),
      location: item.city || 'Location not specified',
      profession: item.UserRegistration.ProfessionalDetail.occupation || item.receiver?.occupation || 'Profession not specified',
      company: item.receiver?.company || item.receiver?.workplace || 'Company not specified',
      religion: item.religion,
      caste: item.caste,
      photos: item.receiver?.photos || item.receiver?.profilePictures || item.receiver?.images || [],
      compatibility: item.compatibility || item.matchPercentage || Math.floor(Math.random() * 20) + 80,
      interests: item.receiver?.interests || item.receiver?.hobbies || [],
      timeAgo: formatTimeAgo(item.createdAt || item.sentAt),
      status: item.status || 'pending', // 'pending', 'viewed', 'accepted', 'declined'
      isOnline: item.receiver?.isOnline || item.receiver?.online || false,
      verified: item.receiver?.verified || item.receiver?.isVerified || false,
      premium: item.receiver?.premium || item.receiver?.isPremium || false
    }));
  };
 
  // Transform API data for matches
  const transformMatchedData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
   
    return apiData.map(item => {
      // Handle the case where match could be either sender or receiver
      const matchUser = item.sender?.UserProfile?.profileId !== item.currentUserId ? item.sender : item.receiver;
     
      return {
        id: item.profileId,
        name: item.firstName + (item.lastName ? ' ' + item.lastName : ''),
        age: calculateAge(item.dateOfBirth),
        location: item.city || 'Location not specified',
        profession: item.UserRegistration.ProfessionalDetail.occupation || matchUser?.occupation || 'Profession not specified',
        company: matchUser?.company || matchUser?.workplace || 'Company not specified',
        religion: item.religion,
        caste: item.caste,
        photos: matchUser?.photos || matchUser?.profilePictures || matchUser?.images || [],
        compatibility: item.compatibility || item.matchPercentage || Math.floor(Math.random() * 20) + 80,
        interests: matchUser?.interests || matchUser?.hobbies || [],
        matchedDate: formatTimeAgo(item.matchedAt || item.createdAt),
        lastMessage: item.lastMessage?.text || item.lastMessage || 'Start a conversation!',
        isOnline: matchUser?.isOnline || matchUser?.online || false,
        verified: matchUser?.verified || matchUser?.isVerified || false,
        premium: matchUser?.premium || matchUser?.isPremium || false
      };
    });
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
  const currentLoading = loading[activeTab];
  const currentError = error[activeTab];
 
  // Fetch Profile Views (Viewed Tab)
  useEffect(() => {
    async function fetchProfileViews() {
      const token = localStorage.getItem('token');
      if (!token) {
        setError(prev => ({ ...prev, viewed: 'Authentication token not found' }));
        return;
      }
 
      setLoading(prev => ({ ...prev, viewed: true }));
      setError(prev => ({ ...prev, viewed: null }));
 
      try {
        const res = await axiosPublic.get('/views/who-viewed-me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        console.log('Profile Views API Response:', res.data);
       
        const transformedData = transformViewedData(res.data.data || res.data);
       
        setData(prev => ({
          ...prev,
          viewed: transformedData
        }));
       
      } catch (error) {
        console.error('Error fetching profile views:', error);
        setError(prev => ({
          ...prev,
          viewed: error.response?.data?.message || 'Failed to fetch profile views'
        }));
      } finally {
        setLoading(prev => ({ ...prev, viewed: false }));
      }
    }
 
    fetchProfileViews();
  }, []);
 
  // Fetch New Interests (Incoming Tab)
  useEffect(() => {
    async function fetchNewInterests() {
      const token = localStorage.getItem('token');
      if (!token) {
        setError(prev => ({ ...prev, incoming: 'Authentication token not found' }));
        return;
      }
 
      setLoading(prev => ({ ...prev, incoming: true }));
      setError(prev => ({ ...prev, incoming: null }));
 
      try {
        const res = await axiosPublic.get('/user/interests/new', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        console.log('New Interests API Response:', res.data);
       
        const transformedData = transformIncomingData(res.data.data || res.data);
       
        setData(prev => ({
          ...prev,
          incoming: transformedData
        }));
       
      } catch (error) {
        console.error('Error fetching new interests:', error);
        setError(prev => ({
          ...prev,
          incoming: error.response?.data?.message || 'Failed to fetch new interests'
        }));
      } finally {
        setLoading(prev => ({ ...prev, incoming: false }));
      }
    }
 
    fetchNewInterests();
  }, []);
 
  // Fetch Sent Interests (Sent Tab)
  useEffect(() => {
    async function fetchSentInterests() {
      const token = localStorage.getItem('token');
      if (!token) {
        setError(prev => ({ ...prev, sent: 'Authentication token not found' }));
        return;
      }
 
      setLoading(prev => ({ ...prev, sent: true }));
      setError(prev => ({ ...prev, sent: null }));
 
      try {
        const res = await axiosPublic.get('/user/interests/sent', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        console.log('Sent Interests API Response:', res.data);
       
        const transformedData = transformSentData(res.data.data || res.data);
       
        setData(prev => ({
          ...prev,
          sent: transformedData
        }));
       
      } catch (error) {
        console.error('Error fetching sent interests:', error);
        setError(prev => ({
          ...prev,
          sent: error.response?.data?.message || 'Failed to fetch sent interests'
        }));
      } finally {
        setLoading(prev => ({ ...prev, sent: false }));
      }
    }
 
    fetchSentInterests();
  }, []);
 
  // Fetch Matches (Matched Tab)
  useEffect(() => {
    async function fetchMatches() {
      const token = localStorage.getItem('token');
      if (!token) {
        setError(prev => ({ ...prev, matched: 'Authentication token not found' }));
        return;
      }
 
      setLoading(prev => ({ ...prev, matched: true }));
      setError(prev => ({ ...prev, matched: null }));
 
      try {
        const res = await axiosPublic.get('/user/interests/matches', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        console.log('Matches API Response:', res.data);
       
        const transformedData = transformMatchedData(res.data.data || res.data);
       
        setData(prev => ({
          ...prev,
          matched: transformedData
        }));
       
      } catch (error) {
        console.error('Error fetching matches:', error);
        setError(prev => ({
          ...prev,
          matched: error.response?.data?.message || 'Failed to fetch matches'
        }));
      } finally {
        setLoading(prev => ({ ...prev, matched: false }));
      }
    }
 
    fetchMatches();
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
      {currentLoading && (
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {activeTab} data...</p>
        </div>
      )}
 
      {/* Error State */}
      {currentError && (
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="text-red-500" size={24} />
          </div>
          <p className="text-red-600 mb-2">Error loading data</p>
          <p className="text-gray-500 text-sm">{currentError}</p>
        </div>
      )}
 
      {/* Content Grid - More Compact */}
      <div className="p-3">
        {currentData.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-7 gap-3">
            {currentData.map((person) => (
              <div key={person.id}>
              <InterestCard
               
                person={person}
                type={activeTab}
                onAction={handleAction}
              />
              </div>
            ))}
          </div>
        ) : !currentLoading && (
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