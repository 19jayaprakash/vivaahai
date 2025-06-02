"use client"
import React, { useState, useEffect } from 'react';
import { 
  Heart, User, Briefcase, Star, Users, Search, 
  ChevronRight, ChevronLeft, Calendar, MapPin, Phone, 
  Mail, Scale, Ruler, Baby, Wine, Cigarette, 
  Book, Church, Sun, Moon, Check
} from 'lucide-react';
import { axiosPublic } from '../../base/constant';

export default function ProfileCreation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    alternateEmail: '',
    dateOfBirth: '',
    country: 'India',
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

  // API options state
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

  // Fetch dropdown options from APIs
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        console.log('Fetching dropdown options...');
        
        // Mother Tongue
        const motherTongueRes = await axiosPublic.get('/utility/utilHead?utilHead=mother_tongue');
        console.log('Mother tongue response:', motherTongueRes);
        if (motherTongueRes.data && Array.isArray(motherTongueRes.data.data)) {
          setMotherTongueOptions(motherTongueRes.data.data);
          console.log('Mother tongue options set:', motherTongueRes.data.data);
        }

        // Diet Preferences
        const dietRes = await axiosPublic.get('/utility/utilHead?utilHead=diet_preferences');
        console.log('Diet response:', dietRes);
        if (dietRes.data && Array.isArray(dietRes.data.data)) {
          setDietOptions(dietRes.data.data);
        }

        // Smoking Habits
        const smokingRes = await axiosPublic.get('/utility/utilHead?utilHead=smoking_habits');
        console.log('Smoking response:', smokingRes);
        if (smokingRes.data && Array.isArray(smokingRes.data.data)) {
          setSmokingOptions(smokingRes.data.data);
        }

        // Drinking Habits
        const drinkingRes = await axiosPublic.get('/utility/utilHead?utilHead=drinking_habits');
        console.log('Drinking response:', drinkingRes);
        if (drinkingRes.data && Array.isArray(drinkingRes.data.data)) {
          setDrinkingOptions(drinkingRes.data.data);
        }

        // Religion
        const religionRes = await axiosPublic.get('/utility/utilHead?utilHead=religion');
        console.log('Religion response:', religionRes);
        if (religionRes.data && Array.isArray(religionRes.data.data)) {
          setReligionOptions(religionRes.data.data);
        }

        // Caste
        const casteRes = await axiosPublic.get('/utility/utilHead?utilHead=caste');
        console.log('Caste response:', casteRes);
        if (casteRes.data && Array.isArray(casteRes.data.data)) {
          setCasteOptions(casteRes.data.data);
        }

        // Zodiac Signs
        const zodiacRes = await axiosPublic.get('/utility/utilHead?utilHead=zodiac_sign');
        console.log('Zodiac response:', zodiacRes);
        if (zodiacRes.data && Array.isArray(zodiacRes.data.data)) {
          setZodiacOptions(zodiacRes.data.data);
        }

        // States
        const stateRes = await axiosPublic.get('/utility/utilHead?utilHead=state');
        console.log('State response:', stateRes);
        if (stateRes.data && Array.isArray(stateRes.data.data)) {
          setStateOptions(stateRes.data.data);
        }

        // Marital Status
        const maritalRes = await axiosPublic.get('/utility/utilHead?utilHead=marital_status');
        console.log('Marital response:', maritalRes);
        if (maritalRes.data && Array.isArray(maritalRes.data.data)) {
          setMaritalOptions(maritalRes.data.data);
        }

        // Body Type
        const bodyTypeRes = await axiosPublic.get('/utility/utilHead?utilHead=body_type');
        console.log('Body type response:', bodyTypeRes);
        if (bodyTypeRes.data && Array.isArray(bodyTypeRes.data.data)) {
          setBodyTypeOptions(bodyTypeRes.data.data);
        }

        // Have Children
        const haveChildrenRes = await axiosPublic.get('/utility/utilHead?utilHead=children');
        console.log('Have children response:', haveChildrenRes);
        if (haveChildrenRes.data && Array.isArray(haveChildrenRes.data.data)) {
          setHaveChildrenOptions(haveChildrenRes.data.data);
        }

        // Want Children
        const wantChildrenRes = await axiosPublic.get('/utility/utilHead?utilHead=want_children');
        console.log('Want children response:', wantChildrenRes);
        if (wantChildrenRes.data && Array.isArray(wantChildrenRes.data.data)) {
          setWantChildrenOptions(wantChildrenRes.data.data);
        }

      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      }
    };

    fetchOptions();
  }, []);

  // Fetch dependent options
  useEffect(() => {
    const fetchSubcaste = async () => {
      if (!formData.caste) {
        setSubcasteOptions([]);
        setFormData(prev => ({ ...prev, subcaste: '' }));
        return;
      }
      try {
        console.log('Fetching subcaste for:', formData.caste);
        const response = await axiosPublic.get(`/utility/parent?parentCode=${formData.caste}`);
        console.log('Subcaste response:', response);
        if (response.data && Array.isArray(response.data.data)) {
          setSubcasteOptions(response.data.data);
        } else {
          setSubcasteOptions([]);
        }
      } catch (error) {
        console.error('Error fetching subcaste options:', error);
        setSubcasteOptions([]);
      }
    };
    fetchSubcaste();
  }, [formData.caste]);

  useEffect(() => {
    const fetchStars = async () => {
      if (!formData.zodiacSign) {
        setStarOptions([]);
        setFormData(prev => ({ ...prev, starSign: '' }));
        return;
      }
      try {
        console.log('Fetching stars for:', formData.zodiacSign);
        const response = await axiosPublic.get(`/utility/parent?parentCode=${formData.zodiacSign}`);
        console.log('Stars response:', response);
        if (response.data && Array.isArray(response.data.data)) {
          setStarOptions(response.data.data);
        } else {
          setStarOptions([]);
        }
      } catch (error) {
        console.error('Error fetching star options:', error);
        setStarOptions([]);
      }
    };
    fetchStars();
  }, [formData.zodiacSign]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.state) {
        setCityOptions([]);
        setFormData(prev => ({ ...prev, city: '' }));
        return;
      }
      try {
        console.log('Fetching cities for:', formData.state);
        const response = await axiosPublic.get(`/utility/parent?parentCode=${formData.state}`);
        console.log('Cities response:', response);
        if (response.data && Array.isArray(response.data.data)) {
          setCityOptions(response.data.data);
        } else {
          setCityOptions([]);
        }
      } catch (error) {
        console.error('Error fetching city options:', error);
        setCityOptions([]);
      }
    };
    fetchCities();
  }, [formData.state]);

  const steps = [
    {
      id: 0,
      title: 'Basic Details',
      icon: <User className="w-5 h-5" />,
      description: 'Personal information'
    },
    {
      id: 1,
      title: 'Professional Details',
      icon: <Briefcase className="w-5 h-5" />,
      description: 'Career information'
    },
    {
      id: 2,
      title: 'Interests',
      icon: <Star className="w-5 h-5" />,
      description: 'Hobbies & interests'
    },
    {
      id: 3,
      title: 'Family',
      icon: <Users className="w-5 h-5" />,
      description: 'Family background'
    },
    {
      id: 4,
      title: 'Partner Preference',
      icon: <Search className="w-5 h-5" />,
      description: 'Ideal partner criteria'
    }
  ];

  const handleInputChange = (field, value) => {
    console.log('Setting field:', field, 'to value:', value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderBasicDetails = () => (
    <div className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative group">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-12 text-white placeholder-blue-200/60 focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          />
        </div>
        
        <div className="relative group">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-12 text-white placeholder-blue-200/60 focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          />
        </div>

        <div className="relative group">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="date"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-12 text-white placeholder-blue-200/60 focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          />
        </div>
      </div>

      {/* Email Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative group">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-12 text-white placeholder-blue-200/60 focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          />
        </div>
        
        <div className="relative group">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="email"
            placeholder="Alternate Email"
            value={formData.alternateEmail}
            onChange={(e) => handleInputChange('alternateEmail', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-12 text-white placeholder-blue-200/60 focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          />
        </div>

        <div className="relative group">
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          >
            <option value="" className="bg-slate-800 text-white">Select Gender</option>
            <option value="male" className="bg-slate-800 text-white">Male</option>
            <option value="female" className="bg-slate-800 text-white">Female</option>
            <option value="other" className="bg-slate-800 text-white">Other</option>
          </select>
        </div>
      </div>

      {/* Phone Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative group">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="tel"
            placeholder="Primary Contact"
            value={formData.primaryContact}
            onChange={(e) => handleInputChange('primaryContact', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-12 text-white placeholder-blue-200/60 focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          />
        </div>
        
        <div className="relative group">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="tel"
            placeholder="Secondary Contact"
            value={formData.secondaryContact}
            onChange={(e) => handleInputChange('secondaryContact', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-12 text-white placeholder-blue-200/60 focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          />
        </div>

        <div className="relative group">
          <select
            value={formData.maritalStatus}
            onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          >
            <option value="" className="bg-slate-800 text-white">Marital Status</option>
            {maritalOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Location Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative group">
          <select
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          >
            <option value="" className="bg-slate-800 text-white">Select State</option>
            {stateOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>
        
        <div className="relative group">
          <select
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
            disabled={!formData.state}
          >
            <option value="" className="bg-slate-800 text-white">Select City</option>
            {cityOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>

        <div className="relative group">
          <input
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white placeholder-blue-200/60 focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          />
        </div>
      </div>

      {/* Physical Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative group">
          <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="number"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-12 text-white placeholder-blue-200/60 focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          />
        </div>
        
        <div className="relative group">
          <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-12 text-white placeholder-blue-200/60 focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          />
        </div>

        <div className="relative group">
          <select
            value={formData.bodyType}
            onChange={(e) => handleInputChange('bodyType', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          >
            <option value="" className="bg-slate-800 text-white">Body Type</option>
            {bodyTypeOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Language and Children */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative group">
          <select
            value={formData.motherTongue}
            onChange={(e) => handleInputChange('motherTongue', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          >
            <option value="" className="bg-slate-800 text-white">Mother Tongue</option>
            {motherTongueOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>

        <div className="relative group">
          <select
            value={formData.children}
            onChange={(e) => handleInputChange('children', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          >
            <option value="" className="bg-slate-800 text-white">Have Children?</option>
            {haveChildrenOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>

        <div className="relative group">
          <select
            value={formData.wantChildren}
            onChange={(e) => handleInputChange('wantChildren', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          >
            <option value="" className="bg-slate-800 text-white">Want Children?</option>
            {wantChildrenOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Religion and Caste */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative group">
          <select
            value={formData.religion}
            onChange={(e) => handleInputChange('religion', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          >
            <option value="" className="bg-slate-800 text-white">Religion</option>
            {religionOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>

        <div className="relative group">
          <select
            value={formData.caste}
            onChange={(e) => handleInputChange('caste', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          >
            <option value="" className="bg-slate-800 text-white">Caste</option>
            {casteOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>

        <div className="relative group">
          <select
            value={formData.subcaste}
            onChange={(e) => handleInputChange('subcaste', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
            disabled={!formData.caste}
          >
            <option value="" className="bg-slate-800 text-white">Subcaste</option>
            {subcasteOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Zodiac and Star Signs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative group">
          <select
            value={formData.zodiacSign}
            onChange={(e) => handleInputChange('zodiacSign', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          >
            <option value="" className="bg-slate-800 text-white">Zodiac Sign</option>
            {zodiacOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
            </select>
        </div>

        <div className="relative group">
          <select
            value={formData.starSign}
            onChange={(e) => handleInputChange('starSign', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
            disabled={!formData.zodiacSign}
          >
            <option value="" className="bg-slate-800 text-white">Star Sign</option>
            {starOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>

        <div className="relative group">
          <select
            value={formData.dietPreference}
            onChange={(e) => handleInputChange('dietPreference', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          >
            <option value="" className="bg-slate-800 text-white">Diet Preference</option>
            {dietOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Habits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <select
            value={formData.smokingHabits}
            onChange={(e) => handleInputChange('smokingHabits', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          >
            <option value="" className="bg-slate-800 text-white">Smoking Habits</option>
            {smokingOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>

        <div className="relative group">
          <select
            value={formData.drinkingHabits}
            onChange={(e) => handleInputChange('drinkingHabits', e.target.value)}
            className="w-full bg-white/10 border border-blue-300/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 focus:shadow-lg focus:shadow-cyan-400/20 transition-all duration-300 hover:bg-white/15"
          >
            <option value="" className="bg-slate-800 text-white">Drinking Habits</option>
            {drinkingOptions.map((option, index) => (
              <option key={index} value={option.utilCode} className="bg-slate-800 text-white">
                {option.utilName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderProfessionalDetails = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Professional Information</h3>
        <p className="text-white/60">Tell us about your career</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 group-focus-within:text-pink-400 transition-colors" />
          <input
            type="text"
            placeholder="Current Job Title"
            className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-12 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15"
          />
        </div>
        
        <div className="relative group">
          <input
            type="text"
            placeholder="Company Name"
            className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <input
            type="text"
            placeholder="Annual Income"
            className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15"
          />
        </div>
        
        <div className="relative group">
          <select className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15">
            <option value="" className="bg-purple-900 text-white">Education Level</option>
            <option value="high-school" className="bg-purple-900 text-white">High School</option>
            <option value="bachelor" className="bg-purple-900 text-white">Bachelor's Degree</option>
            <option value="master" className="bg-purple-900 text-white">Master's Degree</option>
            <option value="phd" className="bg-purple-900 text-white">PhD</option>
          </select>
        </div>
      </div>

      <div className="relative group">
        <textarea
          placeholder="Brief description about your career and achievements"
          rows="4"
          className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15 resize-none"
        />
      </div>
    </div>
  );

  const renderInterests = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Interests & Hobbies</h3>
        <p className="text-white/60">What do you enjoy doing?</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {['Reading', 'Travel', 'Music', 'Sports', 'Cooking', 'Movies', 'Dancing', 'Photography', 'Art', 'Gaming', 'Fitness', 'Nature'].map((interest) => (
          <div key={interest} className="relative group">
            <input
              type="checkbox"
              id={interest}
              className="sr-only"
            />
            <label
              htmlFor={interest}
              className="flex items-center justify-center py-3 px-4 bg-white/10 border border-white/30 rounded-xl text-white cursor-pointer hover:bg-white/20 hover:border-pink-400 hover:scale-105 transition-all duration-300 group-hover:shadow-lg"
            >
              <Star className="w-4 h-4 mr-2" />
              {interest}
            </label>
          </div>
        ))}
      </div>

      <div className="relative group">
        <textarea
          placeholder="Tell us more about your hobbies and interests..."
          rows="4"
          className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15 resize-none"
        />
      </div>
    </div>
  );

  const renderFamily = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Family Background</h3>
        <p className="text-white/60">Tell us about your family</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <select className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15">
            <option value="" className="bg-purple-900 text-white">Family Type</option>
            <option value="nuclear" className="bg-purple-900 text-white">Nuclear Family</option>
            <option value="joint" className="bg-purple-900 text-white">Joint Family</option>
          </select>
        </div>
        
        <div className="relative group">
          <select className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15">
            <option value="" className="bg-purple-900 text-white">Family Status</option>
            <option value="middle-class" className="bg-purple-900 text-white">Middle Class</option>
            <option value="upper-middle-class" className="bg-purple-900 text-white">Upper Middle Class</option>
            <option value="affluent" className="bg-purple-900 text-white">Affluent</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <input
            type="text"
            placeholder="Father's Occupation"
            className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15"
          />
        </div>
        
        <div className="relative group">
          <input
            type="text"
            placeholder="Mother's Occupation"
            className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <input
            type="number"
            placeholder="Number of Brothers"
            className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15"
          />
        </div>
        
        <div className="relative group">
          <input
            type="number"
            placeholder="Number of Sisters"
            className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15"
          />
        </div>
      </div>

      <div className="relative group">
        <textarea
          placeholder="Brief description about your family..."
          rows="4"
          className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15 resize-none"
        />
      </div>
    </div>
  );

  const renderPartnerPreference = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Partner Preferences</h3>
        <p className="text-white/60">Describe your ideal partner</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <input
            type="text"
            placeholder="Preferred Age Range (e.g., 25-30)"
            className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15"
          />
        </div>
        
        <div className="relative group">
          <input
            type="text"
            placeholder="Preferred Height Range (e.g., 160-170cm)"
            className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <select className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15">
            <option value="" className="bg-purple-900 text-white">Preferred Education</option>
            <option value="any" className="bg-purple-900 text-white">Any</option>
            <option value="graduate" className="bg-purple-900 text-white">Graduate</option>
            <option value="post-graduate" className="bg-purple-900 text-white">Post Graduate</option>
          </select>
        </div>
        
        <div className="relative group">
          <select className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15">
            <option value="" className="bg-purple-900 text-white">Preferred Profession</option>
            <option value="any" className="bg-purple-900 text-white">Any</option>
            <option value="business" className="bg-purple-900 text-white">Business</option>
            <option value="service" className="bg-purple-900 text-white">Service</option>
            <option value="professional" className="bg-purple-900 text-white">Professional</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <select className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15">
            <option value="" className="bg-purple-900 text-white">Preferred Location</option>
            <option value="same-city" className="bg-purple-900 text-white">Same City</option>
            <option value="same-state" className="bg-purple-900 text-white">Same State</option>
            <option value="anywhere-india" className="bg-purple-900 text-white">Anywhere in India</option>
            <option value="abroad" className="bg-purple-900 text-white">Open to Abroad</option>
          </select>
        </div>
        
        <div className="relative group">
          <select className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15">
            <option value="" className="bg-purple-900 text-white">Preferred Marital Status</option>
            <option value="never-married" className="bg-purple-900 text-white">Never Married</option>
            <option value="divorced" className="bg-purple-900 text-white">Divorced</option>
            <option value="widowed" className="bg-purple-900 text-white">Widowed</option>
          </select>
        </div>
      </div>

      <div className="relative group">
        <textarea
          placeholder="Additional preferences and expectations from your partner..."
          rows="4"
          className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15 resize-none"
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderBasicDetails();
      case 1: return renderProfessionalDetails();
      case 2: return renderInterests();
      case 3: return renderFamily();
      case 4: return renderPartnerPreference();
      default: return renderBasicDetails();
    }
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-pink-400 mr-2" />
            <h1 className="text-4xl font-bold text-white">Create Your Profile</h1>
          </div>
          <p className="text-white/60 text-lg">Find your perfect match with detailed profile information</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= index 
                    ? 'bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/30' 
                    : 'border-white/30 text-white/60 hover:border-pink-400'
                }`}>
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                    currentStep > index ? 'bg-pink-500' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-1">{steps[currentStep].title}</h2>
            <p className="text-white/60">{steps[currentStep].description}</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 font-semibold"
              >
                <Heart className="w-5 h-5 mr-2" />
                Create Profile
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}