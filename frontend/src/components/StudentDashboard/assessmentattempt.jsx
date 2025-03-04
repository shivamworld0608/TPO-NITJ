/* import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import Split from 'react-split';
import NITJlogo from "../../assets/nitj-logo.png";
import { FaUndo, FaCode } from 'react-icons/fa'; // Import icons for reset and format

const AssessmentAttempt = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null); // Changed from output to result for clarity
  const [showWarning, setShowWarning] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [selectedSample, setSelectedSample] = useState(0);
  const hasLeftOnce = useRef(false);

  const defaultTemplates = {
    cpp: `#include<bits/stdc++.h>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
    java: `public class Main {
    public static void main(String[] args) {
        // Your code here
    }
}`,
    python: `# Your code here`,
  };

  useEffect(() => {
    let timer;
    const fetchAttempt = async () => {
      try {
        setLoading(true);
        const attemptRes = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/attempts/${attemptId}`,
          { withCredentials: true }
        );
        setAttempt(attemptRes.data);

        const assessRes = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments/${attemptRes.data.assessment}`,
          { withCredentials: true }
        );
        setAssessment(assessRes.data);

        const endTime = Math.min(
          new Date(attemptRes.data.startTime).getTime() + assessRes.data.duration * 60000,
          new Date(assessRes.data.endTime).getTime()
        );
        const now = Date.now();
        const timeRemaining = Math.max(0, Math.floor((endTime - now) / 1000));
        setTimeLeft(timeRemaining);

        const savedCode = localStorage.getItem(`code_${attemptId}_${currentQuestion}`);
        setCode(savedCode || defaultTemplates[language]);

        const subsRes = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/attempts/${attemptId}/submissions`,
          { withCredentials: true }
        );
        setSubmissions(subsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load assessment data');
      } finally {
        setLoading(false);
      }
    };

    fetchAttempt();

    const incrementTabSwitch = () => {
      if (!hasLeftOnce.current) {
        axios.post(
          `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/attempts/tab-switch`,
          { attemptId },
          { withCredentials: true }
        )
          .then(() => {
            setTabSwitchCount((prev) => {
              const newCount = prev + 1;
              if (newCount === 1) setShowWarning(true);
              else if (newCount > 1) finishAttempt(true);
              return newCount;
            });
            hasLeftOnce.current = true;
          })
          .catch((err) => console.error('Tab switch error:', err));
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && !hasLeftOnce.current) incrementTabSwitch();
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          finishAttempt();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(timer);
    };
  }, [attemptId, currentQuestion, language]);

  const finishAttempt = async (disqualified = false) => {
    try {
      await axios.put(
        `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/attempts/${attemptId}`,
        { status: disqualified ? 'disqualified' : 'completed' },
        { withCredentials: true }
      );
      navigate('/sdashboard/home');
    } catch (err) {
      setError('Failed to finish attempt');
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/attempts/submit`,
        { attemptId, questionIndex: currentQuestion, code, language },
        { withCredentials: true }
      );
      setSubmissions([...submissions, res.data]);
      setResult(res.data); // Store full result object
    } catch (err) {
      setError('Failed to submit code');
      setResult({ error: err.response?.data?.message || 'Submission failed' });
    }
  };

  const runSampleInput = async () => {
    try {
      const selectedSampleData = assessment.questions[currentQuestion].samples[selectedSample];
      const res = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/attempts/run`,
        {
          attemptId,
          questionIndex: currentQuestion,
          code,
          language,
          input: selectedSampleData.input,
        },
        { withCredentials: true }
      );
      setResult(res.data); // Store full result object
    } catch (err) {
      setError('Failed to run sample input');
      setResult({ error: err.response?.data?.message || 'Failed to run sample input' });
    }
  };

  const saveCode = (value) => {
    setCode(value);
    localStorage.setItem(`code_${attemptId}_${currentQuestion}`, value);
  };

  const formatCode = (code) => {
    // Simple formatting (e.g., ensuring consistent indentation)
    return code
      .split('\n')
      .map(line => line.trim())
      .join('\n')
      .replace(/\s+$/, ''); // Remove trailing whitespace
    // For better formatting, uncomment and use prettier:
    // const prettier = require('prettier');
    // return prettier.format(code, { parser: 'babel', tabWidth: 2 });
  };

  const closeWarning = () => setShowWarning(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error && !result) {
    return (
      <div className="text-center p-6 text-red-600 bg-red-100 rounded-lg max-w-md mx-auto mt-10">
        <p className="font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="text-center p-6 text-gray-600 bg-gray-100 rounded-lg max-w-md mx-auto mt-10">
        <p className="font-semibold">No assessment data available</p>
      </div>
    );
  }

  const currentSamples = assessment.questions[currentQuestion].samples;

  // Helper to format Judge0-style results
  const formatResult = (result) => {
    if (!result) return 'No result yet';
    if (result.error) return `Error: ${result.error}`;
    if (Array.isArray(result)) {
      return result.map((r, idx) => (
        `Test Case ${idx + 1}:\n` +
        `Status: ${r.status?.description || 'Unknown'}\n` +
        `Output: ${r.stdout || 'None'}\n` +
        (r.stderr ? `Error: ${r.stderr}\n` : '') +
        `Time: ${r.time || 'N/A'}s, Memory: ${r.memory || 'N/A'} KB`
      )).join('\n\n');
    }
    return `Output: ${result.output || 'None'}`; // Fallback for simpler responses
  };

  // Function to handle copy prevention
  const handleCopy = (e) => {
    e.preventDefault();
    const message = "Please don't copy questions during test @TPO-NITJ";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(message).catch(err => console.error('Failed to write to clipboard:', err));
    } else {
      // Fallback for older browsers
      document.execCommand('copy', false, message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f1f1f1;
        }
        @keyframes slide-in {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="flex items-center justify-between h-16 px-2">
          <div className="flex items-center">
            <img
              onClick={() => navigate('/sdashboard/home')}
              src={NITJlogo}
              alt="NITJ Logo"
              className="h-10 w-10 object-contain rounded cursor-pointer"
            />
            <h1 className="font-bold text-2xl tracking-wide ml-2">
              TPO-<span className="bg-custom-blue text-transparent bg-clip-text">NITJ</span>
            </h1>
          </div>
          <div className="flex items-center">
            <div className="flex items-end gap-[2px] h-5 mr-4">
              <div className={`w-1 ${isOnline ? 'bg-green-500' : 'bg-red-500'} h-1/4`}></div>
              <div className={`w-1 ${isOnline ? 'bg-green-500' : 'bg-red-500'} h-1/2`}></div>
              <div className={`w-1 ${isOnline ? 'bg-green-500' : 'bg-red-500'} h-3/4`}></div>
              <div className={`w-1 ${isOnline ? 'bg-green-500' : 'bg-red-500'} h-full`}></div>
            </div>
            <p className="text-lg font-medium text-gray-700 mr-4">
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </p>
            <button
              onClick={() => finishAttempt()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
            >
              End Test
            </button>
          </div>
        </div>
      </header>

      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg transform transition-all duration-300 scale-105">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">Warning: Tab Switch Detected</h3>
            <p className="text-gray-600 mt-2 text-center">
              You have switched tabs during this assessment. Please stay on this page.<br />
              <span className="font-bold text-red-600">A second tab switch will result in disqualification.</span>
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={closeWarning}
                className="px-6 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-16 bg-white shadow-md flex flex-col items-center py-4 fixed h-full top-16 left-0 z-40">
        {assessment.questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentQuestion(idx)}
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
              currentQuestion === idx
                ? 'bg-custom-blue text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${timeLeft <= 0 ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={timeLeft <= 0}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <div className="fixed top-16 left-16 right-0 bottom-0">
        <Split
          className="flex h-full"
          sizes={[35, 65]}
          minSize={300}
          gutterSize={8}
          cursor="col-resize"
        >
          <div className="bg-white p-5 h-full overflow-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 animate-slide-in">
              Question {currentQuestion + 1}
            </h3>
            <p
              className="text-gray-700 mb-4 user-select-text"
              onCopy={handleCopy}
            >
              {assessment.questions[currentQuestion].problemStatement}
            </p>
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Sample Cases</h4>
              {currentSamples.map((sample, idx) => (
                <div
                  key={idx}
                  className={`p-2 mb-4 rounded-md ${selectedSample === idx ? 'bg-blue-50' : 'bg-white'}`}
                  onClick={() => setSelectedSample(idx)}
                >
                  <p className="text-sm text-gray-600"><strong>Input:</strong> {sample.input}</p>
                  <p className="text-sm text-gray-600"><strong>Output:</strong> {sample.output}</p>
                  {sample.description && (
                    <p className="text-sm text-gray-500 mt-1"><strong>Description:</strong> {sample.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col h-full">
          <div className="mb-1 flex items-center justify-between">
  <select
    value={language}
    onChange={(e) => {
      setLanguage(e.target.value);
      setCode(defaultTemplates[e.target.value]); // Reset to default template when language changes
    }}
    className="p-1 border border-gray-200 rounded-lg bg-white text-gray-700"
  >
    <option value="cpp">C++</option>
    <option value="java">Java</option>
    <option value="python">Python</option>
  </select>
  <div className="flex items-center gap-2">
    <button
      onClick={() => setCode(defaultTemplates[language])} // Reset to initial state for current language
      title="Reset Code"
      className="p-1 rounded-lg hover:bg-gray-200 transition-all duration-200"
      disabled={timeLeft <= 0}
    >
      <FaUndo className={`text-gray-500 ${timeLeft <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`} size={15} />
    </button>
    <button
      onClick={() => {
        const formattedCode = formatCode(code);
        setCode(formattedCode);
      }}
      title="Format Code"
      className="p-1 rounded-lg hover:bg-gray-200 transition-all duration-200"
      disabled={timeLeft <= 0}
    >
      <FaCode className={`text-gray-500 ${timeLeft <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`} size={15} />
    </button>
  </div>
</div>

            <Split
              direction="vertical"
              className="flex flex-col h-full"
              sizes={[70, 30]}
              minSize={100}
              gutterSize={8}
              cursor="row-resize"
            >
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <CodeMirror
                  value={code}
                  height="100%"
                  extensions={[
                    language === 'cpp' ? cpp() : language === 'java' ? java() : python(),
                  ]}
                  onChange={saveCode}
                  editable={timeLeft > 0}
                  className="border-0"
                  theme="light"
                />
              </div>

              <div className="bg-white p-4 h-full overflow-auto flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">Sample Test Case #{selectedSample + 1}</h4>
                  <div className="flex gap-4">
                    <button
                      onClick={runSampleInput}
                      disabled={timeLeft <= 0}
                      className={`px-6 py-2 rounded-lg text-white font-semibold transition-all duration-200 bg-custom-blue ${
                        timeLeft <= 0 ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    >
                      Run Sample
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={timeLeft <= 0}
                      className={`px-6 py-2 rounded-lg text-white font-semibold transition-all duration-200 ${
                        timeLeft <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      Submit Code
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex gap-2 mb-2">
                    {currentSamples.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSample(idx)}
                        className={`px-4 py-1 rounded-lg font-medium transition-all duration-200 ${
                          selectedSample === idx
                            ? 'bg-custom-blue text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        disabled={timeLeft <= 0}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-600"><strong>Input:</strong> {currentSamples[selectedSample].input}</p>
                    <p className="text-sm text-gray-600"><strong>Output:</strong> {currentSamples[selectedSample].output}</p>
                  </div>
                </div>
                {result && (
                  <div className="bg-gray-100 p-4 rounded-lg flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Result</h4>
                    <pre className="text-gray-700 whitespace-pre-wrap">{formatResult(result)}</pre>
                  </div>
                )}
              </div>
            </Split>
          </div>
        </Split>
      </div>
    </div>
  );
};

export default AssessmentAttempt; */

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import Split from 'react-split';
import NITJlogo from "../../assets/nitj-logo.png";
import { FaUndo, FaCode, FaArrowLeft } from 'react-icons/fa';

