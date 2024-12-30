import React from 'react';
import StudentDashboards from "../../components/StudentDashboard/sdashboard";
import Header from "../../components/header";
import Footer from "../../components/footer";
import MailboxComponent from '../../components/StudentDashboard/mailbox';

const Mailbox = () => {
  return (
    <>
      <Header />
      <StudentDashboards />
      <MailboxComponent />
      <Footer />
    </>
  );
};

export default Mailbox;