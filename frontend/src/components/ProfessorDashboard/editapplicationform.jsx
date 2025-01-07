import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

const EditApplicationForm = ({ jobId, onClose }) => {
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  // Student properties for auto-fill
  const studentProperties = ['gender', 'department', 'cgpa'];

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/api/form-templates/${jobId}`,
          { withCredentials: true }
        );
        setTitle(data.title);
        setFields(data.fields || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch form data:', error);
        toast.error('Failed to load the form template.');
        setLoading(false);
      }
    };

    fetchForm();
  }, [jobId]);

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

  const saveForm = async () => {
    try {
      console.log('Form data:', { title, fields });
      await axios.put(`${import.meta.env.REACT_APP_BASE_URL}/api/form-templates/${jobId}`,{
        title,
        fields,
      },{withCredentials: true});
      toast.success('Form template updated successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to save form:', error);
      toast.error('Failed to update the form template.');
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <div className="mb-6">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800"
          onClick={onClose}
        >
          <FaArrowLeft className="mr-2" />
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Application Form Template</h1>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Form Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter form title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {fields.map((field, index) => (
        <div key={index} className="flex flex-wrap items-center gap-4 mt-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Field Name"
            value={field.fieldName}
            onChange={(e) => handleFieldChange(index, 'fieldName', e.target.value)}
          />
          <select
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={field.fieldType}
            onChange={(e) => handleFieldChange(index, 'fieldType', e.target.value)}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="date">Date</option>
            <option value="select">Select</option>
            <option value="file">File</option>
            <option value="checkbox">Checkbox</option>
          </select>
          {field.fieldType === 'select' && (
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-gray-700 font-medium">Options:</label>
              {field.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                />
              ))}
              <button
                className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 mt-2"
                onClick={() => addOption(index)}
              >
                Add Option
              </button>
            </div>
          )}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              checked={field.isRequired}
              onChange={(e) => handleFieldChange(index, 'isRequired', e.target.checked)}
            />
            <span className="text-gray-700">Required</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              checked={field.isAutoFill || false}
              onChange={(e) => handleFieldChange(index, 'isAutoFill', e.target.checked)}
            />
            <span className="text-gray-700">Auto-Fill</span>
          </label>
          {field.isAutoFill && (
            <select
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={field.studentPropertyPath || ''}
              onChange={(e) => handleFieldChange(index, 'studentPropertyPath', e.target.value)}
            >
              <option value="" disabled>
                Select Student Property
              </option>
              {studentProperties.map((property, i) => (
                <option key={i} value={property}>
                  {property}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}

      <button
        className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={saveForm}
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditApplicationForm;
