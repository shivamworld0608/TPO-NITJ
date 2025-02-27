import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ViewJobDetails from "./ViewJob";
import ViewJAF from "./viewjaf";
import CreateJob from "./createjobprofile";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Briefcase,
  Plus,
  Search,
  Check,
  X,
  ArrowLeft,
  Star,
  MessageCircle,
  FileText,
} from "lucide-react";
import { FaArrowLeft, FaSpinner, FaFileUpload } from "react-icons/fa";

import Notification from "./Notification";

const JobProfilesonp = () => {
  const [jobProfiles, setJobProfiles] = useState({
    approved: [],
    notApproved: [],
    completed: [],
    feedbackByCompany: {},
    jafByCompany: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showJAF, setShowJAF] = useState(false);
  const [filters, setFilters] = useState({
    batchEligible: "",
    courseEligible: "",
    branchEligible: "",
    minCGPA: "",
  });
  const [selectedCompany, setSelectedCompany] = useState(null);

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

  useEffect(() => {
    const fetchJobProfiles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/professor/getjobs`,
          { withCredentials: true }
        );
        setJobProfiles(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch job profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobProfiles();
  }, []);

  const handleApprove = async (jobId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${
            import.meta.env.REACT_APP_BASE_URL
          }/jobprofile/approvejob/${jobId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Approved!", "The job has been approved.", "success");
        setJobProfiles((prev) => ({
          ...prev,
          notApproved: prev.notApproved.filter((job) => job._id !== jobId),
          approved: [
            ...prev.approved,
            prev.notApproved.find((job) => job._id === jobId),
          ],
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to approve the job.", "error");
      }
    }
  };

  const handleComplete = async (jobId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark it as complete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${
            import.meta.env.REACT_APP_BASE_URL
          }/jobprofile/completejob/${jobId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Completed!", "The job has been completed.", "success");
        setJobProfiles((prev) => ({
          ...prev,
          approved: prev.approved.filter((job) => job._id !== jobId),
          completed: [
            ...prev.completed,
            prev.approved.find((job) => job._id === jobId),
          ],
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to complete the job.", "error");
      }
    }
  };

  const handleInComplete = async (jobId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark it as incomplete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${
            import.meta.env.REACT_APP_BASE_URL
          }/jobprofile/incompletejob/${jobId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("InCompleted!", "The job has not completed yet.", "success");
        setJobProfiles((prev) => ({
          ...prev,
          completed: prev.completed.filter((job) => job._id !== jobId),
          approved: [
            ...prev.approved,
            prev.completed.find((job) => job._id === jobId),
          ],
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to mark the job as incomplete.", "error");
      }
    }
  };

  const handleReject = async (jobId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/rejectjob/${jobId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Rejected!", "The job has been rejected.", "success");
        setJobProfiles((prev) => ({
          ...prev,
          notApproved: prev.notApproved.filter((job) => job._id !== jobId),
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to reject the job.", "error");
      }
    }
  };

  const JobCard = ({ job, showActions }) => (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
      {job.Approved_Status && !job.completed && (
        <div className="absolute top-2 right-2 text-green-600">
          <Check
            className="w-7 h-7 bg-green-100  rounded-3xl p-1"
            onClick={() => handleComplete(job._id)}
          />
        </div>
      )}
      {job.completed && (
        <div className="absolute top-2 right-2 text-red-600">
          <X
            className="w-7 h-7 bg-red-100  rounded-3xl p-1"
            onClick={() => handleInComplete(job._id)}
          />
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
            {job.company_logo ? (
              <img
                src={job.company_logo}
                className="w-14 h-14 object-contain"
              />
            ) : (
              <span className="text-lg font-bold text-custom-blue">
                {job.company_name?.[0]?.toUpperCase() || "N"}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {job.company_name}
            </h3>
            <p className="text-sm text-gray-500">Job ID: {job.job_id}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">{job.job_role}</p>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">{job.job_salary?.ctc}</p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">{job.joblocation}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">
              Posted: {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        {showActions && (
          <div className="flex space-x-2 w-full">
            <button
              className="flex-1 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              onClick={() => handleApprove(job._id)}
            >
              Approve
            </button>
            <button
              className="flex-1 bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={() => handleReject(job._id)}
            >
              Reject
            </button>
          </div>
        )}
        <button
          className="w-full bg-custom-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => setSelectedJob(job)}
        >
          View Details
        </button>
      </CardFooter>
    </Card>
  );

  const CompanyCard = ({ company, jobs, showActions }) => (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
            {jobs[0].company_logo ? (
              <img
                src={jobs[0].company_logo}
                className="w-14 h-14 object-contain"
              />
            ) : (
              <span className="text-lg font-bold text-custom-blue">
                {company[0]?.toUpperCase() || "N"}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{company}</h3>
            <p className="text-sm text-gray-500">{jobs.length} Job Profiles</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">Various Roles</p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">Multiple Locations</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <button
          className="w-full bg-custom-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => setSelectedCompany(company)}
        >
          View Job Profiles
        </button>
      </CardFooter>
    </Card>
  );

  const FeedbackCard = ({ feedback }) => {
    const renderStars = (rating) => {
      return Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
    };

    const truncateComment = (comment, maxLength = 100) => {
      if (comment.length <= maxLength) return comment;
      return (
        <>
          {comment.slice(0, maxLength)}...
          <button
            className="text-custom-blue hover:underline ml-1"
            onClick={() => alert(feedback.comment)}
          >
            Read More
          </button>
        </>
      );
    };

    return (
      <Card className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="py-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-custom-blue" />
              <p className="text-xs text-gray-700">
                {new Date(feedback.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-700">Technical Skills:</p>
                <div className="flex space-x-1">
                  {renderStars(feedback.technicalSkill)}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-700">Communication Skills:</p>
                <div className="flex space-x-1">
                  {renderStars(feedback.communicationSkill)}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-700">Overall Experience:</p>
                <div className="flex space-x-1">
                  {renderStars(feedback.overallExperience)}
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <MessageCircle className="w-5 h-5 text-custom-blue flex-shrink-0" />
              <p className="text-sm text-gray-700">
                {truncateComment(feedback.comment)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filterJobs = (jobs) => {
    return jobs.filter((job) => {
      const { batchEligible, courseEligible, branchEligible, minCGPA } =
        filters;
      const {
        eligible_batch,
        course_allowed,
        department_allowed,
        minimum_cgpa,
      } = job.eligibility_criteria;

      return (
        (!batchEligible || eligible_batch === batchEligible) &&
        (!courseEligible || course_allowed === courseEligible) &&
        (!branchEligible || department_allowed.includes(branchEligible)) &&
        (!minCGPA || minimum_cgpa >= parseFloat(minCGPA))
      );
    });
  };

  const groupJobsByCompany = (jobs) => {
    return jobs.reduce((acc, job) => {
      if (!acc[job.company_name]) {
        acc[job.company_name] = [];
      }
      acc[job.company_name].push(job);
      return acc;
    }, {});
  };

  const filteredApprovedJobs = filterJobs(
    jobProfiles.approved.filter((job) =>
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredNotApprovedJobs = filterJobs(
    jobProfiles.notApproved.filter((job) =>
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredCompletedJobs = filterJobs(
    jobProfiles.completed.filter((job) =>
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const groupedApprovedJobs = groupJobsByCompany(filteredApprovedJobs);
  const groupedNotApprovedJobs = groupJobsByCompany(filteredNotApprovedJobs);
  const groupedCompletedJobs = groupJobsByCompany(filteredCompletedJobs);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h3 className="text-xl font-semibold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  const handleediting_allowed = (toggle) => {
    selectedJob.recruiter_editing_allowed = toggle;
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl relative">
      {selectedJob ? (
        <ViewJobDetails
          onClose={() => setSelectedJob(null)}
          job={selectedJob}
          oneditingAllowedUpdate={handleediting_allowed}
        />
      ) : showCreateJob ? (
        <CreateJob
          onJobCreated={() => setShowCreateJob(false)}
          onCancel={() => setShowCreateJob(false)}
        />
      ) : showJAF ? (
        jobProfiles.jafByCompany[selectedCompany] ? (
          <ViewJAF
            jaf={jobProfiles.jafByCompany[selectedCompany]}
            onClose={() => setShowJAF(false)}
          />
        ) : (
          <>
            <div className="mt-2 ml-4">
              <button
                className="flex items-center text-blue-600 hover:text-blue-800"
                onClick={() => setShowJAF(false)}
              >
                <FaArrowLeft className="mr-2" />
              </button>
            </div>
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
              <div className="text-center text-gray-500">
                <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>JAF not created for this Company</p>
              </div>
            </div>
          </>
        )
      ) : selectedCompany ? (
        <>
          <div className="relative mb-10">
            <button
              className="absolute top-0 left-4 text-gray-500 m-3 rounded-full"
              onClick={() => setSelectedCompany(null)}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <h1 className="text-4xl font-bold text-center">
              <span className="text-custom-blue">{selectedCompany}</span> Job
              Profiles
            </h1>

            <button
              onClick={() => setShowJAF(true)}
              className="absolute top-0 right-4 group inline-flex items-center gap-2 bg-white border-2 border-custom-blue px-4 py-2 rounded-lg 
               hover:bg-custom-blue transition-all duration-300 shadow-md
               text-custom-blue hover:text-white font-medium"
            >
              <FileText className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>View JAF</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedApprovedJobs[selectedCompany]?.map((job) => (
              <JobCard key={job._id} job={job} showActions={false} />
            ))}
            {groupedNotApprovedJobs[selectedCompany]?.map((job) => (
              <JobCard key={job._id} job={job} showActions={true} />
            ))}
            {groupedCompletedJobs[selectedCompany]?.map((job) => (
              <JobCard key={job._id} job={job} showActions={false} />
            ))}
          </div>

          {jobProfiles.feedbackByCompany[selectedCompany] && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-custom-blue mb-4">
                Company Feedback
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeedbackCard
                  feedback={jobProfiles.feedbackByCompany[selectedCompany]}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex sm:flex-row flex-col sm:space-x-4 items-center justify-center ">
            <h1 className="text-4xl font-bold text-center mb-8 text-custom-blue">
              Job Profiles Dashboard
            </h1>
            <button
              className="bg-custom-blue text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
              onClick={() => setShowCreateJob(true)}
            >
              <span>Create Job Profile</span>
            </button>
          </div>

          <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Filter Jobs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Batch Eligible
                </label>
                <input
                  type="text"
                  name="batchEligible"
                  value={filters.batchEligible}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  placeholder="e.g., 2023"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Eligible
                </label>
                <select
                  name="courseEligible"
                  value={filters.courseEligible}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue"
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
                <label className="block text-sm font-medium text-gray-700">
                  Branch Eligible
                </label>
                <select
                  name="branchEligible"
                  value={filters.branchEligible}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue"
                >
                  <option value="">Select Branch</option>
                  {btechdepartmentOptions.map((dept) => (
                    <optgroup key={dept.label} label={dept.label}>
                      {dept.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minimum CGPA
                </label>
                <input
                  type="number"
                  name="minCGPA"
                  value={filters.minCGPA}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  placeholder="e.g., 7.5"
                  min="0"
                  max="10"
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue="approved" className="w-full">
            <TabsList className="grid w-full sm:grid-cols-3 grid-cols-2 sm:mb-8 mb-16 gap-2">
              <TabsTrigger
                value="approved"
                className="data-[state=active]:bg-custom-blue data-[state=active]:text-white bg-gray-300 rounded-3xl py-2"
              >
                Approved Jobs ({filteredApprovedJobs.length})
              </TabsTrigger>
              <TabsTrigger
                value="not-approved"
                className="border data-[state=active]:bg-custom-blue data-[state=active]:text-white bg-gray-300 rounded-3xl py-2"
              >
                Pending Approval ({filteredNotApprovedJobs.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="border data-[state=active]:bg-custom-blue data-[state=active]:text-white bg-gray-300 rounded-3xl py-2 "
              >
                Completed Jobs ({filteredCompletedJobs.length})
              </TabsTrigger>
            </TabsList>

            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by company name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <TabsContent value="approved">
              {Object.keys(groupedApprovedJobs).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(groupedApprovedJobs).map(
                    ([company, jobs]) => (
                      <CompanyCard
                        key={company}
                        company={company}
                        jobs={jobs}
                        showActions={false}
                      />
                    )
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No approved job profiles found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="not-approved">
              {Object.keys(groupedNotApprovedJobs).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(groupedNotApprovedJobs).map(
                    ([company, jobs]) => (
                      <CompanyCard
                        key={company}
                        company={company}
                        jobs={jobs}
                        showActions={true}
                      />
                    )
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No jobs pending approval found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed">
              {Object.keys(groupedCompletedJobs).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(groupedCompletedJobs).map(
                    ([company, jobs]) => (
                      <CompanyCard
                        key={company}
                        company={company}
                        jobs={jobs}
                        showActions={false}
                      />
                    )
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No completed job profiles found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
      <Notification />
    </div>
  );
};

export default JobProfilesonp;
