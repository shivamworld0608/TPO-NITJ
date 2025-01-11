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
        setJobs(response.data.jobs);
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
  <div className="p-6 bg-white border-b border-gray-200">
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Your Created Jobs</h1>
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
            className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            {/* Job Role */}
            <h2 className="font-bold text-xl text-gray-800 mb-2">{job.job_role}</h2>

            {/* Company Name */}
            <p className="text-gray-600 mb-2">{job.company_name}</p>

            {/* Deadline */}
            <p className="text-sm text-gray-500 mb-4">
              Deadline: {new Date(job.deadline).toLocaleDateString()}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
              <button
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => deleteJob(job._id)}
              >
                Delete
              </button>
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setViewingJobDetails(job)}
              >
                View Applications
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
