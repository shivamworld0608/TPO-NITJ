import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { RiMenuFold3Fill, RiMenuFold4Fill } from "react-icons/ri";
import {
  faBriefcase,
  faEnvelope,
  faHandsHelping,
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
      <header className="bg-white z-30 border-b border-gray-200 fixed top-0 left-0 right-0 p-4">
        {isOpen && (
          <h1 className="absolute ml-9 left-4 top-1/2 transform -translate-y-1/2 font-bold text-2xl sm:text-1xl lg:text-2xl tracking-wide w-max">
            TPO-
            <span className="bg-custom-blue text-transparent bg-clip-text">
              NITJ
            </span>
          </h1>
        )}
        <div className="flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded text-black focus:outline-none transition-all duration-300 ${
              isOpen ? "sm:ml-56" : "sm:ml-0"
            }`}
          >
            <div className="relative w-8 h-4">
              <div
                className={`absolute inset-0 transform transition-transform duration-300 ${
                  isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              >
                <RiMenuFold3Fill size={30} />
              </div>
              <div
                className={`absolute inset-0 transform transition-transform duration-300 ${
                  !isOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
                }`}
              >
                <RiMenuFold4Fill size={30} />
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
  className={`fixed z-20 bg-white border-gray-200 transition-all duration-300 sm:top-0 sm:left-0 sm:bottom-0 ${
    isOpen ? "w-64" : "w-16"
  } border-r sm:border-b-0 border-b shadow-lg flex flex-col`}
>
  {/* Menu Items */}
  <div className={`p-3 ${isOpen ? "mt-12" : "mt-12"} flex-grow`}>
    <nav className="mt-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path} className="h-10 flex items-center justify-center">
            <button
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth < 640) setIsOpen(false);
              }}
              className={`flex items-center ${
                isOpen ? "w-full justify-start" : "w-10"
              } h-10 text-left rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-custom-blue text-white hover:bg-custom-blue-dark"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              } ${!isOpen && "justify-center"}`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={isOpen ? "ml-3" : ""}
                style={{ fontSize: isOpen ? "1rem" : "1.25rem" }}
              />
              {isOpen && (
                <span className="text-sm font-medium ml-3">{item.label}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </div>

  {/* Profile Section */}
  <div className="border-t border-gray-200 p-4 mt-auto">
    {!isOpen ? (
      <button
        onClick={() => navigate("/rdashboard/profile")}
        className="w-10 h-10 flex items-center justify-start rounded-lg hover:bg-blue-50 transition-colors duration-200"
      >
        <img
          src={userData?.image || ProfileImage}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      </button>
    ) : (
      <button
        onClick={() => navigate("/rdashboard/profile")}
        className="flex items-center w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
      >
        <div className="flex items-center">
          <img
            src={userData?.image || ProfileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-gray-900 font-medium">{userData?.name}</p>
            <p className="text-gray-500 text-sm">{userData?.email}</p>
          </div>
        </div>
      </button>
    )}
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