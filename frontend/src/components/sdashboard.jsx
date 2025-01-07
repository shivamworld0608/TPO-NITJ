import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import {
  faHome,
  faBriefcase,
  faClipboard,
  faComments,
  faEnvelope,
  faHandsHelping,
  faShareSquare,
  faBars,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Home from './StudentDashboard/home';
import JobApplications from './StudentDashboard/jobprofile';
import Interviews from './StudentDashboard/interviews';
import GD from './StudentDashboard/gd';
import MailboxComponent from './StudentDashboard/mailbox';
import OnlineAssessment from './StudentDashboard/oa';
import SharedExperience from './StudentDashboard/shared-experience';
import Profile from './StudentDashboard/profile';
import ProfileImage from '../assets/chillguy.png';

const StudentDashboards = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { path: '/sdashboard/home', label: 'Home', icon: faHome },
    { path: '/sdashboard/job-application', label: 'Job Application', icon: faBriefcase },
    { path: '/sdashboard/oa', label: 'OA', icon: faClipboard },
    { path: '/sdashboard/interviews', label: 'Interview', icon: faComments },
    { path: '/sdashboard/gd', label: 'GD', icon: faComments },
    { path: '/sdashboard/mailbox', label: 'Mailbox', icon: faEnvelope },
    { path: '/sdashboard/request-help', label: 'Request Help', icon: faHandsHelping },
    { path: '/sdashboard/shared-experience', label: 'Shared Experience', icon: faShareSquare },
    { path: '/sdashboard/profile', label: 'Profile', icon: faShareSquare },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 flex flex-col  ${
            isOpen ? "w-60" : "w-16"
          }`}
        >
          <div className="p-4">
            <button
              onClick={toggleSidebar}
              className=" p-2 rounded text-black hover:bg-gray-600 focus:outline-none"
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
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 hover:bg-blue-50"
                      }`}
                    >
                      <FontAwesomeIcon icon={item.icon} className="mr-3" />
                      {isOpen && <span>{item.label}</span>}
                    </button>
                  </li>
                ))}

                {!isOpen && (
                  <button
                    className={`flex items-center w-full text-left px-3 py-2 rounded-lg ${
                      location.pathname === "/sdashboard/profile"
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-blue-50"
                    }`}
                    onClick={() => navigate("/sdashboard/profile")}
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-3" />
                  </button>
                )}
              </ul>
            </nav>
          </div>
          {/* Profile Section */}
          <div className="p-4">
            <button
              onClick={() => navigate("/sdashboard/profile")}
              className="flex items-center w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              {isOpen && (
                <div className="flex items-center">
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
        <main className="flex-1 bg-white p-4">
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
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboards;
