'use client';
import { Briefcase, Calendar, CheckCircle2, Clock, Eye, Heart, MessageSquare, Phone, Sparkles, Star, Video, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
 
 
export default function  InterestCard ({ person, type, onAction }) {
 
  console.log("id : ",person.id);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
 
  useEffect(() => {
    if (person.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % person.photos.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [person.photos.length]);
 
  const router = useRouter();
 
    const handleViewProfile = () => {
    router.push(`/Matches/${person.id}`);
    };
 
 
  const handleSendInterest = async (e, interactionType) => {
      e.stopPropagation();
     
      try {
        const token = localStorage.getItem('token');
       
        const json = {
          targetUserId: person.id,
          interactionType: interactionType,
        }
        if(interactionType !== "disliked"){
          json.interactionCode = 2;
        }
        const response = await fetch('https://stu.globalknowledgetech.com:9443/user/add-userInteraction', {
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
   
  return (
    <div className="bg-white cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
       
        {!person.photos[currentPhotoIndex] ? (
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
                  src={person.photos[currentPhotoIndex]}
                  width={400}
                  height={600}
                  alt={person.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
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
          {person.compatibility}%
        </div>
 
        {/* Photo Indicators */}
        {person.photos.length > 1 && (
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
        )}
      </div>
 
      {/* Content */}
      <div className="p-3">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-sm truncate">{person.name}</h3>
            <p className="text-xs text-gray-600">{person.age} years • {person.location}</p>
          </div>
          {type === 'sent' && person.status && (
            <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              person.status === 'viewed'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {person.status === 'viewed' ? 'Viewed' : 'Pending'}
            </div>
          )}
        </div>
 
        {/* Profession */}
        {type === 'viewed' ?
          <div className="flex items-center text-xs text-gray-600 mb-2">
          <Briefcase size={10} className="mr-1 text-gray-400" />
          <span className="truncate">{person.company}</span>
        </div>
          :
        <div className="flex items-center text-xs text-gray-600 mb-2">
          <Briefcase size={10} className="mr-1 text-gray-400" />
          <span className="truncate">{person.profession}</span>
        </div>
        }
       
 
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
         
       
       
 
        {/* Actions */}
        {type === 'incoming' && (
          <div className="flex gap-2">
            <button
              onClick={(e) =>handleSendInterest(e,"disliked")}
              className="flex-1 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1"
            >
              <XCircle size={10} />
              Pass
            </button>
            <button
              onClick={(e) =>handleSendInterest(e,"liked")}
              className="flex-1 cursor-pointer bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1"
            >
              <Heart size={10} />
              Like
            </button>
          </div>
        )}
       
        {type === 'matched' && (
          <div className="space-y-1.5">
            <button className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1">
              <MessageSquare size={10} />
              Message
            </button>
            <div className="flex gap-1.5">
              <button className="flex-1 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1">
                <Phone size={8} />
                Call
              </button>
              <button className="flex-1 cursor-pointer bg-purple-50 hover:bg-purple-100 text-purple-600 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1">
                <Video size={8} />
                Video
              </button>
              <button className="flex-1 cursor-pointer bg-pink-50 hover:bg-pink-100 text-pink-600 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1">
                <Calendar size={8} />
                Meet
              </button>
            </div>
          </div>
        )}
 
        {type === 'sent' && (
          <button className="w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1 " onClick={handleViewProfile}>
            <Eye size={10} />
            View Profile
          </button>
        )}
 
        {type === 'viewed' && (
          <div className="flex gap-2">
            <button
              onClick={() => onAction(person.id, 'send_interest')}
              className="flex-1 cursor-pointer bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1"
            >
              <Heart size={10} />
              Send Interest
            </button>
            <button className="px-3 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium text-xs flex items-center justify-center">
              <Eye size={10} onClick={handleViewProfile} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};