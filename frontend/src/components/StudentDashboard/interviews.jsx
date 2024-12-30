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
    <div>
        <h3>{interview.company}</h3>
        <p>Date: {interview.date}</p>
        <p>Time: {interview.time}</p>
        <h4>Important Guidelines</h4>
        <ul>
            <li>Be on time</li>
            <li>Dress formally</li>
            <li>Prepare well</li>
        </ul>
        <h4>Important Links</h4>
        <ul>
            <li><a href="https://example.com">Interview Preparation</a></li>
            <li><a href="https://example.com">Company Website</a></li>
        </ul>
    </div>
);

const Interviews = () => {
    const [selectedInterview, setSelectedInterview] = useState(null);

    const handleInterviewClick = (interview) => {
        setSelectedInterview(interview);
    };

    return (
        <div>
            <h2>Upcoming Interviews</h2>
            <ul>
                {interviewsData.upcoming.map((interview) => (
                    <li key={interview.id} onClick={() => handleInterviewClick(interview)}>
                        {interview.company} - {interview.date}
                    </li>
                ))}
            </ul>

            <h2>Past Interviews</h2>
            <ul>
                {interviewsData.past.map((interview) => (
                    <li key={interview.id} onClick={() => handleInterviewClick(interview)}>
                        {interview.company} - {interview.date}
                    </li>
                ))}
            </ul>

            {selectedInterview && (
                <div>
                    <h2>Interview Details</h2>
                    <InterviewDetails interview={selectedInterview} />
                </div>
            )}
        </div>
    );
};

export default Interviews;