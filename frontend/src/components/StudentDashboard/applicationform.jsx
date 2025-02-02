import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from "react-icons/fa";

const ApplicationForm = ({ jobId, onHide, onApplicationSuccess }) => {
  const [fields, setFields] = useState([]);
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingSubmission, setExistingSubmission] = useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        // Fetch form template
        const templateResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/api/form-templates/${jobId}`, {
          withCredentials: true
        });
        const templateFields = templateResponse.data.fields;

        // Fetch student data
        const studentResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/api/students`, {
          withCredentials: true
        });
        const studentData = studentResponse.data;

        // Fetch existing submission (if any)
        const submissionResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/api/get-already/${jobId}`, {
          withCredentials: true
        });
        const submissionData = submissionResponse.data;

        if (submissionData) {
          setExistingSubmission(submissionData);
          setResumeUrl(submissionData.resumeUrl);
        }

        // Populate fields with existing submission or default values
        const populatedFields = templateFields.map((field) => {
          const existingField = submissionData?.fields?.find(f => f.fieldName === field.fieldName);
          return {
            ...field,
            value: existingField ? existingField.value : (field.isAutoFill ? studentData[field.studentPropertyPath] || '' : ''),
            isLocked: field.isAutoFill,
          };
        });

        setFields(populatedFields);
      } catch (err) {
        setError('Failed to load form data.');
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

  const validateFields = () => {
    const requiredFields = fields.filter(field => field.isRequired && !field.isLocked);
    const emptyRequiredFields = requiredFields.filter(field => !field.value.trim());
    
    if (emptyRequiredFields.length > 0) {
      toast.error(`Please fill in all required fields: ${emptyRequiredFields.map(f => f.fieldName).join(', ')}`);
      return false;
    }

    if (!resumeUrl.trim()) {
      toast.error('Please provide a resume URL');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        jobId,
        fields: [
          ...fields.map(({ fieldName, value, isLocked, studentPropertyPath }) => ({
            fieldName,
            value,
            isAutoFilled: isLocked,
            studentPropertyPath
          }))
        ],
        resumeUrl
      };

      if (existingSubmission) {
        // Update existing submission
        await axios.put(`${import.meta.env.REACT_APP_BASE_URL}/api/edit`, submissionData, {
          withCredentials: true
        });
        toast.success('Form updated successfully!');
      } else {
        // Create new submission
        await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/api/form-submissions`, submissionData, {
          withCredentials: true
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
          Resume URL <span className="text-red-500">*(Provide google drive link of uploaded Resume and make it visible to everyone)</span>
        </label>
        <input
          type="url"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your resume URL"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
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
  );
};

export default ApplicationForm;

/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from "react-icons/fa";

const ApplicationForm = ({ jobId, onHide, onApplicationSuccess }) => {
  const [fields, setFields] = useState([]);
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchFormTemplate = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/api/form-templates/${jobId}`, {
          withCredentials: true
        });
        const templateFields = response.data.fields;

        const studentResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/api/students`, {
          withCredentials: true
        });
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
  }, [jobId]);

  const handleFieldChange = (index, value) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, value } : field
    );
    setFields(updatedFields);
  };

  const handleGooglePicker = () => {
    const clientId = '416315642228-hej2f0vfms08alkimimnifcuebll1dcg.apps.googleusercontent.com';
    const developerKey = 'AIzaSyBVnRcFOW02h4khTPhtZKWbDrx1IhBtdnM';
    const scope = ['https://www.googleapis.com/auth/drive.file'];

    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: clientId,
        scope: scope.join(' '),
      }).then(() => {
        window.gapi.load('picker', () => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          authInstance.signIn().then(() => {
            const accessToken = authInstance.currentUser.get().getAuthResponse().access_token;

            const picker = new window.google.picker.PickerBuilder()
              .addView(new window.google.picker.DocsUploadView())
              .setOAuthToken(accessToken)
              .setDeveloperKey(developerKey)
              .setCallback((data) => {
                if (data.action === window.google.picker.Action.PICKED) {
                  const fileId = data.docs[0].id;
                  const fileUrl = `https://drive.google.com/file/d/${fileId}/view`;
                  setResumeUrl(fileUrl);
                }
              })
              .build();
            picker.setVisible(true);
          });
        });
      });
    });
  };

  const validateFields = () => {
    const requiredFields = fields.filter(field => field.isRequired && !field.isLocked);
    const emptyRequiredFields = requiredFields.filter(field => !field.value.trim());
    
    if (emptyRequiredFields.length > 0) {
      toast.error(`Please fill in all required fields: ${emptyRequiredFields.map(f => f.fieldName).join(', ')}`);
      return false;
    }

    if (!resumeUrl.trim()) {
      toast.error('Please upload a resume file');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        jobId,
        fields: [
          ...fields.map(({ fieldName, value, isLocked, studentPropertyPath }) => ({
            fieldName,
            value,
            isAutoFilled: isLocked,
            studentPropertyPath
          }))
        ],
        resumeUrl
      };

      await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/api/form-submissions`, submissionData, {
        withCredentials: true
      });
      toast.success('Form submitted successfully!');
      onApplicationSuccess();
      onHide();
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit form.');
    } finally {
      setIsSubmitting(false);
    }
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
          Upload Resume (PDF) <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleGooglePicker}
        >
          Upload Resume
        </button>
        {resumeUrl && (
          <p className="mt-2 text-sm text-gray-600">
            Resume uploaded: <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Resume</a>
          </p>
        )}
      </div>

      <button
        className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export default ApplicationForm; */