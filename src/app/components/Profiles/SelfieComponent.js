import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';
import { axiosPublic } from '../../base/constant';
import { toast } from 'react-toastify';
import Image from 'next/image';

const AadharInformation = ({ selfieStatus,onChange }) => {
  const [captureMethod, setCaptureMethod] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const[selfieImage,setSelfieImage] = useState(null);

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode:"user",width: { ideal: 1280 },
          height: { ideal: 720 } } // Use back camera if available
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
        const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
        // handleFileSelection(file);
        const imageUrl = URL.createObjectURL(blob);
        setSelfieImage(file);
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
    };
    reader.readAsDataURL(file);

    // Store file in form data
    // handleChange('aadharDocument', file);
    setCaptureMethod('uploaded');
  };

  const removeDocument = () => {
    setPreviewImage(null);
    setCaptureMethod('');
    // handleChange('aadharDocument', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };


  const handleSubmit = async() => {

    const formData = new FormData();
    formData.append("files",selfieImage);
    formData.append("filenames", ["selfie.jpg"]);
    formData.append("photoType","selfie");
        await axiosPublic.post(`/user/upload-photos`,formData,{headers:{
            "Authorization" : `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data"
        }})
        .then((res) => {
            console.log(res.data);
            toast.success("Selfie uploaded successfully");
            onChange(true);
        })
        .catch(err =>{
            toast.error("Failed to upload selfie. Please try again.");
            console.error(err);
        })
  }

  return (
    <div className="space-y-6 bg-gray-100 backdrop-blur-sm border border-[#FF6B6B]/30 rounded-2xl p-6 hover:border-[#FF6B6B]/50 transition-all duration-300">
      <h3 className="text-2xl font-bold text-[#FF6B6B] mb-4">Take Your Selfie</h3>
      

      {/* Document Upload/Capture Section */}
      <div>
        
        
        {!previewImage && !isCapturing && (
          <div className="border-2 border-dashed border-[#FF6B6B]/30 rounded-lg p-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
              Take a clear selfie for identity verification. Make sure your face is well-lit and clearly visible.
            </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                
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
           <div className="relative overflow-hidden rounded-lg border-2 border-[#FF6B6B]/30">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-auto transform scale-x-[-1]" // Mirror effect for front camera
                style={{ maxHeight: '400px' }}
              />
              
              {/* Camera overlay guide */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-white/50 rounded-full"></div>
              </div>
            </div>
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
            <Image
              src={previewImage}
                width={500}
                height={500}
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

        {previewImage && !selfieStatus &&(
            <div className='mt-4 flex justify-center'>
            <button
              type="button" 
              onClick={handleSubmit}
              className="p-2 cursor-pointer bg-[#FF6B6B] text-white rounded-full hover:bg-[#c94646] transition-colors duration-300"
            >
              Submit Selfie
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

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-blue-800 mb-2">Tips for a good selfie:</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Ensure good lighting on your face</li>
          <li>• Look directly at the camera</li>
          <li>• Keep your face within the oval guide</li>
          <li>• Remove any accessories that cover your face</li>
          <li>• Make sure the image is clear and not blurry</li>
        </ul>
      </div>

    </div>
  );
};

export default AadharInformation;