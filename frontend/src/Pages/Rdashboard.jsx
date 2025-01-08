import Header from "../components/header";
import Footer from "../components/footer";
import HeroSection from "../components/herosection";
import Rdashboard from "../components/rdashboard";
import React from 'react';
import { Calendar, Home, FileText, Mail, Settings, LogOut } from 'lucide-react';

/* const Sidebar = () => (
  <div className="w-64 bg-white h-screen p-4 border-r">
    <div className="flex items-center gap-2 mb-8">
      <img src="/api/placeholder/40/40" alt="Logo" className="rounded-full" />
      <div>
        <h2 className="text-sm font-semibold">Training and Placement Cell</h2>
        <p className="text-xs text-gray-500">NFU</p>
      </div>
    </div>
    
    <div className="mb-8">
      <p className="text-sm text-gray-600">Hi ABCD Pvt. Ltd.</p>
    </div>

    <nav className="space-y-2">
      <NavItem icon={<Home size={20} />} label="Home" active />
      <NavItem icon={<Calendar size={20} />} label="Interview Management" />
      <NavItem icon={<FileText size={20} />} label="Job Postings" isActive />
      <NavItem icon={<Calendar size={20} />} label="Calendar" />
      <NavItem icon={<FileText size={20} />} label="Resources & Guidelines" />
      <NavItem icon={<Mail size={20} />} label="Student Offer Letter Management" />
      <NavItem icon={<Mail size={20} />} label="Contact" />
    </nav>

    <div className="absolute bottom-4 space-y-2">
      <NavItem icon={<Settings size={20} />} label="Settings" />
      <NavItem icon={<LogOut size={20} />} label="Signout" />
    </div>
  </div>
);

const NavItem = ({ icon, label, isActive = false }) => (
  <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer
    ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

const ApplicationCard = ({ title, subtitle, icon, color }) => (
  <button 
    className={`w-full bg-white p-4 rounded-lg border hover:shadow-md transition-all duration-200 
    hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500
    hover:border-${color}-200 group`}
    onClick={() => console.log(`Clicked ${title}`)}
  >
    <div className="flex items-start justify-between">
      <div className="text-left">
        <h3 className={`text-lg font-semibold group-hover:text-${color}-600`}>{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className={`text-${color}-500 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
    </div>
  </button>
);
 */
/* const StatisticsChart = () => (
  <div className="bg-white p-6 rounded-lg border">
    <h3 className="text-lg font-semibold mb-4">Statistics</h3>
    <div className="relative w-48 h-48">
    


      <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-2">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
        <span className="text-sm">Placed</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-sm">Intern-2m</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <span className="text-sm">Intern-6m</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <span className="text-sm">Available</span>
      </div>
    </div>
  </div>
);

const DemographicsSection = () => (
  <div className="bg-white p-6 rounded-lg border">
    <h3 className="text-lg font-semibold mb-4">Applicant Demographics</h3>
    <div className="grid grid-cols-3 gap-8">
      <div>
        <h4 className="text-sm font-medium mb-2">Branch Distribution</h4>
        <div className="h-48">
         


        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Gender Ratio</h4>
        <div className="h-48">
        


        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">CGPA Distribution</h4>
        <div className="h-48">
          

          
        </div>
      </div>
    </div>
  </div>
); */

/* const RDashboard = () => (
  <div className="min-h-screen bg-gray-50 flex">
    <Sidebar />
    
    <main className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="grid grid-cols-3 gap-4 w-full">
              <ApplicationCard 
                title="Job Application Form"
                subtitle="For Intern"
                icon={<FileText size={24} />}
                color="orange"
              />
              <ApplicationCard 
                title="Job Application Form"
                subtitle="For Intern"
                icon={<FileText size={24} />}
                color="purple"
              />
              <ApplicationCard 
                title="Job Application Form"
                subtitle="For Placement"
                icon={<FileText size={24} />}
                color="green"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Hiring Status</h3>
              <div className="flex justify-center items-center h-48">
                <div className="text-center text-gray-500">
                  <img src="/api/placeholder/200/150" alt="No jobs" className="mx-auto mb-4" />
                  <p>Oops, No jobs posted yet!</p>
                </div>
              </div>
            </div>
            <StatisticsChart />
          </div>
        </div>
        
        <DemographicsSection />
      </div>
    </main>
  </div>
);
 */
// export default Dashboard;


const RDashboard = () => {
  return (
    <>
 <Rdashboard />
    </>   );
};

export default RDashboard;