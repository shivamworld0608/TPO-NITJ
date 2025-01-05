import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
const RecruiterFormTemplate = ({jobId}) => {
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([]);

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
    try {
      await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/api/form-templates`, {title, fields, jobId },{withCredentials: true});
      toast.success('Form template created successfully!');
      setTitle('');
      setFields([]);
    } catch (err) {
      console.error(err);
      toast.error('Failed to create form template');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Application Form Template</h1>

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

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={addField}
      >
        Add Field
      </button>

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
        </div>
      ))}

      <button
        className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default RecruiterFormTemplate;
