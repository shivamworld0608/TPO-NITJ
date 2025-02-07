import Rdashboard from "../components/rdashboard";
import LowConnectivityWarning from "../components/LowConnectivityWarning";
import React from 'react';
import { Calendar, Home, FileText, Mail, Settings, LogOut } from 'lucide-react';

const RDashboard = () => {
  return (
    <>
     <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <LowConnectivityWarning />
      </div>
 <Rdashboard />
    </>   );
};

export default RDashboard;