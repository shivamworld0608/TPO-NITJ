import React from 'react';
import { Cloud, Box, AlertCircle } from 'lucide-react';
import Header from "../components/header";

const illustrations = {
  box: (
    <div className="relative">
      <Cloud className="w-12 h-12 text-gray-300 absolute -top-6 -right-4 animate-bounce-slow" />
      <Cloud className="w-8 h-8 text-gray-300 absolute -top-2 -left-6 animate-bounce-slower" />
      <Box className="w-20 h-20 text-indigo-400" />
    </div>
  ),
  error: <AlertCircle className="w-20 h-20 text-yellow-400" />,
};

const NoDataFound = ({
  type = 'box',
  message = 'No Data to show',
  subMessage = 'Sit back and relax till new data is added !',
  className = '',
  customIllustration = null,
  accentColor = 'indigo',
}) => {
  return (
    <>
    <Header/>
    <div 
      className={`
        flex flex-col items-center justify-center p-8 w-full
        min-h-[300px] transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      {/* Animated background with gradient */}
      <div className={`
        relative rounded-full p-16 mb-8
        bg-gradient-to-b from-${accentColor}-50 to-${accentColor}-100/10
        animate-pulse-slow
      `}>
        {/* Inner circle with blur effect */}
        <div className={`
          absolute inset-0 rounded-full
          bg-${accentColor}-100/20 blur-xl
          transform animate-blob
        `} />
        
        {/* Illustration */}
        <div className="relative transform hover:scale-110 transition-transform duration-300">
          {customIllustration || illustrations[type]}
        </div>
      </div>

      {/* Message with subtle animation */}
      <div className="text-center space-y-3 max-w-sm animate-fade-in">
        <h3 className={`
          text-xl font-semibold text-gray-700
          tracking-wide transform hover:scale-105 transition-transform duration-300
        `}>
          {message}
        </h3>
        
        <p className="text-gray-500 leading-relaxed">
          {subMessage}
        </p>
      </div>
    </div>
    </>
  );
};



export default NoDataFound;