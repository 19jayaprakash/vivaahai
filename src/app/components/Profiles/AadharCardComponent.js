import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';
import { axiosPublic } from '../../base/constant';
import { toast } from 'react-toastify';

const AadharInformation = ({ aadharStatus,onChange }) => {
  const [captureMethod, setCaptureMethod] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const[aadharImage,setAadharImage]= useState(null);

  const[aadharNumber,setAadharNumber] = useState("");
  const[isAadharSubmitted,setIsAadharSubmitted] = useState(false);

  const handleAadharChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Format as XXXX XXXX XXXX
    if (value.length > 0) {
      value = value.match(/.{1,4}/g)?.join(' ') || value;
    }
    
    // Limit to 14 characters (12 digits + 2 spaces)
    if (value.length <= 14) {
      setAadharNumber(value);
    }
  };

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera if available
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
      setIsCapturing(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'aadhar-photo.jpg', { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        setAadharImage(file);
        setPreviewImage(imageUrl);
         setCaptureMethod('uploaded');
        stopCamera();
      }, 'image/jpeg', 0.8);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleFileSelection = (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
      setAadharImage(file);
    };
    
    reader.readAsDataURL(file);
    setCaptureMethod('uploaded');
  };

  const removeDocument = () => {
    setPreviewImage(null);
    setCaptureMethod('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isAadharValid = aadharNumber && aadharNumber.replace(/\s/g, '').length === 12;

   const handleSubmit = async() => {
  
      const formData = new FormData();
      formData.append("files",aadharImage);
      formData.append("filenames", ["aadhar-photo.jpg"]);
      formData.append("photoType","aadhar");
      formData.append("aadharNumber", aadharNumber.replace(/\s/g, ''));
          await axiosPublic.post(`/user/upload-photos`,formData,{headers:{
              "Authorization" : `Bearer ${localStorage.getItem('token')}`,
              "Content-Type": "multipart/form-data"
          }})
          .then((res) => {
              console.log(res.data);
              toast.success("Aadhar document uploaded successfully");
              onChange(true);
          });
    }

  return (
    <div className="space-y-6 bg-gray-100 backdrop-blur-sm border border-[#FF6B6B]/30 rounded-2xl p-6 hover:border-[#FF6B6B]/50 transition-all duration-300">
      <h3 className=" text-[#FF6B6B] text-2xl font-bold mb-4">Aadhar Information</h3>
      
      {/* Aadhar Number Input */}
      <div>
        <label className="block text-sm font-medium text-[#FF6B6B] mb-2">
          Aadhar Number *
        </label>
        <input
          type="text"
          value={aadharNumber}
          onChange={handleAadharChange}
          placeholder="1234 5678 9012"
          className="w-full px-4 py-3 border border-[#FF6B6B]/30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300"
          maxLength={14}
        />
        {aadharNumber && !isAadharValid && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid 12-digit Aadhar number</p>
        )}
        {isAadharValid && (
          <p className="text-green-500 text-sm mt-1 flex items-center">
            <Check className="w-4 h-4 mr-1" />
            Valid Aadhar number
          </p>
        )}
      </div>

      {/* Document Upload/Capture Section */}
      <div>
        <label className="block text-sm font-medium text-[#FF6B6B] mb-2">
          Aadhar Document *
        </label>
        
        {!previewImage && !isCapturing && (
          <div className="border-2 border-dashed border-[#FF6B6B]/30 rounded-lg p-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Upload Aadhar document or take a photo</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center px-4 py-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#FF6B6B]/90 transition-colors duration-300"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </button>
                <button
                  type="button"
                  onClick={startCamera}
                  className="flex items-center justify-center px-4 py-2 border border-[#FF6B6B] text-[#FF6B6B] rounded-lg hover:bg-[#FF6B6B]/10 transition-colors duration-300"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Camera View */}
        {isCapturing && (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
              style={{ maxHeight: '400px' }}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
              <button
                type="button"
                onClick={capturePhoto}
                className="px-6 py-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#FF6B6B]/90 transition-colors duration-300"
              >
                Capture
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Preview Image */}
        {previewImage && (
          <div className="relative">
            <img
              src={previewImage}
              alt="Aadhar document preview"
              className="w-full max-h-64 object-contain rounded-lg border border-[#FF6B6B]/30"
            />
            <button
              type="button"
              onClick={removeDocument}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mt-2 text-sm text-green-600 flex items-center">
              <Check className="w-4 h-4 mr-1" />
              Document {captureMethod === 'uploaded' ? 'uploaded' : 'captured'} successfully
            </div>
          </div>
        )}
        {previewImage && aadharNumber.length===14 && !aadharStatus &&(
            <div className='mt-4 flex justify-center'>
            <button
              type="button" 
              onClick={handleSubmit}
              className="p-2 cursor-pointer bg-[#FF6B6B] text-white rounded-full hover:bg-[#c94646] transition-colors duration-300"
            >
              Submit Aadhar Information
            </button>
            </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Validation Message */}
      {(!isAadharValid || !previewImage) && (
        <p className="text-gray-600 text-sm">
          Please provide both a valid Aadhar number and upload/capture the document to proceed.
        </p>
      )}
    </div>
  );
};

export default AadharInformation;