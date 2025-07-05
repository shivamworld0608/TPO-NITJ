import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import ApplicationForm from "./applicationform";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Calendar, Users, FileText, Award } from 'lucide-react';
import {
  Clock,
  MapPin,
  CheckCircle,
  Info,
} from "lucide-react";
import Swal from "sweetalert2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  faMapMarkerAlt,
  faClipboardList,
  faInfoCircle,
  faBriefcase,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";

// Function to get the color theme based on step type
const getStepTheme = (stepType) => {
  switch (stepType) {
    case "OA":
      return {
        border: "border-blue-400",
        bg: "bg-indigo-50",
        hover: "hover:border-blue-600 hover:bg-indigo-100",
        dot: "bg-indigo-500"
      };
    case "Interview":
      return {
        border: "border-emerald-500",
        bg: "bg-emerald-50",
        hover: "hover:border-emerald-600 hover:bg-emerald-100",
        dot: "bg-emerald-500"
      };
    case "Others":
      return {
        border: "border-amber-500",
        bg: "bg-amber-50",
        hover: "hover:border-amber-600 hover:bg-amber-100",
        dot: "bg-amber-500"
      };
    default:
      return {
        border: "border-gray-300",
        bg: "bg-gray-50",
        hover: "hover:border-gray-400 hover:bg-gray-100",
        iconBorder: "border-gray-300",
        dot: "bg-gray-400"
      };
  }
};

