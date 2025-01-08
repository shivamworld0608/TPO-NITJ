import React, { useState, useEffect } from 'react';
import ShortlistStudents from './shortliststudent';
import AppliedStudents from './appliedstudent';

const ViewJobDetails = ({ job, onClose }) => {
  const [viewingShortlist, setViewingShortlist] = useState(null);
  const [viewingAppliedStudents, setViewingAppliedStudents] = useState(false);
  const renderHiringWorkflow = () => {
    if (!job.Hiring_Workflow || job.Hiring_Workflow.length === 0) {
      return <p className="mt-4 text-gray-500">No hiring workflow defined.</p>;
    }
    return (
      <div className="mt-4 space-y-6">
        {job.Hiring_Workflow.map((step, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">{step.step_type} Step</h3>
            <ul className="mt-2 text-gray-600">
              {Object.entries(step.details || {}).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.replace(/_/g, ' ')}:</strong> {value || 'N/A'}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => setViewingShortlist({ stepIndex: index })}
              >
                Add Shortlisted Students
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (viewingShortlist) {
    return (
      <ShortlistStudents
        jobId={job._id}
        stepIndex={viewingShortlist.stepIndex}
        onClose={() => setViewingShortlist(null)}
      />
    );
  }

  if (viewingAppliedStudents) {
    return (
      <AppliedStudents
        jobId={job._id}
        onBack={() => setViewingAppliedStudents(false)}
      />
    );
  }
 
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Job Details</h2>
      <button
          className="mt-4 mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setViewingAppliedStudents(true)}
        >
          View Applied Students
        </button>
      <p><strong>Job Role:</strong> {job.job_role}</p>
      <p><strong>Company:</strong> {job.company_name}</p>
      <p><strong>Description:</strong> {job.jobdescription}</p>

      <h3 className="text-xl font-bold mt-6">Hiring Workflow</h3>
      {renderHiringWorkflow()}

      <button
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default ViewJobDetails;
