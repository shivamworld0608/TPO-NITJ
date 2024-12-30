import React from 'react';
import StudentDashboards from '../../components/StudentDashboard/sdashboard';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Interviews from '../../components/StudentDashboard/interviews';

const Interview = () => {
  return (
    <>
        <Header />
        <StudentDashboards />
        <Interviews />
        <Footer/>
    
      </>
  );
};

export default Interview;