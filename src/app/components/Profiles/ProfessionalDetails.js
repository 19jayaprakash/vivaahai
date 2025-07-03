// import { useRouter, useSearchParams } from 'next/navigation';
// import { GraduationCap, ChevronRight, Briefcase, Building2, DollarSign, User, ChevronsRight, CheckCircle } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { axiosPublic } from '../../base/constant';
// import { toast } from 'react-toastify';
 
 
// // Form Field Component with modern styling - FIXED
// const FormField = ({ label, icon: Icon, children, required = false }) => (
//   <div className="relative group">
//     {/* Label moved above the input field */}
//     {label && (
//       <label className="block text-[#FF6B6B] text-sm font-medium mb-2">
//         {label}
//         {required && <span className="text-[#FF6B6B] ml-1">*</span>}
//       </label>
//     )}
//     <div className="relative">
//       {/* Icon positioned properly */}
//       {Icon && (
//         <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/60 w-5 h-5 group-focus-within:text-[#FF6B6B] transition-colors z-10 pointer-events-none" />
//       )}
//       {children}
//     </div>
//   </div>
// );
 
// // Custom Input Component with glassmorphism styling - FIXED
// const CustomInput = ({ value, onChange, placeholder, type = 'text', hasIcon = false }) => (
//   <input
//     type={type}
//     className={`w-full bg-white/10 border border-[#FF6B6B] rounded-xl py-4 ${hasIcon ? 'pl-12 pr-4' : 'px-4'} text-black placeholder-black focus:outline-none focus:border-[#FF6B6B] focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15`}
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     placeholder={placeholder}
//   />
// );
 
// // Custom Select Component with glassmorphism styling - FIXED
// const CustomSelect = ({ value, onChange, options, loading = false, placeholder = "Select an option", hasIcon = false }) => (
//   <select
//     className={`w-full bg-white/10 border border-[#FF6B6B] rounded-xl py-4 ${hasIcon ? 'pl-12 pr-4' : 'px-4'} text-black focus:outline-none focus:border-[#FF6B6B] focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15 ${loading ? 'opacity-60' : ''} appearance-none cursor-pointer`}
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     disabled={loading}
//   >
//     <option value="" className="bg-black/10">
//       {loading ? "Loading..." : placeholder}
//     </option>
//     {options.map((item, index) => (
//       <option key={index} value={item.value} className="bg-black/10">
//         {item.label}
//       </option>
//     ))}
//   </select>
// );
 
