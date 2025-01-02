import React from "react";
const menuItems = [
  { path: '/Home', label: 'Dashboard', icon: Home },
  { path: '/Job-Postings', label: 'Job Postings', icon: FileText },
  { path: '/GD-interview', label: 'GD cum Interview Management', icon: Building },
  { path: '/studentoffletter', label: 'Offer Letter Management', icon: Users },
  { path: '/calendar', label: 'Interview Calendar', icon: Calendar },
  { path: '/resources-guidlines', label: 'Resources and Guidlines', icon: MessageSquare },
  { path: '/contact', label: 'Contact', icon: Settings },
];
const Rdashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col justify-between">
          <div className="p-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-2 mb-6">
              <img
                src="/api/placeholder/40/40"
                alt="Logo"
                className="rounded-full"
              />
              <h2 className="text-xl font-bold text-blue-600">
                Training and Placement Cell
              </h2>
            </div>

            {/* Navigation Menu */}
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = router.pathname === item.path;

                  return (
                    <li key={item.path}>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        disabled={isLoading}
                        className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors duration-200
                          ${isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-blue-50'
                          }
                          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                      >
                        <Icon className={`w-5 h-5 mr-3 ${isLoading ? 'animate-spin' : ''}`} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>
      </div>

    </div>);
};

export default Rdashboard;