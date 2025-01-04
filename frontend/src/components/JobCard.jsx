import React from 'react';
import Jobdetail from '../components/Jobdetail'; // Assuming JobDetail is your component for job details
import { FaArrowLeft } from "react-icons/fa";

export default function JobCard(props) {
  const { 
    job_id, 
    jobtype, 
    jobtitle, 
    company, 
    deadline, 
    jpid, 
    isVisible, 
    onHideDetails, 
    onShowDetails 
  } = props;

  return (
    <div className="container mx-auto px-4 py-6">
      {isVisible ? (
        // Detailed View
        <div className="relative bg-white rounded-lg shadow-xl p-6 transition-all transform duration-300 hover:shadow-2xl">
          <button
            className="absolute top-4 left-4 text-custom-blue text-2xl hover:text-blue-600 focus:outline-none"
            onClick={onHideDetails} // Close the details view
          >
            <FaArrowLeft />
          </button>

          {/* JobDetail with jobid and jpid passed */}
          <Jobdetail job_id={job_id} jpid={jpid} />
        </div>
      ) : (
        // Overview View
        <div className="w-full max-w-lg mx-auto border border-custom-blue bg-white rounded-lg shadow-lg p-6 transition-all transform duration-300 hover:shadow-2xl hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{company}</h2>
          <p className="text-lg text-gray-600 mt-2">{jobtitle}</p>
          <div className="mt-4 space-y-4">
            <div className="text-sm text-gray-500 flex items-center">
              <span className="font-medium text-gray-800 mr-2">Job Type:</span>
              <span className="font-medium text-gray-500">{jobtype}</span>
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <span className="font-medium text-gray-800 mr-2">Job ID:</span>
              <span className="font-medium text-gray-500">{job_id}</span>
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <span className="font-medium text-gray-800 mr-2">Deadline:</span>
              <span className="font-medium text-gray-500">{deadline}</span>
            </div>
          </div>
          <button
            className="mt-6 w-full bg-custom-blue text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none"
            onClick={onShowDetails} // Show the details
          >
            Show Details
          </button>
        </div>
      )}
    </div>
  );
}
