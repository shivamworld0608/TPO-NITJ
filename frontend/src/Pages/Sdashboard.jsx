import Header from "../components/header";
import Footer from "../components/footer";
import Sdashboards from "../components/sdashboard";
import LowConnectivityWarning from "../components/LowConnectivityWarning";
const SDashboard = () => {
  return (
    <>
     <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <LowConnectivityWarning />
      </div>
      <div className="mt-3"><Sdashboards /></div>
    </>
  );
};

export default SDashboard;