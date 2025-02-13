import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditJobModal = ({ job, onClose, onJobUpdated }) => {
  const [formData, setFormData] = useState({
    job_role: job.job_role,
    company_name: job.company_name,
    // company_logo: job.company_logo,
    jobdescription: job.jobdescription,
    joblocation: job.joblocation,
    jobtype: job.jobtype,
    job_salary: job.job_salary,
    eligibility_criteria: job.eligibility_criteria || {
      department_allowed: [],
      gender_allowed: 'Any',
      eligible_batch: '',
      minimum_cgpa: 0.0,
      active_backlogs: false,
    },
    Hiring_Workflow: job.Hiring_Workflow || [],
    deadline: job.deadline.split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEligibilityChange = (field, value) => {
    setFormData({
      ...formData,
      eligibility_criteria: {
        ...formData.eligibility_criteria,
        [field]: value,
      },
    });
  };

  const handleWorkflowChange = (index, field, value) => {
    const updatedWorkflow = [...formData.Hiring_Workflow];
    updatedWorkflow[index] = { ...updatedWorkflow[index], [field]: value };
    setFormData({ ...formData, Hiring_Workflow: updatedWorkflow });
  };

  const addWorkflowStep = () => {
    setFormData({
      ...formData,
      Hiring_Workflow: [
        ...formData.Hiring_Workflow,
        { step_type: '', step_name: '', description: '', tentative_date: '' },
      ],
    });
  };

  const removeWorkflowStep = (index) => {
    const updatedWorkflow = formData.Hiring_Workflow.filter((_, i) => i !== index);
    setFormData({ ...formData, Hiring_Workflow: updatedWorkflow });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.REACT_APP_BASE_URL}/jobprofile/updatejob/${job._id}`, formData, { withCredentials: true });
      toast.success('Job updated successfully!');
      onJobUpdated(response.data.job);
      onClose();
    } catch (error) {
      console.error('Error updating job:', error.message);
      alert('Failed to update the job');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Edit Job</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            Job Role:
            <input
              type="text"
              name="job_role"
              value={formData.job_role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block mb-4">
            Company Name:
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>

          {/* <label className="block mb-4">
            Company Logo URL:
            <input
              type="text"
              name="company_logo"
              value={formData.company_logo}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label> */}

          <label className="block mb-4">
            Job Description:
            <textarea
              name="jobdescription"
              value={formData.jobdescription}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block mb-4">
            Job Location:
            <input
              type="text"
              name="joblocation"
              value={formData.joblocation}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block mb-4">
            Job Type:
            <select
              name="jobtype"
              value={formData.jobtype}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Job Type</option>
              <option value="Tech">Tech</option>
              <option value="Non-Tech">Non-Tech</option>
            </select>
          </label>

          <label className="block mb-4">
            Job Salary:
            <input
              type="text"
              name="job_salary"
              value={formData.job_salary}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>

          <h3 className="text-lg font-semibold mb-2">Eligibility Criteria</h3>
          <label className="block mb-4">
            Departments Allowed:
            <select
              multiple
              value={formData.eligibility_criteria.department_allowed}
              onChange={(e) =>
                handleEligibilityChange(
                  'department_allowed',
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="w-full p-2 border rounded"
            >
              {['CSE', 'ECE', 'EE', 'ME', 'CE', 'IT', 'CH', 'ICE', 'BT', 'TT', 'IPE'].map(
                (dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                )
              )}
            </select>
          </label>

          <label className="block mb-4">
            Gender Allowed:
            <select
              value={formData.eligibility_criteria.gender_allowed}
              onChange={(e) => handleEligibilityChange('gender_allowed', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Any">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="block mb-4">
            Eligible Batch:
            <input
              type="text"
              name="eligible_batch"
              value={formData.eligibility_criteria.eligible_batch}
              onChange={(e) => handleEligibilityChange('eligible_batch', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block mb-4">
            Minimum CGPA:
            <input
              type="number"
              step="0.1"
              name="minimum_cgpa"
              value={formData.eligibility_criteria.minimum_cgpa}
              onChange={(e) => handleEligibilityChange('minimum_cgpa', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </label>

          <label className="block mb-4">
            Active Backlogs:
            <select
              value={formData.eligibility_criteria.active_backlogs}
              onChange={(e) => handleEligibilityChange('active_backlogs', e.target.value === 'true')}
              className="w-full p-2 border rounded"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>

          <h3 className="text-lg font-semibold mb-2">Hiring Workflow</h3>
          {formData.Hiring_Workflow.map((step, index) => (
            <div key={index} className="mb-4 border p-4 rounded">
              <label className="block mb-2">
                Step Type:
                <select
                  value={step.step_type}
                  onChange={(e) => handleWorkflowChange(index, 'step_type', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="Online Assessment">Online Assessment</option>
                  <option value="Technical Interview">Technical Interview</option>
                  <option value="HR Interview">HR Interview</option>
                  <option value="Group Discussion">Group Discussion</option>
                  <option value="Final Announcement">Final Announcement</option>
                </select>
              </label>
              <label className="block mb-2">
                Step Name:
                <input
                  type="text"
                  value={step.step_name}
                  onChange={(e) => handleWorkflowChange(index, 'step_name', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                Description:
                <textarea
                  value={step.description}
                  onChange={(e) => handleWorkflowChange(index, 'description', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                Tentative Date:
                <input
                  type="date"
                  value={step.tentative_date}
                  onChange={(e) => handleWorkflowChange(index, 'tentative_date', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </label>
              <button
                type="button"
                onClick={() => removeWorkflowStep(index)}
                className="text-red-500 text-sm"
              >
                Remove Step
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addWorkflowStep}
            className="text-blue-500 text-sm mb-4"
          >
            Add Workflow Step
          </button>

          <label className="block mb-4">
            Application Deadline:
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
