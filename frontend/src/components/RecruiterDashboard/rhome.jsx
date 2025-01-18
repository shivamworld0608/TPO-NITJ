import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaClipboardList, FaEye, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";


const RHome = () => {
  const recruitmentMetrics = [
    { label: "Applications", value: 380, colorbg: "#dbeafe",txtcolor: "#2563eb" },
    { label: "Shortlisted", value: 120, colorbg: "#dcfce7",txtcolor: "#16a34a" },
    { label: "Interviewed", value: 45, colorbg: "#fef9c3",txtcolor: "#ca8a04" },
    { label: "Offered", value: 8, colorbg: "#fee2e2" ,txtcolor: "#dc2626"},
    { label: "Time To Hire", value: "45 days", colorbg: "#ccfbf1" ,txtcolor: "#0d9488"},
    { label: "Conversion", value: "68%", colorbg: "#f3e8ff",txtcolor: "#9333ea" },
  ];

  const placementData = [
    { company: "Barclays", Intern: 50, Placed: 30 },
    { company: "Hero Motorcorp", Intern: 20, Placed: 10 },
    { company: "Intuit", Intern: 30, Placed: 20 },
    { company: "Microsoft", Intern: 70, Placed: 50 },
    { company: "Flipkart", Intern: 60, Placed: 40 },
    { company: "Samsung", Intern: 50, Placed: 30 },
    { company: "TeaGritty", Intern: 40, Placed: 25 },
  ];

  const quickActions = [
    { icon: <FaClipboardList size={24} />, label: "Create Job Posting", description: "Quickly create and publish job opportunities." },
    { icon: <FaEye size={24} />, label: "View Applications", description: "Direct access to manage submitted applications." },
    { icon: <FaCheckCircle size={24} />, label: "Shortlist Candidates", description: "Review and mark candidates as shortlisted." },
    { icon: <FaCalendarAlt size={24} />, label: "Schedule Interviews", description: "Set interview slots and notify candidates." },
  ];

  return (
    <div className="bg-gray-100 p-4 md:p-6 min-h-screen">
      <h1 className="text-lg font-bold mb-4 text-center md:text-left">
        Hi ABCD Pvt. Ltd.
      </h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-4 text-center md:text-left">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 border rounded-lg shadow-md hover:bg-gray-50 cursor-pointer transition"
              >
                <div className="mr-4 text-blue-600">{action.icon}</div>
                <div>
                  <p className="font-semibold text-gray-800">{action.label}</p>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment Metrics */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-4 text-center md:text-left">
            Recruitment Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recruitmentMetrics.map((metric, idx) => (
              <MetricCard
                key={idx}
                label={metric.label}
                value={metric.value}
                colorbg={metric.colorbg}
                txtcolor={metric.txtcolor}
              />
            ))}
          </div>
        </div>

        {/* Placement Analytics */}
        <div className="col-span-1 lg:col-span-2 bg-white shadow-lg rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-4 text-center md:text-left">
            Placement Analytics
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={placementData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="company" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Intern" fill="#8884d8" />
              <Bar dataKey="Placed" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ label, value, colorbg, txtcolor }) => (
  <div
    style={{ backgroundColor: colorbg }}
    className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md"
  >
    <p style={{ color: txtcolor }} className="text-xl font-bold">
      {value}
    </p>
    <p className="text-gray-600 capitalize">{label}</p>
  </div>
);


export default RHome;
