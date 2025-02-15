import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Users, FileText, Edit, Trash2, Plus, X, Pencil } from "lucide-react";
import Select from "react-select";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import AppliedStudents from "./appliedstudent";
import CreateApplicationform from "./createapplicationform";
import ViewApplicationForm from "./viewapplicationform";
import EditApplicationForm from "./editapplicationform";
import ShortlistStudents from "./shortliststudent";
import ViewShortlistStudents from "./viewshortlistedstudent";
import InterviewLinkManager from "./interviewlink";
import GDLinkManager from "./gdlink";
import OaLinkManager from "./oalink";
import OthersLinkManager from "./otherslink";
import AuditLogs from "../AuditLogs";

const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
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
  const [editedWorkflow, setEditedWorkflow] = useState(
    job.Hiring_Workflow || []
  );
  const [viewingShortlist, setViewingShortlist] = useState(null);
  const [addingShortlist, setAddingShortlist] = useState(null);
  const [addingInterviewLink, setAddingInterviewLink] = useState(null);
  const [addingGDLink, setAddingGDLink] = useState(null);
  const [addingOALink, setAddingOALink] = useState(null);
  const [addingOthersLink,setAddingOthersLink]=useState(null);
  const [isDeleting, setisDeleting] = useState(false);

  const [editingAllowed, setEditingAllowed] = useState(false);
   
  const handleToggleEditing = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/toggle-editing`,
        {company:editedJob.company_name},
        { withCredentials: true }
      );
      if (response.data.success) {
        setEditingAllowed(response.data.editing_allowed);
        toast.success(`Editing ${response.data.editing_allowed ? "Enabled" : "Disabled"}`);
      }
    } catch (error) {
      console.error("Error toggling editing:", error);
      toast.error("Failed to toggle editing");
    }
  };


  const btechdepartmentOptions = [
    {
      label: "Biotechnology",
      options: [{ value: "Biotechnology", label: "Biotechnology" }],
    },
    {
      label: "Chemical Engineering",
      options: [
        { value: "Chemical Engineering", label: "Chemical Engineering" },
      ],
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
      options: [
        { value: "Chemical Engineering", label: "Chemical Engineering" },
      ],
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

  const getDepartmentOptions = (course) => {
    switch (course) {
      case "B.Tech":
        return btechdepartmentOptions;
      case "M.Tech":
        return mtechdepartmentOptions;
      case "MBA":
        return mbadepartmentOptions;
      case "M.Sc":
        return mscdepartmentOptions;
      case "PHD":
        return phddepartmentOptions;
      default:
        return [];
    }
  };

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

  useEffect(() => {
    const checkApplicationFormExistence = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/api/check-aft-exist/${
            job._id
          }`,
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

  useEffect(() => {
  const fetchRecruiterData = async () => {
    try {
      console.log("ghj");
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/editing-allowed-status/${editedJob.company_name}`,
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.editing_allowed !== undefined) {
        setEditingAllowed(response.data.editing_allowed);
      }
    } catch (error) {
      console.error("Error fetching recruiter data:", error);
    }
  };
  fetchRecruiterData();
}, []);

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
    if(isDeleting) return;
    setisDeleting(true);
    Swal.fire({
      title: "Delete Application Form",
      text: "This action cannot be undone. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-lg",
        confirmButton: "px-4 py-2 rounded-md",
        cancelButton: "px-4 py-2 rounded-md",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `${import.meta.env.REACT_APP_BASE_URL}/api/delete-form-template/${
              job._id
            }`,
            {},
            { withCredentials: true }
          );
          setApplicationFormexist(false);
          toast.success("Application form deleted successfully");
        } catch (error) {
          console.error("Error deleting application form:", error);
          toast.error("Failed to delete application form");
        }
        finally {
          setisDeleting(false);
        }
      }
    });
  };

  const handleSave = async (section) => {
    try {
      let updateData = {};
      if (section === "hiring_workflow") {
        updateData = { Hiring_Workflow: editedWorkflow };
      } else if (section === "eligibility") {
        updateData = { eligibility_criteria: editedJob.eligibility_criteria };
      } else if (section === "salary") {
        updateData = { job_salary: editedJob.job_salary };
      } else if (section === "basic") {
        updateData = {
          company_name: editedJob.company_name,
          job_id: editedJob.job_id,
          job_role: editedJob.job_role,
          job_type: editedJob.job_type,
          jobdescription: editedJob.jobdescription,
          joblocation: editedJob.joblocation,
          job_category: editedJob.job_category,
          job_class: editedJob.job_class,
          deadline: editedJob.deadline,
        };
      }

      const response = await axios.put(
        `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/updatejob/${job._id}`,
        updateData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Job updated successfully!");
        Object.assign(job, editedJob);
        setEditingSection(null);
        setEditingStepIndex(null);
      }
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Failed to update job");
    }
  };

  const handleInputChange = (section, field, value) => {
    if (section === "hiring_workflow") {
      const updatedWorkflow = [...editedWorkflow];
      const [fieldPath, ...subFields] = field.split(".");

      if (subFields.length > 0) {
        updatedWorkflow[editingStepIndex].details[subFields.join(".")] = value;
      } else {
        updatedWorkflow[editingStepIndex][fieldPath] = value;
      }

      setEditedWorkflow(updatedWorkflow);
    } else {
      const updatedJob = { ...editedJob };
      const fieldPath = field.split(".");
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
          <strong className="w-1/3 text-gray-800">Company Name:</strong>
          {editingSection === "basic" ? (
            <input
              type="text"
              value={editedJob.company_name || ""}
              onChange={(e) =>
                handleInputChange("basic", "company_name", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="flex-1">{editedJob.company_name}</span>
          )}
        </div>
        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Job Id:</strong>
          {editingSection === "basic" ? (
            <input
              type="text"
              value={editedJob.job_id || ""}
              onChange={(e) =>
                handleInputChange("basic", "job_id", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="flex-1">{editedJob.job_id}</span>
          )}
        </div>
        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Job Role:</strong>
          {editingSection === "basic" ? (
            <input
              type="text"
              value={editedJob.job_role || ""}
              onChange={(e) =>
                handleInputChange("basic", "job_role", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="flex-1">{editedJob.job_role}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Job Type:</strong>
          {editingSection === "basic" ? (
            <select
              value={editedJob.job_type || ""}
              onChange={(e) =>
                handleInputChange("basic", "job_type", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {jobTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <span className="flex-1">{editedJob.job_type}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Job Category:</strong>
          {editingSection === "basic" ? (
            <select
              value={editedJob.job_category || ""}
              onChange={(e) =>
                handleInputChange("basic", "job_category", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {jobCategoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <span className="flex-1">{editedJob.job_category}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Location:</strong>
          {editingSection === "basic" ? (
            <input
              type="text"
              value={editedJob.joblocation || ""}
              onChange={(e) =>
                handleInputChange("basic", "joblocation", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="flex-1">{editedJob.joblocation}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Description:</strong>
          {editingSection === "basic" ? (
            <textarea
              value={editedJob.jobdescription || ""}
              onChange={(e) =>
                handleInputChange("basic", "jobdescription", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          ) : (
            <span className="flex-1">{editedJob.jobdescription}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Deadline:</strong>
          {editingSection === "basic" ? (
            <input
              type="datetime-local"
              value={
                editedJob.deadline
                  ? new Date(editedJob.deadline).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                handleInputChange("basic", "deadline", e.target.value)
              }
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
          {editingSection === "salary" ? (
            <input
              type="text"
              value={editedJob.job_salary?.ctc || ""}
              onChange={(e) =>
                handleInputChange("salary", "job_salary.ctc", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="flex-1">{editedJob.job_salary?.ctc || "N/A"}</span>
          )}
        </div>

        <div className="flex items-center">
          <strong className="w-1/3 text-gray-800">Base Salary:</strong>
          {editingSection === "salary" ? (
            <input
              type="text"
              value={editedJob.job_salary?.base_salary || ""}
              onChange={(e) =>
                handleInputChange(
                  "salary",
                  "job_salary.base_salary",
                  e.target.value
                )
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <span className="flex-1">
              {editedJob.job_salary?.base_salary || "N/A"}
            </span>
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

  if (addingOthersLink) {
    return (
      <OthersLinkManager
        jobId={job._id}
        stepIndex={addingOthersLink.stepIndex}
        onClose={() => setAddingOthersLink(null)}
        othersLinks={
          job.Hiring_Workflow[addingOthersLink.stepIndex]?.details.others_link || []
        }
        onUpdateLinks={(updatedLinks) => {
          const updatedWorkflow = [...job.Hiring_Workflow];
          updatedWorkflow[addingOthersLink.stepIndex].details.others_link = updatedLinks;
          setEditedWorkflow(updatedWorkflow);
        }}
      />
    );
  }

  if (addingOALink) {
    return (
      <OaLinkManager
        jobId={job._id}
        stepIndex={addingOALink.stepIndex}
        onClose={() => setAddingOALink(null)}
        oaLinks={
          job.Hiring_Workflow[addingOALink.stepIndex]?.details.oa_link || []
        }
        onUpdateLinks={(updatedLinks) => {
          const updatedWorkflow = [...job.Hiring_Workflow];
          updatedWorkflow[addingOALink.stepIndex].details.oa_link = updatedLinks;
          setEditedWorkflow(updatedWorkflow);
        }}
      />
    );
  }
    if (addingInterviewLink) {
      return (
        <InterviewLinkManager
          jobId={job._id}
          stepIndex={addingInterviewLink.stepIndex}
          onClose={() => setAddingInterviewLink(null)}
          interviewLinks={
            job.Hiring_Workflow[addingInterviewLink.stepIndex]?.details
              .interview_link || []
          }
          onUpdateLinks={(updatedLinks) => {
            const updatedWorkflow = [...job.Hiring_Workflow];
            updatedWorkflow[addingInterviewLink.stepIndex].details.interview_link = updatedLinks;
            setEditedWorkflow(updatedWorkflow);
          }}
        />
      );
    }

  if (addingGDLink) {
    return (
      <GDLinkManager
        jobId={job._id}
        stepIndex={addingGDLink.stepIndex}
        onClose={() => setAddingGDLink(null)}
        gdLinks={
          job.Hiring_Workflow[addingGDLink.stepIndex]?.details.gd_link || []
        }
      />
    );
  }

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
              onClick={() => handleEdit("hiring_workflow", index)}
            >
              <Pencil size={20} />
            </button>

            <h3 className="text-2xl font-semibold text-custom-blue mb-6">
              {step.step_type} Step
            </h3>

            <ul className="space-y-4 text-gray-700">
              {Object.entries(step.details || {}).map(([key, value]) => {
                if (
                  (step.step_type === "Interview" &&
                    key.toLowerCase().includes("interview_link")) ||
                  (step.step_type === "GD" &&
                    key.toLowerCase().includes("gd_link")) ||
                    (step.step_type === "OA" &&
                      key.toLowerCase().includes("oa_link"))||
                    (step.step_type === "Others" &&
                      key.toLowerCase().includes("others_link"))
                ) {
                  return null;
                }

                return (
                  <li key={key} className="flex items-center">
                    <strong className="w-1/3 text-gray-800 capitalize">
                      {key.replace(/_/g, " ")}:
                    </strong>
                    {editingStepIndex === index &&
                    editingSection === "hiring_workflow" ? (
                      key.toLowerCase().includes("date") ? (
                        <input
                          type="date"
                          value={
                            editedWorkflow[index].details[key]
                              ? new Date(editedWorkflow[index].details[key])
                                  .toISOString()
                                  .slice(0, 10)
                              : ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              "hiring_workflow",
                              `details.${key}`,
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <input
                          type="text"
                          value={editedWorkflow[index].details[key] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "hiring_workflow",
                              `details.${key}`,
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      )
                    ) : (
                      <span className="flex-1">
                        {key.toLowerCase().includes("date")
                          ? formatDate(value)
                          : value || "N/A"}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex space-x-4">
            {step.step_type === "Others" && (
  <button
    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-2xl hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
    onClick={() =>
      setAddingOthersLink({ stepIndex: index, type: "Others" })
    }
  >
    Manage Other Assessment Links
  </button>
)}
            {step.step_type === "OA" && (
  <button
    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-2xl hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
    onClick={() =>
      setAddingOALink({ stepIndex: index, type: "OA" })
    }
  >
    Manage OA Links
  </button>
)}
              {step.step_type === "GD" && (
                <button
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-2xl hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  onClick={() =>
                    setAddingGDLink({ stepIndex: index, type: "GD" })
                  }
                >
                  Manage GD Links
                </button>
              )}
              {step.step_type === "Interview" && (
                <button
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-2xl hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  onClick={() =>
                    setAddingInterviewLink({
                      stepIndex: index,
                      type: "Interview",
                    })
                  }
                >
                  Manage Interview Links
                </button>
              )}
              <button
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                onClick={() => setAddingShortlist({ stepIndex: index })}
              >
                Add Shortlisted Students
              </button>
              <button
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                onClick={() => setViewingShortlist({ stepIndex: index })}
              >
                View Shortlisted Students
              </button>
              {editingStepIndex === index &&
                editingSection === "hiring_workflow" && (
                  <>
                    <button
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                      onClick={() => handleSave("hiring_workflow")}
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
        {editingSection === "eligibility" ? (
          <div className="flex-1">
            <Select
              isMulti
              options={getDepartmentOptions(
                editedJob.eligibility_criteria?.course_allowed
              )}
              value={
                editedJob.eligibility_criteria?.course_allowed === "B.Tech" ||
                editedJob.eligibility_criteria?.course_allowed === "M.Tech"
                  ? getDepartmentOptions(
                      editedJob.eligibility_criteria?.course_allowed
                    )
                      .flatMap((group) => group.options)
                      .filter((option) =>
                        editedJob.eligibility_criteria?.department_allowed?.includes(
                          option.value
                        )
                      )
                  : getDepartmentOptions(
                      editedJob.eligibility_criteria?.course_allowed
                    ).filter((option) =>
                      editedJob.eligibility_criteria?.department_allowed?.includes(
                        option.value
                      )
                    )
              }
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : [];
                handleInputChange(
                  "eligibility",
                  "eligibility_criteria.department_allowed",
                  selectedValues
                );
              }}
              isDisabled={!editedJob.eligibility_criteria?.course_allowed}
              className="w-full border-2 p-1.5 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
            />
          </div>
        ) : (
          <span className="flex-1">
            {editedJob.eligibility_criteria?.department_allowed?.join(", ") ||
              "N/A"}
          </span>
        )}
      </div>

      <div className="flex items-center">
        <strong className="w-1/3 text-gray-800">Gender Allowed:</strong>
        {editingSection === "eligibility" ? (
          <select
            value={editedJob.eligibility_criteria?.gender_allowed || ""}
            onChange={(e) =>
              handleInputChange(
                "eligibility",
                "eligibility_criteria.gender_allowed",
                e.target.value
              )
            }
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Any">All</option>
          </select>
        ) : (
          <span className="flex-1">
            {editedJob.eligibility_criteria?.gender_allowed || "N/A"}
          </span>
        )}
      </div>

      <div className="flex items-center">
        <strong className="w-1/3 text-gray-800">Course Allowed:</strong>
        {editingSection === "eligibility" ? (
          <select
            value={editedJob.eligibility_criteria?.course_allowed || ""}
            onChange={(e) =>
              handleInputChange(
                "eligibility",
                "eligibility_criteria.course_allowed",
                e.target.value
              )
            }
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Course</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="MBA">MBA</option>
            <option value="M.Sc">M.Sc</option>
            <option value="PHD">PHD</option>
          </select>
        ) : (
          <span className="flex-1">
            {editedJob.eligibility_criteria?.course_allowed || "N/A"}
          </span>
        )}
      </div>

      <div className="flex items-center">
        <strong className="w-1/3 text-gray-800">Eligible Batch:</strong>
        {editingSection === "eligibility" ? (
          <select
            value={editedJob.eligibility_criteria?.eligible_batch || ""}
            onChange={(e) =>
              handleInputChange(
                "eligibility",
                "eligibility_criteria.eligible_batch",
                e.target.value
              )
            }
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
          <span className="flex-1">
            {editedJob.eligibility_criteria?.eligible_batch || "N/A"}
          </span>
        )}
      </div>

      <div className="flex items-center">
        <strong className="w-1/3 text-gray-800">
          Active Backlogs Allowed:
        </strong>
        {editingSection === "eligibility" ? (
          <input
            type="checkbox"
            checked={editedJob.eligibility_criteria?.active_backlogs || false}
            onChange={(e) =>
              handleInputChange(
                "eligibility",
                "eligibility_criteria.active_backlogs",
                e.target.checked
              )
            }
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        ) : (
          <span className="flex-1">
            {editedJob.eligibility_criteria?.active_backlogs ? "Yes" : "No"}
          </span>
        )}
      </div>
      <div className="flex items-center">
        <strong className="w-1/3 text-gray-800">
          Backlogs History Allowed:
        </strong>
        {editingSection === "eligibility" ? (
          <input
            type="checkbox"
            checked={editedJob.eligibility_criteria?.history_backlogs || false}
            onChange={(e) =>
              handleInputChange(
                "eligibility",
                "eligibility_criteria.history_backlogs",
                e.target.checked
              )
            }
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        ) : (
          <span className="flex-1">
            {editedJob.eligibility_criteria?.history_backlogs ? "Yes" : "No"}
          </span>
        )}
      </div>

      <div className="flex items-center">
        <strong className="w-1/3 text-gray-800">Minimum CGPA:</strong>
        {editingSection === "eligibility" ? (
          <input
            type="number"
            min="0"
            max="10"
            value={editedJob.eligibility_criteria?.minimum_cgpa || ""}
            onChange={(e) =>
              handleInputChange(
                "eligibility",
                "eligibility_criteria.minimum_cgpa",
                e.target.value
              )
            }
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <span className="flex-1">
            {editedJob.eligibility_criteria?.minimum_cgpa || "N/A"}
          </span>
        )}
      </div>
    </div>
  );

  if (addingShortlist) {
    return (
      <ShortlistStudents
        jobId={job._id}
        stepIndex={addingShortlist.stepIndex}
        onClose={() => setAddingShortlist(null)}
      />
    );
  }
  if (viewingShortlist) {
    return (
      <ViewShortlistStudents
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
        company_name={editedJob.company_name}
        onClose={() => setViewingAppliedStudents(false)}
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
        <div className="flex items-center space-x-4">
    {job.Approved_Status && (
      <button
        className="bg-gradient-to-r from-[#0369A0] to-[#024873] text-white px-8 py-3 rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        onClick={() => setViewingAppliedStudents(true)}
      >
        <Users className="mr-2 h-4 w-4 inline" />
        View Applied Students
      </button>
    )}
    
    <label className="inline-flex items-center cursor-pointer py-3">
      <input
        type="checkbox"
        checked={editingAllowed}
        onChange={handleToggleEditing}
        className="hidden"
      />
      <div className={`
        w-14 h-8 rounded-full relative transition-colors duration-300
        ${editingAllowed ? 'bg-green-500' : 'bg-red-500'}
      `}>
        <span className={`
          absolute top-1 left-1 w-6 h-6 bg-white rounded-full 
          transition-transform duration-300
          ${editingAllowed ? 'translate-x-6' : ''}
        `}></span>
      </div>
    </label>

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
      {renderEditableCard(
        "Eligibility Criteria",
        renderEligibilityCriteria(),
        "eligibility"
      )}

      <h3 className="text-3xl font-bold text-custom-blue mt-10 mb-8">
        Hiring Workflow
      </h3>
      {renderHiringWorkflow()}
      <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative mt-8">
        {/*       <div className="mt-8 space-y-4"> */}
        <h3 className="text-2xl font-semibold text-custom-blue mb-6">
          Application Form
        </h3>
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
              disabled={isDeleting}

            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting ? "Deleting..." : "Delete Form"}
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
      <AuditLogs logs={job.auditLogs || []} />
    </div>
  );
};

export default ViewJobDetails;
