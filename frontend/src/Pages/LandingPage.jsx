import Header from "../components/header";
import Footer from "../components/footer";
import Login from "../components/login";
import HeroSection from "../components/herosection";
import TpoMessage from "../components/TpoMessage";
import WhyRecruit from "../components/WhyRecruit";
import RecruitmentProcess from "../components/rprocess";
import NoDataFound from "../components/NoData";

const Home = () => {
  return (
    <>
      <Header />
      <div className="mt-56"><HeroSection /></div>
      <div className="max-w-7xl mx-auto mt-24 mb-40 pt-15 px-6"><Login /></div> 
      <div className="max-w-full mx-auto mt-24 mb-40 pt-15 px-6"><TpoMessage /></div>
      <div className="max-w-7xl mx-auto mt-24"><RecruitmentProcess /></div>
      <div className="max-w-7xl mx-auto mt-24 mb-40"><NoDataFound/></div>
      <div className=" mt-24 pt-15 "><WhyRecruit /></div>
      <Footer/>

    </>
  );
};

export default Home;