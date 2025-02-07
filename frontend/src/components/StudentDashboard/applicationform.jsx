import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import LowConnectivityWarning from "../LowConnectivityWarning"
import { FaArrowLeft, FaSpinner, FaFileUpload } from "react-icons/fa";
import { UserX, X } from "lucide-react";

const NoApplicationForm = ({ onClose, jobId }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 relative">
      <div className="absolute top-4 left-4"></div>
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </button>

      <div className="flex flex-col items-center justify-center py-12 text-center">
        <UserX className="w-24 h-24 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No Application Form Available
        </h2>
        <p className="text-gray-500 text-center mb-6">
          The application form for is currently unavailable.
          <br />
          Please contact the hiring team or try again later.
        </p>
        <div className="w-32 h-1 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

const ApplicationForm = ({ jobId, onHide, onApplicationSuccess }) => {
  const [fields, setFields] = useState([]);
  const [resumeFile, setResumeFile] = useState(null); // Store the file object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingSubmission, setExistingSubmission] = useState(null);
const [noFormAvailable, setNoFormAvailable] = useState(false);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        // Fetch form template
        const templateResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/api/form-templates/${jobId}`, {
          withCredentials: true,
        });
        const templateFields = templateResponse.data.fields;

        // Check if template is empty or invalid
        if (!templateFields || templateFields.length === 0) {
          setNoFormAvailable(true);
          return;
        }

        // Fetch student data
        const studentResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/api/students`, {
          withCredentials: true,
        });
        const studentData = studentResponse.data;

        // Fetch existing submission (if any)
        const submissionResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/api/get-already/${jobId}`, {
          withCredentials: true,
        });
        const submissionData = submissionResponse.data;

        if (submissionData) {
          setExistingSubmission(submissionData);
        }

        // Populate fields with existing submission or default values
        const populatedFields = templateFields.map((field) => {
          const existingField = submissionData?.fields?.find((f) => f.fieldName === field.fieldName);
          return {
            ...field,
            value: existingField ? existingField.value : field.isAutoFill ? studentData[field.studentPropertyPath] || '' : '',
            isLocked: field.isAutoFill,
          };
        });

        setFields(populatedFields);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setNoFormAvailable(true);
        } else {
          setError("Failed to load form data.");
          toast.error("Unable to fetch application form.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [jobId]);

  const handleFieldChange = (index, value) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, value } : field
    );
    setFields(updatedFields);
  };

  const validateEmailPattern = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFields = () => {
    const requiredFields = fields.filter((field) => field.isRequired && !field.isLocked);
    const emptyRequiredFields = requiredFields.filter((field) => !field.value.trim());

    const emailFields = fields.filter((field) => field.fieldType === 'email');
    const invalidEmailFields = emailFields.filter((field) => !validateEmailPattern(field.value));

    if (invalidEmailFields.length > 0) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    if (emptyRequiredFields.length > 0) {
      toast.error(`Please fill in all required fields: ${emptyRequiredFields.map((f) => f.fieldName).join(', ')}`);
      return false;
    }

    if (!resumeFile) {
      toast.error('Please upload your resume.');
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/api/upload-resume`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      return response.data.fileUrl; // Assuming the backend returns the file URL
    } catch (err) {
      console.error('Error uploading resume:', err);
      toast.error('Failed to upload resume.');
      throw err;
    }
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload the resume file and get the URL
      const resumeUrl = await uploadResume(resumeFile);

      const submissionData = {
        jobId,
        fields: [
          ...fields.map(({ fieldName, value, isLocked, studentPropertyPath }) => ({
            fieldName,
            value,
            isAutoFilled: isLocked,
            studentPropertyPath,
          })),
        ],
        resumeUrl, // Use the uploaded file URL
      };

      if (existingSubmission) {
        // Update existing submission
        await axios.put(`${import.meta.env.REACT_APP_BASE_URL}/api/edit`, submissionData, {
          withCredentials: true,
        });
        toast.success('Form updated successfully!');
      } else {
        // Create new submission
        await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/api/form-submissions`, submissionData, {
          withCredentials: true,
        });
        toast.success('Form submitted successfully!');
      }

      onApplicationSuccess();
      onHide();
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle no form available scenario
  if (noFormAvailable) {
    return <NoApplicationForm onClose={onHide} jobId={jobId} />;
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-blue"></div>
      </div>
    );

  if (error) return <p>{error}</p>;

  return (
    <>
    <div className="fixed top-0 left-0 w-full z-50">
    <LowConnectivityWarning />
  </div>
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <div className="mb-6">
        <button className="flex items-center text-blue-600 hover:text-blue-800" onClick={onHide}>
          <FaArrowLeft className="mr-2" />
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">Application Form</h1>

      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            {field.fieldName}
            {field.isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
          {field.isLocked ? (
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
              value={field.value}
              readOnly
            />
          ) : field.fieldType === 'select' ? (
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={field.value}
              onChange={(e) => handleFieldChange(index, e.target.value)}
              required={field.isRequired}
            >
              <option value="">Select {field.fieldName}</option>
              {field.options?.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.fieldType}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${field.fieldName}`}
              value={field.value}
              onChange={(e) => handleFieldChange(index, e.target.value)}
              required={field.isRequired}
            />
          )}
        </div>
      ))}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Upload Resume <span className="text-red-500">*(PDF)</span>
        </label>
        <input
          type="file"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          required
        />
      </div>

      <button
        className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : existingSubmission ? 'Update Application' : 'Submit'}
      </button>
    </div>
    </>
  );
};

export default ApplicationForm;