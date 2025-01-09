import React, { useState } from 'react';
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
      <div className="mt-8 space-y-8">
        {job.Hiring_Workflow.map((step, index) => (
          <div
            key={index}
            className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold text-blue-800 mb-6">
              {step.step_type} Step
            </h3>
            <ul className="space-y-4 text-gray-700">
              {Object.entries(step.details || {}).map(([key, value]) => (
                <li key={key} className="flex items-center">
                  <strong className="w-1/3 text-gray-800 capitalize">
                    {key.replace(/_/g, ' ')}:
                  </strong>
                  <span className="flex-1">{value || 'N/A'}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex space-x-6">
              <button
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
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
    <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-blue-800">Job Details</h2>
        <button
          className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-2xl hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      {/* Job Details */}
      <div className="space-y-6 text-gray-700">
        <p>
          <strong className="text-blue-800">Job Role:</strong> {job.job_role}
        </p>
        <p>
          <strong className="text-blue-800">Company:</strong> {job.company_name}
        </p>
        <p>
          <strong className="text-blue-800">Description:</strong>{' '}
          {job.jobdescription}
        </p>
      </div>

      {/* View Applied Students Button */}
      <button
        className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        onClick={() => setViewingAppliedStudents(true)}
      >
        View Applied Students
      </button>

      {/* Hiring Workflow Section */}
      <h3 className="text-3xl font-bold text-blue-800 mt-10 mb-8">
        Hiring Workflow
      </h3>
      {renderHiringWorkflow()}
    </div>
  );
};

export default ViewJobDetails;