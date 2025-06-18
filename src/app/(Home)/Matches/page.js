"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Heart, SlidersHorizontal, X, Sparkles, Plane, Waves, Phone, MessageCircle, Eye , Ruler, MapPin, Send} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { axiosPublic } from '../../base/constant';
// Sample data for matches with working image URLs
 
const MaxAge = ["31","32","33","34","35"];
const MinAge = ["22","23","24","25","26","27","28","29","30"];
const Maxheight= ["161", "162", "163","164", "165"];
const Minheight= ["155", "156", "157","158", "159"];
const Maxweight = ["61", "62", "63", "64", "65"];
const Minweight = ["55", "56", "57", "58", "59"];
const educationLevels = ["High School", "Bachelor", "Master", "PhD"];
const occupations = ["Engineer", "Doctor", "Artist", "Teacher"];
const states = ["TamilNadu", "Kerala", "Maharashtra", "Telangana"];
const cities = ["Chennai","Madurai","Tirunelveli","Salem","Coimbatore"];
const religions = ["Hindu","Muslim","Christian"];
const castes = ["Brahmin","Nair","Iyengar","Kshatriya"];
const lifestyles = ["Active", "Moderate", "Sedentary"];
 
const AIMatchIcon = () => (
  <div className="relative w-4 h-4 bg-yellow-100 rounded-lg flex items-center justify-center">
    <Sparkles className="w-2.5 h-2.5 text-yellow-600" />
  </div>
);
 
const SwimIcon = () => (
  <div className="relative w-4 h-4 bg-blue-100 rounded-lg flex items-center justify-center">
    <Waves className="w-2.5 h-2.5 text-blue-600" />
  </div>
);
 
const TravelIcon = () => (
  <div className="relative w-4 h-4 bg-purple-100 rounded-lg flex items-center justify-center">
    <Plane className="w-2.5 h-2.5 text-purple-600" />
  </div>
);
 
