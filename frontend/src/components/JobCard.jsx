import React from 'react';
import {useNavigate} from 'react-router-dom';


export default function JobCard(props) {
  const navigate = useNavigate();
  const {jobid,jobtype,jobtitle,company,deadline,jpid}=props;
  const handleClick=() =>{
      navigate('/jobdetail');
  };
  
  return (
    <div className="max-w-sm rounded-lg border border-custom-blue shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800">{company}</h2>
      <p className="text-lg text-gray-600 mt-2">{jobtitle}</p>
      <div className="mt-4">
        <div className="text-sm text-gray-500 flex justify-between">
          <span className="font-medium text-gray-800">Job Type:</span>
          <span className="font-medium text-gray-500">{jobtype}</span>
        </div>
        <div className="text-sm text-gray-500 flex justify-between mt-2">
          <span className="font-medium text-gray-800">Job ID:</span>
          <span className="font-medium text-gray-500">{jobid}</span>
        </div>
        <div className="text-sm text-gray-500 flex justify-between mt-2">
          <span className="font-medium text-gray-800">Deadline:</span>
          <span className="font-medium text-gray-500">{deadline}</span>
        </div>
        <div className="text-sm flex justify-between mt-2">
          <button
            className="border-2 border-custom-blue text-white bg-custom-blue rounded-md p-1 hover:bg-gray-700 hover:border-gray-700"
            onClick={handleClick}
          >
            More details
          </button>
        </div>

      </div>
    </div>
  );
}
