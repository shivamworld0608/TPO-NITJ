import Header from "../components/header";
import Footer from "../components/footer";
import DepartmentDashboard  from "../components/DepartmentDashboard/ddashboard";
import LowConnectivityWarning from "../components/LowConnectivityWarning";
const Ddashboard = () => {
  return (
    <>
     <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <LowConnectivityWarning />
      </div>
      <div className="mt-3"><DepartmentDashboard  /></div>
    </>
  );
};

export default Ddashboard;