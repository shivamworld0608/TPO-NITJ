import React from 'react';
import { Clock, Briefcase, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ 
  job_id, 
  jobtype, 
  jobtitle, 
  company, 
  deadline,
  jpid, 
}) => {
  // Format deadline with more robust date handling
  const formatDeadline = (deadlineDate) => {
    if (!deadlineDate) return 'Not Specified';
    
    try {
      const date = new Date(deadlineDate);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const navigate = useNavigate();
   const handleClick = () => {
    navigate(`${jpid}`);
  };

  return (
    <div className="w-full max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg">
      <div className="p-4">
        {/* Company and Job Title */}
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-900 truncate">{company}</h2>
          <h3 className="text-lg text-gray-600 mt-1 truncate font-semibold">{jobtitle}</h3>
        </div>

        {/* Job Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-700 text-sm">
            <Briefcase className="mr-2 text-custom-blue" size={16} />
            <span className="font-medium mr-1">Type:</span>
            <span className="text-gray-600">{jobtype}</span>
          </div>

          <div className="flex items-center text-gray-700 text-sm">
            <Tag className="mr-2 text-custom-blue" size={16} />
            <span className="font-medium mr-1">ID:</span>
            <span className="text-gray-600">{job_id}</span>
          </div>

          <div className="flex items-center text-gray-700 text-sm">
            <Clock className="mr-2 text-custom-blue" size={16} />
            <span className="font-medium mr-1">Deadline:</span>
            <span className="text-gray-600">
              {formatDeadline(deadline)}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleClick}
          className="w-full bg-custom-blue text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;