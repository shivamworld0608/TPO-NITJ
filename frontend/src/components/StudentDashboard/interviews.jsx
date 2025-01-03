import React, { useState } from 'react';

const interviewsData = {
  upcoming: [
    { id: 1, company: 'Company A', date: '2023-11-01', time: '10:00 AM' },
    { id: 2, company: 'Company B', date: '2023-11-05', time: '02:00 PM' },
  ],
  past: [
    { id: 3, company: 'Company C', date: '2023-10-01', time: '11:00 AM' },
    { id: 4, company: 'Company D', date: '2023-10-10', time: '03:00 PM' },
  ],
};

const InterviewDetails = ({ interview }) => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <h3 className="text-xl font-bold mb-2">{interview.company}</h3>
    <p className="mb-1">Date: {interview.date}</p>
    <p className="mb-4">Time: {interview.time}</p>
    <h4 className="text-lg font-semibold mb-2">Important Guidelines</h4>
    <ul className="list-disc list-inside mb-4">
      <li>Be on time</li>
      <li>Dress formally</li>
      <li>Prepare well</li>
    </ul>
    <h4 className="text-lg font-semibold mb-2">Important Links</h4>
    <ul className="list-disc list-inside">
      <li><a href="https://example.com" className="text-blue-500 hover:underline">Interview Preparation</a></li>
      <li><a href="https://example.com" className="text-blue-500 hover:underline">Company Website</a></li>
    </ul>
  </div>
);

const Interviews = () => {
  const [selectedInterview, setSelectedInterview] = useState(null);

  const handleInterviewClick = (interview) => {
    setSelectedInterview(interview);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Upcoming Interviews</h3>
          <ul className="space-y-4">
            {interviewsData.upcoming.map((interview) => (
              <li key={interview.id}>
                <button
                  onClick={() => handleInterviewClick(interview)}
                  className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {interview.company} - {interview.date} at {interview.time}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Past Interviews</h3>
          <ul className="space-y-4">
            {interviewsData.past.map((interview) => (
              <li key={interview.id}>
                <button
                  onClick={() => handleInterviewClick(interview)}
                  className="w-full text-left px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  {interview.company} - {interview.date} at {interview.time}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedInterview && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Interview Details</h3>
          <InterviewDetails interview={selectedInterview} />
        </div>
      )}
    </div>
  );
};

export default Interviews;