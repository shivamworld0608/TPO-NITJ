import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { AlertCircle, GripVertical, X, Edit2 } from "lucide-react";

const btechdepartmentOptions = [
  {
    label: "Biotechnology",
    options: [{ value: "Biotechnology", label: "Biotechnology" }],
  },
  {
    label: "Chemical Engineering",
    options: [{ value: "Chemical Engineering", label: "Chemical Engineering" }],
  },
  {
    label: "Civil Engineering",
    options: [{ value: "Civil Engineering", label: "Civil Engineering" }],
  },
  {
    label: "Computer Science & Engineering",
    options: [
      {
        value: "Computer Science & Engineering",
        label: "Computer Science & Engineering",
      },
      {
        value: "Data Science and Engineering",
        label: "Data Science and Engineering",
      },
    ],
  },
  {
    label: "Electrical Engineering",
    options: [
      { value: "Electrical Engineering", label: "Electrical Engineering" },
    ],
  },
  {
    label: "Electronics & Communication Engineering",
    options: [
      {
        value: "Electronics & Communication Engineering",
        label: "Electronics & Communication Engineering",
      },
      {
        value: "Electronics and VLSI Engineering",
        label: "Electronics and VLSI Engineering",
      },
    ],
  },
  {
    label: "Industrial and Production Engineering",
    options: [
      {
        value: "Industrial and Production Engineering",
        label: "Industrial and Production Engineering",
      },
    ],
  },
  {
    label: "Information Technology",
    options: [
      { value: "Information Technology", label: "Information Technology" },
    ],
  },
  {
    label: "Instrumentation and Control Engineering",
    options: [
      {
        value: "Instrumentation and Control Engineering",
        label: "Instrumentation and Control Engineering",
      },
    ],
  },
  {
    label: "Mathematics and Computing",
    options: [
      {
        value: "Mathematics and Computing",
        label: "Mathematics and Computing",
      },
    ],
  },
  {
    label: "Mechanical Engineering",
    options: [
      { value: "Mechanical Engineering", label: "Mechanical Engineering" },
    ],
  },
  {
    label: "Textile Technology",
    options: [{ value: "Textile Technology", label: "Textile Technology" }],
  },
];

