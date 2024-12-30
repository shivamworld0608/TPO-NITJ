import React from 'react';

const notifications = [
  { id: 1, message: 'TPO meeting scheduled for 2023-11-10 at 10:00 AM' },
  { id: 2, message: 'New internship opportunities available at Company X' },
];

const placements = [
  { id: 1, student: 'John Doe', company: 'Company A', position: 'Software Engineer' },
  { id: 2, student: 'Jane Smith', company: 'Company B', position: 'Data Analyst' },
];

const internships = [
  { id: 1, student: 'Alice Johnson', company: 'Company C', position: 'Marketing Intern' },
  { id: 2, student: 'Bob Brown', company: 'Company D', position: 'Finance Intern' },
];

const Home = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center tracking-wide">
        Welcome to
        <span className="bg-custom-blue text-transparent bg-clip-text">
          {" "}Student Dashboard
        </span>
      </h1>
      <br />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Notifications */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Notifications</h3>
          <ul className="list-disc list-inside space-y-2">
            {notifications.map((notification) => (
              <li key={notification.id} className="text-gray-700">
                {notification.message}
              </li>
            ))}
          </ul>
        </div>

        {/* Placements */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Placements</h3>
          <ul className="list-disc list-inside space-y-2">
            {placements.map((placement) => (
              <li key={placement.id} className="text-gray-700">
                {placement.student} placed at {placement.company} as {placement.position}
              </li>
            ))}
          </ul>
        </div>

        {/* Internships */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Internships</h3>
          <ul className="list-disc list-inside space-y-2">
            {internships.map((internship) => (
              <li key={internship.id} className="text-gray-700">
                {internship.student} interned at {internship.company} as {internship.position}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;