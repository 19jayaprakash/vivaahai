"use client";
import { useState, useRef, useEffect } from "react";
import { GiTabletopPlayers } from "react-icons/gi";
import {
  FaCarSide,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaStore,
  FaCoffee,
  FaUtensils,
  FaGlassMartiniAlt,
  FaPencilAlt,
  FaPencilSlash,
  FaChevronDown,
  FaCheckCircle,
  FaTimes,
  FaPaperPlane,
  FaSyncAlt,
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

const ScheduleMeetScreen = () => {
  // Helper functions
  const generateRandomFutureDate = () => {
    const today = new Date();
    const futureDate = new Date(today);
    const randomDays = Math.floor(Math.random() * 30) + 1;
    futureDate.setDate(today.getDate() + randomDays);
    return futureDate;
  };

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

  const getWeekdayName = (dayIndex) => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekdays[dayIndex];
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
        <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-xl">
          <div className="bg-indigo-600 text-white p-5">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => changeYear(-1)}
                className="p-2 rounded-full hover:bg-indigo-700"
              >
                <span className="text-xl font-bold text-white">«</span>
              </button>
              <h3 className="text-xl font-bold text-white">{currentYear}</h3>
              <button
                onClick={() => changeYear(1)}
                className="p-2 rounded-full hover:bg-indigo-700"
              >
                <span className="text-xl font-bold text-white">»</span>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 rounded-full hover:bg-indigo-700 "
              >
                <span className="text-xl font-bold text-white">‹</span>
              </button>
              <h3 className="text-xl font-bold text-white">
                {getMonthName(currentMonth)}
              </h3>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 rounded-full hover:bg-indigo-700 "
              >
                <span className="text-xl font-bold text-white">›</span>
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-7 gap-2 mb-3 text-black">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div
                  key={i}
                  className="text-center text-black text-sm font-medium"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-black">
              {days.map((day, i) => (
                <button
                  key={i}
                  onClick={() => day && onSelect(day)}
                  disabled={!day}
                  className={`aspect-square rounded-full flex items-center text-black  justify-center text-lg font-medium
                    ${!day ? "invisible" : ""}
                    ${isToday(day) ? "border-2 border-indigo-500" : ""}
                    ${
                      isSelected(day)
                        ? "bg-indigo-500 text-white"
                        : "hover:bg-gray-100 text-gray-800"
                    }
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 "
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
        <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-xl">
          <div className="bg-[#FF6B6B] text-white p-5 text-center">
            <h3 className="text-xl font-bold text-white">Select Time</h3>
          </div>

          <div className="p-6">
            <div className="flex justify-center items-center mb-6 gap-4">
              <div className="bg-gray-100 rounded-xl p-2">
                <div className="h-48 overflow-y-auto scrollbar-hide">
                  {hours.map((hour) => (
                    <button
                      key={hour}
                      onClick={() => setSelectedHour(hour)}
                      className={`w-16 py-3 rounded-lg text-lg font-medium
                        ${
                          selectedHour === hour
                            ? "bg-[#FF6B6B] text-white"
                            : "hover:bg-gray-200 text-gray-800"
                        }
                      `}
                    >
                      {hour.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl p-2">
                <div className="h-48 overflow-y-auto scrollbar-hide">
                  {minutes.map((minute) => (
                    <button
                      key={minute}
                      onClick={() => setSelectedMinute(minute)}
                      className={`w-16 py-3 rounded-lg text-lg font-medium
                        ${
                          selectedMinute === minute
                            ? "bg-[#FF6B6B] text-white"
                            : "hover:bg-gray-200 text-gray-800"
                        }
                      `}
                    >
                      {minute.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl p-2">
                <div className="h-48 overflow-y-auto scrollbar-hide">
                  <button
                    onClick={() => setIsAM(true)}
                    className={`w-16 py-3 rounded-lg text-lg font-medium
                      ${
                        isAM
                          ? "bg-[#FF6B6B] text-white"
                          : "hover:bg-gray-200 text-gray-800"
                      }
                    `}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => setIsAM(false)}
                    className={`w-16 py-3 rounded-lg text-lg font-medium
                      ${
                        !isAM
                          ? "bg-[#FF6B6B] text-white"
                          : "hover:bg-gray-200 text-gray-800"
                      }
                    `}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center text-xl font-bold mb-6 text-gray-800">
              {selectedHour.toString().padStart(2, "0")}:
              {selectedMinute.toString().padStart(2, "0")} {isAM ? "AM" : "PM"}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
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
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc]">
      <div className="absolute inset-0 h-[45vh] bg-gradient-to-b from-[#FF6B6B] to-[#FF8E8E]"></div>
      <div className="absolute inset-0 h-[45vh] bg-[#FF6B6B] opacity-80"></div>
      <div className="absolute inset-0 h-[45vh] bg-[#FF6B6B] opacity-60"></div>
      <div className="relative z-10">
        <header className="px-7 pt-12 pb-10">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
              Schedule Meet
            </h1>
            <p className="text-lg text-white/95 font-medium mb-5">
              Plan your perfect gathering ✨
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/80"></div>
              <div className="w-8 h-0.5 bg-white/60 rounded"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/80"></div>
            </div>
          </div>
          <div className="flex justify-center gap-10 mt-6">
            <button
              onClick={handleRefresh}
              className="p-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <LuRefreshCw size={35} color="#fff" />
            </button>
            <button
              onClick={handleEdit}
              className={`p-3 rounded-lg ${
                !isEditable ? "bg-white/15" : "hover:bg-white/10"
              } transition-colors`}
            >
              {isEditable ? (
                <LuPencilOff size={35} color="#fff" />
              ) : (
                <LuPencil size={35} color="#fff" />
              )}
            </button>
          </div>
        </header>

    <div className="bg-white dark:bg-gray-900 mx-6 rounded-3xl p-7 shadow-xl">
  {/* Date Picker */}
  <div className="mb-6">
    <label className="block text-sm font-bold text-gray-800 dark:text-black mb-3">
      📅 Date
    </label>
    <button
      onClick={() => isEditable && setShowDatePicker(true)}
      disabled={!isEditable}
      className={`w-full flex cursor-pointer bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl overflow-hidden shadow-sm ${
        errors.date || errors.datetime ? "border-red-500" : "border-gray-200 dark:border-gray-700"
      } ${!isEditable ? "opacity-70 cursor-default" : "hover:border-gray-300"}`}
    >
      <div className="flex items-center px-5 py-4">
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-300 flex items-center justify-center mr-4">
          <LuCalendar size={22} color="#667eea" />
        </div>
        <span className="flex-1 text-base font-semibold text-black dark:text-black">
          {formatDate(selectedDate)}
        </span>
        {isEditable && <LuChevronDown size={20} color="#9ca3af" />}
      </div>
    </button>
    {(errors.date || errors.datetime) && (
      <p className="text-red-500 text-xs font-semibold mt-2 ml-1.5">
        {errors.date || errors.datetime}
      </p>
    )}
  </div>

  {/* Time Picker */}
  <div className="mb-6">
    <label className="block text-sm font-bold text-gray-800 dark:text-black mb-3">
      ⏰ Time
    </label>
    <button
      onClick={() => isEditable && setShowTimePicker(true)}
      disabled={!isEditable}
      className={`w-full flex cursor-pointer bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl overflow-hidden shadow-sm ${
        errors.time || errors.datetime ? "border-red-500" : "border-gray-200 dark:border-gray-700"
      } ${!isEditable ? "cursor-default" : "hover:border-gray-300"}`}
    >
      <div className="flex items-center px-5 py-4">
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-300 flex items-center justify-center mr-4">
          <LuClock size={22} color="#667eea" />
        </div>
        <span className="flex-1 text-base font-semibold text-black dark:text-black">
          {formatTime(selectedTime)}
        </span>
        {isEditable && <LuChevronDown size={20} color="#9ca3af" />}
      </div>
    </button>
    {(errors.time || errors.datetime) && (
      <p className="text-red-500 text-xs font-semibold mt-2 ml-1.5">
        {errors.time || errors.datetime}
      </p>
    )}
  </div>

  {/* Location Input */}
  <div className="mb-6">
    <label className="block text-sm font-bold text-gray-800 dark:text-black mb-3">
      📍 Location
    </label>
    <div
      className={`w-full bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl overflow-hidden shadow-sm ${
        errors.location ? "border-red-500" : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="flex items-center px-5 py-4">
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-300 flex items-center justify-center mr-4">
          <LuMapPin size={22} color="#667eea" />
        </div>
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
          className="flex-1 cursor-pointer text-base font-medium outline-none bg-transparent text-black dark:text-black"
        />
      </div>
    </div>
    {errors.location && (
      <p className="text-red-500 text-xs font-semibold mt-2 ml-1.5">
        {errors.location}
      </p>
    )}
  </div>

  {/* Venue Type */}
  <div className="mb-6">
    <label className="block text-sm font-bold text-gray-800 dark:text-black mb-3">
      🏢 Venue Type
    </label>
    <button
      onClick={() => isEditable && setShowVenueOptions(true)}
      disabled={!isEditable}
      className={`w-full cursor-pointer flex bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl overflow-hidden shadow-sm ${
        errors.venueType ? "border-red-500" : "border-gray-200 dark:border-gray-700"
      } ${!isEditable ? "cursor-default" : "hover:border-gray-300"}`}
    >
      <div className="flex items-center px-5 py-4">
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-300 flex items-center justify-center mr-4">
          {venueType ? (
            venueOptions
              .find((v) => v.value === venueType)
              ?.icon({
                size: 22,
                color: venueOptions.find((v) => v.value === venueType)?.color,
              })
          ) : (
            <LuStore size={22} color="#667eea" />
          )}
        </div>
        <span className="flex-1 text-base font-semibold text-black dark:text-black">
          {venueType
            ? venueOptions.find((v) => v.value === venueType)?.label
            : "Select venue type"}
        </span>
        {isEditable && <LuChevronDown size={20} color="#9ca3af" />}
      </div>
    </button>
    {errors.venueType && (
      <p className="text-red-500 text-xs font-semibold mt-2 ml-1.5">
        {errors.venueType}
      </p>
    )}
  </div>

  {/* Book Table & Travel */}
  <div className="mb-7">
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => setBookTable(!bookTable)}
        className={`rounded-2xl cursor-pointer overflow-hidden shadow-md ${
          bookTable ? "shadow-indigo-200" : "shadow-gray-200"
        }`}
      >
        <div
          className={`flex flex-col items-center py-6 px-4 gap-3 ${
            bookTable ? "bg-[#FF6B6B]" : "bg-gray-50 dark:bg-gray-800"
          }`}
        >
          <GiTabletopPlayers
            size={26}
            color={bookTable ? "#fff" : "#667eea"}
          />
          <span
            className={`text-sm font-semibold ${
              bookTable ? "text-white" : "text-gray-700 dark:text-black"
            }`}
          >
            Book Table
          </span>
        </div>
      </button>

      <button
        onClick={() => setBookTravel(!bookTravel)}
        className={`rounded-2xl cursor-pointer overflow-hidden shadow-md ${
          bookTravel ? "shadow-indigo-200" : "shadow-gray-200"
        }`}
      >
        <div
          className={`flex flex-col items-center py-6 px-4 gap-3 ${
            bookTravel ? "bg-[#FF6B6B]" : "bg-gray-50 dark:bg-gray-800"
          }`}
        >
          <FaCarSide size={26} color={bookTravel ? "#fff" : "#667eea"} />
          <span
            className={`text-sm font-semibold ${
              bookTravel ? "text-white" : "text-gray-700 dark:text-black"
            }`}
          >
            Book Travel
          </span>
        </div>
      </button>
    </div>
  </div>

  {/* Submit Button */}
  <button
    onClick={handleSubmit}
    className="w-full cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-[#FF6B6B] hover:bg-[#FF6B6B] transition-colors"
  >
    <div className="flex items-center justify-center py-5 gap-3">
      <LuSend size={22} color="#fff" />
      <span className="text-white text-lg font-bold tracking-wide">
        Send Request 🚀
      </span>
    </div>
  </button>
</div>

      </div>

      {showDatePicker && (
        <DatePicker
          date={selectedDate}
          onSelect={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {showTimePicker && (
        <TimePicker
          time={selectedTime}
          onSelect={handleTimeSelect}
          onClose={() => setShowTimePicker(false)}
        />
      )}

      {showVenueOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white rounded-t-3xl w-full max-h-[75vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">
                Select Venue Type
              </h3>
              <button
                onClick={() => setShowVenueOptions(false)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <LuX size={24} color="#6b7280" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {venueOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setVenueType(option.value);
                      setShowVenueOptions(false);
                      if (errors.venueType)
                        setErrors((prev) => ({ ...prev, venueType: null }));
                    }}
                    className={`w-full rounded-2xl overflow-hidden shadow-sm mb-3 ${
                      venueType === option.value
                        ? "shadow-indigo-200"
                        : "shadow-gray-100"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-4 px-5 py-4 ${
                        venueType === option.value
                          ? "bg-indigo-500"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center flex-1">
                        <IconComponent size={28} color={option.color} />
                        <span
                          className={`ml-4 text-base font-semibold ${
                            venueType === option.value
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          {option.label}
                        </span>
                      </div>
                      {venueType === option.value && (
                        <FaCircleCheck size={22} color="#fff" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 mx-10 shadow-2xl text-center">
            <div className="animate-bounce mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <FaCheckCircle size={48} color="#10B981" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-800 mb-3">
              🎉 Request Sent!
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;ll get back to you soon with confirmation details.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-8 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 "
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleMeetScreen;
