import React, { useEffect, useState } from "react";
import axios from "axios";
import InterviewCard from "../../components/InterviewCard";

const interviewsData = () => {
    const [upcomingInterviews, setUpcomingInterviews] = useState([]);
    const [previousInterviews, setPreviousInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleDetailId, setVisibleDetailId] = useState(null); // State to manage visible details

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                setLoading(true);
                const userId = "6769a8e96891a0b319d033a8";

                const upcomingResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/interview/eligible-upcoming/${userId}/`);
                const pastResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/interview/eligible-past/${userId}/`);

                setUpcomingInterviews(upcomingResponse.data.interviews || []);
                setPreviousInterviews(pastResponse.data.interviews || []);
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
                <InterviewCard
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
            UPCOMING INTERVIEWS
</h1>

            </div>
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingInterviews.map((job) => (
                        <InterviewCard
                            key={job.job_id}
                            job_id={job.job_id}
                            interview_code={job.interview_code}
                            company_name={job.company_name}
                            interview_date={job.interview_date}
                            interview_time={job.interview_time}
                            interview_type={job.interview_type}
                            isVisible={false}
                            onShowDetails={() => setVisibleDetailId(job.job_id)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h1 className="container text-center font-medium text-custom-blue text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto p-6 sm:p-8 md:p-10">
                    PREVIOUS INTERVIEWS
                </h1>
            </div>
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {previousInterviews.map((job) => (
                        <InterviewCard
                        key={job.job_id}
                        job_id={job.job_id}
                        interview_code={job.interview_code}
                        company_name={job.company_name}
                        interview_date={job.interview_date}
                        interview_time={job.interview_time}
                        interview_type={job.interview_type}
                            isVisible={false}
                            onShowDetails={() => setVisibleDetailId(job.job_id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default interviewsData;
