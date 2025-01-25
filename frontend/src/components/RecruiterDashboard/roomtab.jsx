import React, { useState } from "react";

function RoomTab({
  wantRoom,
  setWantRoom,
  roomDetails,
  setRoomDetails,
  onNext,
}) {
  const [errors, setErrors] = useState({});

  // Validate all required fields
  const validateForm = () => {
    const newErrors = {};
    if (!roomDetails.numberOfRooms)
      newErrors.numberOfRooms = "Number of rooms is required.";
    if (!roomDetails.arrivalDate)
      newErrors.arrivalDate = "Arrival date is required.";
    if (!roomDetails.departureDate)
      newErrors.departureDate = "Departure date is required.";
    if (!roomDetails.arrivalTime)
      newErrors.arrivalTime = "Arrival time is required.";
    if (!roomDetails.departureTime)
      newErrors.departureTime = "Departure time is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const renderRoomForm = () => (
    <div className="space-y-4 mt-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Rooms <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={roomDetails.numberOfRooms}
            onChange={(e) =>
              setRoomDetails({
                ...roomDetails,
                numberOfRooms: Number(e.target.value),
              })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.numberOfRooms && (
            <p className="text-red-500 text-sm">{errors.numberOfRooms}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Arrival Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={roomDetails.arrivalDate}
              onChange={(e) =>
                setRoomDetails({ ...roomDetails, arrivalDate: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.arrivalDate && (
              <p className="text-red-500 text-sm">{errors.arrivalDate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Arrival Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={roomDetails.arrivalTime}
              onChange={(e) =>
                setRoomDetails({ ...roomDetails, arrivalTime: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.arrivalTime && (
              <p className="text-red-500 text-sm">{errors.arrivalTime}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Departure Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={roomDetails.departureDate}
              onChange={(e) =>
                setRoomDetails({
                  ...roomDetails,
                  departureDate: e.target.value,
                })
              }
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.departureDate && (
              <p className="text-red-500 text-sm">{errors.departureDate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Departure Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={roomDetails.departureTime}
              onChange={(e) =>
                setRoomDetails({
                  ...roomDetails,
                  departureTime: e.target.value,
                })
              }
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.departureTime && (
              <p className="text-red-500 text-sm">{errors.departureTime}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            value={roomDetails.notes || ""}
            onChange={(e) =>
              setRoomDetails({ ...roomDetails, notes: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
      </div>
      <button
        onClick={handleNext}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-900">
        Do you need accommodation?
      </h2>
      <div className="flex gap-4">
        <button
          onClick={() => setWantRoom(true)}
          className={`flex-1 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
            wantRoom === true
              ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => {
            setWantRoom(false);
            onNext();
          }}
          className={`flex-1 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
            wantRoom === false
              ? "bg-red-500 text-white shadow-lg shadow-red-200"
              : "bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          No
        </button>
      </div>
      {wantRoom === true && renderRoomForm()}
    </div>
  );
}

export default RoomTab;
