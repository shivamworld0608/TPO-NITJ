import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TPOFieldConfigurator = ({ formTemplateId }) => {
  const [form, setForm] = useState(null);
  const studentProperties = ['gender', 'department', 'cgpa'];

  useEffect(() => {
    const fetchForm = async () => {
      const { data } = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/api/form-templates/${formTemplateId}`);
      setForm(data);
    };
    fetchForm();
  }, [formTemplateId]);

  const handleAutoFillChange = (fieldIndex, isAutoFill) => {
    const updatedFields = [...form.fields];
    updatedFields[fieldIndex].isAutoFill = isAutoFill;
    setForm({ ...form, fields: updatedFields });
  };

  const handleStudentPropertyPathChange = (fieldIndex, property) => {
    const updatedFields = [...form.fields];
    updatedFields[fieldIndex].studentPropertyPath = property;
    setForm({ ...form, fields: updatedFields });
  };

  const saveConfiguration = async () => {
    try {
      await axios.put(`${import.meta.env.REACT_APP_BASE_URL}/api/form-templates/${formTemplateId}`, form);
      alert('Configuration Saved Successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving configuration.');
    }
  };

  if (!form) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800">Configure Auto-Fill Fields</h1>
      {form.fields.map((field, index) => (
        <div key={index} className="flex items-center justify-between space-x-4 p-4 border-b border-gray-200 rounded-md hover:bg-gray-50">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium">{field.fieldName}</label>
          </div>
          <div className="flex items-center space-x-3">
            <label className="text-gray-600">Auto-Fill</label>
            <input
              type="checkbox"
              checked={field.isAutoFill}
              onChange={(e) => handleAutoFillChange(index, e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
            />
          </div>
          {field.isAutoFill && (
            <div className="flex items-center space-x-3">
              <select
                onChange={(e) => handleStudentPropertyPathChange(index, e.target.value)}
                value={field.studentPropertyPath || ''}
                className="bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>
          )}
        </div>
      ))}
      <div className="text-center">
        <button
          onClick={saveConfiguration}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default TPOFieldConfigurator;
