import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, 
  ClockIcon, 
  TrophyIcon, 
  StarIcon, 
  PlayCircleIcon 
} from 'lucide-react';

const MockAssessmentStudentDashboard = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [attempted, setAttempted] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setIsLoading(true);
        const [upcomingRes, ongoingRes, attemptedRes] = await Promise.all([
          axios.get(`${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments/upcoming`, { withCredentials: true }),
          axios.get(`${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments/ongoing`, { withCredentials: true }),
          axios.get(`${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments/attempted`, { withCredentials: true })
        ]);

        setUpcoming(upcomingRes.data);
        setOngoing(ongoingRes.data);
        setAttempted(attemptedRes.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching assessments:', err);
        setError('Failed to load assessments. Please try again later.');
        setIsLoading(false);
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

  const AssessmentCard = ({ 
    type = 'upcoming', 
    title, 
    time, 
    startTime, 
    endTime, 
    score, 
    rank, 
    totalQuestions,
    difficulty 
  }) => {
    const difficultyColors = {
      'Easy': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Hard': 'bg-red-100 text-red-800'
    };

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
              {difficulty && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty] || 'bg-gray-100'}`}>
                  {difficulty} Difficulty
                </span>
              )}
            </div>
            {type === 'attempted' && (
              <div className="flex items-center text-yellow-500">
                <TrophyIcon className="w-6 h-6 mr-1" />
                <span className="font-semibold">{rank || 'N/A'}</span>
              </div>
            )}
          </div>

          <div className="space-y-2 text-gray-600 mb-4">
            {type === 'upcoming' && (
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                <span>Starts: {new Date(startTime).toLocaleString()}</span>
              </div>
            )}

            {type === 'ongoing' && (
              <>
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2 text-blue-500" />
                  <span>Ends: {new Date(endTime).toLocaleString()}</span>
                </div>
                {totalQuestions && (
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 mr-2 text-purple-500" />
                    <span>{totalQuestions} Questions</span>
                  </div>
                )}
              </>
            )}

            {type === 'attempted' && (
              <>
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-custom-blue" />
                  <span>Completed: {new Date(time).toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="w-5 h-5 mr-2 text-green-700" />
                  <span>Score: {score}</span>
                </div>
              </>
            )}
          </div>

          {type === 'ongoing' && (
            <div className="mt-4">
              <button 
                onClick={() => startAssessment(id)} 
                className="w-full flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <PlayCircleIcon className="w-5 h-5 mr-2" />
                Start Now
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const LoadingState = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>
  );

  const ErrorState = ({ message }) => (
    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg text-center">
      <p>{message}</p>
    </div>
  );

  return (
    <div className="max-w mx-auto p-1">
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

      <div className="container mx-auto px-4 py-6">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <>
            {activeTab === 'upcoming' && (
              <section>
                {upcoming.length === 0 ? (
                  <p className="text-gray-500 text-center">No upcoming assessments scheduled</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {upcoming.map(a => (
                      <AssessmentCard
                        key={a._id}
                        type="upcoming"
                        title={a.title}
                        startTime={a.startTime}
                        difficulty={a.difficulty}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === 'ongoing' && (
              <section>
                {ongoing.length === 0 ? (
                  <p className="text-gray-500 text-center">No ongoing assessments available</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {ongoing.map(a => (
                      <AssessmentCard
                        key={a._id}
                        type="ongoing"
                        title={a.title}
                        endTime={a.endTime}
                        totalQuestions={a.totalQuestions}
                        difficulty={a.difficulty}
                        id={a._id}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === 'attempted' && (
              <section>
                {attempted.length === 0 ? (
                  <p className="text-gray-500 text-center">No assessments attempted yet</p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {attempted.map(a => (
                      <AssessmentCard
                        key={a._id}
                        type="attempted"
                        title={a.assessment.title}
                        time={a.completedAt}
                        score={a.totalScore}
                        rank={a.rank}
                        difficulty={a.assessment.difficulty}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MockAssessmentStudentDashboard;