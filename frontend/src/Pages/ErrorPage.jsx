import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-custom-blue">500</h1>
          <div className="animate-bounce mt-4">
            <svg className="w-16 h-16 mx-auto text-custom-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Oops! Something went wrong
        </h2>
        
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. Our team has been notified and is working to fix the issue.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 bg-custom-blue hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 mx-2"
          >
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 bg-white border-2 border-custom-blue text-custom-blue hover:bg-blue-50 font-medium rounded-lg transition-colors duration-200 mx-2"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;