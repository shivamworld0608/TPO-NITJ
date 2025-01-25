import Header from "../components/header";
import Footer from "../components/footer";
import Login from "../components/alogin";


const login = () => {
  return (
    <>
      <Header />
        <div className="max-w-7xl mx-auto pt-15 px-6 mt-64 mb-36">
        <Login Login={true}/>
      </div>
      <Footer />
    </>
  );
};

export default login;