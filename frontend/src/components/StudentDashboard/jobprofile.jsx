import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import Jobdetail from "./Jobdetail";
import LowConnectivityWarning from "../LowConnectivityWarning"
import Notification from "../ProfessorDashboard/Notification";
import NoDataFound from "../NoData";

const JobApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [notAppliedJobs, setNotAppliedJobs] = useState([]);
  const [liveNotAppliedJobs, setLiveNotAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/getjobs`,
          { withCredentials: true }
        );

        const { applied, notApplied, liveButNotApplied } = response.data;

        setAppliedJobs(applied || []);
        setNotAppliedJobs(notApplied || []);
        setLiveNotAppliedJobs(liveButNotApplied || []);
      } catch (err) {
        setError("Failed to fetch job data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-blue"></div>
    </div>
  );

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "upcoming":
        return liveNotAppliedJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {liveNotAppliedJobs.map((job) => (
              <JobCard
                key={job.job_id}
                job_id={job.job_id}
                jobtype={job.job_type}
                company={job.company_name}
                jobtitle={job.job_role}
                deadline={job.deadline}
                jpid={job._id}
                isVisible={false}
              />
            ))}
          </div>
        ) : (
          <NoDataFound mg="Live Job Profile" smg="till any Job Posted 😊" />
        );

      case "applied":
        return appliedJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {appliedJobs.map((job) => (
              <JobCard
                key={job.job_id}
                job_id={job.job_id}
                jobtype={job.job_type}
                company={job.company_name}
                jobtitle={job.job_role}
                deadline={job.deadline}
                jpid={job._id}
                isVisible={false}
              />
            ))}
          </div>
        ) : (
          <NoDataFound mg="Job Profile" smg="you have not applied for any Job 😌" />
        );

      case "notApplied":
        return notAppliedJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {notAppliedJobs.map((job) => (
              <JobCard
                key={job.job_id}
                job_id={job.job_id}
                jobtype={job.job_type}
                company={job.company_name}
                jobtitle={job.job_role}
                deadline={job.deadline}
                jpid={job._id}
                isVisible={false}
              />
            ))}
          </div>
        ) : (
          <NoDataFound mg="Job Profile" smg="you have applied for all Job👌" />
        );

      default:
        return null;
    }
  };

  return (
 <>
<div className="fixed top-0 left-0 w-full z-50">
    <LowConnectivityWarning />
  </div>
      <div className="flex sm:flex-row flex-col justify-between items-center p-4 rounded-t-lg">
        <h2 className="text-3xl font-bold text-custom-blue capitalize">
          <span className="text-black">{activeTab}</span> Jobs
        </h2>
        <div className="flex border border-gray-300 rounded-3xl bg-white sm:mt-0 mt-10">
          <button
            className={`px-4 py-2 rounded-3xl ${
              activeTab === "upcoming" ? "bg-custom-blue text-white" : "bg-white"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded-3xl ${
              activeTab === "applied" ? "bg-custom-blue text-white" : "bg-white"
            }`}
            onClick={() => setActiveTab("applied")}
          >
            Applied
          </button>
          <button
            className={`lg:px-4 lg:py-2 p-2 rounded-3xl ${
              activeTab === "notApplied" ? "bg-custom-blue text-white" : "bg-white"
            }`}
            onClick={() => setActiveTab("notApplied")}
          >
            Not Applied
          </button>
        </div>
      </div>
      <Notification/>
      <div className="container mx-auto px-4 py-6">{renderTabContent()}</div>
    </>
  );
};

export default JobApplications;