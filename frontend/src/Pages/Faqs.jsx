import Header from "../components/Navbar/Navbar";
import Footer from "../components/footer";
import FAQ from "../components/faqs";


const Faqs = () => {
  return (
    <>
      <Header />
      <div className="mt-10"><FAQ /></div>
      <Footer/>

    </>
  );
};

export default Faqs;