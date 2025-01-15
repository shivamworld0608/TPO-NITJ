import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Users, FileText, Edit, Trash2, Plus, X, Pencil } from 'lucide-react';
import Select from 'react-select';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import AppliedStudents from './appliedstudent';
import CreateApplicationform from './createapplicationform';
import ViewApplicationForm from './viewapplicationform';
import EditApplicationForm from './editapplicationform';
import ShortlistStudents from './shortliststudent';

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

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const ViewJobDetails = ({ job, onClose }) => {
  const [viewingAppliedStudents, setViewingAppliedStudents] = useState(false);
  const [applicationFormexist, setApplicationFormexist] = useState(null);
  const [selectedJobForForm, setSelectedJobForForm] = useState(null);
  const [viewingApplicationForm, setViewingApplicationForm] = useState(false);
  const [editingApplicationForm, setEditingApplicationForm] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [editedJob, setEditedJob] = useState(job);
  const [editedWorkflow, setEditedWorkflow] = useState(job.Hiring_Workflow || []);
  const [viewingShortlist, setViewingShortlist] = useState(null);

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


  useEffect(() => {
    const checkApplicationFormExistence = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/api/check-aft-exist/${job._id}`,
          { withCredentials: true }
        );
        setApplicationFormexist(response.data.exist);
      } catch (error) {
        console.error("Error checking application form existence:", error);
        setApplicationFormexist(false);
      }
    };

    if (job?._id) {
      checkApplicationFormExistence();
    }
  }, [job]);

  const handleEdit = (section, index = null) => {
    setEditingSection(section);
    setEditingStepIndex(index);
  };

  const handleCancel = () => {
    setEditedJob(job);
    setEditedWorkflow(job.Hiring_Workflow || []);
    setEditingSection(null);
    setEditingStepIndex(null);
  };

  const handleDeleteForm = () => {
    Swal.fire({
      title: 'Delete Application Form',
      text: 'This action cannot be undone. Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-lg',
        confirmButton: 'px-4 py-2 rounded-md',
        cancelButton: 'px-4 py-2 rounded-md'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `${import.meta.env.REACT_APP_BASE_URL}/api/delete-form-template/${job._id}`,
            {},
            { withCredentials: true }
          );
          setApplicationFormexist(false);
          toast.success('Application form deleted successfully');
        } catch (error) {
          console.error('Error deleting application form:', error);
          toast.error('Failed to delete application form');
        }
      }
    });
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
        if (!current[fieldPath[i]]) {
          current[fieldPath[i]] = {};
        }
        current = current[fieldPath[i]];
      }
      current[fieldPath[fieldPath.length - 1]] = value;

      setEditedJob(updatedJob);
    }
  };

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


  const renderEditableCard = (title, content, section) => (
    <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative mt-8">
      <button
        className="absolute top-4 right-4 p-2 text-gray-600 hover:text-blue-600 transition-colors"
        onClick={() => handleEdit(section)}
      >
        <Pencil size={20} />
      </button>

      <h3 className="text-2xl font-semibold text-custom-blue mb-6">{title}</h3>
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

            <h3 className="text-2xl font-semibold text-custom-blue mb-6">
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
            <button
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                onClick={() => setViewingShortlist({ stepIndex: index })}
              >
                View Shortlisted Students
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

  const renderEligibilityCriteria = () => (
    <div className="space-y-4 text-gray-700">
      <div className="flex items-center">
        <strong className="w-1/3 text-gray-800">Departments Allowed:</strong>
        {editingSection === 'eligibility' ? (
          <Select
            isMulti
            options={departmentOptions}
            value={departmentOptions.filter(option => editedJob.eligibility_criteria?.department_allowed?.includes(option.value))}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
              handleInputChange('eligibility', 'eligibility_criteria.department_allowed', selectedValues);
            }}
            className="rounded-xl"
          />
        ) : (
          <span className="flex-1">{editedJob.eligibility_criteria?.department_allowed?.join(', ') || 'N/A'}</span>
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
          </select>
        ) : (
          <span className="flex-1">{editedJob.eligibility_criteria?.gender_allowed || 'N/A'}</span>
        )}
      </div>

      <div className="flex items-center">
        <strong className="w-1/3 text-gray-800">Minimum CGPA:</strong>
        {editingSection === 'eligibility' ? (
          <input
            type="number"
            min="0"
            max="10"
            step="0.01"
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

  if (selectedJobForForm) {
    return (
      <div className="container mx-auto px-4 py-6">
        <CreateApplicationform
          jobId={selectedJobForForm}
          onClose={() => setSelectedJobForForm(null)}
          onSubmit={() => setApplicationFormexist(true)}
        />
      </div>
    );
  }

  if (viewingApplicationForm) {
    return (
      <div className="container mx-auto px-4 py-6">
        <ViewApplicationForm
          jobId={job._id}
          onHide={() => setViewingApplicationForm(false)}
        />
      </div>
    );
  }

  if (editingApplicationForm) {
    return (
      <div className="container mx-auto px-4 py-6">
        <EditApplicationForm
          jobId={job._id}
          onClose={() => setEditingApplicationForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-custom-blue">Job Details</h2>
        <div className="flex space-x-4">
          {job.Approved_Status && (
            <button
              className="bg-gradient-to-r from-[#0369A0] to-[#024873] text-white px-8 py-3 rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              onClick={() => setViewingAppliedStudents(true)}
            >
              <Users className="mr-2 h-4 w-4 inline" />
              View Applied Students
            </button>
          )}
          <button
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-2xl hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>

      {renderEditableCard("Basic Details", renderBasicDetails(), "basic")}
      {renderEditableCard("Salary Details", renderSalaryDetails(), "salary")}
      {renderEditableCard("Eligibility Criteria", renderEligibilityCriteria(), "eligibility")}

      <h3 className="text-3xl font-bold text-custom-blue mt-10 mb-8">Hiring Workflow</h3>
      {renderHiringWorkflow()}
      <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative mt-8">
{/*       <div className="mt-8 space-y-4"> */}
       <h3 className="text-2xl font-semibold text-custom-blue mb-6">Application Form</h3>
        {applicationFormexist ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => setViewingApplicationForm(true)}
            >
              <FileText className="mr-2 h-4 w-4" />
              View Form
            </Button>
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => setEditingApplicationForm(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Form
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleDeleteForm}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Form
            </Button>
          </div>
        ) : (
          job.Approved_Status && (
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={() => setSelectedJobForForm(job._id)}
            >
              <Plus className="mr-2 h-4 w-4 text-white" />
              Create Application Form
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default ViewJobDetails;
