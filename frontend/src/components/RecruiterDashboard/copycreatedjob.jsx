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


const jobTypeOptions = [
  { value: '',label: 'Select Job Type' },
  { value: 'FTE', label: 'Full-Time Employment (FTE)' },
  { value: 'Intern', label: 'Internship' },
  { value: '6m Intern', label: '6-Month Internship' },
];

const jobCategoryOptions = [
  { value: '',label: 'Select Job Category' },
  { value: 'Tech', label: 'Tech' },
  { value: 'Non-Tech', label: 'Non-Tech' },
];

const workflowStepOptions = [
  { value: 'OA', label: 'Online Assessment' },
  { value: 'Interview', label: 'Interview' },
  { value: 'GD', label: 'Group Discussion' },
];

const CreateJob = () => {
  const [formData, setFormData] = useState({
    job_id: '',
    company_name: '',
    company_logo: '',
    job_role: '',
    jobdescription: '',
    joblocation: '',
    job_type: '',
    job_category: '',
    ctc: '',
    base_salary: '',
    deadline: '',
    Hiring_Workflow: [],
    department_allowed: [],
    gender_allowed: '',
    eligible_batch: '',
    course_allowed: '',
    minimum_cgpa: 0.0,
    active_backlogs: false,
  });

  const [workflowStep, setWorkflowStep] = useState({
    step_type: '',
    details: {},
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSelectChange = (field, selectedOption) => {
    setFormData({
      ...formData,
      [field]: selectedOption.value,
    });
  };

  const handleWorkflowStepChange = (selectedOption) => {
    setWorkflowStep({
      step_type: selectedOption.value,
      details: {}, // Reset details for the selected step type
    });
  };

  const handleStepDetailsChange = (e) => {
    const { name, value } = e.target;
    setWorkflowStep((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value,
      },
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
      step_type: '',
      details: {},
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/createjobcopy`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success('Job created successfully!');
    } catch (error) {
      toast.error('Error creating job application.');
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
          <div>
          <label className="block font-medium">Job Type</label>
          <Select
            options={jobTypeOptions}
            onChange={(option) => handleSelectChange('job_type', option)}
            defaultValue={jobTypeOptions.find((option) => option.value === formData.job_type)}
            className="mb-4"
          />
        </div>
        <div>
         <label className="block font-medium">Job Category</label>
          <Select
            options={jobCategoryOptions}
            onChange={(option) => handleSelectChange('job_category', option)}
            defaultValue={jobCategoryOptions.find((option) => option.value === formData.job_category)}
            className="mb-4"
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
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Any">Any</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Course Allowed</label>
              <select
                name="course_allowed"
                value={formData.course_allowed}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Course</option>
                <option value="BTech">BTech</option>
                <option value="MTech">MTech</option>
                <option value="MBA">MBA</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Batch Allowed</label>
              <select
                name="eligible_batch"
                value={formData.eligible_batch}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Batch</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Minimum CGPA</label>
              <input
                type="number"
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
          <h2 className="text-xl font-semibold mb-3 text-blue-500">Hiring Workflow <span className='text-red-500 text-sm'>You cannot change sequence later , only you can edit the step detail</span></h2>
    {/*       <div>
              <label className="block font-medium">Round Number</label>
              <select
                name="round_number"
                value={workflowStep.round_number}
                onChange={handleRoundNumberChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="1">First Round</option>
                <option value="2">Second Round</option>
                <option value="3">Third Round</option>
                <option value="4">Fourth Round</option>
                <option value="5">Fifth Round</option>
                <option value="6">Sixth Round</option>
              </select>
            </div> */}
            <div>
            <label className="block font-medium">Round Type</label>
          <Select
            options={workflowStepOptions}
            onChange={handleWorkflowStepChange}
            className="mb-4"
          /></div>
          {workflowStep.step_type === 'OA' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                name="oa_date"
                placeholder="OA Date"
                value={workflowStep.details.oa_date || ''}
                onChange={handleStepDetailsChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="string"
                name="oa_login_time"
                placeholder="Login Time"
                value={workflowStep.details.oa_login_time || ''}
                onChange={handleStepDetailsChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="string"
                name="oa_duration"
                placeholder="OA Duration"
                value={workflowStep.details.oa_duration || ''}
                onChange={handleStepDetailsChange}
                className="border px-3 py-2 rounded"
              />
              <textarea
                name="oa_link"
                placeholder="OA Link"
                value={workflowStep.details.oa_link || ''}
                onChange={handleStepDetailsChange}
                className="border px-3 py-2 rounded"
              />
              <textarea
                name="oa_info"
                placeholder="OA Info"
                value={workflowStep.details.oa_info || ''}
                onChange={handleStepDetailsChange}
                className="border px-3 py-2 rounded"
              />
            </div>
          )}

          {workflowStep.step_type === 'Interview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Which Interview?</label>
              <select
                name="interview_type"
                value={workflowStep.details.interview_type}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="Technical Interview 1">Technical Interview 1</option>
                <option value="Technical Interview 2">Technical Interview 2</option>
                <option value="Technical Interview 3">Technical Interview 3</option>
                <option value="HR Interview 1">HR Interview 1</option>
                <option value="HR Interview 2">HR Interview 2</option>
                <option value="HR Interview 3">HR Interview 3</option>
              </select>
            </div>
              <input
                type="date"
                name="interview_date"
                placeholder="Interview Date"
                value={workflowStep.details.interview_date || ''}
                onChange={handleStepDetailsChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="time"
                name="interview_time"
                placeholder="Interview Time"
                value={workflowStep.details.interview_time || ''}
                onChange={handleStepDetailsChange}
                className="border px-3 py-2 rounded"
              />
              <textarea
                name="interview_link"
                placeholder="Interview Link"
                value={workflowStep.details.interview_link || ''}
                onChange={handleStepDetailsChange}
                className="border px-3 py-2 rounded"
              />
              <textarea
                name="interview_info"
                placeholder="Interview Info"
                value={workflowStep.details.interview_info || ''}
                onChange={handleStepDetailsChange}
                className="border px-3 py-2 rounded"
              />
            </div>
          )}
          {workflowStep.step_type === 'GD' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                name="gd_date"
                placeholder="GD Date"
                value={workflowStep.details.gd_date || ''}
                onChange={handleStepDetailsChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="string"
                name="gd_time"
                placeholder="GD Time"
                value={workflowStep.details.gd_time || ''}
                onChange={handleStepDetailsChange}
                className="border px-3 py-2 rounded"
              />
                <textarea
                name="gd_link"
                placeholder="GD Link"
                value={workflowStep.details.gd_link || ''}
                onChange={handleStepDetailsChange}
                className="border px-3 py-2 rounded"
              />
              <textarea
                name="gd_info"
                placeholder="GD Info"
                value={workflowStep.details.gd_info || ''}
                onChange={handleStepDetailsChange}
                className="border px-3 py-2 rounded"
              />
            </div>
          )}

          {/* Add Workflow Step */}
          <button
            type="button"
            onClick={addWorkflowStep}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Workflow Step
          </button>
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
