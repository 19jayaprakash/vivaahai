import React, { useState, useRef } from 'react';
import { X, Camera, Upload, Check, Clock, AlertCircle, Eye } from 'lucide-react';

export default function ProfileVerificationModal({ isOpen, onClose, verificationData }) {
  const [activeTab, setActiveTab] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  if (!isOpen) return null;

  const { data } = verificationData || {};
  
  // Verification items configuration
  const verificationItems = [   
    {
      id: 'aadhar',
      title: 'Aadhar Card',
      uploaded: data.aadharUploaded,
      verified: data.aadharVerified,
      url: data.aadharUrl,
      type: 'image',
      allowCamera: true,
      status: data.aadharVerified ? 'verified' : data.aadharUploaded ? 'pending' : 'upload'
    },
    {
      id: 'selfie',
      title: 'Selfie',
      uploaded: data.selfieUploaded,
      verified: data.selfieVerified,
      url: data.selfieUrl,
      type: 'image',
      allowCamera: true,
      status: data.selfieVerified ? 'verified' : data.selfieUploaded ? 'pending' : 'upload'
    },
    {
      id: 'mobile',
      title: 'Mobile Number',
      uploaded: data.mobileUploaded,
      verified: data.mobileVerified,
      url: null,
      type: 'verification',
      allowCamera: false,
      status: data.mobileVerified ? 'verified' : 'pending'
    },
    {
      id: 'education',
      title: 'College Certificate',
      uploaded: data.educationUploaded,
      verified: data.educationVerified,
      url: data.educationCertUrl,
      type: 'document',
      allowCamera: false,
      status: data.educationVerified ? 'verified' : data.educationUploaded ? 'pending' : 'upload'
    },
    {
      id: 'salary',
      title: 'Salary Certificate',
      uploaded: data.salaryUploaded,
      verified: data.salaryVerified,
      url: data.salarySlipUrl,
      type: 'document',
      allowCamera: false,
      status: data.salaryVerified ? 'verified' : data.salaryUploaded ? 'pending' : 'upload'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 border-green-200';
      case 'pending':
        return 'bg-yellow-100 border-yellow-200';
      default:
        return 'bg-red-100 border-red-200';
    }
  };

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
      // Here you would typically upload the file to your server
      console.log(`Uploading ${type}:`, file);
    }
  };

  const handleCameraCapture = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
      // Here you would typically upload the captured image to your server
      console.log(`Camera capture ${type}:`, file);
    }
  };

  const openPreview = (url) => {
    setPreviewImage(url);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out scale-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-0 cursor-pointer right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6 hover:text-black" />
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Profile Verification</h2>
                <p className="text-blue-100">Complete your verification to unlock full features</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{verificationData.verificationCompletion}</div>
                <div className="text-sm text-blue-100">Complete</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 bg-white bg-opacity-20 rounded-full h-2">
              <div 
                className="bg-green-500 rounded-full h-2 transition-all duration-500 ease-out"
                style={{ width: verificationData.verificationCompletion }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {verificationItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${getStatusColor(item.status)}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    {getStatusIcon(item.status)}
                  </div>

                  {/* Mobile Number Special Case */}
                  {item.id === 'mobile' && (
                    <div className="text-center py-4">
                      <div className="text-sm text-gray-600 mb-2">Mobile Number</div>
                      <div className="font-mono text-black text-lg">{data.UserRegistration.phoneNo}</div>
                      {item.verified && (
                        <div className="text-xs text-green-600 mt-1">Verified</div>
                      )}
                    </div>
                  )}

                  {/* Image/Document Display */}
                  {/* {item.id !== 'mobile' && (
                    <>
                      {item.uploaded && item.url && (
                        <div className="relative group">
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-32 object-cover rounded-lg cursor-pointer"
                            onClick={() => openPreview(item.url)}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                            <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </div>
                        </div>
                      ) }
                    </>
                  )} */}

                  {/* Status Text */}
                  <div className="mt-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      item.status === 'verified' ? 'bg-green-200 text-green-800' :
                      item.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {item.status === 'verified' ? 'Verified' :
                       item.status === 'pending' ? 'Under Review' :
                       'Not Uploaded'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-60 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closePreview}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};