const mtechdepartmentOptions = [
  {
    label: "Biotechnology",
    options: [{ value: "Biotechnology", label: "Biotechnology" }],
  },
  {
    label: "Chemical Engineering",
    options: [{ value: "Chemical Engineering", label: "Chemical Engineering" }],
  },
  {
    label: "Civil Engineering",
    options: [
      {
        value: "Structural and Construction Engineering",
        label: "Structural and Construction Engineering",
      },
      {
        value: "Geotechnical and Geo-Environmental Engineering",
        label: "Geotechnical and Geo-Environmental Engineering",
      },
    ],
  },
  {
    label: "Computer Science & Engineering",
    options: [
      {
        value: "Computer Science & Engineering",
        label: "Computer Science & Engineering",
      },
      { value: "Information Security", label: "Information Security" },
      {
        value: "Data Science and Engineering",
        label: "Data Science and Engineering",
      },
    ],
  },
  {
    label: "Electrical Engineering",
    options: [
      { value: "Electric Vehicle Design", label: "Electric Vehicle Design" },
    ],
  },
  {
    label: "Electronics & Communication Engineering",
    options: [
      {
        value: "Signal Processing and Machine Learning",
        label: "Signal Processing and Machine Learning",
      },
      { value: "VLSI Design", label: "VLSI Design" },
    ],
  },
  {
    label: "Industrial & Production Engineering",
    options: [
      {
        value: "Industrial Engineering and Data Analytics",
        label: "Industrial Engineering and Data Analytics",
      },
      {
        value: "Manufacturing Technology With Machine Learning",
        label: "Manufacturing Technology With Machine Learning",
      },
    ],
  },
  {
    label: "Information Technology",
    options: [{ value: "Data Analytics", label: "Data Analytics" }],
  },
  {
    label: "Instrumentation and Control Engineering",
    options: [
      {
        value: "Control and Instrumentation",
        label: "Control and Instrumentation",
      },
      {
        value: "Machine Intelligence and Automation",
        label: "Machine Intelligence and Automation",
      },
    ],
  },
  {
    label: "Mathematics and Computing",
    options: [
      {
        value: "Mathematics and Computing",
        label: "Mathematics and Computing",
      },
    ],
  },
  {
    label: "Mechanical Engineering",
    options: [
      { value: "Design Engineering", label: "Design Engineering" },
      {
        value: "Thermal and Energy Engineering",
        label: "Thermal and Energy Engineering",
      },
    ],
  },
  {
    label: "Textile Engineering",
    options: [
      {
        value: "Textile Engineering and Management",
        label: "Textile Engineering and Management",
      },
    ],
  },
  {
    label: "Renewable Energy",
    options: [{ value: "Renewable Energy", label: "Renewable Energy" }],
  },
  {
    label: "Artificial Intelligence",
    options: [
      { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    ],
  },
  {
    label: "Power Systems and Reliability",
    options: [
      {
        value: "Power Systems and Reliability",
        label: "Power Systems and Reliability",
      },
    ],
  },
];

const mbadepartmentOptions = [
  { value: "Finance", label: "Finance" },
  { value: "Human Resource", label: "Human Resource" },
  { value: "Marketing", label: "Marketing" },
];

const mscdepartmentOptions = [
  { value: "Chemistry", label: "Chemistry" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Physics", label: "Physics" },
];

const phddepartmentOptions = [
  { value: "Biotechnology", label: "Biotechnology" },
  { value: "Chemical Engineering", label: "Chemical Engineering" },
  { value: "Civil Engineering", label: "Civil Engineering" },
  {
    value: "Computer Science and Engineering",
    label: "Computer Science and Engineering",
  },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  {
    value: "Electronics and Communication Engineering",
    label: "Electronics and Communication Engineering",
  },
  {
    value: "Industrial and Production Engineering",
    label: "Industrial and Production Engineering",
  },
  { value: "Information Technology", label: "Information Technology" },
  {
    value: "Instrumentation and Control Engineering",
    label: "Instrumentation and Control Engineering",
  },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Textile Technology", label: "Textile Technology" },
];

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
  { value: "Tech+Non-Tech", label: "Tech + Non-Tech" },
];

const workflowStepOptions = [
  { value: "", label: "Select Round Type" },
  { value: "Resume Shortlisting", label: "Resume Shortlisting" },
  { value: "OA", label: "Online Assessment" },
  { value: "Interview", label: "Interview" },
  { value: "GD", label: "Group Discussion" },
  { value: "Others", label: "Others" },
];

const CreateJob = ({ onJobCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    job_id: "",
    company_name: "",
    // company_logo: "",
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
    history_backlogs: false,
  });

  const [workflowStep, setWorkflowStep] = useState({
    step_type: "",
    details: {},
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "course_allowed" && {}), // Clear departments when course changes
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
      case "Others":
        return (
          <div className="text-sm">
            <p>Date: {step.details.others_date}</p>
            <p>Time: {step.details.others_time}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
    e.preventDefault();
    setIsSubmitting(true);
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
    }finally {
      setIsSubmitting(false);
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
        <h1 className="text-4xl font-extrabold text-center text-custom-blue bg-clip-text mb-8">
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
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
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
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
            {/* <div>
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
            </div> */}
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
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
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
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
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
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Job Type<span className="text-red-500"> *</span>
              </label>
              <select
                required
                options={jobTypeOptions}
                onChange={(option) => handleSelectChange("job_type", option)}
                defaultValue={jobTypeOptions.find(
                  (option) => option.value === formData.job_type
                )}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              >
                <option value="">Select Job Type</option>
                <option value="2m Intern">2-Month Internship</option>
                <option value="6m Intern">6-Month Internship</option>
                <option value="Intern+PPO">
                  Intern + Pre Placement Offer(PPO)
                </option>
                <option value="Intern+FTE">
                  Intern + Full-Time Employment(FTE)
                </option>
                <option value="FTE">Full-Time Employment(FTE)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Job Category<span className="text-red-500"> *</span>
              </label>
              <select
                required
                options={jobCategoryOptions}
                onChange={(option) =>
                  handleSelectChange("job_category", option)
                }
                defaultValue={jobCategoryOptions.find(
                  (option) => option.value === formData.job_category
                )}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              >
                <option value="">Select Job Category</option>
                <option value="Tech">Tech</option>
                <option value="Non-Tech">Non-Tech</option>
                <option value="Tech+Non-Tech">Tech + Non-Tech</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                CTC
              </label>
              <input
                type="number"
                name="ctc"
                value={formData.ctc}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Stipend
              </label>
              <input
                type="number"
                name="stipend"
                value={formData.stipend} //baceknd me ctc ko stipend me change krna h
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
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
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
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
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-custom-blue mb-6">
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
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
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
                  className="w-full border-2 p-1.5 border-gray-200 rounded-xl  focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300 "
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
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
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
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
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
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
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
                  className="form-checkbox h-5 w-5 text-custom-blue rounded focus:ring-custom-blue transition-all duration-300"
                />
              </div>
              <div className="flex items-center">
                <label className="block text-gray-700 font-semibold mb-2 mr-2">
                  Backlogs History Allowed
                </label>
                <input
                  type="checkbox"
                  name="history_backlogs"
                  checked={formData.history_backlogs}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-custom-blue rounded focus:ring-custom-blue transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Hiring Workflow */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-custom-blue mb-6">
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
                className="w-full border-2 border-gray-200 rounded-xl p-1.5 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>

            {/* Dynamic Step Details Form */}
            {workflowStep.step_type === "Resume Shortlisting" && <></>}

            {workflowStep.step_type === "OA" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <input
                  type="date"
                  name="oa_date"
                  placeholder="OA Date"
                  value={workflowStep.details.oa_date || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <input
                  type="string"
                  name="oa_login_time"
                  placeholder="Login Time"
                  value={workflowStep.details.oa_login_time || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <input
                  type="string"
                  name="oa_duration"
                  placeholder="OA Duration"
                  value={workflowStep.details.oa_duration || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <textarea
                  name="oa_info"
                  placeholder="OA Info"
                  value={workflowStep.details.oa_info || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
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
                    className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
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
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <input
                  type="time"
                  name="interview_time"
                  placeholder="Interview Time"
                  value={workflowStep.details.interview_time || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <textarea
                  name="interview_info"
                  placeholder="Interview Info"
                  value={workflowStep.details.interview_info || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
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
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <input
                  type="string"
                  name="gd_time"
                  placeholder="GD Time"
                  value={workflowStep.details.gd_time || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
                <textarea
                  name="gd_info"
                  placeholder="GD Info"
                  value={workflowStep.details.gd_info || ""}
                  onChange={handleStepDetailsChange}
                  className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                />
              </div>
            )}

            {workflowStep.step_type === "Others" && (
              <>
                <input
                  type="string"
                  name="others_round_name"
                  placeholder="Name of Round"
                  value={workflowStep.details.others_round_name}
                  onChange={handleStepDetailsChange}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300 mt-4"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  <input
                    type="date"
                    name="others_date"
                    placeholder="Round Date"
                    value={workflowStep.details.others_date || ""}
                    onChange={handleStepDetailsChange}
                    className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                  />
                  <input
                    type="string"
                    name="others_login_time"
                    placeholder="Login Time"
                    value={workflowStep.details.others_login_time || ""}
                    onChange={handleStepDetailsChange}
                    className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                  />
                  <input
                    type="string"
                    name="others_duration"
                    placeholder="Round Duration"
                    value={workflowStep.details.others_duration || ""}
                    onChange={handleStepDetailsChange}
                    className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                  />
                  <textarea
                    name="others_info"
                    placeholder="Round Info"
                    value={workflowStep.details.others_info || ""}
                    onChange={handleStepDetailsChange}
                    className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                  />
                </div>
              </>
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
                    <h3 className="font-semibold text-custom-blue">
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
                      className="p-2 text-custom-blue hover:bg-blue-50 rounded-full"
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
            className="mt-10 w-full px-8 py-4 bg-custom-blue text-white font-semibold text-lg rounded-2xl hover:bg-blue-700 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Job"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateJob;