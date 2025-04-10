import React, { useState } from "react";

function RoomTab({
  wantRoom,
  setWantRoom,
  roomDetails,
  setRoomDetails,
  onNext,
}) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!roomDetails.numberOfRooms)
      newErrors.numberOfRooms = "This field is required.";
    if (!roomDetails.arrivalDate)
      newErrors.arrivalDate = "This field is required.";
    if (!roomDetails.departureDate)
      newErrors.departureDate = "This field is required.";
    if (!roomDetails.arrivalTime)
      newErrors.arrivalTime = "This field is required.";
    if (!roomDetails.departureTime)
      newErrors.departureTime = "This field is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const renderRoomForm = () => (
    <div className="mt-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Accommodation Details
          </h3>
          <p className="text-gray-600 mt-2">
            Please provide your room booking requirements
          </p>
        </div>

        <div className="grid gap-6">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="grid gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Rooms <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={roomDetails.numberOfRooms || ""}
                  onChange={(e) =>
                    setRoomDetails({
                      ...roomDetails,
                      numberOfRooms: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                  min="1"
                  placeholder="Enter number of rooms"
                />
                {errors.numberOfRooms && (
                  <p className="text-red-500 text-xs mt-1">{errors.numberOfRooms}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Arrival Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={roomDetails.arrivalDate || ""}
                    onChange={(e) =>
                      setRoomDetails({ ...roomDetails, arrivalDate: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                  />
                  {errors.arrivalDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.arrivalDate}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Arrival Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={roomDetails.arrivalTime || ""}
                    onChange={(e) =>
                      setRoomDetails({ ...roomDetails, arrivalTime: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                  />
                  {errors.arrivalTime && (
                    <p className="text-red-500 text-xs mt-1">{errors.arrivalTime}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Departure Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={roomDetails.departureDate || ""}
                    onChange={(e) =>
                      setRoomDetails({ ...roomDetails, departureDate: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                  />
                  {errors.departureDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.departureDate}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Departure Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={roomDetails.departureTime || ""}
                    onChange={(e) =>
                      setRoomDetails({ ...roomDetails, departureTime: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                  />
                  {errors.departureTime && (
                    <p className="text-red-500 text-xs mt-1">{errors.departureTime}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={roomDetails.notes || ""}
              onChange={(e) =>
                setRoomDetails({ ...roomDetails, notes: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
              rows={3}
              placeholder="Enter any special requirements or preferences..."
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full mt-6 py-4 px-6 bg-custom-blue text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 transition-colors text-lg"
      >
        Continue to Next Step
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-custom-blue mb-2">
          Accommodation
        </h2>
        <p className="text-custom-blue">
          Would you like to book accommodation for your stay?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <button
          onClick={() => setWantRoom(true)}
          className={`px-6 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
            wantRoom
              ? "bg-custom-blue text-white hover:bg-custom-blue shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => {
            setWantRoom(false);
            onNext();
          }}
          className={`px-6 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
            wantRoom === false
              ? "bg-red-500 text-white hover:bg-red-600 shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          No
        </button>
      </div>
      {wantRoom && renderRoomForm()}
    </div>
  );
}

export default RoomTab;
