import React, { useState } from "react";
import { FaCheckCircle, FaSpinner, FaExclamationCircle } from "react-icons/fa";

const Request = () => {
  const backendIssues = [
    { id: 1, title: "Login Issue" },
    { id: 2, title: "Payment Failure" },
    { id: 3, title: "Feature Request" },
    { id: 4, title: "UI Bug" },
    { id: 5, title: "Performance Issue" },
    { id: 6, title: "OA Issue" },
    { id: 7, title: "Interview Issue" },
    { id: 8, title: "Job application Issue" },
  ];

  const [selectedIssueId, setSelectedIssueId] = useState("");
  const [raisedIssues, setRaisedIssues] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);

  const fetchResolvedStatus = (issueId) => {
    const resolvedStatuses = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(resolvedStatuses[issueId]);
      }, 2000);
    });
  };

  const handleSelectChange = (e) => {
    setSelectedIssueId(e.target.value);
  };

  const raiseIssue = () => {
    if (!selectedIssueId) {
      alert("Please select an issue before raising it.");
      return;
    }

    const issue = backendIssues.find((item) => item.id === parseInt(selectedIssueId));
    if (issue && !raisedIssues.find((i) => i.id === issue.id)) {
      setRaisedIssues([...raisedIssues, { ...issue, resolved: null }]);
      setAlertMessage("Your issue has been raised and sent to the team.");

      checkIssueStatus(issue.id);
    }
  };

  const checkIssueStatus = async (issueId) => {
    setLoadingStatus(true);

    const resolvedStatus = await fetchResolvedStatus(issueId);
    setRaisedIssues((prevIssues) =>
      prevIssues.map((item) =>
        item.id === issueId ? { ...item, resolved: resolvedStatus } : item
      )
    );

    setLoadingStatus(false);
  };

  return (
    <div className="p-6  min-h-screen">
      <header className=" text-custom-blue py-6 ">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight">Request Help</h1>
          <p className="text-base mt-2">Easily raise and track your issues</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 mt-6">
        {alertMessage && (
          <div className="p-4 mb-4 bg-green-100 text-green-800 rounded-md border-l-4 border-green-500">
            {alertMessage}
          </div>
        )}

        <label className="block text-gray-700 font-medium mb-2">
          Select an Issue
        </label>
        <select
          onChange={handleSelectChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          defaultValue=""
        >
          <option value="" disabled>
            Select an issue
          </option>
          {backendIssues.map((issue) => (
            <option key={issue.id} value={issue.id}>
              {issue.title}
            </option>
          ))}
        </select>

        <button
          onClick={raiseIssue}
          className="w-full bg-custom-blue text-white py-2 rounded-md hover:bg-blue-700 transition-shadow shadow-md"
        >
          Raise Issue
        </button>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Raised Issues
          </h3>
          {raisedIssues.length === 0 ? (
            <p className="text-sm text-gray-500">No issues raised yet.</p>
          ) : (
            <ul className="space-y-3">
              {raisedIssues.map((issue) => (
                <li
                  key={issue.id}
                  className="flex justify-between items-center p-4 bg-gray-50 border rounded-md shadow-sm"
                >
                  <span className="font-medium text-gray-800">{issue.title}</span>

                  {issue.resolved === null ? (
                    <span className="flex items-center text-sm font-semibold py-1 px-3 bg-gray-200 text-gray-700 rounded">
                      <FaSpinner className="mr-2 animate-spin" />
                      Checking...
                    </span>
                  ) : (
                    <span
                      className={`flex items-center text-sm font-semibold py-1 px-3 rounded ${
                        issue.resolved
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {issue.resolved ? (
                        <>
                          <FaCheckCircle className="mr-2" />
                          Resolved
                        </>
                      ) : (
                        <>
                          <FaExclamationCircle className="mr-2" />
                          Resolving
                        </>
                      )}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Request;