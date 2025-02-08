import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "../ui/button";
import { ArrowLeft, Plus, Save } from 'lucide-react';


const CreateApplicationForm = ({ jobId, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([]);

  const studentProperties = ['gender', 'department', 'cgpa','name','email'];

  const addField = () => {
    setFields([...fields, { 
      fieldName: '', 
      fieldType: 'text', 
      isRequired: false,
      isAutoFill: false,
      studentPropertyPath: '',
      options: [] 
    }]);
  };


  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
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
      await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/api/form-templates`, 
        { title, fields, jobId },
        { withCredentials: true }
      );
      toast.success('Form template created successfully!');
      onSubmit();
      onClose();
      setTitle('');
      setFields([]);
    } catch (err) {
      console.error(err);
      toast.error('Failed to create form template');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <div className="mb-6">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800"
          onClick={onClose}
        >
          <FaArrowLeft className="mr-2" />
          <span>Back</span>
        </button>
      </div>
      
      <h1 className="text-2xl font-bold mb-6 text-center">Create Application Form Template</h1>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Form Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter form title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>



      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
               <div className="flex justify-between items-center">
                          <h3 className="font-medium">Field {index + 1}</h3>
                          <Button
                            variant="destructive"
                            className='text-red-500'
                            size="sm"
                            onClick={() => removeField(index)}
                          >
                            Remove
                          </Button>
                        </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Field Name"
                value={field.fieldName}
                onChange={(e) => handleFieldChange(index, 'fieldName', e.target.value)}
              />
              <select
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>

            {field.fieldType === 'select' && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Options:</label>
                <div className="space-y-2">
                  {field.options.map((option, optionIndex) => (
                    <input
                      key={optionIndex}
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    />
                  ))}
                  <button
                    className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
                    onClick={() => addOption(index)}
                  >
                    Add Option
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-6">
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
                  checked={field.isAutoFill}
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
          </div>
        ))}
      </div>


      <div className="flex flex-col space-y-4 mt-3">
          <Button
            type="button"
            variant="outline"
            onClick={addField}
            className="w-full bg-custom-blue text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Field
          </Button>

          <Button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Create Form Template
          </Button>
        </div>


    </div>
  );
};

export default CreateApplicationForm;