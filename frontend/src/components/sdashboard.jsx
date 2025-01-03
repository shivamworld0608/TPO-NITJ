import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";
import {
  faHome,
  faBriefcase,
  faClipboard,
  faComments,
  faEnvelope,
  faHandsHelping,
  faShareSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Home from './StudentDashboard/home';
import JobApplications from './StudentDashboard/jobprofile';
import Interviews from './StudentDashboard/interviews';
import MailboxComponent from './StudentDashboard/mailbox';
import OnlineAssessment from './StudentDashboard/oa';
import SharedExperience from './StudentDashboard/shared-experience';
import Profile from './StudentDashboard/profile';
import ProfileImage from '../assets/chillguy.png';


const StudentDashboards = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {userData } = useSelector((state) => state.auth);
  const menuItems = [
    { path: '/sdashboard/home', label: 'Home', icon: faHome },
    { path: '/sdashboard/job-application', label: 'Job Application', icon: faBriefcase },
    { path: '/sdashboard/oa', label: 'OA', icon: faClipboard },
    { path: '/sdashboard/interviews', label: 'Interview', icon: faComments },
    { path: '/sdashboard/mailbox', label: 'Mailbox', icon: faEnvelope },
    { path: '/sdashboard/request-help', label: 'Request Help', icon: faHandsHelping },
    { path: '/sdashboard/shared-experience', label: 'Shared Experience', icon: faShareSquare },
    { path: '/sdashboard/profile', label: 'Profile', icon: faShareSquare },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col justify-between">
          <div className="p-4">
            <h2 className="text-xl font-bold text-custom-blue mb-6">Placement Portal NITJ</h2>
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg ${
                        location.pathname === item.path ? 'bg-custom-blue text-white' : 'text-gray-600 hover:bg-blue-50'
                      }`}
                    >
                      <FontAwesomeIcon icon={item.icon} className="mr-3" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* Profile Section */}
          <div className="p-4">
            <button
              onClick={() => navigate('/sdashboard/profile')}
              className="flex items-center w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              <img
                src={userData.image || ProfileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-gray-900 font-medium">{userData.name}</p>
                <p className="text-gray-500 text-sm">{userData.email}</p>
              </div>
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