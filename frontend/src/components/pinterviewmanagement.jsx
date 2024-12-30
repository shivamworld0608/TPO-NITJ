import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrashAlt, FaPlus, FaCheck, FaTimes } from "react-icons/fa";

const InterviewManagement = () => {
  const [interviews, setInterviews] = useState([
    { id: 1, candidate: "John Doe", job: "Software Engineer", date: "2024-12-15", status: "Scheduled" },
    { id: 2, candidate: "Jane Smith", job: "Data Analyst", date: "2024-12-17", status: "Completed" },
    { id: 3, candidate: "Alice Johnson", job: "Product Manager", date: "2024-12-20", status: "Scheduled" },
    { id: 4, candidate: "Bob Brown", job: "Frontend Developer", date: "2024-12-22", status: "Cancelled" },
  ]);

  const [newInterview, setNewInterview] = useState({ candidate: "", job: "", date: "", status: "Scheduled" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInterviews, setFilteredInterviews] = useState(interviews);
  const [editInterview, setEditInterview] = useState(null); // For editing an interview
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // For delete confirmation
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInterview({ ...newInterview, [name]: value });
  };

  const handleAddInterview = () => {
    setInterviews([...interviews, { id: interviews.length + 1, ...newInterview }]);
    setNewInterview({ candidate: "", job: "", date: "", status: "Scheduled" });
    setFilteredInterviews([...interviews, { id: interviews.length + 1, ...newInterview }]);
  };

  const handleEditInterview = (interview) => {
    setEditInterview(interview);
    setNewInterview(interview); // Pre-populate form with interview details for editing
  };

  const handleSaveEdit = () => {
    const updatedInterviews = interviews.map((interview) =>
      interview.id === editInterview.id ? { ...interview, ...newInterview } : interview
    );
    setInterviews(updatedInterviews);
    setFilteredInterviews(updatedInterviews);
    setEditInterview(null);
    setNewInterview({ candidate: "", job: "", date: "", status: "Scheduled" });
  };

  const handleDeleteInterview = (interview) => {
    setInterviews(interviews.filter((item) => item.id !== interview.id));
    setFilteredInterviews(interviews.filter((item) => item.id !== interview.id));
    setShowDeleteConfirm(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setFilteredInterviews(
      interviews.filter(
        (interview) =>
          interview.candidate.toLowerCase().includes(e.target.value.toLowerCase()) ||
          interview.job.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleStatusChange = (id, status) => {
    const updatedInterviews = interviews.map((interview) =>
      interview.id === id ? { ...interview, status } : interview
    );
    setInterviews(updatedInterviews);
    setFilteredInterviews(updatedInterviews);
  };

  // Pagination settings
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage);
  const paginatedInterviews = filteredInterviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Interview Management</h2>

      {/* Search Bar */}
      <div className="mb-6 flex items-center space-x-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by candidate name or job title"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Add/Edit Interview Form */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{editInterview ? "Edit Interview" : "Schedule New Interview"}</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            name="candidate"
            placeholder="Candidate Name"
            value={newInterview.candidate}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="job"
            placeholder="Job Title"
            value={newInterview.job}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="date"
            value={newInterview.date}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <select
            name="status"
            value={newInterview.status}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <button
          onClick={editInterview ? handleSaveEdit : handleAddInterview}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editInterview ? "Save Changes" : "Schedule Interview"}
        </button>
      </div>

      {/* Interview List */}
      <h3 className="text-lg font-semibold mb-4">Scheduled Interviews</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Candidate Name</th>
            <th className="px-4 py-2 border-b">Job Title</th>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedInterviews.map((interview) => (
            <tr key={interview.id} className="border-b">
              <td className="px-4 py-2">{interview.candidate}</td>
              <td className="px-4 py-2">{interview.job}</td>
              <td className="px-4 py-2">{interview.date}</td>
              <td className="px-4 py-2">{interview.status}</td>
              <td className="px-4 py-2 flex space-x-4">
                <button
                  onClick={() => handleEditInterview(interview)}
                  className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(interview)}
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() => handleStatusChange(interview.id, "Completed")}
                  className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleStatusChange(interview.id, "Cancelled")}
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
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this interview?</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDeleteInterview(showDeleteConfirm)}
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

export default InterviewManagement;
