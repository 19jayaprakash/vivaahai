"use client"
import { useState, useRef, useEffect } from "react";
import { GiTabletopPlayers } from "react-icons/gi";
import {
  FaCarSide,
  FaCoffee,
  FaUtensils,
  FaGlassMartiniAlt,
  FaCheckCircle,
} from "react-icons/fa";
import {
  LuCalendar,
  LuClock,
  LuMapPin,
  LuStore,
  LuPencil,
  LuPencilOff,
  LuChevronDown,
  LuX,
  LuSend,
  LuRefreshCw,
} from "react-icons/lu";
import { FaCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
 
const ScheduleMeetScreen = () => {
  // Helper functions
  const generateRandomFutureDate = () => {
    const today = new Date();
    const futureDate = new Date(today);
    const randomDays = Math.floor(Math.random() * 30) + 1;
    futureDate.setDate(today.getDate() + randomDays);
    return futureDate;
  };
 
  const router = useRouter();
  const generateRandomFutureTime = () => {
    const time = new Date();
    const randomHour = Math.floor(Math.random() * 12) + 9;
    const randomMinutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    time.setHours(randomHour, randomMinutes, 0, 0);
    return time;
  };
 
  const sampleLocations = [
    "Writer's Café",
    "Chamiers Café",
    "Amelie's Café and Creamery",
    "The Marina Restaurant",
    "Bay View at Vivanta",
    "Mathsya Restaurant",
    "Barbeque Nation - Vadapalani",
    "10 Downing Street",
    "Cafe Coffee Day - Ashok Nagar",
    "Bay View at Vivanta",
    "Rayar's Mess",
  ];
 
  const venueOptions = [
    {
      label: "Cafe",
      value: "cafe",
      icon: FaCoffee,
      color: "#8B4513",
      gradient: ["#D4A574", "#8B4513"],
    },
    {
      label: "Restaurant",
      value: "restaurant",
      icon: FaUtensils,
      color: "#FF6B6B",
      gradient: ["#FF9A9E", "#FECFEF"],
    },
    {
      label: "Bar",
      value: "bar",
      icon: FaGlassMartiniAlt,
      color: "#4ECDC4",
      gradient: ["#4ECDC4", "#44A08D"],
    },
  ];
 
  const generateRandomLocation = (currentLocation = "") => {
    const currentIndex = sampleLocations.indexOf(currentLocation);
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * sampleLocations.length);
    } while (randomIndex === currentIndex && sampleLocations.length > 1);
    return sampleLocations[randomIndex];
  };
 
  const generateRandomVenueType = (currentVenueType = "") => {
    const currentIndex = venueOptions.findIndex(
      (v) => v.value === currentVenueType
    );
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * venueOptions.length);
    } while (randomIndex === currentIndex && venueOptions.length > 1);
    return venueOptions[randomIndex].value;
  };
 
  // State management
  const [selectedDate, setSelectedDate] = useState(generateRandomFutureDate());
  const [selectedTime, setSelectedTime] = useState(generateRandomFutureTime());
  const [location, setLocation] = useState(generateRandomLocation());
  const [venueType, setVenueType] = useState(generateRandomVenueType());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [bookTable, setBookTable] = useState(false);
  const [bookTravel, setBookTravel] = useState(false);
  const [showVenueOptions, setShowVenueOptions] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const locationInputRef = useRef(null);
 
  // Formatting functions
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
 
  const formatTime = (time) => {
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
 
  const validateDateTime = (date, time) => {
    const now = new Date();
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
    return selectedDateTime > now;
  };
 
  // Date picker functions
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
 
  const getMonthName = (monthIndex) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex];
  };
 
  const handleDateSelect = (day) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
    setShowDatePicker(false);
  };
 
  const changeMonth = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };
 
  const changeYear = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(newDate.getFullYear() + increment);
    setSelectedDate(newDate);
  };
 
  // Time picker functions
  const handleTimeSelect = (hours, minutes) => {
    const newTime = new Date(selectedTime);
    newTime.setHours(hours, minutes, 0, 0);
    setSelectedTime(newTime);
    setShowTimePicker(false);
  };
 
  // Event handlers
  const handleRefresh = () => {
    setSelectedDate(generateRandomFutureDate());
    setSelectedTime(generateRandomFutureTime());
    setLocation(generateRandomLocation(location));
    setVenueType(generateRandomVenueType(venueType));
    setErrors({});
  };
 
  const handleEdit = () => {
    const newEditableState = !isEditable;
    setIsEditable(newEditableState);
 
    if (newEditableState) {
      alert(
        "✏️ Edit Mode\nAll fields are now editable. You can modify the meeting details."
      );
    } else {
      if (locationInputRef.current) locationInputRef.current.blur();
      setIsInputFocused(false);
      alert("🔒 View Mode\nFields are now in view-only mode.");
    }
  };
 
  const validateForm = () => {
    const newErrors = {};
    if (!location.trim()) newErrors.location = "Location is required";
    if (!venueType) newErrors.venueType = "Please select a venue type";
    if (!validateDateTime(selectedDate, selectedTime))
      newErrors.datetime = "Please select a future date and time";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = () => {
    if (validateForm()) {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        router.back();
      }, 1500);
    } else {
      alert(
        "⚠️ Form Incomplete\nPlease fill in all required fields and ensure the date/time is in the future."
      );
    }
  };
 
  useEffect(() => {
    if (locationInputRef.current && isEditable && !isInputFocused) {
      locationInputRef.current.focus();
      setIsInputFocused(true);
    }
  }, [isEditable, isInputFocused]);
 
  // Custom Date Picker Component
  const DatePicker = ({ date, onSelect, onClose }) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
 
    // Generate days array including empty slots for alignment
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
 
    // Check if a day is today
    const isToday = (day) => {
      const today = new Date();
      return (
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear()
      );
    };
 
    // Check if a day is selected
    const isSelected = (day) => day === currentDay;
 
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
            <div className="flex justify-between items-center mb-3">
              <button
                onClick={() => changeYear(-1)}
                className="p-1.5 rounded-full cursor-pointer  hover:bg-white/20 transition-colors"
              >
                <span className="text-lg font-bold">«</span>
              </button>
              <h3 className="text-lg font-bold">{currentYear}</h3>
              <button
                onClick={() => changeYear(1)}
                className="p-1.5 rounded-full cursor-pointer  hover:bg-white/20 transition-colors"
              >
                <span className="text-lg font-bold">»</span>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => changeMonth(-1)}
                className="p-1.5 rounded-full cursor-pointer  hover:bg-white/20 transition-colors"
              >
                <span className="text-lg font-bold">‹</span>
              </button>
              <h3 className="text-lg font-bold">
                {getMonthName(currentMonth)}
              </h3>
              <button
                onClick={() => changeMonth(1)}
                className="p-1.5 rounded-full cursor-pointer  hover:bg-white/20 transition-colors"
              >
                <span className="text-lg font-bold">›</span>
              </button>
            </div>
          </div>
 
          <div className="p-3">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div
                  key={i}
                  className="text-center text-black text-sm font-medium py-1"
                >
                  {day}
                </div>
              ))}
            </div>
 
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, i) => (
                <button
                  key={i}
                  onClick={() => day && onSelect(day)}
                  disabled={!day}
                  className={`aspect-square cursor-pointer  rounded-lg flex items-center justify-center text-sm font-medium transition-colors
                    ${!day ? "invisible" : ""}
                    ${isToday(day) ? "border border-indigo-500" : ""}
                    ${
                      isSelected(day)
                        ? "bg-indigo-500 text-white"
                        : "hover:bg-gray-100 text-black"
                    }
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
 
          <div className="p-3 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 cursor-pointer  bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };
 
  // Custom Time Picker Component
  const TimePicker = ({ time, onSelect, onClose }) => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = [0, 15, 30, 45];
    const [selectedHour, setSelectedHour] = useState(
      time.getHours() % 12 || 12
    );
    const [selectedMinute, setSelectedMinute] = useState(time.getMinutes());
    const [isAM, setIsAM] = useState(time.getHours() < 12);
 
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 text-center">
            <h3 className="text-lg font-bold">Select Time</h3>
          </div>
 
          <div className="p-4">
            <div className="flex justify-center items-center mb-4 gap-2">
              <div className="bg-gray-50 rounded-lg p-1">
                <div className="h-32 overflow-y-auto scrollbar-hide">
                  {hours.map((hour) => (
                    <button
                      key={hour}
                      onClick={() => setSelectedHour(hour)}
                      className={`w-12 py-2 cursor-pointer  rounded-md text-sm text-black font-medium transition-colors
                        ${
                          selectedHour === hour
                            ? "bg-[#FF6B6B] text-white"
                            : "hover:bg-gray-200"
                        }
                      `}
                    >
                      {hour.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>
 
              <div className="bg-gray-50 rounded-lg p-1">
                <div className="h-32 overflow-y-auto scrollbar-hide">
                  {minutes.map((minute) => (
                    <button
                      key={minute}
                      onClick={() => setSelectedMinute(minute)}
                      className={`w-12 py-2 cursor-pointer text-black rounded-md text-sm font-medium transition-colors
                        ${
                          selectedMinute === minute
                            ? "bg-[#FF6B6B] text-white"
                            : "hover:bg-gray-200"
                        }
                      `}
                    >
                      {minute.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>
 
              <div className="bg-gray-50 rounded-lg p-1">
                <div className="h-32 overflow-y-auto scrollbar-hide">
                  <button
                    onClick={() => setIsAM(true)}
                    className={`w-12 py-2 cursor-pointer  text-black rounded-md text-sm font-medium transition-colors
                      ${isAM ? "bg-[#FF6B6B] text-white" : "hover:bg-gray-200"}
                    `}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => setIsAM(false)}
                    className={`w-12 py-2 cursor-pointer  rounded-md text-sm font-medium transition-colors
                      ${
                        !isAM ? "bg-[#FF6B6B] text-white" : "hover:bg-gray-200"
                      }
                    `}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>
 
            <div className="text-center text-lg font-bold mb-4 text-gray-700">
              {selectedHour.toString().padStart(2, "0")}:
              {selectedMinute.toString().padStart(2, "0")} {isAM ? "AM" : "PM"}
            </div>
          </div>
 
          <div className="p-3 border-t border-gray-200 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 cursor-pointer  bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                onSelect(
                  isAM ? selectedHour : selectedHour + 12,
                  selectedMinute
                )
              }
              className="px-4 py-2 cursor-pointer  bg-[#FF6B6B] text-white rounded-lg hover:bg-pink-600 transition-colors text-sm"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
 
  return (
   <div className=" bg-gray-50">
      <div className="max-w-lg mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-[#FF6B6B] text-white">
            <div className="px-4 py-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">Schedule Meet</h1>
                  <p className="text-sm text-white/80">Plan your perfect gathering</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleRefresh}
                    className="p-2 rounded-lg cursor-pointer  bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <LuRefreshCw size={20} />
                  </button>
                  <button
                    onClick={handleEdit}
                    className={`p-2 rounded-lg transition-colors cursor-pointer  ${
                      isEditable ? "bg-white/20" : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {isEditable ? <LuPencilOff size={20} /> : <LuPencil size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
 
          {/* Form Content */}
          <div className="p-4 space-y-4">
            {/* Date & Time Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  📅 Date
                </label>
                <button
                  onClick={() => isEditable && setShowDatePicker(true)}
                  disabled={!isEditable}
                  className={`w-full bg-gray-50 border rounded-lg p-3 cursor-pointer  text-left transition-colors ${
                    errors.date || errors.datetime
                      ? "border-red-300"
                      : "border-gray-200 hover:border-indigo-300"
                  } ${!isEditable ? "opacity-70" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <LuCalendar size={16} className="text-indigo-500" />
                    <span className="text-sm font-medium truncate text-black">
                      {selectedDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </button>
              </div>
 
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  ⏰ Time
                </label>
                <button
                  onClick={() => isEditable && setShowTimePicker(true)}
                  disabled={!isEditable}
                  className={`w-full bg-gray-50  cursor-pointer border rounded-lg p-3 text-left transition-colors ${
                    errors.time || errors.datetime
                      ? "border-red-300"
                      : "border-gray-200 hover:border-pink-300"
                  } ${!isEditable ? "opacity-70" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <LuClock size={16} className="text-pink-500" />
                    <span className="text-sm font-medium text-black">
                      {formatTime(selectedTime)}
                    </span>
                  </div>
                </button>
              </div>
            </div>
           
            {(errors.datetime) && (
              <p className="text-red-500 text-xs">{errors.datetime}</p>
            )}
 
            {/* Location Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                📍 Location
              </label>
              <div className={`bg-gray-50 border rounded-lg transition-colors ${
                errors.location ? "border-red-300" : "border-gray-200 focus-within:border-emerald-300"
              }`}>
                <div className="flex items-center p-3 gap-2">
                  <LuMapPin size={16} className="text-emerald-500" />
                  <input
                    ref={locationInputRef}
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      if (errors.location)
                        setErrors((prev) => ({ ...prev, location: null }));
                    }}
                    disabled={!isEditable}
                    className={`flex-1 text-sm font-medium outline-none bg-transparent placeholder-gray-400 ${
                      !isEditable ? "text-gray-500" : "text-gray-800"
                    }`}
                    placeholder="Enter location"
                  />
                </div>
              </div>
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">{errors.location}</p>
              )}
            </div>
 
            {/* Venue Type Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                🏢 Venue Type
              </label>
              <button
                onClick={() => isEditable && setShowVenueOptions(true)}
                disabled={!isEditable}
                className={`w-full bg-gray-50 border cursor-pointer  rounded-lg p-3 text-left transition-colors ${
                  errors.venueType ? "border-red-300" : "border-gray-200 hover:border-purple-300"
                } ${!isEditable ? "opacity-70" : ""}`}
              >
                <div className="flex items-center gap-2">
                  {venueType ? (
                    venueOptions
                      .find((v) => v.value === venueType)
                      ?.icon({
                        size: 16,
                        color: venueOptions.find((v) => v.value === venueType)
                          ?.color,
                      })
                  ) : (
                    <LuStore size={16} className="text-purple-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    !venueType ? "text-gray-400" : "text-gray-800"
                  }`}>
                    {venueType
                      ? venueOptions.find((v) => v.value === venueType)?.label
                      : "Select venue type"}
                  </span>
                  {isEditable && <LuChevronDown size={16} className="text-gray-400 ml-auto" />}
                </div>
              </button>
              {errors.venueType && (
                <p className="text-red-500 text-xs mt-1">{errors.venueType}</p>
              )}
            </div>
 
            {/* Additional Options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setBookTable(!bookTable)}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer  ${
                  bookTable
                    ? "border-[#FF6B6B] bg-orange-100"
                    : "border-gray-200 "
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <GiTabletopPlayers
                    size={20}
                    color={bookTable ? "#6366f1" : "#9ca3af"}
                  />
                  <span className={`text-xs font-medium ${
                    bookTable ? "text-indigo-700" : "text-gray-600"
                  }`}>
                    Book Table
                  </span>
                </div>
              </button>
 
              <button
                onClick={() => setBookTravel(!bookTravel)}
                className={`p-3 rounded-lg cursor-pointer border-2 transition-all ${
                  bookTravel
                    ? "border-[#FF6B6B] bg-orange-100"
                    : "border-gray-200"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <FaCarSide
                    size={20}
                    color={bookTravel ? "#10b981" : "#9ca3af"}
                  />
                  <span className={`text-xs font-medium ${
                    bookTravel ? "text-emerald-700" : "text-gray-600"
                  }`}>
                    Book Travel
                  </span>
                </div>
              </button>
            </div>
 
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full cursor-pointer  bg-[#FF6B6B] text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                <LuSend size={16} />
                <span>Schedule Meeting</span>
              </div>
            </button>
          </div>
        </div>
      </div>
 
      {/* Date Picker Modal */}
      {showDatePicker && (
        <DatePicker
          date={selectedDate}
          onSelect={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
        />
      )}
 
      {/* Time Picker Modal */}
      {showTimePicker && (
        <TimePicker
          time={selectedTime}
          onSelect={handleTimeSelect}
          onClose={() => setShowTimePicker(false)}
        />
      )}
 
      {/* Venue Options Modal */}
      {showVenueOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold">Select Venue Type</h3>
              <button
                onClick={() => setShowVenueOptions(false)}
                className="p-1 rounded-full cursor-pointer  hover:bg-white/20 transition-colors"
              >
                <LuX size={18} />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {venueOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setVenueType(option.value);
                    setShowVenueOptions(false);
                    if (errors.venueType)
                      setErrors((prev) => ({ ...prev, venueType: null }));
                  }}
                  className={`w-full cursor-pointer  flex items-center p-3 rounded-lg border-2 transition-all ${
                    venueType === option.value
                      ? "border-current bg-gradient-to-r"
                      : "border-gray-200 hover:border-gray-300 bg-gray-50"
                  }`}
                  style={
                    venueType === option.value
                      ? {
                          background: `linear-gradient(135deg, ${option.gradient[0]}, ${option.gradient[1]})`,
                          borderColor: option.color,
                        }
                      : {}
                  }
                >
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mr-3">
                    <option.icon
                      size={18}
                      color={
                        venueType === option.value ? "#fff" : option.color
                      }
                    />
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      venueType === option.value ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </span>
                  {venueType === option.value && (
                    <FaCheckCircle size={16} color="#fff" className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
 
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCircleCheck size={32} color="#10b981" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Meeting Scheduled!
            </h3>
            <p className="text-gray-600 text-sm">
              Your meeting has been successfully scheduled for{" "}
              <span className="font-semibold">
                {formatDate(selectedDate)} at {formatTime(selectedTime)}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default ScheduleMeetScreen;