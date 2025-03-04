import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MockAssessmentStudentDashboard = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [attempted, setAttempted] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming'); // Default tab
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const [upcomingRes, ongoingRes, attemptedRes] = await Promise.all([
          axios.get(`${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments/upcoming`, { withCredentials: true }),
          axios.get(`${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments/ongoing`, { withCredentials: true }),
          axios.get(`${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments/attempted`, { withCredentials: true })
        ]);

        setUpcoming(upcomingRes.data);
        setOngoing(ongoingRes.data);
        setAttempted(attemptedRes.data);
      } catch (err) {
        console.error('Error fetching assessments:', err);
      }
    };

    fetchAssessments();
  }, []);

  const startAssessment = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments/${id}/start`,
        {},
        { withCredentials: true }
      );
      navigate(`/sdashboard/assessment-attempt/${res.data._id}`);
    } catch (error) {
      console.error('Error starting assessment:', error);
    }
  };

  const AssessmentCard = ({ title, time, button, score, rank }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-600">{time}</p>
      {score && <p className="text-gray-600">Score: <span className="font-medium">{score}</span></p>}
      {rank && <p className="text-gray-600">Rank: <span className="font-medium">{rank}</span></p>}
      {button && <div className="mt-2">{button}</div>}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex justify-between items-center flex-col lg:flex-row p-4 rounded-t-lg">
        <h2 className="text-3xl font-bold text-custom-blue capitalize">
          <span className="text-black">
            {activeTab === 'upcoming' ? 'Upcoming' : activeTab === 'ongoing' ? 'Ongoing' : 'Attempted'}
          </span>{' '}
          Assessments
        </h2>

        <div className="flex border border-gray-300 rounded-3xl lg:mt-0 bg-white mt-10">
          <button
            className={`px-4 py-2 rounded-3xl ${
              activeTab === 'upcoming' ? 'bg-custom-blue text-white' : 'bg-white'
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded-3xl ${
              activeTab === 'ongoing' ? 'bg-custom-blue text-white' : 'bg-white'
            }`}
            onClick={() => setActiveTab('ongoing')}
          >
            Ongoing
          </button>
          <button
            className={`px-4 py-2 rounded-3xl ${
              activeTab === 'attempted' ? 'bg-custom-blue text-white' : 'bg-white'
            }`}
            onClick={() => setActiveTab('attempted')}
          >
            Attempted
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-6">
        {activeTab === 'upcoming' && (
          <section>
            {upcoming.length === 0 ? (
              <p className="text-gray-500">No upcoming assessments scheduled</p>
            ) : (
              <div className="grid gap-4">
                {upcoming.map(a => (
                  <AssessmentCard
                    key={a._id}
                    title={a.title}
                    time={`Starts: ${new Date(a.startTime).toLocaleString()}`}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'ongoing' && (
          <section>
            {ongoing.length === 0 ? (
              <p className="text-gray-500">No ongoing assessments available</p>
            ) : (
              <div className="grid gap-4">
                {ongoing.map(a => (
                  <AssessmentCard
                    key={a._id}
                    title={a.title}
                    time={`Ends: ${new Date(a.endTime).toLocaleString()}`}
                    button={
                      <button
                        onClick={() => startAssessment(a._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                      >
                        Start Now
                      </button>
                    }
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'attempted' && (
          <section>
            {attempted.length === 0 ? (
              <p className="text-gray-500">No assessments attempted yet</p>
            ) : (
              <div className="grid gap-4">
                {attempted.map(a => (
                  <AssessmentCard
                    key={a._id}
                    title={a.assessment.title}
                    time={`Completed: ${new Date(a.completedAt).toLocaleString()}`}
                    score={a.totalScore}
                    rank={a.rank || 'N/A'}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default MockAssessmentStudentDashboard;
