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

  // Validate the form (excluding companion name validation)
  const validateForm = () => {
    const newErrors = {};
    if (!visitorDetails.kindOfVisit) newErrors.kindOfVisit = "Kind of Visit is required.";
    if (!visitorDetails.purpose) newErrors.purpose = "Purpose of Visit is required.";
    if (!visitorDetails.visitorName) newErrors.visitorName = "Visitor Name is required.";
    if (!visitorDetails.designation) newErrors.designation = "Designation is required.";
    if (!visitorDetails.organization) newErrors.organization = "Organization/Institution is required.";
    if (!visitorDetails.contact) newErrors.contact = "Contact Number is required.";
    if (!visitorDetails.email) newErrors.email = "Email is required.";
    if (!visitorDetails.expectedVisitors) newErrors.expectedVisitors = "Expected Number of Visitors is required.";

    // Companion validation removed

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
      <h2 className="text-2xl font-semibold text-blue-900">Visitor Information</h2>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kind of Visit <span className="text-red-500">*</span>
          </label>
          <select
            value={visitorDetails.kindOfVisit}
            onChange={(e) =>
              setVisitorDetails({ ...visitorDetails, kindOfVisit: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="Official">Official</option>
            <option value="Non-Official">Non-Official</option>
          </select>
          {errors.kindOfVisit && <p className="text-red-500 text-sm">{errors.kindOfVisit}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Purpose of Visit <span className="text-red-500">*</span>
          </label>
          <textarea
            value={visitorDetails.purpose}
            onChange={(e) =>
              setVisitorDetails({ ...visitorDetails, purpose: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
          {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Visitor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={visitorDetails.visitorName}
              onChange={(e) =>
                setVisitorDetails({ ...visitorDetails, visitorName: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.visitorName && <p className="text-red-500 text-sm">{errors.visitorName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={visitorDetails.designation}
              onChange={(e) =>
                setVisitorDetails({ ...visitorDetails, designation: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Organization/Institution <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={visitorDetails.organization}
            onChange={(e) =>
              setVisitorDetails({ ...visitorDetails, organization: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.organization && <p className="text-red-500 text-sm">{errors.organization}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={visitorDetails.contact}
              onChange={(e) =>
                setVisitorDetails({ ...visitorDetails, contact: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={visitorDetails.email}
              onChange={(e) =>
                setVisitorDetails({ ...visitorDetails, email: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expected Number of Visitors <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={visitorDetails.expectedVisitors}
            onChange={(e) =>
              setVisitorDetails({
                ...visitorDetails,
                expectedVisitors: e.target.value,
              })
            }
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            required
          />
          {errors.expectedVisitors && <p className="text-red-500 text-sm">{errors.expectedVisitors}</p>}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Accompanying Visitors (if any)
            </label>
            <button
              type="button"
              onClick={addCompanion}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
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
                  placeholder={`Visitor Name`}
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <button
        onClick={handleNext}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        Next
      </button>
    </div>
  );
};

export default VisitorTab;