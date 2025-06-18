"use client"
import React, { useState, useEffect,useRef } from 'react';
import { 
  User, 
  Phone, 
  Activity, 
  Home, 
  Globe, 
  Star, 
  Coffee, 
  Calendar, 
  ChevronRight,
  Heart,
  Sparkles,
  MapPin,
  ChevronsRight,
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import { Camera, Upload, X, Check } from 'lucide-react';
import { axiosPublic } from '../../base/constant';
import Toast from './ToastComponent';
import {useRouter} from 'next/navigation';
import { toast } from 'react-toastify';
import SelfieComponent from './SelfieComponent';
import AadharCardComponent from './AadharCardComponent';

const MatrimonialProfile = ({nextStep,isEdit = false}) => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    alternateEmail: '',
    dateOfBirth: new Date(),
    country: '',
    state: '',
    city: '',
    primaryContact: '',
    secondaryContact: '',
    gender: '',
    height: '',
    weight: '',
    bodyType: '',
    maritalStatus: '',
    children: '',
    wantChildren: '',
    religion: '',
    caste: '',
    subcaste: '',
    motherTongue: '',
    dietPreference: '',
    smokingHabits: '',
    drinkingHabits: '',
    zodiacSign: '',
    starSign: '',
  });

  const [motherTongueOptions, setMotherTongueOptions] = useState([]);
  const [dietOptions, setDietOptions] = useState([]);
  const [smokingOptions, setSmokingOptions] = useState([]);
  const [drinkingOptions, setDrinkingOptions] = useState([]);
  const [religionOptions, setReligionOptions] = useState([]);
  const [casteOptions, setCasteOptions] = useState([]);
  const [subcasteOptions, setSubcasteOptions] = useState([]);
  const [zodiacOptions, setZodiacOptions] = useState([]);
  const [starOptions, setStarOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [maritalOptions, setMaritalOptions] = useState([]);
  const [bodyTypeOptions, setBodyTypeOptions] = useState([]);
  const [haveChildrenOptions, setHaveChildrenOptions] = useState([]);
  const [wantChildrenOptions, setWantChildrenOptions] = useState([]);
  const [getUserDetails, setUserDetails] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    height: '',
    weight: ''
  });

  // Fetch Mother Tongue Options
  useEffect(() => {
    async function fetchMotherTongue() {
      try {
        const response = await axiosPublic.get('/utility/utilHead?utilHead=mother_tongue');
        const result = response.data;
        if (result && Array.isArray(result.data)) {
          setMotherTongueOptions(result.data);
        } else if (result && Array.isArray(result)) {
          setMotherTongueOptions(result);
        }
      } catch (error) {
        console.error('Error fetching mother tongue options:', error);
      }
    }
    fetchMotherTongue();
  }, []);

  // Fetch Diet Options
  useEffect(() => {
    async function fetchDietOption() {
      try {
        const response = await axiosPublic.get('/utility/utilHead?utilHead=diet_preferences');
        const result = response.data;
        if (result && Array.isArray(result.data)) {
          setDietOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching diet preference options:', error);
      }
    }
    fetchDietOption();
  }, []);

  // Fetch Smoking Options
  useEffect(() => {
    async function fetchSmokingOption() {
      try {
        const response = await axiosPublic.get('/utility/utilHead?utilHead=smoking_habits');
        const result = response.data;
        if (result && Array.isArray(result.data)) {
          setSmokingOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching smoking habits options:', error);
      }
    }
    fetchSmokingOption();
  }, []);

  // Fetch Drinking Options
  useEffect(() => {
    async function fetchDrinkingOption() {
      try {
        const response = await axiosPublic.get('/utility/utilHead?utilHead=drinking_habits');
        const result = response.data;
        if (result && Array.isArray(result.data)) {
          setDrinkingOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching drinking habits options:', error);
      }
    }
    fetchDrinkingOption();
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

  // Fetch Caste Options
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

  // Fetch Subcastes when caste changes
  useEffect(() => {
    async function fetchSubcastes() {
      if (!formData.caste) {
        setSubcasteOptions([]);
        return;
      }
      try {
        const response = await axiosPublic.get(`/utility/parent?parentCode=${formData.caste}`);
        const result = response.data;
        if (result && Array.isArray(result.data)) {
          setSubcasteOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching subcaste options:', error);
      }
    }
    fetchSubcastes();
  }, [formData.caste]);

  // Fetch Zodiac Options
  useEffect(() => {
    async function fetchZodiac() {
      try {
        const response = await axiosPublic.get('/utility/utilHead?utilHead=zodiac_sign');
        const result = response.data;
        if (result && Array.isArray(result.data)) {
          setZodiacOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching zodiac options:', error);
      }
    }
    fetchZodiac();
  }, []);

  // Fetch Star Options when zodiac changes
  useEffect(() => {
    async function fetchStars() {
      if (!formData.zodiacSign) {
        setStarOptions([]);
        return;
      }
      try {
        const response = await axiosPublic.get(`/utility/parent?parentCode=${formData.zodiacSign}`);
        const result = response.data;
        if (result && Array.isArray(result.data)) {
          setStarOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching star options:', error);
      }
    }
    fetchStars();
  }, [formData.zodiacSign]);

  // Fetch States
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
      if (!formData.state) {
        setCityOptions([]);
        return;
      }
      try {
        const stateValue = formData.state.replace(/\s+/g, '_');
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
  }, [formData.state]);

  // Fetch Marital Status Options
  useEffect(() => {
    async function fetchMaritalOption() {
      try {
        const response = await axiosPublic.get('/utility/utilHead?utilHead=marital_status');
        const result = response.data;
        if (result && Array.isArray(result.data)) {
          setMaritalOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching marital options:', error);
      }
    }
    fetchMaritalOption();
  }, []);

  // Fetch Body Type Options
  useEffect(() => {
    async function fetchBodyTypeOption() {
      try {
        const response = await axiosPublic.get('/utility/utilHead?utilHead=body_type');
        const result = response.data;
        if (result && Array.isArray(result.data)) {
          setBodyTypeOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching body type options:', error);
      }
    }
    fetchBodyTypeOption();
  }, []);

  // Fetch Have Children Options
  useEffect(() => {
    async function fetchHaveChildrenOption() {
      try {
        const response = await axiosPublic.get('/utility/utilHead?utilHead=children');
        const result = response.data;
        if (result && Array.isArray(result.data)) {
          setHaveChildrenOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching have children options:', error);
      }
    }
    fetchHaveChildrenOption();
  }, []);

  // Fetch Want Children Options
  useEffect(() => {
    async function fetchWantChildrenOption() {
      try {
        const response = await axiosPublic.get('/utility/utilHead?utilHead=want_children');
        const result = response.data;
        if (result && Array.isArray(result.data)) {
          setWantChildrenOptions(result.data);
        }
      } catch (error) {
        console.error('Error fetching want children options:', error);
      }
    }
    fetchWantChildrenOption();
  }, []);

  // Fetch User Details
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage?.getItem('token');
        if (!token) return;
        
        const response = await axiosPublic.get('/user/user-profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = response.data;
        if (result) {
          const userData = result;
          setUserDetails(result);
          setFormData(prevData => ({
            ...prevData,
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            alternateEmail: userData.alternateEmail || '',
            dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : new Date(),
            primaryContact: userData.primaryContact || '',
            secondaryContact: userData.secondaryContact || '',
            height: userData.height ? userData.height.toString() : '',
            weight: userData.weight ? userData.weight.toString() : '',
            country: userData.country || '',
            state: userData.state || '',
            city: userData.city || '',
            gender: userData.gender || '',
            bodyType: userData.bodyType || '',
            maritalStatus: userData.maritalStatus || '',
            children: userData.children || '',
            wantChildren: userData.wantChildren || '',
            religion: userData.religion || '',
            caste: userData.caste || '',
            subcaste: userData.subCaste || '',
            zodiacSign: userData.zodiacSign || '',
            starSign: userData.starSign || '',
            dietPreference: userData.dietPreferences || '',
            smokingHabits: userData.smokingHabits || '',
            drinkingHabits: userData.drinkingHabits || '',
            motherTongue: userData.motherTongue || '',
          }));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
    fetchUser();
  }, []);

 const validateFields = () => {
    let valid = true;
    const newErrors = {
      height: '',
      weight: ''
    };

    if (formData.height && parseInt(formData.height) < 140) {
      newErrors.height = 'Minimum height should be 140cm';
      valid = false;
    }

    if (formData.weight && parseInt(formData.weight) < 25) {
      newErrors.weight = 'Minimum weight should be 25kg';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    setLoading(true);
    try {
      const submissionData = {
        ...formData,
        height: formData.height ? parseInt(formData.height, 10) : null,
        weight: formData.weight ? parseInt(formData.weight, 10) : null,
        dietPreferences: formData.dietPreference,
        subCaste: (formData.subcaste && formData.subcaste.trim() !== '') ? formData.subcaste : null,
        isBasicProfileSubmitted: true,
      };

      const authToken = localStorage?.getItem('token');

      if (!authToken) {
        console.error('Auth token not found');
        setToastMessage('Authentication error. Please login again.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }

      const response = await axiosPublic.post('/user/add-Profile', submissionData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        toast.success('Basic profile details have been added successfully!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        nextStep();
        
        if (!isEdit) {
            nextStep();
        } else {
          router.back();
        }
      } else {
        toast.error('Failed to add profile. Please try again.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
      toast.error('Network error. Please try again.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setLoading(false);
    }
  };
  const countries = ['India'];


  const[isAadharSubmitted,setIsAadharSubmitted] = useState(false);
  const[isSelfieSubmitted,setIsSelfieSubmitted] = useState(false);



  return (
    <>
    <div className="min-h-screen text-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#FF6B6B] rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-[#FF6B6B] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-[#FF6B6B] rounded-full opacity-10 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-[#FF6B6B] rounded-full opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      {/* <div className="relative z-10 ">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-8 h-8 text-[#FF6B6B] mr-3 animate-pulse" />
              <h1 className="text-3xl font-bold text-[#FF6B6B]">
                Create Your Profile
              </h1>
            </div>
            <p className="text-gray-400 text-sm">
              Find your perfect match by completing your profile
            </p>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
       <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">

          <AadharCardComponent aadharStatus={isAadharSubmitted} onChange={(data)=>setIsAadharSubmitted(data)} />

          <SelfieComponent selfieStatus={isSelfieSubmitted} onChange={(data)=>setIsSelfieSubmitted(data)} />
         
          {/* Personal Details */}
          <div className="bg-gray-100 backdrop-blur-sm rounded-2xl p-6 border border-[#FF6B6B]/30 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-[#FF6B6B] rounded-full mr-4 shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#FF6B6B]">Personal Details</h2>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  disabled
                  className="w-full px-4 py-3 border border-[#FF6B6B]/30 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your first name"
                />
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  disabled
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your last name"
                />
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Alternate Email (Optional)</label>
                <input
                  type="email"
                  value={formData.alternateEmail}
                  onChange={(e) => handleChange('alternateEmail', e.target.value)}
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300"
                  placeholder="Enter alternate email address"
                />
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Date of Birth</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.dateOfBirth instanceof Date ? formData.dateOfBirth.toISOString().split('T')[0] : formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FF6B6B] pointer-events-none" />
                </div>
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Gender</label>
                <div className="flex flex-wrap gap-4 mt-3">
                  {['male', 'female', 'other'].map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        className="w-4 h-4 text-[#FF6B6B] border-[#FF6B6B] focus:ring-[#FF6B6B]"
                      />
                      <span className="text-black capitalize group-hover:text-[#FF6B6B] transition-colors duration-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
 
          {/* Contact Information */}
          <div className="bg-gray-100 backdrop-blur-sm border border-[#FF6B6B]/30 rounded-2xl p-6 hover:border-[#FF6B6B]/50 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-[#FF6B6B] rounded-full mr-4 shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#FF6B6B]">Contact Information</h2>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Primary Contact</label>
                <input
                  type="tel"
                  value={formData.primaryContact}
                  onChange={(e) => handleChange('primaryContact', e.target.value)}
                  disabled
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your primary contact number"
                />
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Secondary Contact (Optional)</label>
                <input
                  type="tel"
                  value={formData.secondaryContact}
                  onChange={(e) => handleChange('secondaryContact', e.target.value)}
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your secondary contact number"
                />
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Country</label>
                <div className="relative">
                  <select
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                  >
                    <option value="" className="bg-black/10">Select Country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country} className="bg-black/10">{country}</option>
                    ))}
                  </select>
                  <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FF6B6B] pointer-events-none" />
                </div>
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">State</label>
                <div className="relative">
                  <select
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                  >
                    <option value="" className="bg-black/10">Select State</option>
                    {stateOptions.map((state, index) => (
                      <option key={index} value={state} className="bg-black/10">{state}</option>
                    ))}
                  </select>
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FF6B6B] pointer-events-none" />
                </div>
              </div>
 
              <div className="space-y-2 md:col-span-2">
                <label className="text-[#FF6B6B] font-medium">City</label>
                <div className="relative">
                  <select
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                  >
                    <option value="" className="bg-black/10">Select City</option>
                    {cityOptions.map((city, index) => (
                      <option key={index} value={city} className="bg-black/10">{city}</option>
                    ))}
                  </select>
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FF6B6B] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
 
          {/* Physical Attributes */}
        <div className="bg-gray-100 backdrop-blur-sm border border-[#FF6B6B]/30 rounded-2xl p-6 hover:border-[#FF6B6B]/50 transition-all duration-300">
    <div className="flex items-center mb-6">
      <div className="p-3 bg-[#FF6B6B] rounded-full mr-4 shadow-lg">
        <Activity className="w-6 h-6 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-[#FF6B6B]">Physical Attributes</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label className="text-[#FF6B6B] font-medium">Height (cm)</label>
        <input
          type="number"
          value={formData.height}
          onChange={(e) => handleChange('height', e.target.value)}
          min="140"
          className={`w-full px-4 py-3 border ${errors.height ? 'border-red-500' : 'border-[#FF6B6B]/30'} rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300`}
          placeholder="Height in cm (min 140cm)"
        />
        {errors.height && (
          <p className="text-red-500 text-sm mt-1">{errors.height}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-[#FF6B6B] font-medium">Weight (kg)</label>
        <input
          type="number"
          value={formData.weight}
          onChange={(e) => handleChange('weight', e.target.value)}
          min="25"
          className={`w-full px-4 py-3 border ${errors.weight ? 'border-red-500' : 'border-[#FF6B6B]/30'} rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300`}
          placeholder="Weight in kg (min 25kg)"
        />
        {errors.weight && (
          <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-[#FF6B6B] font-medium">Body Type</label>
        <select
          value={formData.bodyType}
          onChange={(e) => handleChange('bodyType', e.target.value)}
          className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
        >
          <option value="" className="bg-black/10">Select Body Type</option>
          {bodyTypeOptions.map((bodyType, index) => (
            <option key={index} value={bodyType?.toLowerCase()} className="bg-black/10">{bodyType}</option>
          ))}
        </select>
      </div>
    </div>
  </div>

          {/* Family & Relationship */}
          <div className="bg-gray-100 backdrop-blur-sm border border-[#FF6B6B]/30 rounded-2xl p-6 hover:border-[#FF6B6B]/50 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-[#FF6B6B] rounded-full mr-4 shadow-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#FF6B6B]">Family & Relationship</h2>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Marital Status</label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => handleChange('maritalStatus', e.target.value)}
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                >
                  <option value="" className="bg-black/10">Select Marital Status</option>
                  {maritalOptions.map((status, index) => (
                    <option key={index} value={status?.toLowerCase()} className="bg-black/10">{status}</option>
                  ))}
                </select>
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Have Children</label>
                <select
                  value={formData.children}
                  onChange={(e) => handleChange('children', e.target.value)}
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                >
                  <option value="" className="bg-black/10">Select Option</option>
                  {haveChildrenOptions.map((option, index) => (
                    <option key={index} value={option?.toLowerCase()} className="bg-black/10">{option}</option>
                  ))}
                </select>
              </div>
 
              <div className="space-y-2 md:col-span-2">
                <label className="text-[#FF6B6B] font-medium">Want Children</label>
                <select
                  value={formData.wantChildren}
                  onChange={(e) => handleChange('wantChildren', e.target.value)}
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                >
                  <option value="" className="bg-black/10">Select Option</option>
                  {wantChildrenOptions.map((option, index) => (
                    <option key={index} value={option?.toLowerCase()} className="bg-black/10">{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
 
          {/* Cultural & Religious Background */}
          <div className="bg-gray-100 backdrop-blur-sm border border-[#FF6B6B]/30 rounded-2xl p-6 hover:border-[#FF6B6B]/50 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-[#FF6B6B] rounded-full mr-4 shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#FF6B6B]">Cultural & Religious Background</h2>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Religion</label>
                <select
                  value={formData.religion}
                  onChange={(e) => handleChange('religion', e.target.value)}
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                >
                  <option value="" className="bg-black/10">Select Religion</option>
                  {religionOptions.map((religion, index) => (
                    <option key={index} value={religion} className="bg-black/10">{religion}</option>
                  ))}
                </select>
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Caste</label>
                <select
                  value={formData.caste}
                  onChange={(e) => handleChange('caste', e.target.value)}
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                >
                  <option value="" className="bg-black/10">Select Caste</option>
                  {casteOptions.map((caste, index) => (
                    <option key={index} value={caste} className="bg-black/10">{caste}</option>
                  ))}
                </select>
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Subcaste</label>
                <select
                  value={formData.subcaste}
                  onChange={(e) => handleChange('subcaste', e.target.value)}
                  className="w-full px-4 py-3 border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                  disabled={!formData.caste}
                >
                  <option value="" className="bg-black/10">Select Subcaste</option>
                  {subcasteOptions.map((subcaste, index) => (
                    <option key={index} value={subcaste} className="bg-black/10">{subcaste}</option>
                  ))}
                </select>
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Mother Tongue</label>
                <select
                  value={formData.motherTongue}
                  onChange={(e) => handleChange('motherTongue', e.target.value)}
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                >
                  <option value="" className="bg-black/10">Select Mother Tongue</option>
                  {motherTongueOptions.map((language, index) => (
                    <option key={index} value={language} className="bg-black/10">{language}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
 
           {/* Astrological Details */}
          <div className="bg-gray-100 backdrop-blur-sm border border-[#FF6B6B]/30 rounded-2xl p-6 hover:border-[#FF6B6B]/50 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-[#FF6B6B] rounded-full mr-4 shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#FF6B6B]">Astrological Details</h2>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Zodiac Sign</label>
                <select
                  value={formData.zodiacSign}
                  onChange={(e) => handleChange('zodiacSign', e.target.value)}
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                >
                  <option value="" className="bg-black/10">Select Zodiac Sign</option>
                  {zodiacOptions.map((zodiac, index) => (
                    <option key={index} value={zodiac} className="bg-black/10">{zodiac}</option>
                  ))}
                </select>
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Star Sign</label>
                <select
                  value={formData.starSign}
                  onChange={(e) => handleChange('starSign', e.target.value)}
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                  disabled={!formData.zodiacSign}
                >
                  <option value="" className="bg-black/10">Select Star Sign</option>
                  {starOptions.map((star, index) => (
                    <option key={index} value={star} className="bg-black/10">{star}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
 
          {/* Lifestyle Preferences */}
          <div className="bg-gray-100 backdrop-blur-sm border border-[#FF6B6B]/30 rounded-2xl p-6 hover:border-[#FF6B6B]/50 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-[#FF6B6B] rounded-full mr-4 shadow-lg">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#FF6B6B]">Lifestyle Preferences</h2>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Diet Preference</label>
                <select
                  value={formData.dietPreference}
                  onChange={(e) => handleChange('dietPreference', e.target.value)}
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                >
                  <option value="" className="bg-black/10">Select Diet Preference</option>
                  {dietOptions.map((diet, index) => (
                    <option key={index} value={diet} className="bg-black/10">{diet}</option>
                  ))}
                </select>
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Smoking Habits</label>
                <select
                  value={formData.smokingHabits}
                  onChange={(e) => handleChange('smokingHabits', e.target.value)}
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                >
                  <option value="" className="bg-black/10">Select Smoking Habits</option>
                  {smokingOptions.map((smoking, index) => (
                    <option key={index} value={smoking} className="bg-black/10">{smoking}</option>
                  ))}
                </select>
              </div>
 
              <div className="space-y-2">
                <label className="text-[#FF6B6B] font-medium">Drinking Habits</label>
                <select
                  value={formData.drinkingHabits}
                  onChange={(e) => handleChange('drinkingHabits', e.target.value)}
                  className="w-full px-4 py-3  border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 appearance-none"
                >
                  <option value="" className="bg-black/10">Select Drinking Habits</option>
                  {drinkingOptions.map((drinking, index) => (
                    <option key={index} value={drinking} className="bg-black/10">{drinking}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          
   
         
 
          {/* Submit Button */}
          <div className="flex justify-center pt-8 mb-6">
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
    {/* Toast Notification */}
      {showToast && (
        <Toast message={toastMessage} />
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #FF6B6B;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #FF8E8E;
        }

        /* Remove default date input styling */
        input[type="date"]::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }
      `}</style>
    </>
  );
};

export default MatrimonialProfile;