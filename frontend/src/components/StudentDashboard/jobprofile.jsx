import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../JobCard';

const JobApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [notAppliedJobs, setNotAppliedJobs] = useState([]);
  const [liveNotAppliedJobs, setLiveNotAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/jobprofile/getjobs`, {
          withCredentials: true,
        });

        const { applied, notApplied, liveButNotApplied } = response.data;

        setAppliedJobs(applied);
        setNotAppliedJobs(notApplied);
        setLiveNotAppliedJobs(liveButNotApplied);
      } catch (err) {
        setError('Failed to fetch job data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <>
      <div>
        <h1 className="container text-center font-medium text-custom-blue text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto p-6 sm:p-8 md:p-10">
          Upcoming Jobs
        </h1>
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {liveNotAppliedJobs.map((job, index) => (
            <JobCard
              key={job.jobid || index}
              jobid={job.jobid}
              jobtype={job.jobtype}
              company={job.company_name}
              jobtitle={job.job_role}
              deadline={job.deadline}
              jpid={job._id}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="container text-center font-medium text-custom-blue text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto p-6 sm:p-8 md:p-10">
          Applied Jobs
        </h1>
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {appliedJobs.map((job, index) => (
            <JobCard
              key={job.jobid || index}
              jobid={job.jobid}
              jobtype={job.jobtype}
              company={job.company_name}
              jobtitle={job.job_role}
              deadline={job.deadline}
              jpid={job._id}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="container text-center font-medium text-custom-blue text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto p-6 sm:p-8 md:p-10">
          Not Applied Jobs
        </h1>
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {notAppliedJobs.map((job, index) => (
            <JobCard
              key={job.jobid || index}
              jobid={job.jobid}
              jobtype={job.jobtype}
              company={job.company_name}
              jobtitle={job.job_role}
              deadline={job.deadline}
              jpid={job._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default JobApplications;
