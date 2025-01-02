import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Oadetails(props) {
    const [activeInfo, setActiveInfo] = useState('oadescription');
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobResult, setJobResult] = useState("");    

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                setLoading(true);
                const userId = "6769a8e96891a0b319d033a8";

                if (!userId) {
                    console.error("User ID not found in token");
                    return;
                }
               
                const dummyData = await axios.get(`http://localhost:5000/oa/details/${props.job_id}/`);

                setJobDetails(dummyData.data.oa ||[]);
            } catch (error) {
                console.error("Error fetching assessments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssessments();
    }, []);

    useEffect(() => {
        const fetchResult = async () => {
          try {
            const userId = "6769a8e96891a0b319d033a8";
    
            if (!userId) {
              console.error("User ID not found in token");
              return;
            }
            const result = await axios.get(`http://localhost:5000/oa/check-shortlist-status/${userId}/${props.job_id}/`);
    
            setJobResult(result.data.message && result.data.message !== "" ? result.data.message : "Not yet"); 
          } catch (error) {
            console.error("Error fetching assessments:", error);
          }
        };
    
        fetchResult();
      }, [props.job_id]);


    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
    }

    const info = {
        oadescription: (
            <>
                <p><strong>Job ID:</strong> {jobDetails.job_id || "N/A"}</p>
                <p><strong>Company:</strong> {jobDetails.company_name || "N/A"}</p>
                <p><strong>Login time:</strong> {jobDetails.login_time || "N/A"}</p>
                <p><strong>Test duration:</strong> {jobDetails.test_duration || "N/A"}</p>
                <p><strong>Test pattern:</strong> {jobDetails.test_pattern || "N/A"}</p>
                <p><strong>Test date:</strong> {jobDetails.test_date || "N/A"}</p>
            </>
        ),
        guidelines: (
            <div className="mt-5 items-center">
                <h3 className="font-medium text-custom-blue">Read the following details carefully: </h3>
                <p>{jobDetails.important_guidelines || "All the best!!"}</p>
                <h3 className="font-medium text-custom-blue">Notification: </h3>
                <p>{jobDetails.notification || "All the best!!"}</p>
            </div>
        ),
        testlink: (
            <>
                <p><strong>Test Link:</strong> {jobDetails.test_link || "Test Link will be available soon"}</p>
            </>
        ),
        testresult: (
            <>
            {
              jobResult === "Shortlisted" ? (
                <p className="text-center text-green-500"><strong>Result: {jobResult || "Result date will be available soon"}</strong></p>
              ) : jobResult === "Not shortlisted" ? (
                <p className="text-center text-red-500"><strong>Result: {jobResult || "Result date will be available soon"}</strong></p>
              ) : (
                <p className="text-center"><strong>Result: {jobResult || "Result date will be available soon"}</strong></p>
              )
            }
          </>
          
        ),
    };

    return (
        <>
            

            <div className="min-h-screen  py-12 px-6">
                <div className="text-center mb-12">
                    {/* <img src={jobDetails.company_logo} alt="Company logo" /> */}
                    <h1 className="text-4xl sm:text-5xl font-semibold text-custom-blue">
                        {jobDetails.company_name || "Unknown Company"}
                    </h1>
                 </div>

                <div className="flex justify-center space-x-4 mb-8">
                    <button
                        onClick={() => setActiveInfo("oadescription")}
                        className="px-6 py-3 bg-custom-blue text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        OA Details
                    </button>
                    <button
                        onClick={() => setActiveInfo("guidelines")}
                        className="px-6 py-3 bg-custom-blue text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Important guidelines
                    </button>
                    <button
                        onClick={() => setActiveInfo("testlink")}
                        className="px-6 py-3 bg-custom-blue text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Test link
                    </button>
                    <button
                        onClick={() => setActiveInfo("testresult")}
                        className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Result
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
