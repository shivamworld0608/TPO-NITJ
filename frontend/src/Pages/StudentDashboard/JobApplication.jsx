import React from 'react';
import StudentDashboards from '../../components/StudentDashboard/sdashboard';
import Header from '../../components/header';
import Footer from '../../components/footer';
import JobApplications from '../../components/StudentDashboard/job-application';
const JobApplication = () => {
  return (
    <>
        <Header />
        <StudentDashboards />
        <JobApplications />
        <Footer/>
    
      </>
  );
};

export default JobApplication;