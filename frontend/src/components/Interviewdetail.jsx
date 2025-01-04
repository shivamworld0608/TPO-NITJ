import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Interviewdetail(props) {
    const {job_id, interview_code}=props;
    const [activeInfo, setActiveInfo] = useState('interdescription');
    const [InterDetails, setInterDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [InterStatus, setInterStatus] = useState("");    
    

    useEffect(() => {
       
        
        const fetchAssessments = async () => {
            try {
                setLoading(true);
                console.log("job_id:", job_id);
                console.log("interview_code:", interview_code);
                const InterviewData = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/interview/details/${job_id}/${interview_code}`);
                setInterDetails(InterviewData.data.interview || []);
                console.log(InterviewData.data);
            } catch (error) {
                console.error("Error fetching assessments:", error);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        
        fetchAssessments();
    }, [job_id, interview_code]);
    

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                setLoading(true);
                const userId = "6769a8e96891a0b319d033a8";
                const Interviewstatus = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/interview/check-shortlist-status/${userId}/${job_id}/${interview_code}`);
    
                setInterStatus(Interviewstatus.data.message ||"");
                
            } catch (error) {
                console.error("Error fetching assessments:", error);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
    
        fetchAssessments();
    }, []);
    
    

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
    }

    const info = {
        interdescription: (
            <>
                <p><strong>Job ID:</strong> {InterDetails.job_id || "N/A"}</p>
                <p><strong>Code:</strong> {InterDetails.interview_code || "N/A"}</p>
                <p><strong>Date:</strong> {InterDetails.interview_date || "N/A"}</p>
                <p><strong>Time:</strong> {InterDetails.interview_time || "N/A"}</p>
                <p><strong>Type:</strong> {InterDetails.interview_type || "N/A"}</p>
            </>
        ),
        guidelines: (
            <div className="mt-5 items-center">
                <h3 className="font-medium text-custom-blue">Read the following details carefully: </h3>
                <p>{InterDetails.important_guidelines || "All the best!!"}</p>
                <h3 className="font-medium text-custom-blue">Notification: </h3>
                <p>{InterDetails.notification || "All the best!!"}</p>
            </div>
        ),
        interviewlink: (
            <>
                <p><strong>Test Link:</strong> {InterDetails.interview_link || "Test Link will be available soon"}</p>
            </>
        ),  
        eligistudents: (
            <>
                {InterDetails.eligible_students && InterDetails.eligible_students.length > 0 ? (
                    InterDetails.eligible_students.map((student, index) => (
                        <div key={index} className="w-sm grid grid-row-2 max-w-sm mx-auto border border-custom-blue bg-white rounded-lg shadow-lg p-6 ">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{student.name}</h2>
                            <p className="text-lg text-gray-600 mt-2">{InterDetails.job_id || "N/A"}</p>
                            <div className="mt-4 space-y-4">
                                <div className="text-sm text-gray-500 flex items-center">
                                    <span className="font-medium text-gray-800 mr-2">Roll NO:</span>
                                    <span className="font-medium text-gray-500"> {student.rollno || "To be announced"}</span>
                                </div>
                                <div className="text-sm text-gray-500 flex items-center">
                                    <span className="font-medium text-gray-800 mr-2">Email:</span>
                                    <span className="font-medium text-gray-500"> {student.email || "To be announced"}</span>
                                </div>
                                <div className="text-sm text-gray-500 flex items-center">
                                    <span className="font-medium text-gray-800 mr-2">Department:</span>
                                    <span className="font-medium text-gray-500"> {student.department || "To be announced"}</span>
                                </div>
                            </div>
                           
                        </div>
                    ))
                ) : (
                    <p>No students found for this interview.</p>
                )}
            </>
        ),
        Shortlistedstudents: (
            <>
                {InterDetails.shortlisted_students && InterDetails.shortlisted_students.length > 0 ? (
                    InterDetails.shortlisted_students.map((student, index) => (
                        <div key={index} className="w-sm grid grid-row-2 max-w-sm mx-auto border border-custom-blue bg-white rounded-lg shadow-lg p-6 ">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{student.name}</h2>
                            <p className="text-lg text-gray-600 mt-2">{InterDetails.job_id || "N/A"}</p>
                            <div className="mt-4 space-y-4">
                                <div className="text-sm text-gray-500 flex items-center">
                                    <span className="font-medium text-gray-800 mr-2">Roll NO:</span>
                                    <span className="font-medium text-gray-500"> {student.rollno || "To be announced"}</span>
                                </div>
                                <div className="text-sm text-gray-500 flex items-center">
                                    <span className="font-medium text-gray-800 mr-2">Email:</span>
                                    <span className="font-medium text-gray-500"> {student.email || "To be announced"}</span>
                                </div>
                                <div className="text-sm text-gray-500 flex items-center">
                                    <span className="font-medium text-gray-800 mr-2">Department:</span>
                                    <span className="font-medium text-gray-500"> {student.department || "To be announced"}</span>
                                </div>
                            </div>
                           
                        </div>
                    ))
                ) : (
                    <p>No students found for this interview.</p>
                )}
            </>
        ),
        status: (
            <>
                {InterStatus === "Shortlisted" ? (
                    <p className="text-center text-green-500"><strong>{InterStatus || "Result will be available soon"}</strong></p>
                ) : InterStatus === "Not shortlisted" ? (
                    <p className="text-center text-red-500"><strong>{InterStatus || "Result will be available soon"}</strong></p>
                ) : (
                    <p className="text-center"><strong>Result: {InterStatus || "Result date will be available soon"}</strong></p>
                )}
            </>
        ),
    };

    return (
        <>
            <div className="min-h-screen py-12 px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-semibold text-custom-blue">
                        {InterDetails.company_name || "Unknown Company"}
                    </h1>
                </div>

                <div className="flex justify-center space-x-4 mb-8">
                    <button
                        onClick={() => setActiveInfo("interdescription")}
                        className="px-6 py-3 bg-custom-blue text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Interview Details
                    </button>
                    <button
                        onClick={() => setActiveInfo("guidelines")}
                        className="px-6 py-3 bg-custom-blue text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Important guidelines
                    </button>
                    <button
                        onClick={() => setActiveInfo("interviewlink")}
                        className="px-6 py-3 bg-custom-blue text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Interview link
                    </button>
                    <button
                        onClick={() => setActiveInfo("eligistudents")}
                        className="px-6 py-3 bg-custom-blue text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Eligible Students
                    </button>
                    <button
                        onClick={() => setActiveInfo("Shortlistedstudents")}
                        className="px-6 py-3 bg-custom-blue text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Shortlisted Students
                    </button>
                    <button
                        onClick={() => setActiveInfo("status")}
                        className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Status
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
        </>
    );
}
