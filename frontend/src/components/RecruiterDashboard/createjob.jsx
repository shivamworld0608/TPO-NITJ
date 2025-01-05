import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import toast from 'react-hot-toast';

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

const workflowStepOptions = [
  { value: 'Online Assessment', label: 'Online Assessment' },
  { value: 'Technical Interview', label: 'Technical Interview' },
  { value: 'HR Interview', label: 'HR Interview' },
  { value: 'Group Discussion', label: 'Group Discussion' },
  { value: 'Final Announcement', label: 'Final Announcement' },
];

const CreateJob = () => {
  const [formData, setFormData] = useState({
    job_id: '',
    company_name: '',
    company_logo: '',
    job_role: '',
    jobdescription: '',
    joblocation: '',
    jobtype: 'Tech',
    ctc: '',
    base_salary: '',
    deadline: '',
    Hiring_Workflow: [],
    department_allowed: [],
    gender_allowed: 'Any',
    eligible_batch: '',
    minimum_cgpa: 0.0,
    active_backlogs: false,
  });

  const [workflowStep, setWorkflowStep] = useState({
    step_type: 'Online Assessment',
    step_name: '',
    description: '',
    tentative_date: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleWorkflowStepChange = (selectedOption) => {
    setWorkflowStep((prev) => ({
      ...prev,
      step_type: selectedOption.value,
    }));
  };

  const handleDepartmentChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      department_allowed: selectedOptions.map((option) => option.value),
    }));
  };

  const addWorkflowStep = () => {
    setFormData((prev) => ({
      ...prev,
      Hiring_Workflow: [...prev.Hiring_Workflow, workflowStep],
    }));
    setWorkflowStep({
      step_type: 'Online Assessment',
      step_name: '',
      description: '',
      tentative_date: '',
    });
  };

  const removeWorkflowStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      Hiring_Workflow: prev.Hiring_Workflow.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
        if (!formData.department_allowed.length) {
          toast.error('Please select at least one department allowed.');
          return;
        }
    
        if (!formData.eligible_batch) {
          toast.error('Eligible batch is required.');
          return;
        }

        if (!formData.gender_allowed) {
          toast.error('Eligible Gender allowed is required.');
          return;
        }
    
        if (formData.minimum_cgpa <= 0) {
          toast.error('Minimum CGPA must be greater than 0.');
          return;
        }
    try {
        const response = await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/jobprofile/createjob`, formData, {
          withCredentials: true,
        });
        toast.success('Job created successfully!');
      } catch (error) {
        console.error('Error creating job application:', error);
      }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Create Job Application</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Job ID</label>
            <input
              type="text"
              name="job_id"
              value={formData.job_id}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Company Logo (URL)</label>
            <input
              type="text"
              name="company_logo"
              value={formData.company_logo}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Job Role</label>
            <input
              type="text"
              name="job_role"
              value={formData.job_role}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Job Description</label>
            <textarea
              name="jobdescription"
              value={formData.jobdescription}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Job Location</label>
            <input
              type="text"
              name="joblocation"
              value={formData.joblocation}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Job Type</label>
            <select
              name="jobtype"
              value={formData.jobtype}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Tech">Tech</option>
              <option value="Non-Tech">Non-Tech</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">CTC</label>
            <input
              type="text"
              name="ctc"
              value={formData.ctc}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Base Salary</label>
            <input
              type="text"
              name="base_salary"
              value={formData.base_salary}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Application Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-500">Eligibility Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Departments Allowed</label>
              <Select
                options={departmentOptions}
                isMulti
                onChange={handleDepartmentChange}
                className="rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Gender Allowed</label>
              <select
                name="gender_allowed"
                value={formData.gender_allowed}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="Any">Any</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Eligible Batch</label>
              <input
                type="text"
                name="eligible_batch"
                value={formData.eligible_batch}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Minimum CGPA</label>
              <input
                type="number"
                step="0.01"
                name="minimum_cgpa"
                value={formData.minimum_cgpa}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Active Backlogs Allowed</label>
              <input
                type="checkbox"
                name="active_backlogs"
                checked={formData.active_backlogs}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Hiring Workflow */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-500">Hiring Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Step Type</label>
              <Select
                options={workflowStepOptions}
                onChange={handleWorkflowStepChange}
                className="rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Step Name</label>
              <input
                type="text"
                name="step_name"
                value={workflowStep.step_name}
                onChange={(e) =>
                  setWorkflowStep({ ...workflowStep, step_name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                value={workflowStep.description}
                onChange={(e) =>
                  setWorkflowStep({ ...workflowStep, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Tentative Date</label>
              <input
                type="date"
                name="tentative_date"
                value={workflowStep.tentative_date}
                onChange={(e) =>
                  setWorkflowStep({ ...workflowStep, tentative_date: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addWorkflowStep}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Workflow Step
          </button>
          <div className="mt-4">
            {formData.Hiring_Workflow.map((step, index) => (
              <div
                key={index}
                className="p-4 border rounded mb-2 flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>{step.step_type}</strong>: {step.step_name}
                  </p>
                  <p>{step.description}</p>
                  <p>Tentative Date: {step.tentative_date}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeWorkflowStep(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
