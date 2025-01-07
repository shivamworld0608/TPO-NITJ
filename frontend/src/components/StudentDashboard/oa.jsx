import React, { useEffect, useState } from "react";
import Oacard from "../../components/Oacard";
import axios from "axios";

const OnlineAssessment = () => {
    const [upcomingJobs, setUpcomingJobs] = useState([]);
    const [previousJobs, setPreviousJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleDetailId, setVisibleDetailId] = useState(null); // State to manage visible details

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                setLoading(true);
                const upcomingResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/oa/eligible-upcoming`,{withCredentials: true});
/*                 const pastResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/oa/eligible-past`,{useCredentials: true}); */
                setUpcomingJobs(upcomingResponse.data.upcomingOAs || []);
                console.log("upcoming",upcomingJobs);
               /*  setPreviousJobs(pastResponse.data.oas || []); */
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
            <h1 className="container text-center font-medium text-custom-blue text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto p-6 sm:p-8 md:p-10 underline underline-offset-8">
            UPCOMING OA's
</h1>

            </div>
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingJobs.map((oa) => (
                        <Oacard
                        company_name={oa.company_name}
                        company_logo={oa.company_logo}
                        oa_date={oa.oa_date}
                        oa_login_time={oa.oa_login_time}
                        oa_duration={oa.oa_duration}
                        oa_info={oa.oa_info}
                        oa_link={oa.oa_link}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h1 className="container text-center font-medium text-custom-blue text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto p-6 sm:p-8 md:p-10 underline underline-offset-8">
                    Past OA's
                </h1>
            </div>
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {previousJobs.map((oa) => (
                        <Oacard
                        company_name={oa.company_name}
                        company_logo={oa.company_logo}
                        oa_date={oa.oa_date}
                        oa_login_time={oa.oa_login_time}
                        oa_duration={oa.oa_duration}
                        oa_info={oa.oa_info}
                        oa_link={oa.oa_link}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default OnlineAssessment;
