import React, { useState,useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { AlertCircle, GripVertical, X, Edit2 } from "lucide-react";

const btechdepartmentOptions = [
  { value: "CSE", label: "Computer Science & Engineering" },
  { value: "ECE", label: "Electronics & Communication Engineering" },
  { value: "EE", label: "Electrical Engineering" },
  { value: "ME", label: "Mechanical Engineering" },
  { value: "CE", label: "Civil Engineering" },
  { value: "IT", label: "Information Technology" },
  { value: "CH", label: "Chemical Engineering" },
  { value: "ICE", label: "Instrumentation and Control Engineering" },
  { value: "BT", label: "Biotechnology" },
  { value: "TT", label: "Textile Technology" },
  { value: "IPE", label: "Industrial & Production Engineering" },
];

const mtechdepartmentOptions = [
  {
    label: "Computer Science & Engineering",
    options: [
      { value: "CSE", label: "Computer Science & Engineering" },
      { value: "CSE_IS", label: "Information Security" },
      { value: "CSE_DS", label: "Data Science" },
      { value: "CSE_AI", label: "Artificial Intelligence" },
    ],
  },
  {
    label: "Electronics & Communication Engineering",
    options: [
      { value: "ECE_SPML", label: "Signal Processing and Machine Learning" },
      { value: "ECE_VLSI", label: "VLSI Design" },
    ],
  },
  {
    label: "Electrical Engineering",
    options: [{ value: "EE_EVD", label: "Electric Vehicle Design" }],
  },
  {
    label: "Civil Engineering",
    options: [
      { value: "CE_SCE", label: "Structural and Construction Engineering" },
      {
        value: "CE_GEO",
        label: "Geotechnical – GEO-Environmental Engineering",
      },
    ],
  },
  {
    label: "Mechanical Engineering",
    options: [{ value: "ME_DE", label: "Design Engineering" }],
  },
  {
    label: "Information Technology",
    options: [{ value: "IT_DA", label: "Data Analytics" }],
  },
  {
    label: "Chemical Engineering",
    options: [{ value: "CH", label: "Chemical Engineering" }],
  },
  {
    label: "Industrial & Production Engineering",
    options: [
      { value: "IPE_DA", label: "Industrial Engineering & Data Analytics" },
    ],
  },
  {
    label: "Textile Engineering",
    options: [{ value: "TT_TEM", label: "Textile Engineering & Management" }],
  },
  {
    label: "Biotechnology",
    options: [{ value: "BT", label: "Biotechnology" }],
  },
  {
    label: "Renewable Energy",
    options: [{ value: "RE", label: "Renewable Energy" }],
  },
];

const mbadepartmentOptions = [
  { value: "Finance", label: "Finance" },
  { value: "Marketing", label: "Marketing" },
  { value: "HR", label: "HR" },
];

const mscdepartmentOptions = [
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Mathematics", label: "Mathematics" },
];

const phddepartmentOptions = [];

const jobTypeOptions = [
  { value: "", label: "Select Job Type" },
  { value: "2m Intern", label: "2-Month Internship" },
  { value: "6m Intern", label: "6-Month Internship" },
  { value: "Intern+PPO", label: "Intern + Pre Placement Offer(PPO)" },
  { value: "Intern+FTE", label: "Intern + Full-Time Employment(FTE)" },
  { value: "FTE", label: "Full-Time Employment(FTE)" },
];

const jobCategoryOptions = [
  { value: "", label: "Select Job Category" },
  { value: "Tech", label: "Tech" },
  { value: "Non-Tech", label: "Non-Tech" },
];

const workflowStepOptions = [
  { value: "", label: "Select Round Type" },
  { value: "OA", label: "Online Assessment" },
  { value: "Interview", label: "Interview" },
  { value: "GD", label: "Group Discussion" },
];

const CreateJob = ({ onJobCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    job_id: "",
    company_name: "",
    company_logo: "",
    job_role: "",
    jobdescription: "",
    joblocation: "",
    job_type: "",
    job_category: "",
    ctc: "",
    base_salary: "",
    deadline: "",
    Hiring_Workflow: [],
    department_allowed: [],
    gender_allowed: "",
    eligible_batch: "",
    course_allowed: "",
    minimum_cgpa: 0.0,
    active_backlogs: false,
  });

  const [workflowStep, setWorkflowStep] = useState({
    step_type: "",
    details: {},
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "course_allowed" && {  }), // Clear departments when course changes
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
      details: {},
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
    if (!workflowStep.step_type) {
      toast.error("Please select a round type first!");
      return;
    }

    if (editingIndex !== null) {
      const updatedWorkflow = [...formData.Hiring_Workflow];
      updatedWorkflow[editingIndex] = workflowStep;
      setFormData((prev) => ({
        ...prev,
        Hiring_Workflow: updatedWorkflow,
      }));
      setEditingIndex(null);
    } else {
      setFormData((prev) => ({
        ...prev,
        Hiring_Workflow: [...prev.Hiring_Workflow, workflowStep],
      }));
    }

    setWorkflowStep({
      step_type: "",
      details: {},
    });
  };

  const removeWorkflowStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      Hiring_Workflow: prev.Hiring_Workflow.filter((_, i) => i !== index),
    }));
  };

  const editWorkflowStep = (index) => {
    setWorkflowStep(formData.Hiring_Workflow[index]);
    setEditingIndex(index);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newWorkflow = [...formData.Hiring_Workflow];
    const draggedItem = newWorkflow[draggedIndex];
    newWorkflow.splice(draggedIndex, 1);
    newWorkflow.splice(index, 0, draggedItem);

    setFormData((prev) => ({
      ...prev,
      Hiring_Workflow: newWorkflow,
    }));
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const getWorkflowStepContent = (step) => {
    switch (step.step_type) {
      case "OA":
        return (
          <div className="text-sm">
            <p>Date: {step.details.oa_date}</p>
            <p>Login Time: {step.details.oa_login_time}</p>
            <p>Duration: {step.details.oa_duration}</p>
          </div>
        );
      case "Interview":
        return (
          <div className="text-sm">
            <p>Type: {step.details.interview_type}</p>
            <p>Date: {step.details.interview_date}</p>
            <p>Time: {step.details.interview_time}</p>
          </div>
        );
      case "GD":
        return (
          <div className="text-sm">
            <p>Date: {step.details.gd_date}</p>
            <p>Time: {step.details.gd_time}</p>
          </div>
        );
      default:
        return null;
    }
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
      toast.success("Job created successfully!");
      onJobCreated(response.data.data);
      onCancel();
    } catch (error) {
      toast.error("Error creating job application.");
    }
  };

  return (
    <>
      <button
        className=" text-gray-500 mx-4 rounded-2xl hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        onClick={onCancel}
      >
        <FaArrowLeft />
      </button>
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-2xl mt-10 transform transition-all duration-300 hover:shadow-3xl">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-8">
          Create Job Application
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Basic Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Job ID
              </label>
              <input
                type="text"
                name="job_id"
                value={formData.job_id}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Company Name<span className="text-red-500"> *</span>
              </label>
              <input
                required
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Company Logo (URL)
              </label>
              <input
                type="text"
                name="company_logo"
                value={formData.company_logo}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Job Role<span className="text-red-500"> *</span>
              </label>
              <input
                required
                type="text"
                name="job_role"
                value={formData.job_role}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-gray-700 font-semibold mb-2">
                Job Description
              </label>
              <textarea
                name="jobdescription"
                value={formData.jobdescription}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Job Location
              </label>
              <input
                type="text"
                name="joblocation"
                value={formData.joblocation}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                CTC<span className="text-red-500 text-sm"> * (in Lakhs)</span>
              </label>
              <input
                required
                type="number"
                name="ctc"
                value={formData.ctc}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Base Salary
                <span className="text-red-500 text-sm"> (in Lakhs)</span>
              </label>
              <input
                type="text"
                name="base_salary"
                value={formData.base_salary}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Application Deadline<span className="text-red-500"> *</span>
              </label>
              <input
                required
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Job Type<span className="text-red-500"> *</span>
              </label>
              <Select
                required
                options={jobTypeOptions}
                onChange={(option) => handleSelectChange("job_type", option)}
                defaultValue={jobTypeOptions.find(
                  (option) => option.value === formData.job_type
                )}
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Job Category<span className="text-red-500"> *</span>
              </label>
              <Select
                required
                options={jobCategoryOptions}
                onChange={(option) =>
                  handleSelectChange("job_category", option)
                }
                defaultValue={jobCategoryOptions.find(
                  (option) => option.value === formData.job_category
                )}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Eligibility Criteria
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Course Allowed<span className="text-red-500"> *</span>
                </label>
                <select
                  required
                  name="course_allowed"
                  value={formData.course_allowed}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                >
                  <option value="">Select Course</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="MBA">MBA</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="PHD">PHD</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Departments Allowed<span className="text-red-500"> *</span>
                </label>
                <Select
                  required
                  options={
                    formData.course_allowed === "B.Tech"
                      ? btechdepartmentOptions
                      : formData.course_allowed === "M.Tech"
                      ? mtechdepartmentOptions
                      : formData.course_allowed === "MBA"
                      ? mbadepartmentOptions
                      : formData.course_allowed === "M.Sc"
                      ? mscdepartmentOptions
                      : formData.course_allowed === "PHD"
                      ? phddepartmentOptions
                      : []
                  } // Show departmentOptions if course is selected, otherwise an empty array
                  isMulti
                  onChange={handleDepartmentChange}
                  isDisabled={!formData.course_allowed}
                  className="rounded-xl"
                />
                {!formData.course_allowed && ( // Check if no course is selected
                  <p className="text-red-500 text-sm mt-2">
                    Please choose a course first.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Gender Allowed<span className="text-red-500"> *</span>
                </label>
                <select
                  required
                  name="gender_allowed"
                  value={formData.gender_allowed}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Any">All</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Batch Allowed<span className="text-red-500"> *</span>
                </label>
                <select
                  required
                  name="eligible_batch"
                  value={formData.eligible_batch}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
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
                <label className="block text-gray-700 font-semibold mb-2">
                  Minimum CGPA
                </label>
                <input
                  type="number"
                  name="minimum_cgpa"
                  value={formData.minimum_cgpa}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
              </div>
              <div className="flex items-center">
                <label className="block text-gray-700 font-semibold mb-2 mr-2">
                  Active Backlogs Allowed
                </label>
                <input
                  type="checkbox"
                  name="active_backlogs"
                  checked={formData.active_backlogs}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Hiring Workflow */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Hiring Workflow{" "}
              <span className="text-red-500 text-sm">
                (You can reorder rounds by dragging. And please ensure your
                hiringflow rounds is in below sequence as it can not be change
                later)
              </span>
            </h2>

            {/* Workflow Step Selection */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Round Type
              </label>
              <Select
                options={workflowStepOptions}
                onChange={handleWorkflowStepChange}
                value={workflowStepOptions.find(
                  (option) => option.value === workflowStep.step_type
                )}
                className="rounded-xl"
              />
            </div>

            {/* Dynamic Step Details Form */}
            {workflowStep.step_type === "OA" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <input
                  type="date"
                  name="oa_date"
                  placeholder="OA Date"
                  value={workflowStep.details.oa_date || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <input
                  type="string"
                  name="oa_login_time"
                  placeholder="Login Time"
                  value={workflowStep.details.oa_login_time || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <input
                  type="string"
                  name="oa_duration"
                  placeholder="OA Duration"
                  value={workflowStep.details.oa_duration || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <textarea
                  name="oa_link"
                  placeholder="OA Link"
                  value={workflowStep.details.oa_link || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <textarea
                  name="oa_info"
                  placeholder="OA Info"
                  value={workflowStep.details.oa_info || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
              </div>
            )}

            {workflowStep.step_type === "Interview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <div>
                  <select
                    name="interview_type"
                    value={workflowStep.details.interview_type || ""}
                    onChange={handleStepDetailsChange}
                    className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                  >
                    <option value="">Select Interview Type</option>
                    <option value="Technical Interview 1">
                      Technical Interview 1
                    </option>
                    <option value="Technical Interview 2">
                      Technical Interview 2
                    </option>
                    <option value="Technical Interview 3">
                      Technical Interview 3
                    </option>
                    <option value="HR Interview 1">HR Interview 1</option>
                    <option value="HR Interview 2">HR Interview 2</option>
                    <option value="HR Interview 3">HR Interview 3</option>
                  </select>
                </div>
                <input
                  type="date"
                  name="interview_date"
                  placeholder="Interview Date"
                  value={workflowStep.details.interview_date || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <input
                  type="time"
                  name="interview_time"
                  placeholder="Interview Time"
                  value={workflowStep.details.interview_time || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <textarea
                  name="interview_link"
                  placeholder="Interview Link"
                  value={workflowStep.details.interview_link || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <textarea
                  name="interview_info"
                  placeholder="Interview Info"
                  value={workflowStep.details.interview_info || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
              </div>
            )}

            {workflowStep.step_type === "GD" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <input
                  type="date"
                  name="gd_date"
                  placeholder="GD Date"
                  value={workflowStep.details.gd_date || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <input
                  type="string"
                  name="gd_time"
                  placeholder="GD Time"
                  value={workflowStep.details.gd_time || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <textarea
                  name="gd_link"
                  placeholder="GD Link"
                  value={workflowStep.details.gd_link || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <textarea
                  name="gd_info"
                  placeholder="GD Info"
                  value={workflowStep.details.gd_info || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
              </div>
            )}

            {/* Add/Update Workflow Step Button */}
            <button
              type="button"
              onClick={addWorkflowStep}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl hover:from-green-600 hover:to-green-800 transition-all duration-300"
            >
              {editingIndex !== null ? "Update" : "Add"} Workflow Step
            </button>

            {/* Workflow Steps Display */}
            <div className="mt-6 space-y-4">
              {formData.Hiring_Workflow.map((step, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-4"
                >
                  <div className="cursor-move">
                    <GripVertical className="text-gray-400" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-600">
                      Round {index + 1}:{" "}
                      {
                        workflowStepOptions.find(
                          (opt) => opt.value === step.step_type
                        )?.label
                      }
                    </h3>
                    {getWorkflowStepContent(step)}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => editWorkflowStep(index)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeWorkflowStep(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-10 w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg rounded-2xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
          >
            Create Job
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateJob;
