import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import axios from "axios";
import toast from "react-hot-toast"
import ShortlistStudents from './shortliststudent';
import AppliedStudents from './appliedstudent';

const ViewJobDetails = ({ job, onClose }) => {
  const [viewingShortlist, setViewingShortlist] = useState(null);
  const [viewingAppliedStudents, setViewingAppliedStudents] = useState(false);
  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [editedWorkflow, setEditedWorkflow] = useState(job.Hiring_Workflow);
  const [editedJob, setEditedJob] = useState(job);

  const handleEdit = (section, index = null) => {
    setEditingSection(section);
    setEditingStepIndex(index);
  };

  const handleCancel = () => {
    setEditedJob(job);
    setEditedWorkflow(job.Hiring_Workflow);
    setEditingSection(null);
    setEditingStepIndex(null);
  };

  const handleSave = async (section) => {
    try {
      let updateData = {};
      if (section === 'hiring_workflow') {
        updateData = { Hiring_Workflow: editedWorkflow };
      } else if (section === 'eligibility') {
        updateData = { eligibility_criteria: editedJob.eligibility_criteria };
      } else if (section === 'salary') {
        updateData = { job_salary: editedJob.job_salary };
      } else if (section === 'basic') {
        updateData = {
          job_role: editedJob.job_role,
          job_type: editedJob.job_type,
          jobdescription: editedJob.jobdescription,
          joblocation: editedJob.joblocation,
          job_category: editedJob.job_category,
          job_class: editedJob.job_class,
          deadline: editedJob.deadline
        };
      }

      const response = await axios.put(
        `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/updatejob/${job._id}`,
        updateData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success('Job updated successfully!');
        Object.assign(job, editedJob);
        setEditingSection(null);
        setEditingStepIndex(null);
      }
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to update job');
    }
  };

  const handleInputChange = (section, field, value) => {
    if (section === 'hiring_workflow') {
      const updatedWorkflow = [...editedWorkflow];
      const [fieldPath, ...subFields] = field.split('.');
      
      if (subFields.length > 0) {
        updatedWorkflow[editingStepIndex].details[subFields.join('.')] = value;
      } else {
        updatedWorkflow[editingStepIndex][fieldPath] = value;
      }
      
      setEditedWorkflow(updatedWorkflow);
    } else {
      const updatedJob = { ...editedJob };
      const fieldPath = field.split('.');
      let current = updatedJob;
      
      for (let i = 0; i < fieldPath.length - 1; i++) {
        current = current[fieldPath[i]];
      }
      current[fieldPath[fieldPath.length - 1]] = value;
      
      setEditedJob(updatedJob);
    }
  };

  const renderEditableCard = (title, content, section) => (
    <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative mt-8">
      <button
        className="absolute top-4 right-4 p-2 text-gray-600 hover:text-blue-600 transition-colors"
        onClick={() => handleEdit(section)}
      >
        <Pencil size={20} />
      </button>

      <h3 className="text-2xl font-semibold text-blue-800 mb-6">{title}</h3>
      {content}

      {editingSection === section && (
        <div className="mt-8 flex space-x-4">
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
            onClick={() => handleSave(section)}
          >
            Save
          </button>
          <button
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-2xl hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );

  const renderBasicDetails = () => {
    const fields = [
      { label: 'Job Role', key: 'job_role' },
      { label: 'Job Type', key: 'job_type' },
      { label: 'Job Category', key: 'job_category' },
      { label: 'Job Class', key: 'job_class' },
      { label: 'Location', key: 'joblocation' },
      { label: 'Description', key: 'jobdescription' },
      { label: 'Deadline', key: 'deadline' }
    ];

    return (
      <div className="space-y-4 text-gray-700">
        {fields.map(({ label, key }) => (
          <div key={key} className="flex items-center">
            <strong className="w-1/3 text-gray-800">{label}:</strong>
            {editingSection === 'basic' ? (
              <input
                type={key === 'deadline' ? 'datetime-local' : 'text'}
                value={editedJob[key] || ''}
                onChange={(e) => handleInputChange('basic', key, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <span className="flex-1">{editedJob[key]}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSalaryDetails = () => {
    const fields = [
      { label: 'CTC', key: 'job_salary.ctc' },
      { label: 'Base Salary', key: 'job_salary.base_salary' }
    ];

    return (
      <div className="space-y-4 text-gray-700">
        {fields.map(({ label, key }) => (
          <div key={key} className="flex items-center">
            <strong className="w-1/3 text-gray-800">{label}:</strong>
            {editingSection === 'salary' ? (
              <input
                type="text"
                value={key.split('.').reduce((obj, k) => obj?.[k], editedJob) || ''}
                onChange={(e) => handleInputChange('salary', key, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <span className="flex-1">
                {key.split('.').reduce((obj, k) => obj?.[k], job) || 'N/A'}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderEligibilityCriteria = () => {
    const fields = [
      { label: 'Departments Allowed', key: 'eligibility_criteria.department_allowed', type: 'array' },
      { label: 'Gender Allowed', key: 'eligibility_criteria.gender_allowed' },
      { label: 'Eligible Batch', key: 'eligibility_criteria.eligible_batch' },
      { label: 'Minimum CGPA', key: 'eligibility_criteria.minimum_cgpa' },
      { label: 'Active Backlogs Allowed', key: 'eligibility_criteria.active_backlogs', type: 'boolean' },
      { label: 'Course Allowed', key: 'eligibility_criteria.course_allowed' }
    ];

    return (
      <div className="space-y-4 text-gray-700">
        {fields.map(({ label, key, type }) => (
          <div key={key} className="flex items-center">
            <strong className="w-1/3 text-gray-800">{label}:</strong>
            {editingSection === 'eligibility' ? (
              type === 'array' ? (
                <input
                  type="text"
                  value={key.split('.').reduce((obj, k) => obj?.[k], editedJob)?.join(', ') || ''}
                  onChange={(e) => handleInputChange('eligibility', key, e.target.value.split(', '))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : type === 'boolean' ? (
                <select
                  value={key.split('.').reduce((obj, k) => obj?.[k], editedJob) ? 'true' : 'false'}
                  onChange={(e) => handleInputChange('eligibility', key, e.target.value === 'true')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : (
                <input
                  type={key.includes('cgpa') ? 'number' : 'text'}
                  value={key.split('.').reduce((obj, k) => obj?.[k], editedJob) || ''}
                  onChange={(e) => handleInputChange('eligibility', key, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )
            ) : (
              <span className="flex-1">
                {type === 'array'
                  ? key.split('.').reduce((obj, k) => obj?.[k], job)?.join(', ')
                  : key.split('.').reduce((obj, k) => obj?.[k], job)?.toString() || 'N/A'}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderHiringWorkflow = () => {
    if (!job.Hiring_Workflow || job.Hiring_Workflow.length === 0) {
      return <p className="mt-4 text-gray-500">No hiring workflow defined.</p>;
    }

    return (
      <div className="mt-8 space-y-8">
        {job.Hiring_Workflow.map((step, index) => (
          <div
            key={index}
            className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
          >
            <button
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => handleEdit('hiring_workflow', index)}
            >
              <Pencil size={20} />
            </button>

            <h3 className="text-2xl font-semibold text-blue-800 mb-6">
              {step.step_type} Step
            </h3>

            <ul className="space-y-4 text-gray-700">
              {Object.entries(step.details || {}).map(([key, value]) => (
                <li key={key} className="flex items-center">
                  <strong className="w-1/3 text-gray-800 capitalize">
                    {key.replace(/_/g, ' ')}:
                  </strong>
                  {editingStepIndex === index && editingSection === 'hiring_workflow' ? (
                    <input
                      type="text"
                      value={editedWorkflow[index].details[key] || ''}
                      onChange={(e) => handleInputChange('hiring_workflow', `details.${key}`, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <span className="flex-1">{value || 'N/A'}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex space-x-4">
              <button
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                onClick={() => setViewingShortlist({ stepIndex: index })}
              >
                Add Shortlisted Students
              </button>

              {editingStepIndex === index && editingSection === 'hiring_workflow' && (
                <>
                  <button
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                    onClick={() => handleSave('hiring_workflow')}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-2xl hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        </div>
      );
    };
  
    if (viewingShortlist) {
      return (
        <ShortlistStudents
          jobId={job._id}
          stepIndex={viewingShortlist.stepIndex}
          onClose={() => setViewingShortlist(null)}
        />
      );
    }
  
    if (viewingAppliedStudents) {
      return (
        <AppliedStudents
          jobId={job._id}
          onBack={() => setViewingAppliedStudents(false)}
        />
      );
    }
  
    return (
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-blue-800">Job Details</h2>
          <button
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-2xl hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            onClick={onClose}
          >
            Close
          </button>
        </div>
  
        {/* Basic Details Card */}
        {renderEditableCard(
          "Basic Details",
          renderBasicDetails(),
          "basic"
        )}
  
        {/* Salary Details Card */}
        {renderEditableCard(
          "Salary Details",
          renderSalaryDetails(),
          "salary"
        )}
  
        {/* Eligibility Criteria Card */}
        {renderEditableCard(
          "Eligibility Criteria",
          renderEligibilityCriteria(),
          "eligibility"
        )}
  
        {/* View Applied Students Button */}
        <button
          className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          onClick={() => setViewingAppliedStudents(true)}
        >
          View Applied Students
        </button>
  
        {/* Hiring Workflow Section */}
        <h3 className="text-3xl font-bold text-blue-800 mt-10 mb-8">
          Hiring Workflow
        </h3>
        {renderHiringWorkflow()}
      </div>
    );
  };
  
  export default ViewJobDetails;