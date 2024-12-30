import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrashAlt, FaPlus, FaCheck, FaTimes } from "react-icons/fa";

const JobManagement = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Software Engineer", company: "XYZ Corp", status: "Active" },
    { id: 2, title: "Data Analyst", company: "ABC Ltd.", status: "Closed" },
    { id: 3, title: "Product Manager", company: "LMN Inc.", status: "Active" },
    { id: 4, title: "Frontend Developer", company: "QRS Ltd.", status: "Closed" },
  ]);
  
  const [newJob, setNewJob] = useState({ title: "", company: "", status: "Active" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [editJob, setEditJob] = useState(null); // For editing a job
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // For delete confirmation
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleAddJob = () => {
    setJobs([...jobs, { id: jobs.length + 1, ...newJob }]);
    setNewJob({ title: "", company: "", status: "Active" });
    setFilteredJobs([...jobs, { id: jobs.length + 1, ...newJob }]);
  };

  const handleEditJob = (job) => {
    setEditJob(job);
    setNewJob(job); // Pre-populate form with job details for editing
  };

  const handleSaveEdit = () => {
    const updatedJobs = jobs.map((job) =>
      job.id === editJob.id ? { ...job, ...newJob } : job
    );
    setJobs(updatedJobs);
    setFilteredJobs(updatedJobs);
    setEditJob(null);
    setNewJob({ title: "", company: "", status: "Active" });
  };

  const handleDeleteJob = (job) => {
    setJobs(jobs.filter((item) => item.id !== job.id));
    setFilteredJobs(jobs.filter((item) => item.id !== job.id));
    setShowDeleteConfirm(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setFilteredJobs(
      jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          job.company.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleStatusChange = (id, status) => {
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, status } : job
    );
    setJobs(updatedJobs);
    setFilteredJobs(updatedJobs);
  };

  // Pagination settings
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Job Management</h2>

      {/* Search Bar */}
      <div className="mb-6 flex items-center space-x-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by job title or company"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Add/Edit Job Form */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{editJob ? "Edit Job" : "Add New Job"}</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={newJob.title}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={newJob.company}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <select
            name="status"
            value={newJob.status}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button
          onClick={editJob ? handleSaveEdit : handleAddJob}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editJob ? "Save Changes" : "Add Job"}
        </button>
      </div>

      {/* Job List */}
      <h3 className="text-lg font-semibold mb-4">Job Listings</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Job Title</th>
            <th className="px-4 py-2 border-b">Company</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedJobs.map((job) => (
            <tr key={job.id} className="border-b">
              <td className="px-4 py-2">{job.title}</td>
              <td className="px-4 py-2">{job.company}</td>
              <td className="px-4 py-2">{job.status}</td>
              <td className="px-4 py-2 flex space-x-4">
                <button
                  onClick={() => handleEditJob(job)}
                  className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(job)}
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() => handleStatusChange(job.id, "Active")}
                  className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleStatusChange(job.id, "Closed")}
                  className="px-2 py-1 text-white bg-gray-500 rounded hover:bg-gray-600"
                >
                  <FaTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Prev
        </button>
        <span className="self-center text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this job?</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDeleteJob(showDeleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobManagement;
