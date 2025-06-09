"use client"
import React, { useState } from 'react';
import { Heart, Users, Shield, Star, Mail, Lock, User,Eye,EyeOff, Phone, Calendar, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { axiosPublic } from './base/constant';
import { toast } from 'react-toastify';
 
export default function MatrimonyLanding() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
 
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    applyFor: 'myself',
    gender: '',
    otherRelation: '',
    otherGender: ''
  });
  const [signupErrors, setSignupErrors] = useState({});
 
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setSignupErrors({});
  };
 
  const toggleAuthModal = () => setShowAuth(!showAuth);
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
 
    let isValid = true;
 
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Enter a valid email');
      isValid = false;
    }
 
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
 
    if (!isValid) return;
 
    try {
      const response = await axiosPublic.post('/auth/login', {
        email,
        password,
      });
 
      if (response.status === 200) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        localStorage.setItem('primaryContact', response.data.primaryContact);
 
        if(response.data.roleId === 1){
          router.push("/Admin");
        }
        else {
          if(response.data.isBasicProfileSubmitted) {
            router.push('/Home');
          }
          else{
            router.push("/CreateProfile");
          }
        }
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      const msg = error.response?.data?.message || 'Login failed';
      if (msg.toLowerCase().includes('email')) {
        setEmailError(msg);
      } else if (msg.toLowerCase().includes('password')) {
        setPasswordError(msg);
      } else {
        setPasswordError(msg);
      }
    }
  };
 
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
  };
 
  const handleSignup = async (e) => {
    e.preventDefault();
 
   
    const errors = {};
    if (!signupData.firstName) errors.firstName = 'First name is required';
    if (!signupData.lastName) errors.lastName = 'Last name is required';
    if (!signupData.phoneNumber) errors.phoneNumber = 'Phone number is required';
    if (!signupData.email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(signupData.email)) {
      errors.email = 'Enter a valid email';
    }
    if (!signupData.password) {
      errors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (['myself', 'friend'].includes(signupData.applyFor) && !signupData.gender) {
      errors.gender = 'Gender is required';
    }
   
    setSignupErrors(errors);
    if (Object.keys(errors).length > 0) return;
 
    try {
      const payload = {
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        password: signupData.password,
        phoneNo: signupData.phoneNumber,
        applyFor: signupData.applyFor,
        ...(signupData.applyFor === 'myself' || signupData.applyFor === 'friend' ? {
          gender: signupData.gender
        } : {
          relation: signupData.otherRelation,
          gender: signupData.otherGender
        })
      };
 
      const response = await axiosPublic.post('/auth/register', payload);
 
      if (response.status === 201) {
        const loginResponse = await axiosPublic.post('/auth/login', {
          email: signupData.email,
          password: signupData.password
        });
 
        if (loginResponse.status === 200) {
          localStorage.setItem('token', loginResponse.data.accessToken);
          localStorage.setItem('refreshToken', loginResponse.data.refreshToken);
          localStorage.setItem('email', loginResponse.data.email);
          localStorage.setItem('firstName', loginResponse.data.firstName);
          localStorage.setItem('lastName', loginResponse.data.lastName);
          localStorage.setItem('primaryContact', loginResponse.data.primaryContact);
         
           if(response.data.roleId === 1){
          router.push("/Admin");
        }
        else {
          if(response.data.isBasicProfileSubmitted) {
            router.push('/Home');
          }
          else{
            router.push("/CreateProfile");
          }
        }
        }
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup failed';
      toast.warning(msg);
    }
  };

  const[showPassword,setShowPassword] = useState(true);
 
  return (
   <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Images with Blur Effect */}
      <div className="absolute inset-0 z-0">
        {/* Multiple layered background images */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-50"></div>
       
        {/* Floating blurred image elements */}
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full overflow-hidden blur-2xl opacity-90 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-[#FF6B6B] to-pink-400"></div>
        </div>
       
        <div className="absolute top-20 right-20 w-60 h-60 rounded-full overflow-hidden blur-3xl opacity-90 animate-pulse delay-1000">
          <div className="w-full h-full bg-gradient-to-r from-rose-300 to-[#FF6B6B]"></div>
        </div>
       
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full overflow-hidden blur-3xl opacity-95 animate-pulse delay-500">
          <div className="w-full h-full bg-gradient-to-r from-pink-200 to-rose-300"></div>
        </div>
       
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full overflow-hidden blur-xl opacity-95 animate-pulse delay-2000">
          <div className="w-full h-full bg-gradient-to-r from-[#FF6B6B] to-pink-500"></div>
        </div>
       
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full overflow-hidden blur-3xl opacity-15 animate-pulse delay-700">
          <div className="w-full h-full bg-gradient-to-r from-rose-200 via-pink-300 to-[#FF6B6B]"></div>
        </div>
       
        {/* Additional scattered elements */}
        <div className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full overflow-hidden blur-xl opacity-40 animate-pulse delay-1500">
          <div className="w-full h-full bg-[#FF6B6B]"></div>
        </div>
       
        <div className="absolute bottom-1/3 right-1/3 w-44 h-44 rounded-full overflow-hidden blur-2xl opacity-30 animate-pulse delay-300">
          <div className="w-full h-full bg-gradient-to-r from-pink-400 to-rose-400"></div>
        </div>
        <div className="absolute inset-0 bg-white/70"></div>
      </div>
 
      <header className="relative z-10 px-6 py-4">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-black">VivaahAI</span>
          </div>
          <button
            onClick={toggleAuthModal}
            className="bg-[#FF6B6B] text-white px-6 py-2 rounded-full hover:bg-[#FF5252] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Get Started
          </button>
        </nav>
      </header>
 
      <main className="relative z-10 px-6 pt-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-black">Find Your</span>
            <span className="block text-[#FF6B6B]">Perfect Match</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
            Where hearts connect and destinies align. Join thousands of successful couples who found their soulmate through our platform.
          </p>
         
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={toggleAuthModal}
              className="bg-[#FF6B6B] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#FF5252] hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
            >
              Start Your Journey
            </button>
          </div>
 
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            {[
              { number: '50K+', label: 'Happy Couples' },
              { number: '1M+', label: 'Verified Profiles' },
              { number: '95%', label: 'Success Rate' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold text-[#FF6B6B] mb-2">{stat.number}</div>
                <div className="text-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
 
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Users className="w-8 h-8" />,
              title: 'Verified Profiles',
              description: 'All profiles are manually verified for authenticity and safety'
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: 'Privacy Protected',
              description: 'Your personal information is secured with advanced encryption'
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: 'Smart Matching',
              description: 'AI-powered compatibility matching based on preferences and values'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl hover:bg-white/95 transition-all duration-300">
              <div className="text-[#FF6B6B] mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
 
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl max-w-md w-full border border-gray-200 shadow-2xl relative max-h-[90vh] flex flex-col">
            <button
              onClick={toggleAuthModal}
              className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-black text-2xl transition-colors z-10"
            >
              ×
            </button>
           
            <div className="text-center p-8 pb-4 flex-shrink-0">
              <div className="w-16 h-16 bg-[#FF6B6B] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">
                {isLogin ? 'Welcome Back' : 'Join VivaahAI'}
              </h2>
              <p className="text-gray-600">
                {isLogin ? 'Sign in to continue your journey' : 'Create your profile and find love'}
              </p>
            </div>
 
            <div className="flex-1 overflow-y-auto px-8 pb-6">
              {isLogin ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-12 text-black placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] focus:bg-white transition-all"
                      />
                    </div>
                    {emailError && (
                      <div className="text-red-500 text-sm pl-3">{emailError}</div>
                    )}
                  </div>
                 
                  <div className="space-y-1">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ?`password` : 'text'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-12 text-black placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] focus:bg-white transition-all"
                      />
                      <div className='absolute text-black right-0 top-0 cursor-pointer p-3'>
                      {showPassword ? <Eye onClick={()=>{setShowPassword(prev => !prev)}} /> : <EyeOff onClick={()=>{setShowPassword(prev => !prev)}}  />}
                      </div>
                    </div>
                    {passwordError && (
                      <div className="text-red-500 text-sm pl-3">{passwordError}</div>
                    )}
                  </div>
 
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="w-full bg-[#FF6B6B] text-white py-3 rounded-xl font-semibold hover:bg-[#FF5252] hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer mt-6"
                  >
                    Sign In
                  </button>
 
                  <div className="text-center mt-3">
                    <p className="text-gray-600">
                      Don&apos;t have an account?
                      <button
                        type="button"
                        onClick={toggleAuthMode}
                        className="text-[#FF6B6B] hover:text-[#FF5252] ml-2 font-semibold transition-colors cursor-pointer"
                      >
                        Sign Up
                      </button>
                    </p>
                  </div>
 
                  <div className="text-center mt-4">
                    <button type="button" className="text-gray-500 hover:text-[#FF6B6B] text-sm transition-colors">
                      Forgot Password?
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={signupData.firstName}
                          onChange={handleSignupChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-12 text-black placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] focus:bg-white transition-all"
                        />
                      </div>
                      {signupErrors.firstName && (
                        <div className="text-red-500 text-xs pl-3">{signupErrors.firstName}</div>
                      )}
                    </div>
 
                    <div className="space-y-1">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={signupData.lastName}
                          onChange={handleSignupChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-12 text-black placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] focus:bg-white transition-all"
                        />
                      </div>
                      {signupErrors.lastName && (
                        <div className="text-red-500 text-xs pl-3">{signupErrors.lastName}</div>
                      )}
                    </div>
                  </div>
 
                  <div className="space-y-1">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={signupData.phoneNumber}
                        onChange={handleSignupChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-12 text-black placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] focus:bg-white transition-all"
                      />
                    </div>
                    {signupErrors.phoneNumber && (
                      <div className="text-red-500 text-sm pl-3">{signupErrors.phoneNumber}</div>
                    )}
                  </div>
 
                  <div className="space-y-1">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={signupData.email}
                        onChange={handleSignupChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-12 text-black placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] focus:bg-white transition-all"
                      />
                    </div>
                    {signupErrors.email && (
                      <div className="text-red-500 text-sm pl-3">{signupErrors.email}</div>
                    )}
                  </div>
 
                  <div className="space-y-1">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-12 text-black placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] focus:bg-white transition-all"
                      />
                    </div>
                    {signupErrors.password && (
                      <div className="text-red-500 text-sm pl-3">{signupErrors.password}</div>
                    )}
                  </div>
 
                  <div className="space-y-1">
                    <select
                      name="applyFor"
                      value={signupData.applyFor}
                      onChange={handleSignupChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-black focus:outline-none focus:border-[#FF6B6B] focus:bg-white transition-all"
                    >
                      <option value="myself">Registering for Myself</option>
                      <option value="friend">Registering for a Friend</option>
                      <option value="son">Registering for Son</option>
                      <option value="daughter">Registering for Daughter</option>
                      <option value="sister">Registering for Sister</option>
                    </select>
                  </div>
 
                  {['myself', 'friend'].includes(signupData.applyFor) && (
                    <div className="space-y-1">
                      <select
                        name="gender"
                        value={signupData.gender}
                        onChange={handleSignupChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-black focus:outline-none focus:border-[#FF6B6B] focus:bg-white transition-all"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      {signupErrors.gender && (
                        <div className="text-red-500 text-sm pl-3">{signupErrors.gender}</div>
                      )}
                    </div>
                  )}
 
                  <button
                    type="submit"
                    className="w-full bg-[#FF6B6B] text-white py-3 rounded-xl font-semibold hover:bg-[#FF5252] hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer mt-6"
                  >
                    Create Account
                  </button>
 
                  <div className="text-center mt-6">
                    <p className="text-gray-600">
                      Already have an account?
                      <button
                        type="button"
                        onClick={toggleAuthMode}
                        className="text-[#FF6B6B] hover:text-[#FF5252] ml-2 font-semibold transition-colors cursor-pointer"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}