import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faClipboard, faComments, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const StudentDashboards = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white flex-shrink-0 p-4">
          <h2 className="text-xl font-bold mb-4">Navigation</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigate('/sdashboard/home')} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/sdashboard/job-application')} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                  Job Application
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/sdashboard/oa')} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faClipboard} className="mr-2" />
                  OA
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/sdashboard/interviews')} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faComments} className="mr-2" />
                  Interviews
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/sdashboard/mailbox')} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  Mail-Box
                </button>
              </li>
            </ul>
          </nav>
        </aside>        
      </div>
    </div>
  );
};

export default StudentDashboards;