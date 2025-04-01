/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus } from 'lucide-react';
import ResultAnalysis from './mock-test-result';


const MockAssessmentProfessorDashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    duration: '',
    questions: [{
      problemStatement: '',
      functionName: '',
      returnType: '',
      language: 'cpp',
      arguments: [{ name: '', type: '' }],
      samples: [{ arguments: {}, output: '', rawArguments: '' }],
      testCases: [{ arguments: {}, output: '', rawArguments: '' }],
      points: '',
    }],
  });

  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments`, { withCredentials: true })
      .then((res) => setAssessments(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Update top-level form fields
  const updateFormField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Update question fields
  const updateQuestionField = (qIdx, field, value) => {
    const questions = [...form.questions];
    questions[qIdx][field] = value;
    setForm({ ...form, questions });
  };

  // Add a new argument to a question
  const addArgument = (qIdx) => {
    const questions = [...form.questions];
    questions[qIdx].arguments.push({ name: '', type: '' });
    setForm({ ...form, questions });
  };

  // Remove an argument from a question
  const deleteArgument = (qIdx, aIdx) => {
    const questions = [...form.questions];
    questions[qIdx].arguments.splice(aIdx, 1);
    setForm({ ...form, questions });
  };

  // Update an argument's field (name or type)
  const updateArgument = (qIdx, aIdx, field, value) => {
    const questions = [...form.questions];
    questions[qIdx].arguments[aIdx][field] = value;
    setForm({ ...form, questions });
  };

  // Add a sample case
  const addSample = (qIdx) => {
    const questions = [...form.questions];
    questions[qIdx].samples.push({ arguments: {}, output: '', rawArguments: '' });
    setForm({ ...form, questions });
  };

  // Delete a sample case
  const deleteSample = (qIdx, sIdx) => {
    const questions = [...form.questions];
    questions[qIdx].samples.splice(sIdx, 1);
    setForm({ ...form, questions });
  };

  // Update sample case fields
  const updateSample = (qIdx, sIdx, field, value) => {
    const questions = [...form.questions];
    if (field === 'rawArguments') {
      questions[qIdx].samples[sIdx][field] = value;
    } else if (field === 'output') {
      questions[qIdx].samples[sIdx][field] = value;
    }
    setForm({ ...form, questions });
  };

  // Parse sample arguments on blur
  const parseSampleArguments = (qIdx, sIdx) => {
    const questions = [...form.questions];
    const raw = questions[qIdx].samples[sIdx].rawArguments;
    try {
      questions[qIdx].samples[sIdx].arguments = JSON.parse(raw || '{}');
    } catch (e) {
      console.error('Invalid JSON for sample arguments:', e);
      questions[qIdx].samples[sIdx].arguments = {};
    }
    setForm({ ...form, questions });
  };

  // Add a test case
  const addTestCase = (qIdx) => {
    const questions = [...form.questions];
    questions[qIdx].testCases.push({ arguments: {}, output: '', rawArguments: '' });
    setForm({ ...form, questions });
  };

  // Delete a test case
  const deleteTestCase = (qIdx, tIdx) => {
    const questions = [...form.questions];
    questions[qIdx].testCases.splice(tIdx, 1);
    setForm({ ...form, questions });
  };

  // Update test case fields
  const updateTestCase = (qIdx, tIdx, field, value) => {
    const questions = [...form.questions];
    if (field === 'rawArguments') {
      questions[qIdx].testCases[tIdx][field] = value;
    } else if (field === 'output') {
      questions[qIdx].testCases[tIdx][field] = value;
    }
    setForm({ ...form, questions });
  };

  // Parse test case arguments on blur
  const parseTestCaseArguments = (qIdx, tIdx) => {
    const questions = [...form.questions];
    const raw = questions[qIdx].testCases[tIdx].rawArguments;
    try {
      questions[qIdx].testCases[tIdx].arguments = JSON.parse(raw || '{}');
    } catch (e) {
      console.error('Invalid JSON for test case arguments:', e);
      questions[qIdx].testCases[tIdx].arguments = {};
    }
    setForm({ ...form, questions });
  };

  // Add a new question
  const addQuestion = () => {
    setForm({
      ...form,
      questions: [...form.questions, {
        problemStatement: '',
        functionName: '',
        returnType: '',
        language: 'cpp',
        arguments: [{ name: '', type: '' }],
        samples: [{ arguments: {}, output: '', rawArguments: '' }],
        testCases: [{ arguments: {}, output: '', rawArguments: '' }],
        points: '',
      }]
    });
  };

  // Delete a question
  const deleteQuestion = (qIdx) => {
    const questions = [...form.questions];
    questions.splice(qIdx, 1);
    setForm({ ...form, questions });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedForm = { ...form };
    updatedForm.questions.forEach((q, qIdx) => {
      q.samples.forEach((_, sIdx) => parseSampleArguments(qIdx, sIdx));
      q.testCases.forEach((_, tIdx) => parseTestCaseArguments(qIdx, tIdx));
    });
    try {
      await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments`, updatedForm, { withCredentials: true });
      setForm({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        duration: '',
        questions: [{
          problemStatement: '',
          functionName: '',
          returnType: '',
          language: 'cpp',
          arguments: [{ name: '', type: '' }],
          samples: [{ arguments: {}, output: '', rawArguments: '' }],
          testCases: [{ arguments: {}, output: '', rawArguments: '' }],
          points: '',
        }],
      });
      const res = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments`, { withCredentials: true });
      setAssessments(res.data);
    } catch (error) {
      console.error('Failed to create assessment:', error);
    }
  };


  const viewResults = (id) => {
    setSelectedAssessmentId(id);
  };

  // Close the modal
  const closeResults = () => {
    setSelectedAssessmentId(null);
  };
  return (
    <div className="min-h-screen bg-gray-50 via-purple-50 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-2xl mb-10 transform transition-all hover:scale-[1.01]">
          <h3 className="text-2xl font-bold text-indigo-600 mb-6">Create New Assessment</h3>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateFormField('title', e.target.value)}
                placeholder="Assessment Title"
                required
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-gray-50"
              />
              <input
                type="number"
                value={form.duration}
                onChange={(e) => updateFormField('duration', e.target.value)}
                placeholder="Duration (minutes)"
                required
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-gray-50"
              />
            </div>
            <textarea
              value={form.description}
              onChange={(e) => updateFormField('description', e.target.value)}
              placeholder="Assessment Description"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-gray-50 min-h-[140px]"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="datetime-local"
                value={form.startTime}
                onChange={(e) => updateFormField('startTime', e.target.value)}
                required
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-gray-50"
              />
              <input
                type="datetime-local"
                value={form.endTime}
                onChange={(e) => updateFormField('endTime', e.target.value)}
                required
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-gray-50"
              />
            </div>

            {form.questions.map((q, qIdx) => (
              <div key={qIdx} className="relative bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-md animate-slide-in">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xl font-semibold text-gray-800">Question {qIdx + 1}</h4>
                  <button
                    type="button"
                    onClick={() => deleteQuestion(qIdx)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    disabled={form.questions.length === 1}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <textarea
                  value={q.problemStatement}
                  onChange={(e) => updateQuestionField(qIdx, 'problemStatement', e.target.value)}
                  placeholder="Problem Statement"
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-white mb-4 min-h-[100px]"
                />
                <input
                  type="text"
                  value={q.functionName}
                  onChange={(e) => updateQuestionField(qIdx, 'functionName', e.target.value)}
                  placeholder="Function Name (e.g., mergeArrays)"
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-white mb-4"
                />
                <input
                  type="text"
                  value={q.returnType}
                  onChange={(e) => updateQuestionField(qIdx, 'returnType', e.target.value)}
                  placeholder="Return Type (e.g., vector<int>)"
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-white mb-4"
                />
                <select
                  value={q.language}
                  onChange={(e) => updateQuestionField(qIdx, 'language', e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-white mb-4"
                >
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                </select>

                <div className="space-y-4 mb-6">
                  <h5 className="text-lg font-medium text-gray-700">Arguments</h5>
                  {q.arguments.map((arg, aIdx) => (
                    <div key={aIdx} className="flex space-x-3 items-center">
                      <input
                        type="text"
                        value={arg.name}
                        onChange={(e) => updateArgument(qIdx, aIdx, 'name', e.target.value)}
                        placeholder="Argument Name (e.g., nums1)"
                        required
                        className="w-1/2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                      />
                      <input
                        type="text"
                        value={arg.type}
                        onChange={(e) => updateArgument(qIdx, aIdx, 'type', e.target.value)}
                        placeholder="Argument Type (e.g., vector<int>)"
                        required
                        className="w-1/2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => deleteArgument(qIdx, aIdx)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        disabled={q.arguments.length === 1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArgument(qIdx)}
                    className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    <Plus size={16} className="mr-2" /> Add Argument
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <h5 className="text-lg font-medium text-gray-700">Sample Cases</h5>
                  {q.samples.map((s, sIdx) => (
                    <div key={sIdx} className="relative bg-white p-4 rounded-lg shadow-sm animate-fade-in transition-all">
                      <button
                        type="button"
                        onClick={() => deleteSample(qIdx, sIdx)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      <textarea
                        value={s.rawArguments}
                        onChange={(e) => updateSample(qIdx, sIdx, 'rawArguments', e.target.value)}
                        onBlur={() => parseSampleArguments(qIdx, sIdx)}
                        placeholder="Arguments (JSON format, e.g., {nums1: [[1,2]], nums2: [[3,4]]})"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all mb-2 min-h-[80px]"
                      />
                      <input
                        type="text"
                        value={s.output}
                        onChange={(e) => updateSample(qIdx, sIdx, 'output', e.target.value)}
                        placeholder="Expected Output (e.g., [[1,2,3,4]])"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all mb-2"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addSample(qIdx)}
                    className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    <Plus size={16} className="mr-2" /> Add Sample
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <h5 className="text-lg font-medium text-gray-700">Test Cases</h5>
                  {q.testCases.map((tc, tIdx) => (
                    <div key={tIdx} className="relative bg-white p-4 rounded-lg shadow-sm animate-fade-in transition-all">
                      <button
                        type="button"
                        onClick={() => deleteTestCase(qIdx, tIdx)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      <textarea
                        value={tc.rawArguments}
                        onChange={(e) => updateTestCase(qIdx, tIdx, 'rawArguments', e.target.value)}
                        onBlur={() => parseTestCaseArguments(qIdx, tIdx)}
                        placeholder="Arguments (JSON format, e.g., {nums1: [[1,2]], nums2: [[3,4]]})"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all mb-2 min-h-[80px]"
                      />
                      <input
                        type="text"
                        value={tc.output}
                        onChange={(e) => updateTestCase(qIdx, tIdx, 'output', e.target.value)}
                        placeholder="Expected Output (e.g., [[1,2,3,4]])"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all mb-2"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addTestCase(qIdx)}
                    className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    <Plus size={16} className="mr-2" /> Add Test Case
                  </button>
                </div>

                <input
                  type="number"
                  value={q.points}
                  onChange={(e) => updateQuestionField(qIdx, 'points', e.target.value)}
                  placeholder="Points"
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all mt-4"
                />
              </div>
            ))}
            <div className="flex space-x-6">
              <button
                type="button"
                onClick={addQuestion}
                className="flex-1 p-4 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105"
              >
                Add Question
              </button>
              <button
                type="submit"
                className="flex-1 p-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105"
              >
                Create Assessment
              </button>
            </div>
          </form>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Assessments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map((a) => (
            <div
              key={a._id}
              className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-[1.02]"
            >
              <span className="text-gray-800 font-medium">
                {a.title} <br />
                <span className="text-sm text-gray-500">
                  {new Date(a.startTime).toLocaleString()} - {new Date(a.endTime).toLocaleString()}
                </span>
              </span>
              <button
                onClick={() => viewResults(a._id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                View Results
              </button>
            </div>
          ))}
        </div>

        {selectedAssessmentId && (
          <ResultAnalysis assessmentId={selectedAssessmentId} onClose={closeResults} />
        )}
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease-out;
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MockAssessmentProfessorDashboard; */


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus } from 'lucide-react';
import ResultAnalysis from './mock-test-result';

const MockAssessmentProfessorDashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [activeTab, setActiveTab] = useState('ongoing'); // Tabs: ongoing, upcoming, completed
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    duration: '',
    questions: [{
      problemStatement: '',
      functionName: '',
      returnType: '',
      language: 'cpp',
      arguments: [{ name: '', type: '' }],
      samples: [{ arguments: {}, output: '', rawArguments: '' }],
      testCases: [{ arguments: {}, output: '', rawArguments: '' }],
      points: '',
    }],
  });

  useEffect(() => {
    axios.get(`${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments`, { withCredentials: true })
      .then((res) => setAssessments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const currentDate = new Date();

  // Filter assessments based on their status
  const ongoingAssessments = assessments.filter(a => 
    new Date(a.startTime) <= currentDate && new Date(a.endTime) >= currentDate
  );
  const upcomingAssessments = assessments.filter(a => 
    new Date(a.startTime) > currentDate
  );
  const completedAssessments = assessments.filter(a => 
    new Date(a.endTime) < currentDate
  );

  // Update top-level form fields
  const updateFormField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Update question fields
  const updateQuestionField = (qIdx, field, value) => {
    const questions = [...form.questions];
    questions[qIdx][field] = value;
    setForm({ ...form, questions });
  };

  // Add a new argument to a question
  const addArgument = (qIdx) => {
    const questions = [...form.questions];
    questions[qIdx].arguments.push({ name: '', type: '' });
    setForm({ ...form, questions });
  };

  // Remove an argument from a question
  const deleteArgument = (qIdx, aIdx) => {
    const questions = [...form.questions];
    questions[qIdx].arguments.splice(aIdx, 1);
    setForm({ ...form, questions });
  };

  // Update an argument's field (name or type)
  const updateArgument = (qIdx, aIdx, field, value) => {
    const questions = [...form.questions];
    questions[qIdx].arguments[aIdx][field] = value;
    setForm({ ...form, questions });
  };

  // Add a sample case
  const addSample = (qIdx) => {
    const questions = [...form.questions];
    questions[qIdx].samples.push({ arguments: {}, output: '', rawArguments: '' });
    setForm({ ...form, questions });
  };

  // Delete a sample case
  const deleteSample = (qIdx, sIdx) => {
    const questions = [...form.questions];
    questions[qIdx].samples.splice(sIdx, 1);
    setForm({ ...form, questions });
  };

  // Update sample case fields
  const updateSample = (qIdx, sIdx, field, value) => {
    const questions = [...form.questions];
    if (field === 'rawArguments') {
      questions[qIdx].samples[sIdx][field] = value;
    } else if (field === 'output') {
      questions[qIdx].samples[sIdx][field] = value;
    }
    setForm({ ...form, questions });
  };

  // Parse sample arguments on blur
  const parseSampleArguments = (qIdx, sIdx) => {
    const questions = [...form.questions];
    const raw = questions[qIdx].samples[sIdx].rawArguments;
    try {
      questions[qIdx].samples[sIdx].arguments = JSON.parse(raw || '{}');
    } catch (e) {
      console.error('Invalid JSON for sample arguments:', e);
      questions[qIdx].samples[sIdx].arguments = {};
    }
    setForm({ ...form, questions });
  };

  // Add a test case
  const addTestCase = (qIdx) => {
    const questions = [...form.questions];
    questions[qIdx].testCases.push({ arguments: {}, output: '', rawArguments: '' });
    setForm({ ...form, questions });
  };

  // Delete a test case
  const deleteTestCase = (qIdx, tIdx) => {
    const questions = [...form.questions];
    questions[qIdx].testCases.splice(tIdx, 1);
    setForm({ ...form, questions });
  };

  // Update test case fields
  const updateTestCase = (qIdx, tIdx, field, value) => {
    const questions = [...form.questions];
    if (field === 'rawArguments') {
      questions[qIdx].testCases[tIdx][field] = value;
    } else if (field === 'output') {
      questions[qIdx].testCases[tIdx][field] = value;
    }
    setForm({ ...form, questions });
  };

  // Parse test case arguments on blur
  const parseTestCaseArguments = (qIdx, tIdx) => {
    const questions = [...form.questions];
    const raw = questions[qIdx].testCases[tIdx].rawArguments;
    try {
      questions[qIdx].testCases[tIdx].arguments = JSON.parse(raw || '{}');
    } catch (e) {
      console.error('Invalid JSON for test case arguments:', e);
      questions[qIdx].testCases[tIdx].arguments = {};
    }
    setForm({ ...form, questions });
  };

  // Add a new question
  const addQuestion = () => {
    setForm({
      ...form,
      questions: [...form.questions, {
        problemStatement: '',
        functionName: '',
        returnType: '',
        language: 'cpp',
        arguments: [{ name: '', type: '' }],
        samples: [{ arguments: {}, output: '', rawArguments: '' }],
        testCases: [{ arguments: {}, output: '', rawArguments: '' }],
        points: '',
      }]
    });
  };

  // Delete a question
  const deleteQuestion = (qIdx) => {
    const questions = [...form.questions];
    questions.splice(qIdx, 1);
    setForm({ ...form, questions });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedForm = { ...form };
    updatedForm.questions.forEach((q, qIdx) => {
      q.samples.forEach((_, sIdx) => parseSampleArguments(qIdx, sIdx));
      q.testCases.forEach((_, tIdx) => parseTestCaseArguments(qIdx, tIdx));
    });
    try {
      await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments`, updatedForm, { withCredentials: true });
      setForm({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        duration: '',
        questions: [{
          problemStatement: '',
          functionName: '',
          returnType: '',
          language: 'cpp',
          arguments: [{ name: '', type: '' }],
          samples: [{ arguments: {}, output: '', rawArguments: '' }],
          testCases: [{ arguments: {}, output: '', rawArguments: '' }],
          points: '',
        }],
      });
      setShowForm(false); // Close form after submission
      const res = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments`, { withCredentials: true });
      setAssessments(res.data);
    } catch (error) {
      console.error('Failed to create assessment:', error);
    }
  };

 

  // View assessment results
  const viewResults = (id) => {
    setSelectedAssessmentId(id);
  };

  // Close the modal
  const closeResults = () => {
    setSelectedAssessmentId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 via-purple-50 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-between items-center flex-col lg:flex-row p-4 rounded-t-lg">
          <h2 className="text-3xl font-bold text-custom-blue capitalize">
            <span className="text-black">{activeTab}</span> Assessments
          </h2>
          <div className="flex border border-gray-300 rounded-3xl lg:mt-0 bg-white mt-10">
            <button
              className={`px-4 py-2 rounded-3xl ${activeTab === 'ongoing' ? 'bg-custom-blue text-white' : 'bg-white'}`}
              onClick={() => setActiveTab('ongoing')}
            >
              Ongoing
            </button>
            <button
              className={`px-4 py-2 rounded-3xl ${activeTab === 'upcoming' ? 'bg-custom-blue text-white' : 'bg-white'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`px-4 py-2 rounded-3xl ${activeTab === 'completed' ? 'bg-custom-blue text-white' : 'bg-white'}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Create Mock Test Button */}
        {!showForm && (
          <div className="mb-10 flex justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="bg-custom-blue text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 flex items-center"
            >
              <Plus size={20} className="mr-2" /> Create Mock Test
            </button>
          </div>
        )}

        {/* Form (shown only when showForm is true) */}
        {showForm && (
          <div className="bg-white p-8 rounded-2xl shadow-2xl mb-10 transform transition-all hover:scale-[1.01]">
            <h3 className="text-2xl font-bold text-ccustom-blue mb-6">Create New Assessment</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateFormField('title', e.target.value)}
                  placeholder="Assessment Title"
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-gray-50"
                />
                <input
                  type="number"
                  value={form.duration}
                  onChange={(e) => updateFormField('duration', e.target.value)}
                  placeholder="Duration (minutes)"
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-gray-50"
                />
              </div>
              <textarea
                value={form.description}
                onChange={(e) => updateFormField('description', e.target.value)}
                placeholder="Assessment Description"
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-gray-50 min-h-[140px]"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="datetime-local"
                  value={form.startTime}
                  onChange={(e) => updateFormField('startTime', e.target.value)}
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-gray-50"
                />
                <input
                  type="datetime-local"
                  value={form.endTime}
                  onChange={(e) => updateFormField('endTime', e.target.value)}
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-gray-50"
                />
              </div>

              {form.questions.map((q, qIdx) => (
                <div key={qIdx} className="relative bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-md animate-slide-in">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-semibold text-gray-800">Question {qIdx + 1}</h4>
                    <button
                      type="button"
                      onClick={() => deleteQuestion(qIdx)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      disabled={form.questions.length === 1}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <textarea
                    value={q.problemStatement}
                    onChange={(e) => updateQuestionField(qIdx, 'problemStatement', e.target.value)}
                    placeholder="Problem Statement"
                    required
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-white mb-4 min-h-[100px]"
                  />
                  <input
                    type="text"
                    value={q.functionName}
                    onChange={(e) => updateQuestionField(qIdx, 'functionName', e.target.value)}
                    placeholder="Function Name (e.g., mergeArrays)"
                    required
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-white mb-4"
                  />
                  <input
                    type="text"
                    value={q.returnType}
                    onChange={(e) => updateQuestionField(qIdx, 'returnType', e.target.value)}
                    placeholder="Return Type (e.g., vector<int>)"
                    required
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-white mb-4"
                  />
                  <select
                    value={q.language}
                    onChange={(e) => updateQuestionField(qIdx, 'language', e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all bg-white mb-4"
                  >
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                  </select>

                  <div className="space-y-4 mb-6">
                    <h5 className="text-lg font-medium text-gray-700">Arguments</h5>
                    {q.arguments.map((arg, aIdx) => (
                      <div key={aIdx} className="flex space-x-3 items-center">
                        <input
                          type="text"
                          value={arg.name}
                          onChange={(e) => updateArgument(qIdx, aIdx, 'name', e.target.value)}
                          placeholder="Argument Name (e.g., nums1)"
                          required
                          className="w-1/2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                        />
                        <input
                          type="text"
                          value={arg.type}
                          onChange={(e) => updateArgument(qIdx, aIdx, 'type', e.target.value)}
                          placeholder="Argument Type (e.g., vector<int>)"
                          required
                          className="w-1/2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => deleteArgument(qIdx, aIdx)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          disabled={q.arguments.length === 1}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArgument(qIdx)}
                      className="flex items-center px-4 py-2 bg-custom-blue text-white rounded-lg transition-colors"
                    >
                      <Plus size={16} className="mr-2" /> Add Argument
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <h5 className="text-lg font-medium text-gray-700">Sample Cases</h5>
                    {q.samples.map((s, sIdx) => (
                      <div key={sIdx} className="relative bg-white p-4 rounded-lg shadow-sm animate-fade-in transition-all">
                        <button
                          type="button"
                          onClick={() => deleteSample(qIdx, sIdx)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                        <textarea
                          value={s.rawArguments}
                          onChange={(e) => updateSample(qIdx, sIdx, 'rawArguments', e.target.value)}
                          onBlur={() => parseSampleArguments(qIdx, sIdx)}
                          placeholder="Arguments (JSON format, e.g., {nums1: [[1,2]], nums2: [[3,4]]})"
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all mb-2 min-h-[80px]"
                        />
                        <input
                          type="text"
                          value={s.output}
                          onChange={(e) => updateSample(qIdx, sIdx, 'output', e.target.value)}
                          placeholder="Expected Output (e.g., [[1,2,3,4]])"
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all mb-2"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addSample(qIdx)}
                      className="flex items-center px-4 py-2 bg-custom-blue text-white rounded-lg transition-colors"
                    >
                      <Plus size={16} className="mr-2" /> Add Sample
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <h5 className="text-lg font-medium text-gray-700">Test Cases</h5>
                    {q.testCases.map((tc, tIdx) => (
                      <div key={tIdx} className="relative bg-white p-4 rounded-lg shadow-sm animate-fade-in transition-all">
                        <button
                          type="button"
                          onClick={() => deleteTestCase(qIdx, tIdx)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                        <textarea
                          value={tc.rawArguments}
                          onChange={(e) => updateTestCase(qIdx, tIdx, 'rawArguments', e.target.value)}
                          onBlur={() => parseTestCaseArguments(qIdx, tIdx)}
                          placeholder="Arguments (JSON format, e.g., {nums1: [[1,2]], nums2: [[3,4]]})"
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all mb-2 min-h-[80px]"
                        />
                        <input
                          type="text"
                          value={tc.output}
                          onChange={(e) => updateTestCase(qIdx, tIdx, 'output', e.target.value)}
                          placeholder="Expected Output (e.g., [[1,2,3,4]])"
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all mb-2"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addTestCase(qIdx)}
                      className="flex items-center px-4 py-2 bg-custom-blue text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      <Plus size={16} className="mr-2" /> Add Test Case
                    </button>
                  </div>

                  <input
                    type="number"
                    value={q.points}
                    onChange={(e) => updateQuestionField(qIdx, 'points', e.target.value)}
                    placeholder="Points"
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all mt-4"
                  />
                </div>
              ))}
              <div className="flex space-x-6">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="flex-1 p-4 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105"
                >
                  Add Question
                </button>
                <button
                  type="submit"
                  className="flex-1 p-4 bg-custom-blue text-white rounded-xl transition-all transform hover:scale-105"
                >
                  Create Assessment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab Content */}
        <div className="container mx-auto px-4 py-6">
          {activeTab === 'ongoing' && (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ongoingAssessments.map((a) => (
                <div
                  key={a._id}
                  className="bg-white border border-custom-blue rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 hover:border-indigo-400 duration-300 cursor-pointer overflow-hidden py-4"
                >
                  <h4 className="text-md font-medium text-gray-700 text-center px-4">{a.title}</h4>
                  <div className="text-sm text-gray-600 text-center space-y-1 p-4">
                    <p>{new Date(a.startTime).toLocaleString()} - {new Date(a.endTime).toLocaleString()}</p>
                    <button
                      onClick={() => viewResults(a._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      View Results
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'upcoming' && (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {upcomingAssessments.map((a) => (
                <div
                  key={a._id}
                  className="bg-white border border-indigo-600 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 hover:border-indigo-400 duration-300 cursor-pointer overflow-hidden py-4"
                >
                  <h4 className="text-md font-medium text-gray-700 text-center px-4">{a.title}</h4>
                  <div className="text-sm text-gray-600 text-center space-y-1 p-4">
                    <p>{new Date(a.startTime).toLocaleString()} - {new Date(a.endTime).toLocaleString()}</p>
                    <button
                      onClick={() => viewResults(a._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      View Results
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'completed' && (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {completedAssessments.map((a) => (
                <div
                  key={a._id}
                  className="bg-white border border-indigo-600 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 hover:border-indigo-400 duration-300 cursor-pointer overflow-hidden py-4"
                >
                  <h4 className="text-md font-medium text-gray-700 text-center px-4">{a.title}</h4>
                  <div className="text-sm text-gray-600 text-center space-y-1 p-4">
                    <p>{new Date(a.startTime).toLocaleString()} - {new Date(a.endTime).toLocaleString()}</p>
                    <button
                      onClick={() => viewResults(a._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      View Results
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Render ResultAnalysis modal */}
        {selectedAssessmentId && (
          <ResultAnalysis assessmentId={selectedAssessmentId} onClose={closeResults} />
        )}
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease-out;
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MockAssessmentProfessorDashboard;