'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Pencil,
  User,
  Briefcase,
  Users,
  Heart,
  Star,
  ChevronRight,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Building2,
  UserCheck,
  Settings,
  Check,
  Plus
} from 'lucide-react';
import { axiosPublic } from '../../base/constant';
import CameraComponent from '../../components/Profiles/CameraComponent';

const beautifyLabel = (key) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

const capitalizeValue = (val) => {
  if (!val || typeof val !== 'string') {
    if (Array.isArray(val)) {
      if (val.length === 0) return 'Not specified';
      return val.map(item =>
        typeof item === 'string'
          ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
          : item
      ).join(', ');
    }
    return val;
  }
  if (!isNaN(Date.parse(val)) || /^\d/.test(val)) return val;
  return val
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const excludedFields = [
  'createdBy', 'updatedBy', 'userId', 'profileId', 'id', '_id',
  'createdAt', 'updatedAt', 'created_by', 'updated_by', 'user_id',
  'created_at', 'updated_at', '__v', 'version', 'isDeleted', 'is_deleted',
  'status', 'password', 'token', 'refreshToken', 'refresh_token', 'interestId',
  'isBasicProfileSubmitted', 'familyId', 'preferenceId', 'careerId',
];

const filterDisplayData = (data, showEmptyFields = false) => {
  if (!data || typeof data !== 'object') return {};
  const filtered = {};
  Object.entries(data).forEach(([key, value]) => {
    const shouldExclude = excludedFields.some(excludedKey =>
      key.toLowerCase() === excludedKey.toLowerCase()
    );
    if (!shouldExclude) {
      if (showEmptyFields) {
        filtered[key] = value;
      } else {
        const hasValue = value !== null && value !== undefined && value !== '' &&
                         !(Array.isArray(value) && value.length === 0);
        if (hasValue) filtered[key] = value;
      }
    }
  });
  return filtered;
};

// Simple Loading Component
const SimpleLoader = () => (
  <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-pink-50 to-red-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-pink-200 border-t-[#FF6B6B] rounded-full animate-spin mb-6"></div>
      <p className="text-gray-700 text-xl font-medium">Loading your profile...</p>
      <div className="flex justify-center space-x-1 mt-4">
        <div className="w-2 h-2 bg-[#FF6B6B] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[#FF6B6B] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-[#FF6B6B] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  </div>
);

// Section Icons with enhanced styling
const getSectionIcon = (sectionKey) => {
  const icons = {
    basic: User,
    professional: Briefcase,
    family: Users,
    other: Star,
    preference: Heart
  };
  return icons[sectionKey] || Settings;
};

// Vertical Stepper Section Component
const StepperSection = ({ 
  title, 
  data = {}, 
  pageRoute, 
  sectionKey, 
  showEmptyFields = false, 
  step = 0, 
  isLast = false,
  stepNumber 
}) => {
  const router = useRouter();
  const Icon = getSectionIcon(sectionKey);

  const handleNavigateWithLocalStorage = async () => {
    localStorage.setItem('editData', JSON.stringify(data));
    router.push(`${pageRoute}?isEdit=true&step=${step}`);
  };

  const filteredData = filterDisplayData(data, showEmptyFields);
  const hasData = Object.keys(filteredData).length > 0;
  const completionPercentage = hasData ? Math.min(Object.keys(filteredData).length * 20, 100) : 0;

  return (
    <div className="relative flex">
      {/* Vertical Line */}
      {!isLast && (
        <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-[#FF6B6B] to-pink-200"></div>
      )}
      
      {/* Step Circle */}
      <div className="relative z-10 flex-shrink-0">
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
          ${hasData 
            ? 'bg-gradient-to-br from-[#FF6B6B] to-red-500 text-white shadow-[#FF6B6B]/30' 
            : 'bg-white border-4 border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white'
          }
        `}>
          {hasData ? (
            <Check className="w-7 h-7" />
          ) : (
            <Icon className="w-7 h-7" />
          )}
        </div>
        {/* Step Number */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-[#FF6B6B] rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-[#FF6B6B]">{stepNumber}</span>
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 ml-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
          {/* Progress Bar */}
          <div className="h-2 bg-gray-100">
            <div 
              className="h-full bg-gradient-to-r from-[#FF6B6B] to-pink-400 transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>

          {/* Header */}
          <div className="p-6 border-b border-gray-50">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B6B] to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#FF6B6B] rounded-full"></div>
                      <span className="ml-2 text-sm text-gray-600 font-medium">
                        {hasData ? `${completionPercentage}% Complete` : 'Not Started'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleNavigateWithLocalStorage}
                className="group bg-gradient-to-r from-[#FF6B6B] to-red-500 hover:from-red-500 hover:to-[#FF6B6B] text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Pencil className="w-5 h-5 cursor-pointer" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {hasData ? (
              <div className="space-y-4">
                {Object.entries(filteredData).slice(0, 3).map(([key, value], index) => (
                  <div key={key} className="group">
                    {key === 'sibilings' && Array.isArray(value) ? (
                      <div className="space-y-3">
                        <h3 className="text-[#FF6B6B] font-semibold text-lg flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          Siblings
                        </h3>
                        {value.slice(0, 2).map((sibling, idx) => (
                          <div key={idx} className="bg-gradient-to-r from-pink-50 to-red-50 border border-pink-100 rounded-xl p-4">
                            <h4 className="text-[#FF6B6B] font-medium mb-2">Sibling {idx + 1}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {Object.entries(sibling).slice(0, 4).map(([subKey, subVal]) => (
                                <div key={subKey} className="flex justify-between items-center">
                                  <span className="text-gray-600 text-sm font-medium">{beautifyLabel(subKey)}</span>
                                  <span className="text-gray-800 font-semibold text-sm">{capitalizeValue(subVal)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-gray-50 to-pink-50 rounded-xl p-4 hover:from-pink-50 hover:to-red-50 transition-all duration-200 border border-gray-100 hover:border-pink-200">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium flex items-center">
                            <div className="w-2 h-2 bg-[#FF6B6B] rounded-full mr-3"></div>
                            {beautifyLabel(key)}
                          </span>
                          <span className="text-gray-800 font-semibold">{capitalizeValue(value) || 'N/A'}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {Object.keys(filteredData).length > 3 && (
                  <div className="text-center pt-2">
                    <button
                      onClick={handleNavigateWithLocalStorage}
                      className="text-[#FF6B6B] hover:text-red-600 font-medium text-sm flex items-center justify-center cursor-pointer space-x-1 mx-auto group"
                    >
                      <span >View {Object.keys(filteredData).length - 3} more fields</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium mb-2">No information added yet</p>
                <p className="text-gray-400 text-sm mb-4">Complete this section to improve your profile</p>
                <button
                  onClick={handleNavigateWithLocalStorage}
                  className="bg-gradient-to-r from-[#FF6B6B] to-red-500 hover:from-red-500 hover:to-[#FF6B6B] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Add Information
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileEdit = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    basic: {}, professional: {}, family: {}, preference: {}, other: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
    
        if (!token) throw new Error('No authentication token found');

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const apiEndpoints = [
          { key: 'basic', url: '/user/user-profile' },
          { key: 'professional', url: '/user/get-professional-details' },
          { key: 'family', url: '/family/family-details' },
          { key: 'preference', url: '/partnerpreference/get-preference' },
          { key: 'other', url: '/Interests/user-interests' },
        ];

        const responses = await Promise.allSettled(
          apiEndpoints.map(endpoint =>
            axiosPublic.get(endpoint.url, { headers }).then(res => res.data)
          )
        );

        const newProfileData = {};
        responses.forEach((response, index) => {
          const key = apiEndpoints[index].key;
          newProfileData[key] = response.status === 'fulfilled' ? response.value || {} : {};
        });

        setProfileData(newProfileData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProfileData();
  }, []);

  const sections = [
    { key: 'basic', title: 'Basic Information', step: 0 },
    { key: 'professional', title: 'Professional Details', step: 1 },
    { key: 'family', title: 'Family Details', step: 2 },
    { key: 'other', title: 'Interests & Hobbies', step: 3 },
    { key: 'preference', title: 'Partner Preferences', step: 4 }
  ];

  if (loading) {
    return <SimpleLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 flex flex-col justify-center items-center px-4">
        <div className="bg-white border border-red-200 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-red-500 mb-4 text-2xl font-bold">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => {setError(null); window.location.reload();}}
            className="bg-gradient-to-r from-[#FF6B6B] to-red-500 hover:from-red-500 hover:to-[#FF6B6B] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const completedSections = sections.filter(section => {
    const data = filterDisplayData(profileData[section.key], true);
    return Object.keys(data).length > 0;
  }).length;

  const overallProgress = Math.round((completedSections / sections.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF6B6B] to-red-500 bg-clip-text text-transparent">
            Edit Your Profile
          </h1>
         
         <div>
            <CameraComponent />
         </div>
        </div>

        {/* Stepper Sections */}
        <div className="space-y-0">
          {sections.map((section, index) => (
            <StepperSection
              key={section.key}
              title={section.title}
              data={profileData[section.key]}
              pageRoute={`/CreateProfile`}
              sectionKey={section.key}
              showEmptyFields={false}
              step={section.step}
              isLast={index === sections.length - 1}
              stepNumber={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;