"use client";
import React, { useCallback, useEffect, useState } from 'react';
import {
  Activity,
  CheckCircle,
  ChevronRight,
  ChevronsRight,
  Globe,
  Headphones,
  Languages,
  Music,
  Plane,
  Salad,
  UtensilsCrossed,
  Wine
} from 'lucide-react';
import { axiosPublic } from '../../base/constant';
import Toast from './ToastComponent';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


// Mock API function - replace with your actual API implementation

const SelectableTagList = ({
  title,
  icon,
  items = [],
  selectedItems,
  setSelectedItems,
  handlePress
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 20);

  return (
    <FormSection title={title} icon={icon}>
      <div className="flex flex-wrap mb-4 gap-2">
        {displayedItems.map((item, index) => {
          if (!item) return null;
          
          const isSelected = selectedItems.includes(item);
          const backgroundColor = isSelected ? 'bg-[#FF6B6B]' : 'bg-white';
          const textColor = isSelected ? 'text-white' : 'text-black';

          return (
            <button
              key={index}
              className={`${backgroundColor} ${textColor} cursor-pointer border border-[#FF6B6B] rounded-full px-4 py-2 text-sm whitespace-nowrap hover:opacity-80 transition-opacity`}
              onClick={() => handlePress(item, selectedItems, setSelectedItems)}
            >
              {item}
            </button>
          );
        })}
      </div>

      {items.length > 20 && (
        <div className="flex items-center justify-center">
          <button 
            className="text-[#FF6B6B] cursor-pointer underline hover:text-[#FF6B6B]-800"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </FormSection>
  );
};

const FormSection = ({ title, icon, children }) => (
  <div className="w-full mb-6 bg-gray-100 backdrop-blur-sm rounded-2xl p-6 border border-[#FF6B6B]/30 transition-all duration-300">
    <div className="flex items-center mb-4">
      <div className="bg-[#FF6B6B] rounded-full p-2 mr-3">
        {icon}
      </div>
      <h2 className="text-lg font-bold text-[#FF6B6B]">
        {title}
      </h2>
    </div>
    {children}
  </div>
);

const MatrimonialProfile = ({nextStep,isEdit}) => {
  const[hobbies,setHobbies] = useState([]);
  const[travelPreferences,setTravelPreferences] = useState([]);
  const[musicMovieTastes,setMusicMovieTastes] = useState([]);
  const[fitnessActivities,setFitnessActivities] = useState([]);
  const[socialCauses,setSocialCauses] = useState([]);
  const[dietPreference,setDietPreference] = useState([]);
  const[habits,setHabits] = useState([]);
  const[cuisinePreference,setCuisinePreference] = useState([]);
  const[knownLanguages,setKnownLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
   const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const router = useRouter();

  useEffect(()=>{
    async function fetchDietPreferences() {
      if(isEdit){
      await axiosPublic.get(`/Interests/user-interests`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        if(resp.status === 200){
        const data = resp.data;
        setSelectedCause(data.socialCausesOfInterest || []);
        setSelectedCuisines(data.cuisinePreferences || []);
        setSelectedDiets(data.dietPreferences || []);
        setSelectedFitness(data.sportsAndFitness || []);
        setSelectedHobbies(data.hobbiesAndInterests || []);
        setSelectedLanguages(data.languagesKnown || []);
        setSelectedMusic(data.musicOrMovieTastes || []);
        setSelectedTravel(data.travelPreferences || []);
        setSelectedHabits(data.habits || []);
        }
      })
      .catch((error) => {
        console.error('Error fetching user Interests:', error);
      });
    }
  }
    fetchDietPreferences();
  },[]);
 
 
  useEffect(()=>{
    async function fetchDietPreferences() {
      await axiosPublic.get(`/utility/utilHead?utilHead=diet_preferences`,{
        headers: {
          'Authorization': `Bearer ${ localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDietPreference(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching diet preferences:', error);
      });
    }
    fetchDietPreferences();
 
  },[]);

  useEffect(()=>{
    async function fetchHobbies() {
      await axiosPublic.get(`utility/utilHead?utilHead=hobby`,{
        headers: {
          'Authorization': `Bearer ${ localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setHobbies(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching hobbies:', error);
      });
    }
    fetchHobbies();
 
  },[]);

  useEffect(()=>{
    async function fetchSocialCauses() {
      await axiosPublic.get(`/utility/utilHead?utilHead=social_cause`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSocialCauses(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching social causes:', error);
      });
    }
    fetchSocialCauses();
 
  },[]);
  useEffect(()=>{
    async function fetchTravelPreferences() {
      await axiosPublic.get(`/utility/utilHead?utilHead=travel_preference`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTravelPreferences(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching travel preferences:', error);
      });
    }
    fetchTravelPreferences();
 
  },[]);
  useEffect(()=>{
    async function fetchMusicMoviesTastes() {
      await axiosPublic.get(`/utility/utilHead?utilHead=music_movie_taste`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMusicMovieTastes(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching Music movie tastes:', error);
      });
    }
    fetchMusicMoviesTastes();
 
  },[]);
  useEffect(()=>{
    async function fetchFitnessActivities() {
      await axiosPublic.get(`/utility/utilHead?utilHead=games_play`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setFitnessActivities(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching Fitness activities:', error);
      });
    }
    fetchFitnessActivities();
 
  },[]);
  useEffect(()=>{
    async function fetchDietPreferences() {
      await axiosPublic.get(`/utility/utilHead?utilHead=habits`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setHabits(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching habits:', error);
      });
    }
    fetchDietPreferences();
 
  },[]);
  useEffect(()=>{
    async function fetchDietPreferences() {
      await axiosPublic.get(`/utility/utilHead?utilHead=cuisine_preference`,{
        headers: {
          'Authorization': `Bearer ${ localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCuisinePreference(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching cuisine preferences:', error);
      });
    }
    fetchDietPreferences();
 
  },[]);
  useEffect(()=>{
    async function fetchDietPreferences() {
      await axiosPublic.get(`/utility/utilHead?utilHead=language`,{
        headers: {
          'Authorization': `Bearer ${ localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setKnownLanguages(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching language preferences:', error);
      });
    }
    fetchDietPreferences();
 
  },[]);
 
  // Form submission handler
  const handleSubmit = async() => {
 
    const token = localStorage.getItem("token");
    setLoading(true);
 
    const json = JSON.stringify({
  "hobbiesAndInterests": selectedHobbies,
  "travelPreferences": selectedTravel,
  "musicOrMovieTastes": selectedMusic,
  "sportsAndFitness": selectedFitness,
  "socialCausesOfInterest": selectedCause,
  "languagesKnown": selectedLanguages,
  "cuisinePreferences": selectedCuisines,
  "habits": selectedHabits,
  "dietPreferences": selectedDiets,
})

const api = isEdit ? `/Interests/update-user-interests` : `/Interests/user-interests`
    console.log('Form Data:', json);
    await axiosPublic.post(api, json,{
      headers : {
        "Authorization" : `Bearer ${token}`,
      }
    })
    .then(res =>{
      if(res.status === 201){
        toast.success('Your Interest details have been added successfully!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        nextStep();
      }
      else if(res.status === 200 ){
        toast.success('Your Interest details have been updated successfully!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        router.back();
      }
    })
    .catch(err =>{
      console.error("Error updating profile:", err);
      toast.error('Failed to add profile. Please try again.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    })
    .finally(() => {
      setLoading(false);
    });

  };

 
  const [selectedTravel, setSelectedTravel] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [selectedFitness, setSelectedFitness] = useState([]);
  const [selectedCause, setSelectedCause] = useState([]);
  const[selectedHobbies, setSelectedHobbies] = useState([]);
  const[selectedDiets, setSelectedDiets] = useState([]);
  const[selectedHabits, setSelectedHabits] = useState([]);
  const[selectedCuisines, setSelectedCuisines] = useState([]);
  const[selectedLanguages, setSelectedLanguages] = useState([]);
 
 
  const handlePress = useCallback((item, variable, setVariable) => {
  if (variable.includes(item)) {
    setVariable(variable.filter((i) => i !== item));
  } else {
    setVariable([...variable, item]);
  }
}, []);

  return (
    <div className="min-h-screen  rounded-xl">

      <div className="flex-1 ">
        <div className="max-w-4xl mx-auto p-6">

          {/* Hobbies/Interests */}
          <SelectableTagList
            title="Hobbies & Interests"
            icon={<Headphones size={24} color="white" />}
            items={hobbies}
            selectedItems={selectedHobbies}
            setSelectedItems={setSelectedHobbies}
            handlePress={handlePress}
          />

          {/* Travel Preferences */}
          <SelectableTagList
            title="Travel Preferences"
            icon={<Plane size={24} color="white" />}
            items={travelPreferences}
            selectedItems={selectedTravel}
            setSelectedItems={setSelectedTravel}
            handlePress={handlePress}
          />

          {/* Music / Movies Tastes */}
          <SelectableTagList
            title="Music / Movies Tastes"
            icon={<Music size={24} color="white" />}
            items={musicMovieTastes}
            selectedItems={selectedMusic}
            setSelectedItems={setSelectedMusic}
            handlePress={handlePress}
          />

          {/* Sports and Fitness Activities */}
          <SelectableTagList
            title="Sports and Fitness Activities"
            icon={<Activity size={24} color="white" />}
            items={fitnessActivities}
            selectedItems={selectedFitness}
            setSelectedItems={setSelectedFitness}
            handlePress={handlePress}
          />

          {/* Social causes of interest */}
          <SelectableTagList
            title="Social causes of interest"
            icon={<Globe size={24} color="white" />}
            items={socialCauses}
            selectedItems={selectedCause}
            setSelectedItems={setSelectedCause}
            handlePress={handlePress}
          />

          {/* Habits */}
          <SelectableTagList
            title="Habits"
            icon={<Wine size={24} color="white" />}
            items={habits}
            selectedItems={selectedHabits}
            setSelectedItems={setSelectedHabits}
            handlePress={handlePress}
          />

          {/* Diet Preferences */}
          <SelectableTagList
            title="Diet Preferences"
            icon={<Salad size={24} color="white" />}
            items={dietPreference}
            selectedItems={selectedDiets}
            setSelectedItems={setSelectedDiets}
            handlePress={handlePress}
          />

          {/* Cuisine Preference */}
          <SelectableTagList
            title="Cuisine Preferences"
            icon={<UtensilsCrossed size={24} color="white" />}
            items={cuisinePreference}
            selectedItems={selectedCuisines}
            setSelectedItems={setSelectedCuisines}
            handlePress={handlePress}
          />

          {/* Languages Known */}
          <SelectableTagList
            title="Languages Known"
            icon={<Languages size={24} color="white" />}
            items={knownLanguages}
            selectedItems={selectedLanguages}
            setSelectedItems={setSelectedLanguages}
            handlePress={handlePress}
          />

           {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="group cursor-pointer relative px-12 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-full text-black font-bold text-lg shadow-2xl hover:shadow-[#FF6B6B]/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center space-x-3">
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saving Profile...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    <span>Save & Continue</span>
                    <ChevronsRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrimonialProfile;