import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import ApplicationForm from "./StudentDashboard/applicationform";

const Jobdetail = ({ job_id, onBack,onShow }) => {
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

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

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
                <div key={index} className="relative flex items-start space-x-6 group">
                    {/* Dot Container */}
                    <div className="relative flex flex-col items-center">
                        <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white shadow-lg group-hover:bg-blue-500 transition-colors">
                            <span className="text-sm">{index + 1}</span>
                        </div>
                        {/* Vertical Line */}
                        {index !== jobDetails.Hiring_Workflow.length  && (
                            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 group-hover:bg-blue-500 transition-all" style={{
                                height: index === jobDetails.Hiring_Workflow.length - 1 ? '140px' : '170px',
                            }}></div>
                        )}
                    </div>

                    {/* Step Details */}
                    <div className="ml-10 p-4 w-2/5 h-44 border border-blue-500 rounded-lg bg-white shadow-md group-hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transition-colors">
                            {step.step_type || "To be announced"}
                        </h3>
                        <p className="text-gray-600 mt-2 group-hover:text-blue-500 transition-colors">
                            {step.step_name || "To be announced"}
                        </p>
                        <p className="text-sm text-gray-500 mt-2 group-hover:text-blue-500 transition-colors">
                            {step.description || "To be announced"}
                        </p>
                        <p className="text-sm text-gray-500 mt-2 group-hover:text-blue-500 transition-colors">
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
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <h3 className="text-lg font-bold mb-4 text-gray-700">Eligibility Criteria</h3>
        <div className="space-y-2">
            <p>
                <strong className="text-gray-600">Branch Allowed:</strong> 
                <span className="text-gray-800"> {jobDetails.eligibility_criteria?.department_allowed?.join(', ') || "N/A"}</span>
            </p>
            <p>
                <strong className="text-gray-600">Gender Allowed:</strong> 
                <span className="text-gray-800"> {jobDetails.eligibility_criteria?.gender_allowed || "N/A"}</span>
            </p>
            <p>
                <strong className="text-gray-600">Eligible Batch:</strong> 
                <span className="text-gray-800"> {jobDetails.eligibility_criteria?.eligible_batch || "N/A"}</span>
            </p>
            <p>
                <strong className="text-gray-600">Minimum CGPA:</strong> 
                <span className="text-gray-800"> {jobDetails.eligibility_criteria?.minimum_cgpa || "N/A"}</span>
            </p>
            <p>
                <strong className="text-gray-600">Active Backlogs:</strong> 
                <span className="text-gray-800">
                    {jobDetails.eligibility_criteria?.active_backlogs === false ? "No active backlogs allowed" : "N/A"}
                </span>
            </p>
            <p>
                <strong className="text-gray-600">Student Status:</strong> 
                <span className={status.eligible ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                    {status.eligible ? "Eligible" : "Not Eligible"}
                    {status.reason ? ` (${status.reason})` : ""}
                </span>
            </p>
        </div>
        <div className="mt-4">
            <button 
                className={`px-4 py-2 rounded-md font-semibold text-white ${
                    status.eligible 
                        ? "bg-green-500 hover:bg-green-600" 
                        : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!status.eligible}
                onClick={() => setapplication(true)}
            >
                {status.eligible ? "Apply Now" : "Not Eligible"}
            </button>
        </div>
    </div>
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
