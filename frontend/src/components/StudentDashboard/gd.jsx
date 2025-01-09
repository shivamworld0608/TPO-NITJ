import React, { useEffect, useState } from "react";
import Oacard from "./Oacard";
import axios from "axios";

const GD = () => {
    const [upcomingJobs, setUpcomingJobs] = useState([]);
    const [previousJobs, setPreviousJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleDetailId, setVisibleDetailId] = useState(null); // State to manage visible details

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                setLoading(true);
                const userId = "6769a8e96891a0b319d033a8";

                const upcomingResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/oa/eligible-upcoming/${userId}/`);
                const pastResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/oa/eligible-past/${userId}/`);

                setUpcomingJobs(upcomingResponse.data.oas || []);
                setPreviousJobs(pastResponse.data.oas || []);
            } catch (error) {
                console.error("Error fetching assessments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssessments();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto text-center py-10">
                <h2>Loading assessments...</h2>
            </div>
        );
    }

    if (visibleDetailId) {
        // Render only the details of the visible card
        return (
            <div className="container mx-auto px-4 py-6">
                <Oacard
                    job_id={visibleDetailId}
                    isVisible={true}
                    onHideDetails={() => setVisibleDetailId(null)}
                />
            </div>
        );
    }

    return (
        <>
            <div>
            <h1 className="container text-center font-medium text-custom-blue text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto p-6 sm:p-8 md:p-10">
            UPCOMING GD's
</h1>

            </div>
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingJobs.map((job) => (
                        <Oacard
                            key={job.job_id}
                            job_id={job.job_id}
                            test_date={job.test_date}
                            company_name={job.company_name}
                            result_date={job.result_date}
                            isVisible={false}
                            onShowDetails={() => setVisibleDetailId(job.job_id)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h1 className="container text-center font-medium text-custom-blue text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto p-6 sm:p-8 md:p-10">
                    ATTEMPTED GD's
                </h1>
            </div>
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {previousJobs.map((job) => (
                        <Oacard
                            key={job.job_id}
                            job_id={job.job_id}
                            test_date={job.test_date}
                            company_name={job.company_name}
                            result_date={job.result_date}
                            isVisible={false}
                            onShowDetails={() => setVisibleDetailId(job.job_id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default GD;
