import Header from "../components/header";
import Footer from "../components/footer";
import Sdashboards from "../components/sdashboard";
import CreateJobApplication from "../components/RecruiterDashboard/createjob";
import CreatedJobs from "../components/RecruiterDashboard/createdjob";

const SDashboard = () => {
  return (
    <>
      <Header />
      <Sdashboards />
      <CreateJobApplication />
      <CreatedJobs />
      <Footer/>
    </>
  );
};

export default SDashboard;