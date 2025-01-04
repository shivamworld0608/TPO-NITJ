import Header from "../components/header";
import Footer from "../components/footer";
import Login from "../components/login";
import HeroSection from "../components/herosection";

const Home = () => {
  return (
    <>
      <Header />
      <div className="mt-56"><HeroSection /></div>
      <div className="max-w-7xl mx-auto mt-24 mb-40 pt-15 px-6"><Login /></div> 
      <Footer/>

    </>
  );
};

export default Home;