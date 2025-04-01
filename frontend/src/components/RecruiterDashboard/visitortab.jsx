import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const VisitorTab = ({ visitorDetails, setVisitorDetails, onNext }) => {
  const [errors, setErrors] = useState({});
  
  const addCompanion = () => {
    setVisitorDetails({
      ...visitorDetails,
      companions: [...visitorDetails.companions, ""],
    });
  };

  const removeCompanion = (index) => {
    const newCompanions = visitorDetails.companions.filter((_, i) => i !== index);
    setVisitorDetails({
      ...visitorDetails,
      companions: newCompanions,
    });
  };

  const updateCompanion = (index, value) => {
    const newCompanions = [...visitorDetails.companions];
    newCompanions[index] = value;
    setVisitorDetails({
      ...visitorDetails,
      companions: newCompanions,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!visitorDetails.purpose) newErrors.purpose = "This field is required.";
    if (!visitorDetails.visitorName) newErrors.visitorName = "This field is required.";
    if (!visitorDetails.designation) newErrors.designation = "This field is required.";
    if (!visitorDetails.organization) newErrors.organization = "This field is required.";
    if (!visitorDetails.contact) newErrors.contact = "This field is required.";
    if (!visitorDetails.email) newErrors.email = "This field is required.";
    if (!visitorDetails.expectedVisitors) newErrors.expectedVisitors = "This field is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8 sm:p-0 p-5">
        <h2 className="text-3xl font-bold text-custom-blue mb-2">Visitor Information</h2>
        <p className="text-custom-blue">Please provide your details</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 sm:p-8 p-3">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-custom-blue">Personal Details</h3>
          <p className="text-custom-blue mt-2">Fill in the information below</p>
        </div>

        <div className="grid gap-6">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="grid gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Purpose of Visit <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={visitorDetails.purpose}
                  onChange={(e) => setVisitorDetails({ ...visitorDetails, purpose: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                  rows={3}
                  placeholder="Enter purpose of visit"
                  required
                />
                {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Visitor Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={visitorDetails.visitorName}
                    onChange={(e) => setVisitorDetails({ ...visitorDetails, visitorName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                    placeholder="Enter your name"
                    required
                  />
                  {errors.visitorName && <p className="text-red-500 text-xs mt-1">{errors.visitorName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={visitorDetails.designation}
                    onChange={(e) => setVisitorDetails({ ...visitorDetails, designation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                    placeholder="Enter your designation"
                    required
                  />
                  {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Organization/Institution <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={visitorDetails.organization}
                  onChange={(e) => setVisitorDetails({ ...visitorDetails, organization: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                  placeholder="Enter your organization"
                  required
                />
                {errors.organization && <p className="text-red-500 text-xs mt-1">{errors.organization}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={visitorDetails.contact}
                    onChange={(e) => setVisitorDetails({ ...visitorDetails, contact: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                    placeholder="Enter contact number"
                    required
                  />
                  {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={visitorDetails.email}
                    onChange={(e) => setVisitorDetails({ ...visitorDetails, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                    placeholder="Enter email address"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Expected Number of Visitors <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={visitorDetails.expectedVisitors}
                  onChange={(e) => setVisitorDetails({ ...visitorDetails, expectedVisitors: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                  min="1"
                  placeholder="Enter number of visitors"
                  required
                />
                {errors.expectedVisitors && <p className="text-red-500 text-xs mt-1">{errors.expectedVisitors}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Accompanying Visitors (if any)
              </label>
              <button
                type="button"
                onClick={addCompanion}
                className="flex items-center gap-2 text-sm text-custom-blue hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add Visitor
              </button>
            </div>

            <div className="space-y-2">
              {visitorDetails.companions.map((companion, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={companion}
                    onChange={(e) => updateCompanion(index, e.target.value)}
                    placeholder="Visitor Name"
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeCompanion(index)}
                    className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
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
};

export default VisitorTab;