"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { axiosPublic } from "../../base/constant";
import { useState, useEffect } from "react";
import {
  FiAlertCircle,
  FiChevronDown,
  FiUser,
  FiBriefcase,
  FiMapPin,
  FiHome,
  FiGlobe,
  FiUsers,
  FiCoffee,
} from "react-icons/fi";
import { CheckCircle, ChevronsRight } from "lucide-react";

const SEX_OPTIONS = ["Male", "Female", "Others"];
const LIFESTYLE_TYPES = ["Modern", "Ethnic", "Traditional"];

const MatrimonialProfile = () => {
  const [apiData, setApiData] = useState({
    age: [],
    height_cm: [],
    height_ft_in: [],
    weight: [],
    state: [],
    city: {},
    religion: [],
    caste: {},
    education_level: [],
    occupation: [],
    lifestyle: [],
  });

  const [preferences, setPreferences] = useState({
    ageRange: { min: "", max: "" },
    heightRange: { min: "", max: "", unit: "cm" },
    weight: { min: "", max: "" },
    sex: "",
    otherSex: "",
    educationLevel: "",
    occupationType: "",
    location: { state: "", city: "" },
    religion: "",
    caste: "",
    lifestyle: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const params = useSearchParams();
  const router = useRouter();


  const toggleHeightUnit = () => {
    const newUnit = preferences.heightRange.unit === "cm" ? "ft" : "cm";
    setPreferences((prev) => ({
      ...prev,
      heightRange: {
        ...prev.heightRange,
        unit: newUnit,
        min: "",
        max: "",
      },
    }));
  };

  const ftToCm = (ftString) => {
    try {
      const match = ftString.match(/(\d+)'(\d+)"/);
      if (!match) return null;
      const feet = parseInt(match[1]);
      const inches = parseInt(match[2]);
      return Math.round(feet * 30.48 + inches * 2.54);
    } catch (error) {
      console.error("Error converting ft to cm:", error);
      return null;
    }
  };

  const cmToFt = (cm) => {
    try {
      const totalInches = cm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      return `${feet}'${inches}"`;
    } catch (error) {
      console.error("Error converting cm to ft:", error);
      return "";
    }
  };

  const generateOptions = (start, end, suffix = "") => {
    try {
      if (start > end) {
        console.warn(`Invalid range: start (${start}) > end (${end})`);
        return [];
      }
      return Array.from(
        { length: end - start + 1 },
        (_, i) => `${i + start}${suffix}`
      );
    } catch (error) {
      console.error("Error generating options:", error);
      return [];
    }
  };

  const generateHeightOptionsFt = () => {
    try {
      const options = [];
      for (let feet = 4; feet <= 7; feet++) {
        for (let inches = 0; inches <= 11; inches++) {
          if (feet === 7 && inches > 0) break;
          options.push(`${feet}'${inches}"`);
        }
      }
      return options;
    } catch (error) {
      console.error("Error generating height options (ft):", error);
      return [];
    }
  };

  const generateAgeOptions = () => {
    return generateOptions(18, 60, " years");
  };

  const generateHeightOptionsCm = () => {
    return generateOptions(140, 200, " cm");
  };

  const generateWeightOptions = () => {
    return generateOptions(40, 120, " kg");
  };

  const checkNetworkStatus = () => {
    setNetworkError(!navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);
    checkNetworkStatus();

    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setNetworkError(false);

    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const response = await axiosPublic.get(
        "/partnerpreference/get-utility-partner-preference-data",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          timeout: 10000,
        }
      );

      if (!response.data) {
        throw new Error("No data received from server");
      }

      const data = response.data.data || {};

      setApiData({
        age: generateAgeOptions(),
        height_cm: generateHeightOptionsCm(),
        height_ft_in: generateHeightOptionsFt(),
        weight: generateWeightOptions(),
        state: Array.isArray(data.state) ? data.state : [],
        city: typeof data.city === "object" ? data.city : {},
        religion: Array.isArray(data.religion) ? data.religion : [],
        caste: typeof data.caste === "object" ? data.caste : {},
        education_level: Array.isArray(data.education_level)
          ? data.education_level
          : [],
        occupation: Array.isArray(data.occupation) ? data.occupation : [],
        lifestyle: Array.isArray(data.lifestyle)
          ? data.lifestyle
          : LIFESTYLE_TYPES,
      });

      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);

      setApiData({
        age: generateAgeOptions(),
        height_cm: generateHeightOptionsCm(),
        height_ft_in: generateHeightOptionsFt(),
        weight: generateWeightOptions(),
        state: [],
        city: {},
        religion: [],
        caste: {},
        education_level: [],
        occupation: [],
        lifestyle: LIFESTYLE_TYPES,
      });

      if (error.code === "ECONNABORTED") {
        setNetworkError(true);
        setSubmitError(
          "Request timeout. Please check your internet connection."
        );
      } else if (error.response?.status === 401) {
        setSubmitError("Authentication failed. Please login again.");
      } else if (error.response?.status >= 500) {
        setSubmitError("Server error. Please try again later.");
      } else {
        setNetworkError(true);
        setSubmitError(
          error.message || "Failed to load data. Using offline mode."
        );
      }

      setDataLoaded(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getAgeValue = (ageString) => {
    try {
      if (!ageString) return null;
      const value = parseInt(ageString.replace(" years", ""));
      return isNaN(value) ? null : value;
    } catch (error) {
      console.error("Error parsing age value:", error);
      return null;
    }
  };

  const getHeightValue = (heightString, unit) => {
    try {
      if (!heightString) return null;

      if (unit === "cm") {
        const value = parseInt(heightString.replace(" cm", ""));
        return isNaN(value) ? null : value;
      } else {
        return ftToCm(heightString);
      }
    } catch (error) {
      console.error("Error parsing height value:", error);
      return null;
    }
  };

  const getWeightValue = (weightString) => {
    try {
      if (!weightString) return null;
      const value = parseInt(weightString.toString().replace(" kg", ""));
      return isNaN(value) ? null : value;
    } catch (error) {
      console.error("Error parsing weight value:", error);
      return null;
    }
  };

  const handleSelectChange = (field, value, subField = null) => {
    try {
      if (subField) {
        setPreferences((prev) => ({
          ...prev,
          [field]: { ...prev[field], [subField]: value },
        }));
      } else {
        setPreferences((prev) => ({ ...prev, [field]: value }));
      }

      setErrors((prev) => ({
        ...prev,
        [field]: "",
        [`${field}Range`]: "",
      }));
    } catch (error) {
      console.error("Error handling selection:", error);
      setSubmitError("Error processing selection");
    }
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    try {
      switch (fieldName) {
        case "sex":
          if (!value || value.trim() === "") {
            errorMessage = "Please select a gender";
          }
          break;

        case "otherSex":
          if (preferences.sex === "Others" && (!value || value.trim() === "")) {
            errorMessage = "Please specify your gender";
          } else if (preferences.sex === "Others" && value.trim().length < 2) {
            errorMessage = "Please enter at least 2 characters";
          }
          break;

        case "educationLevel":
          if (!value || value.trim() === "") {
            errorMessage = "Please select your education level";
          }
          break;

        case "occupationType":
          if (!value || value.trim() === "") {
            errorMessage = "Please select your occupation type";
          }
          break;

        case "state":
          if (!value || value.trim() === "") {
            errorMessage = "Please select a state";
          }
          break;

        case "city":
          if (!value || value.trim() === "") {
            if (preferences.location.state) {
              errorMessage = "Please select a city";
            }
          }
          break;

        case "religion":
          if (!value || value.trim() === "") {
            errorMessage = "Please select a religion";
          }
          break;

        case "caste":
          if (preferences.religion && (!value || value.trim() === "")) {
            errorMessage = "Please select a caste";
          }
          break;

        case "lifestyle":
          if (!value || value.trim() === "") {
            errorMessage = "Please select a lifestyle preference";
          }
          break;
      }

      setErrors((prev) => ({
        ...prev,
        [fieldName]: errorMessage,
      }));

      return errorMessage === "";
    } catch (error) {
      console.error("Error validating field:", fieldName, error);
      return false;
    }
  };

  const validateRange = (field, values) => {
    try {
      const { min, max } = values;
      let errorMessage = "";

      if (!min && !max) {
        errorMessage = `Please select both minimum and maximum ${field.replace(
          "Range",
          ""
        )} values`;
      } else if (!min) {
        errorMessage = `Please select minimum ${field.replace(
          "Range",
          ""
        )} value`;
      } else if (!max) {
        errorMessage = `Please select maximum ${field.replace(
          "Range",
          ""
        )} value`;
      } else {
        let minVal, maxVal;

        if (field === "ageRange") {
          minVal = getAgeValue(min);
          maxVal = getAgeValue(max);

          if (minVal === null || maxVal === null) {
            errorMessage = "Invalid age values selected";
          } else if (minVal < 18) {
            errorMessage = "Minimum age must be at least 18 years";
          } else if (maxVal > 100) {
            errorMessage = "Maximum age cannot exceed 100 years";
          } else if (minVal > maxVal) {
            errorMessage = "Minimum age cannot be greater than maximum age";
          } else if (minVal === maxVal) {
            errorMessage = "Minimum and maximum age cannot be the same";
          } else if (maxVal - minVal > 30) {
            errorMessage = "Age range cannot exceed 30 years difference";
          } else if (maxVal - minVal < 2) {
            errorMessage = "Age range should be at least 2 years";
          }
        } else if (field === "heightRange") {
          minVal = getHeightValue(min, preferences.heightRange.unit);
          maxVal = getHeightValue(max, preferences.heightRange.unit);

          if (minVal === null || maxVal === null) {
            errorMessage = "Invalid height values selected";
          } else if (minVal > maxVal) {
            errorMessage =
              "Minimum height cannot be greater than maximum height";
          } else if (minVal === maxVal) {
            errorMessage = "Minimum and maximum height cannot be the same";
          } else {
            if (preferences.heightRange.unit === "cm") {
              if (minVal < 140 || maxVal > 220) {
                errorMessage = "Height must be between 140cm and 220cm";
              } else if (maxVal - minVal < 5) {
                errorMessage = "Height range should be at least 5cm";
              }
            } else {
              const minCm = ftToCm(min);
              const maxCm = ftToCm(max);
              if (minCm < 140 || maxCm > 220) {
                errorMessage = "Height must be between 4'7\" and 7'2\"";
              } else if (maxCm - minCm < 5) {
                errorMessage = "Height range should be at least 2 inches";
              }
            }
          }
        } else if (field === "weight") {
          minVal = getWeightValue(min);
          maxVal = getWeightValue(max);

          if (minVal === null || maxVal === null) {
            errorMessage = "Invalid weight values selected";
          } else if (minVal < 30) {
            errorMessage = "Minimum weight must be at least 30kg";
          } else if (maxVal > 200) {
            errorMessage = "Maximum weight cannot exceed 200kg";
          } else if (minVal > maxVal) {
            errorMessage =
              "Minimum weight cannot be greater than maximum weight";
          } else if (minVal === maxVal) {
            errorMessage = "Minimum and maximum weight cannot be the same";
          } else if (maxVal - minVal > 50) {
            errorMessage = "Weight range cannot exceed 50kg difference";
          } else if (maxVal - minVal < 5) {
            errorMessage = "Weight range should be at least 5kg";
          }
        }
      }

      setErrors((prev) => ({
        ...prev,
        [field]: errorMessage,
      }));

      return errorMessage === "";
    } catch (error) {
      console.error("Error validating range:", field, error);
      setErrors((prev) => ({
        ...prev,
        [field]: "Range validation error occurred",
      }));
      return false;
    }
  };

  const validateAllFields = () => {
    try {
      let isValid = true;

      const fieldsToValidate = [
        "sex",
        "educationLevel",
        "occupationType",
        "religion",
        "lifestyle",
      ];

      fieldsToValidate.forEach((field) => {
        const fieldValue = preferences[field];
        if (!validateField(field, fieldValue)) {
          isValid = false;
        }
      });

      if (!validateField("state", preferences.location.state)) {
        isValid = false;
      }
      if (!validateField("city", preferences.location.city)) {
        isValid = false;
      }

      if (!validateField("otherSex", preferences.otherSex)) {
        isValid = false;
      }
      if (!validateField("caste", preferences.caste)) {
        isValid = false;
      }

      const rangeValidations = [
        validateRange("ageRange", preferences.ageRange),
        validateRange("heightRange", preferences.heightRange),
        validateRange("weight", preferences.weight),
      ];

      if (!rangeValidations.every((valid) => valid)) {
        isValid = false;
      }

      return isValid;
    } catch (error) {
      console.error("Error in validateAllFields:", error);
      setSubmitError("Validation error occurred");
      return false;
    }
  };

  const handleSavePreferences = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      if (!dataLoaded) {
        setSubmitError("Please wait while data is being loaded...");
        return;
      }

      if (!navigator.onLine) {
        setSubmitError(
          "No internet connection. Please check your connection and try again."
        );
        return;
      }

      if (!validateAllFields()) {
        const errorMessages = [];
        Object.keys(errors).forEach((key) => {
          if (errors[key]) {
            const fieldLabel = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());
            errorMessages.push(`${fieldLabel}: ${errors[key]}`);
          }
        });

        setSubmitError(
          errorMessages.length > 0
            ? `Please fix the following issues:\n\n${errorMessages.join("\n")}`
            : "Please fill in all required fields."
        );
        return;
      }

      const minAge = getAgeValue(preferences.ageRange.min);
      const maxAge = getAgeValue(preferences.ageRange.max);

      let minHeight = getHeightValue(
        preferences.heightRange.min,
        preferences.heightRange.unit
      );
      let maxHeight = getHeightValue(
        preferences.heightRange.max,
        preferences.heightRange.unit
      );

      const minWeight = getWeightValue(preferences.weight.min);
      const maxWeight = getWeightValue(preferences.weight.max);

      if (minAge === null || maxAge === null) {
        throw new Error("Invalid age values");
      }
      if (minHeight === null || maxHeight === null) {
        throw new Error("Invalid height values");
      }
      if (minWeight === null || maxWeight === null) {
        throw new Error("Invalid weight values");
      }

      const payloadData = {
        minAge,
        maxAge,
        minHeight,
        maxHeight,
        heightUnit: preferences.heightRange.unit,
        minWeight,
        maxWeight,
        weightUnit: "kg",
        caste: preferences.caste,
        religion: preferences.religion,
        lifestyle: preferences.lifestyle,
        state: preferences.location.state,
        city: preferences.location.city,
        sex: preferences.sex,
        otherSex: preferences.otherSex || "",
        educationLevel: preferences.educationLevel,
        occupationType: preferences.occupationType,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const apiUrl = isEditMode
        ? "/partnerpreference/update-preference"
        : "/partnerpreference/create-preference";

      const response = await axiosPublic({
        method: isEditMode ? "PUT" : "POST",
        url: apiUrl,
        data: payloadData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitSuccess("Partner preferences saved successfully!");
        router.push("/Home");
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving preferences:", error);

      if (error.code === "ECONNABORTED") {
        setSubmitError(
          "Request timeout. Please check your internet connection and try again."
        );
      } else if (error.response?.status === 401) {
        setSubmitError("Authentication failed. Please login again.");
      } else if (error.response?.status === 400) {
        setSubmitError(
          "Invalid data provided. Please check your entries and try again."
        );
      } else if (error.response?.status >= 500) {
        setSubmitError("Server error. Please try again later.");
      } else if (error.message.includes("Invalid")) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Failed to save preferences. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadEditData = async () => {
      const isEdit = params.get('isEdit');
      if (isEdit === "true") {
        setIsEditMode(true);
        try {
          const storedData = localStorage.getItem("editData");
          const editData = storedData
            ? JSON.parse(storedData)
            : params.editData
            ? JSON.parse(decodeURIComponent(params.editData))
            : null;

          if (editData) {
            const casteOptions =
              editData.religion?.toLowerCase() &&
              apiData.caste[editData.religion.toLowerCase()];

            setPreferences((prevPrefs) => ({
              ...prevPrefs,
              ageRange: {
                min: editData.minAge ? `${editData.minAge} years` : "",
                max: editData.maxAge ? `${editData.maxAge} years` : "",
              },
              heightRange: {
                min:
                  editData.minHeight !== null &&
                  editData.minHeight !== undefined
                    ? editData.heightUnit === "cm"
                      ? `${editData.minHeight} cm`
                      : cmToFt(editData.minHeight)
                    : "",
                max:
                  editData.maxHeight !== null &&
                  editData.maxHeight !== undefined
                    ? editData.heightUnit === "cm"
                      ? `${editData.maxHeight} cm`
                      : cmToFt(editData.maxHeight)
                    : "",
                unit: editData.heightUnit || "cm",
              },
              weight: {
                min: editData.minWeight ? `${editData.minWeight}` : "",
                max: editData.maxWeight ? `${editData.maxWeight}` : "",
              },
              sex: editData.sex || "",
              otherSex: editData.otherSex || "",
              educationLevel: editData.educationLevel || "",
              occupationType: editData.occupationType || "",
              location: {
                state: editData.state || "",
                city: editData.city || "",
              },
              religion: editData.religion || "",
              caste: casteOptions?.includes(editData.caste)
                ? editData.caste
                : "",
              lifestyle: editData.lifestyle || "",
            }));

            localStorage.removeItem("editData");
          }
        } catch (error) {
          console.error("Error loading edit data:", error);
          setSubmitError("Error loading existing data");
        }
      }
    };

    loadEditData();
  }, [params]);

  const renderError = (error) => {
    if (!error) return null;
    return (
      <div className="flex items-center mt-1 text-red-500 text-sm">
        <FiAlertCircle className="mr-1 text-xs" />
        <span>{error}</span>
      </div>
    );
  };

  const SelectField = ({
    label,
    value,
    onChange,
    options,
    placeholder,
    icon: Icon,
    required = true,
    disabled = false,
    errorKey,
  }) => {
    return (
      <div className="mb-6">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label} {<span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon
              className={`${errors[errorKey] ? "text-red-500" : "text-gray-400"}`}
              size={18}
            />
          </div>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled || isLoading}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 appearance-none ${
              disabled || isLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:border-red-300 hover:bg-red-50"
            } ${
              errors[errorKey] ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <FiChevronDown className="text-gray-400" size={16} />
          </div>
        </div>
        {renderError(errors[errorKey])}
      </div>
    );
  };

  const RangeSelectField = ({
    label,
    minValue,
    maxValue,
    onMinChange,
    onMaxChange,
    options,
    minPlaceholder,
    maxPlaceholder,
    errorKey,
    showLabel = true,
  }) => {
    return (
      <div className="mb-6">
       {showLabel && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label} <span className="text-red-500">*</span>
          </label>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <select
              value={minValue}
              onChange={(e) => onMinChange(e.target.value)}
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 appearance-none ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:border-red-300 hover:bg-red-50"
              } ${
                errors[errorKey] ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            >
              <option value="">{minPlaceholder}</option>
              {options.map((option) => (
                <option key={`min-${option}`} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown className="text-gray-400" size={16} />
            </div>
          </div>
          <div className="relative">
            <select
              value={maxValue}
              onChange={(e) => onMaxChange(e.target.value)}
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg bg-gray-50 appearance-none ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:border-red-300 hover:bg-red-50"
              } ${
                errors[errorKey] ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            >
              <option value="">{maxPlaceholder}</option>
              {options.map((option) => (
                <option key={`max-${option}`} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown className="text-gray-400" size={16} />
            </div>
          </div>
        </div>
        {renderError(errors[errorKey])}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-100 px-6 py-4">
              <div className="flex items-center">
                <FiUser className="text-red-500 mr-3" size={20} />
                <h3 className="text-xl text-[#FF6B6B] font-semibold">
                  Basic Details
                </h3>
              </div>
            </div>
            <div className="p-6">
              <RangeSelectField
                label="Age Range"
                minValue={preferences.ageRange.min}
                maxValue={preferences.ageRange.max}
                onMinChange={(value) =>
                  handleSelectChange("ageRange", value, "min")
                }
                onMaxChange={(value) =>
                  handleSelectChange("ageRange", value, "max")
                }
                options={apiData.age}
                minPlaceholder="Min Age"
                maxPlaceholder="Max Age"
                errorKey="ageRange"
              />

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Height Range  <span className="text-red-500">*</span>
                  </label>
                  <button
                    onClick={toggleHeightUnit}
                    className="text-sm text-red-500 hover:text-red-600 font-medium cursor-pointer"
                  >
                    Switch to{" "}
                    {preferences.heightRange.unit === "cm" ? "ft/in" : "cm"}
                  </button>
                </div>
                <RangeSelectField
                  minValue={preferences.heightRange.min}
                  maxValue={preferences.heightRange.max}
                  onMinChange={(value) =>
                    handleSelectChange("heightRange", value, "min")
                  }
                  onMaxChange={(value) =>
                    handleSelectChange("heightRange", value, "max")
                  }
                  options={
                    preferences.heightRange.unit === "cm"
                      ? apiData.height_cm
                      : apiData.height_ft_in
                  }
                  minPlaceholder="Min Height"
                  maxPlaceholder="Max Height"
                  errorKey="heightRange"
                  showLabel={false}
                />
              </div>

              <RangeSelectField
                label="Weight Range (kg)"
                minValue={
                  preferences.weight.min ? `${preferences.weight.min} kg` : ""
                }
                maxValue={
                  preferences.weight.max ? `${preferences.weight.max} kg` : ""
                }
                onMinChange={(value) =>
                  handleSelectChange("weight", value.replace(" kg", ""), "min")
                }
                onMaxChange={(value) =>
                  handleSelectChange("weight", value.replace(" kg", ""), "max")
                }
                options={apiData.weight}
                minPlaceholder="Min Weight"
                maxPlaceholder="Max Weight"
                errorKey="weight"
              />

              <SelectField
                label="Gender"
                value={preferences.sex}
                onChange={(value) => handleSelectChange("sex", value)}
                options={SEX_OPTIONS}
                placeholder="Select Gender"
                icon={FiUser}
                required
                errorKey="sex"
              />

              {preferences.sex === "Others" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Please specify <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Please specify gender"
                    value={preferences.otherSex}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        otherSex: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  {renderError(errors.otherSex)}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-100 px-6 py-4">
              <div className="flex items-center">
                <FiBriefcase className="text-red-500 mr-3" size={20} />
                <h3 className="text-xl text-[#FF6B6B] font-semibold">
                  Education & Career
                </h3>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                label="Education Level"
                value={preferences.educationLevel}
                onChange={(value) => handleSelectChange("educationLevel", value)}
                options={apiData.education_level}
                placeholder="Select Education Level"
                icon={FiBriefcase}
                required
                errorKey="educationLevel"
              />

              <SelectField
                label="Occupation Type"
                value={preferences.occupationType}
                onChange={(value) => handleSelectChange("occupationType", value)}
                options={apiData.occupation}
                placeholder="Select Occupation Type"
                icon={FiBriefcase}
                required
                errorKey="occupationType"
              />
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-100 px-6 py-4">
              <div className="flex items-center">
                <FiMapPin className="text-red-500 mr-3" size={20} />
                <h3 className="text-xl text-[#FF6B6B] font-semibold">
                  Location
                </h3>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                label="State"
                value={preferences.location.state}
                onChange={(value) =>
                  handleSelectChange("location", { ...preferences.location, state: value, city: "" }, null)
                }
                options={apiData.state}
                placeholder="Select State"
                icon={FiMapPin}
                required
                errorKey="state"
              />

              <SelectField
                label="City"
                value={preferences.location.city}
                onChange={(value) =>
                  handleSelectChange("location", { ...preferences.location, city: value }, null)
                }
                options={
                  preferences.location.state
                    ? apiData.city[preferences.location.state.toLowerCase().replace(/\s+/g, "_")] || []
                    : []
                }
                placeholder={
                  preferences.location.state
                    ? "Select City"
                    : "Select State First"
                }
                icon={FiHome}
                disabled={!preferences.location.state}
                required={!!preferences.location.state}
                errorKey="city"
              />
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-100 px-6 py-4">
              <div className="flex items-center">
                <FiGlobe className="text-red-500 mr-3" size={20} />
                <h3 className="text-xl text-[#FF6B6B] font-semibold">
                  Cultural & Religious Background
                </h3>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                label="Religion"
                value={preferences.religion}
                onChange={(value) => {
                  handleSelectChange("religion", value);
                  handleSelectChange("caste", "");
                }}
                options={apiData.religion}
                placeholder="Select Religion"
                icon={FiGlobe}
                required
                errorKey="religion"
              />

              <SelectField
                label="Caste"
                value={preferences.caste}
                onChange={(value) => handleSelectChange("caste", value)}
                options={
                  preferences.religion
                    ? apiData.caste[preferences.religion.toLowerCase()] || []
                    : []
                }
                placeholder={
                  preferences.religion
                    ? "Select Caste"
                    : "Select Religion First"
                }
                icon={FiUsers}
                disabled={!preferences.religion}
                required={!!preferences.religion}
                errorKey="caste"
              />
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-100 px-6 py-4">
              <div className="flex items-center">
                <FiCoffee className="text-red-500 mr-3" size={20} />
                <h3 className="text-xl text-[#FF6B6B] font-semibold">
                  Lifestyle Preferences
                </h3>
              </div>
            </div>
            <div className="p-6">
              <SelectField
                label="Lifestyle"
                value={preferences.lifestyle}
                onChange={(value) => handleSelectChange("lifestyle", value)}
                options={apiData.lifestyle}
                placeholder="Select Lifestyle"
                icon={FiCoffee}
                required
                errorKey="lifestyle"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <button
            onClick={handleSavePreferences}
            type="submit"
            className="group cursor-pointer relative px-12 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-full text-black font-bold text-lg shadow-2xl hover:shadow-[#FF6B6B]/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6" />
              <span>
                {isEditMode ? "Update Preferences" : "Save Preferences"}
              </span>
              <ChevronsRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatrimonialProfile;