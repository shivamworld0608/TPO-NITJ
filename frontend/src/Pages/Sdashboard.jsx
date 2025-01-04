import Header from "../components/header";
import Footer from "../components/footer";
import Sdashboards from "../components/sdashboard";

const SDashboard = () => {
  return (
    <>
      <Header />
      <div className="mt-36"><Sdashboards /></div>
      <Footer/>
    </>
  );
};

export default SDashboard;