import Header from "../components/header";
import Footer from "../components/footer";
import HeroSection from "../components/herosection";
import Pdashboard from "../components/ProfessorDashboard/pdashboard";


const PDashboard = () => {
  return (
    <>
      <Header />
      <div className="mt-36"><Pdashboard /></div>
      <Footer/>
    </>
  );
};

export default PDashboard;