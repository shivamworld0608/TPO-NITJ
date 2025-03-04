import React, { useEffect, useState } from "react";
import axios from "axios";
import InterviewCard from "./InterviewCard";
import BouncingLoader from "../BouncingLoader";
import NoDataFound from "../NoData";
import Notification from "../ProfessorDashboard/Notification";

const InterviewsData = () => {
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [previousInterviews, setPreviousInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);
        const upcomingResponse = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/interview/eligible-upcoming`,
          { withCredentials: true }
        );
        setUpcomingInterviews(upcomingResponse.data.upcomingInterviews || []);
        console.log("helo",upcomingInterviews);

        const pastResponse = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/interview/eligible-past`,
          { withCredentials: true }
        );
        setPreviousInterviews(pastResponse.data.pastInterviews || []);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  /* if (loading) return <BouncingLoader size="medium" text="Loading..." />; */
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-blue"></div>
    </div>
  );
  const renderTabContent = () => {
    if (activeTab === "upcoming") {
      return upcomingInterviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingInterviews.map((job) => (
            <InterviewCard
              key={job.job_id}
              company_name={job.company_name}
              interview_date={job.interview_date}
              interview_time={job.interview_time}
              interview_type={job.interview_type}
              interview_info={job.interview_info}
              interview_link={job.interview_link}
              isLinkVisible={job.isLinkVisible}
              was_selected={job.was_shortlisted}
            />
          ))}
        </div>
      ) : (
        <NoDataFound
          mg="Interview"
          smg="till you will be eligible for Interview 🤗"
        />
      );
    }

    if (activeTab === "past") {
      return previousInterviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {previousInterviews.map((job) => (
            <InterviewCard
              key={job.job_id}
              company_name={job.company_name}
              interview_date={job.interview_date}
              interview_time={job.interview_time}
              interview_type={job.interview_type}
              interview_info={job.interview_info}
              interview_link={job.interview_link}
              isLinkVisible={job.isLinkVisible}
              was_selected={job.was_shortlisted}
            />
          ))}
        </div>
      ) : (
        <NoDataFound mg="OA" smg="you have not any Past Interview 😌" />
      );
    }

    return null;
  };

  return (
    <>
      {/* Tabs */}
      <div className="flex sm:flex-row flex-col justify-between items-center p-4 rounded-t-lg">
        <h2 className="text-3xl font-bold text-custom-blue capitalize">
          <span className="text-black">
            {activeTab === "upcoming" ? "Upcoming" : "Past"}
          </span>{" "}
          Interviews
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

export default InterviewsData;
