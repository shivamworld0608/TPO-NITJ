import React, { useState } from "react";

function VehicleTab({ wantVehicle, setWantVehicle, vehicleDetails, setVehicleDetails, onNext }) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!vehicleDetails.passengers) newErrors.passengers = "Number of visitors is required.";
    if (!vehicleDetails.pickup) newErrors.pickup = "Pickup location is required.";
    if (!vehicleDetails.pickupTime) newErrors.pickupTime = "Pickup date and time are required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const renderVehicleForm = () => (
    <div className="space-y-4 mt-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Visitors *</label>
          <input
            type="number"
            value={vehicleDetails.passengers || ""}
            onChange={(e) =>
              setVehicleDetails({ ...vehicleDetails, passengers: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1"
          />
          {errors.passengers && (
            <p className="text-red-500 text-sm mt-1">{errors.passengers}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pickup Location *</label>
          <input
            type="text"
            value={vehicleDetails.pickup || ""}
            onChange={(e) =>
              setVehicleDetails({ ...vehicleDetails, pickup: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.pickup && (
            <p className="text-red-500 text-sm mt-1">{errors.pickup}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pickup Date & Time *
          </label>
          <input
            type="datetime-local"
            value={vehicleDetails.pickupTime || ""}
            onChange={(e) =>
              setVehicleDetails({ ...vehicleDetails, pickupTime: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.pickupTime && (
            <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
          <textarea
            value={vehicleDetails.notes || ""}
            onChange={(e) =>
              setVehicleDetails({ ...vehicleDetails, notes: e.target.value })
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
        Do you need transportation?
      </h2>
      <div className="flex gap-4">
        <button
          onClick={() => setWantVehicle(true)}
          className={`flex-1 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
            wantVehicle === true
              ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => {
            setWantVehicle(false);
            onNext();
          }}
          className={`flex-1 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
            wantVehicle === false
              ? "bg-red-500 text-white shadow-lg shadow-red-200"
              : "bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          No
        </button>
      </div>
      {wantVehicle === true && renderVehicleForm()}
    </div>
  );
}

export default VehicleTab;