'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosPublic } from '../../base/constant';
import { ArrowLeft } from 'lucide-react';

const DriveRegistrationPage = () => {
  const [loading, setLoading] = useState(false);

  const [driveData,setDriveData] = useState({});

  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem("driveData"));
        if(storedData){
            setDriveData(storedData);
        }
  },[]);

  // Mock API functions - replace with your actual API calls
  const callPaymentGateway = async (driveId, amount) => {
    // Replace with your payment gateway integration
    console.log(`Calling payment gateway for drive ${driveId} with amount ${amount}`);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, transactionId: 'TXN123' }), 2000);
    });
  };

  const callRegisterApi = async (driveId) => {
    // Replace with your register API call
    console.log(`Registering for free drive ${driveId}`);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, registrationId: 'REG123' }), 1500);
    });
  };

  const callRequestInvitationApi = async (driveId) => {
    // Replace with your request invitation API call
    console.log(`Requesting invitation for drive ${driveId}`);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, requestId: 'INV123' }), 1500);
    });
  };

  const handleSubmit = async () => {
    if (!driveData) {
      toast.error('Drive information not available');
      return;
    }

    setLoading(true);

    const json = JSON.stringify({
        driveId : driveData.driveId,
        registrationDate : new Date(),
        // paymentStatus : "paid",
        // paymentMode : "UPI"
        
    })

    axiosPublic.post(`/drive/drive-registration`,json,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(res=>{
        if(res.status === 201){
            toast.success("Drive registered successfully");
        }
    })
    .catch(err =>{
        console.log(err);
    })
    .finally(setLoading(false));


    

    // try {
    //   let result;
      
    //   switch (driveData.driveType?.toLowerCase()) {
    //     case 'paid':
    //       result = await callPaymentGateway(driveData.id, driveData.registrationFee);
    //       if (result.success) {
    //         toast.success(`Payment completed successfully! Transaction ID: ${result.transactionId}`);
    //       }
    //       break;

    //     case 'free':
    //       result = await callRegisterApi(driveData.id);
    //       if (result.success) {
    //         toast.success(`You have been registered for this drive! Registration ID: ${result.registrationId}`);
    //       }
    //       break;

    //     case 'invitation':
    //       result = await callRequestInvitationApi(driveData.id);
    //       if (result.success) {
    //         toast.success(`Your invitation request has been submitted! Request ID: ${result.requestId}`);
    //       }
    //       break;

    //     default:
    //       toast.warning('Invalid drive type');
    //       return;
    //   }

    //   if (!result.success) {
    //     toast.error('Operation failed. Please try again.');
    //   }
    // } catch (error) {
    //   toast.info('Something went wrong. Please try again.');
    // } finally {
    //   setLoading(false);
    // }
  };

  const getButtonText = () => {
    if (!driveData?.driveType) return 'Submit';
    
    switch (driveData.driveType.toLowerCase()) {
      case 'paid':
        return `Pay ₹${driveData.registrationFee || 0}`;
      case 'free':
        return 'Register Now';
      case 'invitation':
        return 'Request Invitation';
      default:
        return 'Submit';
    }
  };

  const getButtonColor = () => {
    if (!driveData?.driveType) return 'bg-blue-500 hover:bg-blue-600';
    
    switch (driveData.driveType.toLowerCase()) {
      case 'paid':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'free':
        return 'bg-green-500 hover:bg-green-600';
      case 'invitation':
        return 'bg-purple-500 hover:bg-purple-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  const getBadgeColor = () => {
    if (!driveData?.driveType) return 'bg-blue-500';
    
    switch (driveData.driveType.toLowerCase()) {
      case 'paid':
        return 'bg-orange-500';
      case 'free':
        return 'bg-green-500';
      case 'invitation':
        return 'bg-purple-500';
      default:
        return 'bg-blue-500';
    }
  };

  const handleBack = () =>{
    localStorage.removeItem("driveData");
    window.history.back();
  }

  if (!driveData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600 text-lg text-center">Drive information not available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-5 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {driveData.driveName || 'Drive Registration'}
          </h1>
          <div className={`inline-flex px-3 py-1.5 rounded-full ${getBadgeColor()}`}>
            <span className="text-white text-xs font-semibold tracking-wide">
              {driveData.driveType?.toUpperCase() || 'UNKNOWN'}
            </span>
          </div>
        </div>

        {/* Drive Information Card */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Drive Information</h2>
          
          {driveData.driveDescription && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-600 mb-1">Description:</p>
              <p className="text-base text-gray-900 leading-relaxed">{driveData.driveDescription}</p>
            </div>
          )}

          {driveData.driveDate && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-600 mb-1">Date:</p>
              <p className="text-base text-gray-900">{new Date(driveData.driveDate).toLocaleString()}</p>
            </div>
          )}

          {driveData.location && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-600 mb-1">Location:</p>
              <p className="text-base text-gray-900">{driveData.location}</p>
            </div>
          )}

          {/* {driveData.duration && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-600 mb-1">Duration:</p>
              <p className="text-base text-gray-900">{driveData.duration}</p>
            </div>
          )} */}

          {driveData.driveType?.toLowerCase() === 'paid' && driveData.registrationFee && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-600 mb-1">Amount:</p>
              <p className="text-lg font-semibold text-orange-500">₹{driveData.registrationFee}</p>
            </div>
          )}

          {/* {drive.maxParticipants && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-600 mb-1">Max Participants:</p>
              <p className="text-base text-gray-900">{drive.maxParticipants}</p>
            </div>
          )} */}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-4 px-6 rounded-xl text-white text-lg font-semibold 
            ${getButtonColor()} 
            disabled:opacity-50 disabled:cursor-not-allowed 
            transform transition-all duration-200 active:scale-[0.98] 
            shadow-lg hover:shadow-xl mb-4`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            getButtonText()
          )}
        </button>

        {/* Invitation Note */}
        {driveData.driveType?.toLowerCase() === 'invited' && (
          <p className="text-sm text-gray-600 text-center italic leading-relaxed">
            Note: Your request will be reviewed by the organizer. You&apos;ll be notified once approved.
          </p>
        )}
      </div>
    </div>
  );
};

// Example usage component with sample data
const DriveRegistrationDemo = () => {
  const sampleDrive = {
    id: '123',
    title: 'Mountain Hiking Adventure',
    type: 'paid',
    amount: 0,
    description: 'Join us for an exciting mountain hiking adventure through the Western Ghats. Experience breathtaking views and challenging trails.',
    date: 'December 15, 2024',
    location: 'Coorg, Karnataka',
    duration: '2 Days, 1 Night',
    organizer: 'Adventure Seekers Club',
    maxParticipants: '25 people'
  };

  return <DriveRegistrationPage />;
};

export default DriveRegistrationDemo;