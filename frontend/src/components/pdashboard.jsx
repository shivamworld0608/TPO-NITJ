import React, { useState } from "react";
import Sidebar from "./psidebar";
import { FaBriefcase, FaClipboardList, FaBell, FaChartLine } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Pinsights from "./pinsights"; // Import your new component
import JobManagement from "./pjobmanagement"; // Import the JobManagement component
import OAManagement from "./poamanagement"; // Import the OAManagement component
import InterviewManagement from "./pinterviewmanagement";
import PNotifications from "./pnotifications";
import Mailbox from "./pmailbox";
import HelpRequests from "./phelprequests";
import ExperienceSharing from "./pexperiencesharing";
import PlacementInsights from "./pplacementinsights";
import PlacementPolicy from "./pplacementpolicy";

const Pdashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = [
    { date: new Date(2024, 11, 10), label: "Placement Drive" },
    { date: new Date(2024, 11, 15), label: "Team Meeting" },
    { date: new Date(2024, 11, 20), label: "Project Submission" },
  ];

  const isEventDate = (date) =>
    events.some((event) => date.toDateString() === event.date.toDateString());

  // Render Statistics
  const renderStatistics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[{
        title: "Total Jobs",
        value: "25",
        icon: <FaBriefcase />,
      }, {
        title: "Upcoming Interviews",
        value: "5",
        icon: <FaClipboardList />,
      }, {
        title: "Pending OAs",
        value: "10",
        icon: <FaClipboardList />,
      }, {
        title: "Notifications",
        value: "8",
        icon: <FaBell />,
      }, {
        title: "Offers Made",
        value: "50",
        icon: <FaBriefcase />,
      }, {
        title: "Placement Percentage",
        value: "85%",
        icon: <FaChartLine />,
      }, {
        title: "Average Package",
        value: "₹12 LPA",
        icon: <FaChartLine />,
      }].map((stat, idx) => (
        <div key={idx} className="bg-white p-4 shadow rounded flex items-center">
          <div className="text-blue-500 text-4xl mr-4">{stat.icon}</div>
          <div>
            <h2 className="text-lg font-semibold">{stat.title}</h2>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );

  // Render Widgets
  const renderWidgets = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-bold mb-4">Calendar</h2>
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          tileContent={({ date, view }) =>
            view === "month" && isEventDate(date) ? (
              <div className="flex justify-center items-center">
                <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                  Event
                </span>
              </div>
            ) : null
          }
          className="react-calendar"
        />
        <div className="mt-4">
          {events
            .filter(
              (event) =>
                event.date.toDateString() === selectedDate.toDateString()
            )
            .map((event, idx) => (
              <div key={idx} className="bg-gray-100 p-2 rounded mb-2">
                <p className="text-sm font-semibold">{event.label}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-bold mb-4">Recent Notifications</h2>
        <ul className="space-y-3">
          {[
            "New job posted: XYZ Company",
            "Interview scheduled with ABC Company",
            "OA results announced for DEF Company",
          ].map((notif, idx) => (
            <li
              key={idx}
              className="flex items-center space-x-4 p-3 bg-gray-50 rounded hover:bg-gray-100"
            >
              <FaBell className="text-blue-500" />
              <span>{notif}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return (
          <div>
            {renderStatistics()}
            {renderWidgets()}
            <Pinsights /> {/* Render the Pinsights component here */}
          </div>
        );
      case "job-management":
        return <JobManagement />;
      case "oa-management":
        return <OAManagement />;
      case "interview-management":
        return <InterviewManagement />;
      case "notifications":
        return <PNotifications/>
      case "mailbox":
        return <Mailbox/>
      case "help-requests":
        return <HelpRequests/>
      case "experience-sharing":
        return <ExperienceSharing/>
      case "placement-insights":
        return <PlacementInsights/>
      case "placement-policy":
        return <PlacementPolicy/>
      default:
        return <div>Welcome to the dashboard</div>;
    }
  };

  return (
    <div className="flex">
      <Sidebar onNavigate={setActiveComponent} />
      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Professor Dashboard</h1>
        {renderComponent()}
      </main>
    </div>
  );
};

export default Pdashboard;
