'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Heart, MessageSquare, Calendar, Eye, Star, Phone, Mail, MapPin, 
  Briefcase, GraduationCap, BarChart3, Settings, Bell, Search, Filter,
  TrendingUp, UserCheck, Clock, AlertCircle, Home, FileText, Target,
  Globe, DollarSign, Award, Activity, Menu, X, ChevronDown, Plus,
  LogOut
} from 'lucide-react';

const MatrimonyManagerDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
 const router = useRouter();
  // Enhanced mock data
  const managerData = {
    name: "Sarah Johnson",
    id: "M001",
    email: "sarah.johnson@matrimony.com",
    phone: "+91 9876543210",
    department: "Customer Success",
    joinDate: "Jan 2023",
    assignedUsers: 24,
    activeMatches: 156,
    successfulMatches: 12,
    pendingActions: 8,
    monthlyTarget: 25,
    achievementRate: 85,
    totalRevenue: "₹2,45,000"
  };

  const analyticsData = {
    weeklyStats: [
      { day: 'Mon', matches: 12, conversations: 8 },
      { day: 'Tue', matches: 15, conversations: 11 },
      { day: 'Wed', matches: 18, conversations: 14 },
      { day: 'Thu', matches: 22, conversations: 16 },
      { day: 'Fri', matches: 20, conversations: 13 },
      { day: 'Sat', matches: 25, conversations: 18 },
      { day: 'Sun', matches: 19, conversations: 12 }
    ],
    conversionRate: 68,
    avgResponseTime: "2.3 hours",
    customerSatisfaction: 4.6
  };

  const notifications = [
    { id: 1, type: 'urgent', message: 'Profile verification pending for Priya S.', time: '10 min ago' },
    { id: 2, type: 'success', message: 'New match found for Rahul P.', time: '1 hour ago' },
    { id: 3, type: 'info', message: 'Monthly report is ready for review', time: '2 hours ago' },
    { id: 4, type: 'warning', message: 'Premium subscription expiring for 3 users', time: '4 hours ago' }
  ];

  const assignedUsers = [
    {
      id: "U001",
      name: "Priya Sharma",
      age: 28,
      profession: "Software Engineer",
      location: "Bengaluru",
      profileCompletion: 95,
      matches: 23,
      conversations: 8,
      lastActive: "2 hours ago",
      status: "active",
      premium: true,
      profileImage: "👩‍💻",
      joinDate: "Dec 2024",
      subscriptionEnd: "Dec 2025",
      priority: "high"
    },
    {
      id: "U002", 
      name: "Rahul Patel",
      age: 32,
      profession: "Doctor",
      location: "Delhi",
      profileCompletion: 88,
      matches: 31,
      conversations: 12,
      lastActive: "1 day ago",
      status: "inactive",
      premium: false,
      profileImage: "👨‍⚕️",
      joinDate: "Nov 2024",
      subscriptionEnd: "Nov 2025",
      priority: "medium"
    },
    {
      id: "U003",
      name: "Anita Reddy",
      age: 26,
      profession: "Marketing Manager",
      location: "Hyderabad",
      profileCompletion: 92,
      matches: 18,
      conversations: 6,
      lastActive: "30 minutes ago",
      status: "active",
      premium: true,
      profileImage: "👩‍💼",
      joinDate: "Jan 2025",
      subscriptionEnd: "Jan 2026",
      priority: "high"
    },
    {
      id: "U004",
      name: "Vikram Singh",
      age: 29,
      profession: "Chartered Accountant",
      location: "Mumbai",
      profileCompletion: 78,
      matches: 15,
      conversations: 4,
      lastActive: "3 hours ago",
      status: "active",
      premium: false,
      profileImage: "👨‍💼",
      joinDate: "Oct 2024",
      subscriptionEnd: "Oct 2025",
      priority: "low"
    },
    {
      id: "U005",
      name: "Meera Gupta",
      age: 30,
      profession: "Teacher",
      location: "Pune",
      profileCompletion: 85,
      matches: 20,
      conversations: 9,
      lastActive: "5 hours ago",
      status: "active",
      premium: true,
      profileImage: "👩‍🏫",
      joinDate: "Sep 2024",
      subscriptionEnd: "Sep 2025",
      priority: "medium"
    },
    {
      id: "U006",
      name: "Arjun Kumar",
      age: 35,
      profession: "Business Owner",
      location: "Chennai",
      profileCompletion: 90,
      matches: 25,
      conversations: 15,
      lastActive: "1 hour ago",
      status: "active",
      premium: true,
      profileImage: "👨‍💼",
      joinDate: "Aug 2024",
      subscriptionEnd: "Aug 2025",
      priority: "high"
    }
  ];

  const userDetailedData = {
    "U001": {
      personalInfo: {
        fullName: "Priya Sharma",
        age: 28,
        height: "5'6\"",
        religion: "Hindu",
        caste: "Brahmin",
        motherTongue: "Hindi",
        maritalStatus: "Never Married",
        diet: "Vegetarian",
        smoking: "No",
        drinking: "No"
      },
      professionalInfo: {
        profession: "Software Engineer",
        company: "TechCorp India",
        income: "₹12 LPA",
        education: "B.Tech Computer Science",
        workLocation: "Bengaluru",
        experience: "5 years"
      },
      familyInfo: {
        fatherOccupation: "Business",
        motherOccupation: "Teacher",
        siblings: "1 Brother (Married)",
        familyType: "Nuclear",
        familyValues: "Traditional"
      },
      preferences: {
        ageRange: "26-32",
        heightRange: "5'8\" - 6'2\"",
        education: "Graduate",
        profession: "Any",
        location: "South India",
        religion: "Hindu",
        diet: "Vegetarian"
      },
      recentActivity: [
        { action: "Profile viewed by 3 users", time: "2 hours ago", type: "view" },
        { action: "Sent interest to Rahul M.", time: "1 day ago", type: "interest" },
        { action: "Updated profile photos", time: "3 days ago", type: "update" },
        { action: "Received premium match suggestion", time: "1 week ago", type: "match" },
        { action: "Completed profile verification", time: "2 weeks ago", type: "verification" }
      ],
      matchingStats: {
        profileViews: 145,
        interestsSent: 12,
        interestsReceived: 31,
        acceptedInterests: 8,
        rejectedInterests: 15,
        shortlistedProfiles: 6
      },
      communicationHistory: [
        { with: "Rahul Patel", lastMessage: "Thank you for your interest", date: "2 days ago", status: "ongoing" },
        { with: "Vikram Singh", lastMessage: "Would like to know more about your family", date: "1 week ago", status: "pending" },
        { with: "Arjun Kumar", lastMessage: "Interested in taking this forward", date: "2 weeks ago", status: "closed" }
      ]
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, section: 'main' },
    { id: 'users', label: 'Assigned Users', icon: Users, section: 'main' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, section: 'main' },
    { id: 'matches', label: 'Match Management', icon: Heart, section: 'main' },
    { id: 'communications', label: 'Communications', icon: MessageSquare, section: 'main' },
    { id: 'reports', label: 'Reports', icon: FileText, section: 'main' },
    { id: 'targets', label: 'Targets & Goals', icon: Target, section: 'main' },
    { id: 'notifications', label: 'Notifications', icon: Bell, section: 'secondary' },
    { id: 'settings', label: 'Settings', icon: Settings, section: 'secondary' }
  ];

  const filteredUsers = assignedUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const Sidebar = () => (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      sidebarCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-full`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
                            <Heart className="w-8 h-8 text-pink-600" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                              VivaahAI
                            </h1>
                          </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg text-black hover:bg-gray-100 cursor-pointer"
          >
            {sidebarCollapsed ? <Menu className="w-5 h-5 " /> : <X className="w-5 h-5 " />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 cursor-pointer">
        <div className="space-y-1">
          {sidebarItems.filter(item => item.section === 'main').map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full cursor-pointer flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === item.id
                  ? 'bg-pink-100 text-pink-700 border-r-2 border-pink-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </div>

        {!sidebarCollapsed && <div className="border-t border-gray-200 pt-4 mt-4" />}
        
        <div className="space-y-1">
          {sidebarItems.filter(item => item.section === 'secondary').map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === item.id
                  ? 'bg-pink-100 text-pink-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* Manager Info */}
      {!sidebarCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
              {managerData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{managerData.name}</p>
              <p className="text-xs text-gray-500">{managerData.department}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Manager Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Assigned Users</p>
              <p className="text-2xl font-bold text-blue-700">{managerData.assignedUsers}</p>
              <p className="text-xs text-blue-500 mt-1">+12% from last month</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-xl border border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-pink-600 font-medium">Active Matches</p>
              <p className="text-2xl font-bold text-pink-700">{managerData.activeMatches}</p>
              <p className="text-xs text-pink-500 mt-1">+8% from last week</p>
            </div>
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Successful Matches</p>
              <p className="text-2xl font-bold text-green-700">{managerData.successfulMatches}</p>
              <p className="text-xs text-green-500 mt-1">Target: {managerData.monthlyTarget}</p>
            </div>
            <Star className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-orange-700">{managerData.totalRevenue}</p>
              <p className="text-xs text-orange-500 mt-1">This month</p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.type === 'urgent' ? 'bg-red-500' :
                  notification.type === 'success' ? 'bg-green-500' :
                  notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Monthly Target</span>
                <span className="font-medium">{managerData.achievementRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: `${managerData.achievementRate}%`}} />
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Conversion Rate</span>
              <span className="font-medium text-green-600">{analyticsData.conversionRate}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Avg Response Time</span>
              <span className="font-medium">{analyticsData.avgResponseTime}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Customer Satisfaction</span>
              <span className="font-medium text-yellow-600">{analyticsData.customerSatisfaction}/5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Users */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Users</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assignedUsers.slice(0, 3).map((user, index) => (
            <div key={user.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">{user.profileImage}</div>
                <div>
                  <h4 className="font-medium text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-500">{user.profession}</p>
                </div>
                <div className={`ml-auto w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                }`}>
                  {index + 1}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Matches:</span>
                  <span className="font-medium ml-1">{user.matches}</span>
                </div>
                <div>
                  <span className="text-gray-500">Success Rate:</span>
                  <span className="font-medium ml-1 text-green-600">
                    {Math.round((user.conversations / user.matches) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const UsersContent = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name, profession, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 text-black pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );

  const UserCard = ({ user }) => (
    <div 
      className={`bg-white rounded-xl p-6 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
        selectedUser?.id === user.id ? 'ring-2 ring-pink-500' : ''
      }`}
      onClick={() => setSelectedUser(user)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{user.profileImage}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.age} years • {user.location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {user.premium && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
          }`}>
            {user.status}
          </span>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Profile Completion</span>
          <span className="font-medium">{user.profileCompletion}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-pink-500 h-2 rounded-full" 
            style={{width: `${user.profileCompletion}%`}}
          ></div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Priority</span>
          <span className={`font-medium ${
            user.priority === 'high' ? 'text-red-600' : 
            user.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {user.priority.charAt(0).toUpperCase() + user.priority.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold text-pink-600">{user.matches}</p>
          <p className="text-xs text-gray-600">Matches</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-blue-600">{user.conversations}</p>
          <p className="text-xs text-gray-600">Chats</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Last Active</p>
          <p className="text-xs font-medium">{user.lastActive}</p>
        </div>
      </div>
    </div>
  );

  const UserDashboard = ({ user }) => {
    const userData = userDetailedData[user.id];
    
    return (
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{user.profileImage}</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.profession} • {user.location}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {user.status}
                  </span>
                  {user.premium && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Premium
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.priority === 'high' ? 'bg-red-100 text-red-800' : 
                    user.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {user.priority} Priority
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setSelectedUser(null)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="flex space-x-1 mt-6">
            {['overview', 'profile', 'activity', 'matches', 'communications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  activeTab === tab 
                    ? 'bg-pink-100 text-pink-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-pink-600 font-medium">Profile Views</p>
                      <p className="text-2xl font-bold text-pink-700">{userData?.matchingStats.profileViews || 0}</p>
                    </div>
                    <Eye className="w-6 h-6 text-pink-500" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Interests Sent</p>
                      <p className="text-2xl font-bold text-blue-700">{userData?.matchingStats.interestsSent || 0}</p>
                    </div>
                    <Heart className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Interests Received</p>
                      <p className="text-2xl font-bold text-green-700">{userData?.matchingStats.interestsReceived || 0}</p>
                    </div>
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Active Chats</p>
                      <p className="text-2xl font-bold text-purple-700">{user.conversations}</p>
                    </div>
                    <MessageSquare className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <div className="space-y-3">
                    {userData?.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'view' ? 'bg-blue-500' :
                          activity.type === 'interest' ? 'bg-pink-500' :
                          activity.type === 'update' ? 'bg-green-500' :
                          activity.type === 'match' ? 'bg-purple-500' : 'bg-yellow-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    )) || []}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Profile Completion</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-pink-500 h-2 rounded-full" style={{width: `${user.profileCompletion}%`}} />
                        </div>
                        <span className="text-sm font-medium">{user.profileCompletion}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Response Rate</span>
                      <span className="text-sm font-medium text-green-600">
                        {Math.round((userData?.matchingStats.acceptedInterests / userData?.matchingStats.interestsReceived) * 100) || 0}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Last Active</span>
                      <span className="text-sm font-medium">{user.lastActive}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Member Since</span>
                      <span className="text-sm font-medium">{user.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && userData && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <div className="space-y-3">
                    {Object.entries(userData.personalInfo).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-sm font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>
                  <div className="space-y-3">
                    {Object.entries(userData.professionalInfo).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-sm font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Family Information</h3>
                  <div className="space-y-3">
                    {Object.entries(userData.familyInfo).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-sm font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Partner Preferences</h3>
                  <div className="space-y-3">
                    {Object.entries(userData.preferences).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-sm font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'matches' && userData && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-green-700 mb-4">Accepted</h3>
                  <p className="text-3xl font-bold text-green-800">{userData.matchingStats.acceptedInterests}</p>
                  <p className="text-sm text-green-600 mt-2">Mutual interests</p>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-red-700 mb-4">Declined</h3>
                  <p className="text-3xl font-bold text-red-800">{userData.matchingStats.rejectedInterests}</p>
                  <p className="text-sm text-red-600 mt-2">Not interested</p>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-yellow-700 mb-4">Shortlisted</h3>
                  <p className="text-3xl font-bold text-yellow-800">{userData.matchingStats.shortlistedProfiles}</p>
                  <p className="text-sm text-yellow-600 mt-2">Under consideration</p>
                </div>
              </div>

              <div className="bg-white border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Analytics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-medium">{Math.round((userData.matchingStats.acceptedInterests / userData.matchingStats.interestsSent) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: `${Math.round((userData.matchingStats.acceptedInterests / userData.matchingStats.interestsSent) * 100)}%`}} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Profile Attractiveness Score</span>
                      <span className="font-medium">8.5/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'communications' && userData && (
            <div className="space-y-6">
              <div className="bg-white border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication History</h3>
                <div className="space-y-4">
                  {userData.communicationHistory.map((comm, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {comm.with.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{comm.with}</h4>
                          <p className="text-sm text-gray-600">{comm.lastMessage}</p>
                          <p className="text-xs text-gray-500">{comm.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        comm.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                        comm.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {comm.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600">
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      <Phone className="w-4 h-4" />
                      <span>Schedule Call</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      <Calendar className="w-4 h-4" />
                      <span>Set Reminder</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Messages Sent</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Messages Received</span>
                      <span className="font-medium">31</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg Response Time</span>
                      <span className="font-medium">4.2 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Communication</span>
                      <span className="font-medium">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && userData && (
            <div className="space-y-6">
              <div className="bg-white border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
                <div className="space-y-4">
                  {userData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        activity.type === 'view' ? 'bg-blue-500' :
                        activity.type === 'interest' ? 'bg-pink-500' :
                        activity.type === 'update' ? 'bg-green-500' :
                        activity.type === 'match' ? 'bg-purple-500' : 'bg-yellow-500'
                      }`} />
                      <div className="flex-1 pb-4 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 capitalize">{activity.type} activity</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Activity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Last Login</span>
                      <span className="text-sm font-medium">{user.lastActive}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Login Frequency</span>
                      <span className="text-sm font-medium">Daily</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Session Duration</span>
                      <span className="text-sm font-medium">45 min avg</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Device</span>
                      <span className="text-sm font-medium">Mobile App</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Profile Views (Week)</span>
                      <span className="text-sm font-medium text-blue-600">+15</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Search Appearances</span>
                      <span className="text-sm font-medium text-green-600">89</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Interest Rate</span>
                      <span className="text-sm font-medium text-purple-600">12%</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-600">Response Rate</span>
                      <span className="text-sm font-medium text-pink-600">68%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (selectedUser) {
      return <UserDashboard user={selectedUser} />;
    }

    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'users':
        return <UsersContent />;
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-blue-700 mb-4">Conversion Rate</h3>
                  <p className="text-3xl font-bold text-blue-800">{analyticsData.conversionRate}%</p>
                  <p className="text-sm text-blue-600 mt-2">+5% from last month</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-green-700 mb-4">Avg Response Time</h3>
                  <p className="text-3xl font-bold text-green-800">{analyticsData.avgResponseTime}</p>
                  <p className="text-sm text-green-600 mt-2">-0.5hrs improvement</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-purple-700 mb-4">Satisfaction</h3>
                  <p className="text-3xl font-bold text-purple-800">{analyticsData.customerSatisfaction}/5</p>
                  <p className="text-sm text-purple-600 mt-2">Based on 150+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
              <p className="text-gray-600">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedUser ? selectedUser.name : 
                 activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </h1>
              <p className="text-sm text-gray-600">
                {selectedUser ? 'User Profile Management' : 
                 `Manage your ${activeSection} efficiently`}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {managerData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{managerData.name}</p>
                  <p className="text-xs text-gray-500">{managerData.department}</p>
                </div>
                <LogOut className="w-6 h-6 text-gray-600 hover:text-pink-600 cursor-pointer transition-colors" onClick={() => { router.push("/") }} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MatrimonyManagerDashboard;