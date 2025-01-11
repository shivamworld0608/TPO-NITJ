import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import axios from "axios";
import Select from 'react-select';
import toast from "react-hot-toast";
import ShortlistStudents from './shortliststudent';
import AppliedStudents from './appliedstudent';

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Helper function to format datetime
const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const ViewJobDetails = ({ job, onClose }) => {
  const [viewingShortlist, setViewingShortlist] = useState(null);
  const [viewingAppliedStudents, setViewingAppliedStudents] = useState(false);
  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [editedWorkflow, setEditedWorkflow] = useState(job.Hiring_Workflow);
  const [editedJob, setEditedJob] = useState(job);

  const departmentOptions = [
    { value: 'CSE', label: 'CSE' },
    { value: 'ECE', label: 'ECE' },
    { value: 'EE', label: 'EE' },
    { value: 'ME', label: 'ME' },
    { value: 'CE', label: 'CE' },
    { value: 'IT', label: 'IT' },
    { value: 'CH', label: 'CH' },
    { value: 'ICE', label: 'ICE' },
    { value: 'BT', label: 'BT' },
    { value: 'TT', label: 'TT' },
    { value: 'IPE', label: 'IPE' },
  ];

  const jobTypeOptions = [
    { value: '', label: 'Select Job Type' },
    { value: 'FTE', label: 'Full-Time Employment (FTE)' },
    { value: 'Intern', label: 'Internship' },
    { value: '6m Intern', label: '6-Month Internship' },
  ];

  const jobCategoryOptions = [
    { value: '', label: 'Select Job Category' },
    { value: 'Tech', label: 'Tech' },
    { value: 'Non-Tech', label: 'Non-Tech' },
  ];

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

  const handleDepartmentChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    handleInputChange('eligibility', 'eligibility_criteria.department_allowed', value);
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
        if (!current[fieldPath[i]]) {
          current[fieldPath[i]] = {};
        }
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
    return (
      <div className="space-y-4 text-gray-700">
       <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Job Role:</strong>
          {editingSection === 'basic' ? (
            <input
              type="text"
              value={editedJob.job_role || ''}
              onChange={(e) => handleInputChange('basic', 'job_role', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="flex-1">{editedJob.job_role}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Job Type:</strong>
          {editingSection === 'basic' ? (
            <select
              value={editedJob.job_type || ''}
              onChange={(e) => handleInputChange('basic', 'job_type', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {jobTypeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : (
            <span className="flex-1">{editedJob.job_type}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Job Category:</strong>
          {editingSection === 'basic' ? (
            <select
              value={editedJob.job_category || ''}
              onChange={(e) => handleInputChange('basic', 'job_category', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {jobCategoryOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : (
            <span className="flex-1">{editedJob.job_category}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Location:</strong>
          {editingSection === 'basic' ? (
            <input
              type="text"
              value={editedJob.joblocation || ''}
              onChange={(e) => handleInputChange('basic', 'joblocation', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="flex-1">{editedJob.joblocation}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Description:</strong>
          {editingSection === 'basic' ? (
            <textarea
              value={editedJob.jobdescription || ''}
              onChange={(e) => handleInputChange('basic', 'jobdescription', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          ) : (
            <span className="flex-1">{editedJob.jobdescription}</span>
          )}
        </div>
        
        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Deadline:</strong>
          {editingSection === 'basic' ? (
            <input
              type="datetime-local"
              value={editedJob.deadline ? new Date(editedJob.deadline).toISOString().slice(0, 16) : ''}
              onChange={(e) => handleInputChange('basic', 'deadline', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="flex-1">{formatDateTime(editedJob.deadline)}</span>
          )}
        </div>
      </div>
    );
  };

  const renderSalaryDetails = () => {
    return (
      <div className="space-y-4 text-gray-700">
        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">CTC:</strong>
          {editingSection === 'salary' ? (
            <input
              type="text"
              value={editedJob.job_salary?.ctc || ''}
              onChange={(e) => handleInputChange('salary', 'job_salary.ctc', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="flex-1">{editedJob.job_salary?.ctc || 'N/A'}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Base Salary:</strong>
          {editingSection === 'salary' ? (
            <input
              type="text"
              value={editedJob.job_salary?.base_salary || ''}
              onChange={(e) => handleInputChange('salary', 'job_salary.base_salary', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="flex-1">{editedJob.job_salary?.base_salary || 'N/A'}</span>
          )}
        </div>
      </div>
    );
  };

  const renderEligibilityCriteria = () => {
    return (
      <div className="space-y-4 text-gray-700">
      <div className="flex items-center">
  <strong className="w-1/3 text-gray-800">Departments Allowed:</strong>
  {editingSection === 'eligibility' ? (
    <div className="flex-1">
      <Select
        isMulti
        options={departmentOptions}
        value={departmentOptions.filter(option => 
          editedJob.eligibility_criteria?.department_allowed?.includes(option.value)
        )}
        onChange={(selectedOptions) => {
          const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
          handleInputChange('eligibility', 'eligibility_criteria.department_allowed', selectedValues);
        }}
        className="rounded-xl"
        classNamePrefix="select"
      />
    </div>
  ) : (
    <span className="flex-1">
      {editedJob.eligibility_criteria?.department_allowed?.join(', ') || 'N/A'}
    </span>
  )}
</div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Gender Allowed:</strong>
          {editingSection === 'eligibility' ? (
            <select
              value={editedJob.eligibility_criteria?.gender_allowed || ''}
              onChange={(e) => handleInputChange('eligibility', 'eligibility_criteria.gender_allowed', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Any">Any</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span className="flex-1">{editedJob.eligibility_criteria?.gender_allowed || 'N/A'}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Course Allowed:</strong>
          {editingSection === 'eligibility' ? (
            <select
              value={editedJob.eligibility_criteria?.course_allowed || ''}
              onChange={(e) => handleInputChange('eligibility', 'eligibility_criteria.course_allowed', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Course</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MBA">MBA</option>
            </select>
          ) : (
            <span className="flex-1">{editedJob.eligibility_criteria?.course_allowed || 'N/A'}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Eligible Batch:</strong>
          {editingSection === 'eligibility' ? (
            <select
              value={editedJob.eligibility_criteria?.eligible_batch || ''}
              onChange={(e) => handleInputChange('eligibility', 'eligibility_criteria.eligible_batch', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Batch</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          ) : (
            <span className="flex-1">{editedJob.eligibility_criteria?.eligible_batch || 'N/A'}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Active Backlogs Allowed:</strong>
          {editingSection === 'eligibility' ? (
            <input
              type="checkbox"
              checked={editedJob.eligibility_criteria?.active_backlogs || false}
              onChange={(e) => handleInputChange('eligibility', 'eligibility_criteria.active_backlogs', e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          ) : (
            <span className="flex-1">
              {editedJob.eligibility_criteria?.active_backlogs ? 'Yes' : 'No'}
            </span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Minimum CGPA:</strong>
          {editingSection === 'eligibility' ? (
            <input
              type="number"
              min="0"
              max="10"
              value={editedJob.eligibility_criteria?.minimum_cgpa || ''}
              onChange={(e) => handleInputChange('eligibility', 'eligibility_criteria.minimum_cgpa', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="flex-1">{editedJob.eligibility_criteria?.minimum_cgpa || 'N/A'}</span>
          )}
        </div>
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
                    key.toLowerCase().includes('date') ? (
                      <input
                        type="date"
                        value={editedWorkflow[index].details[key] ? new Date(editedWorkflow[index].details[key]).toISOString().slice(0, 10) : ''}
                        onChange={(e) => handleInputChange('hiring_workflow', `details.${key}`, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <input
                        type="text"
                        value={editedWorkflow[index].details[key] || ''}
                        onChange={(e) => handleInputChange('hiring_workflow', `details.${key}`, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    )
                  ) : (
                    <span className="flex-1">
                      {key.toLowerCase().includes('date') ? formatDate(value) : (value || 'N/A')}
                    </span>
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
     <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-blue-800">Job Details</h2>
        <button
        className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        onClick={() => setViewingAppliedStudents(true)}
      >
        View Applied Students
      </button>
        <button
          className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-2xl hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      {renderEditableCard(
        "Basic Details",
        renderBasicDetails(),
        "basic"
      )}

      {renderEditableCard(
        "Salary Details",
        renderSalaryDetails(),
        "salary"
      )}

      {renderEditableCard(
        "Eligibility Criteria",
        renderEligibilityCriteria(),
        "eligibility"
      )}

      <h3 className="text-3xl font-bold text-blue-800 mt-10 mb-8">
        Hiring Workflow
      </h3>
      {renderHiringWorkflow()}
    </div>
  );
};

export default ViewJobDetails;