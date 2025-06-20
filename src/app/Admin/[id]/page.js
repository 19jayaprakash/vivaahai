'use client';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, X, Eye, FileText, Phone, CreditCard, Camera, GraduationCap, User, Mail, Hash, Shield, Loader2, MapPin, Calendar, Clock, Star, CheckCircle } from 'lucide-react';
 
export default function VerificationDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
 
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDocument, setShowDocument] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
 
  // Fetch user profile data
 
    async function fetchUserProfile() {
      if (!id) return;
     
      setLoading(true);
      setError(null);
     
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
 
        const response = await fetch(`https://stu.globalknowledgetech.com:9443/user/profile-verification?userId=${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
 
        const data = await response.json();
        setProfileData(data.profile);
 
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
 
   
 
 
 useEffect(()=>{
    fetchUserProfile();
 },[])
 
 
const [showRejectionModal, setShowRejectionModal] = useState(false);
const [rejectionReason, setRejectionReason] = useState('');
const [currentRejectingItem, setCurrentRejectingItem] = useState(null);
 
// 2. UPDATE THE handleVerification FUNCTION (replace the existing function):
const handleVerification = async (field, action) => {
  // If rejecting, open modal instead of directly calling API
  if (action === 'reject') {
    setCurrentRejectingItem(field);
    setShowRejectionModal(true);
    return;
  }
 
  setActionLoading(true);
 
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
 
    const requestBody = {
      userId: parseInt(id),
      documentType: field === 'aadhar' ? 'aadhar' :
                   field === 'selfie' ? 'selfie' :
                   field === 'profile' ? 'profile' :
                   field === 'education' ? 'education' :
                   field === 'salary' ? 'salary' :
                   field === 'mobile' ? 'mobile' : field,
      status: action === 'approve' ? 'Approved' : 'Rejected'
    };
 
    // Add rejection reason if rejecting
    if (action === 'reject' && rejectionReason.trim()) {
      requestBody.rejectionReason = rejectionReason.trim();
    }
 
    const response = await fetch(`https://stu.globalknowledgetech.com:9443/user/verify-profile-doc`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   
    fetchUserProfile();
    const result = await response.json();
    console.log('Verification response:', result);
 
    // Update local state based on action
    if (action === 'approve') {
      setProfileData(prev => ({
        ...prev,
        [`${field}Verified`]: true
      }));
      alert('Document verified successfully!');
    } else if (action === 'reject') {
      setProfileData(prev => ({
        ...prev,
        [`${field}Verified`]: false
      }));
      alert('Document rejected successfully!');
    }
 
  } catch (error) {
    console.error('Error updating verification status:', error);
    alert('Error updating verification status: ' + error.message);
  } finally {
    setActionLoading(false);
  }
};
 
// Replace your existing handleRejectWithReason function with this:
const handleRejectWithReason = async () => {
  if (!rejectionReason.trim()) {
    alert('Please provide a reason for rejection');
    return;
  }
 
  // Store the reason before resetting modal state
  const reasonToSend = rejectionReason.trim();
  const fieldToReject = currentRejectingItem;
 
  // Close modal first
  setShowRejectionModal(false);
 
  // Now call the API with stored values
  setActionLoading(true);
 
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
 
    const requestBody = {
      userId: parseInt(id),
      documentType: fieldToReject,
      status: 'Rejected',
      rejectionReason: reasonToSend
    };
 
    const response = await fetch(`https://stu.globalknowledgetech.com:9443/user/verify-profile-doc`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   
    fetchUserProfile();
    const result = await response.json();
    console.log('Verification response:', result);
 
    // Update local state
    setProfileData(prev => ({
      ...prev,
      [`${fieldToReject}Verified`]: false
    }));
   
    alert('Document rejected successfully!');
 
  } catch (error) {
    console.error('Error updating verification status:', error);
    alert('Error updating verification status: ' + error.message);
  } finally {
    setActionLoading(false);
  }
 
  // Reset modal state after API call
  setRejectionReason('');
  setCurrentRejectingItem(null);
};
 
