import Pdashboard from "../components/ProfessorDashboard/pdashboard";
import LowConnectivityWarning from "../components/LowConnectivityWarning";

const PDashboard = () => {
  return (
    <>
           <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <LowConnectivityWarning />
      </div>
      <div className="mt-3"><Pdashboard /></div>
    </>
  );
};

export default PDashboard;