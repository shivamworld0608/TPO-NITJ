import Header from "../components/header";
import Footer from "../components/footer";
import Login from "../components/login";
import HeroSection from "../components/herosection";
import TpoMessage from "../components/TpoMessage";
import WhyRecruit from "../components/WhyRecruit";
import RecruitmentProcess from "../components/rprocess";
import ImageSlider from "../components/ImageSlider";
import PlacementHighlights from "../components/placementHighlights";
import TestimonialTPC from "../components/testimonials";
import FAQ from "../components/faq";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";

const Home = () => {
  return (
    <>
      <Header />
      <div className="mt-56"><HeroSection /></div>
      <div className="max-w-7xl mx-auto"><Login /></div> 
      <div className=" max-w-7xl mx-auto "><AboutUs /></div>
      <div className="max-w-7xl mx-auto "><TpoMessage /></div>
      <div className="max-w-7xl mx-auto mt-24"><RecruitmentProcess /></div>
      <div className=" mt-24 pt-15 "><WhyRecruit /></div>
      <div className="max-w-7xl mx-auto  "><WhyRecruit /></div>
      <div className="max-w-7xl mx-auto "><PlacementHighlights /></div>    
      <div className="max-w-7xl mx-auto"><TestimonialTPC /></div>
      <div className=" max-w-7xl mx-auto "><FAQ /></div>
      <div className="max-w-7xl mx-auto mt-24 mb-40 pt-15 px-6"><ImageSlider/></div>
      <div className=" max-w-7xl mx-auto"><ContactUs /></div>
      <Footer/>

    </>
  );
};

export default Home;