// // Custom Textarea Component
// const CustomTextarea = ({ value, onChange, placeholder, rows = 4 }) => (
//   <textarea
//     placeholder={placeholder}
//     rows={rows}
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-black placeholder-white/60 focus:outline-none focus:border-[#FF6B6B] focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15 resize-none"
//   />
// );
 
// const MatrimonialProfile = ({nextStep,isEdit = false}) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
 
//   // State for edit mode
//   const [isEditMode, setIsEditMode] = useState(isEdit);
//   const [loading, setLoading] = useState(false);
 
//   // State for dropdown options
//   const [educationOptions, setEducationOptions] = useState([]);
//   const [degreeOptions, setDegreeOptions] = useState([]);
 
//   // Loading states for dropdowns
//   const [loadingEducation, setLoadingEducation] = useState(false);
//   const [loadingDegrees, setLoadingDegrees] = useState(false);
//   const [income, setIncome] = useState([]);
//   const [employed,setEmployed] = useState([]);
//     const [occupationdata,setOccupationData] = useState([]);
 
//   // State for form fields
//   const [formData, setFormData] = useState({
//     education: '',
//     degree: '',
//     college: '',
//     employedIn: '',
//     occupation: '',
//     employerName: '',
//     annualIncome: '',
//     careerDescription: ''
//   });
 
//   // Fetch income options
//   useEffect(() => {
//     async function fetchIncome() {
//       try {
//         await axiosPublic.get('/utility/utilHead?utilHead=annual_income')
//         .then(res =>{
//             setIncome(res.data.data);
//         })
//       } catch (error) {
//         console.error('Error fetching income options:', error);
//       }
//     }
 
//     fetchIncome();
//   }, []);
// //    Fetch employed data
//   useEffect(() => {
//     async function fetchemployed() {
//       try {
//         await axiosPublic.get('/utility/utilHead?utilHead=employedIn')
//         .then(res =>{
//             setEmployed(res.data.data);
//         })

//       } catch (error) {
//         console.error('Error fetching income options:', error);
//       }
//     }
 
//     fetchemployed();
//   }, []);
//   // Fetch occupation data
//   useEffect(() => {
//     async function fetcheoccupation() {
//       try {
//         await axiosPublic.get('/utility/utilHead?utilHead=occupation')
//         .then(res =>{
//             setOccupationData(res.data.data);
//         })
        
//       } catch (error) {
//         console.error('Error fetching income options:', error);
//       }
//     }
 
//     fetcheoccupation();
//   }, []);
//   // Fetch education options from API
// const fetchEducationOptions = async () => {
//     try {
//       setLoadingEducation(true);
//       await axiosPublic.get('/utility/utilHead?utilHead=education_level')
//       .then(res =>
//       {
//         const formattedOptions = res.data.data.map(item => {
//                         // Remove apostrophes (’ or ') using regex
//                         const cleaned = item.replace(/['’]/g, '');
//                         // Lowercase and replace spaces and other non-alphanumeric characters with underscores
//                         const value = cleaned.toLowerCase().replace(/[^a-z0-9]+/g, '_');
                       
//                         return {
//                           label: item,
//                           value: value
//                         };
//                       });
//         setEducationOptions(formattedOptions);
//       }
//       )
//     } catch (error) {
//       console.error('Error fetching education options:', error);
//       toast.error('Failed to load education options. Please check your connection and try again.');
//     } finally {
//       setLoadingEducation(false);
//     }
//   };
 
 
//   // Fetch degree options based on selected education
//   const fetchDegreeOptions = async (educationCode) => {
//     if (!educationCode) {
//       setDegreeOptions([]);
//       return;
//     }
 
//     try {
//       setLoadingDegrees(true);
//       await axiosPublic.get(`/utility/parent?parentCode=${educationCode}`)
//       .then(res =>{
//         setDegreeOptions(res.data.data);
//       })
//     } catch (error) {
//       console.error('Error fetching degree options:', error);
//       toast.error('Failed to load degree options. Please try again.');
//       setDegreeOptions([]);
//     } finally {
//       setLoadingDegrees(false);
//     }
//   };
 
//   // Load education options on component mount
//   useEffect(() => {
//     fetchEducationOptions();
//   }, []);
 
//   // Fetch degrees when education changes
//   useEffect(() => {
//     if (formData.education) {
//       fetchDegreeOptions(formData.education);
//     } else {
//       setDegreeOptions([]);
//     }
//   }, [formData.education]);
 
//   // Load edit data on component mount
//   useEffect(() => {
//     const loadEditData = async () => {
//       const isEdit = searchParams.get('isEdit');
//       if (isEdit === 'true') {
//         setIsEditMode(true);
       
//         try {
//           const storedData = localStorage.getItem('editData');
//           if (storedData) {
//             const editData = JSON.parse(storedData);
//             setFormData(prevData => ({
//               ...prevData,
//               ...editData
//             }));
           
//             // Clear the stored data after use
//             localStorage.removeItem('editData');
//           }
//         } catch (error) {
//           console.error('Error loading edit data:', error);
//           toast.error('Failed to load existing data. Please try again.');
//         }
//       }
//     };
 
//     loadEditData();
//   }, [searchParams]);
 
//   // Handle form field changes
//   const handleChange = (field, value) => {
//     setFormData(prevData => {
//       const newData = {
//         ...prevData,
//         [field]: value,
//       };
     
//       // Reset degree when education changes
//       if (field === 'education') {
//         newData.degree = '';
//       }
     
//       return newData;
//     });
//   };
 
//   // Form validation
//   const validateForm = () => {
//     const errors = [];
   
//     if (!formData.education) errors.push('Education is required');
//     if (!formData.degree && formData.education) errors.push('Degree is required');
//     if (!formData.college.trim()) errors.push('College is required');
//     if (!formData.employedIn) errors.push('Employment type is required');
//     if (!formData.occupation) errors.push('Occupation is required');
//     if (!formData.employerName.trim()) errors.push('Company name is required');
//     if (!formData.annualIncome) errors.push('Annual income is required');
   
//     return errors;
//   };
 
//   const handleSubmit = async () => {
//     // Validate form
//     const validationErrors = validateForm();
//     if (validationErrors.length > 0) {
//         toast.error('Please fill all required fields:\n' + validationErrors.join('\n'));
//       return;
//     }
 
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
     
//       if (!token) {
//         toast.error('Authentication token not found. Please login again.');
//         return;
//       }
 
//       // Choose API endpoint based on edit mode
//       const apiUrl = isEditMode
//         ? '/user/update-professional-datas'
//         : '/user/add-professional-details';
 
//       await axiosPublic.post(apiUrl, formData,{
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//       })
//       .then(res =>{
//         if(res.status === 200 || res.status === 201){
//             toast.success(`Professional Details ${isEditMode ? 'updated' : 'added'} successfully`);
//             if (isEditMode) {
//                 router.back(); // Go back to the previous page
//             } else {
//                 nextStep();
//             }
//         }
//       })
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       toast.error(`Error while ${isEditMode ? 'updating' : 'adding'} professional details`);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//  return (
//   <div className="space-y-6 ">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 backdrop-blur-sm rounded-2xl p-6 border border-[#FF6B6B]/30">
//       {/* Education Dropdown */}
//       <FormField label="Education Level" icon={GraduationCap} required>
//         <CustomSelect
//           value={formData.education}
//           onChange={(val) => handleChange('education', val)}
//           options={educationOptions}
//           loading={loadingEducation}
//           placeholder="Select Education Level"
//           hasIcon
//         />
//       </FormField>
 
//       {/* Degree Dropdown (dependent on Education) */}
//       {formData.education && (
//       <FormField label="Degree" icon={GraduationCap} required>
//         <CustomSelect
//           value={formData.degree}
//           onChange={(val) => handleChange('degree', val)}
//           options={degreeOptions.map(item => ({ label: item, value: item }))}
//           loading={loadingDegrees}
//           placeholder="Select Degree"
//           hasIcon
//         />
//       </FormField>
//       )}
 
//       {/* College Name Input */}
//       <FormField label="College Name" icon={Building2} required>
//         <CustomInput
//           value={formData.college}
//           onChange={(val) => handleChange('college', val)}
//           placeholder="Enter your college name"
//           hasIcon
//         />
//       </FormField>
 
//       {/* Employed In Dropdown */}
//       <FormField label="EmployedIn" icon={Briefcase} required>
//       <CustomSelect
//         value={formData.employedIn}
//         onChange={(val) => handleChange('employedIn', val)}
//         options={employed.map(item => ({ label: item, value: item }))}
//         placeholder="Select Employement Type"
//         hasIcon
//       />
//     </FormField>
//        {/* Occupation Input */}
//       <FormField label="Occupation" icon={Briefcase} required>
//         <CustomSelect
//           value={formData.occupation}
//           onChange={(val) => handleChange('occupation', val)}
//           options={occupationdata.map(item => ({ label: item, value: item }))}
//           placeholder="Enter Your Occupation"
//           hasIcon
//         />
//       </FormField>
 
 
//       {/* Employer Name Input */}
//       <FormField label="Company Name" icon={Building2} required>
//         <CustomInput
//           value={formData.employerName}
//           onChange={(val) => handleChange('employerName', val)}
//           placeholder="Enter your company name"
//           hasIcon
//         />
//       </FormField>
 
//       {/* Annual Income Dropdown */}
//       <FormField label="Annual Income" icon={DollarSign} required>
//         <CustomSelect
//           value={formData.annualIncome}
//           onChange={(val) => handleChange('annualIncome', val)}
//           options={income.map(item => ({ label: item, value: item }))}
//           placeholder="Select annual income"
//           hasIcon
//         />
//       </FormField>
//     </div>

 
//     {/* Career Description Textarea */}
   
//                  {/* Submit Button */}
//                           <div className="flex justify-center pt-8 mb-6">
//                             <button
//                               onClick={handleSubmit}
//                               disabled={loading}
//                               className="group relative cursor-pointer px-12 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-full text-black font-bold text-lg shadow-2xl hover:shadow-[#FF6B6B]/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                             >
//                               <div className="flex items-center space-x-3">
//                                 {loading ? (
//                                   <>
//                                     <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                                     <span>Saving Profile...</span>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <CheckCircle className="w-6 h-6" />
//                                     <span>Save & Continue</span>
//                                     <ChevronsRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
//                                   </>
//                                 )}
//                               </div>
//                               <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                             </button>
//                           </div>
//   </div>
// );
 
// };
 
// export default MatrimonialProfile;


import { useRouter, useSearchParams } from 'next/navigation';
import { GraduationCap, ChevronRight, Briefcase, Building2, DollarSign, User, ChevronsRight, CheckCircle, Upload, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { axiosPublic } from '../../base/constant';
import { toast } from 'react-toastify';
 
 
// Form Field Component with modern styling - FIXED
const FormField = ({ label, icon: Icon, children, required = false }) => (
  <div className="relative group">
    {/* Label moved above the input field */}
    {label && (
      <label className="block text-[#FF6B6B] text-sm font-medium mb-2">
        {label}
        {required && <span className="text-[#FF6B6B] ml-1">*</span>}
      </label>
    )}
    <div className="relative">
      {/* Icon positioned properly */}
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/60 w-5 h-5 group-focus-within:text-[#FF6B6B] transition-colors z-10 pointer-events-none" />
      )}
      {children}
    </div>
  </div>
);
 
// Custom Input Component with glassmorphism styling - FIXED
const CustomInput = ({ value, onChange, placeholder, type = 'text', hasIcon = false }) => (
  <input
    type={type}
    className={`w-full bg-white/10 border border-[#FF6B6B] rounded-xl py-4 ${hasIcon ? 'pl-12 pr-4' : 'px-4'} text-black placeholder-black focus:outline-none focus:border-[#FF6B6B] focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15`}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

// Custom File Upload Component with glassmorphism styling
const CustomFileUpload = ({ value, onChange, accept, placeholder = "Choose file", hasIcon = false }) => (
  <div className="relative">
    <input
      type="file"
      accept={accept}
      onChange={(e) => onChange(e.target.files[0], e.target.files[0]?.name)}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
      id={`file-${Math.random().toString(36).substr(2, 9)}`}
    />
    <div className={`w-full bg-white/10 border border-[#FF6B6B] rounded-xl py-4 ${hasIcon ? 'pl-12 pr-4' : 'px-4'} text-black focus-within:border-[#FF6B6B] focus-within:bg-white/20 focus-within:shadow-lg focus-within:scale-105 transition-all duration-300 hover:bg-white/15 cursor-pointer flex items-center justify-between`}>
      <span className={value ? 'text-black' : 'text-black/60'}>
        {value ? value.name : placeholder}
      </span>
      <Upload className="w-5 h-5 text-[#FF6B6B]" />
    </div>
  </div>
);
 
// Custom Select Component with glassmorphism styling - FIXED
const CustomSelect = ({ value, onChange, options, loading = false, placeholder = "Select an option", hasIcon = false }) => (
  <select
    className={`w-full bg-white/10 border border-[#FF6B6B] rounded-xl py-4 ${hasIcon ? 'pl-12 pr-4' : 'px-4'} text-black focus:outline-none focus:border-[#FF6B6B] focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15 ${loading ? 'opacity-60' : ''} appearance-none cursor-pointer`}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={loading}
  >
    <option value="" className="bg-black/10">
      {loading ? "Loading..." : placeholder}
    </option>
    {options.map((item, index) => (
      <option key={index} value={item.value} className="bg-black/10">
        {item.label}
      </option>
    ))}
  </select>
);
 
// Custom Textarea Component
const CustomTextarea = ({ value, onChange, placeholder, rows = 4 }) => (
  <textarea
    placeholder={placeholder}
    rows={rows}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full bg-white/10 border border-white/30 rounded-xl py-4 px-4 text-black placeholder-white/60 focus:outline-none focus:border-[#FF6B6B] focus:bg-white/20 focus:shadow-lg focus:scale-105 transition-all duration-300 hover:bg-white/15 resize-none"
  />
);
 
const MatrimonialProfile = ({nextStep,isEdit = false}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
 
  // State for edit mode
  const [isEditMode, setIsEditMode] = useState(isEdit);
  const [loading, setLoading] = useState(false);
 
  // State for dropdown options
  const [educationOptions, setEducationOptions] = useState([]);
  const [degreeOptions, setDegreeOptions] = useState([]);
 
  // Loading states for dropdowns
  const [loadingEducation, setLoadingEducation] = useState(false);
  const [loadingDegrees, setLoadingDegrees] = useState(false);
  const [income, setIncome] = useState([]);
  const [employed,setEmployed] = useState([]);
    const [occupationdata,setOccupationData] = useState([]);
    const[degreeCertificate,setDegreeCertificate] = useState(null);
    const[degreeCertificateName,setDegreeCertificateName] = useState(null);

    const[salarySlip,setSalarySlip] = useState(null);
    const[salarySlipName,setSalarySlipName] = useState(null);
 
  // State for form fields
  const [formData, setFormData] = useState({
    education: '',
    degree: '',
    college: '',
    employedIn: '',
    occupation: '',
    employerName: '',
    annualIncome: '',
  });
 
  // Fetch income options
  useEffect(() => {
    async function fetchIncome() {
      try {
        await axiosPublic.get('/utility/utilHead?utilHead=annual_income')
        .then(res =>{
            setIncome(res.data.data);
        })
      } catch (error) {
        console.error('Error fetching income options:', error);
      }
    }
 
    fetchIncome();
  }, []);
//    Fetch employed data
  useEffect(() => {
    async function fetchemployed() {
      try {
        await axiosPublic.get('/utility/utilHead?utilHead=employedIn')
        .then(res =>{
            setEmployed(res.data.data);
        })

      } catch (error) {
        console.error('Error fetching income options:', error);
      }
    }
 
    fetchemployed();
  }, []);
  // Fetch occupation data
  useEffect(() => {
    async function fetcheoccupation() {
      try {
        await axiosPublic.get('/utility/utilHead?utilHead=occupation')
        .then(res =>{
            setOccupationData(res.data.data);
        })
        
      } catch (error) {
        console.error('Error fetching income options:', error);
      }
    }
 
    fetcheoccupation();
  }, []);
  // Fetch education options from API
const fetchEducationOptions = async () => {
    try {
      setLoadingEducation(true);
      await axiosPublic.get('/utility/utilHead?utilHead=education_level')
      .then(res =>
      {
        const formattedOptions = res.data.data.map(item => {
                        // Remove apostrophes (' or ') using regex
                        const cleaned = item.replace(/['’]/g, '');
                        // Lowercase and replace spaces and other non-alphanumeric characters with underscores
                        const value = cleaned.toLowerCase().replace(/[^a-z0-9]+/g, '_');
                       
                        return {
                          label: item,
                          value: value
                        };
                      });
        setEducationOptions(formattedOptions);
      }
      )
    } catch (error) {
      console.error('Error fetching education options:', error);
      toast.error('Failed to load education options. Please check your connection and try again.');
    } finally {
      setLoadingEducation(false);
    }
  };
 
 
  // Fetch degree options based on selected education
  const fetchDegreeOptions = async (educationCode) => {
    if (!educationCode) {
      setDegreeOptions([]);
      return;
    }
 
    try {
      setLoadingDegrees(true);
      await axiosPublic.get(`/utility/parent?parentCode=${educationCode}`)
      .then(res =>{
        setDegreeOptions(res.data.data);
      })
    } catch (error) {
      console.error('Error fetching degree options:', error);
      toast.error('Failed to load degree options. Please try again.');
      setDegreeOptions([]);
    } finally {
      setLoadingDegrees(false);
    }
  };
 
  // Load education options on component mount
  useEffect(() => {
    fetchEducationOptions();
  }, []);
 
  // Fetch degrees when education changes
  useEffect(() => {
    if (formData.education) {
      fetchDegreeOptions(formData.education);
    } else {
      setDegreeOptions([]);
    }
  }, [formData.education]);
 
  // Load edit data on component mount
  useEffect(() => {
    const loadEditData = async () => {
      const isEdit = searchParams.get('isEdit');
      if (isEdit === 'true') {
        setIsEditMode(true);
       
        try {
          const storedData = localStorage.getItem('editData');
          if (storedData) {
            const editData = JSON.parse(storedData);
            setFormData(prevData => ({
              ...prevData,
              ...editData
            }));
           
            // Clear the stored data after use
            localStorage.removeItem('editData');
          }
        } catch (error) {
          console.error('Error loading edit data:', error);
          toast.error('Failed to load existing data. Please try again.');
        }
      }
    };
 
    loadEditData();
  }, [searchParams]);
 
  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData(prevData => {
      const newData = {
        ...prevData,
        [field]: value,
      };
     
      // Reset degree when education changes
      if (field === 'education') {
        newData.degree = '';
      }
     
      return newData;
    });
  };
 
  // Form validation
  const validateForm = () => {
    const errors = [];
   
    if (!formData.education) errors.push('Education is required');
    if (!formData.degree && formData.education) errors.push('Degree is required');
    if (!formData.college.trim()) errors.push('College is required');
    if (!formData.employedIn) errors.push('Employment type is required');
    if (!formData.occupation) errors.push('Occupation is required');
    if (!formData.employerName.trim()) errors.push('Company name is required');
    if (!formData.annualIncome) errors.push('Annual income is required');
    return errors;
  };
 
  const handleSubmit = async () => {
    // Validate form
    // const validationErrors = validateForm();
    // if (validationErrors.length > 0) {
    //     toast.error('Please fill all required fields:\n' + validationErrors.join('\n'));
    //   return;
    // }
 
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
     
      if (!token) {
        toast.error('Authentication token not found. Please login again.');
        return;
      }

      if(salarySlip){
        const formData = new FormData();
        formData.append("files",salarySlip);
        formData.append("filenames",[salarySlipName]);
        formData.append("fileType","salary");
        await axiosPublic.post('/user/upload-photos', formData, {
          headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization' : `Bearer ${token}`
          }})
          .then(res => {
            if(res.status === 200 || res.status === 201){
              toast.success("Salary Payslip uploaded successfully");
            }
          })
          .catch(err =>{
            toast.error("Error uploading Salary Payslip");
            console.error("Error uploading Salary Payslip:", err);
          })
      }

      if(degreeCertificate){
        const formData = new FormData();
        formData.append("files",degreeCertificate);
        formData.append("filenames",[degreeCertificateName]);
        formData.append("fileType","education");
        await axiosPublic.post('/user/upload-photos', formData, {
          headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization' : `Bearer ${token}`
          }})
          .then(res => {
            if(res.status === 200 || res.status === 201){
              toast.success("Education certificate uploaded successfully");
            }
          })
          .catch(err =>{
            toast.error("Error uploading Education certificate");
            console.error("Error uploading Education certificate:", err);
          })
      }

      // Choose API endpoint based on edit mode
      const apiUrl = isEditMode
        ? '/user/update-professional-datas'
        : '/user/add-professional-details';
 
      await axiosPublic.post(apiUrl, formData,{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      .then(res =>{
        if(res.status === 200 || res.status === 201){
            toast.success(`Professional Details ${isEditMode ? 'updated' : 'added'} successfully`);
            if (isEditMode) {
                router.back(); // Go back to the previous page
            } else {
                nextStep();
            }
        }
      })
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error(`Error while ${isEditMode ? 'updating' : 'adding'} professional details`);
    } finally {
      setLoading(false);
    }
  };
 
 return (
  <div className="space-y-6 ">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 backdrop-blur-sm rounded-2xl p-6 border border-[#FF6B6B]/30">
      {/* Education Dropdown */}
      <FormField label="Education Level" icon={GraduationCap} required>
        <CustomSelect
          value={formData.education}
          onChange={(val) => handleChange('education', val)}
          options={educationOptions}
          loading={loadingEducation}
          placeholder="Select Education Level"
          hasIcon
        />
      </FormField>
 
      {/* Degree Dropdown (dependent on Education) */}
      {formData.education && (
      <FormField label="Degree" icon={GraduationCap} required>
        <CustomSelect
          value={formData.degree}
          onChange={(val) => handleChange('degree', val)}
          options={degreeOptions.map(item => ({ label: item, value: item }))}
          loading={loadingDegrees}
          placeholder="Select Degree"
          hasIcon
        />
      </FormField>
      )}
 
      {/* College Name Input */}
      <FormField label="College Name" icon={Building2} required>
        <CustomInput
          value={formData.college}
          onChange={(val) => handleChange('college', val)}
          placeholder="Enter your college name"
          hasIcon
        />
      </FormField>

      {/* Degree Certificate Upload */}
      <FormField label="Education certificate" icon={FileText} required>
        <CustomFileUpload
          value={degreeCertificate}
          onChange={(file,fileName) => {setDegreeCertificate(file);setDegreeCertificateName(fileName)}}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          placeholder="Upload education certificate"
          hasIcon
        />
      </FormField>
 
      {/* Employed In Dropdown */}
      <FormField label="EmployedIn" icon={Briefcase} required>
      <CustomSelect
        value={formData.employedIn}
        onChange={(val) => handleChange('employedIn', val)}
        options={employed.map(item => ({ label: item, value: item }))}
        placeholder="Select Employement Type"
        hasIcon
      />
    </FormField>
       {/* Occupation Input */}
      <FormField label="Occupation" icon={Briefcase} required>
        <CustomSelect
          value={formData.occupation}
          onChange={(val) => handleChange('occupation', val)}
          options={occupationdata.map(item => ({ label: item, value: item }))}
          placeholder="Enter Your Occupation"
          hasIcon
        />
      </FormField>
 
 
      {/* Employer Name Input */}
      <FormField label="Company Name" icon={Building2} required>
        <CustomInput
          value={formData.employerName}
          onChange={(val) => handleChange('employerName', val)}
          placeholder="Enter your company name"
          hasIcon
        />
      </FormField>
 
      {/* Annual Income Dropdown */}
      <FormField label="Annual Income" icon={DollarSign} required>
        <CustomSelect
          value={formData.annualIncome}
          onChange={(val) => handleChange('annualIncome', val)}
          options={income.map(item => ({ label: item, value: item }))}
          placeholder="Select annual income"
          hasIcon
        />
      </FormField>

      {/* Salary Payslip Upload */}
      <FormField label="Salary Payslip" icon={FileText} required>
        <CustomFileUpload
          value={salarySlip}
          onChange={(file,fileName) => {setSalarySlip(file);setSalarySlipName(fileName)}}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          placeholder="Upload salary payslip"
          hasIcon
        />
      </FormField>
    </div>

 
    {/* Career Description Textarea */}
   
                 {/* Submit Button */}
                          <div className="flex justify-center pt-8 mb-6">
                            <button
                              onClick={handleSubmit}
                              disabled={loading}
                              className="group relative cursor-pointer px-12 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-full text-black font-bold text-lg shadow-2xl hover:shadow-[#FF6B6B]/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                                    <span>Save & Continue</span>
                                    <ChevronsRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                                  </>
                                )}
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                          </div>
  </div>
);
 
};
 
export default MatrimonialProfile;