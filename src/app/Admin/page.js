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
  BadgeCheck,
  X,
  CheckCircle,
  Phone,
  Mail,
  User,
  Delete,
  Mars,
  Venus
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { axiosPublic } from '../base/constant';
import { toast } from 'react-toastify';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [profile, setProfile] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [validatingProfile, setValidatingProfile] = useState(null);
  const [screenWidth, setScreenWidth] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [driveToDelete, setDriveToDelete] = useState(null);

  const [showCasteDropdown, setShowCasteDropdown] = useState(false);
  const [showProfessionDropdown, setShowProfessionDropdown] = useState(false);
  const[showLocationDropdown, setShowLocationDropdown] = useState(false);

  const[cityOptions, setCityOptions] = useState([]);
  const[religionOptions, setReligionOptions] = useState([]);
  const[casteOptions, setCasteOptions] = useState([]);
  const[professionOptions, setProfessionOptions] = useState([]);

  useEffect(()=>{
    axiosPublic.get('/utility/parent?parentCode=Tamil_Nadu')
    .then(res =>{
      if(res.status === 200){
        setCityOptions(res.data.data);
      }
    })
    .catch(err =>{
      console.log(err);
    })
    axiosPublic.get('/utility/utilHead?utilHead=religion')
    .then(res =>{
      if(res.status === 200){
        setReligionOptions(res.data.data);
      }
    })
    .catch(err =>{
      console.log(err);
    })
    axiosPublic.get('/utility/utilHead?utilHead=caste')
    .then(res =>{
      if(res.status === 200){
        setCasteOptions(res.data.data);
      }
    })
    .catch(err =>{
      console.log(err);
    })
    axiosPublic.get('/utility/utilHead?utilHead=occupation')
    .then(res =>{
      if(res.status === 200){
        setProfessionOptions(res.data.data);
      }
    })
    .catch(err =>{
      console.log(err);
    })
  },[]);

  const handleDeleteDrive = (drive) => {
    setDriveToDelete(drive);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    axiosPublic.get(`/dashboard/overview`)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setDashboardData(res.data);
        }
      })
  }, []);


  const confirmDelete = async (driveId) => {
    try {
      // Update your drives list
      setDrives(prev => prev.filter(drive => drive.driveId !== driveId));

      console.log(`Successfully deleted drive with ID: ${driveId}`);
    } catch (error) {
      console.error('Failed to delete drive:', error);
      // Handle error (show toast notification, etc.)
    }
  };

  const CARD_WIDTH = screenWidth < 768 ? screenWidth * 0.85 : screenWidth < 1024 ? screenWidth * 0.45 : 420;
  const CARD_MARGIN = screenWidth < 768 ? 30 : 25;


  useEffect(() => {
    const updateScreenWidth = () => {
      if (typeof window !== 'undefined') {
        setScreenWidth(window.innerWidth);
      }
    };
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  // Form state
  const [driveForm, setDriveForm] = useState({
    driveName: '',
    driveDescription: '',
    driveDate: new Date(),
    location: '',
    driveType: 'free',
    registrationFee: 0,
    minAge: '',
    maxAge: '',
    userLocation: [],
    religion: '',
    caste: [], // Array for multi-select
    profession: [] // Array for multi-select
  });

  // Fetch drives on component mount
  useEffect(() => {
    fetchDrives();
  }, []);

  // Profile verification fetch
  useEffect(() => {
    fetchProfilesForVerification();
  }, []);

  const fetchProfilesForVerification = async () => {
    setLoadingProfiles(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axiosPublic.get('/user/get-profiles-to-verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data.profiles || []);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast.error('Failed to fetch verification profiles');
    } finally {
      setLoadingProfiles(false);
    }
  };


  const fetchDrives = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axiosPublic.get('/drive/drives', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setDrives(response.data);
    } catch (error) {
      console.error('Error fetching drives:', error);
    }
  };

  const handleCreateDrive = async () => {
    if (driveForm.driveName && driveForm.driveDescription && driveForm.driveDate && driveForm.location) {
      if (driveForm.driveType === 'paid' && !driveForm.registrationFee) {
        toast.info('Please enter registration fee for paid drives');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const url = isUpdate ? `/admin/drives/${driveForm.driveId}` : '/drive/drives';
        const response = await axiosPublic.post(url, JSON.stringify(driveForm), {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (response.status === 201 || response.status === 200) {
          if (isUpdate) {
            setDrives(drives.map(drive =>
              drive.driveId === driveForm.driveId ? response.data : drive
            ))
          }
          else {
            setDrives([...drives, driveForm]);
          }

          handleClose();
          toast.success(`Success: Drive ${isUpdate ? "Updated" : "created"} successfully!`);
        }
      } catch (error) {
        console.error('Error creating drive:', error);
        toast.error(`Error: Failed to ${isUpdate ? "Update" : "create"} drive. Please try again.`);
      }
    } else {
      toast.error('Error: Please fill all required fields');
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

  const handleDriveTypeSelect = (type) => {
    setDriveForm({
      ...driveForm,
      driveType: type,
      registrationFee: type === 'free' ? '' : driveForm.registrationFee
    });
  };

  const handleFeeInputChange = (text) => {
    const numericText = text.replace(/[^0-9.]/g, '');
    const parts = numericText.split('.');
    const formattedText = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : numericText;
    setDriveForm({ ...driveForm, registrationFee: formattedText });
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setDriveForm({ ...driveForm, driveDate: selectedDate });
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

  const filteredDrives = drives.filter(drive => {
    // Search term filter (existing logic)
    const searchMatch = !searchTerm ||
      drive?.driveName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      drive?.location?.toLowerCase().includes(searchTerm?.toLowerCase());

    // Drive type filter (new logic)
    const typeMatch = (() => {
      if (!filterType || filterType === 'all') {
        return true; // Show all drives
      }

      // Assuming your drive object has a 'type' field with values like 'free', 'paid', 'invitation'
      return drive?.driveType?.toLowerCase() === filterType.toLowerCase();
    })();

    // Both conditions must be true
    return searchMatch && typeMatch;
  });

  const getDriveTypeTheme = (type) => {
    switch (type) {
      case 'Free':
        return {
          accentColor: 'text-emerald-600',
          ribbonBg: 'bg-emerald-500',
          buttonGradient: 'from-emerald-500 to-teal-600',
          icon: '🎉',
          label: 'COMPLIMENTARY'
        };
      case 'Paid':
        return {
          accentColor: 'text-amber-600',
          ribbonBg: 'bg-amber-500',
          buttonGradient: 'from-amber-500 to-orange-600',
          icon: '💎',
          label: 'PREMIUM EVENT'
        };
      case 'Invitation':
        return {
          accentColor: 'text-purple-600',
          ribbonBg: 'bg-purple-500',
          buttonGradient: 'from-purple-500 to-pink-600',
          icon: '✨',
          label: 'BY INVITATION ONLY'
        };
      default:
        return {
          accentColor: 'text-gray-600',
          ribbonBg: 'bg-gray-500',
          buttonGradient: 'from-gray-500 to-gray-600',
          icon: '📅',
          label: 'SPECIAL EVENT'
        };
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-IN', { month: 'long' }),
      year: date.getFullYear(),
      weekday: date.toLocaleDateString('en-IN', { weekday: 'long' }),
      ordinal: getOrdinal(date.getDate()),
      fullDate: date.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    };
  };

  const getOrdinal = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleEditDrive = (drive) => {
    console.log('Editing drive:', drive);
    setIsUpdate(true);
    setDriveForm(drive);
    setShowModal(true);
  };

  const[selectedDriveId, setSelectedDriveId] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const[loading,setLoading] = useState(false);
  const[registeredUsers, setRegisteredUsers] = useState([]);
  const[error,setError] = useState(null);


  const handleViewDrive = async (driveId) => {
    setSelectedDriveId(driveId);
    setViewModalOpen(true);
    setLoading(true);

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');

      const response = await fetch(`https://stu.globalknowledgetech.com:9443/drive/get-registeredUsersByDriveId/${driveId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRegisteredUsers(data);
    } catch (error) {
      console.error('Error fetching registered users:', error);
      setError('Failed to load registered users');
    } finally {
      setLoading(false);
    }
  };

  const DeleteConfirmationModal = ({ drive, isOpen, onClose, onConfirm }) => {
    if (!isOpen || !drive) return null;

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleConfirmDelete = () => {
      onConfirm(drive.id);
      onClose();
    };

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Invitation
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to delete &quot;{drive.driveName}&quot;?
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-6 bg-red-50 p-3 rounded-lg border border-red-100">
              <strong>Warning:</strong> This action cannot be undone. All registrations and related data will be permanently deleted.
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
              >
                Delete Invitation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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

  const VerificationCard = ({ profileData }) => (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="p-6">
        {/* Header with status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">
              Verification Pending
            </span>
          </div>
        </div>

        {/* User Information */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3">
            <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-lg font-semibold text-gray-800">{profileData.UserProfile.firstName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm text-gray-700">{profileData.UserProfile.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="text-sm text-gray-700">{profileData.UserProfile.primaryContact}</p>
            </div>
          </div>
        </div>



        {/* Action Button */}
        <button
          onClick={() => router.push(`/Admin/${profileData.userId}`)}
          disabled={validatingProfile === profileData.userId}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {validatingProfile === profileData.userId ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Validating...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Validate Profile</span>
            </>
          )}
        </button>
      </div>
    </div>
  );


  const ViewRegistrationsModal = ({ drive, isOpen, onClose, registeredUsers, loading, error }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    if (!isOpen || !drive) return null;

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    // Helper function to check if payment details exist
    const hasPaymentDetails = (registration) => {
      return registration.paymentStatus || registration.paymentMode || registration.transactionId;
    };

    // Helper function to get gender icon
    // const getGenderIcon = (gender) => {
    //   if (!gender) return null;

    //   const genderLower = gender.toLowerCase();
    //   if (genderLower === 'male' || genderLower === 'm') {
    //     return (
    //       <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
    //         <path d="M10 2a6 6 0 016 6c0 2.887-2.047 5.28-4.769 5.855L13 16h2v2h-2v2h-2v-2H9v-2h2l1.769-2.145A6 6 0 1110 2z"/>
    //       </svg>
    //     );
    //   } else if (genderLower === 'female' || genderLower === 'f') {
    //     return (
    //       <svg className="w-3 h-3 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
    //         <path d="M10 2a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8zm0 2c-1.105 0-2 .895-2 2v2h4v-2c0-1.105-.895-2-2-2z"/>
    //       </svg>
    //     );
    //   }
    //   return null;
    // };
    const getGenderIcon = (gender) => {
      if (!gender) return null;

      const genderLower = gender.toLowerCase();

      if (genderLower === 'male' || genderLower === 'm') {
        return <Mars className="w-4 h-4 text-blue-500" />;
      } else if (genderLower === 'female' || genderLower === 'f') {
        return <Venus className="w-4 h-4 text-pink-500" />;
      }

      return null;
    };

    // Pagination calculations
    const totalItems = registeredUsers?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = registeredUsers?.slice(startIndex, endIndex) || [];

    // // Reset to first page when data changes
    // useEffect(() => {
    //   setCurrentPage(1);
    // }, [registeredUsers]);

    const goToPage = (page) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-hidden transform transition-all">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Registered Users
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Drive: &quot;{drive.driveName}&quot;
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading registered users...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {!loading && !error && registeredUsers && (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800">
                      <strong>Total Registrations:</strong> {totalItems}
                    </p>
                  </div>

                  {totalPages > 1 && (
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
                    </div>
                  )}
                </div>

                {registeredUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-500 text-lg">No registrations found</p>
                    <p className="text-gray-400 text-sm mt-1">This drive has no registered users yet.</p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Email
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Phone
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              City
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Docs
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Registration Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              Payment Details
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {currentItems.map((registration, index) => (
                            <tr key={registration.registrationId || index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                  {registration.registrationId}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                <div className="flex items-center space-x-2">
                                  <div>
                                    <div className="font-medium flex items-center space-x-1">

                                      <span>{registration.UserProfile?.firstName || 'N/A'}</span>
                                      {getGenderIcon(registration.UserProfile?.gender)}
                                    </div>
                                    {registration.UserProfile?.gender && (
                                      <div className="text-xs text-gray-500 capitalize">
                                        {registration.UserProfile.gender}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                <div className="max-w-xs truncate" title={registration.UserProfile?.email}>
                                  {registration.UserProfile?.email || 'N/A'}
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {registration.UserProfile?.primaryContact || 'N/A'}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {registration.UserProfile?.city || 'N/A'}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${registration.status === 'registered'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                  {registration.status || 'Unknown'}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${registration.documentsSubmitted
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-gray-100 text-gray-800'
                                  }`}>
                                  {registration.documentsSubmitted ? 'Submitted' : 'Pending'}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {registration.registrationDate
                                  ? new Date(registration.registrationDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })
                                  : 'N/A'
                                }
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                {hasPaymentDetails(registration) ? (
                                  <div className="space-y-1">
                                    {registration.paymentStatus && (
                                      <div>
                                        <span className="text-xs font-medium text-gray-600">Status:</span>
                                        <span className={`ml-1 px-2 py-1 rounded text-xs font-medium ${registration.paymentStatus?.toLowerCase() === 'completed'
                                            ? 'bg-green-100 text-green-800'
                                            : registration.paymentStatus?.toLowerCase() === 'pending'
                                              ? 'bg-yellow-100 text-yellow-800'
                                              : 'bg-gray-100 text-gray-800'
                                          }`}>
                                          {registration.paymentStatus}
                                        </span>
                                      </div>
                                    )}
                                    {registration.paymentMode && (
                                      <div>
                                        <span className="text-xs font-medium text-gray-600">Mode:</span>
                                        <span className="ml-1 text-xs">{registration.paymentMode}</span>
                                      </div>
                                    )}
                                    {registration.transactionId && (
                                      <div>
                                        <span className="text-xs font-medium text-gray-600">Txn ID:</span>
                                        <span className="ml-1 text-xs font-mono bg-gray-100 px-1 rounded">
                                          {registration.transactionId.length > 12
                                            ? `${registration.transactionId.substring(0, 12)}...`
                                            : registration.transactionId
                                          }
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-400">No payment info</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>

                          {/* Page Numbers */}
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              let pageNum;
                              if (totalPages <= 5) {
                                pageNum = i + 1;
                              } else if (currentPage <= 3) {
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                              } else {
                                pageNum = currentPage - 2 + i;
                              }

                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => goToPage(pageNum)}
                                  className={`px-3 py-1 text-sm font-medium rounded-md ${currentPage === pageNum
                                      ? 'bg-blue-600 text-white'
                                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                          </div>

                          <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>

                        <div className="text-sm text-gray-700">
                          Page {currentPage} of {totalPages}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
              <LogOut className="w-6 h-6 text-gray-600 hover:text-pink-600 cursor-pointer transition-colors" onClick={() => { router.push("/") }} />
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
                { id: 'drives', label: 'Drive Management', icon: Calendar },
                { id: 'verify', label: 'Verify Profiles', icon: BadgeCheck },
                { id: 'matches', label: 'Matches', icon: Heart },
                { id: 'messages', label: 'Messages', icon: MessageSquare },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'users', label: 'User Management', icon: Users }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${activeTab === item.id
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
                  value={dashboardData?.totalUsers || 0}
                  change={parseFloat(dashboardData?.totalUsersChange?.replace('%', '')) || 0}
                  color="blue"
                />
                <StatCard
                  icon={UserCheck}
                  title="Active Profiles"
                  value={dashboardData?.activeUsers || 0}
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
                  value={dashboardData?.upcomingDrives?.length || 0}
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
                  onClick={() => { setShowModal(true); setIsUpdate(false); }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 cursor-pointer rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
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
                {filteredDrives.length > 0 ? (
                  filteredDrives.map((drive) => {
                    const theme = getDriveTypeTheme(drive.driveType);
                    const dateInfo = formatDate(drive.driveDate);

                    return (
                      <div
                        key={drive.driveId}
                        className="flex-shrink-0 group"
                        style={{
                          width: `310px`,
                          marginRight: `100px`,
                          scrollSnapAlign: 'start',
                        }}
                      >
                        {/* Floral Template Invitation Card */}
                        <div className="relative w-full h-[540px] md:h-[620px] mx-auto mt-6">

                          {/* Action Buttons Container */}
                          <div className="absolute -top-2 left-2 z-20 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">

                            {/* Edit Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditDrive(drive);
                              }}
                              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 border-2 border-white backdrop-blur-sm"
                              aria-label="Edit invitation"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDrive(drive.driveId);
                              }}
                              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 border-2 border-white backdrop-blur-sm"
                              aria-label="View registrations"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>

                            {/* Delete Button */}
                            {/* <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteDrive(drive);
                              }}
                              className="bg-red-500 hover:bg-red-600 cursor-pointer text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 border-2 border-white backdrop-blur-sm"
                              aria-label="Delete invitation"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button> */}
                          </div>

                          {/* Mobile Action Buttons (Always Visible on Small Screens) */}
                          <div className="absolute -top-1 -right-1 z-20 flex space-x-1 md:hidden">

                            {/* Mobile Edit Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditDrive(drive);
                              }}
                              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md border border-white transition-all duration-200 active:scale-95"
                              aria-label="Edit invitation"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>

                            {/* Mobile Delete Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteDrive(drive);
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md border border-white transition-all duration-200 active:scale-95"
                              aria-label="Delete invitation"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Card Hover Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 rounded-2xl pointer-events-none"></div>

                          {/* Floral Background Template */}
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-2xl shadow-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-300">

                            {/* Floral Corner Decorations - Top */}
                            <div className="absolute top-0 right-0 w-48 h-48 opacity-30">
                              <svg viewBox="0 0 200 200" className="w-full h-full">
                                <g fill="url(#floral-gradient)">
                                  <path d="M150,50 Q170,30 190,50 Q170,70 150,50 Q130,30 150,50" />
                                  <path d="M160,40 Q180,20 200,40 Q180,60 160,40" />
                                  <circle cx="165" cy="45" r="3" fill="#c084fc" />
                                  <circle cx="155" cy="55" r="2" fill="#a855f7" />
                                  <path d="M140,60 Q150,50 160,60 L150,70 Z" fill="#86efac" />
                                  <path d="M170,65 Q180,55 190,65 L180,75 Z" fill="#86efac" />
                                  <path d="M145,35 Q155,25 165,35 L155,45 Z" fill="#86efac" />
                                </g>
                                <defs>
                                  <linearGradient id="floral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#d8b4fe' }} />
                                    <stop offset="50%" style={{ stopColor: '#c084fc' }} />
                                    <stop offset="100%" style={{ stopColor: '#a855f7' }} />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </div>

                            {/* Floral Corner Decorations - Bottom Left */}
                            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-30 transform rotate-180">
                              <svg viewBox="0 0 150 150" className="w-full h-full">
                                <g fill="url(#floral-gradient-2)">
                                  <path d="M50,50 Q70,30 90,50 Q70,70 50,50 Q30,30 50,50" />
                                  <circle cx="55" cy="45" r="2" fill="#34d399" />
                                  <circle cx="65" cy="55" r="3" fill="#10b981" />
                                  <path d="M40,60 Q50,50 60,60 L50,70 Z" fill="#86efac" />
                                  <path d="M70,35 Q80,25 90,35 L80,45 Z" fill="#86efac" />
                                </g>
                                <defs>
                                  <linearGradient id="floral-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#a7f3d0' }} />
                                    <stop offset="50%" style={{ stopColor: '#6ee7b7' }} />
                                    <stop offset="100%" style={{ stopColor: '#34d399' }} />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </div>

                            {/* Delicate Border Frame */}
                            <div className="absolute inset-4 border-2 border-purple-200 rounded-xl opacity-40"></div>
                            <div className="absolute inset-6 border border-purple-100 rounded-lg opacity-60"></div>
                          </div>

                          {/* Ribbon/Label */}
                          <div className={`absolute -top-3 -right-3 ${theme.ribbonBg} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12 border-2 border-white z-10`}>
                            {theme.icon} {theme.label}
                          </div>

                          {/* Card Content */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 py-12">

                            {/* Elegant Header */}
                            <div className="text-center mb-6">

                              <div className="text-xs font-serif tracking-widest text-gray-500 uppercase mb-3 font-medium">You Are Cordially Invited</div>
                              <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mx-auto mb-4"></div>
                              <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 leading-tight mb-4">
                                {drive.driveName}
                              </h3>
                              <div className="flex items-center justify-center space-x-2 mb-4">
                                <div className="w-6 h-px bg-purple-300"></div>
                                <div className="w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
                                <div className="w-6 h-px bg-purple-300"></div>
                              </div>
                            </div>

                            {/* Description */}
                            <div className="text-center mb-6">
                              <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium italic max-w-xs">
                                &quot;{drive.driveDescription?.charAt(0).toUpperCase() + drive.driveDescription?.slice(1) || ''}&quot;
                              </p>
                            </div>

                            {/* Event Details */}
                            <div className="flex-grow space-y-4 text-center">

                              {/* Date */}
                              <div>
                                <div className="text-xs font-serif tracking-wider text-gray-500 uppercase mb-1 font-medium">Date</div>
                                <div className="text-lg font-serif font-bold text-gray-800">
                                  {dateInfo.fullDate}
                                </div>
                                <div className="text-sm font-serif text-gray-600">
                                  at {formatTime(drive.driveDate)}
                                </div>
                              </div>

                              {/* Venue */}
                              <div>
                                <div className="text-xs font-serif tracking-wider text-gray-500 uppercase mb-1 font-medium">Venue</div>
                                <div className="text-sm font-serif text-gray-700 font-medium">
                                  📍 {drive.location}
                                </div>
                              </div>

                              {/* Fee for Paid Events */}
                              {drive.driveType === 'Paid' && (
                                <div>
                                  <div className="text-xs font-serif tracking-wider text-emerald-600 uppercase mb-1 font-medium">Registration Fee</div>
                                  <div className="text-xl font-serif font-bold text-emerald-700">
                                    ₹{drive.registrationFee?.toLocaleString()}
                                  </div>
                                  <div className="text-xs font-serif text-emerald-600">per person</div>
                                </div>
                              )}
                            </div>

                            {/* RSVP Button */}
                            {/* <div className="text-center mt-6">
        <div className="text-xs font-serif tracking-wider text-gray-500 uppercase mb-3 font-medium">Kindly Respond</div>
        <button
          className={`bg-gradient-to-r ${theme.buttonGradient} text-white font-serif font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white`}
          onClick={(e) => {
            e.stopPropagation();
            navigateToRegisterPage(drive);
          }}
        >
          <span className="text-sm">
            {drive.driveType === 'Invitation' ? '🎫 Request Attendance' : '✍️ Confirm Attendance'}
          </span>
        </button>
        <div className="text-xs font-serif text-gray-500 mt-2 italic">
          {drive.driveType === 'Invitation' ? 'Subject to approval' : 'Your presence is requested'}
        </div>
      </div> */}
                          </div>


                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full flex justify-center">
                    <span className="opacity-40">No Drives available. Please create one.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'verify' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile Verification</h2>
                  <p className="text-gray-600">Review and validate user profiles awaiting verification</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-600">Pending: </span>
                    <span className="font-semibold text-gray-900">{profile.length}</span>
                  </div>
                  <button
                    onClick={fetchProfilesForVerification}
                    disabled={loadingProfiles}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    {loadingProfiles ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <BadgeCheck className="w-4 h-4" />
                    )}
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {loadingProfiles ? (
                <div className="flex justify-center items-center py-12">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading verification requests...</p>
                  </div>
                </div>
              ) : profile.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profile.map((profileData) => (
                    <div key={profileData.userId}>
                      <VerificationCard

                        profileData={profileData}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <BadgeCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">All Caught Up!</h3>
                  <p className="text-gray-600">No profiles pending verification at the moment.</p>
                </div>
              )}
            </div>
          )}

          {/* Other tabs content */}
          {activeTab !== 'dashboard' && activeTab !== 'drives' && activeTab !== 'verify' && (
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
        // <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        //   <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
        //     <div className="flex items-center justify-between p-4 border-b border-gray-200">
        //       <h2 className="text-lg font-semibold text-gray-900">Create New Drive</h2>
        //       <button
        //         onClick={handleClose}
        //         className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        //       >
        //         <X className="w-5 h-5 text-gray-500" />
        //       </button>
        //     </div>

        //     <div className="flex-1 overflow-y-auto p-4 space-y-4">
        //       <div className="space-y-2">
        //         <label className="block text-sm font-medium text-gray-700">Title *</label>
        //         <input
        //           type="text"
        //           className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        //           placeholder="Enter drive title"
        //           value={driveForm.driveName || ''}
        //           onChange={(e) => setDriveForm({ ...driveForm, driveName: e.target.value })}
        //         />
        //       </div>

        //       <div className="space-y-2">
        //         <label className="block text-sm font-medium text-gray-700">Description *</label>
        //         <textarea
        //           className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        //           placeholder="Enter drive description"
        //           rows={3}
        //           value={driveForm.driveDescription || ''}
        //           onChange={(e) => setDriveForm({ ...driveForm, driveDescription: e.target.value })}
        //         />
        //       </div>

        //       {/* Drive Type Selection */}
        //       <div className="space-y-2">
        //         <label className="block text-sm font-medium text-gray-700">
        //           Drive Type *
        //         </label>
        //         <div className="space-y-2">
        //           {['free', 'paid', 'invitation'].map((type) => (
        //             <button
        //               key={type}
        //               type="button"
        //               className={`w-full flex items-center space-x-3 p-3 border text-black rounded-md transition-colors ${driveForm.driveType.toLowerCase() === type
        //                 ? 'border-blue-500 bg-blue-50'
        //                 : 'border-gray-300 hover:bg-gray-50'
        //                 }`}
        //               onClick={() => handleDriveTypeSelect(type)}
        //             >
        //               <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${driveForm.driveType.toLowerCase() === type
        //                 ? 'border-blue-500'
        //                 : 'border-gray-300'
        //                 }`}>
        //                 {driveForm.driveType.toLowerCase() === type && (
        //                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        //                 )}
        //               </div>
        //               <span className={`text-sm ${driveForm.driveType.toLowerCase() === type
        //                 ? 'text-blue-700 font-medium'
        //                 : 'text-gray-700'
        //                 }`}>
        //                 {type.charAt(0).toUpperCase() + type.slice(1)}
        //               </span>
        //             </button>
        //           ))}
        //         </div>
        //       </div>

        //       {/* Registration Fee - Only show for paid drives */}
        //       {driveForm.driveType.toLowerCase() === 'paid' && (
        //         <div className="space-y-2">
        //           <label className="block text-sm font-medium text-gray-700">
        //             Registration Fee *
        //           </label>
        //           <div className="relative">
        //             <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        //               ₹
        //             </span>
        //             <input
        //               type="text"
        //               className="w-full pl-8 pr-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        //               placeholder="0.00"
        //               value={driveForm.registrationFee || ''}
        //               onChange={(e) => handleFeeInputChange(e.target.value)}
        //             />
        //           </div>
        //           <p className="text-xs text-gray-500">Enter the registration fee amount</p>
        //         </div>
        //       )}

        //       {/* Show info for invitation type */}
        //       {driveForm.driveType.toLowerCase() === 'invitation' && (
        //         <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        //           <p className="text-sm text-blue-700">
        //             💌 Invitation-only drives require participants to have an invitation code to register.
        //           </p>
        //         </div>
        //       )}

        //       <div className="space-y-2">
        //         <label className="block text-sm font-medium text-gray-700">Date & Time *</label>
        //         <input
        //           type="datetime-local"
        //           className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        //           value={formatDateForInput(driveForm.driveDate)}
        //           onChange={handleDateChange}
        //         />
        //       </div>

        //       <div className="space-y-2">
        //         <label className="block text-sm font-medium text-gray-700">Location *</label>
        //         <input
        //           type="text"
        //           className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        //           placeholder="Enter location"
        //           value={driveForm.location || ''}
        //           onChange={(e) => setDriveForm({ ...driveForm, location: e.target.value })}
        //         />
        //       </div>
        //     </div>

        //     <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
        //       <button
        //         onClick={handleClose}
        //         className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        //       >
        //         Cancel
        //       </button>
        //       <button
        //         onClick={handleCreateDrive}
        //         className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-md hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
        //       >
        //         {isUpdate ? "Update" : "Cretae"} Drive
        //       </button>
        //     </div>
        //   </div>
        // </div>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
  <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900">Create New Drive</h2>
      <button
        onClick={handleClose}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Title *</label>
        <input
          type="text"
          className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter drive title"
          value={driveForm.driveName || ''}
          onChange={(e) => setDriveForm({ ...driveForm, driveName: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Description *</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Enter drive description"
          rows={3}
          value={driveForm.driveDescription || ''}
          onChange={(e) => setDriveForm({ ...driveForm, driveDescription: e.target.value })}
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
              className={`w-full flex items-center space-x-3 p-3 border text-black rounded-md transition-colors ${driveForm.driveType.toLowerCase() === type
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:bg-gray-50'
                }`}
              onClick={() => handleDriveTypeSelect(type)}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${driveForm.driveType.toLowerCase() === type
                ? 'border-blue-500'
                : 'border-gray-300'
                }`}>
                {driveForm.driveType.toLowerCase() === type && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <span className={`text-sm ${driveForm.driveType.toLowerCase() === type
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
      {driveForm.driveType.toLowerCase() === 'paid' && (
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
              className="w-full pl-8 pr-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
              value={driveForm.registrationFee || ''}
              onChange={(e) => handleFeeInputChange(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500">Enter the registration fee amount</p>
        </div>
      )}

      {/* Show info for invitation type */}
      {driveForm.driveType.toLowerCase() === 'invitation' && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-700">
            💌 Invitation-only drives require participants to have an invitation code to register.
          </p>
        </div>
      )}

      <div className="space-y-2">
                 <label className="block text-sm font-medium text-gray-700">Location *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter location"
                  value={driveForm.location || ''}
                  onChange={(e) => setDriveForm({ ...driveForm, location: e.target.value })}
                />
              </div>

      {/* Age Range Section */} 
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Participant&apos;s Min Age</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={driveForm.minAge || ''}
            onChange={(e) => setDriveForm({ ...driveForm, minAge: e.target.value })}
          >
            <option value="">Select Min Age</option>
            {Array.from({ length: 43 }, (_, i) => i + 18).map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Participant&apos;s Max Age</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={driveForm.maxAge || ''}
            onChange={(e) => setDriveForm({ ...driveForm, maxAge: e.target.value })}
          >
            <option value="">Select Max Age</option>
            {Array.from({ length: 43 }, (_, i) => i + 18).map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>
      </div>

      
{/* Location Dropdown */}
       <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Participant&apos;s Location</label>
        <div className="relative">
          <div
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer min-h-[40px] flex items-center"
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {driveForm.userLocation && driveForm.userLocation.length > 0 ? (
                driveForm.userLocation.map((item, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs flex items-center">
                    {item}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newLocation = driveForm.userLocation.filter((_, i) => i !== index);
                        setDriveForm({ ...driveForm, userLocation: newLocation });
                      }}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Select Location(s)</span>
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          
          {showLocationDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {cityOptions.map((locationOption) => (
                <div
                  key={locationOption}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => {
                    const currentLocation = driveForm.userLocation || [];
                    const isSelected = currentLocation.includes(locationOption);
                    
                    if (isSelected) {
                      const newLocation = currentLocation.filter(item => item !== locationOption);
                      setDriveForm({ ...driveForm, userLocation: newLocation });
                    } else {
                      setDriveForm({ ...driveForm, userLocation: [...currentLocation, locationOption] });
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={driveForm.userLocation?.includes(locationOption) || false}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <span className="text-black">{locationOption}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Religion Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Participant&apos;s Religion</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={driveForm.religion || ''}
          onChange={(e) => setDriveForm({ ...driveForm, religion: e.target.value })}
        >
          <option value="">Select Religion</option>
          {religionOptions.map((religion) => (
            <option key={religion} value={religion}>{religion}</option>
          ))}
        </select>
      </div>

      {/* Caste Multi-select */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Participant&apos;s Caste</label>
        <div className="relative">
          <div
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer min-h-[40px] flex items-center"
            onClick={() => setShowCasteDropdown(!showCasteDropdown)}
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {driveForm.caste && driveForm.caste.length > 0 ? (
                driveForm.caste.map((item, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs flex items-center">
                    {item}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newCaste = driveForm.caste.filter((_, i) => i !== index);
                        setDriveForm({ ...driveForm, caste: newCaste });
                      }}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Select Caste(s)</span>
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          
          {showCasteDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {casteOptions.map((casteOption) => (
                <div
                  key={casteOption}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => {
                    const currentCaste = driveForm.caste || [];
                    const isSelected = currentCaste.includes(casteOption);
                    
                    if (isSelected) {
                      const newCaste = currentCaste.filter(item => item !== casteOption);
                      setDriveForm({ ...driveForm, caste: newCaste });
                    } else {
                      setDriveForm({ ...driveForm, caste: [...currentCaste, casteOption] });
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={driveForm.caste?.includes(casteOption) || false}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <span className="text-black">{casteOption}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profession Multi-select */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Participant&apos;s Profession</label>
        <div className="relative">
          <div
            className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer min-h-[40px] flex items-center"
            onClick={() => setShowProfessionDropdown(!showProfessionDropdown)}
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {driveForm.profession && driveForm.profession.length > 0 ? (
                driveForm.profession.map((item, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs flex items-center">
                    {item}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newProfession = driveForm.profession.filter((_, i) => i !== index);
                        setDriveForm({ ...driveForm, profession: newProfession });
                      }}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Select Profession(s)</span>
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          
          {showProfessionDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {professionOptions.map((professionOption) => (
                <div
                  key={professionOption}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => {
                    const currentProfession = driveForm.profession || [];
                    const isSelected = currentProfession.includes(professionOption);
                    
                    if (isSelected) {
                      const newProfession = currentProfession.filter(item => item !== professionOption);
                      setDriveForm({ ...driveForm, profession: newProfession });
                    } else {
                      setDriveForm({ ...driveForm, profession: [...currentProfession, professionOption] });
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={driveForm.profession?.includes(professionOption) || false}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  <span className="text-black">{professionOption}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Date & Time *</label>
        <input
          type="datetime-local"
          className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formatDateForInput(driveForm.driveDate)}
          onChange={handleDateChange}
        />
      </div>
    </div>

    <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
      <button
        onClick={handleClose}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={handleCreateDrive}
        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-md hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        {isUpdate ? "Update" : "Create"} Drive
      </button>
    </div>
  </div>
</div>
      )}

      <DeleteConfirmationModal
        drive={driveToDelete}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => confirmDelete(driveToDelete.driveId)}
      />

      <ViewRegistrationsModal
        drive={drives.find(d => d.driveId === selectedDriveId)}
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedDriveId(null);
          setRegisteredUsers([]);
          setError(null);
        }}
        registeredUsers={registeredUsers}
        loading={loading}
        error={error}
      />

      {/* Custom Styles */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
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
 
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
 
        .transition-all {
          transition: all 0.3s ease;
        }
 
        .shadow-md {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
 
        .shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
 
        .bg-gradient-to-r {
          background-image: linear-gradient(to right, var(--tw-gradient-stops));
        }
 
        .bg-gradient-to-br {
          background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
        }
 
        .from-pink-50 {
          --tw-gradient-from: #fdf2f8;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(253, 242, 248, 0));
        }
 
        .via-purple-50 {
          --tw-gradient-to: rgba(250, 245, 255, 0);
          --tw-gradient-stops: var(--tw-gradient-from), #faf5ff, var(--tw-gradient-to);
        }
 
        .to-indigo-50 {
          --tw-gradient-to: #eef2ff;
        }
 
        .from-pink-500 {
          --tw-gradient-from: #ec4899;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(236, 72, 153, 0));
        }
 
        .to-purple-500 {
          --tw-gradient-to: #8b5cf6;
        }
 
        .from-pink-600 {
          --tw-gradient-from: #db2777;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(219, 39, 119, 0));
        }
 
        .to-purple-600 {
          --tw-gradient-to: #7c3aed;
        }
 
        .from-green-500 {
          --tw-gradient-from: #10b981;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(16, 185, 129, 0));
        }
 
        .to-green-600 {
          --tw-gradient-to: #059669;
        }
 
        .from-green-600 {
          --tw-gradient-from: #059669;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(5, 150, 105, 0));
        }
 
        .to-green-700 {
          --tw-gradient-to: #047857;
        }
 
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
 
        .text-transparent {
          color: transparent;
        }
 
        .sticky {
          position: sticky;
        }
 
        .top-0 {
          top: 0;
        }
 
        .top-16 {
          top: 4rem;
        }
 
        .z-40 {
          z-index: 40;
        }
 
        .z-50 {
          z-index: 50;
        }
 
        .max-h-\\[90vh\\] {
          max-height: 90vh;
        }
 
        .overflow-y-auto {
          overflow-y: auto;
        }
 
        .resize-none {
          resize: none;
        }
 
        .appearance-none {
          appearance: none;
        }
 
        .pointer-events-none {
          pointer-events: none;
        }
 
        .col-span-full {
          grid-column: 1 / -1;
        }
 
        .opacity-40 {
          opacity: 0.4;
        }
 
        .flex-shrink-0 {
          flex-shrink: 0;
        }
 
        .animate-spin {
          animation: spin 1s linear infinite;
        }
 
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default MatrimonyAdminDashboard;