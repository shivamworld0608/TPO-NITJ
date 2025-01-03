import React from 'react';
import { useNavigate } from 'react-router-dom';

const JAFButtons = () => {
  const navigate = useNavigate();

  const formButtons = [
    {
      id: 'intern-2',
      title: 'Job Application Form',
      subtitle: 'For Intern',
      duration: '2 month',
      route: '/recruiter/post-job/intern-2',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      borderColor: 'border-orange-200',
      icon: 'R₂'
    },
    {
      id: 'intern-6',
      title: 'Job Application Form',
      subtitle: 'For Intern',
      duration: '6 month',
      route: '/recruiter/post-job/intern-6',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      borderColor: 'border-purple-200',
      icon: 'R₂'
    },
    {
      id: 'placement',
      title: 'Job Application Form',
      subtitle: 'For Placement',
      duration: 'FTE',
      route: '/recruiter/post-job/placement',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      borderColor: 'border-green-200',
      icon: '💼'
    }
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {formButtons.map((button) => (
        <button
          key={button.id}
          onClick={() => navigate(button.route)}
          className={`flex items-center gap-4 p-4 rounded-lg border ${button.bgColor} ${button.borderColor} hover:shadow-md transition-all w-64`}
        >
          <div className={`${button.iconBg} w-10 h-10 rounded-lg flex items-center justify-center text-lg`}>
            {button.icon}
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium">{button.title}</h3>
            <p className="text-xs text-gray-600">{button.subtitle}</p>
            <p className="text-xs text-gray-500">{button.duration}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default JAFButtons;