const AssessmentAttempt = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [runResult, setRunResult] = useState(null); // For run code results
  const [submitResult, setSubmitResult] = useState(null); // For submit code results
  const [showWarning, setShowWarning] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [selectedSample, setSelectedSample] = useState(0);
  const [viewMode, setViewMode] = useState('samples');
  const hasLeftOnce = useRef(false);

  // Generate default templates dynamically based on question data
  const generateDefaultTemplate = (question) => {
    const args = question.arguments.map(arg => `${arg.type} ${arg.name}`).join(', ');
    const signature = `${question.returnType} ${question.functionName}(${args})`;

    switch (question.language) {
      case 'cpp':
        return `#include <bits/stdc++.h>
using namespace std;

${signature} {
  // Write your logic here
}\n`;
      case 'java':
        return `public ${signature} {
  // Write your logic here
}\n`;
      case 'python':
        return `def ${question.functionName}(${question.arguments.map(arg => arg.name).join(', ')}):
  # Write your logic here
  pass\n`;
      default:
        return '// Invalid language\n';
    }
  };

  useEffect(() => {
    let timer;
    const fetchAttempt = async () => {
      try {
        setLoading(true);
        const attemptRes = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/attempts/${attemptId}`,
          { withCredentials: true }
        );
        setAttempt(attemptRes.data);

        const assessRes = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/assessments/${attemptRes.data.assessment}`,
          { withCredentials: true }
        );
        setAssessment(assessRes.data);

        const endTime = Math.min(
          new Date(attemptRes.data.startTime).getTime() + assessRes.data.duration * 60000,
          new Date(assessRes.data.endTime).getTime()
        );
        const now = Date.now();
        const timeRemaining = Math.max(0, Math.floor((endTime - now) / 1000));
        setTimeLeft(timeRemaining);

        const currentQuestionData = assessRes.data.questions[currentQuestion];
        const defaultTemplate = generateDefaultTemplate(currentQuestionData);
        const savedCode = localStorage.getItem(`code_${attemptId}_${currentQuestion}`);
        setCode(savedCode || defaultTemplate);

      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load assessment data');
      } finally {
        setLoading(false);
      }
    };

    fetchAttempt();

    const incrementTabSwitch = () => {
      if (!hasLeftOnce.current) {
        axios.post(
          `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/attempts/tab-switch`,
          { attemptId },
          { withCredentials: true }
        )
          .then(() => {
            setTabSwitchCount((prev) => {
              const newCount = prev + 1;
              if (newCount === 1) setShowWarning(true);
              else if (newCount > 1) finishAttempt(true);
              return newCount;
            });
            hasLeftOnce.current = true;
          })
          .catch((err) => console.error('Tab switch error:', err));
      }
    };

    document.addEventListener('visibilitychange', () => document.hidden && incrementTabSwitch());
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          finishAttempt();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      document.removeEventListener('visibilitychange', () => {});
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
      clearInterval(timer);
    };
  }, [attemptId, currentQuestion]);

  const finishAttempt = async (disqualified = false) => {
    try {
      await axios.put(
        `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/attempts/${attemptId}`,
        { status: disqualified ? 'disqualified' : 'completed' },
        { withCredentials: true }
      );
      navigate('/sdashboard/home');
    } catch (err) {
      setError('Failed to finish attempt');
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/attempts/submit`,
        {
          attemptId,
          questionIndex: currentQuestion,
          code,
          language: assessment.questions[currentQuestion].language,
        },
        { withCredentials: true }
      );
      setSubmissions([...submissions, res.data]);
      setSubmitResult(res.data);
      setViewMode('submission');
    } catch (err) {
      setError('Failed to submit code');
      setSubmitResult({ error: err.response?.data?.message || 'Submission failed' });
    }
  };

  const runSampleInput = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/mock-assessment/attempts/run`,
        {
          attemptId,
          questionIndex: currentQuestion,
          code,
          language: assessment.questions[currentQuestion].language,
        },
        { withCredentials: true }
      );
      setRunResult({
        status: res.data.status,
        message: res.data.message, // Array of results for each sample case
        runtime: res.data.runtime,
      });
    } catch (err) {
      setError('Failed to run sample input');
      setRunResult({ error: err.response?.data?.message || 'Failed to run sample input' });
    }
  };

  const saveCode = (value) => {
    setCode(value);
    localStorage.setItem(`code_${attemptId}_${currentQuestion}`, value);
  };

  const formatCode = (code) => {
    return code.split('\n').map(line => line.trim()).join('\n').replace(/\s+$/, '');
  };

  const closeWarning = () => setShowWarning(false);

  const goBackToSamples = () => {
    setViewMode('samples');
    setSubmitResult(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error && !submitResult) {
    return (
      <div className="text-center p-6 text-red-600 bg-red-100 rounded-lg max-w-md mx-auto mt-10">
        <p className="font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="text-center p-6 text-gray-600 bg-gray-100 rounded-lg max-w-md mx-auto mt-10">
        <p className="font-semibold">No assessment data available</p>
      </div>
    );
  }

  const currentQuestionData = assessment.questions[currentQuestion];
  const currentSamples = currentQuestionData.samples;

  const getFunctionSignature = () => {
    const args = currentQuestionData.arguments.map(arg => `${arg.type} ${arg.name}`).join(', ');
    return `${currentQuestionData.returnType} ${currentQuestionData.functionName}(${args})`;
  };

  const handleCopy = (e) => {
    e.preventDefault();
    const message = "Please don't copy questions during test @TPO-NITJ";
    navigator.clipboard?.writeText(message).catch(err => console.error('Clipboard error:', err));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="flex items-center justify-between h-16 px-2">
          <div className="flex items-center">
            <img
              onClick={() => navigate('/sdashboard/home')}
              src={NITJlogo}
              alt="NITJ Logo"
              className="h-10 w-10 object-contain rounded cursor-pointer"
            />
            <h1 className="font-bold text-2xl tracking-wide ml-2">
              TPO-<span className="bg-blue-600 text-transparent bg-clip-text">NITJ</span>
            </h1>
          </div>
          <div className="flex items-center">
            <div className="flex items-end gap-[2px] h-5 mr-4">
              <div className={`w-1 ${isOnline ? 'bg-green-500' : 'bg-red-500'} h-1/4`}></div>
              <div className={`w-1 ${isOnline ? 'bg-green-500' : 'bg-red-500'} h-1/2`}></div>
              <div className={`w-1 ${isOnline ? 'bg-green-500' : 'bg-red-500'} h-3/4`}></div>
              <div className={`w-1 ${isOnline ? 'bg-green-500' : 'bg-red-500'} h-full`}></div>
            </div>
            <p className="text-lg font-medium text-gray-700 mr-4">
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </p>
            <button
              onClick={() => finishAttempt()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
            >
              End Test
            </button>
          </div>
        </div>
      </header>

      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg transform transition-all duration-300 scale-105">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">Warning: Tab Switch Detected</h3>
            <p className="text-gray-600 mt-2 text-center">
              You have switched tabs during this assessment. Please stay on this page.<br />
              <span className="font-bold text-red-600">A second tab switch will result in disqualification.</span>
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={closeWarning}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-16 bg-white shadow-md flex flex-col items-center py-4 fixed h-full top-16 left-0 z-40">
        {assessment.questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentQuestion(idx)}
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
              currentQuestion === idx
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${timeLeft <= 0 ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={timeLeft <= 0}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <div className="fixed top-16 left-16 right-0 bottom-0">
        <Split className="flex h-full" sizes={[35, 65]} minSize={300} gutterSize={8} cursor="col-resize">
          <div className="bg-white p-5 h-full overflow-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 transition-transform duration-500 ease-out">
              Question {currentQuestion + 1}
            </h3>
            <p className="text-gray-700 mb-4 user-select-text" onCopy={handleCopy}>
              {currentQuestionData.problemStatement}
            </p>
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Sample Cases</h4>
              {currentSamples.map((sample, idx) => (
                <div
                  key={idx}
                  className={`p-2 mb-4 rounded-md`}
                  onClick={() => setSelectedSample(idx)}
                >
                  <p className="text-sm text-gray-600">
                    <strong>Arguments:</strong> {JSON.stringify(sample.arguments || {})}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Output:</strong> {sample.output}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="mb-1 flex items-center justify-between">
              <span className="p-1 text-gray-700 font-medium">
                Language: {currentQuestionData.language}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCode(generateDefaultTemplate(currentQuestionData))}
                  title="Reset Code"
                  className="p-1 rounded-lg hover:bg-gray-200 transition-all duration-200"
                  disabled={timeLeft <= 0}
                >
                  <FaUndo className={`text-gray-500 ${timeLeft <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`} size={15} />
                </button>
                <button
                  onClick={() => setCode(formatCode(code))}
                  title="Format Code"
                  className="p-1 rounded-lg hover:bg-gray-200 transition-all duration-200"
                  disabled={timeLeft <= 0}
                >
                  <FaCode className={`text-gray-500 ${timeLeft <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`} size={15} />
                </button>
              </div>
            </div>

            <Split
              direction="vertical"
              className="flex flex-col h-full"
              sizes={[70, 30]}
              minSize={100}
              gutterSize={8}
              cursor="col-resize"
            >
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <CodeMirror
                  value={code}
                  height="100%"
                  extensions={[
                    currentQuestionData.language === 'cpp' ? cpp() :
                    currentQuestionData.language === 'java' ? java() :
                    python(),
                  ]}
                  onChange={saveCode}
                  editable={timeLeft > 0}
                  className="border-0"
                  theme="light"
                />
              </div>

              <div className="bg-white p-4 h-full overflow-auto flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {runResult && viewMode === 'samples' && (
                      <span className={`text-xl font-bold mr-4 ${runResult.status === 'accepted' ? 'text-green-700' : 'text-red-700'}`}>
                        {runResult.status === 'accepted' ? 'Accepted' : 'Wrong Answer'}
                      </span>
                    )}
                    <h4 className="text-lg font-semibold text-gray-800">
                      {viewMode === 'samples' ? '' : 'Submission Result'}
                    </h4>
                  </div>
                  <div className="flex gap-4">
                    {viewMode === 'samples' ? (
                      <>
                        <button
                          onClick={runSampleInput}
                          disabled={timeLeft <= 0}
                          className={`px-6 py-2 rounded-lg text-white font-semibold transition-all duration-200 bg-blue-600 ${
                            timeLeft <= 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-700'
                          }`}
                        >
                          Run Sample
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={timeLeft <= 0}
                          className={`px-6 py-2 rounded-lg text-white font-semibold transition-all duration-200 ${
                            timeLeft <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                          }`}
                        >
                          Submit Code
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={goBackToSamples}
                        className="px-6 py-2 rounded-lg text-white font-semibold transition-all duration-200 bg-gray-600 hover:bg-gray-700 flex items-center"
                      >
                        <FaArrowLeft className="mr-2" /> Back
                      </button>
                    )}
                  </div>
                </div>

                {viewMode === 'samples' ? (
                  <div className="mb-4">
                    <div className="flex gap-2 mb-2">
                      {currentSamples.map((_, idx) => {
                        const sampleResult = runResult?.message?.[idx];
                        const isPassed = sampleResult?.status === 'accepted';
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedSample(idx)}
                            className={`px-4 py-1 rounded-lg font-medium transition-all duration-200 ${
                              selectedSample === idx
                                ? 'border border-custom-blue text-black'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                            disabled={timeLeft <= 0}
                          >
                            <span className="inline-flex items-center">
                              {runResult && (
                                <span className={`inline-block w-2 h-2 mr-1 rounded-full ${isPassed ? 'bg-green-500' : 'bg-red-500'}`}></span>
                              )}
                              Case {idx + 1}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-600">
                        <strong>Input:</strong> {JSON.stringify(currentSamples[selectedSample].arguments || {})}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Output:</strong> {runResult?.message?.[selectedSample]?.output || 'None'}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Expected:</strong> {currentSamples[selectedSample].output}
                      </p>
                    </div>
                  </div>
                ) : null}
                {submitResult && (
                  <div className={`bg-gray-100 p-4 rounded-lg flex-1 ${submitResult.status === 'accepted' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
                    <div dangerouslySetInnerHTML={{ __html: submitResult.message }} className="space-y-2" />
                    <p className={`mt-1 text-lg font-medium ${submitResult.status === 'accepted' ? 'text-green-700' : 'text-red-700'}`}>
                      {submitResult.status === 'accepted' ? 'All tests passed!' : 'Some tests failed.'}
                    </p>
                  </div>
                )}
              </div>
            </Split>
          </div>
        </Split>
      </div>
    </div>
  );
};

export default AssessmentAttempt;