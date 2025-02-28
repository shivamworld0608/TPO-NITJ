import React, { useEffect, useState } from "react";
import Oacard from "./Oacard";
import axios from "axios";
import BouncingLoader from "../BouncingLoader";
import NoDataFound from "../NoData";
import Notification from "../ProfessorDashboard/Notification";

const OnlineAssessment = () => {
  const [upcomingJobs, setUpcomingJobs] = useState([]);
  const [previousJobs, setPreviousJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleDetailId, setVisibleDetailId] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

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
                console.log(pastResponse.data.pastOAs);
                
            } catch (error) {
                console.error("Error fetching assessments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssessments();
    }, []);

    if (loading) return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-blue"></div>
      </div>
    );

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
      return upcomingJobs.length > 0 ? (
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
              isLinkVisible={oa.isLinkVisible}
              oa_link={oa.oa_link}
              was_shortlisted={oa.was_shortlisted}
            />
          ))}
        </div>
      ) : (
        <NoDataFound mg="OA" smg="till you will be eligible for any OA 🤗" />
      );
    }

    if (activeTab === "past") {
      return previousJobs.length > 0 ? (
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
              isLinkVisible={oa.isLinkVisible}
              was_shortlisted={oa.was_shortlisted}
            />
          ))}
        </div>
      ) : (
        <NoDataFound mg="OA" smg="you have not any Past OA 😌" />
      );
    }

    return null;
  };

  return (
    <>
      {/* Tabs */}
      <div className="flex sm:flex-row flex-col justify-between items-center p-4 rounded-t-lg ">
        <h2 className="text-3xl font-bold text-custom-blue capitalize">
          <span className="text-black">
            {activeTab === "upcoming" ? "Upcoming" : "Past"}
          </span>{" "}
          OA's
        </h2>

        <div className="flex border border-gray-300 rounded-3xl bg-white sm:mt-0 mt-10">
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
              activeTab === "past" ? "bg-custom-blue text-white" : "bg-white"
            }`}
            onClick={() => setActiveTab("past")}
          >
            Previous
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-6">{renderTabContent()}</div>
      <Notification/>
    </>
  );
};

export default OnlineAssessment;
