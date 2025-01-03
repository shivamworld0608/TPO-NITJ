// import React, { useState } from 'react';

// const interviewsData = {
//   upcoming: [
//     { id: 1, company: 'Company A', date: '2023-11-01', time: '10:00 AM' },
//     { id: 2, company: 'Company B', date: '2023-11-05', time: '02:00 PM' },
//   ],
//   past: [
//     { id: 3, company: 'Company C', date: '2023-10-01', time: '11:00 AM' },
//     { id: 4, company: 'Company D', date: '2023-10-10', time: '03:00 PM' },
//   ],
// };

// const InterviewDetails = ({ interview }) => (
//   <div className="p-4 bg-white rounded-lg shadow-md">
//     <h3 className="text-xl font-bold mb-2">{interview.company}</h3>
//     <p className="mb-1">Date: {interview.date}</p>
//     <p className="mb-4">Time: {interview.time}</p>
//     <h4 className="text-lg font-semibold mb-2">Important Guidelines</h4>
//     <ul className="list-disc list-inside mb-4">
//       <li>Be on time</li>
//       <li>Dress formally</li>
//       <li>Prepare well</li>
//     </ul>
//     <h4 className="text-lg font-semibold mb-2">Important Links</h4>
//     <ul className="list-disc list-inside">
//       <li><a href="https://example.com" className="text-blue-500 hover:underline">Interview Preparation</a></li>
//       <li><a href="https://example.com" className="text-blue-500 hover:underline">Company Website</a></li>
//     </ul>
//   </div>
// );

// const Interviews = () => {
//   const [selectedInterview, setSelectedInterview] = useState(null);

//   const handleInterviewClick = (interview) => {
//     setSelectedInterview(interview);
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6">Interviews</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Upcoming Interviews</h3>
//           <ul className="space-y-4">
//             {interviewsData.upcoming.map((interview) => (
//               <li key={interview.id}>
//                 <button
//                   onClick={() => handleInterviewClick(interview)}
//                   className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   {interview.company} - {interview.date} at {interview.time}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Past Interviews</h3>
//           <ul className="space-y-4">
//             {interviewsData.past.map((interview) => (
//               <li key={interview.id}>
//                 <button
//                   onClick={() => handleInterviewClick(interview)}
//                   className="w-full text-left px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//                 >
//                   {interview.company} - {interview.date} at {interview.time}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       {selectedInterview && (
//         <div className="mt-8">
//           <h3 className="text-xl font-semibold mb-4">Interview Details</h3>
//           <InterviewDetails interview={selectedInterview} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Interviews;





import React, { useEffect, useState } from "react";
import axios from "axios";

