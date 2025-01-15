import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const RequestHelpManager = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/reqhelp/get-unresolved`,
        { withCredentials: true }
      );
      setIssues(response.data.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  };

  const resolveIssueDetail = async (issueId, detailId) => {
    try {
    console.log(issueId,detailId);
      await axios.put(
        `${import.meta.env.REACT_APP_BASE_URL}/reqhelp/resolve/${issueId}/${detailId}`,
        {},
        { withCredentials: true }
      );
       toast.success("Issue Resolved");
      setIssues((prevIssues) =>
        prevIssues.map((issue) => {
          if (issue._id === issueId) {
            return {
              ...issue,
              details: issue.details.filter((detail) => detail._id !== detailId),
            };
          }
          return issue;
        })
      );
    } catch (error) {
      console.error("Error resolving issue detail:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading issues...</p>;
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-custom-blue mb-4">Pending Issues</h1>
      {issues.length === 0 ? (
        <p className="text-gray-500">No pending issues to resolve.</p>
      ) : (
        <ul className="space-y-4 p-8 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative mt-8">
          {issues.map((issue) => (
            <li
              key={issue._id}
              className="p-4 bg-white shadow rounded-lg border space-y-4"
            >
              <h3 className="font-bold text-custom-blue">{issue.title}</h3>
              {issue.details.map((detail) => (
                <div
                  key={detail._id}
                  className="flex justify-between items-center p-2 border-t"
                >
                  <div>
                    <p className="text-sm text-gray-600">{detail.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Raised by: {detail.userId.name} ({detail.userId.email}) |{" "}
                      <span className="text-gray-500">User Type: {detail.onModel}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => resolveIssueDetail(issue._id, detail._id)}
                    className="flex items-center text-sm font-semibold py-2 px-4 bg-green-100 text-green-700 rounded hover:bg-green-200"
                  >
                    <FaCheckCircle className="mr-2" /> Resolve
                  </button>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestHelpManager;
