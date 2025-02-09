import Admindashboard from "../components/Admin/admindashboard";
import LowConnectivityWarning from "../components/LowConnectivityWarning";

const AdminDashboard = () => {
  return (
    <>
           <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <LowConnectivityWarning />
      </div>
      <div className="mt-3"><Admindashboard/></div>
    </>
  );
};

export default AdminDashboard;