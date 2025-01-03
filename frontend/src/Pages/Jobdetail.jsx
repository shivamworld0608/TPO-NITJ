import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";

export default function JobDetail() {
    const [activeInfo, setActiveInfo] = useState('jobDescription');
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dummyData = {
        "jobid": "SR-1453",
        "company": "Google",
        "jobtitle": "Software Engineer Intern",
        "jobdescription": "Develop and maintain web applications.",
        "joblocation": "Noida",
        "jobtype": "Tech",
        "deadline": "31-01-2024",
        "status": "Live",
        "job_category": "Dream",
        "Hiring_Workflow": 
        {
            "application_date":"1-01-2025",
            "ppt_date":"5-01-2025",
            "oa_date":"10-01-2025",
            "interview_date":"20-01-2025",
            "offer_date":"21-01-2025",
        "other_details":"The hiring process at XYZ Inc. consists of three stages: 1) Initial Screening (resume review), 2) Technical Interview (coding challenges and problem-solving), and 3) HR Interview (behavioral questions and salary discussion). Successful candidates will receive an offer letter and join the team. The process usually takes 2-3 weeks to complete."

    }

        ,
        "eligibility_criteria": {
            "branches_allowed": ["CSE", "IT", "ECE", "EEE"],
            "gender_allowed": "Any",
            "eligible_batch": "2026",
            "minimum_cgpa": 7
        },
        "Approved_Status": true,
    };

    useEffect(() => {
        setTimeout(() => {
            setJobDetails(dummyData);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
    }

    const info = {
        jobDescription: (
            <>
                <p><strong>Job ID:</strong> {jobDetails.jobid || "N/A"}</p>
                <p><strong>Company:</strong> {jobDetails.company || "N/A"}</p>
                <p><strong>Job Title:</strong> {jobDetails.jobtitle || "N/A"}</p>
                <p><strong>Job Location:</strong> {jobDetails.joblocation || "N/A"}</p>
                <p><strong>Job Type:</strong> {jobDetails.jobtype || "N/A"}</p>
                <p><strong>Status:</strong> {jobDetails.status || "N/A"}</p>
                <p><strong>Deadline:</strong> {jobDetails.deadline || "N/A"}</p>
                <p><strong>Job Category:</strong> {jobDetails.job_category || "N/A"}</p>
                <p><strong>Description:</strong> {jobDetails.jobdescription || "No description available"}</p>
            </>
        ),
        hiringFlow: (
            <div className="font-sans  p-6">
                <div className="relative max-w-2xl mx-auto">
                    <div className="flex items-center mb-8">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        <div className="absolute w-1 bg-gray-400 top-4 left-2.5" style={{ height: '20px' }}></div>
                        <div className="ml-6">
                            <h3 className="text-xl font-medium">Application</h3>
                            <p className="text-gray-600">Date: { jobDetails.Hiring_Workflow.application_date || " To be announced"}</p>
                        </div>
                    </div>

                    <div className="flex items-center mb-8">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        <div className="absolute w-1 bg-gray-400 top-4 left-2.5" style={{ height: '20px' }}></div>
                        <div className="ml-6">
                            <h3 className="text-xl font-medium">Pre-placement talk</h3>
                            <p className="text-gray-600">Date: { jobDetails.Hiring_Workflow.ppt_date || " To be announced"}</p>
                        </div>
                    </div>

                    <div className="flex items-center mb-8">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        <div className="absolute w-1 bg-gray-400 top-4 left-2.5" style={{ height: '20px' }}></div>
                        <div className="ml-6">
                            <h3 className="text-xl font-medium">Online test</h3>
                            <p className="text-gray-600">Date: { jobDetails.Hiring_Workflow.oa_date || " To be announced"}</p>
                        </div>
                    </div>

                    <div className="flex items-center mb-8">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        <div className="absolute w-1 bg-gray-400 top-4 left-2.5" style={{ height: '20px' }}></div>
                        <div className="ml-6">
                            <h3 className="text-xl font-medium">Technical interview</h3>
                            <p className="text-gray-600">Date: { jobDetails.Hiring_Workflow.interview_date || " To be announced"}</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        <div className="ml-6">
                            <h3 className="text-xl font-medium">Offer</h3>
                            <p className="text-gray-600">Date: { jobDetails.Hiring_Workflow.offer_date || " To be announced"}</p>
                        </div>
                    </div>
                    <div className=" mt-5 items-center ">
                        <h3 className='font-medium  text-custom-blue'>Complete details </h3>
                        <p>
                            { jobDetails.Hiring_Workflow.other_details || " All the best!!"}
                        </p>
                    </div>
                </div>
            </div>
        )
        ,
        eligibilityCriteria: (
            <>
                <p><strong>Branch Allowded:</strong> {jobDetails.eligibility_criteria?.branches_allowed.join(', ') || "N/A"}</p>
                <p><strong>Gender Allowed:</strong> {jobDetails.eligibility_criteria?.gender_allowed || "N/A"}</p>
                <p><strong>Eligible Batch:</strong> {jobDetails.eligibility_criteria?.eligible_batch || "N/A"}</p>
                <p><strong>Minimum CGPA:</strong> {jobDetails.eligibility_criteria?.minimum_cgpa || "N/A"}</p>
            </>
        ),
        deadline: (
            <>
                <p className='text-center'><strong>Please Apply before: {jobDetails.deadline || "N/A"}</strong> </p>
            </>
        ),
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gray-50 py-12 px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-semibold text-custom-blue">
                        {jobDetails.company || "Unknown Company"}
                    </h1>
                    <h2 className="text-lg text-custom-blue mt-2">Role: {jobDetails.jobtitle || "No Job Title Provided"}</h2>
                </div>

                <div className="flex justify-center space-x-4 mb-8">
                    <button
                        onClick={() => setActiveInfo("jobDescription")}
                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Job Description
                    </button>
                    <button
                        onClick={() => setActiveInfo("hiringFlow")}
                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Hiring Flow
                    </button>
                    <button
                        onClick={() => setActiveInfo("eligibilityCriteria")}
                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Eligibility Criteria
                    </button>
                    <button
                        onClick={() => setActiveInfo("deadline")}
                        className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                        Deadline
                    </button>
                </div>

                <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                    {activeInfo && (
                        <div>
                            <div className="text-lg text-gray-600">
                                {info[activeInfo]}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
