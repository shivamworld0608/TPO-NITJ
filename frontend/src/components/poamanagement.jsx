import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa";

const OAManagement = () => {
  const [oaList, setOaList] = useState([
    { id: 1, studentName: "John Doe", company: "XYZ Corp", status: "Accepted" },
    { id: 2, studentName: "Jane Smith", company: "ABC Ltd.", status: "Pending" },
    { id: 3, studentName: "Jim Brown", company: "LMN Inc.", status: "Declined" },
    { id: 4, studentName: "Emily White", company: "QRS Ltd.", status: "Pending" },
    { id: 5, studentName: "Michael Green", company: "TUV Inc.", status: "Accepted" },
  ]);

  const [newOA, setNewOA] = useState({
    studentName: "",
    company: "",
    status: "Pending",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOAs, setFilteredOAs] = useState(oaList);
  const [editOA, setEditOA] = useState(null); // For editing an OA
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // For confirming delete action

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOA({ ...newOA, [name]: value });
  };

  const handleAddOA = () => {
    setOaList([
      ...oaList,
      { id: oaList.length + 1, ...newOA },
    ]);
    setNewOA({ studentName: "", company: "", status: "Pending" });
    setFilteredOAs([...oaList, { id: oaList.length + 1, ...newOA }]);
  };

  const handleEditOA = (oa) => {
    setEditOA(oa);
    setNewOA(oa); // Pre-populate form with OA details for editing
  };

  const handleSaveEdit = () => {
    const updatedOAs = oaList.map((oa) =>
      oa.id === editOA.id ? { ...oa, ...newOA } : oa
    );
    setOaList(updatedOAs);
    setFilteredOAs(updatedOAs);
    setEditOA(null);
    setNewOA({ studentName: "", company: "", status: "Pending" });
  };

  const handleDeleteOA = (oa) => {
    setOaList(oaList.filter((item) => item.id !== oa.id));
    setFilteredOAs(oaList.filter((item) => item.id !== oa.id));
    setShowDeleteConfirm(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setFilteredOAs(
      oaList.filter((oa) =>
        oa.studentName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleStatusChange = (id, status) => {
    const updatedOAs = oaList.map((oa) =>
      oa.id === id ? { ...oa, status } : oa
    );
    setOaList(updatedOAs);
    setFilteredOAs(updatedOAs);
  };

  // Pagination settings
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredOAs.length / itemsPerPage);
  const paginatedOAs = filteredOAs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Offer Acceptance Management</h2>

      {/* Search Bar */}
      <div className="mb-6 flex items-center space-x-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by student name"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Add/Edit OA Form */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{editOA ? "Edit OA" : "Add New OA"}</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={newOA.studentName}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={newOA.company}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <select
            name="status"
            value={newOA.status}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
        <button
          onClick={editOA ? handleSaveEdit : handleAddOA}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editOA ? "Save Changes" : "Add OA"}
        </button>
      </div>

      {/* OA List */}
      <h3 className="text-lg font-semibold mb-4">Offer Acceptances</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Student Name</th>
            <th className="px-4 py-2 border-b">Company</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOAs.map((oa) => (
            <tr key={oa.id} className="border-b">
              <td className="px-4 py-2">{oa.studentName}</td>
              <td className="px-4 py-2">{oa.company}</td>
              <td className="px-4 py-2">{oa.status}</td>
              <td className="px-4 py-2 flex space-x-4">
                <button
                  onClick={() => handleEditOA(oa)}
                  className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(oa)}
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() => handleStatusChange(oa.id, "Accepted")}
                  className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleStatusChange(oa.id, "Declined")}
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
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this OA?</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDeleteOA(showDeleteConfirm)}
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

export default OAManagement;