const PhotoCarousel = ({ photos, onImageClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
 
  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };
 
  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };
 
  const handleImageError = () => {
    setImageError(true);
  };
 
  const handleImageClick = (e) => {
    e.stopPropagation();
    onImageClick();
  };
 
  return (
    <div className="relative h-48 overflow-hidden rounded-t-2xl group">
      {imageError || photos.length === 0 ? (
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
          src={photos[activeIndex]}
          width={400}
          height={600}
 
          alt="Profile"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
          onError={handleImageError}
          onClick={handleImageClick}
          loading="lazy"
        />
      )}
 
      {photos.length > 1 && !imageError && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
          >
            <ChevronLeft size={14} />
          </button>
 
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
          >
            <ChevronRight size={14} />
          </button>
 
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(index);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-white w-3'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
 
      {/* ID Verified Badge */}
      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        <span className='text-xs'>ID verified</span>
      </div>
 
      {/* View Profile Button */}
      <button
        onClick={handleImageClick}
        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
        title="View Profile"
      >
        <Eye size={12} />
      </button>
    </div>
  );
};

 
const MatchCard = ({ match }) => {
  const[showMessageModal,setShowMessageModal] = useState(false);
 
  const router = useRouter();

    async function ProfileView() {
  const id = {
    viewedUserId: match.profileId
  };
 
  try {
    const res = await axiosPublic.post(
      `/views/profile-view`,
      id,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
 
    if (res.status === 200) {
      console.log(res.data);
    }
  } catch (err) {
    toast.error("Error while fetching Profiles");
    console.error(err);
  }
}
 
  const handleViewProfile = () => {
    router.push(`/Matches/${match.profileId}`);
    ProfileView();
  };
 
  const handleScheduleMeet = (e) => {
    e.stopPropagation();
    router.push("/ScheduleMeet")
    // setShowScheduleModal(true);
  };
 
   const handleSendInterest = async (e, interactionType,interactionCode) => {
  e.stopPropagation();
 
  try {
    const token = localStorage.getItem('token');
    const code = interactionCode ? 2 : 1 ;
    const json = {
      targetUserId: match.profileId,
        interactionType: interactionType,
    }
    if(interactionType !== "disliked"){
      json.interactionCode = code;
    }
    const response = await fetch('https://stu.globalknowledgetech.com:445/user/add-userInteraction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(json)
    });
 
    if (response.ok) {
      toast.success("Your prefernece has been recorded successfully");
      // Handle success (e.g., show success message, update UI)
    } else {
      console.error(`Failed to send ${interactionType}:`, response.status);
      // Handle error
    }
  } catch (error) {
    toast.error("Network error while sending interest. Please try again.");
    console.error(`Error sending ${interactionType}:`, error);
    // Handle network error
  }
};

 
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
 
 
  const handleContact = (e, type) => {
    e.stopPropagation();
    setShowMessageModal(true)
  };
 
  return (
    <>
      <div
        className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
        // onClick={handleViewProfile}
      >
        <PhotoCarousel
          photos={match?.photos || []}
          // onImageClick={handleViewProfile}
        />
       
        <div className="p-4">
          {/* Header with Contact Icons */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
               <span>{match.firstName + (match.lastName ? ' ' + match.lastName : '')}</span>
 
              </h2>
              <div className="text-sm text-gray-600 space-y-1">
                <div>M{match.profileId}</div>
             
              </div>
            </div>
           
            {/* Contact Icons */}
            <div className="flex gap-2 ml-2">
              <button
                onClick={(e) => handleContact(e, 'phone')}
                className="w-8  cursor-pointer h-8 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors"
                title="Contact"
              >
                <Phone size={14} className="text-orange-600" />
              </button>
              <button
                onClick={(e) => setShowMessageModal(true)}
                className="w-8 h-8 cursor-pointer bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle size={14} className="text-green-600" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap text-sm mb-2 text-black">
                  <span className='flex gap-1 justify-center items-center'><Calendar size={14} />{calculateAge(match?.dateOfBirth)} yrs</span>
                  <span>•</span>
                  <span className='flex gap-1 justify-center items-center'><Ruler size={14} /> {match.height} cm</span>
                  <span>•</span>
                  <span className='flex gap-1 justify-center items-center'><MapPin size={14} />{match.city}</span>
                </div>
 
          {/* Tags */}
          <div className="flex gap-3 mb-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-md">
              <AIMatchIcon />
              <span className="text-xs font-semibold text-yellow-800">AI 90%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 px-2 py-1 rounded-md">
              
              <span className="text-xs font-semibold text-purple-800">{match.religion}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md">
              
              <span className="text-xs font-semibold text-blue-800">{match.caste}</span>
            </div>
          </div>
 
          {/* Action Buttons */}
          <div className="flex gap-2 mb-2">
            <button
             onClick={(e) =>handleSendInterest(e,"disliked",match.interactionCode)}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <X size={12} />
              Don&apos;t Show
            </button>
            <button
              onClick={(e) =>handleSendInterest(e,"liked",match.interactionCode)}
              className="flex-1 cursor-pointer bg-[#FF6B6B] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#FF6B6E] transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Heart size={12} />
              Send Interest
            </button>
          </div>
         
          {/* Schedule Meet Button */}
          <button
            onClick={handleScheduleMeet}
            className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm flex items-center justify-center gap-2"
          >
            <Calendar size={12} />
            Schedule Meet
          </button>
 
          {/* View Profile Link */}
          <button
            onClick={handleViewProfile}
            className="w-full mt-2 text-rose-600 hover:text-rose-700 cursor-pointer font-medium text-sm py-1 transition-colors"
          >
            View Full Profile →
          </button>
        </div>
      </div>

        <MessageModal
        isOpen={showMessageModal}
        onClose={(e) => {setShowMessageModal(false)}}
        recipientId = {match.userId}
        recipientName={match.firstName}
      />
    </>
  );
};
 
const FilterModal = ({ isOpen, onClose, title, options, onSelect }) => {
  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-5 w-full max-w-md max-h-80 overflow-hidden">
        <h3 className="text-lg font-bold text-gray-900 text-center mb-3">{title}</h3>
        <div className="max-h-52 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                onClose();
              }}
              className="w-full text-left py-2.5 px-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-black"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


