import React, { useState } from "react";
import { FaCheck, FaTimes, FaPlus, FaSearch } from "react-icons/fa";
// Ensure framer-motion is installed: npm install framer-motion
import { motion } from "framer-motion";

// Sample data for help requests
const sampleRequests = [
  {
    id: 1,
    name: "John Doe",
    issue: "Unable to log in to the system",
    status: "Open",
    timestamp: new Date().getTime() - 3600000, // 1 hour ago
  },
  {
    id: 2,
    name: "Jane Smith",
    issue: "System is slow and unresponsive",
    status: "Closed",
    timestamp: new Date().getTime() - 7200000, // 2 hours ago
  },
  {
    id: 3,
    name: "Mike Johnson",
    issue: "Password reset link not working",
    status: "Open",
    timestamp: new Date().getTime() - 10800000, // 3 hours ago
  },
];

const HelpRequestItem = ({ request, onClose, onMarkResolved }) => {
  const { name, issue, status, timestamp } = request;

  // Function to calculate time ago
  const timeAgo = (time) => {
    const seconds = Math.floor((new Date().getTime() - time) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  return (
    <motion.div
      className={`flex items-center p-4 mb-4 rounded-lg shadow-md ${status === "Open" ? "bg-blue-100" : "bg-gray-100"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-shrink-0">
        <FaPlus className={`text-${status === "Open" ? "blue" : "gray"}-500`} />
      </div>
      <div className="ml-3 flex-1">
        <p className="font-semibold">{name}</p>
        <p className="text-sm">{issue}</p>
        <p className="text-xs text-gray-500">{timeAgo(timestamp)}</p>
        <p className="text-xs text-gray-500">Status: {status}</p>
      </div>
      <div className="ml-4">
        {status === "Open" ? (
          <button
            onClick={() => onMarkResolved(request.id)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-all"
          >
            <FaCheck className="mr-2" />
            Mark as Resolved
          </button>
        ) : (
          <button
            onClick={() => onClose(request.id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
          >
            <FaTimes className="mr-2" />
            Close Request
          </button>
        )}
      </div>
    </motion.div>
  );
};

const HelpRequests = () => {
  const [requests, setRequests] = useState(sampleRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingRequest, setIsAddingRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({
    name: "",
    issue: "",
  });

  // Filter requests based on search term
  const filteredRequests = requests.filter((request) =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle request submission
  const handleSubmitRequest = () => {
    const newRequestObj = {
      id: requests.length + 1,
      name: newRequest.name,
      issue: newRequest.issue,
      status: "Open",
      timestamp: new Date().getTime(),
    };
    setRequests([...requests, newRequestObj]);
    setIsAddingRequest(false);
    setNewRequest({ name: "", issue: "" });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Mark request as resolved
  const handleMarkResolved = (id) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: "Closed" } : request
    );
    setRequests(updatedRequests);
  };

  // Close a request (delete it)
  const handleCloseRequest = (id) => {
    const updatedRequests = requests.filter((request) => request.id !== id);
    setRequests(updatedRequests);
  };

  return (
    <div className="p-6 w-full flex flex-col space-y-4 bg-gray-50">
      <div className="bg-white p-6 shadow-md rounded-md w-full">
        <h2 className="text-2xl font-semibold mb-4 flex justify-between items-center">
          Help Requests
          <button
            onClick={() => setIsAddingRequest(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            <FaPlus className="mr-2" />
            Add Request
          </button>
        </h2>

        {/* Search Bar */}
        <div className="mb-4 flex items-center">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            className="ml-2 p-2 border rounded-md w-full"
            placeholder="Search Requests"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Add Request Modal */}
        {isAddingRequest && (
          <div className="p-6 bg-white shadow-md rounded-md mb-4">
            <h3 className="text-xl font-semibold">Add New Help Request</h3>
            <div className="mt-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-2 border rounded-md mb-2"
                value={newRequest.name}
                onChange={(e) => setNewRequest({ ...newRequest, name: e.target.value })}
              />
              <textarea
                name="issue"
                placeholder="Describe the issue"
                className="w-full p-2 border rounded-md mb-2"
                value={newRequest.issue}
                onChange={(e) => setNewRequest({ ...newRequest, issue: e.target.value })}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSubmitRequest}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  onClick={() => setIsAddingRequest(false)}
                  className="ml-4 text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help Request List */}
        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <HelpRequestItem
                key={request.id}
                request={request}
                onClose={handleCloseRequest}
                onMarkResolved={handleMarkResolved}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No requests found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpRequests;
