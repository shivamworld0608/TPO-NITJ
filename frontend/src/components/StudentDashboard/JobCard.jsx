import React from 'react';

const JobCard = ({ job_id, jobtype, jobtitle, company, deadline, onShowDetails }) => (
  <div className="w-full max-w-lg mx-auto border border-custom-blue bg-white rounded-lg shadow-lg p-6 transition-all transform duration-300 hover:shadow-2xl hover:scale-105">
      <h2 className="text-2xl font-semibold text-gray-800">{company}</h2>
      <p className="text-lg text-gray-600 mt-2">{jobtitle}</p>
      <div className="mt-4 space-y-2 text-sm">
      <p className="flex items-center text-[#0F6BA8]">
               <span className="mr-2 text-[#0369A0]">
             <svg
               className="w-4 h-4"
               fill="currentColor"
               viewBox="0 0 24 24"
            >
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
               <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
             </svg>
           </span>
           <strong>Job Type:</strong>  {jobtype}
          </p>
          <p className="flex items-center text-[#0F6BA8]">
          <span className="mr-2 text-[#0369A0]">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
            </svg>
          </span>
          <strong>Job ID:</strong>  {job_id}
        </p>
          <p className="flex items-center text-[#0F6BA8]">
          <span className="mr-2 text-[#0369A0]">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10z" />
            </svg>
          </span>
          <strong>Deadline:</strong> 
          <span className="ml-1 text-[#0369A0] font-medium">
            {deadline
              ? new Date(deadline).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Not Provided"}
          </span>
        </p>
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