const MessageModal = ({ isOpen, onClose, recipientId ,recipientName = "User" }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);

  // Focus on textarea when modal opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCancel = () => {
    setMessage('');
    setIsLoading(false);
    onClose();
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    setIsLoading(true);
    try {
      axiosPublic.post(`/chat`,{
        user2Id : recipientId
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res =>{
        if(res.status === 200){
          axiosPublic.post(`/chat/${res.data.id}/message`,{
            message : message
          },{headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }})
          .then(res =>{
            if(res.status === 201){
              toast.success("Message sent successfully");
              setMessage("");
              onClose();
            }
          })
        }
      })
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Send message on Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleBackdropClick = (e) => {
    // Close modal when clicking on backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleBackdropClick}
    >
      {/* Modal Content */}
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-200 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Send Message</h2>
            <p className="text-sm text-gray-500 mt-1">To {recipientName}</p>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Message Input */}
        <div className="p-6">
          <label htmlFor="message-input" className="block text-sm font-medium text-gray-700 mb-3">
            Your Message
          </label>
          <textarea
            ref={textareaRef}
            id="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            rows={4}
            disabled={isLoading}
            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-gray-500">
              {message.length}/500 characters
            </p>
            <p className="text-xs text-gray-400">
              Press Ctrl+Enter to send
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 p-6 bg-gray-50 rounded-b-2xl">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim() || isLoading || message.length > 500}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
 
 
const MatchesScreen = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalOptions, setModalOptions] = useState([]);
  const [onSelectModalOption, setOnSelectModalOption] = useState(() => () => {});
 
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedMaxAge, setSelectedMaxAge] = useState("");
  const [selectedMinAge, setSelectedMinAge] = useState("");
  const [selectedMaxHeight, setSelectedMaxHeight] = useState("");
  const [selectedMinHeight, setSelectedMinHeight] = useState("");
  const [selectedMaxWeight, setSelectedMaxWeight] = useState("");
  const [selectedMinWeight, setSelectedMinWeight] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const[selectedincome,setSelectedIncome] = useState("");
  const[selectedsubcaste , setSelectedSubcaste] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCaste, setSelectedCaste] = useState("");
  const [selectedLifestyle, setSelectedLifestyle] = useState("");
   const [occupationdata,setOccupationData] = useState([]);
  const [educationOptions, setEducationOptions] = useState([]);
  const [religionOption,setReligionOptions] = useState([]);
  const [casteoptions,setCasteOptions] = useState([]);
  const [subcasteoptions,setSubcasteOptions] = useState([]);
  const [stateoption,setStateOptions] = useState([]);
  const [cityoption,setCityOptions] = useState([]);
  const [income,setIncome] = useState([]);
 
useEffect(() => {
    async function fetcheoccupation() {
      try {
        await axiosPublic.get('/utility/utilHead?utilHead=occupation')
        .then(res =>{
            setOccupationData(res.data.data);
        })
       
      } catch (error) {
        console.error('Error fetching income options:', error);
      }
    }
 
    fetcheoccupation();
  }, []);
 
  useEffect(() => {
    async function fetcheducation() {
      try {
        await axiosPublic.get('/utility/utilHead?utilHead=education_level')
        .then(res =>{
            setEducationOptions(res.data.data);
        })
       
      } catch (error) {
        console.error('Error fetching income options:', error);
      }
    }
 
    fetcheducation();
  }, []);
 
