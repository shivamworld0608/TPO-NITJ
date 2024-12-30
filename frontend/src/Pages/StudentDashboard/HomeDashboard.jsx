import React from 'react';
import StudentDashboards from '../../components/StudentDashboard/sdashboard';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Home from '../../components/StudentDashboard/home';
const HomeDashboard = () => {
  return (
    <>
      <Header />
      <StudentDashboards />
      <Home />
      <Footer />
    </>
  );
};

export default HomeDashboard;