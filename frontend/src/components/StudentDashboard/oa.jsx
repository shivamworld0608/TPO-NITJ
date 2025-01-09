import React, { useEffect, useState } from "react";
import Oacard from "./Oacard";
import axios from "axios";

const OnlineAssessment = () => {
    const [upcomingJobs, setUpcomingJobs] = useState([]);
    const [previousJobs, setPreviousJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleDetailId, setVisibleDetailId] = useState(null);
    const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' or 'past'

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                setLoading(true);
                const upcomingResponse = await axios.get(
                    `${import.meta.env.REACT_APP_BASE_URL}/oa/eligible-upcoming`,
                    { withCredentials: true }
                );
                setUpcomingJobs(upcomingResponse.data.upcomingOAs || []);
                const pastResponse = await axios.get(
                    `${import.meta.env.REACT_APP_BASE_URL}/oa/eligible-past`,
                    { withCredentials: true }
                );
                setPreviousJobs(pastResponse.data.pastOAs || []);
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

    const renderTabContent = () => {
        if (activeTab === "upcoming") {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingJobs.map((oa, index) => (
                        <Oacard
                            key={index}
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
            );
        }

        if (activeTab === "past") {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {previousJobs.map((oa, index) => (
                        <Oacard
                            key={index}
                            company_name={oa.company_name}
                            company_logo={oa.company_logo}
                            oa_date={oa.oa_date}
                            oa_login_time={oa.oa_login_time}
                            oa_duration={oa.oa_duration}
                            oa_info={oa.oa_info}
                            oa_link={oa.oa_link}
                            was_shortlisted={oa.was_shortlisted}
                        />
                    ))}
                </div>
            );
        }

        return null;
    };

    return (
        <>
            {/* Tabs */}
            <div className="flex justify-between items-center bg-white p-4 rounded-t-lg ">
                <h2 className="text-3xl font-semibold text-custom-blue capitalize underline underline-offset-8">
                    {activeTab === "upcoming" ? "Upcoming OA's" : "Past OA's"}
                </h2>
                <div className="flex border border-gray-300 rounded-3xl bg-white">
                    <button
                        className={`px-4 py-2 rounded-3xl ${
                            activeTab === "upcoming"
                                ? "bg-custom-blue text-white"
                                : "bg-white"
                        }`}
                        onClick={() => setActiveTab("upcoming")}
                    >
                        Upcoming
                    </button>
                    <button
                        className={`px-4 py-2 rounded-3xl ${
                            activeTab === "past"
                                ? "bg-custom-blue text-white"
                                : "bg-white"
                        }`}
                        onClick={() => setActiveTab("past")}
                    >
                        Previous
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="container mx-auto px-4 py-6">{renderTabContent()}</div>
        </>
    );
};

export default OnlineAssessment;
