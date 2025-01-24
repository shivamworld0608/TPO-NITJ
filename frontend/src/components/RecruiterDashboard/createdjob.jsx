import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import CreateJob from './createjob';
import ViewJobDetails from './ViewJob';

const CreatedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [viewingJobDetails, setViewingJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/recruiter/getjobs`,
          { withCredentials: true }
        );
        setJobs(response.data.jobs||[]);
      } catch (error) {
        setError('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const deleteJob = async (jobId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/deletejob/${jobId}`,
          { withCredentials: true }
        );
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        Swal.fire('Deleted!', 'The job has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting job:', error.message);
        Swal.fire('Failed!', 'Failed to delete the job. Please try again.', 'error');
      }
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (viewingJobDetails) {
    return (
      <div className="container mx-auto px-4 py-6">
        <ViewJobDetails
          job={viewingJobDetails}
          onClose={() => setViewingJobDetails(null)}
        />
      </div>
    );
  }

  if (isCreatingJob) {
    return (
      <div className="container mx-auto px-4 py-6">
        <CreateJob
          onJobCreated={(newJob) => {
            setJobs((prevJobs) => [...prevJobs, newJob]);
            setIsCreatingJob(false);
          }}
          onCancel={() => setIsCreatingJob(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 ml-0 transition-all duration-300">
  {/* Header Section */}
  <div className="p-6">
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <h1 className="text-4xl font-bold text-custom-blue mb-4 sm:mb-0">Your Created Jobs</h1>
      <button
        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        onClick={() => setIsCreatingJob(true)}
      >
        Create Job
      </button>
    </div>
  </div>

  {/* Job List Section */}
  <div className="p-6">
    {jobs.length === 0 ? (
      <div className="text-center text-gray-600 py-10">
        <p className="text-lg">No jobs found. Please create a job first.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:scale-105 transform"
          >
            {/* Header Section */}
            <div className="flex items-center gap-4 mb-6">
              {/* Company Logo */}
              <img
                src={job.company_logo || "default-logo.png"}
                alt={job.company_name}
                className="w-16 h-16 rounded-full object-cover border border-gray-300 shadow-sm"
              />
              {/* Job Title and Company Name */}
              <div>
                <h2 className="font-semibold text-lg text-gray-900 truncate">{job.job_role}</h2>
                <p className="text-sm text-gray-500">{job.company_name}</p>
              </div>
            </div>

            {/* Job Details */}
            <div className="text-gray-600 text-sm space-y-2 mb-4">
              <p>
                <strong>Location:</strong> {job.joblocation || "Not specified"}
              </p>
              <p>
                <strong>Salary:</strong> {job.job_salary.ctc || "Competitive"} LPA
              </p>
              <p>
                <strong>Class:</strong> {job.job_class || "Not specified"}
              </p>
              <p>
                <strong>Posted on:</strong> {new Date(job.createdAt).toLocaleDateString() || "N/A"}
              </p>
              <p>
                <strong>Application Deadline:</strong> {new Date(job.deadline).toLocaleDateString() || "N/A"}
              </p>
            </div>

            {/* Job Tags */}
            <div className="flex gap-3 flex-wrap mb-6">
              <span className="text-xs bg-blue-100 text-blue-800 py-1 px-4 rounded-full font-medium">
                {job.job_type || "Full-time"}
              </span>
              {job.isRemote && (
                <span className="text-xs bg-green-100 text-green-800 py-1 px-4 rounded-full font-medium">
                  Remote
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <button
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-transform duration-200 transform hover:scale-105 flex items-center gap-2"
                onClick={() => deleteJob(job._id)}
              >
                <i className="fas fa-trash-alt"></i> Delete
              </button>
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-transform duration-200 transform hover:scale-105 flex items-center gap-2"
                onClick={() => setViewingJobDetails(job)}
              >
                <i className="fas fa-eye"></i> View Job Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  );
};

export default CreatedJobs;
