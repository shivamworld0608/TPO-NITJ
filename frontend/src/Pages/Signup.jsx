import Header from "../components/Navbar/Navbar";
import Footer from "../components/footer";
import Login from "../components/login";


const Signup = () => {
  return (
    <>
      <Header />
        <div className="max-w-7xl mx-auto pt-15 px-6 mt-64 mb-36">
        <Login Login={false}/>
      </div>
      <Footer />
    </>
  );
};

export default Signup;