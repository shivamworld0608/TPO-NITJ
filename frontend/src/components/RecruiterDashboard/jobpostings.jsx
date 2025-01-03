import React from 'react';
import JAFButtons from './forms';

const JobOpenings = () => {
  return (
    <div className="p-6">
      {/* JAF Buttons Section */}
      <div className="mb-8">
        <JAFButtons />
      </div>

      {/* Hiring Status Section */}
      <div className="bg-white rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Hiring Status</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <img 
              src="/no-jobs.svg" 
              alt="No jobs posted" 
              className="w-48 h-48 mx-auto mb-4"
            />
            <p className="text-gray-500">Oops, No jobs posted yet!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOpenings;