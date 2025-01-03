import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationForm = ({ formTemplateId, studentId }) => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormTemplate = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/api/form-templates/${formTemplateId}`);
        const templateFields = response.data.fields;

        const studentResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/api/students/${studentId}`);
        const studentData = studentResponse.data;

        const populatedFields = templateFields.map((field) => ({
          ...field,
          value: field.isAutoFill ? studentData[field.studentPropertyPath] || '' : '',
          isLocked: field.isAutoFill,
        }));

        setFields(populatedFields);
      } catch (err) {
        setError('Failed to load form data.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormTemplate();
  }, [formTemplateId, studentId]);

  const handleFieldChange = (index, value) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, value } : field
    );
    setFields(updatedFields);
  };

  const handleSubmit = async () => {
    try {
      const submissionData = {
        formTemplateId,
        studentId,
        fields: fields.map(({ fieldName, value, isLocked }) => ({
          fieldName,
          value,
          isAutoFilled: isLocked,
        })),
      };

      await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/api/form-submissions`, submissionData);
      alert('Form submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error submitting the form.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Application Form</h1>

      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">{field.fieldName}</label>
          {field.isLocked ? (
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
              value={field.value}
              readOnly
            />
          ) : (
            <input
              type={field.fieldType}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${field.fieldName}`}
              value={field.value}
              onChange={(e) => handleFieldChange(index, e.target.value)}
            />
          )}
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

export default ApplicationForm;