const closeRejectionModal = () => {
  setShowRejectionModal(false);
  setRejectionReason('');
  setCurrentRejectingItem(null);
};
 
 
  const viewDocument = (url, title) => {
    // Extract the filename after the userId path
    // Example: "VivaahAI-UAT/2/AdharCard/bg-img.png" -> "AdharCard/bg-img.png"
    const urlParts = url.split('/');
    const filename = urlParts.slice(2).join('/'); // Skip "VivaahAI-UAT" and userId parts
   
    const token = localStorage.getItem('token');
    const fullUrl = `https://stu.globalknowledgetech.com:445/user/display-photo?filename=${filename}`;
   
    setShowDocument({ url: fullUrl, title, token });
    setImageError(false);
    setImageLoading(true);
  };
 
  const closeDocument = () => {
    setShowDocument(null);
    setImageError(false);
    setImageLoading(false);
  };
 
  const formatDate = (dateString) => {
    if (!dateString) return 'Not verified';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
 
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-[#ff6b6b] mx-auto mb-4"></div>
          </div>
          <p className="text-gray-800 font-medium text-lg">Loading verification details...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the data</p>
        </div>
      </div>
    );
  }
 
  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-6 max-w-md">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-[#ff6b6b] text-white rounded-xl hover:bg-[#ff5252] transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
 
  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-800 font-medium text-lg">Profile not found</p>
        </div>
      </div>
    );
  }
 
  const verificationItems = [
    {
      key: 'aadhar',
      title: 'Aadhaar Card',
      icon: <CreditCard className="w-5 h-5" />,
      uploaded: profileData.aadharUploaded,
      verified: profileData.aadharVerified,
      url: profileData.aadharUrl,
      verifiedBy: profileData.aadharVerifiedBy,
      verifiedDate: profileData.aadharVerifiedDate,
      number: profileData.aadharNumber,
   
    },
    {
      key: 'selfie',
      title: 'Selfie Verification',
      icon: <Camera className="w-5 h-5" />,
      uploaded: profileData.selfieUploaded,
      verified: profileData.selfieVerified,
      url: profileData.selfieUrl,
      verifiedBy: profileData.selfieVerifiedBy,
      verifiedDate: profileData.selfieVerifiedDate,
      description: 'Live photo verification'
    },
    {
      key: 'profile',
      title: 'Profile Photo',
      icon: <User className="w-5 h-5" />,
      uploaded: profileData.profileUploaded,
      verified: profileData.profileVerified,
      url: profileData.profilePhotoUrl,
      verifiedBy: profileData.profileVerifiedBy,
      verifiedDate: profileData.profileVerifiedDate,
      description: 'Profile display picture'
    },
    {
      key: 'education',
      title: 'Education Certificate',
      icon: <GraduationCap className="w-5 h-5" />,
      uploaded: profileData.educationUploaded,
      verified: profileData.educationVerified,
      url: profileData.educationCertUrl,
      verifiedBy: profileData.educationVerifiedBy,
      verifiedDate: profileData.educationVerifiedDate,
      description: 'Academic qualification proof'
    },
    {
      key: 'salary',
      title: 'Salary Slip',
      icon: <FileText className="w-5 h-5" />,
      uploaded: profileData.salaryUploaded,
      verified: profileData.salaryVerified,
      url: profileData.salarySlipUrl,
      verifiedBy: profileData.salaryVerifiedBy,
      verifiedDate: profileData.salaryVerifiedDate,
      description: 'Income verification document'
    },
    {
      key: 'mobile',
      title: 'Mobile Number',
      icon: <Phone className="w-5 h-5" />,
      uploaded: profileData.mobileUploaded,
      verified: profileData.mobileVerified,
      url: null,
      verifiedBy: profileData.mobileVerifiedBy,
      verifiedDate: profileData.mobileVerifiedDate,
      number: profileData.UserProfile.primaryContact
    }
  ];
 
  const verifiedCount = verificationItems.filter(item => item.verified).length;
  const uploadedCount = verificationItems.filter(item => item.uploaded).length;
  const completionPercentage = Math.round((verifiedCount / verificationItems.length) * 100);
 
  const handleImageLoad = () => {
    setImageLoading(false);
  };
 
  const handleImageError = async (e) => {
    if (!showDocument?.token) {
      setImageError(true);
      setImageLoading(false);
      return;
    }
 
    try {
      const response = await fetch(showDocument.url, {
        headers: {
          'Authorization': `Bearer ${showDocument.token}`,
       
        },
       
      });
     
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        e.target.src = imageUrl;
        setImageLoading(false);
      } else {
        setImageError(true);
        setImageLoading(false);
      }
    } catch (error) {
      console.error('Error loading image with auth:', error);
      setImageError(true);
      setImageLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-xl bg-white/95 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:bg-gray-100 px-3 py-2 rounded-lg group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                <span className="font-medium">Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b6b] to-[#ff5252] rounded-lg flex items-center justify-center shadow-md">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Verification Center</h1>
              </div>
            </div>
           
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                <Hash className="w-4 h-4" />
                <span className="font-mono">{profileData.userId}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-200">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{verifiedCount}/6 Verified</span>
                </div>
                <div className="flex items-center space-x-2 bg-[#ff6b6b]/10 text-[#ff6b6b] px-3 py-2 rounded-lg border border-[#ff6b6b]/20">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{uploadedCount}/6 Uploaded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      <div className="max-w-7xl mx-auto p-2 space-y-8">
        {/* Enhanced User Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ff5252] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{profileData.UserProfile?.firstName}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/90">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <span>{profileData.UserProfile?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      <span>{profileData.UserProfile?.primaryContact}</span>
                    </div>
                   
                  </div>
                </div>
              </div>
             
              <div className="text-right">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold text-white">{completionPercentage}%</span>
                </div>
                <div className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  profileData.overallVerified
                    ? 'bg-green-500/20 text-white border border-white/30'
                    : 'bg-yellow-500/20 text-white border border-white/30'
                }`}>
                  {profileData.overallVerified ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Fully Verified
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 mr-2" />
                     Verification Pending
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
 
        {/* Enhanced Verification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {verificationItems.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group ${
                item.verified
                  ? 'border-green-200 bg-gradient-to-br from-white to-green-50'
                  : item.uploaded
                    ? 'border-[#ff6b6b]/30 bg-gradient-to-br from-white to-[#ff6b6b]/5'
                    : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="p-6">
                {/* Enhanced Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl transition-all duration-200 ${
                      item.verified
                        ? 'bg-green-100 text-green-600'
                        : item.uploaded
                          ? 'bg-[#ff6b6b]/10 text-[#ff6b6b]'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                    }`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                      {item.number && (
                        <p className="text-xs text-gray-400 font-mono mt-1">{item.number}</p>
                      )}
                    </div>
                  </div>
                 
                  <div className={`p-2 rounded-full ${
                    item.verified ? 'bg-green-500' : item.uploaded ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}>
                    {item.verified ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : item.uploaded ? (
                      <Clock className="w-5 h-5 text-white" />
                    ) : (
                      <X className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>
 
                {/* Enhanced Document Preview */}
                {item.url && item.uploaded && (
                  <div className="mb-4">
                    <div
                      className="h-32 bg-gray-50 rounded-xl overflow-hidden cursor-pointer hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:border-[#ff6b6b]/50 group/preview relative"
                      onClick={() => viewDocument(item.url, item.title)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                      <div className="flex items-center justify-center h-full relative z-20">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-[#ff6b6b]/10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover/preview:bg-[#ff6b6b]/20 transition-colors">
                            <Eye className="w-6 h-6 text-[#ff6b6b]" />
                          </div>
                          <span className="text-sm text-gray-700 font-medium">View Document</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
 
                {/* Enhanced Status Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Status:</span>
                    <span className={`font-semibold px-3 py-1 rounded-full text-xs ${
                      item.verified
                        ? 'bg-green-100 text-green-700'
                        : item.uploaded
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.verified ? 'Verified' : item.uploaded ? 'Review Pending' : 'Not Uploaded'}
                    </span>
                  </div>
                 
                  {item.verified && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      {item.verifiedBy && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Verified by:</span>
                          <span className="text-gray-900 font-medium">{item.verifiedBy}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Date:</span>
                        <span className="text-gray-900 font-medium">{formatDate(item.verifiedDate)}</span>
                      </div>
                    </div>
                  )}
                </div>
 
                {/* Enhanced Action Buttons */}
                {item.uploaded && !item.verified && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleVerification(item.key, 'approve')}
                      disabled={actionLoading}
                      className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 font-medium hover:shadow-lg hover:shadow-green-500/25"
                    >
                      {actionLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Approve</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleVerification(item.key, 'reject')}
                      disabled={actionLoading}
                      className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 font-medium hover:shadow-lg hover:shadow-red-500/25"
                    >
                      {actionLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <X className="w-4 h-4" />
                          <span>Reject</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
 
                {!item.uploaded && (
                  <div className="text-center py-4">
                    <div className="text-gray-400 text-sm">Document not uploaded yet</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* Enhanced Document Modal */}
      {showDocument && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl max-h-[90vh] w-full overflow-hidden shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#ff6b6b] rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{showDocument.title}</h3>
              </div>
              <button
                onClick={closeDocument}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-200 transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-auto max-h-[75vh] bg-gray-50">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                {imageLoading && (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">Loading document...</p>
                  </div>
                )}
               
                {!imageError && (
                  <img
                    src={showDocument.url}
                    alt={showDocument.title}
                    className="w-full h-auto rounded-lg shadow-sm"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ display: imageLoading ? 'none' : 'block' }}
                  />
                )}
               
                {imageError && (
                  <div className="text-center py-12 text-gray-500">
                    <FileText size={64} className="mx-auto mb-4 text-gray-400" />
                    <p className="font-medium text-lg mb-2">Unable to load document</p>
                    <p className="text-sm text-gray-400 break-all max-w-md mx-auto">{showDocument.url}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showRejectionModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <p className="text-gray-500 text-sm mt-2">Please provide a reason for rejecting this document</p>
      </div>
     
      <div className="p-6">
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="Enter reason for rejection..."
          className="w-full h-32 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none text-sm text-black"
          autoFocus
        />
       
        <div className="flex space-x-3 mt-4">
          <button
            onClick={closeRejectionModal}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleRejectWithReason}
            disabled={!rejectionReason.trim()}
            className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            Reject Document
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
   
  );
 
}