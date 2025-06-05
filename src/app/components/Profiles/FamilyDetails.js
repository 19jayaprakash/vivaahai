"use client"
import { useState, useEffect } from 'react';
import { CheckCircle, ChevronRight, ChevronsRight, Home, Trash2, Users } from 'lucide-react';
import { axiosPublic } from '../../base/constant';
import { useRouter } from 'next/navigation';

const FormSection = ({ title, icon, children }) => (
  <div className="w-full bg-white rounded-xl p-6 mb-6 shadow-lg border border-gray-100">
    <div className="flex items-center mb-6">
      <div className="bg-[#FF6B6B] rounded-full p-3 mr-4">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-[#FF6B6B]">{title}</h2>
    </div>
    {children}
  </div>
);

const FormField = ({ label, children, error }) => (
  <div className="mb-6">
    <label className="block text-[#FF6B6B] mb-2 font-medium">{label}</label>
    {children}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const CustomInput = ({ value, onChange, placeholder, type = 'text' }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 outline-none transition-all text-black"
  />
);

const CustomSelect = ({ value, onChange, options, placeholder }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 outline-none transition-all text-black"
  >
    <option value="" disabled>{placeholder}</option>
    {options.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
  </select>
);

const RadioGroup = ({ name, value, onChange, options }) => (
  <div className="flex flex-wrap gap-6">
    {options.map((option) => (
      <label key={option} className="flex items-center cursor-pointer">
        <input
          type="radio"
          name={name}
          value={option}
          checked={value === option}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
        />
        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
          value === option 
            ? 'border-[#FF6B6B] bg-[#FF6B6B]' 
            : 'border-gray-300'
        }`}>
          {value === option && (
            <div className="w-2 h-2 rounded-full bg-white"></div>
          )}
        </div>
        <span className="text-gray-700">{option}</span>
      </label>
    ))}
  </div>
);

const MatrimonialProfile = ({ isEdit = false,nextStep }) => {
  const [isEditMode] = useState(isEdit);
  const router = useRouter();
  
  // State for form fields
  const [formData, setFormData] = useState({
    familyType: '',
    familyValues: '',
    parentsOccupations: '',
    otherParentsOccupation: ''
  });
  
  const [siblingData, setSiblingData] = useState({
    sibilings: '',
    sibilingsgender: '',
    sibilingstype: '',
    SibilingMaritalsts: '',
    SibilingsOccupations: '',
    OtherSibilingsOccupations: ''
  });
  
  const [siblingsList, setSiblingsList] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const[loading, setLoading] = useState(false);
  
  // Dropdown options
  const [familyType, setFamilyType] = useState([]);
  const [familyValues, setFamilyValues] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [occupation, setOccupation] = useState([]);

  // Get token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Fetch existing family details for edit mode
  const fetchFamilyDetails = async () => {
    if (!isEditMode) return;
    
    setIsLoading(true);
    try {
      const token = getAuthToken();
      const response = await axiosPublic.get('/family/family-details', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const result = response.data;
      console.log('Fetched family details:', result);
      
      if (result) {
        const familyData = result;
        
        // Populate form data
        setFormData({
          familyType: familyData.familyType || '',
          familyValues: familyData.familyValues || '',
          parentsOccupations: familyData.parentsOccupations || '',
          otherParentsOccupation: familyData.otherParentsOccupation || ''
        });
        
        // Populate siblings list if exists
        if (familyData.sibilings && familyData.sibilings.length > 0) {
          setSiblingsList(familyData.sibilings);
          setSiblingData(prev => ({
            ...prev,
            sibilings: 'Yes'
          }));
        } else {
          setSiblingData(prev => ({
            ...prev,
            sibilings: 'No'
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching family details:', error);
      alert('Error fetching family details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch utility data
  const fetchUtilData = async (utilHead, setStateFn) => {
    try {
      const response = await axiosPublic.get(`/utility/utilHead?utilHead=${utilHead}`);
      const data = response.data;
      if (data) setStateFn(data.data);
    } catch (err) {
      console.error(`Error fetching ${utilHead}:`, err);
    }
  };

  // Initial setup
  useEffect(() => {
    // Fetch dropdown data
    fetchUtilData('family_type', setFamilyType);
    fetchUtilData('family_values', setFamilyValues);
    fetchUtilData('occupation', setOccupation);
    fetchUtilData('sibling_marital_status', setMaritalStatus);
    
    // Fetch existing data if in edit mode
    if (isEditMode) {
      fetchFamilyDetails();
    }
  }, [isEditMode]);

  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData(prev => {
      const newFormData = {
        ...prev,
        [field]: value,
      };
      console.log('New formData:', newFormData);
      return newFormData;
    });
  };

  const handleSiblingChange = (field, value) => {
    setSiblingData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add sibling to list
  const addSibling = () => {
    const newSibling = {
      gender: siblingData.sibilingsgender,
      type: siblingData.sibilingstype,
      maritalStatus: siblingData.SibilingMaritalsts,
      occupation: siblingData.SibilingsOccupations === 'Others'
        ? siblingData.OtherSibilingsOccupations
        : siblingData.SibilingsOccupations,
    };

    const isSiblingEmpty = !newSibling.gender || !newSibling.type || 
                          !newSibling.maritalStatus || !newSibling.occupation;

    if (!isSiblingEmpty) {
      console.log(newSibling);
      setSiblingsList(prev => [...prev, newSibling]);
      
      // Clear form after adding
      setSiblingData(prev => ({
        ...prev,
        sibilingsgender: '',
        sibilingstype: '',
        SibilingMaritalsts: '',
        SibilingsOccupations: '',
        OtherSibilingsOccupations: ''
      }));
    } else {
      console.log("Sibling data is empty");
      alert("Please fill all sibling details before adding.");
    }
  };

  const deleteSibling = (indexToDelete) => {
    setSiblingsList(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  // Form submission handler (Create or Update)
  const handleSubmit = async () => {
    const submitData = { ...formData, sibilings: siblingsList };
    console.log('Profile data:', submitData);
    setLoading(true)
    
    try {
      const token = getAuthToken();
      
      // Determine API endpoint based on mode
      const url = isEditMode
        ? '/family/update-family-details' // Update endpoint
        : '/family/family-details'; // Create endpoint
      
      const response = await axiosPublic.post(url, submitData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      const result = response;
      console.log('Response:', result);
      
      // Show success message based on mode
      if (isEditMode) {
        router.back();
        // Navigate back or show success message
      } else {
         nextStep();
        // Navigate to next step - you can implement routing here
        // Example: router.push('/profile/UserInterest');
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving family details. Please try again.');
    }
    finally{
        setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B6B] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading family details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
    

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Family & Status Section */}
        <FormSection title="Family & Status" icon={<Home size={24} color="#FFFFFF" />}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField label="Family Type" error={errors.familyType}>
              <CustomSelect
                value={formData.familyType}
                onChange={(value) => handleChange('familyType', value)}
                options={familyType}
                placeholder="Select family type"
              />
            </FormField>

            <FormField label="Family Values" error={errors.familyValues}>
              <CustomSelect
                value={formData.familyValues}
                onChange={(value) => handleChange('familyValues', value)}
                options={familyValues}
                placeholder="Select family values"
              />
            </FormField>
          </div>

          <FormField label="Parent's Occupations" error={errors.parentsOccupations}>
            <CustomSelect
              value={formData.parentsOccupations}
              onChange={(value) => handleChange('parentsOccupations', value)}
              options={occupation}
              placeholder="Select parent's occupation"
            />
            
            {formData.parentsOccupations === 'Others' && (
              <div className="mt-4">
                <CustomInput
                  placeholder="Please specify other occupation"
                  value={formData.otherParentsOccupation}
                  onChange={(value) => handleChange('otherParentsOccupation', value)}
                />
                {formData.parentsOccupations === 'Others' && errors.otherParentsOccupation && (
                  <p className="text-red-500 text-sm mt-1">{errors.otherParentsOccupation}</p>
                )}
              </div>
            )}
          </FormField>

          {/* Display Added Siblings */}
          {siblingsList.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-4 text-[#FF6B6B]">Added Siblings:</h3>
              <div className="space-y-3">
                {siblingsList.map((sibling, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className={`w-4 h-4 rounded-full mr-2 ${
                          sibling.gender === 'Brother' ? 'bg-blue-500' : 'bg-pink-500'
                        }`}></div>
                        <span className="font-semibold text-gray-800">
                          {sibling.gender} ({sibling.type})
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Marital Status:</span> {sibling.maritalStatus}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Occupation:</span> {sibling.occupation}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteSibling(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sibling Information Form */}
          <FormField label="Sibling's Information">
            <div className="space-y-6">
              <div>
                <p className="mb-3 font-medium text-gray-700">Do you have siblings?</p>
                <RadioGroup
                  name="hasSiblings"
                  value={siblingData.sibilings}
                  onChange={(value) => handleSiblingChange('sibilings', value)}
                  options={['Yes', 'No']}
                />
              </div>

              {siblingData.sibilings === 'Yes' && (
                <div className="space-y-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="mb-3 font-medium text-[#FF6B6B]">Sibling&apos;s Gender</p>
                    <RadioGroup
                      name="siblingGender"
                      value={siblingData.sibilingsgender}
                      onChange={(value) => handleSiblingChange('sibilingsgender', value)}
                      options={['Brother', 'Sister']}
                    />
                  </div>

                  <div>
                    <p className="mb-3 font-medium text-[#FF6B6B]">Sibling&apos;s Type</p>
                    <RadioGroup
                      name="siblingType"
                      value={siblingData.sibilingstype}
                      onChange={(value) => handleSiblingChange('sibilingstype', value)}
                      options={['Elder Sibling', 'Younger Sibling']}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Sibling's Marital Status">
                      <CustomSelect
                        value={siblingData.SibilingMaritalsts}
                        onChange={(value) => handleSiblingChange('SibilingMaritalsts', value)}
                        options={maritalStatus}
                        placeholder="Select marital status"
                      />
                    </FormField>

                    <FormField label="Sibling's Occupation">
                      <CustomSelect
                        value={siblingData.SibilingsOccupations}
                        onChange={(value) => handleSiblingChange('SibilingsOccupations', value)}
                        options={occupation}
                        placeholder="Select occupation"
                      />
                    </FormField>
                  </div>

                  {siblingData.SibilingsOccupations === 'Others' && (
                    <FormField label="Specify Other Occupation">
                      <CustomInput
                        placeholder="Please specify occupation"
                        value={siblingData.OtherSibilingsOccupations}
                        onChange={(value) => handleSiblingChange('OtherSibilingsOccupations', value)}
                      />
                    </FormField>
                  )}

                  <button
                    onClick={addSibling}
                    className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <Users size={20} />
                    Add Sibling
                  </button>
                </div>
              )}
            </div>
          </FormField>
        </FormSection>

        {/* Submit Button */}
        <div className="flex justify-center pt-8">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="group relative px-12 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-full text-black font-bold text-lg shadow-2xl hover:shadow-[#FF6B6B]/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center space-x-3">
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saving Profile...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    
                    <span>{isEditMode ? 'Update Family Details' : 'Save & Continue'}</span>
                    <ChevronsRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
      </div>
    </div>
  );
};

export default MatrimonialProfile;