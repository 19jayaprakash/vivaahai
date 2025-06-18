"use client";
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Heart, 
  Calendar, 
  MapPin, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Bell, 
  Settings, 
  LogOut,
  BarChart3,
  UserCheck,
  MessageSquare,
  Star,
  ChevronDown,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { axiosPublic } from '../base/constant';
import {toast} from 'react-toastify';

const MatrimonyAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filterType, setFilterType] = useState('all');
  const router = useRouter();
 
  const [stats] = useState({
    totalUsers: 12847,
    activeProfiles: 8934,
    successfulMatches: 234,
    pendingRequests: 156,
    monthlyGrowth: 12.5,
    activeConnections: 456
  });

  const [drives, setDrives] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [participantsList, setParticipantsList] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);

  // Form state
  const [driveForm, setDriveForm] = useState({
    driveName: '',
    driveDescription: '',
    driveDate: new Date(),
    location: '',
    driveType: 'free',
    registrationFee: 0,
  });

  // Fetch drives on component mount
  useEffect(() => {
    fetchDrives();
  }, []);


  useEffect(()=>{
    axiosPublic.get(
              `/user/display-photo?filename=AdharCard/bg-img.png`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                responseType: 'blob',
              }
            )
            .then(res =>{
              console.log('Background image fetched successfully');
              const url = URL.createObjectURL(res.data);
            })
  },[]);

  const fetchDrives = async () => {
      // Replace with your actual API endpoint
      const token = localStorage.getItem('token');
      await axiosPublic.get('/drive/drives', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res =>{
        setDrives(res.data)
      })
    .catch(error => {console.error('Error fetching drives:', error)});
  };

  const handleCreateDrive = async () => {
    if (driveForm.driveName && driveForm.driveDescription && driveForm.driveDate && driveForm.location) {
      if (driveForm.driveType === 'paid' && !driveForm.registrationFee) {
        toast.info('Please enter registration fee for paid drives');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        await axiosPublic.post('/drive/drives',JSON.stringify(driveForm), {
          headers: {
            'Authorization': `Bearer ${token}`
          },  
        })
        .then(res =>{
            if(res.status === 201){
                console.log('Drive created successfully:', driveForm);
                setDrives([...drives, driveForm]);
                handleClose();
                toast.success('Success: Drive created successfully!');
            }
        })
      } catch (error) {
        console.error('Error creating drive:', error);
        toast.error('Error: Failed to create drive. Please try again.');
      }
    } else {
      toast.error('Error: Please fill all required fields');
    }
  };

  const handleDeleteDrive = (id) => {
    if (window.confirm('Are you sure you want to delete this drive?')) {
      setDrives(drives.filter(drive => drive.driveId !== id));
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setDriveForm({
      driveName: '',
      driveDescription: '',
      driveDate: new Date(),
      location: '',
      driveType: 'free',
      registrationFee: 0,
    });
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleDriveTypeSelect = (type) => {
    setDriveForm({
      ...driveForm,
      driveType: type,
      registrationFee: type === 'free' ? '' : driveForm.registrationFee
    });
  };

  const handleDrivePress = async (drive) => {
    setSelectedDrive(drive);
    setShowParticipantsModal(true);
    
    setLoadingParticipants(true);
    // Simulate API call for participants
    setTimeout(() => {
      setParticipantsList([]);
      setLoadingParticipants(false);
    }, 1000);
  };

  const closeParticipantsModal = () => {
    setShowParticipantsModal(false);
    setSelectedDrive(null);
    setParticipantsList([]);
    setLoadingParticipants(false);
  };

  const handleFeeInputChange = (text) => {
    const numericText = text.replace(/[^0-9.]/g, '');
    const parts = numericText.split('.');
    const formattedText = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : numericText;
    setDriveForm({...driveForm, registrationFee: formattedText});
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setDriveForm({...driveForm, driveDate: selectedDate});
  };

  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
     const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const filteredDrives = drives.filter(drive =>
    drive?.driveName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    drive?.location?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const DriveCard = ({ drive,key, onPress }) => (
    <div 
    key={key}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onPress}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{drive.driveName}</h3>
          <p className="text-sm text-gray-600 mb-1">{drive.driveDescription}</p>
          <p className="text-sm text-blue-600 font-medium mb-1">
            {new Date(drive.driveDate).toLocaleString()} • {drive.location}
          </p>
          <p className="text-sm text-gray-600">{drive.participants || 0} participants</p>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setDriveForm(drive);
            openModal('createDrive');
          }}
        >
          <span className="text-blue-600">👁</span>
        </button>
        <button
          className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteDrive(drive.driveId);
          }}
        >
          <span className="text-red-600">🗑</span>
        </button>
      </div>
    </div>
  );

  const ParticipantCard = ({ participant }) => (
    <div className="bg-white p-4 mb-3 rounded-lg border border-gray-200 flex justify-between items-center">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 mb-1">{participant.name}</h4>
        <p className="text-sm text-gray-600 mb-1">{participant.email}</p>
        <p className="text-xs text-gray-500">
          Enrolled: {new Date(participant.enrolledDate).toLocaleDateString()}
        </p>
      </div>
      <div className="px-3 py-1 rounded-full bg-gray-100">
        <span className={`text-xs font-semibold uppercase ${
          participant.status === 'active' ? 'text-green-600' : 'text-orange-600'
        }`}>
          {participant.status}
        </span>
      </div>
    </div>
  );

  
