import React from 'react';

const OnlineAssessment = () => {
    const assessments = [
        {
            title: 'Assessment 1',
            date: '2023-10-15',
            time: '10:00 AM',
            link: 'https://example.com/assessment1',
            meetLink: 'https://meet.example.com/assessment1'
        },
        {
            title: 'Assessment 2',
            date: '2023-10-20',
            time: '2:00 PM',
            link: 'https://example.com/assessment2',
            meetLink: 'https://meet.example.com/assessment2'
        }
    ];

    return (
        <div>
            <h1>Upcoming Online Assessments</h1>
            <ul>
                {assessments.map((assessment, index) => (
                    <li key={index}>
                        <h2>{assessment.title}</h2>
                        <p>Date: {assessment.date}</p>
                        <p>Time: {assessment.time}</p>
                        <p>
                            Assessment Link: <a href={assessment.link} target="_blank" rel="noopener noreferrer">{assessment.link}</a>
                        </p>
                        <p>
                            Meet Link: <a href={assessment.meetLink} target="_blank" rel="noopener noreferrer">{assessment.meetLink}</a>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OnlineAssessment;