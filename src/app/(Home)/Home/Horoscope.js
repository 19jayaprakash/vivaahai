"use client";
import React from "react";
import { X, CheckCircle2, Plus } from "lucide-react";

const HoroscopePopup = ({
  open,
  onClose,
  horoscopeExists,
  horoscopeData,
  horoscopeForm,
  handleInputChange,
  handleHoroscopeSubmit,
  isSubmitting,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 text-black"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {horoscopeExists ? "Horoscope Details" : "Add Horoscope"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {!horoscopeExists ? (
          <form onSubmit={handleHoroscopeSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Birth Place *
              </label>
              <input
                name="birthPlace"
                type="text"
                value={horoscopeForm.birthPlace}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g. Mumbai, Maharashtra"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Birth Time *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { field: "hour", label: "Hour", max: 24 },
                  { field: "minute", label: "Minute", max: 60 },
                  { field: "second", label: "Second", max: 60 },
                ].map(({ field, label, max }) => (
                  <div key={field}>
                    <label className="block text-xs text-gray-500 mb-1">
                      {label}
                    </label>
                    <select
                      name={field}
                      value={horoscopeForm[field]}
                      onChange={handleInputChange}
                      className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      required
                      disabled={isSubmitting}
                    >
                      {Array.from({ length: max }, (_, i) => {
                        const val = i.toString().padStart(2, "0");
                        return (
                          <option key={val} value={val}>
                            {val}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Select your exact birth time (24-hour format)
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 cursor-pointer px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isSubmitting || !horoscopeForm.birthPlace.trim()}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Creating...
                  </>
                ) : (
                  "Create Horoscope"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
  <div className="bg-purple-50 p-4 rounded-lg">
    <h3 className="font-semibold text-purple-800 mb-2">
      Your Horoscope Details
    </h3>
    <div className="space-y-2 text-sm text-gray-700">
      <div className="flex justify-between">
        <span>Birth Date:</span>
        <span className="font-medium">{horoscopeData?.birthDate}</span>
      </div>
      <div className="flex justify-between">
        <span>Birth Time:</span>
        <span className="font-medium">{horoscopeData?.birthTime}</span>
      </div>
      <div className="flex justify-between">
        <span>Birth Place:</span>
        <span className="font-medium">{horoscopeData?.birthPlace}</span>
      </div>
      <div className="flex justify-between">
        <span>Latitude:</span>
        <span className="font-medium">{horoscopeData?.birthLatitude}</span>
      </div>
      <div className="flex justify-between">
        <span>Longitude:</span>
        <span className="font-medium">{horoscopeData?.birthLongitude}</span>
      </div>
      <div className="flex justify-between">
        <span>Timezone:</span>
        <span className="font-medium">{horoscopeData?.birthTimeZone}</span>
      </div>
      <div className="flex justify-between">
        <span>Gender:</span>
        <span className="font-medium capitalize">{horoscopeData?.gender}</span>
      </div>
      <div className="flex justify-between">
        <span>Rashi:</span>
        <span className="font-medium">{horoscopeData?.rashi}</span>
      </div>
      <div className="flex justify-between">
        <span>Nakshatra:</span>
        <span className="font-medium">{horoscopeData?.nakshatra}</span>
      </div>
      <div className="flex justify-between">
        <span>Lagna:</span>
        <span className="font-medium">{horoscopeData?.lagna}</span>
      </div>
      <div className="flex justify-between">
        <span>Sun Sign:</span>
        <span className="font-medium">{horoscopeData?.sunSign}</span>
      </div>
      <div className="flex justify-between">
        <span>Moon Sign:</span>
        <span className="font-medium">{horoscopeData?.moonSign}</span>
      </div>
    </div>
  </div>

  <button
    onClick={onClose}
    className="w-full cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
  >
    Close
  </button>
</div>

        )}
      </div>
    </div>
  );
};

export default HoroscopePopup;
