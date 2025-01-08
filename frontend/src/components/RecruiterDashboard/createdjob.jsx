import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import EditJobModal from './editcreatedjob';
import CreateJob from './createjob';
import ViewJobDetails from './ViewJob';

const CreatedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
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

  const editJob = (job) => {
    setEditingJob(job);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (viewingJobDetails) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-center text-3xl font-semibold mb-6">Job Details</h1>
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
        <h1 className="text-center text-3xl font-semibold mb-6">Create a Job</h1>
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
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Your Created Jobs</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsCreatingJob(true)}
        >
          Create Job
        </button>
      </div>
      {jobs.length === 0 ? (
        <div>No jobs found. Please create a job first.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="relative bg-white p-6 rounded-lg shadow-md">
              <h2 className="font-bold text-xl">{job.job_role}</h2>
              <p className="text-gray-500">{job.company_name}</p>
              <p className="text-sm text-gray-400">
                Deadline: {new Date(job.deadline).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-between flex-wrap gap-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => editJob(job)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-purple-500 text-white px-4 py-2 rounded"
                  onClick={() => setViewingJobDetails(job)}
                >
                  View Job Application
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {editingJob && (
        <EditJobModal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onJobUpdated={(updatedJob) =>
            setJobs((prevJobs) =>
              prevJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
            )
          }
        />
      )}
    </div>
  );
};

export default CreatedJobs;
