import Header from "../components/header";
import Footer from "../components/footer";
import Login from "../components/login";
import HeroSection from "../components/herosection";
import TpoMessage from "../components/TpoMessage";
import WhyRecruit from "../components/WhyRecruit";
import RecruitmentProcess from "../components/rprocess";
import ImageSlider from "../components/ImageSlider";

const Home = () => {
  return (
    <>
      <Header />
      <div className="mt-56"><HeroSection /></div>
      <div className="max-w-7xl mx-auto mt-24 mb-40 pt-15 px-6"><Login /></div> 
      <div className="max-w-full mx-auto mt-24 mb-40 pt-15 px-6"><TpoMessage /></div>
      <div className="max-w-7xl mx-auto mt-24"><RecruitmentProcess /></div>
      <div className=" mt-24 pt-15 "><WhyRecruit /></div>
      <div className="max-w-7xl mx-auto mt-24 mb-40 pt-15 px-6"><ImageSlider/></div>
      <Footer/>

    </>
  );
};

export default Home;