const Jobdetail = () => {
  const [activeInfo, setActiveInfo] = useState("jobDescription");
  const [jobDetails, setJobDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [application, setApplication] = useState(false);
  const [isdeadlineOver, setIsdeadlineOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [description, setDescription] = useState(false);
  const { job_id } = useParams(); 

  const navigate = useNavigate();
  const onBack = () => {
    navigate("/sdashboard/job-application");
  }

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/${job_id}`,
          { withCredentials: true }
        );
        setJobDetails(response.data.job || {});
      } catch (error) {
        setError("Failed to fetch job details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [job_id]);

  useEffect(() => {
    const fetchEligibility = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.REACT_APP_BASE_URL
          }/jobprofile/eligibility/${job_id}`,
          { withCredentials: true }
        );
        setStatus(response.data || "");
        setIsdeadlineOver(response.data.isDeadlineOver);
      } catch (error) {
        setError("Failed to fetch eligibility status. Please try again.");
      }
    };

    fetchEligibility();
  }, [job_id]);

  useEffect(() => {
    if (jobDetails.deadline) {
      const deadlineDate = new Date(jobDetails.deadline).getTime();

      const updateCountdown = () => {
        const now = new Date().getTime();
        const timeDifference = deadlineDate - now;

        if (timeDifference > 0) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft("Deadline Passed");
          setIsdeadlineOver(true);
          clearInterval(interval);
        }
      };

      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    }
  }, [jobDetails.deadline]);

  const withdrawApplication = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to withdraw your application. This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, withdraw it!",
      });

      if (result.isConfirmed) {
        const response = await axios.post(
          `${import.meta.env.REACT_APP_BASE_URL}/api/withdraw`,
          { jobId: job_id },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setStatus((prevStatus) => ({
            ...prevStatus,
            applied: false,
          }));
          Swal.fire({
            title: "Withdrawn!",
            text: "Your application has been withdrawn successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        }
      }
    } catch (error) {
      console.error("Failed to withdraw application:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to withdraw application. Please try again.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-blue"></div>
      </div>
    );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  const handleApplicationSuccess = () => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      applied: true,
    }));
  };

  if (application) {
    return (
      <div className="container mx-auto px-4 py-6">
        <ApplicationForm
          onHide={() => setApplication(false)}
          jobId={job_id}
          onApplicationSuccess={handleApplicationSuccess}
        />
      </div>
    );
  }

  const isInternship = ["Intern", "Intern+PPO", "Intern+FTE"].includes(
    jobDetails.job_type
  );

  const details = [
    {
      icon: faClipboardList,
      label: "JOB SECTOR",
      value: jobDetails.job_sector || "N/A",
    },
    {
      icon: faBriefcase,
      label: "JOB TYPE",
      value: jobDetails.job_type || "N/A",
    },
    {
      icon: faClipboardList,
      label: "JOB CATEGORY",
      value: jobDetails.job_category || "N/A",
    },
    {
      icon: faBriefcase,
      label: "JOB ROLE",
      value: jobDetails.job_role || "N/A",
    },
    {
      icon: faIndianRupeeSign,
      label: isInternship ? "CTC(BASE)" : "CTC",
      value: isInternship ? `${jobDetails.job_salary?.ctc} (${jobDetails.job_salary?.base_salary}) Lakh` : `${jobDetails.job_salary?.ctc} Lakh`  || "N/A",
    },
    {
      icon: faIndianRupeeSign,
      label: isInternship ? "STIPEND" : "BASE SALARY",
      value: isInternship
        ? jobDetails.job_salary?.stipend || "N/A"
        : jobDetails.job_salary?.base_salary || "N/A",
    },
    {
      icon: faMapMarkerAlt,
      label: "LOCATION",
      value: jobDetails.joblocation || "N/A",
    },
    {
      icon: faInfoCircle,
      label: "DESCRIPTION",
      value: jobDetails.jobdescription || "No description available",
    },
  ];

  const getStepIcon = (stepType) => {
    const iconClasses = "w-6 h-6";
    const iconMap = {
      'OA': <Clock className={`${iconClasses} text-blue-600`} />,
      'Interview': <MapPin className={`${iconClasses} text-green-600`} />,
      'Others': <CheckCircle className={`${iconClasses} text-purple-600`} />,
      'default': <Info className={`${iconClasses} text-gray-600`} />
    };
    return iconMap[stepType] || iconMap['default'];
  };

  const sliderSettings = {
    dots: true,
    infinite: jobDetails.eligibility_criteria?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const info = {
    jobDescription: (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2 sm:p-4">
          {details.map((detail, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white rounded-lg border border-gray-300 p-3 sm:p-4 shadow-sm hover:scale-105 transition-transform duration-200"
            >
              <FontAwesomeIcon
                icon={detail.icon}
                className="text-custom-blue text-xl sm:text-2xl mb-2"
              />
              <hr className="w-full sm:w-10 border-gray-300 my-1 sm:my-2" />
              <span className="text-xs sm:text-sm font-semibold text-gray-500 text-center">
                {detail.label}
              </span>
              <hr className="w-full sm:w-10 border-gray-300 my-1 sm:my-2" />
              {detail.label !== "DESCRIPTION" ? (
                <span className="text-black font-medium text-xs sm:text-sm text-center">
                  {detail.value}
                </span>
              ) : (
                <button
                  className="text-custom-blue p-1 border border-custom-blue rounded-lg text-sm font-semibold"
                  onClick={() => setDescription(true)}
                >
                  Click Here
                </button>
              )}
            </div>
          ))}
        </div>

        {description && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="relative p-6 bg-white rounded-lg shadow-lg w-80 sm:w-96 max-h-[80vh] overflow-y-auto">
              <button
                onClick={() => setDescription(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
              >
                ×
              </button>
              <h2 className="text-lg text-custom-blue text-center font-semibold mb-4">Description</h2>
              <div
                className="text-gray-800 prose prose-sm sm:prose-base max-w-none"
                dangerouslySetInnerHTML={{
                  __html: jobDetails.jobdescription || "<p>No description available</p>",
                }}
              />
            </div>
          </div>
        )}
      </div>
    ),

    hiringFlow: (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-5 inset-y-0 w-0.5 bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-600 rounded-full"></div>
            {jobDetails?.Hiring_Workflow?.map((step, index) => {
              const theme = getStepTheme(step.step_type);
              return (
                <div
                  key={index}
                  className={`mb-6 ml-5 pl-8 relative group`}
                >
                  <div className={`absolute -left-2 w-4 h-4 ${theme.dot} rounded-full border-2 border-white shadow-sm transition-all duration-300 group-hover:scale-110`}></div>
                  <div className={`relative ${theme.bg} ${theme.border} border rounded-lg shadow-sm transition-all duration-300 overflow-hidden ${theme.hover} group-hover:shadow-md transform group-hover:-translate-y-0.5`}>
                    <div className={`flex justify-between items-center p-3 border-b ${theme.border} bg-white`}>
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border mr-2 shadow-sm`}>
                          {getStepIcon(step.step_type)}
                        </div>
                        <h3 className="text-sm font-bold text-gray-800">
                          {step.step_type || "Upcoming Stage"}
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                        Stage {index + 1}
                      </span>
                    </div>
                    <div className="p-3 space-y-2 text-sm">
                      {step.step_type === "OA" && (
                        <>
                          <div className="flex items-center text-gray-700">
                            <Calendar className="mr-2 w-3.5 h-3.5 text-indigo-500" />
                            <span className="font-medium">
                              Date: <span className="font-normal">{step.details?.oa_date || "TBA"}</span>
                            </span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Clock className="mr-2 w-3.5 h-3.5 text-indigo-500" />
                            <span className="font-medium">
                              Login: <span className="font-normal">{step.details?.oa_login_time || "N/A"}</span>
                            </span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <CheckCircle className="mr-2 w-3.5 h-3.5 text-indigo-500" />
                            <span className="font-medium">
                              Duration: <span className="font-normal">{step.details?.oa_duration || "N/A"}</span>
                            </span>
                          </div>
                        </>
                      )}
                      {step.step_type === "Interview" && (
                        <>
                          <div className="flex items-center text-gray-700">
                            <Users className="mr-2 w-3.5 h-3.5 text-emerald-500" />
                            <span className="font-medium">
                              Type: <span className="font-normal">{step.details?.interview_type || "N/A"}</span>
                            </span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Calendar className="mr-2 w-3.5 h-3.5 text-emerald-500" />
                            <span className="font-medium">
                              Date: <span className="font-normal">{step.details?.interview_date || "TBA"}</span>
                            </span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Clock className="mr-2 w-3.5 h-3.5 text-emerald-500" />
                            <span className="font-medium">
                              Time: <span className="font-normal">{step.details?.interview_time || "N/A"}</span>
                            </span>
                          </div>
                        </>
                      )}
                      {step.step_type === "GD" && (
                        <>

                          <div className="flex items-center text-gray-700">
                            <Calendar className="mr-2 w-3.5 h-3.5 text-emerald-500" />
                            <span className="font-medium">
                              Date: <span className="font-normal">{step.details?.gd_date || "TBA"}</span>
                            </span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Clock className="mr-2 w-3.5 h-3.5 text-emerald-500" />
                            <span className="font-medium">
                              Time: <span className="font-normal">{step.details?.gd_time || "N/A"}</span>
                            </span>
                          </div>
                        </>
                      )}
                      {step.step_type === "Others" && (
                        <>
                          <div className="flex items-center text-gray-700">
                            <Award className="mr-2 w-3.5 h-3.5 text-amber-500" />
                            <span className="font-medium">
                              Round: <span className="font-normal">{step.details?.others_round_name || "N/A"}</span>
                            </span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Calendar className="mr-2 w-3.5 h-3.5 text-amber-500" />
                            <span className="font-medium">
                              Date: <span className="font-normal">{step.details?.others_date || "TBA"}</span>
                            </span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Clock className="mr-2 w-3.5 h-3.5 text-amber-500" />
                            <span className="font-medium">
                              Duration: <span className="font-normal">{step.details?.others_duration || "N/A"}</span>
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ),

    eligibilityCriteria: (
      <div className="bg-white p-3 sm:p-6">
        {jobDetails.eligibility_criteria?.length > 0 ? (
          <Slider {...sliderSettings} className="mb-6">
            {jobDetails.eligibility_criteria.map((criteria, index) => (
              <div key={index} className="px-2">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-lg shadow-md border border-indigo-200">
                  <h4 className="text-base sm:text-lg font-semibold text-custom-blue mb-4">
                    Criteria Set {index + 1}
                  </h4>
                  <div className="space-y-3 sm:space-y-4">
                    {[ {
                        label: "Eligible Batch",
                        value: criteria.eligible_batch,
                      },
                      {
                        label: "Course Allowed",
                        value: criteria.course_allowed,
                      },
                      {
                        label: "Branch Allowed",
                        value: criteria.department_allowed?.join(", "),
                      },
                      {
                        label: "Gender Allowed",
                        value: criteria.gender_allowed,
                      },
                      {
                        label: "Minimum CGPA",
                        value: criteria.minimum_cgpa,
                      },
                      {
                        label: "Active Backlogs",
                        value: criteria.active_backlogs === false
                          ? "No active backlogs allowed"
                          : "Active backlogs allowed",
                      },
                      {
                        label: "Backlogs History",
                        value: criteria.history_backlogs === false
                          ? "No backlog history allowed"
                          : "Backlog history allowed",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center"
                      >
                        <p className="text-sm sm:text-base text-gray-600 font-medium">
                          {item.label}:
                        </p>
                        <span className="text-sm sm:text-base text-gray-900 font-semibold mt-1 sm:mt-0">
                          {item.value || "N/A"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-gray-600 text-sm sm:text-base">
            No eligibility criteria specified.
          </p>
        )}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Student Status:
          </p>
          <span
            className={`text-sm sm:text-base font-semibold mt-1 sm:mt-0 ${
              status.eligible ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.eligible ? "Eligible" : "Not Eligible"}
            {status.reason ? ` (${status.reason})` : ""}
          </span>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          {isdeadlineOver ? (
            status.applied ? (
              <button
                className="w-full sm:w-auto px-4 sm:px-5 py-2 rounded-lg font-semibold text-white bg-blue-500 cursor-not-allowed"
                disabled
              >
                Applied
              </button>
            ) : (
              <button
                className={`w-full sm:w-auto px-4 sm:px-5 py-2 rounded-lg font-semibold text-white transition-all duration-200 
                            ${
                              status.eligible
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-gray-300 cursor-not-allowed"
                            }`}
                disabled
              >
                {status.eligible ? "Closed" : "Not Eligible"}
              </button>
            )
          ) : (
            <>
              {status.applied ? (
                <>
                  <button
                    className="w-full sm:w-auto px-4 sm:px-5 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                    onClick={() => setApplication(true)}
                  >
                    Edit Application
                  </button>
                  <button
                    className="w-full sm:w-auto px-4 sm:px-5 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
                    onClick={withdrawApplication}
                  >
                    Withdraw Application
                  </button>
                </>
              ) : (
                <button
                  className={`w-full sm:w-auto px-4 sm:px-5 py-2 rounded-lg font-semibold text-white transition-all duration-200 
                              ${
                                status.eligible
                                  ? "bg-green-500 hover:bg-green-600"
                                  : "bg-gray-300 cursor-not-allowed"
                              }`}
                  disabled={!status.eligible}
                  onClick={() => setApplication(true)}
                >
                  {status.eligible ? "Apply Now" : "Not Eligible"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    ),

deadline: (
  <div className="bg-white p-3 sm:p-6">
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 rounded-lg shadow-md border border-indigo-200">
      {/* Deadline Info Card */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Applications close on</p>
          <p className="text-lg sm:text-xl font-bold text-gray-800">
            {jobDetails.deadline
              ? new Date(jobDetails.deadline).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Date Not Provided"}
          </p>
          {jobDetails.deadline && (
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              at {new Date(jobDetails.deadline).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          )}
        </div>
      </div>

      {/* Countdown Timer */}
      {jobDetails.deadline && (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
          <p className="text-center text-sm text-gray-600 mb-4">Time Remaining</p>
          
          {!isdeadlineOver ? (
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              {timeLeft.split(' ').map((unit, index) => {
                const [value, label] = [unit.slice(0, -1), unit.slice(-1)];
                const labels = { 'd': 'Days', 'h': 'Hours', 'm': 'Minutes', 's': 'Seconds' };
                
                return (
                  <div key={index} className="bg-custom-blue to-purple-600 text-white p-3 sm:p-4 rounded-lg shadow-md">
                    <div className="text-xl sm:text-2xl font-bold">{value}</div>
                    <div className="text-xs sm:text-sm opacity-90">{labels[label]}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-lg font-bold">Deadline Passed</span>
                </div>
                <p className="text-sm opacity-90">Applications are no longer accepted</p>
              </div>
            </div>
          )}

          {/* Urgency indicator */}
          {!isdeadlineOver && jobDetails.deadline && (
            <div className="mt-4 text-center">
              {(() => {
                const hoursLeft = Math.floor((new Date(jobDetails.deadline) - new Date()) / (1000 * 60 * 60));
                if (hoursLeft <= 24) {
                  return (
                    <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg">
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className="font-semibold text-sm">Urgent: Less than 24 hours left!</span>
                      </div>
                    </div>
                  );
                } else if (hoursLeft <= 72) {
                  return (
                    <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 p-3 rounded-lg">
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-sm">Apply soon - Only a few days left!</span>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="bg-green-100 border border-green-300 text-green-700 p-3 rounded-lg">
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-sm">You have plenty of time to apply</span>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  </div>
),
  };

  return (
    <div className="min-h-screen bg-white py-6 sm:py-12 px-3 sm:px-6 border border-1 shadow-sm">
      <div className="mb-6 sm:mb-8">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800"
          onClick={onBack}
        >
          <FaArrowLeft className="mr-2 text-custom-blue" />
        </button>
      </div>

      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-custom-blue">
          {jobDetails.company_name || "Unknown Company"}
        </h1>
        <h2 className="text-base sm:text-lg text-custom-blue mt-2">
          Role: {jobDetails.job_role || "No Job Title Provided"}
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-8">
        {Object.keys(info).map((key) => (
          <button
            key={key}
            onClick={() => setActiveInfo(key)}
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md text-xs sm:text-base font-semibold transition duration-200
                        ${
                          activeInfo === key
                            ? "bg-custom-blue text-white"
                            : "bg-white text-custom-blue border border-custom-blue hover:bg-gray-100"
                        }`}
          >
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="w-full max-w-3xl mx-auto mt-2 bg-white rounded-lg">
        {info[activeInfo]}
      </div>
    </div>
  );
};

export default Jobdetail;