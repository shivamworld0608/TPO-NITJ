import React from "react";

const StudentDashboard = () => {
  const notifications = [
    "TPO meeting scheduled for 2023-11-10 at 10:00 AM",
    "New internship opportunities at Company X",
    "New internship opportunities at Company Y",
    "New internship opportunities at Company Z",
  ];

  const departmentData = [
    { name: "CSE", offers: 150 },
    { name: "IT", offers: 110 },
    { name: "ECE", offers: 95 },
    { name: "EE", offers: 75 },
    { name: "ICE", offers: 65 },
    { name: "ME", offers: 45 },
    { name: "IPE", offers: 35 },
    { name: "Chemical", offers: 30 },
    { name: "TT", offers: 20 },
    { name: "BT", offers: 15 },
  ];

  const getBarColor = (index) => {
    const colors = [
      "bg-blue-500",
      "bg-blue-400",
      "bg-blue-300",
      "bg-blue-200",
      "bg-blue-100",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-7xl mx-auto font-sans">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to <span className="text-blue-500">Student Dashboard</span>
          </h1>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#ffead6] border-2 border-[#e4bca0] rounded-lg p-6 text-[#b87748] shadow-md">
            <div className="text-2xl font-bold">642</div>
            <div className="text-[#b87748]/90 text-sm">Total Placements</div>
          </div>
          <div className="bg-[#f3e5fa] border-2 border-[#d3b8e3] rounded-lg p-6 text-[#a578c0] shadow-md">
            <div className="text-2xl font-bold">89</div>
            <div className="text-[#a578c0]/90 text-sm">Companies Visited</div>
          </div>
          <div className="bg-[#d7f7e5] border-2 border-[#b3d4c2] rounded-lg p-6 text-[#6a987b] shadow-md">
            <div className="text-2xl font-bold">12.8 LPA</div>
            <div className="text-[#6a987b]/90 text-sm">Average Package</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Notifications Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="px-4 py-3 bg-blue-500 text-white">
              <h2 className="text-lg font-medium">Notifications</h2>
            </div>

            {/* Scrolling Notifications */}
            <div className="h-32 overflow-hidden relative">
              <ul className="absolute top-0 animate-card-scroll space-y-3 px-4">
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm text-gray-800 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition-colors"
                  >
                    {notification}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Placements Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="px-4 py-3 bg-blue-500 text-white">
              <h2 className="text-lg font-medium">Recent Placements</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="p-3 hover:bg-gray-100 rounded transition-colors">
                  <div className="text-gray-800 font-medium mb-1">Google</div>
                  <div className="text-sm text-gray-600">Software Engineer</div>
                  <div className="text-xs text-gray-500 mt-1">
                    January 13, 2024
                  </div>
                </div>
                <div className="p-3 hover:bg-gray-100 rounded transition-colors">
                  <div className="text-gray-800 font-medium mb-1">
                    Microsoft
                  </div>
                  <div className="text-sm text-gray-600">Software Engineer</div>
                  <div className="text-xs text-gray-500 mt-1">
                    January 12, 2024
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Internships Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="px-4 py-3 bg-blue-500 text-white">
              <h2 className="text-lg font-medium">Recent Internships</h2>
            </div>
            <div className="p-4 h-48 overflow-y-auto">
              <div className="space-y-4">
                <div className="p-3 hover:bg-gray-100 rounded transition-colors">
                  <div className="text-gray-800 font-medium mb-1">Expedia</div>
                  <div className="text-sm text-gray-600">Software Engineer</div>
                  <div className="text-xs text-gray-500 mt-1">
                    January 13, 2024
                  </div>
                </div>
                <div className="p-3 hover:bg-gray-100 rounded transition-colors">
                  <div className="text-gray-800 font-medium mb-1">
                    Accenture
                  </div>
                  <div className="text-sm text-gray-600">Software Engineer</div>
                  <div className="text-xs text-gray-500 mt-1">
                    January 12, 2024
                  </div>
                </div>
                <div className="p-3 hover:bg-gray-100 rounded transition-colors">
                  <div className="text-gray-800 font-medium mb-1">
                    Company A
                  </div>
                  <div className="text-sm text-gray-600">Data Analyst</div>
                  <div className="text-xs text-gray-500 mt-1">
                    January 10, 2024
                  </div>
                </div>
                <div className="p-3 hover:bg-gray-100 rounded transition-colors">
                  <div className="text-gray-800 font-medium mb-1">
                    Company B
                  </div>
                  <div className="text-sm text-gray-600">Backend Developer</div>
                  <div className="text-xs text-gray-500 mt-1">
                    January 9, 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
