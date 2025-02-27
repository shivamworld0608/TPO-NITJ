import Header from "../components/Navbar/Navbar";
import Footer from "../components/footer";
import Placements from "../components/placements";


const Placement = () => {
  return (
    <>
      <Header />
      <div className="mt-5"><Placements /></div>
      <Footer/>

    </>
  );
};

export default Placement;