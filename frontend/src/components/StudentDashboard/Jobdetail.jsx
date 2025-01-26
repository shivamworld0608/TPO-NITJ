import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import ApplicationForm from "./applicationform";
import BouncingLoader from "../BouncingLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faMapMarkerAlt, faDollarSign, faCalendarAlt, faClipboardList, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


const Jobdetail = ({ job_id, onBack, onShow }) => {
    const [activeInfo, setActiveInfo] = useState("jobDescription");
    const [jobDetails, setJobDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("");
    const [application, setapplication] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/${job_id}`,
                    { withCredentials: true }
                );
                console.log(response.data.job);
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
                console.log(response.data);
                setStatus(response.data || "");
            } catch (error) {
                setError("Failed to fetch eligibility status. Please try again.");
            }
        };

        fetchEligibility();
    }, [job_id]);

    if (loading) return <BouncingLoader size="medium" text="Loading..." />;

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
    }

    if (application) {
        console.log(application)
        return (
            <div className="container mx-auto px-4 py-6">
                <ApplicationForm onHide={() => setapplication(false)} jobId={job_id} />
            </div>
        );
    }
    const details = [
        { icon: faClipboardList, label: "JOB ID", value: jobDetails.job_id || "N/A" },
        { icon: faBriefcase, label: "JOB TYPE", value: jobDetails.jobtype || "N/A" },
        { icon: faClipboardList, label: "JOB CATEGORY", value: jobDetails.job_category || "N/A" },
        { icon: faBriefcase, label: "JOB ROLE", value: jobDetails.jobrole || "N/A" },
        { icon: faDollarSign, label: "CTC", value: jobDetails.job_salary?.ctc || "N/A" },
        { icon: faDollarSign, label: "BASE SALARY", value: jobDetails.job_salary?.base_salary || "N/A" },
        { icon: faMapMarkerAlt, label: "LOCATION", value: jobDetails.joblocation || "N/A" },
        { icon: faInfoCircle, label: "DESCRIPTION", value: jobDetails.jobdescription || "No description available" },
    ];
    const info = {
        jobDescription: (
            <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
                    {details.map((detail, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-white rounded-lg border border-gray-300 p-4 shadow-sm hover:scale-105  transition-transform duration-200"
                        >
                            <FontAwesomeIcon
                                icon={detail.icon}
                                className="text-custom-blue text-2xl mb-2 "
                            />
                            <hr className="w-10 border-gray-300 my-2" />
                            <span className="text-sm font-semibold text-gray-500">
                                {detail.label}
                            </span>
                            <hr className="w-10 border-gray-300 my-2" />
                            <span className="text-black font-medium text-sm">
                                {detail.value}
                            </span>
                        </div>
                    ))}
                </div>


            </>
        ),
        hiringFlow: (
            <div className="font-sans p-6">
                <div className="relative max-w-2xl mx-auto">
                    <div className="flex flex-col space-y-8">
                        {jobDetails?.Hiring_Workflow?.map((step, index) => (
                            <div key={index} className="relative flex items-start space-x-6 group">
                                {/* Dot Container */}
                                <div className="relative flex flex-col items-center">
                                    <div className="w-6 h-6 bg-custom-blue rounded-full flex items-center justify-center text-white shadow-lg group-hover:bg-blue-500 transition-colors">
                                        <span className="text-sm">{index + 1}</span>
                                    </div>
                                    {/* Vertical Line */}
                                    {index !== jobDetails.Hiring_Workflow.length - 1 && (
                                        <div
                                            className="absolute top-7 left-1/2 transform -translate-x-1/2 w-1 bg-custom-blue group-hover:bg-blue-500 transition-all"
                                            style={{
                                                height: '170px',
                                            }}
                                        ></div>
                                    )}
                                </div>

                                {/* Step Details */}
                                <div className="ml-10 p-4 sm:w-2/5 w-full h-auto border border-blue-500 rounded-lg bg-white shadow-md group-hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transition-colors">
                                        {step.step_type || "To be announced"}
                                    </h3>
                                    <p className="text-gray-600 mt-2 group-hover:text-blue-500 transition-colors">
                                        {step.step_type === "OA" ? (
                                            <>
                                                <span>
                                                    Date: {step.details.oa_date || "To be announced"}
                                                </span>
                                                <br />
                                                <span>
                                                    Login Time: {step.details.oa_login_time || "N/A"}
                                                </span>
                                                <br />
                                                <span>
                                                    Duration: {step.details.oa_duration || "N/A"}
                                                </span>
                                            </>
                                        ) : step.step_type === "Interview" ? (
                                            <>
                                                <span>
                                                    Type: {step.details.interview_type || "N/A"}
                                                </span>
                                                <br />
                                                <span>
                                                    Date: {step.details.interview_date || "To be announced"}
                                                </span>
                                                <br />
                                                <span>
                                                    Time: {step.details.interview_time || "N/A"}
                                                </span>
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
            <div className="bg-white p-6     ">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Eligibility Criteria</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 font-medium">Branch Allowed:</p>
                        <span className="text-gray-900 font-semibold">
                            {jobDetails.eligibility_criteria?.department_allowed?.join(", ") || "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 font-medium">Gender Allowed:</p>
                        <span className="text-gray-900 font-semibold">
                            {jobDetails.eligibility_criteria?.gender_allowed || "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 font-medium">Eligible Batch:</p>
                        <span className="text-gray-900 font-semibold">
                            {jobDetails.eligibility_criteria?.eligible_batch || "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 font-medium">Minimum CGPA:</p>
                        <span className="text-gray-900 font-semibold">
                            {jobDetails.eligibility_criteria?.minimum_cgpa || "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 font-medium">Active Backlogs:</p>
                        <span className="text-gray-900 font-semibold">
                            {jobDetails.eligibility_criteria?.active_backlogs === false
                                ? "No active backlogs allowed"
                                : "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 font-medium">Student Status:</p>
                        <span
                            className={`font-semibold ${status.eligible ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {status.eligible ? "Eligible" : "Not Eligible"}
                            {status.reason ? ` (${status.reason})` : ""}
                        </span>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        className={`px-5 py-2 rounded-lg font-semibold text-white transition-all duration-200 ${status.eligible
                                ? status.applied
                                    ? "bg-blue-500 cursor-not-allowed"
                                    : "bg-green-500 hover:bg-green-600"
                                : "bg-gray-300 cursor-not-allowed"
                            }`}
                        disabled={!status.eligible || status.applied}
                        onClick={() => !status.applied && setApplication(true)}
                    >
                        {status.eligible
                            ? status.applied
                                ? "Applied"
                                : "Apply Now"
                            : "Not Eligible"}
                    </button>
                </div>
            </div>
        ),

        deadline: (
            <p className="text-center"><strong>Please Apply before: {jobDetails.deadline
                ? new Date(jobDetails.deadline).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })
                : "Not Provided"}</strong></p>
        ),
    };

    return (
        <div className="min-h-screen bg-white py-12 px-6 border border-1 shadow-sm">
            {/* Back Button */}
            <div className="mb-8">
                <button
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    onClick={onBack}
                >
                    <FaArrowLeft className="mr-2 text-custom-blue" />
                </button>
            </div>

            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-semibold text-custom-blue">
                    {jobDetails.company_name || "Unknown Company"}
                </h1>
                <h2 className="text-lg text-custom-blue mt-2">Role: {jobDetails.job_role || "No Job Title Provided"}</h2>
            </div>

            <div className="flex justify-center sm:space-x-4 space-x-1 mb-8">
    {Object.keys(info).map((key) => (
        <button
            key={key}
            onClick={() => setActiveInfo(key)}
            className={`sm:px-6 sm:py-3 p-2 rounded-md font-semibold transition duration-200 sm:text-base text-sm 
                ${activeInfo === key 
                    ? 'bg-custom-blue text-white' // Active tab styles
                    : 'bg-white text-custom-blue border border-custom-blue hover:bg-gray-100' // Inactive tab styles
                }`}
        >
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        </button>
    ))}
</div>

            <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                {info[activeInfo]}
            </div>
        </div>
    );
};

export default Jobdetail;