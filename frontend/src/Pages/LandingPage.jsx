import Header from "../components/header";
import Footer from "../components/footer";
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
import EventsSection from "../components/EventsSection";

const Home = () => {
  return (
    <>
      <Header />
      <div className="mt-36"><HeroSection /></div>
      <div className=" max-w-full mx-auto "><AboutUs /></div>
      <div className="max-w-full mx-auto "><TpoMessage /></div>
      <div className="max-w-7xl mx-auto mt-24"><RecruitmentProcess /></div>
      <div className="max-w-full mx-auto  mt-24"><WhyRecruit /></div>
      <div className="max-w-7xl mx-auto "><PlacementHighlights /></div> 
      <div className="max-w-7xl mx-auto"><EventsSection/></div>
      <div className="max-w-7xl mx-auto mt-24 mb-16 pt-15 px-6"><ImageSlider/></div>   
      <div className="max-w-7xl mx-auto"><TestimonialTPC /></div>
      <div className=" max-w-7xl mx-auto mt-10"><FAQ /></div>
      <div className=" max-w-full mx-auto"><ContactUs /></div>
      <Footer/>

    </>
  );
};

export default Home;
