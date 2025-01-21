import React from 'react';

const JobCard = ({ job_id, jobtype, jobtitle, company, deadline, onShowDetails }) => (
  <div className="w-full max-w-lg mx-auto border border-custom-blue bg-white rounded-lg shadow-lg p-6 transition-all transform duration-300 hover:shadow-2xl hover:scale-105">
      <h2 className="text-2xl font-semibold text-gray-800">{company}</h2>
      <p className="text-lg text-gray-600 mt-2">{jobtitle}</p>
      <div className="mt-4 text-sm text-gray-500">
          <p><strong>Job Type:</strong> {jobtype}</p>
          <p><strong>Job ID:</strong> {job_id}</p>
          <p><strong>Deadline:</strong> <span>
              {deadline
                ? new Date(deadline).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Not Provided"}
            </span></p>
      </div>
      <button
          className="mt-4 w-full bg-custom-blue text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={onShowDetails}
      >
          Show Details
      </button>
  </div>
);

export default JobCard;