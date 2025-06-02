"use client"
import React, { useState } from 'react';
import { Heart, Users, Shield, Star, Mail, Lock, User, Phone, Calendar, MapPin } from 'lucide-react';

export default function MatrimonyLanding() {
  const [isLogin, setIsLogin] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  const toggleAuthMode = () => setIsLogin(!isLogin);
  const toggleAuthModal = () => setShowAuth(!showAuth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">VivaahAI</span>
          </div>
          <button
            onClick={toggleAuthModal}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/20"
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 pt-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your
            <span className="block bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
              Perfect Match
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
            Where hearts connect and destinies align. Join thousands of successful couples who found their soulmate through our platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={toggleAuthModal}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Your Journey
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            {[
              { number: '50K+', label: 'Happy Couples' },
              { number: '1M+', label: 'Verified Profiles' },
              { number: '95%', label: 'Success Rate' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
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
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-pink-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-white/20 relative">
            <button
              onClick={toggleAuthModal}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
            >
              ×
            </button>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Join SoulMatch'}
              </h2>
              <p className="text-white/80">
                {isLogin ? 'Sign in to continue your journey' : 'Create your profile and find love'}
              </p>
            </div>

            <div className="space-y-4">
              {!isLogin && (
                <>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-12 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/30 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-12 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/30 transition-all"
                    />
                  </div>
                </>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-12 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/30 transition-all"
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-12 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/30 transition-all"
                />
              </div>

              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                      <input
                        type="date"
                        placeholder="Date of Birth"
                        className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-12 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/30 transition-all"
                      />
                    </div>
                    <select className="bg-white/20 border border-white/30 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-pink-400 focus:bg-white/30 transition-all">
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="City, State"
                      className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-12 text-white placeholder-white/60 focus:outline-none focus:border-pink-400 focus:bg-white/30 transition-all"
                    />
                  </div>
                </>
              )}

              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Handle form submission here
                  console.log(isLogin ? 'Logging in...' : 'Creating account...');
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-white/80">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={toggleAuthMode}
                  className="text-pink-400 hover:text-pink-300 ml-2 font-semibold"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            {isLogin && (
              <div className="text-center mt-4">
                <button className="text-white/60 hover:text-white text-sm">
                  Forgot Password?
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}