const Interviews = () => {
  const [interviewDetails, setInterviewDetails] = useState({});
  const [shortlistStatus, setShortlistStatus] = useState("");
  const [todayShortlists, setTodayShortlists] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [pastInterviews, setPastInterviews] = useState([]);

  const userId = "6769a8e96891a0b319d033a8"; // Replace with the actual user ID from authentication or state
  const jobId = "JOB123"; // Replace with the actual job ID
  const interviewCode = "1"; // Replace with the actual interview code

  const baseUrl = import.meta.env.REACT_APP_BASE_URL; // Store base URL for reuse

  // Fetch interview details
  const fetchInterviewDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/interview/details/${jobId}/${interviewCode}`);
      setInterviewDetails(response.data.interview || {});
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  // Check shortlist status
  const fetchShortlistStatus = async () => {
    try {
      const response = await axios.get(`${baseUrl}/interview/check-shortlist-status/${userId}/${jobId}/${interviewCode}`);
      setShortlistStatus(response.data.message || "Not available");
    } catch (error) {
      console.error("Error fetching shortlist status:", error);
    }
  };

  // Get today's shortlists
  const fetchTodayShortlists = async () => {
    try {
      const response = await axios.get(`${baseUrl}/interview/today-shortlists`);
      setTodayShortlists(response.data.data || []);
    } catch (error) {
      console.error("Error fetching today's shortlists:", error);
    }
  };

  // Get upcoming eligible interviews
  const fetchUpcomingInterviews = async () => {
    try {
      const response = await axios.get(`${baseUrl}/interview/eligible-upcoming/${userId}`);
      setUpcomingInterviews(response.data.interviews || []);
    } catch (error) {
      console.error("Error fetching upcoming interviews:", error);
    }
  };

  // Get past eligible interviews
  const fetchPastInterviews = async () => {
    try {
      const response = await axios.get(`${baseUrl}/interview/eligible-past/${userId}`);
      setPastInterviews(response.data.interviews || []);
    } catch (error) {
      console.error("Error fetching past interviews:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchInterviewDetails();
    fetchShortlistStatus();
    fetchTodayShortlists();
    fetchUpcomingInterviews();
    fetchPastInterviews();
  }, []);

  return (
    <div className="flex flex-col items-center mt-8 lg:mt-20">
      <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center tracking-wide">
        Welcome to
        <span className="bg-custom-blue text-transparent bg-clip-text">
          {" "}Student Dashboard
        </span>
      </h1>

     {/* Interview Details */}
<div className="mt-8">
  <h2 className="text-2xl font-semibold mb-4">Interview Details</h2>
  {interviewDetails && Object.keys(interviewDetails).length > 0 ? (
    <div className="space-y-6">
      {/* General Information */}
      <div className="border rounded-lg shadow-sm p-6 bg-white">
        <div className="flex items-center mb-4">
          <img
            src={interviewDetails.company_logo}
            alt={`${interviewDetails.company_name} logo`}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold">{interviewDetails.company_name}</h3>
            <p className="text-gray-600">{interviewDetails.interview_type}</p>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          <p><strong>Interview Date:</strong> {new Date(interviewDetails.interview_date).toLocaleDateString()}</p>
          <p><strong>Interview Time:</strong> {interviewDetails.interview_time}</p>
          <p><strong>Interview Code:</strong> {interviewDetails.interview_code}</p>
          <p><strong>Result Date:</strong> {new Date(interviewDetails.result_date).toLocaleDateString()}</p>
          <p><strong>Important Guidelines:</strong> {interviewDetails.important_guidelines}</p>
          {interviewDetails.interview_link && (
            <p>
              <strong>Interview Link:</strong>{' '}
              <a
                href={interviewDetails.interview_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Join Interview
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Eligible Students */}
      {interviewDetails.eligible_students && interviewDetails.eligible_students.length > 0 && (
        <div className="border rounded-lg shadow-sm p-6 bg-white">
          <h4 className="text-lg font-semibold mb-4">Eligible Students</h4>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-4 py-2">Name</th>
                <th className="border border-gray-200 px-4 py-2">Roll No</th>
                <th className="border border-gray-200 px-4 py-2">Email</th>
                <th className="border border-gray-200 px-4 py-2">Department</th>
              </tr>
            </thead>
            <tbody>
              {interviewDetails.eligible_students.map((student, index) => (
                <tr key={index} className="text-sm text-gray-700">
                  <td className="border border-gray-200 px-4 py-2">{student.name}</td>
                  <td className="border border-gray-200 px-4 py-2">{student.rollno}</td>
                  <td className="border border-gray-200 px-4 py-2">{student.email}</td>
                  <td className="border border-gray-200 px-4 py-2">{student.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Shortlisted Students */}
      {interviewDetails.shortlisted_students && interviewDetails.shortlisted_students.length > 0 && (
        <div className="border rounded-lg shadow-sm p-6 bg-white">
          <h4 className="text-lg font-semibold mb-4">Shortlisted Students</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviewDetails.shortlisted_students.map((student, index) => (
              <div
                key={index}
                className="p-4 border rounded-md shadow-sm bg-gray-50 flex items-center space-x-4"
              >
                {student.image && (
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.email}</p>
                  <p className="text-sm text-gray-600">Roll No: {student.rollno}</p>
                  <p className="text-sm text-gray-600">Department: {student.department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <p className="text-gray-500">Loading interview details...</p>
  )}
</div>

      {/* Shortlist Status */}
      <div className="mt-8">
        <h2 className="text-xl">Shortlist Status</h2>
        {shortlistStatus ? <p>{shortlistStatus}</p> : <p>Loading shortlist status...</p>}
      </div>

{/* Today's Shortlists */}
<div className="mt-8">
  <h2 className="text-2xl font-semibold mb-4">Today's Shortlists</h2>
  {todayShortlists && todayShortlists.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {todayShortlists.map((company, index) => (
        <div
          key={index}
          className="border rounded-lg shadow-sm p-4 bg-white"
        >
          <div className="flex items-center mb-4">
            <img
              src={company.company_logo}
              alt={`${company.company_name} logo`}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <h3 className="text-lg font-medium">{company.company_name}</h3>
          </div>
          {company.shortlisted_students.length > 0 ? (
            <ul className="space-y-2">
              {company.shortlisted_students.map((student, idx) => (
                <li
                  key={idx}
                  className="p-2 border rounded-md bg-gray-50"
                >
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.email}</p>
                  <p className="text-sm text-gray-600">Roll No: {student.rollno}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No students shortlisted.</p>
          )}
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No shortlists available for today.</p>
  )}
</div>


    {/* Upcoming Interviews */}
<div className="mt-8">
  <h2 className="text-xl">Upcoming Interviews</h2>
  {upcomingInterviews && upcomingInterviews.length > 0 ? (
    <ul>
      {upcomingInterviews.map((interview) => (
        <li key={interview.id}>{interview.company_name}</li>
      ))}
    </ul>
  ) : (
    <p>No upcoming interviews available.</p>
  )}
</div>
<div className="mt-8">
  <h2 className="text-xl">Past Interviews</h2>
  {pastInterviews && pastInterviews.length > 0 ? (
    <ul>
      {pastInterviews.map((interview) => (
        <li key={interview.id}>{interview.company_name}</li>
      ))}
    </ul>
  ) : (
    <p>No upcoming interviews available.</p>
  )}
</div>

    </div>
  );
};

export default Interviews;