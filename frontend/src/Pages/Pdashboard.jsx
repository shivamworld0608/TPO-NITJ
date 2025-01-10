import Header from "../components/header";
import Footer from "../components/footer";
import HeroSection from "../components/herosection";
import Pdashboard from "../components/ProfessorDashboard/pdashboard";
import RequestHelpManager from "../components/ProfessorDashboard/Request";


const PDashboard = () => {
  return (
    <>
      <Header />
      <div className="mt-36"><Pdashboard /></div>
      <RequestHelpManager/>
      <Footer/>
    </>
  );
};

export default PDashboard;