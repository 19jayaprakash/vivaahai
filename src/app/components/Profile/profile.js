"use client"
import React, { useState, useEffect } from 'react';
import { 
  Heart, User, Briefcase, Star, Users, Search, 
  ChevronRight, ChevronLeft, Calendar, MapPin, Phone, 
  Mail, Scale, Ruler, Baby, Wine, Cigarette, 
  Book, Church, Sun, Moon, Check
} from 'lucide-react';
import { axiosPublic } from '../../base/constant';
import UserInterest from '../Profiles/Interest';
import BasicDetails from '../Profiles/BasicDetails';
import ProfessionalDetails from '../Profiles/ProfessionalDetails';
import FamilyDetails from '../Profiles/FamilyDetails';
import PartnerPreference from '../Profiles/PartnerPreference';
import {useRouter, useSearchParams} from 'next/navigation';

export default function ProfileCreation() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const [name, setName] = useState('User');
  const searchParams = useSearchParams();
     const isEdit = searchParams.get('isEdit') || false;
     const step = Number(searchParams.get('step')) || 0;

  useEffect(()=>{
      const storedName = localStorage.getItem('firstName');
      if (storedName) {
        setName(storedName);
      }
  },[]);
  const steps = [
    {
      id: 0,
      title: 'Basic Details',
      icon: <User className="w-5 h-5 text-black" />,
      description: 'Personal information'
    },
    {
      id: 1,
      title: 'Professional Details',
      icon: <Briefcase className="w-5 h-5  text-black" />,
      description: 'Career information'
    },
    {
      id: 2,
      title: 'Family',
      icon: <Users className="w-5 h-5  text-black" />,
      description: 'Family background'
      
    },
    {
      id: 3,
      title: 'Interests',
      icon: <Star className="w-5 h-5  text-black" />,
      description: 'Hobbies & interests'
    },
    {
      id: 4,
      title: 'Partner Preference',
      icon: <Search className="w-5 h-5  text-black" />,
      description: 'Ideal partner criteria'
    }
  ];

  useEffect(()=>{
    if(isEdit && step){
      setCurrentStep(step);
    }
  },[isEdit, step]);

  const nextStep = () => {
    console.log('Current step before increment');
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };


  const renderPartnerPreference = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-black mb-2">Partner Preferences</h3>
        <p className="text-black/60">Describe your ideal partner</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <input
            type="text"
            placeholder="Preferred Age Range (e.g., 25-30)"
            className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-black placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15"
          />
        </div>
        
        <div className="relative group">
          <input
            type="text"
            placeholder="Preferred Height Range (e.g., 160-170cm)"
            className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-black placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <select className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-black focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15">
            <option value="" className="bg-purple-900 text-black">Preferred Education</option>
            <option value="any" className="bg-purple-900 text-black">Any</option>
            <option value="graduate" className="bg-purple-900 text-black">Graduate</option>
            <option value="post-graduate" className="bg-purple-900 text-black">Post Graduate</option>
          </select>
        </div>
        
        <div className="relative group">
          <select className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-black focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15">
            <option value="" className="bg-purple-900 text-black">Preferred Profession</option>
            <option value="any" className="bg-purple-900 text-black">Any</option>
            <option value="business" className="bg-purple-900 text-black">Business</option>
            <option value="service" className="bg-purple-900 text-black">Service</option>
            <option value="professional" className="bg-purple-900 text-black">Professional</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <select className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-black focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15">
            <option value="" className="bg-purple-900 text-black">Preferred Location</option>
            <option value="same-city" className="bg-purple-900 text-black">Same City</option>
            <option value="same-state" className="bg-purple-900 text-black">Same State</option>
            <option value="anywhere-india" className="bg-purple-900 text-black">Anywhere in India</option>
            <option value="abroad" className="bg-purple-900 text-black">Open to Abroad</option>
          </select>
        </div>
        
        <div className="relative group">
          <select className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-black focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15">
            <option value="" className="bg-purple-900 text-black">Preferred Marital Status</option>
            <option value="never-married" className="bg-purple-900 text-black">Never Married</option>
            <option value="divorced" className="bg-purple-900 text-black">Divorced</option>
            <option value="widowed" className="bg-purple-900 text-black">Widowed</option>
          </select>
        </div>
      </div>

      <div className="relative group">
        <textarea
          placeholder="Additional preferences and expectations from your partner..."
          rows="4"
          className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-black placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15 resize-none"
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return <BasicDetails nextStep={nextStep} isEdit={isEdit} />;
      case 1: return <ProfessionalDetails nextStep={nextStep} isEdit={isEdit} />;
      case 2: return <FamilyDetails nextStep={nextStep} isEdit={isEdit} />;
      case 3: return <UserInterest nextStep={nextStep} isEdit={isEdit} />;
      case 4: return <PartnerPreference nextStep={nextStep} isEdit={isEdit} />
      default: return <BasicDetails nextStep={nextStep} isEdit={isEdit} />;
    }
  };

  const handleSubmit = () => {
    // console.log('Form Data:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 ">
      {/* Header */}
      <div className="relative z-10 bg-gray-50">
        <div className="container mx-auto px-4 py-6 flex justify-between">
          <div>
           <h1 className="text-3xl font-bold text-[#FF6B6B]">
               VivaahAI
              </h1>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-4 h-4 text-[#FF6B6B] mr-3 animate-pulse" />
              <h1 className="text-xl font-bold text-[#FF6B6B]">
                Create Your Profile
              </h1>
            </div>
            <p className="text-gray-400 text-sm">
              Find your perfect match by completing your profile
            </p>
          </div>
          <div>
            <span className='mr-3  text-black'>Hi ,{name}</span>
           <button className='bg-[#FF6B6B] p-1 text-white h-8 w-18 rounded-md cursor-pointer transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"' onClick={()=>{router.push("/")}}>Logout</button>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        
        

        {/* Progress Steps */}
        <div className="mb-8 mt-5">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className='flex flex-col items-center'>
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all border-[#FF6B6B] duration-300 ${
                  currentStep >= index 
                    && 'bg-[#FF6B6B]  text-black shadow-lg shadow-pink-500/30' 
                   
                }`}>
                  {step.icon}
                  
                </div>
                <div className=''>
               <span className='text-sm text-black'> {step.title} </span>
                 </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                    currentStep > index ? 'bg-[#FF6B6B]' : 'bg-gray-500'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* <div className="text-center">
            <h2 className="text-2xl font-bold text-[#FF6B6B] mb-1">{steps[currentStep].title}</h2>
            <p className="text-[#FF6B6B]">{steps[currentStep].description}</p>
          </div> */}
        </div>

        {/* Form Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-0 border border-white/10 ">
          {renderStepContent()}
          
         
        </div>
      </div>
    </div>

            
  );
}