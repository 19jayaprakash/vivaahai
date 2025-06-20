import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Upload, Edit, X, User, Check, RotateCcw, Loader2, Trash2, Image as ImageIcon, Star, StarOff, Eye } from 'lucide-react';
import { axiosPublic } from '../../base/constant';
import { toast } from 'react-toastify';
import Image from 'next/image';
 
const ProfileImageEditor = () => {
  const [profileImages, setProfileImages] = useState([]);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [showImageGallery, setShowImageGallery] = useState(true);
  const[isProfilePhotoUpload,setIsProfilePhotoUpload] = useState(false);
  const[selectedImage,setSelectedImage] = useState(null);
  const[isModalOpen,setIsModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
 
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
 
  // Simulate auth token (in real app, get from localStorage)
  const [authToken] = useState(localStorage.getItem('token') || '');
  const [profileUrl, setProfileUrl] = useState(null);
  const [imageUrls, setImageUrls] = useState({}); // Store multiple image URLs

  const openModal = async(e,image) => {
    e.preventDefault();
    setIsModalOpen(true);
    const picName = image.split("/");
         const folderName = picName[picName.length-2]
        const filename = picName[picName.length-1];
        const res = await axiosPublic.get(
          `/user/display-photo?filename=${folderName}/${filename}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            responseType: 'blob',
          }
        );
        const blobUrl = URL.createObjectURL(res.data);
    setSelectedImage(blobUrl);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const openDeleteModal = (image, e) => {
    e.stopPropagation(); // Prevent opening the image modal
    setImageToDelete(image);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setImageToDelete(null);
  };

   async function fetchImages() {
      try {
        await axiosPublic.get('/user/get-general-photos', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        .then(res =>{
          if(res.status == 200){
            setProfileImages(res.data.data || []);
          }
        })
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    }
 
  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(()=>{
      async function fetchProfileUrl(){
       await axiosPublic.get('/user/get-profile-pics', {
                     headers: {
                       Authorization: `Bearer ${localStorage.getItem('token')}`
                     }
                   })
                   .then(res =>{
                    if(res.status === 200){
                        if(res.data.data.length > 0){
                          const profileUrl = res.data.data[0];
                          if(profileUrl){
                            const picName = profileUrl.photoUrl.split("/");
                            axiosPublic.get(
                              `/user/display-photo?filename=ProfilePics/${picName[picName.length-1]}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${authToken}`,
                                },
                                responseType: 'blob',
                              }
                            ).then(res => {
                              const blobUrl = URL.createObjectURL(res.data);
                              setProfileUrl(blobUrl);
                            }).catch(err => {
                              console.error('Error fetching profile image:', err);
                            });
                          }
                        }
                    }
                   })
      }
      fetchProfileUrl();
  },[]);


 
  // Fetch individual image URLs for gallery
  const fetchImageUrl = async (image, index) => {
    try {
      if (image.dataUrl) {
        // For newly captured/uploaded images
        setImageUrls(prev => ({
          ...prev,
          [image.id || index]: image.dataUrl
        }));
      } else if (image.photoUrl) {
        // For existing images from server
         const picName = image.photoUrl.split("/");
         const folderName = picName[picName.length-2]
        const filename = picName[picName.length-1];
        const res = await axiosPublic.get(
          `/user/display-photo?filename=${folderName}/${filename}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            responseType: 'blob',
          }
        );
        const blobUrl = URL.createObjectURL(res.data);
        setImageUrls(prev => ({
          ...prev,
          [image.id || index]: blobUrl
        }));
      }
    } catch (error) {
      console.error('Failed to fetch image', error);
    }
  };
 
  // Fetch all image URLs when profileImages changes
  useEffect(() => {
    profileImages.forEach((image, index) => {
      fetchImageUrl(image, index);
    });
  }, [profileImages]);
 
  // Convert data URL to File object
  const dataURLToFile = (dataURL, filename) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
 
  // Upload multiple images in single API call
  const uploadMultipleImages = async (images) => {
    setIsUploading(true);
    const batchId = Date.now();
   
    try {
      // Update progress
      setUploadProgress(prev => ({ ...prev, [batchId]: 0 }));
     
      // Create FormData with all images
      const formData = new FormData();
      const filenames = [];
     
      // Add all images to FormData
      images.forEach((image, index) => {
        const imageFile = dataURLToFile(image.dataUrl, image.filename);
        formData.append('files', imageFile);
        filenames.push(image.filename);
      });
     
      // Add filenames array if needed
      formData.append('filenames', JSON.stringify(filenames));
      isProfilePhotoUpload && (formData.append("isProfilePhoto",true));
      isProfilePhotoUpload && formData.append("photoType","profile" );
 
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[batchId] || 0;
          if (currentProgress < 90) {
            return { ...prev, [batchId]: currentProgress + 10 };
          }
          return prev;
        });
      }, 200);
 
      const response = await fetch('https://stu.globalknowledgetech.com:9443/user/upload-photos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData
      });
 
      clearInterval(progressInterval);
 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
 
      const result = await response.json();
      console.log('Upload successful:', result);
     
      // Complete progress
      setUploadProgress(prev => ({ ...prev, [batchId]: 100 }));
     
      // Remove progress after delay
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[batchId];
          return newProgress;
        });
      }, 2000);
 
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
     
      return { success: true, result };
 
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[batchId];
        return newProgress;
      });
      alert('Upload failed: ' + error.message);
      throw error;
    } finally {
      setIsUploading(false);
      fetchImages();
    }
  };
 
  // Initialize camera
  const initializeCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
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
      alert('Unable to access camera. Please check permissions or try uploading a file instead.');
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
 
  // Confirm captured photo and upload
  const confirmCapturedPhoto = async () => {
    if (capturedImage) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `captured_photo_${timestamp}.jpg`;
      const newImage = {
        id: Date.now(),
        dataUrl: capturedImage,
        filename: filename,
        timestamp: new Date().toISOString()
      };
     
      setProfileImages(prev => [...prev, newImage]);
     
      // Upload to API
      await uploadMultipleImages([newImage]);
     
      stopCamera();
    }
  };
 
  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null);
    initializeCamera();
  };
 
  // Handle multiple file selection and upload
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const validImages = [];
   
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        const imageDataUrl = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
       
        validImages.push({
          id: Date.now() + Math.random(),
          dataUrl: imageDataUrl,
          filename: file.name,
          timestamp: new Date().toISOString()
        });
      }
    }
   
    if (validImages.length > 0) {
      setProfileImages(prev => [...prev, ...validImages]);
     
      // Upload all valid images
      await uploadMultipleImages(validImages);
    } else {
      alert('Please select valid image files.');
    }
   
    // Reset file input
    event.target.value = '';
  };
 
  // Remove image
  const removeImage = async(imageId) => {

    await axiosPublic.delete(`/user/delete-photo?filepath=${imageId}`,{headers:{
      Authorization : `Bearer ${localStorage.getItem("token")}`
    }})
    .then(res =>{
      if(res.status === 200){
        toast.success("Image deleted successfully");
        fetchImages();
      }
    })
    .catch(err =>{
      toast.error("Error while deleting photo. Please try again later.");
    })
    
  };
 
  // Set image as primary (move to index 0)
  const setPrimaryImage = (imageId) => {
    setProfileImages(prev => {
      const imageIndex = prev.findIndex(img => (img.id || img._id) === imageId);
      if (imageIndex > 0) {
        const imageToMove = prev[imageIndex];
        const newImages = [...prev];
        newImages.splice(imageIndex, 1);
        newImages.unshift(imageToMove);
        return newImages;
      }
      return prev;
    });
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
      // Clean up blob URLs
      Object.values(imageUrls).forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [stream, imageUrls]);

  const ImageModal = ({ image, isOpen, onClose }) => {
  if (!isOpen || !image) return null;

  // Handle click outside modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative max-w-4xl max-h-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-white bg-black/30 bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 z-10 transition-all duration-200"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="relative">
          <Image
            src={image}
            alt={image.title || 'Profile Image'}
            width={800}
            height={600}
            className="max-w-full max-h-[90vh] text-white object-contain rounded-lg"
            priority
          />
          
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ image, isOpen, onClose, onConfirm }) => {
  if (!isOpen || !image) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirmDelete = () => {
    onConfirm(image.id);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg
                className="w-10 h-10 text-red-500"
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
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Delete Photo
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Are you sure you want to delete?
              </p>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mb-6">
            This action cannot be undone. The photo will be permanently removed from your gallery.
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
            >
              Delete Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      {/* Upload Status */}
      {(isUploading || uploadSuccess) && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          uploadSuccess ? 'bg-green-500' : 'bg-blue-500'
        } text-white flex items-center space-x-2`}>
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Uploading images...</span>
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              <span>Images uploaded successfully!</span>
            </>
          )}
        </div>
      )}
 
      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="fixed top-16 right-4 z-50 space-y-2">
          {Object.entries(uploadProgress).map(([id, progress]) => (
            <div key={id} className="bg-white p-3 rounded-lg shadow-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                <span className="text-sm text-gray-700">Uploading... {progress}%</span>
              </div>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
 
      {/* Main Profile Image Circle - Shows 0th index image */}
      <div className="relative mx-auto w-48 h-48 mb-6">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-200 shadow-lg bg-gray-100 flex items-center justify-center">
          {profileUrl ? (
            <Image
              width={192}
              height={192}
              src={profileUrl}
              alt="Primary Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-20 h-20 text-gray-400" />
          )}
        </div>
       
        {/* Image counter badge */}
        {/* {profileImages.length > 1 && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
            +{profileImages.length - 1}
          </div>
        )}
        */}
        {/* Edit Button */}
        <button
          onClick={() => {setShowEditOptions(true);setIsProfilePhotoUpload(true);}}
          disabled={isUploading}
          className="absolute bottom-4 right-0 bg-gradient-to-r cursor-pointer from-pink-300 to-[#FF6B6B] text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Edit className="w-5 h-5" />
        </button>
      </div>
 
      {/* Horizontal Image Gallery */}
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm">
            <ImageIcon className="w-5 h-5 " />
            Profile Images ({profileImages.length})
          </h3>
          <button
            onClick={() => {setShowEditOptions(true);setIsProfilePhotoUpload(false)}}
            disabled={isUploading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
          >
            <Upload className="w-4 h-4" />
            Add Images
          </button>
        </div>
 
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          {profileImages.length === 0 ? (
            <div className="text-center py-8">
              <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-3">No images yet</p>
              <button
                onClick={() => setShowEditOptions(true)}
                className="bg-gradient-to-r from-pink-300 to-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 text-sm"
              >
                Add Your First Image
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto overflow-y-hidden  ">
              <div className="flex gap-3 pb-1" style={{ width: 'max-content' }}>
                {profileImages.map((image, index) => {
                  const imageId = image.id || image._id || index;
                  const imageUrl = imageUrls[imageId];
                  const isPrimary = index === 0;
 
                  return (
                    <div key={imageId} className="relative group flex-shrink-0 pb-0">
                      <div className={`relative w-30 h-30 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105`}>
                        {imageUrl ? (
                          <Image
                            width={150}
                            height={150}
                            src={imageUrl}
                            alt={`Profile ${index + 1}`}
                            className="w-full h-full object-cover"
                            onClick={() => setPrimaryImage(imageId)}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                          </div>
                        )}
                       
                        {/* Primary Badge */}
                        {/* {isPrimary && (
                          <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                            <Star className="w-2 h-2 fill-current" />
                          </div>
                        )}
  */}
                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black/30 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1">
                         
                            <button
                              onClick={(e) => openModal(e,image.photoUrl)}
                              className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 cursor-pointer transition-colors"
                              title="Set as primary"
                            >
                              <Eye className="w-3 h-3" />
                            </button>
                          
                          <button
                            onClick={(e) => openDeleteModal(image, e)}
                            className="bg-red-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
                            title="Delete image"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
       
        {/* Gallery Footer
        {profileImages.length > 0 && (
          <div className="mt-2 text-center text-xs text-gray-500">
            <p>Click on an image to set it as primary • Hover to see actions</p>
          </div>
        )} */}
      </div>
 
      {/* Edit Options Modal */}
      {showEditOptions && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add Images</h3>
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
                  <p className="font-medium text-gray-900">Choose Files</p>
                  <p className="text-sm text-gray-500">Upload multiple images</p>
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
                    width={500}
                    height={500}
                    src={capturedImage}
                    alt="Captured"
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
                      disabled={isUploading}
                      className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isUploading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <Check className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
 
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}
 
      {/* Hidden File Input - Multiple files */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple = {isProfilePhotoUpload ? false : true}
        onChange={handleFileChange}
        className="hidden"
      />

      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <DeleteConfirmationModal
        image={imageToDelete}
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => removeImage(imageToDelete?.photoUrl)}
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