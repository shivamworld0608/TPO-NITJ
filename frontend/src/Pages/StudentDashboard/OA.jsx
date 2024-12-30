import React from 'react';
import StudentDashboards from '../../components/StudentDashboard/sdashboard';
import Header from '../../components/header';
import Footer from '../../components/footer';
import OnlineAssessment from '../../components/StudentDashboard/oa';

const OA = () => {
  return (
    <>
      <Header />
      <StudentDashboards />
      <OnlineAssessment />
      <Footer />
    </>
  );
};

export default OA;