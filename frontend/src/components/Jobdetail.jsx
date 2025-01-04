import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const Jobdetail = ({ job_id, onBack }) => {
    const [activeInfo, setActiveInfo] = useState("jobDescription");
    const [jobDetails, setJobDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("");

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
                setStatus(response.data || "");
            } catch (error) {
                setError("Failed to fetch eligibility status. Please try again.");
            }
        };

        fetchEligibility();
    }, [job_id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
    }

    const info = {
        jobDescription: (
            <>
                <p><strong>Job ID:</strong> {jobDetails.job_id || "N/A"}</p>
                <p><strong>Company:</strong> {jobDetails.company_name || "N/A"}</p>
                <p><strong>Job Title:</strong> {jobDetails.job_role || "N/A"}</p>
                <p><strong>Job Location:</strong> {jobDetails.joblocation || "N/A"}</p>
                <p><strong>Job Type:</strong> {jobDetails.jobtype || "N/A"}</p>
                <p><strong>CTC:</strong> {jobDetails.job_salary?.ctc || "N/A"}</p>
                <p><strong>Base Salary:</strong> {jobDetails.job_salary?.base_salary || "N/A"}</p>
                <p><strong>Deadline:</strong> {jobDetails.deadline || "N/A"}</p>
                <p><strong>Job Category:</strong> {jobDetails.job_category || "N/A"}</p>
                <p><strong>Description:</strong> {jobDetails.jobdescription || "No description available"}</p>
            </>
        ),
        hiringFlow: (
            <div className="font-sans p-6">
                <div className="relative max-w-2xl mx-auto">
                    <div className="flex flex-col space-y-8">
                        {jobDetails?.Hiring_Workflow?.map((step, index) => (
                            <div key={index} className="relative flex items-center space-x-6 group">
                                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white shadow-lg group-hover:bg-blue-500 transition-colors">
                                    <span className="text-sm">{index + 1}</span>
                                </div>
                                <div
                                    className={`absolute w-1 bg-gray-300 top-0 left-3 group-hover:bg-blue-500 transition-all`}
                                    style={{
                                        height: index === jobDetails.Hiring_Workflow.length - 1 ? '120px' : '200px',
                                    }}
                                ></div>
                                <div className="ml-10 w-full">
                                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transition-colors">
                                        {step.step_type || "To be announced"}
                                    </h3>
                                    <p className="text-gray-600 mt-2">{step.step_name || "To be announced"}</p>
                                    <p className="text-sm text-gray-500 mt-2">{step.description || "To be announced"}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        <strong>Date: </strong> {step.tentative_date || "To be announced"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        eligibilityCriteria: (
            <>
                <p><strong>Branch Allowed:</strong> {jobDetails.eligibility_criteria?.department_allowed?.join(', ') || "N/A"}</p>
                <p><strong>Gender Allowed:</strong> {jobDetails.eligibility_criteria?.gender_allowed || "N/A"}</p>
                <p><strong>Eligible Batch:</strong> {jobDetails.eligibility_criteria?.eligible_batch || "N/A"}</p>
                <p><strong>Minimum CGPA:</strong> {jobDetails.eligibility_criteria?.minimum_cgpa || "N/A"}</p>
                <p><strong>Active Backlogs:</strong> {jobDetails.eligibility_criteria?.active_backlogs === false ? "No active backlogs allowed" : "N/A"}</p>
                <p><strong>Student Status:</strong> 
                    <span className={status === "Eligible to apply" ? 'text-green-500' : 'text-red-500'}>
                        {status}
                    </span>
                </p>
            </>
        ),
        deadline: (
            <p className="text-center"><strong>Please Apply before: {jobDetails.deadline || "N/A"}</strong></p>
        ),
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            {/* Back Button */}
            <div className="mb-6">
                <button
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    onClick={onBack}
                >
                    <FaArrowLeft className="mr-2" /> Back to Job Profiles
                </button>
            </div>

            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-semibold text-custom-blue">
                    {jobDetails.company_name || "Unknown Company"}
                </h1>
                <h2 className="text-lg text-custom-blue mt-2">Role: {jobDetails.job_role || "No Job Title Provided"}</h2>
            </div>

            <div className="flex justify-center space-x-4 mb-8">
                {Object.keys(info).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveInfo(key)}
                        className={`px-6 py-3 bg-custom-blue rounded-md transition duration-300 ${
                            activeInfo === key ? 'bg-custom-blue text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
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
