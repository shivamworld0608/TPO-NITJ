import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";

const ViewApplicationForm = ({ jobId, onHide }) => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  useEffect(() => {
    const fetchFormTemplate = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/api/form-templates/${jobId}`, {
          withCredentials: true,
        });
        const templateFields = response.data.fields;
        const viewFields = templateFields.map((field) => ({
          ...field,
          isLocked: true,
        }));

        setFields(viewFields);
      } catch (err) {
        setError('Failed to load form data.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormTemplate();
  }, [jobId]);

  const toggleDropdown = (index) => {
    setDropdownVisible((prev) => (prev === index ? null : index));
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-blue"></div>
    </div>
  );

  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <div className="mb-6">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800"
          onClick={onHide}
        >
          <FaArrowLeft className="mr-2" />
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">View Application Form</h1>

      {fields.map((field, index) => (
        <div key={index} className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            {field.fieldName}
            {field.isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
          {field.fieldType === 'select' ? (
            <div className="relative">
              <div
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-pointer"
                onClick={() => toggleDropdown(index)}
              >
                {`Select ${field.fieldName}` || 'Select an option'}
              </div>
              {dropdownVisible === index && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                  {field.options?.map((option, i) => (
                    <li
                      key={i}
                      className="px-4 py-2 hover:bg-gray-100 cursor-default"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
              placeholder={`Enter ${field.fieldName}`}
              value={field.value}
              readOnly
            />
          )}
          {field.isAutoFill && (
            <p className="text-sm mt-1 text-blue-600">Auto-fill field</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewApplicationForm;