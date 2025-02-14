import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
const RecruiterFormTemplate = ({jobId}) => {
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const addField = () => {
    setFields([...fields, { fieldName: '', fieldType: 'text', isRequired: false, options: [] }]);
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, [key]: value } : field
    );
    setFields(updatedFields);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedFields = fields.map((field, i) => {
      if (i === index) {
        const updatedOptions = [...field.options];
        updatedOptions[optionIndex] = value;
        return { ...field, options: updatedOptions };
      }
      return field;
    });
    setFields(updatedFields);
  };

  const addOption = (index) => {
    const updatedFields = fields.map((field, i) => {
      if (i === index) {
        return { ...field, options: [...field.options, ''] };
      }
      return field;
    });
    setFields(updatedFields);
  };
  const handleSubmit = async () => {

    if(isSubmitting) return;
    setIsSubmitting(true);

    try {
      await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/api/form-templates`, {title, fields, jobId },{withCredentials: true});
      toast.success('Form template created successfully!');
      setTitle('');
      setFields([]);
    } catch (err) {
      console.error(err);
      toast.error('Failed to create form template');
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
<div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 mt-10 transform transition-all duration-300 hover:shadow-3xl">
  {/* Form Title */}
  <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
    Create Application Form Template
  </h1>

  {/* Form Title Input */}
  <div className="mb-8">
    <label className="block text-gray-700 font-semibold mb-3 text-lg">Form Title</label>
    <input
      type="text"
      className="w-full border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
      placeholder="Enter form title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>

  {/* Add Field Button */}
  <button
    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-8 rounded-xl hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
    onClick={addField}
  >
    Add Field
  </button>

  {/* Fields Section */}
  {fields.map((field, index) => (
    <div
      key={index}
      className="mt-8 p-6 border-2 border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Field Name Input */}
        <input
          type="text"
          className="flex-1 border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
          placeholder="Field Name"
          value={field.fieldName}
          onChange={(e) => handleFieldChange(index, "fieldName", e.target.value)}
        />

        {/* Field Type Dropdown */}
        <select
          className="flex-1 border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
          value={field.fieldType}
          onChange={(e) => handleFieldChange(index, "fieldType", e.target.value)}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="date">Date</option>
          <option value="select">Select</option>
          <option value="file">File</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </div>

      {/* Options for Select Field */}
      {field.fieldType === "select" && (
        <div className="mt-6">
          <label className="block text-gray-700 font-semibold mb-3 text-lg">Options:</label>
          {field.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex gap-4 mb-4">
              <input
                type="text"
                className="flex-1 border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
              />
              <button
                className="bg-red-500 text-white py-2 px-6 rounded-xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                onClick={() => removeOption(index, optionIndex)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-gray-500 text-white py-2 px-6 rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            onClick={() => addOption(index)}
          >
            Add Option
          </button>
        </div>
      )}

      {/* Required Checkbox */}
      <div className="mt-6">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-2 border-gray-200 rounded-lg transition-all duration-300"
            checked={field.isRequired}
            onChange={(e) => handleFieldChange(index, "isRequired", e.target.checked)}
          />
          <span className="text-gray-700 font-medium">Required</span>
        </label>
      </div>
    </div>
  ))}

  {/* Submit Button */}
  <button
    className="mt-10 w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-4 rounded-xl hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
    onClick={handleSubmit}
    disabled={isSubmitting}
  >
    {isSubmitting ? "Submitting..." : "Submit"}
  </button>
</div>
  );
};

export default RecruiterFormTemplate;
