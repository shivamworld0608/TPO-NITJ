import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { RiMenuFold3Fill } from "react-icons/ri";
import { RiMenuFold4Fill } from "react-icons/ri";
import {
  faHome,
  faBriefcase,
  faClipboard,
  faComments,
  faEnvelope,
  faHandsHelping,
  faShareSquare,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./StudentDashboard/home";
import JobApplications from "./StudentDashboard/jobprofile";
import Interviews from "./StudentDashboard/interviews";
import GD from "./StudentDashboard/gd";
import MailboxComponent from "./StudentDashboard/mailbox";
import OnlineAssessment from "./StudentDashboard/oa";
import SharedExperience from "./StudentDashboard/shared-experience";
import Profile from "./StudentDashboard/profile";
import ProfileImage from "../assets/chillguy.png";
import NITJlogo from "../assets/nitj-logo.png";
import Request from "./StudentDashboard/Request";

const StudentDashboards = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(true);

  // Handle sidebar toggle based on screen size
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

  const toggleSidebar = () => setIsOpen(!isOpen);

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
    { path: "/sdashboard/home", label: "Home", icon: faHome },
    {
      path: "/sdashboard/job-application",
      label: "Job Application",
      icon: faBriefcase,
    },
    { path: "/sdashboard/oa", label: "OA", icon: faClipboard },
    { path: "/sdashboard/interviews", label: "Interview", icon: faComments },
    { path: "/sdashboard/gd", label: "GD", icon: faComments },
    { path: "/sdashboard/mailbox", label: "Mailbox", icon: faEnvelope },
    {
      path: "/sdashboard/request-help",
      label: "Request Help",
      icon: faHandsHelping,
    },
    {
      path: "/sdashboard/shared-experience",
      label: "Shared Experience",
      icon: faShareSquare,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}

      <header className="bg-white z-30 border-b border-gray-200 fixed top-0 left-0 right-0 p-4">
        {isOpen && (
          <h1 className="absolute ml-9 left-4 top-1/2 transform -translate-y-1/2 font-bold text-2xl sm:text-1xl lg:text-2xl tracking-wide w-max">
            TPO-
            <span className="bg-custom-blue text-transparent bg-clip-text">
              NITJ
            </span>
            {/* <hr className="mt-3" /> */}
          </h1>
        )}
        {!isOpen && (
          <img
            onClick={() => navigate("/sdashboard/home")}
            src={userData?.image || NITJlogo}
            alt="Profile"
            className="absolute left-8 transform -translate-x-1/2  w-9 h-9 rounded-full object-cover cursor-pointer hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
          />
        )}
        <div className={`flex items-center justify-between `}>
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded text-black focus:outline-none transition-all duration-300 ${
              isOpen ? "sm:ml-56" : "sm:ml-10"
            }`}
          >
            <div className="relative w-6 h-3">
              <div
                className={`absolute inset-0 transform transition-transform duration-300 ${
                  isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              >
                <RiMenuFold3Fill size={25} />
              </div>
              <div
                className={`absolute inset-0 transform transition-transform duration-300 ${
                  !isOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
                }`}
              >
                <RiMenuFold4Fill size={25} />
              </div>
            </div>
          </button>
          <div className="flex items-center space-x-4">
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
        </div>
      </header>

      <div className="flex flex-1 mt-16">
        {/* Sidebar */}
        <aside
          className={`fixed z-20 bg-white border-gray-200 transition-all duration-300 sm:top-0 sm:left-0 sm:bottom-0 w-full top-0 sm:h-screen ${
            isOpen ? "sm:w-60 h-full" : "sm:w-16 h-0"
          } border-r sm:border-b-0 border-b`}
        >
          <div className={` p-4  ${isOpen ? "mt-12" : "mt-12"}`}>
            <nav className="mt-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path} className="h-10 flex items-center">
                    {" "}
                    {/* Fixed height container */}
                    <button
                      onClick={() => {
                        navigate(item.path);
                        if (innerWidth < 625) setIsOpen(false);
                      }}
                      className={`flex items-center sm:w-full ${
                        isOpen ? "w-full" : "w-10" // Fixed width when closed
                      } h-full text-left px-2 rounded-lg ${
                        location.pathname === item.path
                          ? "bg-custom-blue text-white"
                          : "text-gray-600 hover:bg-blue-50"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={`min-w-[20px] ${
                          isOpen ? "mr-3" : "mx-auto mr-10"
                        }`}
                      />
                      {isOpen && <span>{item.label}</span>}
                    </button>
                  </li>
                ))}
                {!isOpen && (
                  <li className="h-9 transition-all duration-300 ease-in-out">
                    {" "}
                    {/* Consistent height for profile image */}
                    <img
                      onClick={() => navigate("/sdashboard/profile")}
                      src={userData?.image || ProfileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover cursor-pointer hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </li>
                )}
              </ul>
            </nav>
          </div>
          {/* Profile Section */}
          {isOpen && (
            <div className="p-4 mt-16">
              <button
                onClick={() => navigate("/sdashboard/profile")}
                className="flex items-center w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 border"
              >
                <img
                  src={userData?.image || ProfileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="text-gray-900 font-medium">{userData?.name}</p>
                  <p className="text-gray-500 text-sm">{userData?.email}</p>
                </div>
              </button>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isOpen ? "sm:ml-60" : "sm:ml-16"
          }`}
        >
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="job-application" element={<JobApplications />} />
              <Route path="oa" element={<OnlineAssessment />} />
              <Route path="interviews" element={<Interviews />} />
              <Route path="gd" element={<GD />} />
              <Route path="mailbox" element={<MailboxComponent />} />
              <Route path="shared-experience" element={<SharedExperience />} />
              <Route path="profile" element={<Profile />} />
              <Route path="request-help" element={<Request />} />
            </Routes>
          </div>

          {/* Footer */}
          <footer className="bg-slate-800 text-white text-center border-t border-zinc-400 p-4">
            <div className="text-sm lg:text-base">
              © Copyright 2022, All Rights Reserved NIT Jalandhar
            </div>
            <div className="mt-2 text-sm lg:text-base">
              Developed By{" "}
              <a
                href="/team"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 hover:text-yellow-400"
              >
                Placement Portal Dev Team
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboards;
