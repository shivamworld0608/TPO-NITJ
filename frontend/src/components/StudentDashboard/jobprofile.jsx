import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../../components/JobCard';
import Jobdetail from '../../components/Jobdetail';
import ApplicationForm from '../../components/StudentDashboard/applicationform'

const JobApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [notAppliedJobs, setNotAppliedJobs] = useState([]);
  const [liveNotAppliedJobs, setLiveNotAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleDetailId, setVisibleDetailId] = useState(null);
  const [application, setapplication] = useState(false);

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


  if (visibleDetailId) {
    console.log(application) 

    return (
      <div className="container mx-auto px-4 py-6">
        <Jobdetail
          job_id={visibleDetailId}
          onBack={() => setVisibleDetailId(null)} // Back to job list
          onShow={() => setapplication(true)}
        />
      </div>
    );
  }

  if (application) {
    console.log(application)
    return (
      <div className="container mx-auto px-4 py-6">
        <ApplicationForm onHide={() => setapplication(null)} />
      </div>
    );
  }


  return (
    <>
      <div>
        <h1 className="container text-center font-medium text-custom-blue text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto p-6 sm:p-8 md:p-10">
          Upcoming Jobs
        </h1>
      </div>

      {/* Live Not Applied Jobs */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveNotAppliedJobs.map((job) => (
            <JobCard
              key={job.job_id}
              job_id={job.job_id}
              jobtype={job.jobtype}
              company={job.company_name}
              jobtitle={job.job_role}
              deadline={job.deadline}
              jpid={job._id}
              isVisible={false}
              onShowDetails={() => setVisibleDetailId(job._id)}  // Show details
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="container text-center font-medium text-custom-blue text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto p-6 sm:p-8 md:p-10">
          Applied Jobs
        </h1>
      </div>

      {/* Applied Jobs */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedJobs.map((job) => (
            <JobCard
              key={job.job_id}
              job_id={job.job_id}
              jobtype={job.jobtype}
              company={job.company_name}
              jobtitle={job.job_role}
              deadline={job.deadline}
              jpid={job._id}
              isVisible={false}
              onShowDetails={() => {
                // console.log("jpid:", job._id);
                setVisibleDetailId(job._id);
              }
              }  // Show details

            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="container text-center font-medium text-custom-blue text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto p-6 sm:p-8 md:p-10">
          Not Applied Jobs
        </h1>
      </div>

      {/* Not Applied Jobs */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notAppliedJobs.map((job) => (
            <JobCard
              key={job.job_id}
              job_id={job.job_id}
              jobtype={job.jobtype}
              company={job.company_name}
              jobtitle={job.job_role}
              deadline={job.deadline}
              jpid={job._id}
              isVisible={false}
              onShowDetails={() => setVisibleDetailId(job._id)}  // Show details
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default JobApplications;
