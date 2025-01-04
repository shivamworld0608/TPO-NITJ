import React, { useState } from 'react';
import AppliedStudents from './appliedstudent';

const ViewJobDetails = ({ job, onClose }) => {
  const [viewingAppliedStudents, setViewingAppliedStudents] = useState(false);

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
      <p><strong>Job Role:</strong> {job.job_role}</p>
      <p><strong>Company:</strong> {job.company_name}</p>
      <p><strong>Description:</strong> {job.jobdescription}</p>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => setViewingAppliedStudents(true)}
      >
        View Applied Students
      </button>
      <button
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default ViewJobDetails;
