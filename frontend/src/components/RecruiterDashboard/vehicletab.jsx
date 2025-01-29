import React, { useState } from "react";

const InputField = ({ label, type = "text", value, onChange, placeholder, error }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-custom-blue focus:outline-none bg-white"
      placeholder={placeholder}
      required
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const JourneySection = ({ title, details, setDetails, errors }) => (
  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
    <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Pickup Location"
        value={details.pickupLocation}
        onChange={(e) => setDetails({ ...details, pickupLocation: e.target.value })}
        placeholder="Enter pickup location"
        error={errors.pickupLocation}
      />
      <InputField
        label="Drop Location"
        value={details.dropLocation}
        onChange={(e) => setDetails({ ...details, dropLocation: e.target.value })}
        placeholder="Enter drop location"
        error={errors.dropLocation}
      />
      <InputField
        label="Pickup Date & Time"
        type="datetime-local"
        value={details.pickupDateTime}
        onChange={(e) => setDetails({ ...details, pickupDateTime: e.target.value })}
        error={errors.pickupDateTime}
      />
    </div>
  </div>
);

function VehicleTab({ wantVehicle, setWantVehicle, vehicleDetails, setVehicleDetails, onNext }) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    ["passengers", "pickupLocation", "dropLocation", "pickupDateTime"].forEach((field) => {
      if (!vehicleDetails[field]) newErrors[field] = "This field is required.";
    });

    if (vehicleDetails.returnJourney) {
      ["returnPickupLocation", "returnDropLocation", "returnDateTime"].forEach((field) => {
        if (!vehicleDetails[field]) newErrors[field] = "This field is required.";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-custom-blue mb-2">Transportation</h2>
        <p className="text-custom-blue">Would you like to arrange transportation for your event?</p>
      </div>

      {/* Yes / No Buttons */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <button
          onClick={() => setWantVehicle(true)}
          className={`px-6 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
            wantVehicle ? "bg-custom-blue text-white hover:bg-custom-blue shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => {
            setWantVehicle(false);
            onNext();
          }}
          className={`px-6 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
            wantVehicle === false ? "bg-red-500 text-white hover:bg-red-600 shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          No
        </button>
      </div>

      {/* Transportation Details Form */}
      {wantVehicle && (
        <div className="mt-8 bg-white rounded-xl shadow-lg border p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Transportation Details</h3>
          <p className="text-gray-600 mb-6">Please provide your transportation requirements</p>

          {/* Basic Details */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Basic Details</h4>
            <InputField
              label="Number of Visitors"
              type="number"
              value={vehicleDetails.passengers}
              onChange={(e) =>
                setVehicleDetails({ ...vehicleDetails, passengers: e.target.value })
              }
              placeholder="Enter number of passengers"
              error={errors.passengers}
            />
          </div>

          {/* Arrival Journey */}
          <JourneySection
            title="Arrival Journey"
            details={vehicleDetails}
            setDetails={setVehicleDetails}
            errors={errors}
          />

          {/* Return Journey Details */}
          {vehicleDetails.returnJourney && (
            <JourneySection
              title="Return Journey"
              details={{
                pickupLocation: vehicleDetails.returnPickupLocation,
                dropLocation: vehicleDetails.returnDropLocation,
                pickupDateTime: vehicleDetails.returnDateTime,
              }}
              setDetails={(updatedDetails) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  returnPickupLocation: updatedDetails.pickupLocation,
                  returnDropLocation: updatedDetails.dropLocation,
                  returnDateTime: updatedDetails.pickupDateTime,
                })
              }
              errors={{
                pickupLocation: errors.returnPickupLocation,
                dropLocation: errors.returnDropLocation,
                pickupDateTime: errors.returnDateTime,
              }}
            />
          )}

          {/* Return Journey Toggle */}
          <div className="flex items-center space-x-3 mt-4">
            <input
              type="checkbox"
              id="returnJourney"
              checked={vehicleDetails.returnJourney || false}
              onChange={(e) =>
                setVehicleDetails({ ...vehicleDetails, returnJourney: e.target.checked })
              }
              className="w-4 h-4 text-custom-blue border-gray-300 rounded"
            />
            <label htmlFor="returnJourney" className="text-sm font-medium text-gray-700">
              I need a return journey
            </label>
          </div>

          {/* Additional Notes */}
          <div className="pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              value={vehicleDetails.notes || ""}
              onChange={(e) =>
                setVehicleDetails({ ...vehicleDetails, notes: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-custom-blue bg-white"
              rows={3}
              placeholder="Enter any special requirements or additional notes..."
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={handleNext}
            className="w-full mt-6 py-4 bg-custom-blue text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-custom-blue transition text-lg"
          >
            Continue to Next Step
          </button>
        </div>
      )}
    </div>
  );
}

export default VehicleTab;