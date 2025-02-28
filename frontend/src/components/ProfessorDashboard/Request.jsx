import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import Notification from "./Notification";

const RequestHelpManager = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/reqhelp/get-unresolved`,
        { withCredentials: true }
      );
      setIssues(response.data.data || []);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (issue, detail) => {
    setSelectedIssue(issue);
    setSelectedDetail(detail);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedIssue(null);
    setSelectedDetail(null);
    setComment("");
  };

  const resolveIssueDetail = async () => {
    if (!selectedIssue || !selectedDetail) return;

    try {
      await axios.put(
        `${import.meta.env.REACT_APP_BASE_URL}/reqhelp/resolve/${selectedIssue._id}/${selectedDetail._id}`,
        { comment },
        { withCredentials: true }
      );

      toast.success("Issue Resolved Successfully");
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === selectedIssue._id
            ? {
                ...issue,
                details: issue.details.filter((detail) => detail._id !== selectedDetail._id),
              }
            : issue
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error resolving issue detail:", error);
      toast.error("Failed to Resolve Issue");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Pending <span className="text-custom-blue">Issues</span>
        </h1>

        {issues.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No pending issues to resolve at this moment.
          </p>
        ) : (
          <div className="space-y-6">
            {issues.map((issue) => (
              <div
                key={issue._id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-2xl font-semibold text-custom-blue mb-4">{issue.title}</h3>
                {issue.details.map((detail) => (
                  <div
                    key={detail._id}
                    className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div>
                      <p className="text-gray-700">{detail.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Raised by: <span className="font-medium">{detail.userId.name}</span> (
                        {detail.userId.email}) |{" "}
                        <span className="text-gray-600">Type: {detail.onModel}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => openModal(issue, detail)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                    >
                      <FaCheckCircle /> Resolve
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Resolve Issue</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">Add an optional comment before resolving:</p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              placeholder="Enter your comment (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
            />
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={resolveIssueDetail}
                className="px-5 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Resolve
              </button>
            </div>
          </div>
        </div>
      )}

      <Notification />
    </div>
  );
};

export default RequestHelpManager;