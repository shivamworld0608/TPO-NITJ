import Header from "../components/header";
import Footer from "../components/footer";
import Placements from "../components/placements";


const Placement = () => {
  return (
    <>
      <Header />
      <div className="mt-"><Placements /></div>
      <Footer/>

    </>
  );
};

export default Placement;