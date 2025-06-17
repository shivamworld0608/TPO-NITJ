import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { RiMenuFold3Fill, RiMenuFold4Fill } from "react-icons/ri";
import {
  faHome,
  faBriefcase,
  faHandsHelping,
  faShareSquare,
  faCalendarDays,
  faKey,
  faDatabase,
   faCertificate,
   faUserTie,
   faUsers,
   faClipboardCheck,
   faLaptopCode,
   faGraduationCap,
   faChalkboardTeacher,
   faCode
} from "@fortawesome/free-solid-svg-icons";

import { Menu, X, LogOut } from "lucide-react";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import NITJlogo from "../../assets/nitj-logo.png";
import TeamSection from "../Developers/TeamSection.jsx";
import NOC from "../DepartmentDashboard/noc.jsx";
import EventManager from "../DepartmentDashboard/events.jsx";


const DepartmentDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState("/home");

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setIsSidebarExpanded(false);
        setIsMenuOpen(false);
      } else {
        setIsSidebarExpanded(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed!");
      console.error("Error during logout:", error.response?.data || error);
    }
  };

  const menuItems = [
    {
      path: "/ddashboard/NOCManagement",
      label: "NOC",
      icon:   faCertificate ,
    },
    {
      path: "/ddashboard/event&workshop",
      label: "Events & Workshops",
      icon:   faChalkboardTeacher,
    },
  ];

  const MenuItem = ({ item, onClick, isSidebarExpanded }) => {
    const isMobileView = window.innerWidth < 768; // Check for mobile view

    return (
      <button
        onClick={() => {
          navigate(item.path);
          onClick?.();
        }}
        className={`flex items-center ${
          !isMobileView && !isSidebarExpanded ? "justify-center " : ""
        } w-full mt-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
          location.pathname === item.path
            ? "bg-custom-blue text-white"
            : "text-gray-600 hover:bg-blue-50"
        }`}
      >
        {/* Always show icon */}
        <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />

        {/* Show label if it's mobile view OR sidebar is expanded */}
        {(isMobileView || isSidebarExpanded) && (
          <span className="ml-3">{item.label}</span>
        )}
      </button>
    );
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center">
            <img
              onClick={() => navigate("/sdashboard/home")}
              src={NITJlogo}
              alt="Logo"
              className="h-10 w-10 object-contain rounded"
            />
            {isSidebarExpanded && (
              <h1 className="absolute ml-14 left-4 top-1/2 transform -translate-y-1/2 font-bold text-2xl sm:text-1xl lg:text-2xl tracking-wide w-max">
                TPO-
                <span className="bg-custom-blue text-transparent bg-clip-text">
                  NITJ
                </span>
              </h1>
            )}
          </div>

         {isMobile ? (
  <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="p-2 rounded-lg hover:bg-gray-100"
  >
    {isMenuOpen ? (
      <X className="w-6 h-6" />
    ) : (
      <RiMenuFold3Fill size={20} className="w-6 h-6" />
    )}
  </button>
) : (
  <div className="flex items-center gap-4">
    <span className="font-inter text-gray-600 font-bold tracking-wide">
      Welcome, <span className="text-custom-blue">{userData.name}</span>
    </span>
    <div className="w-8 h-8 rounded-full bg-custom-blue flex items-center justify-center text-white font-bold">
      {userData?.name?.charAt(0)?.toUpperCase() || "U"}
    </div>
  </div>
)}
        </div>

        {/* Mobile Menu */}
       {isMobile && isMenuOpen && (
  <div className="fixed inset-0 top-16 bg-white z-40">
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <div className="w-12 h-12 rounded-full bg-custom-blue flex items-center justify-center text-white font-bold text-xl">
          {userData?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/sdashboard/profile");
          }}
          className="ml-3"
        >
          <p className="font-medium">{userData.name}</p>
          <p className="text-sm text-gray-500">{userData.email}</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            item={item}
            isSidebarExpanded={true}
            onClick={() => setIsMenuOpen(false)}
          />
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center w-full p-4 text-red-500 hover:bg-red-50"
      >
        <LogOut className="w-5 h-5 mr-3" />
        <span>Logout</span>
      </button>
    </div>
  </div>
)}
      </header>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <>
         <aside
  className={`fixed left-0 top-16 h-[calc(100vh-2rem)] bg-white border-r border-gray-200 transition-all duration-300 ${
    isSidebarExpanded ? "w-64" : "w-16"
  }`}
>
  <div className="h-full overflow-y-auto p-4 flex flex-col justify-between">
    <div>
      {menuItems.map((item) => (
        <MenuItem
          key={item.path}
          item={item}
          isSidebarExpanded={isSidebarExpanded}
        />
      ))}
    </div>
    <button
      onClick={handleLogout}
      className={`flex items-center w-full px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg ${
        !isSidebarExpanded ? "justify-center" : ""
      }`}
    >
      <LogOut className="w-5 h-5" />
      {isSidebarExpanded && <span className="ml-3">Logout</span>}
    </button>
  </div>
</aside>


          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className={`fixed top-16 bg-white rounded-r p-2 shadow-md transition-all duration-300 hover:bg-gray-100 ${
              isSidebarExpanded ? "left-64" : "left-16"
            }`}
          >
            {isSidebarExpanded ? (
              <RiMenuFold3Fill size={20} />
            ) : (
              <RiMenuFold4Fill size={20} />
            )}
          </button>
        </>
      )}

      {/* Main Content */}
<main
  className={`flex-1 mt-12 flex flex-col transition-all duration-300 ${
    !isMobile ? (isSidebarExpanded ? "ml-64" : "ml-16") : ""
  }`}
>
  <div className="container mx-auto px-4 flex-grow">

          {/* Placeholder for route content */}
          <Routes>

            <Route path="/home" element={<NOC />} />
            <Route path="NOCManagement" element={<NOC />} />
            <Route path="event&workshop" element={<EventManager />} />
            <Route path="team" element={<TeamSection />} />
            </Routes>
        </div>

        {/* Footer */}
       <footer className="bg-slate-800 text-white py-3">
  <div className="container mx-auto text-center">
    <div
      onClick={() => {
        navigate("/team");
        onClick?.();
      }}
      className="group cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-300"
    >
      <FontAwesomeIcon
        icon={faCode}
        className="text-yellow-300 text-sm md:text-base group-hover:text-yellow-400 transition-all duration-300"
      />
      <span className="font-grotesk text-sm md:text-base text-gray-300 group-hover:text-yellow-400 tracking-wide">
        Developed by
      </span>
      <span className="font-grotesk text-yellow-300 group-hover:text-yellow-400 font-semibold text-sm md:text-base  transition-all duration-300">
        Placement Portal Dev Team
      </span>
    </div>
  </div>
</footer>

      </main>
    </div>
  );
};


export default DepartmentDashboard ;
