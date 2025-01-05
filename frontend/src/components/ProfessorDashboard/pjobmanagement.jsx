import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ViewJobDetails from "./ViewJob"; // Import JobDetails component

const JobProfilesonp = () => {
  const [jobProfiles, setJobProfiles] = useState({ approved: [], notApproved: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null); // State to track the selected job

  useEffect(() => {
    const fetchJobProfiles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/professor/getjobs`,
          { withCredentials: true }
        );
        setJobProfiles(response.data);
        console.log("data is", response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch job profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobProfiles();
  }, []);

  const handleApprove = async (jobId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/approvejob/${jobId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Approved!", "The job has been approved.", "success");
        setJobProfiles((prev) => ({
          ...prev,
          notApproved: prev.notApproved.filter((job) => job._id !== jobId),
          approved: [...prev.approved, prev.notApproved.find((job) => job._id === jobId)],
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to approve the job.", "error");
      }
    }
  };

  const handleReject = async (jobId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/rejectjob/${jobId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Rejected!", "The job has been rejected.", "success");
        setJobProfiles((prev) => ({
          ...prev,
          notApproved: prev.notApproved.filter((job) => job._id !== jobId),
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to reject the job.", "error");
      }
    }
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job); // Set the selected job when button is clicked
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;

  const JobCard = ({ job, showActions }) => (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <img
        src={job.company_logo}
        alt={`${job.company_name} logo`}
        className="w-24 h-24 mx-auto mb-4 object-contain"
      />
      <h3 className="text-lg font-semibold text-center">{job.company_name}</h3>
      <p className="text-sm"><strong>Job ID:</strong> {job.job_id}</p>
      <p className="text-sm"><strong>Role:</strong> {job.role}</p>
      <p className="text-sm"><strong>Salary:</strong> {job.salary}</p>
      <p className="text-sm"><strong>Location:</strong> {job.location}</p>
      <p className="text-sm"><strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
      {showActions && (
        <div className="mt-4 flex justify-around">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => handleApprove(job._id)}
          >
            Approve
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => handleReject(job._id)}
          >
            Reject
          </button>
        </div>
      )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
            onClick={() => handleViewDetails(job)} // Show details when clicked
          >
            View Details
          </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">

      {selectedJob && <ViewJobDetails onClose={() => setSelectedJob(null)} job={selectedJob} />} {/* Render JobDetails when a job is selected */}

      {!selectedJob && (
          <>
          <h1 className="text-2xl font-bold text-center mb-8">Job Profiles</h1>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Approved</h2>
            {jobProfiles.approved.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobProfiles.approved.map((job) => (
                  <JobCard key={job._id} job={job} showActions={false} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No approved job profiles.</p>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Not Approved</h2>
            {jobProfiles.notApproved.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobProfiles.notApproved.map((job) => (
                  <JobCard key={job._id} job={job} showActions={true} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No not approved job profiles.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default JobProfilesonp;
