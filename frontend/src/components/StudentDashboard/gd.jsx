import React, { useEffect, useState } from "react";
import Gdcard from "./Gdcard";
import axios from "axios";
import BouncingLoader from "../BouncingLoader";
import NoDataFound from "../NoData";
import Notification from "../ProfessorDashboard/Notification";

const GD = () => {
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
          `${import.meta.env.REACT_APP_BASE_URL}/gd/eligible-upcoming`,
          { withCredentials: true }
        );
        setUpcomingJobs(upcomingResponse.data.upcomingGDs || []);
        const pastResponse = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/gd/eligible-past`,
          { withCredentials: true }
        );
        setPreviousJobs(pastResponse.data.pastGDs || []);
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
        <Gdcard
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
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingJobs.map((gd, index) => (
            <Gdcard
              key={index}
              company_name={gd.company_name}
              company_logo={gd.company_logo}
              gd_date={gd.gd_date}
              gd_login_time={gd.gd_time}
              gd_info={gd.gd_info}
              isLinkVisible={gd.isLinkVisible}
              gd_link={gd.gd_link}
              was_shortlisted={gd.was_shortlisted}
            />
          ))}
        </div>
      ) : (
        <NoDataFound mg="GD" smg="till you will be eligible for any GD 🤗" />
      );
    }

    if (activeTab === "past") {
      return previousJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {previousJobs.map((gd, index) => (
            <Gdcard
              key={index}
              company_name={gd.company_name}
              company_logo={gd.company_logo}
              gd_date={gd.gd_date}
              gd_login_time={gd.gd_time}
              gd_info={gd.gd_info}
              gd_link={gd.gd_link}
              isLinkVisible={gd.isLinkVisible}
              was_shortlisted={gd.was_shortlisted}
            />
          ))}
        </div>
      ) : (
        <NoDataFound mg="GD" smg="you have not any Past GD 😌" />
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
          GDs
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

export default GD;
