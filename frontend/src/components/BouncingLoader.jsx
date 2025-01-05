import React from 'react';

const BouncingLoader = ({ 
  size = 'medium',
  text = 'Loading...',
  backgroundColor = 'bg-white',
  opacity = 80,
  balls = 3,
  colors = ['bg-blue-600', 'bg-blue-500', 'bg-blue-400'],
  textColor = 'text-blue-600',
  showProgressBar = true,
  bounceHeight = '1rem',
  speed = 1000
}) => {
  const sizeClasses = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-6 h-6'
  };

  const bounceKeyframes = `
    @keyframes customBounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-${bounceHeight});
      }
    }
  `;

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center ${backgroundColor} bg-opacity-${opacity}`}>
      <style>{bounceKeyframes}</style>
      <div className="flex items-center space-x-4">
        {[...Array(balls)].map((_, index) => (
          <div 
            key={index}
            className={`
              ${sizeClasses[size]} 
              rounded-full 
              ${colors[index % colors.length]}
              transform transition-all
              hover:scale-110 hover:brightness-110
            `}
            style={{ 
              animation: `customBounce ${speed}ms infinite`,
              animationDelay: `${(index * 200)}ms`,
              animationTimingFunction: 'cubic-bezier(0.28, 0.84, 0.42, 1)'
            }}
          />
        ))}
      </div>
      {text && (
        <div className="mt-6 text-center">
          <span className={`text-lg font-semibold ${textColor} animate-pulse`}>
            {text}
          </span>
          {showProgressBar && (
            <div className="mt-1 h-0.5 w-32 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default BouncingLoader;