"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Menu,
  Camera,
  Shield,
  Star,
  Heart,
  MapPin,
  ArrowRight,
  Plus,
  Sparkles,
  Briefcase,
  Clock,
  Phone,
  MessageSquare,
  Video,
  Calendar,
  Eye,
  Scale,
  Ruler,
  XCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import ViewDrive from "../../components/User/ViewDrives";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { axiosPublic } from "../../base/constant";
import HoroscopePopup from "./Horoscope";
import { toast } from "react-toastify";
import ProfileVerificationModal from "./ProfileVerification";

const MatrimonyHomeScreen = () => {
  const [activeTab, setActiveTab] = useState("Regular");
  const [Name, setName] = useState("User");
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [profilePic, setProfilePic] = useState(null);

  const [showHoroscopePopup, setShowHoroscopePopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[verificationData,setVerificationData] = useState(null);
  const [horoscopeExists, setHoroscopeExists] = useState(false);
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [horoscopeForm, setHoroscopeForm] = useState({
    hour: "00",
    minute: "00",
    second: "00",
    birthPlace: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const[profileStatsData,setProfileStatsData] = useState(null);

  useEffect(()=>{
    axiosPublic.get(`/views/profile-stats`,{headers:{
      Authorization : `Bearer ${localStorage.getItem("token")}`,
    }})
    .then(res =>{
      if(res.status === 200){
        setProfileStatsData(res.data?.data);
      }
    })
  },[]);

  useEffect(()=>{
    async function fetchImages() {
          try {
            const res = await axiosPublic.get('/user/get-profile-pics', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
           if(res.status === 200 && res.data.data && Array.isArray(res.data.data)) {
            fetchProfileImage(res.data?.data[0]?.photoUrl);
           }
          } catch (error) {
            console.error('Error fetching image data:', error);
          }
        };
        fetchImages();
  },[]);

  async function fetchProfileImage(profileUrl) {
      if(profileUrl){
        const picName = profileUrl.split("/");
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

  useEffect(() => {
    checkHoroscopeExists();
  }, []);

  useEffect(()=>{
    axiosPublic.get("/user/get-my-verification",{headers:{
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    }})
    .then(res =>{
        console.log(res);
        setVerificationData(res.data);
    })
  },[]);

  const checkProfileVerified = () =>{
    if(verificationData && verificationData.verificationCompletion === "100%") {
      return true;
    }
    return false;
  }

  const checkHoroscopeExists = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("userId");
      const res = await axiosPublic.get(`/horoscope/getHoroscope/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setHoroscopeExists(true);
        setHoroscopeData(res.data);
        setSuccess(true);
      }
    } catch (error) {
      console.log("No horoscope found or error:", error);
      setHoroscopeExists(false);
    }
  };

  const handleHoroscopeClick = async () => {
    if (horoscopeExists) {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("userId");
        const res = await axiosPublic.get(`/horoscope/getHoroscope/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setHoroscopeData(res.data);
          setShowHoroscopePopup(true);
        }
      } catch (error) {
        console.error("Error fetching horoscope data:", error);
      }
    } else {
      setShowHoroscopePopup(true);
    }
  };

  const handleHoroscopeSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const birthTime = `${horoscopeForm.hour}:${horoscopeForm.minute}:${horoscopeForm.second}`;

      const res = await axiosPublic.post(
        "/horoscope/createHoroscope",
        {
          birthTime,
          birthPlace: horoscopeForm.birthPlace,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        await checkHoroscopeExists();
        setShowHoroscopePopup(false);
        setHoroscopeForm({
          hour: "00",
          minute: "00",
          second: "00",
          birthPlace: "",
        });
        toast.success("Horoscope created successfully!");
      }
    } catch (error) {
      console.error("Error creating horoscope:", error);
      toast.error("Error creating horoscope. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHoroscopeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePopupClose = (e) => {
    if (e.target === e.currentTarget) {
      setShowHoroscopePopup(false);
    }
  };

 

  useEffect(() => {
    const storedName = localStorage.getItem("firstName");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const [filteredMatches, setFilteredMatches] = useState([]);
  useEffect(() => {

    axiosPublic.post(`/recommendations/generate`,{},{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
      })
      .catch(err =>{
        console.error(err);
      })

    axiosPublic
      .get(`recommendations/getrecommendations`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setFilteredMatches(res.data.data);
        }
      })
      .catch(err =>{
        console.error("Error fetching recommendations:", err);
        toast.error("Failed to fetch recommendations. Please try again later.");
      })
  }, []);

  const InterestCard = ({ person, type = "incoming" }) => {
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
              className="w-full h-full object-cover  transition-transform duration-500 hover:scale-105"
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
        </div>

        <div className="p-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-sm truncate">
                {person.firstName}
              </h3>
              <p className="text-xs text-gray-600">
                {calculateAge(person.dateOfBirth)} years • {person.city}
              </p>
            </div>
          </div>

          <div className="flex items-center text-xs text-gray-600 mb-2">
            <Ruler size={10} className="mr-1 text-gray-400" />
            <span className="truncate">{person.height} cm</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
              {person.religion}
            </span>
            <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
              {person.caste}
            </span>
          </div>

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

          <button
            className="w-full  cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1"
            onClick={(e) => {
              router.push(`/Matches/${person.profileId}`);
            }}
          >
            <Eye size={10} />
            View Profile
          </button>
        </div>
      </div>
    );
  };

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const diff = midnight - now;

      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(
        2,
        "0"
      );
      const minutes = String(
        Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0");
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(
        2,
        "0"
      );

      setTimeLeft(`${hours}h:${minutes}m:${seconds}s`);
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-red-400 to-pink-400 text-white px-4 md:px-6 py-4 rounded-b-3xl shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab("Regular")}
              className={`px-5 py-2.5 rounded-full font-semibold transition-all ${
                activeTab === "Regular"
                  ? "bg-white/30 text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Regular
            </button>
            <button
              onClick={() => setActiveTab("PRIME")}
              className={`px-5 py-2.5 cursor-pointer rounded-full font-semibold transition-all ${
                activeTab === "PRIME"
                  ? "bg-white/30 text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              PRIME ●
            </button>
          </div> */}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* User Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 -mt-3 mb-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-red-50 border-4 border-red-400 rounded-full flex items-center justify-center text-3xl">
                  {profilePic ? (
                    <Image
                      src={profilePic}
                      width={400}
                      height={600}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <> 👤 </>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{Name}</h2>
                <p className="text-gray-600 text-sm">VivaahAI Matrimony</p>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-gray-600 text-sm">Free Member</span>
                  <button className="bg-red-400 cursor-pointer hover:bg-red-500 text-white px-4 py-1 rounded-full text-xs font-semibold transition-colors" onClick={()=>{router.push("/Plans")}}>
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: Camera,
              label: "Add",
              sublabel: "Photo(s)",
              color: "green",
              bgColor: "bg-green-50",
              onClick: () => {
                router.push("/Profile");
              },
            },
            {
              icon: Shield,
              label: "Verify",
              sublabel: "Profile",
              color: "blue",
              bgColor: "bg-blue-50",
              onClick: () => {setIsModalOpen(true)},
              verified : checkProfileVerified(),  
            },
            {
              icon: Star,
              label: horoscopeExists ? "View" : "Add",
              sublabel: "Horoscope",
              color: "purple",
              bgColor: "bg-purple-50",
              onClick: handleHoroscopeClick,
              verified: horoscopeExists,
            },
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center group "
              onClick={action.onClick}
            >
              <div className="relative mb-3 cursor-pointer">
                <div
                  className={`w-16 h-16 ${action.bgColor} rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}
                >
                  <action.icon
                    size={24}
                    className={`text-${action.color}-800`}
                  />
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-6 h-6 ${
                    action.verified ? "bg-green-500" : `bg-${action.color}-500`
                  } rounded-full flex items-center justify-center border-2 border-white`}
                >
                  {action.verified ? (
                    <CheckCircle2 size={12} className="text-white" />
                  ) : (
                    <Plus size={12} className="text-white" />
                  )}
                </div>
              </div>
              <span className="font-semibold text-gray-900 text-sm">
                {action.label}
              </span>
              <span className="text-gray-600 text-xs">{action.sublabel}</span>
            </button>
          ))}
        </div>

        {showHoroscopePopup && (
          <HoroscopePopup
            open={showHoroscopePopup}
            onClose={() => setShowHoroscopePopup(false)}
            horoscopeExists={horoscopeExists}
            horoscopeData={horoscopeData}
            horoscopeForm={horoscopeForm}
            handleInputChange={handleInputChange}
            handleHoroscopeSubmit={handleHoroscopeSubmit}
            isSubmitting={isSubmitting}
          />
        )}

         <ProfileVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        verificationData={verificationData}
      />

        {/* Recommendations Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                💕 Daily Recommendations
              </h3>
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
              {filteredMatches.map((profile,index) => (
                <div key={index}>
                  <InterestCard person={profile?.recommendedUser?.UserProfile} />
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full bg-white border-2 cursor-pointer border-red-400 text-red-400 hover:bg-red-50 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition-colors"
            onClick={(e) => {
              router.push("/Matches");
            }}
          >
            <span>View all matches</span>
            <ArrowRight size={16} />
          </button>

          {/* Stats Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📊 Your Profile Stats
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-red-400 mb-1">{profileStatsData?.profileViews || 0}</p>
                <p className="text-sm text-gray-600">Profile Views</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-400 mb-1">{profileStatsData?.interests || 0}</p>
                <p className="text-sm text-gray-600">Interests</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-400 mb-1">{profileStatsData?.matches || 0}</p>
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
