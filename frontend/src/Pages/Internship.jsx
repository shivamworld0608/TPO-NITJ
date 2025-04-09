import Header from "../components/header";
import Footer from "../components/footer";
import Internships from "../components/Internship"; 
const Internship = () => {
  return (
    <>
      <Header />
      <div className="mt-5">
        <Internships />
      </div>
      <Footer />
    </>
  );
};

export default Internship;
