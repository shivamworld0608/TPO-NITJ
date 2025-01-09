import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";
import {
  faBriefcase,
  faEnvelope,
  faHandsHelping,
  faShareSquare,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./StudentDashboard/home";
import CreatedJobs from "./RecruiterDashboard/createdjob";
import MailboxComponent from "./StudentDashboard/mailbox";
import OnlineAssessment from "./StudentDashboard/oa";
import Profile from "./StudentDashboard/profile";
import ProfileImage from "../assets/chillguy.png";
import CopycreateJob from "./RecruiterDashboard/createjob.jsx";
const RecruiterDashboards = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      path: "/rdashboard/createdjob",
      label: "Created Job Profile",
      icon: faBriefcase,
    },
    { path: "/rdashboard/mailbox", label: "Mailbox", icon: faEnvelope },
    {
      path: "/rdashboard/request-help",
      label: "Request Help",
      icon: faHandsHelping,
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white z-10 border-b border-gray-200 fixed top-0 left-0 right-0 p-4">
        <div className="flex items-center justify-end space-x-4">
          <span className="text-gray-800 text-md">
            👋 Hi, {userData?.name || "User"}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 p-1"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 mt-16">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 bottom-0 z-20 bg-white border-r border-gray-200 transition-all duration-300 ${
            isOpen ? "w-60" : "w-16"
          }`}
        >
          {isOpen && (
            <h1 className="font-bold text-2xl sm:text-1xl lg:text-2xl text-center tracking-wide mt-4">
              TPO-
              <span className="bg-custom-blue text-transparent bg-clip-text">
                NITJ
              </span>
              <hr className="mt-3" />
            </h1>
          )}
          <div className="p-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded text-black hover:bg-gray-600 focus:outline-none"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <nav className="mt-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={`flex items-center w-full text-left px-2 py-2 rounded-lg ${
                        location.pathname === item.path
                          ? "bg-custom-blue text-white"
                          : "text-gray-600 hover:bg-blue-50"
                      }`}
                    >
                      <FontAwesomeIcon icon={item.icon} className="mr-3" />
                      {isOpen && <span>{item.label}</span>}
                    </button>
                  </li>
                ))}
                {!isOpen && (
                  <img
                    onClick={() => navigate("/rdashboard/profile")}
                    src={userData?.image || ProfileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer hover:shadow-lg"
                  />
                )}
              </ul>
            </nav>
          </div>
          {/* Profile Section */}
          <div className="p-4 mb-0 mt-16">
            <button
              onClick={() => navigate("/sdashboard/profile")}
              className="flex items-center w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 border"
            >
              {isOpen && (
                <div className="flex items-center justify-center">
                  <img
                    src={userData?.image || ProfileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium">
                      {userData?.name}
                    </p>
                    <p className="text-gray-500 text-sm">{userData?.email}</p>
                  </div>
                </div>
              )}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isOpen ? "ml-60" : "ml-16"
          }`}
        >
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="home" element={<CopycreateJob />} />
              <Route path="createdjob" element={<CreatedJobs />} />
              <Route path="oa" element={<OnlineAssessment />} />
              <Route path="mailbox" element={<MailboxComponent />} />
              <Route path="profile" element={<Profile />} />
                     
            </Routes>
          </div>

          {/* Footer */}
          <footer className="bg-slate-800 text-white text-center border-t border-zinc-400 p-4">
            <div className="text-sm lg:text-base">
              © Copyright 2022, All Rights Reserved NIT Jalandhar
            </div>
            <div className="mt-2 text-sm lg:text-base">
              Developed By{" "}
              <a href="/team" className="text-yellow-300 hover:text-yellow-400">
                Placement Portal Dev Team
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
export default RecruiterDashboards;
