import React, { useState, useEffect } from 'react';
import AppliedStudents from './appliedstudent';
import CreateApplicationform from './createapplicationform';
import ViewApplicationForm from './viewapplicationform';
import EditApplicationForm from './editapplicationform';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';  // Import SweetAlert2

const ViewJobDetails = ({ job, onClose }) => {
  const [viewingAppliedStudents, setViewingAppliedStudents] = useState(false);
  const [applicationFormexist, setApplicationFormexist] = useState(null); // State to check if application form exists
  const [selectedJobForForm, setSelectedJobForForm] = useState(null);
  const [viewingApplicationForm, setViewingApplicationForm] = useState(false);
  const [editingApplicationForm, setEditingApplicationForm] = useState(false);

  // useEffect to check if application form template exists for the job
  useEffect(() => {
    const checkApplicationFormExistence = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/api/check-aft-exist/${job._id}`,
          { withCredentials: true }
        );
        setApplicationFormexist(response.data.exist); // Set the state based on the backend response
      } catch (error) {
        console.error("Error checking application form existence:", error);
        setApplicationFormexist(false); // Set to false in case of error
      }
    };

    if (job?._id) {
      checkApplicationFormExistence(); // Call the function if job ID exists
    }
  }, [job]);

  const handleDeleteForm = () => {
    // Show SweetAlert confirmation before deleting
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the application form.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Proceed with deletion if confirmed
          await axios.put(
            `${import.meta.env.REACT_APP_BASE_URL}/api/delete-form-template/${job._id}`,
            {},
            { withCredentials: true }
          );
          console.log('Application form deleted successfully.');
          setApplicationFormexist(false);
          toast.success('Application form deleted successfully.');
        } catch (error) {
          console.error('Error deleting application form:', error);
          toast.error('Failed to delete application form.');
        }
      }
    });
  };

  if (viewingAppliedStudents) {
    return (
      <AppliedStudents
        jobId={job._id}
        onBack={() => setViewingAppliedStudents(false)}
      />
    );
  }

  if (selectedJobForForm) {
    return (
      <div className="container mx-auto px-4 py-6">
        <CreateApplicationform
          jobId={selectedJobForForm}
          onClose={() => setSelectedJobForForm(null)}
          onSubmit={() => setApplicationFormexist(true)}
        />
      </div>
    );
  }

  if (viewingApplicationForm) {
    return (
      <div className="container mx-auto px-4 py-6">
        <ViewApplicationForm
          jobId={job._id}
          onHide={() => setViewingApplicationForm(false)}
        />
      </div>
    );
  }

  if (editingApplicationForm) {
    return (
      <div className="container mx-auto px-4 py-6">
        <EditApplicationForm
          jobId={job._id}
          onClose={() => setEditingApplicationForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Job Details</h2>
      <p><strong>Job Role:</strong> {job.job_role}</p>
      <p><strong>Company:</strong> {job.company_name}</p>
      <p><strong>Description:</strong> {job.jobdescription}</p>

      {job.Approved_Status && (
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setViewingAppliedStudents(true)}
        >
          View Applied Students
        </button>
      )}

      {applicationFormexist && (
        <div className="mt-4 flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={()=>{setViewingApplicationForm(true)}}
          >
            View Application Form
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={() => setEditingApplicationForm(true)}
          >
            Edit Application Form
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDeleteForm}
          >
            Delete Application Form
          </button>
        </div>
      )}

      {!applicationFormexist && job.Approved_Status  && (
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setSelectedJobForForm(job._id)}
        >
          Create Application Form
        </button>
      )}

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
