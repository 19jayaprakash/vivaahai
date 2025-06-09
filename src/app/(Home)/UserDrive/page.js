'use client'
import React, { useEffect, useRef, useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Laptop,
  TrendingUp,
  Building,
  Code,
  Heart,
  Info,
  Share2,
  X,
  ExternalLink,
  Filter,
  RotateCcw,
  Sparkles,
  Search,
  Bell,
  Settings
} from 'lucide-react';
import { toast } from 'react-toastify';
 
const MatrimonyDrivesApp = () => {
  const [drives, setDrives] = useState([
    {
      id: 1,
      name: "Chennai Tech Professionals Meet",
      date: "2025-06-15",
      location: "Hotel Leela Palace, Chennai",
      time: "10:00 AM - 4:00 PM",
      paymentMode: "GPay",
      amount: 2500,
      type: "paid",
      status: "Confirmed",
      description: "Connect with tech professionals from leading companies. This exclusive event brings together software engineers, product managers, and tech leaders from top companies in Chennai.",
      attendees: 150,
      image: "tech",
      category: "Technology"
    },
    {
      id: 2,
      name: "Mumbai Finance Sector Meet",
      date: "2025-06-25",
      location: "Taj Mahal Hotel, Mumbai",
      time: "11:00 AM - 5:00 PM",
      paymentMode: "Free",
      amount: 0,
      type: "free",
      status: "Registered",
      description: "Network with finance professionals and executives from banking, investment, and fintech sectors. Perfect opportunity to meet like-minded professionals.",
      attendees: 200,
      image: "finance",
      category: "Finance"
    },
    {
      id: 3,
      name: "Delhi Government Officers Drive",
      date: "2025-07-01",
      location: "The Imperial Hotel, Delhi",
      time: "2:00 PM - 6:00 PM",
      paymentMode: "PhonePe",
      amount: 1800,
      type: "paid",
      status: "Payment Pending",
      description: "Exclusive meetup for government service professionals including IAS, IPS, and other civil service officers seeking meaningful connections.",
      attendees: 120,
      image: "government",
      category: "Government"
    },
    {
      id: 4,
      name: "Bangalore IT Community Drive",
      date: "2025-07-10",
      location: "ITC Gardenia, Bangalore",
      time: "9:00 AM - 3:00 PM",
      paymentMode: "GPay",
      amount: 3000,
      type: "paid",
      status: "Confirmed",
      description: "Join the largest IT community gathering in Bangalore with professionals from startups to MNCs. Special focus on senior developers and architects.",
      attendees: 300,
      image: "it",
      category: "Information Technology"
    },
    {
      id: 5,
      name: "Hyderabad Healthcare Meet",
      date: "2025-07-15",
      location: "Park Hyatt, Hyderabad",
      time: "10:30 AM - 4:30 PM",
      paymentMode: "Free",
      amount: 0,
      type: "free",
      status: "Registered",
      description: "Connect with healthcare professionals including doctors, nurses, medical researchers, and healthcare administrators from leading hospitals.",
      attendees: 180,
      image: "healthcare",
      category: "Healthcare"
    },
    {
      id: 6,
      name: "Pune Engineering Professionals",
      date: "2025-07-20",
      location: "JW Marriott, Pune",
      time: "1:00 PM - 7:00 PM",
      paymentMode: "GPay",
      amount: 2200,
      type: "paid",
      status: "Confirmed",
      description: "Meet fellow engineering professionals from mechanical, electrical, civil, and other core engineering disciplines.",
      attendees: 160,
      image: "engineering",
      category: "Engineering"
    }
  ]);
 
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [driveToCancel, setDriveToCancel] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
 
  const getDaysUntil = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
 
  const handleCancelClick = (drive) => {
    setDriveToCancel(drive);
    setShowCancelModal(true);
  };
 
  const handleDetailsClick = (drive) => {
    setSelectedDrive(drive);
    setShowDetailsModal(true);
  };
 
  const confirmCancel = () => {
    setDrives(drives.filter(drive => drive.id !== driveToCancel.id));
    setShowCancelModal(false);
    setDriveToCancel(null);
  };
 
  const cancelCancel = () => {
    setShowCancelModal(false);
    setDriveToCancel(null);
  };
 
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.info('Drive information updated!');
    }, 1500);
  };
 
  const shareEvent = async (drive) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: drive.name,
          text: `Check out this matrimony drive: ${drive.name} on ${formatDate(drive.date)} at ${drive.location}`,
          url: window.location.href
        });
      } else {
        const text = `Check out this matrimony drive: ${drive.name} on ${formatDate(drive.date)} at ${drive.location}`;
        await navigator.clipboard.writeText(text);
        toast.info('Event details copied to clipboard!');
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };
 
  const openLocation = (location) => {
    const url = `https://maps.google.com/?q=${encodeURIComponent(location)}`;
    window.open(url, '_blank');
  };
 
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return { backgroundColor: '#dcfce7', color: '#166534', icon: CheckCircle };
      case 'Payment Pending':
        return { backgroundColor: '#fef3c7', color: '#92400e', icon: AlertCircle };
      default:
        return { backgroundColor: '#dbeafe', color: '#1e40af', icon: UserPlus };
    }
  };
 
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Technology': return Laptop;
      case 'Finance': return TrendingUp;
      case 'Government': return Building;
      case 'Information Technology': return Code;
      case 'Healthcare': return Heart;
      default: return Users;
    }
  };
 
  const filteredDrives = drives.filter(drive => {
    const matchesSearch = drive.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drive.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drive.category.toLowerCase().includes(searchTerm.toLowerCase());
   
    if (!matchesSearch) return false;
   
    if (filter === 'all') return true;
    if (filter === 'upcoming') return getDaysUntil(drive.date) > 0;
    if (filter === 'confirmed') return drive.status === 'Confirmed';
    return true;
  });
 
  const sortedDrives = [...filteredDrives].sort((a, b) => {
    if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'amount') return b.amount - a.amount;
    return a.name.localeCompare(b.name);
  });
 
  const DetailsModal = () => {
    if (!showDetailsModal || !selectedDrive) return null;
   
    const CategoryIcon = getCategoryIcon(selectedDrive.category);
   
    return (
     <div className="fixed inset-0 bg-black/1 bg-opacity-100 backdrop-blur-md flex items-center justify-center p-4 z-50">

        <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              <CategoryIcon size={18} className="mr-2" />
              {selectedDrive.category}
            </div>
            <button
              onClick={() => setShowDetailsModal(false)}
              className="p-3 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <X size={20} className="text-gray-600 " />
            </button>
          </div>
 
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{selectedDrive.name}</h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">{selectedDrive.description}</p>
 
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar size={22} className="text-pink-500 mr-4" />
                <span className="text-gray-700 font-medium">{formatDate(selectedDrive.date)}</span>
              </div>
             
              <div className="flex items-center">
                <Clock size={22} className="text-pink-500 mr-4" />
                <span className="text-gray-700 font-medium">{selectedDrive.time}</span>
              </div>
            </div>
           
            <div className="space-y-4">
              <button
                className="flex items-center cursor-pointer w-full text-left group"
                onClick={() => openLocation(selectedDrive.location)}
              >
                <MapPin size={22} className="text-pink-500 mr-4" />
                <span className="text-pink-500 underline flex-1 group-hover:text-pink-600">{selectedDrive.location}</span>
                <ExternalLink size={18} className="text-pink-500 ml-2" />
              </button>
             
              <div className="flex items-center">
                <Users size={22} className="text-pink-500 mr-4" />
                <span className="text-gray-700 font-medium">{selectedDrive.attendees} expected attendees</span>
              </div>
            </div>
          </div>
 
          <div className="flex gap-4">
           
           
            <button
              className="flex-1 flex items-center justify-center cursor-pointer bg-red-50 text-red-500 py-4 px-6 rounded-2xl border border-red-200 hover:bg-red-100 transition-colors font-semibold"
              onClick={() => {
                setShowDetailsModal(false);
                handleCancelClick(selectedDrive);
              }}
            >
              <X size={20} className="mr-3" />
              Cancel Registration
            </button>
          </div>
        </div>
      </div>
    );
  };
 
  const CancelModal = () => {
    if (!showCancelModal || !driveToCancel) return null;
   
    return (
      <div className="fixed inset-0 bg-black/1 bg-opacity-100 backdrop-blur-md flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl p-6 w-full max-w-lg animate-in fade-in-0 zoom-in-95 duration-300">
          <div className="flex items-center mb-6">
            <AlertCircle size={28} className="text-red-500 mr-4" />
            <h3 className="text-2xl font-bold text-gray-900">Cancel Registration</h3>
          </div>
         
          <p className="text-gray-600 mb-6 leading-relaxed text-lg">
            Are you sure you want to cancel your registration for{' '}
            <span className="font-semibold">"{driveToCancel.name}"</span>?
          </p>
         
          {driveToCancel.type === 'paid' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
              <p className="text-amber-800 leading-relaxed">
                <span className="font-bold">Note:</span> Refund of ₹{driveToCancel.amount} will be processed within 5-7 business days.
              </p>
            </div>
          )}
         
          <div className="flex gap-4">
            <button
              onClick={cancelCancel}
              className="flex-1 bg-gray-100 text-gray-900 py-4 cursor-pointer px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Keep Registration
            </button>
            <button
              onClick={confirmCancel}
              className="flex-1 bg-red-500 text-white py-4 px-6 cursor-pointer rounded-xl font-semibold hover:bg-red-600 transition-colors"
            >
              Cancel Registration
            </button>
          </div>
        </div>
      </div>
    );
  };
 
  const DriveCard = ({ drive }) => {
    const daysUntil = getDaysUntil(drive.date);
    const isUpcoming = daysUntil > 0;
    const statusConfig = getStatusColor(drive.status);
    const StatusIcon = statusConfig.icon;
    const CategoryIcon = getCategoryIcon(drive.category);
   
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 mr-4">
            <div className="flex items-center mb-2">
              <div className="bg-pink-100 p-2 rounded-lg mr-3">
                <CategoryIcon size={20} className="text-pink-600" />
              </div>
              <span className="text-sm font-medium text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                {drive.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
              {drive.name}
            </h3>
            {isUpcoming && (
              <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-sm font-semibold px-3 py-1.5 rounded-full">
                <Sparkles size={14} className="mr-2" />
                {daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days left`}
              </div>
            )}
          </div>
          <div
            className="flex items-center px-3 py-1.5 rounded-full text-sm font-semibold"
            style={{ backgroundColor: statusConfig.backgroundColor, color: statusConfig.color }}
          >
            <StatusIcon size={14} className="mr-2" />
            {drive.status}
          </div>
        </div>
       
        <p className="text-gray-600 mb-6 leading-relaxed">
          {drive.description}
        </p>
 
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Calendar size={16} className="text-pink-500 mr-3" />
              <span className="text-gray-700 font-medium">{formatDate(drive.date)}</span>
            </div>
           
            <div className="flex items-center text-sm">
              <Clock size={16} className="text-pink-500 mr-3" />
              <span className="text-gray-700 font-medium">{drive.time}</span>
            </div>
          </div>
         
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <MapPin size={16} className="text-pink-500 mr-3" />
              <span className="text-gray-700 truncate">{drive.location}</span>
            </div>
           
            <div className="flex items-center text-sm">
              <Users size={16} className="text-pink-500 mr-3" />
              <span className="text-gray-700 font-medium">{drive.attendees} attendees</span>
            </div>
          </div>
        </div>
 
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            <p className="text-green-600 font-bold text-lg">
              {drive.type === 'free' ? 'Free Entry' : `₹${drive.amount}`}
            </p>
            {drive.type === 'paid' && (
              <p className="text-gray-500 text-sm">{drive.paymentMode}</p>
            )}
          </div>
         
          <div className="flex gap-3">
            <button
              onClick={() => handleDetailsClick(drive)}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors font-medium flex items-center"
            >
              <Info size={16} className="mr-2" />
              Details
            </button>
           
           
           
            <button
              onClick={() => handleCancelClick(drive)}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg cursor-pointer hover:bg-red-100 transition-colors font-medium flex items-center"
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-xl mr-4">
                <Heart size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Matrimony Drives</h1>
                <p className="text-gray-600">Manage and track your registered events</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                <Bell size={20} className="text-gray-600" />
              </button>
              <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>
 
      <div className="max-w-7xl bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-pink-600">{drives.length}</p>
                <p className="text-gray-600 font-medium">Total Drives</p>
              </div>
              <div className="bg-pink-100 p-3 rounded-xl">
                <Calendar size={24} className="text-pink-600" />
              </div>
            </div>
          </div>
         
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-green-600">
                  ₹{drives.reduce((sum, drive) => sum + drive.amount, 0)}
                </p>
                <p className="text-gray-600 font-medium">Total Investment</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </div>
         
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-blue-600">
                  {drives.filter(drive => getDaysUntil(drive.date) > 0).length}
                </p>
                <p className="text-gray-600 font-medium">Upcoming Events</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users size={24} className="text-blue-600" />
              </div>
            </div>
          </div>
         
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-purple-600">
                  {drives.filter(drive => drive.status === 'Confirmed').length}
                </p>
                <p className="text-gray-600 font-medium">Confirmed</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <CheckCircle size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>
 
        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search drives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border text-black border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500  w-80"
              />
            </div>
           
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 text-gray-500 border border-gray-200 rounded-xl cursor-pointer focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="confirmed">Confirmed</option>
            </select>
           
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border text-gray-500 border-gray-200 rounded-xl cursor-pointer focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
         
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center  text-gray-500 cursor-pointer px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
          >
            <RotateCcw size={18} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
 
        {/* Drive Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {sortedDrives.length > 0 ? (
            sortedDrives.map((drive) => (
              <DriveCard key={drive.id} drive={drive} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Calendar size={48} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-500 mb-3">No Drives Found</h3>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                {searchTerm ? 'Try adjusting your search terms' : 'Try changing your filter or check back later for new events.'}
              </p>
            </div>
          )}
        </div>
 
        <CancelModal />
        <DetailsModal />
      </div>
    </div>
  );
};
 
export default MatrimonyDrivesApp;
 