import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Upload, Edit, X, User, Check, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-toastify';

const ProfileImageEditor = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize camera
  const initializeCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user' // Front camera for selfies
        }
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          setIsCameraReady(true);
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions or try uploading a file instead.');
    }
  };

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraReady(false);
    setShowCamera(false);
    setCapturedImage(null);
  }, [stream]);

  // Handle camera option click
  const handleCameraClick = () => {
    setShowEditOptions(false);
    setShowCamera(true);
    initializeCamera();
  };

  // Handle file upload option click
  const handleFileClick = () => {
    setShowEditOptions(false);
    fileInputRef.current?.click();
  };

  // Capture photo from camera
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageDataUrl);
    }
  };

  // Confirm captured photo
  const confirmCapturedPhoto = () => {
    if (capturedImage) {
      setProfileImage(capturedImage);
      stopCamera();
    }
  };

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null);
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please select a valid image file.');
      }
    }
  };

  // Close edit options when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowEditOptions(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="flex flex-col items-center space-y-6 p-8">

        {/* Profile Image Display */}
        <div className="relative mx-auto w-48 h-48 mb-6">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-200 shadow-lg bg-gray-100 flex items-center justify-center">
            {profileImage ? (
              <Image
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
                unoptimized
                width={200}
                height={250}
              />
            ) : (
              <User className="w-20 h-20 text-gray-400" />
            )}
          </div>
          
          {/* Edit Button */}
          <button
            onClick={() => setShowEditOptions(true)}
            className="absolute bottom-4 right-0 bg-gradient-to-r cursor-pointer  from-pink-300 to-[#FF6B6B] text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>

        
      {/* Edit Options Modal */}
      {showEditOptions && (
        <div 
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Choose Option</h3>
              <button
                onClick={() => setShowEditOptions(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCameraClick}
                className="w-full flex items-center space-x-4 p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
              >
                <div className="p-2 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                  <Camera className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Take Photo</p>
                  <p className="text-sm text-gray-500">Use your camera</p>
                </div>
              </button>

              <button
                onClick={handleFileClick}
                className="w-full flex items-center space-x-4 p-4 rounded-xl border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 group"
              >
                <div className="p-2 bg-pink-100 rounded-full group-hover:bg-pink-200 transition-colors">
                  <Upload className="w-6 h-6 text-pink-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Choose File</p>
                  <p className="text-sm text-gray-500">Upload from device</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl animate-slideUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Take Photo</h3>
              <button
                onClick={stopCamera}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="relative">
              {!capturedImage ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-80 object-cover rounded-xl bg-gray-900"
                  />
                  
                  {!isCameraReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-xl">
                      <div className="text-white text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                        <p>Loading camera...</p>
                      </div>
                    </div>
                  )}

                  {/* Camera Controls */}
                  {isCameraReady && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <button
                        onClick={capturePhoto}
                        className="bg-white text-gray-900 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
                      >
                        <Camera className="w-8 h-8" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <Image
                    
                    src={capturedImage}
                    alt="Captured"
                    width={400}
                    height={600}
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  
                  {/* Preview Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <button
                      onClick={retakePhoto}
                      className="bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
                    >
                      <RotateCcw className="w-6 h-6" />
                    </button>
                    <button
                      onClick={confirmCapturedPhoto}
                      className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <style jsx>{`
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
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

export default ProfileImageEditor;