import React, { useState, useEffect } from 'react';
import JobCard from '../../components/JobCard';  

const JobApplications = () => {
  const upcomingJobs = [
    { jobid: '12345', company: 'XYZ Inc.', jobtitle: 'Software Engineer', deadline: '2024-01-31', jobtype: 'Tech' },
    { jobid: '12346', company: 'ABC Corp.', jobtitle: 'Data Scientist', deadline: '2024-02-15', jobtype: 'Tech' },
  ];

  const previousJobs = [
    { jobid: '12347', company: 'DEF Ltd.', jobtitle: 'Backend Developer', deadline: '2023-11-20', jobtype: 'Tech' },
    { jobid: '12348', company: 'GHI Enterprises', jobtitle: 'Frontend Developer', deadline: '2023-12-05', jobtype: 'Tech' },
    { jobid: '12349', company: 'JKL Technologies', jobtitle: 'Full Stack Developer', deadline: '2023-10-15', jobtype: 'Tech' },
    { jobid: '12350', company: 'MNO Group', jobtitle: 'Software Engineer', deadline: '2023-09-30', jobtype: 'Tech' },
    { jobid: '12351', company: 'PQR Solutions', jobtitle: 'Product Manager', deadline: '2023-08-25', jobtype: 'Tech' },
    { jobid: '12352', company: 'STU Corp.', jobtitle: 'DevOps Engineer', deadline: '2023-07-20', jobtype: 'Tech' },
    { jobid: '12353', company: 'VWX Ltd.', jobtitle: 'UI/UX Designer', deadline: '2023-06-15', jobtype: 'Tech' },
  ];

  return (
    <>
      <div>
        <h1 className="container text-center font-medium text-custom-blue text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mx-auto p-6 sm:p-8 md:p-10">
          Upcoming Jobs
        </h1>
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {upcomingJobs.map((job, index) => (
            <JobCard
              key={index}
              jobid={job.jobid}
              jobtype={job.jobtype}
              company={job.company}
              jobtitle={job.jobtitle}
              deadline={job.deadline}
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
          {previousJobs.map((job, index) => (
            <JobCard
              key={index}
              jobid={job.jobid}
              company={job.company}
              jobtitle={job.jobtitle}
              deadline={job.deadline}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default JobApplications;
