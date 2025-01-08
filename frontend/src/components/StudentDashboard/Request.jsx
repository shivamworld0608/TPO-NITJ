import React, { useState } from "react";

const Request = () => {
  const backendIssues = [
    { id: 1, title: "Login Issue" },
    { id: 2, title: "Wrong Deatils" },
    { id: 3, title: "Feature Request" },
    { id: 4, title: "UI Bug" },
    { id: 5, title: "Performance Issue" },
    { id: 5, title: "OA Issue" },
    { id: 5, title: "Interview Issue" },
    { id: 5, title: "Job application Issue" },
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
    <div className="p-6 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Request Help</h2>

        {alertMessage && (
          <div className="p-4 mb-4 bg-blue-100 text-blue-800 rounded-lg shadow-sm">
            {alertMessage}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="issue" className="block text-lg font-medium text-gray-700 mb-2">
            Select an Issue
          </label>
          <select
            id="issue"
            onChange={handleSelectChange}
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue=""
          >
            <option value="" disabled>
              Choose an issue
            </option>
            {backendIssues.map((issue) => (
              <option key={issue.id} value={issue.id}>
                {issue.title}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={raiseIssue}
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Raise Issue
        </button>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Raised Issues</h3>
          {raisedIssues.length === 0 ? (
            <p className="text-gray-500">No issues raised yet.</p>
          ) : (
            <ul className="space-y-4">
              {raisedIssues.map((issue) => (
                <li
                  key={issue.id}
                  className="flex justify-between items-center p-4 bg-gray-50 border-l-4 border-blue-400 rounded-lg shadow-sm"
                >
                  <span className="text-gray-800 text-lg font-medium">{issue.title}</span>
                  {issue.resolved === null ? (
                    <span className="text-sm font-semibold py-1 px-3 bg-yellow-100 text-yellow-600 rounded-full">
                      Checking...
                    </span>
                  ) : (
                    <span
                      className={`text-sm font-semibold py-1 px-3 rounded-full ${
                        issue.resolved
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {issue.resolved ? "Resolved" : "Resolving"}
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