useEffect(() => {
    async function fetchIncome() {
      try {
        await axiosPublic.get('/utility/utilHead?utilHead=annual_income')
        .then(res =>{
            setIncome(res.data.data);
        })
      } catch (error) {
        console.error('Error fetching income options:', error);
      }
    }
 
    fetchIncome();
  }, []);
 
  // Fetch Religion Options
    useEffect(() => {
      async function fetchReligionOption() {
        try {
          const response = await axiosPublic.get('/utility/utilHead?utilHead=religion');
          const result = response.data;
          if (result && Array.isArray(result.data)) {
            setReligionOptions(result.data);
          }
        } catch (error) {
          console.error('Error fetching religion options:', error);
        }
      }
      fetchReligionOption();
    }, []);
 
    useEffect(() => {
        async function fetchCastes() {
          try {
            const response = await axiosPublic.get('/utility/utilHead?utilHead=caste');
            const result = response.data;
            if (result && Array.isArray(result.data)) {
              setCasteOptions(result.data);
            }
          } catch (error) {
            console.error('Error fetching caste options:', error);
          }
        }
        fetchCastes();
      }, []);
 
      useEffect(() => {
          async function fetchSubcastes() {
            if (!selectedCaste) {
              setSubcasteOptions([]);
              return;
            }
            try {
              const response = await axiosPublic.get(`/utility/parent?parentCode=${selectedCaste}`);
              const result = response.data;
             
                setSubcasteOptions(result.data);
             
            } catch (error) {
              console.error('Error fetching subcaste options:', error);
            }
          }
          fetchSubcastes();
        }, [selectedCaste]);
 
         useEffect(() => {
            async function fetchState() {
              try {
                const response = await axiosPublic.get('/utility/utilHead?utilHead=state');
                const result = response.data;
                if (result && Array.isArray(result.data)) {
                  setStateOptions(result.data);
                }
              } catch (error) {
                console.error('Error fetching state options:', error);
              }
            }
            fetchState();
          }, []);
       
          // Fetch Cities when state changes
          useEffect(() => {
            async function fetchCity() {
              if (!selectedState) {
                setCityOptions([]);
                return;
              }
              try {
                const stateValue = selectedState.replace(/\s+/g, '_');
                const response = await axiosPublic.get(`/utility/parent?parentCode=${stateValue}`);
                const result = response.data;
                if (result && Array.isArray(result.data)) {
                  setCityOptions(result.data);
                }
              } catch (error) {
                console.error('Error fetching city options:', error);
              }
            }
            fetchCity();
          }, [selectedState]);

 async function getProfileRecommendation(){
    await axiosPublic.get(`/user/profile-recommendations`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      .then(res =>{
        if(res.status === 200){
          setFilteredMatches(res.data.recommendations);
        }
      })
      .catch(err =>{
        toast.error("Error while fetching Profiles");
      })
  }

  
 
  useEffect(()=>{
      getProfileRecommendation();
  },[]);
 
  const showFilterModal = (title, options, onSelect) => {
    setModalTitle(title);
    setModalOptions(options);
    setOnSelectModalOption(() => onSelect);
    setModalVisible(true);
  };
 

  const sendAllFiltersToAPI = async () => {
  const allFilterData = {
    gender: selectedGender,
    maxAge: selectedMaxAge,
    minAge: selectedMinAge,
    maxHeight: selectedMaxHeight,
    minHeight: selectedMinHeight,
    maxWeight: selectedMaxWeight,
    minWeight: selectedMinWeight,
    education: selectedEducation,
    occupation: selectedOccupation,
    state: selectedState,
    city: selectedCity,
    religion: selectedRegion,
    caste: selectedCaste,
    lifestyle: selectedLifestyle,
    subcaste : selectedsubcaste,
    annualincome : selectedincome
  };
 
  try {
   const token = localStorage.getItem('token');
    const response = await fetch('https://stu.globalknowledgetech.com:445/search/search-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(allFilterData)
    });
     setShowFilter(false);
    const result = await response.json();
    console.log(result.data)
    setFilteredMatches(result.data);
    return result;
   
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
   
};
 
  const clearFilters = () => {
    setSelectedGender("");
    setSelectedMaxAge("");
    setSelectedMinAge("");
    setSelectedMaxHeight("");
    setSelectedMinHeight("");
    setSelectedMaxWeight("");
    setSelectedMinWeight("");
    setSelectedEducation("");
    setSelectedOccupation("");
    setSelectedState("");
    setSelectedCity("");
    setSelectedRegion("");
    setSelectedCaste("");
    setSelectedLifestyle("");
    setShowFilter(false);
    getProfileRecommendation();
    setSelectedIncome("");
    setSelectedSubcaste("");
  };
 
   return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
 
 
      {/* Filters */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setShowFilter(true)}
            className="flex ml-2 cursor-pointer items-center gap-2 bg-gradient-to-r from-rose-400 to-[#FF6B6B] text-white px-3 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
 
           <p className="text-sm font-medium text-gray-600">
          {filteredMatches.length} matches found
        </p>
        </div>
      </div>
 
 
      {/* Matches Grid */}
      <div className="px-4 pb-6">
        {filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMatches.map((match) => (
              <MatchCard key={match.profileId} match={match} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">💔</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No matches found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        )}
      </div>
 
      {/* Filter Overlay */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Filter Matches</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="p-2 cursor-pointer rounded-full transition-colors"
              >
                <X size={20} style={{color:"black"}} />
              </button>
            </div>
 
            <div className="p-4 overflow-y-auto max-h-80">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 
                  { label: "MinAge", value: selectedMinAge, options: MinAge, setter: setSelectedMinAge },
                  { label: "MaxAge", value: selectedMaxAge, options: MaxAge, setter: setSelectedMaxAge },
                  { label: "MinHeight", value: selectedMinHeight, options: Minheight, setter: setSelectedMinHeight },
                  { label: "MaxHeight", value: selectedMaxHeight, options: Maxheight, setter: setSelectedMaxHeight },
                  { label: "MinWeight", value: selectedMinWeight, options: Minweight, setter: setSelectedMinWeight },
                  { label: "MaxWeight", value: selectedMaxWeight, options: Maxweight, setter: setSelectedMaxWeight },
                  { label: "Gender", value: selectedGender, options: ["Male", "Female"], setter: setSelectedGender },
                  { label: "Education", value: selectedEducation, options: educationOptions, setter: setSelectedEducation },
                  { label: "Occupation", value: selectedOccupation, options: occupationdata, setter: setSelectedOccupation },
                   { label: "Annual Income", value: selectedincome, options: income, setter: setSelectedIncome },
                  { label: "State", value: selectedState, options: stateoption, setter: setSelectedState },
                  { label: "City", value: selectedCity, options: cityoption, setter: setSelectedCity },
                  { label: "Religion", value: selectedRegion, options: religionOption, setter: setSelectedRegion},
                  { label: "Caste", value: selectedCaste, options: casteoptions, setter: setSelectedCaste },
                  { label: "SubCaste", value: selectedsubcaste, options: subcasteoptions, setter: setSelectedSubcaste },
                  //{ label: "Lifestyle", value: selectedLifestyle, options: lifestyles, setter: setSelectedLifestyle },
                ].map((filter) => (
                  <div key={filter.label}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {filter.label}
                    </label>
                    <select
                      value={filter.value}
                      onChange={(e) => {filter.label === "Caste" ? setSelectedSubcaste(""):""; filter.setter(e.target.value);}}
                      className="w-full p-2.5 border border-gray-200 cursor-pointer rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-black bg-white text-sm"
                    >
                      <option value="">Select {filter.label}</option>
                      {filter.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
 
            <div className="flex gap-3 p-4 border-t">
              <button
                onClick={clearFilters}
                className="flex-1 cursor-pointer bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
              >
                Clear All
              </button>
              <button
                onClick={sendAllFiltersToAPI}
                className="flex-1 cursor-pointer bg-gradient-to-r from-rose-500 to-[#FF6B6B] text-white py-2.5 rounded-lg font-semibold hover:to-rose-600 hover:from-[#FF6B6B] transition-all duration-200 shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    
 
      {/* Filter Modal */}
      <FilterModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        options={modalOptions}
        onSelect={onSelectModalOption}
      />
    </div>
  );
};
 
export default MatchesScreen;
 
 
 
 
 