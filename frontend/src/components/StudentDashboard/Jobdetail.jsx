import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import ApplicationForm from "./applicationform";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from "sweetalert2";
import {faMapMarkerAlt, faIndianRupee,faInfoCircle, faIdCard, faTasks, faTags, faUserTie} from '@fortawesome/free-solid-svg-icons';

const Jobdetail = ({ job_id, onBack, onShow }) => {
    const [activeInfo, setActiveInfo] = useState("jobDescription");
    const [jobDetails, setJobDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("");
    const [application, setApplication] = useState(false);
    const [isdeadlineOver, setIsdeadlineOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState("");

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
                    `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/eligibility/${job_id}`,
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

            // Update the countdown every second
            const interval = setInterval(updateCountdown, 1000);

            // Clear the interval when the component unmounts
            return () => clearInterval(interval);
        }
    }, [jobDetails.deadline]);

    const withdrawApplication = async () => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You are about to withdraw your application. This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, withdraw it!',
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
                        title: 'Withdrawn!',
                        text: 'Your application has been withdrawn successfully.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                    });
                }
            }
        } catch (error) {
            console.error('Failed to withdraw application:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to withdraw application. Please try again.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
            });
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-blue"></div>
        </div>
    );

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
    }

    const handleApplicationSuccess = () => {
        setStatus(prevStatus => ({
            ...prevStatus,
            applied: true
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

    const details = [
        { icon: faIdCard, label: "JOB ID", value: jobDetails.job_id || "N/A" },
        { icon: faTasks, label: "JOB TYPE", value: jobDetails.jobtype || "N/A" },
        { icon: faTags, label: "JOB CATEGORY", value: jobDetails.job_category || "N/A" },
        { icon: faUserTie, label: "JOB ROLE", value: jobDetails.jobrole || "N/A" },
        { icon: faIndianRupee, label: "CTC", value: jobDetails.job_salary?.ctc || "N/A" },
        { icon: faIndianRupee, label: "BASE SALARY", value: jobDetails.job_salary?.base_salary || "N/A" },
        { icon: faMapMarkerAlt, label: "LOCATION", value: jobDetails.joblocation || "N/A" },
        { icon: faInfoCircle, label: "DESCRIPTION", value: jobDetails.jobdescription || "No description available" },
    ];

    const info = {
        jobDescription: (
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
                        <span className="text-black font-medium text-xs sm:text-sm text-center">
                            {detail.value}
                        </span>
                    </div>
                ))}
            </div>
        ),

        hiringFlow: (
            <div className="font-sans p-2 sm:p-6">
                <div className="relative max-w-2xl mx-auto">
                    <div className="flex flex-col space-y-6 sm:space-y-8">
                        {jobDetails?.Hiring_Workflow?.map((step, index) => (
                            <div key={index} className="relative flex items-start space-x-3 sm:space-x-6 group">
                                <div className="relative flex flex-col items-center">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-custom-blue rounded-full flex items-center justify-center text-white shadow-lg group-hover:bg-blue-500 transition-colors">
                                        <span className="text-xs sm:text-sm">{index + 1}</span>
                                    </div>
                                    {index !== jobDetails.Hiring_Workflow.length - 1 && (
                                        <div
                                            className="absolute top-6 sm:top-7 left-1/2 transform -translate-x-1/2 w-0.5 sm:w-1 bg-custom-blue group-hover:bg-blue-500 transition-all"
                                            style={{ height: '170px' }}
                                        ></div>
                                    )}
                                </div>

                                <div className="ml-4 sm:ml-10 p-3 sm:p-4 w-full sm:w-2/3 border border-blue-500 rounded-lg bg-white shadow-md group-hover:shadow-lg transition-shadow">
                                    <h3 className="text-base sm:text-xl font-semibold text-gray-800 group-hover:text-blue-500 transition-colors">
                                        {step.step_type || "To be announced"}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 mt-2 group-hover:text-blue-500 transition-colors">
                                        {step.step_type === "OA" ? (
                                            <>
                                                <span>Date: {step.details.oa_date || "To be announced"}</span>
                                                <br />
                                                <span>Login Time: {step.details.oa_login_time || "N/A"}</span>
                                                <br />
                                                <span>Duration: {step.details.oa_duration || "N/A"}</span>
                                            </>
                                        ) : step.step_type === "Interview" ? (
                                            <>
                                                <span>Type: {step.details.interview_type || "N/A"}</span>
                                                <br />
                                                <span>Date: {step.details.interview_date || "To be announced"}</span>
                                                <br />
                                                <span>Time: {step.details.interview_time || "N/A"}</span>
                                            </>
                                        ) : step.step_type === "Others" ? (
                                            <>
                                                <span>Round Name: {step.details.others_round_name || "N/A"}</span>
                                                <br />
                                                <span>Date: {step.details.others_date || "To be announced"}</span>
                                                <br />
                                                <span>Time: {step.details.others_duration || "N/A"}</span>
                                            </>
                                        ) : (
                                            "To be announced"
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),

        eligibilityCriteria: (
            <div className="bg-white p-3 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Eligibility Criteria</h3>
                <div className="space-y-3 sm:space-y-4">
                    {[
                        { label: "Course Allowed", value: jobDetails.eligibility_criteria?.course_allowed },
                        { label: "Branch Allowed", value: jobDetails.eligibility_criteria?.department_allowed?.join(", ") },
                        { label: "Gender Allowed", value: jobDetails.eligibility_criteria?.gender_allowed },
                        { label: "Eligible Batch", value: jobDetails.eligibility_criteria?.eligible_batch },
                        { label: "Minimum CGPA", value: jobDetails.eligibility_criteria?.minimum_cgpa },
                        { label: "Active Backlogs", value: jobDetails.eligibility_criteria?.active_backlogs === false ? "No active backlogs allowed" : "N/A" },
                        { label: "Backlogs History", value: jobDetails.eligibility_criteria?.history_backlogs === false ? "No Backlogs History allowed" : "N/A" }
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <p className="text-sm sm:text-base text-gray-600 font-medium">{item.label}:</p>
                            <span className="text-sm sm:text-base text-gray-900 font-semibold mt-1 sm:mt-0">
                                {item.value || "N/A"}
                            </span>
                        </div>
                    ))}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <p className="text-sm sm:text-base text-gray-600 font-medium">Student Status:</p>
                        <span className={`text-sm sm:text-base font-semibold mt-1 sm:mt-0 ${status.eligible ? "text-green-600" : "text-red-600"}`}>
                            {status.eligible ? "Eligible" : "Not Eligible"}
                            {status.reason ? ` (${status.reason})` : ""}
                        </span>
                    </div>
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
                                    ${status.eligible
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
                                        ${status.eligible
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
            <div className="text-center">
                <p className="text-sm sm:text-base">
                    <strong>Please Apply before: {
                        jobDetails.deadline
                            ? new Date(jobDetails.deadline).toLocaleString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true // Use 12-hour format (AM/PM)
                            })
                            : "Not Provided"
                    }</strong>
                </p>
                {jobDetails.deadline && (
                    <p className="text-lg sm:text-2xl md:text-3xl mt-2 font-bold">
                        <span>Time Left: </span>
                        <span style={{ color: timeLeft.includes("0d") ? "red" : "green" }}>
                            {timeLeft || "Calculating..."}
                        </span>
                    </p>
                )}
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

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                {Object.keys(info).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveInfo(key)}
                        className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md text-xs sm:text-base font-semibold transition duration-200
                            ${activeInfo === key
                                ? 'bg-custom-blue text-white'
                                : 'bg-white text-custom-blue border border-custom-blue hover:bg-gray-100'
                            }`}
                    >
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </button>
                ))}
            </div>

            <div className="w-full max-w-3xl mx-auto p-3 sm:p-6 bg-white rounded-lg shadow-lg">
                {info[activeInfo]}
            </div>
        </div>
    );
};

export default Jobdetail;