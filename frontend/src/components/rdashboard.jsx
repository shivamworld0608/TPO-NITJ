import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Settings, 
  Building
} from 'lucide-react';

const Rdashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/rdashboard/home', label: 'Dashboard', icon: Home },
    { path: '/rdashboard/jobpostings', label: 'Job Postings', icon: FileText },
    { path: '/rdashboard/gdinterview', label: 'GD cum Interview Management', icon: Building },
    { path: '/rdashboard/studentoffletter', label: 'Offer Letter Management', icon: Users },
    { path: '/rdashboard/calendar', label: 'Interview Calendar', icon: Calendar },
    { path: '/rdashboard/resources-guidlines', label: 'Resources and Guidlines', icon: MessageSquare },
    { path: '/rdashboard/contact', label: 'Contact', icon: Settings },
  ];

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
                  
                  return (
                    <li key={item.path}>
                      <button
                        onClick={() => navigate(item.path)}
                        className={`flex items-center w-full text-left px-3 py-2 rounded-lg ${
                          location.pathname === item.path 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-600 hover:bg-blue-50'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
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
    </div>
  );
};

export default Rdashboard;