//   const filteredDrives = drives.filter(drive => {
//     const matchesSearch = drive.driveName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          drive.location.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = filterType === 'all' || drive.type === filterType;
//     return matchesSearch && matchesType;
//   });

  const getTypeColor = (type) => {
    switch(type) {
      case 'free': return 'bg-green-100 text-green-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      case 'invitation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color = "blue" }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-pink-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  VivaahAI
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-600 hover:text-pink-600 cursor-pointer transition-colors" />
              <Settings className="w-6 h-6 text-gray-600 hover:text-pink-600 cursor-pointer transition-colors" />
              <LogOut className="w-6 h-6 text-gray-600 hover:text-pink-600 cursor-pointer transition-colors" onClick={()=>{router.push("/")}} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm h-screen sticky top-16 border-r border-gray-200">
          <div className="p-6">
            <div className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'users', label: 'User Management', icon: Users },
                { id: 'matches', label: 'Matches', icon: Heart },
                { id: 'drives', label: 'Drive Management', icon: Calendar },
                { id: 'messages', label: 'Messages', icon: MessageSquare },
                { id: 'reviews', label: 'Reviews', icon: Star }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
                <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your matrimony platform.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                  icon={Users} 
                  title="Total Users" 
                  value={stats.totalUsers.toLocaleString()} 
                  change={stats.monthlyGrowth}
                  color="blue"
                />
                <StatCard 
                  icon={UserCheck} 
                  title="Active Profiles" 
                  value={stats.activeProfiles.toLocaleString()} 
                  change={8.2}
                  color="green"
                />
                <StatCard 
                  icon={Heart} 
                  title="Successful Matches" 
                  value={stats.successfulMatches} 
                  change={15.3}
                  color="pink"
                />
                <StatCard 
                  icon={MessageSquare} 
                  title="Active Connections" 
                  value={stats.activeConnections} 
                  change={-2.1}
                  color="purple"
                />
                <StatCard 
                  icon={Calendar} 
                  title="Upcoming Drives" 
                  value={drives.filter(d => d.status === 'upcoming').length} 
                  color="orange"
                />
                <StatCard 
                  icon={Bell} 
                  title="Pending Requests" 
                  value={stats.pendingRequests} 
                  color="red"
                />
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New user registration', user: 'Priya Sharma', time: '2 minutes ago' },
                    { action: 'Match successful', user: 'Rahul & Anjali', time: '15 minutes ago' },
                    { action: 'Profile verification completed', user: 'Vikram Singh', time: '1 hour ago' },
                    { action: 'Drive registration', user: 'Meera Patel', time: '2 hours ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'drives' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Drive Management Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Drive Management</h2>
                  <p className="text-gray-600 mt-1">Manage matrimony drives and events</p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create New Drive</span>
                </button>
              </div>

              {/* Search and Filter */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search drives..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border text-black outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="appearance-none text-black outline-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="free">Free</option>
                      <option value="paid">Paid</option>
                      <option value="invitation">Invitation</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Drives Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDrives.length > 0 ?
                <>
                {filteredDrives.map((drive) => (
                //   <div key={drive.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105">
                //     <div className="p-6">
                //       <div className="flex justify-between items-start mb-4">
                //         <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{drive.driveName}</h3>
                //         <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(drive.driveType)}`}>
                //           {drive.driveType.charAt(0).toUpperCase() + drive.driveType.slice(1)}
                //         </span>
                //       </div>
                      
                //       <div className="space-y-3 mb-4">
                //         <div className="flex items-center text-gray-600">
                //           <Calendar className="w-4 h-4 mr-2" />
                //           <span className="text-sm">{new Date(drive.driveDate).toLocaleDateString()}</span>
                //         </div>
                //         <div className="flex items-center text-gray-600">
                //           <MapPin className="w-4 h-4 mr-2" />
                //           <span className="text-sm">{drive.location}</span>
                //         </div>
                //         {/* <div className="flex items-center text-gray-600">
                //           <Users className="w-4 h-4 mr-2" />
                //           <span className="text-sm">{drive.participants} participants</span>
                //         </div> */}
                //       </div>

                //       <p className="text-gray-600 text-sm mb-4 line-clamp-2">{drive.driveDescription}</p>

                //       <div className="flex justify-between items-center">
                //         {/* <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                //           drive.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                //         }`}>
                //           {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
                //         </span> */}
                //         <div className="flex space-x-2">
                //           <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                //             <Eye className="w-4 h-4" />
                //           </button>
                //           <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                //             <Edit className="w-4 h-4" />
                //           </button>
                //           <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                //             <Trash2 className="w-4 h-4" />
                //           </button>
                //         </div>
                //       </div>
                //     </div>
                //   </div>
                <DriveCard drive={drive} key={drive.id} onPress={()=>{}} />
                ))} 
                </>
                : 
                <div className='flex justify-center'><span className='opacity-40'>No Drives available. Please create one.</span> </div>
            }
              </div>
            </div>
          )}

          {/* Other tabs content */}
          {activeTab !== 'dashboard' && activeTab !== 'drives' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Users className="w-16 h-16 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
                </h3>
                <p className="text-gray-600">This section is under development. Coming soon!</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create Drive Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        {/* Modal Container */}
        <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Create New Drive</h2>
            <button
            onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-gray-500 text-xl">✕</span>
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter drive title"
                value={driveForm.driveName || ''}
                onChange={(e) => setDriveForm({...driveForm, driveName: e.target.value})}
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter drive description"
                rows={3}
                value={driveForm.driveDescription || ''}
                onChange={(e) => setDriveForm({...driveForm, driveDescription: e.target.value})}
              />
            </div>

            {/* Drive Type Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Drive Type *
              </label>
              <div className="space-y-2">
                {['free', 'paid', 'invitation'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`w-full flex items-center space-x-3 p-3 border rounded-md transition-colors ${
                      driveForm.driveType === type
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleDriveTypeSelect(type)}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      driveForm.driveType === type
                        ? 'border-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {driveForm.driveType === type && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <span className={`text-sm ${
                      driveForm.driveType === type
                        ? 'text-blue-700 font-medium'
                        : 'text-gray-700'
                    }`}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Registration Fee - Only show for paid drives */}
            {driveForm.driveType === 'paid' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Registration Fee *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="text"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    value={driveForm.registrationFee || ''}
                    onChange={(e) => handleFeeInputChange(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500">Enter the registration fee amount</p>
              </div>
            )}

            {/* Show info for invitation type */}
            {driveForm.driveType === 'invitation' && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <p className="text-sm text-blue-700">
                  💌 Invitation-only drives require participants to have an invitation code to register.
                </p>
              </div>
            )}

            {/* Date Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Date *
              </label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formatDateForInput(driveForm.driveDate)}
                onChange={handleDateChange}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>

            {/* Location Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter venue location"
                value={driveForm.location || ''}
                onChange={(e) => setDriveForm({...driveForm, location: e.target.value})}
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex space-x-3 p-4 border-t border-gray-200">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleCreateDrive}
            >
              Create Drive
            </button>
          </div>
        </div>
      </div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MatrimonyAdminDashboard;