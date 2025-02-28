import React, { useState, useEffect } from 'react';
import { FaQuestionCircle, FaPlus, FaTrash, FaBook, FaArrowLeft, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import CompanySearchDropdown from '../RecruiterDashboard/CompanySearchDropdown';

const QuestionBank = () => {
  const [allQuestionBanks, setAllQuestionBanks] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newRole, setNewRole] = useState(''); // New state for common role
  const [questionsData, setQuestionsData] = useState([{ question: '', sourceLinks: [''], answer: '' }]); // Removed which_role from individual questions
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/question-bank/get-question`, { withCredentials: true });
        setAllQuestionBanks(response.data.questionBank || []);
        setEligible(response.data.eligible);
      } catch (err) {
        setError('Failed to fetch question banks');
        setAllQuestionBanks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllQuestions();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      const selectedBank = allQuestionBanks.find(bank => bank.companyName === selectedCompany);
      if (selectedBank && Array.isArray(selectedBank.contributions)) {
        const allQuestions = selectedBank.contributions.flatMap(contribution => {
          if (Array.isArray(contribution.questions)) {
            return contribution.questions.map(question => ({
              ...question,
              contributor: contribution.studentId?.name || 'Unknown'
            }));
          }
          return [];
        });
        setFetchedQuestions(allQuestions);
      } else {
        setFetchedQuestions([]);
      }
    } else {
      setFetchedQuestions([]);
    }
  }, [selectedCompany, allQuestionBanks]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        companyName: newCompanyName || selectedCompany,
        contributions: questionsData.map(q => ({
          question: q.question,
          sourceLinks: q.sourceLinks.filter(link => link.trim() !== ''),
          answer: q.answer,
          which_role: newRole, // Apply the common role to all questions
        })),
      };
      console.log('Payload being sent:', payload);
      await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/question-bank/add-question`, payload, { withCredentials: true });
      console.log("added");
      setQuestionsData([{ question: '', sourceLinks: [''], answer: '' }]);
      setNewCompanyName('');
      setNewRole(''); // Reset role after submission
      setError('Questions added successfully!');
      setShowAddForm(false);
      const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/question-bank/get-question`, { withCredentials: true });
      setAllQuestionBanks(response.data || []);
    } catch (err) {
      setError('Failed to add questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewQuestion = () => setQuestionsData([...questionsData, { question: '', sourceLinks: [''], answer: '' }]);
  const handleRemoveQuestion = (index) => setQuestionsData(questionsData.filter((_, i) => i !== index));
  const handleAddSourceLink = (questionIndex) => {
    const newQuestions = [...questionsData];
    newQuestions[questionIndex].sourceLinks.push('');
    setQuestionsData(newQuestions);
  };
  const handleRemoveSourceLink = (questionIndex, linkIndex) => {
    const newQuestions = [...questionsData];
    newQuestions[questionIndex].sourceLinks = newQuestions[questionIndex].sourceLinks.filter((_, i) => i !== linkIndex);
    setQuestionsData(newQuestions);
  };
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questionsData];
    newQuestions[index][field] = value;
    setQuestionsData(newQuestions);
  };
  const handleSourceLinkChange = (questionIndex, linkIndex, value) => {
    const newQuestions = [...questionsData];
    newQuestions[questionIndex].sourceLinks[linkIndex] = value;
    setQuestionsData(newQuestions);
  };

  const toggleAnswer = (index) => {
    setExpandedAnswers(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const filteredCompanies = allQuestionBanks.filter(bank => 
    bank.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (companyName) => {
    setSearchTerm(companyName);
    setSelectedCompany(companyName);
    setShowSuggestions(false);
  };

  const renderCompanyList = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold flex items-center space-x-3 text-gray-900">
          <span>Question <span className='text-custom-blue'>Bank</span></span>
        </h2>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="relative w-64">
            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
              <FaSearch className="w-5 h-5 ml-3 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search company..."
                className="p-2 w-full bg-transparent outline-none"
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
            </div>
            {showSuggestions && searchTerm && filteredCompanies.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredCompanies.map((bank) => (
                  <div
                    key={bank.companyName}
                    onClick={() => handleSuggestionClick(bank.companyName)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {bank.companyName}
                  </div>
                ))}
              </div>
            )}
          </div>
          {eligible && (<button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-custom-blue text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition duration-300"
          >
            <FaPlus className="w-5 h-5" />
            <span>Add Question</span>
          </button>)}
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      ) : filteredCompanies.length === 0 ? (
        <p className="text-gray-600 italic">No companies match your search.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((bank) => (
            <div
              key={bank.companyName}
              onClick={() => setSelectedCompany(bank.companyName)}
              className="p-6 bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <p className="text-lg font-semibold text-gray-900">{bank.companyName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAddForm = () => (
    <form onSubmit={handleAddQuestion} className="space-y-8 animate-fade-in relative">
      <button
        type="button"
        onClick={() => { setShowAddForm(false); setNewCompanyName(''); setNewRole(''); }}
        className="absolute top-0 left-0 flex items-center space-x-2 px-3 py-2 text-gray-700 transition duration-300"
      >
        <FaArrowLeft className="w-5 h-5" />
      </button>

      <div className="pt-12">
        <h3 className="text-2xl font-bold text-gray-900 text-center">Add New Questions</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800">Company Name</label>
        <input
          type="text"
          value={newCompanyName}
          onChange={(e) => setNewCompanyName(e.target.value)}
          className="mt-2 block w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 bg-gray-50"
          placeholder="Enter company name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800">Role</label>
        <input
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="mt-2 block w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 bg-gray-50"
          placeholder="Enter the role (e.g., Software Engineer)"
          required
        />
      </div>

      {questionsData.map((q, questionIndex) => (
        <div key={questionIndex} className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Question {questionIndex + 1}</h4>
            {questionsData.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveQuestion(questionIndex)}
                className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition duration-200"
              >
                <FaTrash className="w-5 h-5" />
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Question</label>
            <textarea
              value={q.question}
              onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
              className="mt-2 block w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 bg-gray-50"
              rows="3"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-800">Source Links</label>
            {q.sourceLinks.map((link, linkIndex) => (
              <div key={linkIndex} className="flex items-center space-x-3 mt-3">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => handleSourceLinkChange(questionIndex, linkIndex, e.target.value)}
                  placeholder={`Source Link ${linkIndex + 1}`}
                  className="block w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 bg-gray-50"
                />
                {q.sourceLinks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSourceLink(questionIndex, linkIndex)}
                    className="text-red-600 hover:text-red-800 transition duration-200"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddSourceLink(questionIndex)}
              className="flex items-center space-x-2 mt-3 text-custom-blue transition duration-200"
            >
              <FaPlus className="w-5 h-5" />
              <span>Add Another Source</span>
            </button>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-800">Answer</label>
            <textarea
              value={q.answer}
              onChange={(e) => handleQuestionChange(questionIndex, 'answer', e.target.value)}
              className="mt-2 block w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 bg-gray-50"
              rows="4"
            />
          </div>
        </div>
      ))}

      <div className="space-y-4">
        <button
          type="button"
          onClick={handleAddNewQuestion}
          className="w-full bg-custom-blue text-white p-3 rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
        >
          <span className="flex items-center justify-center space-x-2">
            <FaPlus className="w-5 h-5" />
            <span>Add Another Question</span>
          </span>
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-custom-blue text-white p-3 rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 transition duration-300"
        >
          {loading ? 'Submitting...' : 'Submit Questions'}
        </button>
      </div>
    </form>
  );

  const renderQuestions = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setSelectedCompany(null)}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700  rounded-lg transition duration-300"
        >
          <FaArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="text-3xl font-bold text-gray-900">{selectedCompany}<span className='text-custom-blue'> Questions</span></h3>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>
  
      {fetchedQuestions.length === 0 ? (
        <div className="text-center py-12">
          <FaQuestionCircle className="mx-auto w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg italic">No questions available for this company yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {fetchedQuestions.map((q, index) => {
            const truncatedAnswer = q.answer && q.answer.length > 200 ? `${q.answer.slice(0, 200)}...` : q.answer;
            const isExpanded = expandedAnswers[index];
  
            return (
              <div 
                key={index} 
                className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                {/* Header with User Icon and Role */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">{q.contributor}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    Role: <span className="font-medium text-gray-800">{q.which_role || 'Not specified'}</span>
                  </span>
                </div>
  
                {/* Question Content */}
                <div className="space-y-3">
                  <p className="text-lg text-gray-900 font-semibold leading-relaxed">
                    <span className="text-custom-blue">Q {index + 1}.</span> {q.question}
                  </p>
                  
                  {q.sourceLinks?.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      <strong className="mr-1">Sources:</strong>
                      {q.sourceLinks.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-2 py-1 bg-blue-50 text-custom-blue rounded-md hover:bg-indigo-100 transition-colors duration-200"
                        >
                          <FaBook className="w-3 h-3 mr-1" />
                          Link {linkIndex + 1}
                        </a>
                      ))}
                    </div>
                  )}
                  
                  {q.answer && (
                    <div className="mt-4">
                      <p className="text-gray-700 text-base leading-relaxed">
                        <strong className="text-gray-900">Answer:</strong> {isExpanded ? q.answer : truncatedAnswer}
                      </p>
                      {q.answer.length > 200 && (
                        <button
                          onClick={() => toggleAnswer(index)}
                          className="mt-2 text-custom-blue hover:text-indigo-700 font-medium transition-colors duration-200 flex items-center space-x-1"
                        >
                          <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                          <svg
                            className={`w-4 h-4 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      {!selectedCompany && !showAddForm ? (
        renderCompanyList()
      ) : showAddForm ? (
        renderAddForm()
      ) : (
        renderQuestions()
      )}
    </div>
  );
};

export default QuestionBank;