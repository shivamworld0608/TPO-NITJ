import React from "react";
import PInsights from "../ProfessorDashboard/pinsights.jsx";

let notifications = [
  { id: 1, message: "TPO meeting scheduled for 2023-11-10 at 10:00 AM" },
  { id: 2, message: "New internship opportunities available at Company X" },
  { id: 3, message: "New internship opportunities available at Company Y" },
  { id: 4, message: "New internship opportunities available at Company Y" },
  { id: 5, message: "New internship opportunities available at Company Y" },
  { id: 6, message: "New internship opportunities available at Company Y" },
  { id: 7, message: "New internship opportunities available at Company Y" },
];

let placements = [
  {
    id: 1,
    company: "Microsoft",
    position: "Software Engineer",
    pdf: "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-download-10-mb.pdf",
    date: new Date("2024-01-12"),
  },
  {
    id: 2,
    company: "Google",
    position: "Software Engineer",
    pdf: "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-download-10-mb.pdf",
    date: new Date("2024-01-13"),
  },
];

let internships = [
  {
    id: 1,
    company: "Accenture",
    position: "Software Engineer",
    pdf: "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-download-10-mb.pdf",
    date: new Date("2024-01-12"),
  },
  {
    id: 2,
    company: "Expedia",
    position: "Software Engineer",
    pdf: "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-download-10-mb.pdf",
    date: new Date("2024-01-13"),
  },
];

const options = { year: "numeric", month: "long", day: "numeric" };
placements = [...placements].sort((a, b) => b.date - a.date);
internships = [...internships].sort((a, b) => b.date - a.date);
const Home = () => {
  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center tracking-wide">
        Welcome to{" "}
        <span className="bg-custom-blue text-transparent bg-clip-text">
          Student Dashboard
        </span>
      </h1>
      <br />

      {/* Grid Layout for Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications Card */}
        <div className="flex flex-col overflow-hidden rounded-xl bg-light-purple shadow-xl border-t-4 border-b-4 border-accent border-custom-blue h-full w-full transition-transform transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)]">
          <div className="flex flex-col p-4">
            <h3 className="text-xl font-semibold mb-4">Notifications</h3>
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li key={notification.id} className="text-gray-900">
                  {notification.message}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Placements Card */}
        <div className="flex flex-col overflow-hidden rounded-xl bg-light-purple shadow-xl-shadow-custom-blue border-t-4 border-b-4 border-accent border-custom-blue h-full w-full transition-transform transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)]">
          <div className="flex flex-col p-4">
            <h3 className="text-xl font-semibold mb-4">Recent Placements</h3>
            <ul className="space-y-2">
              {placements.map((placement) => (
                <li key={placement.id} className="text-gray-900">
                  <a
                    href={placement.pdf}
                    download={`${placement.company}_placement_shortlist`}
                    className="text-sky-500 hover:text-sky-600 hover:underline underline-offset-4 decoration-2 decoration-sky-400 transition-all"
                  >
                    {placement.company} - {placement.position} (
                    {placement.date.toLocaleDateString("en-US", options)})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Internships Card */}
        <div className="flex flex-col overflow-hidden rounded-xl bg-light-purple shadow-xl border-t-4 border-b-4 border-accent border-custom-blue h-full w-full transition-transform transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)]">
          <div className="flex flex-col p-4">
            <h3 className="text-xl font-semibold mb-4">Recent Internships</h3>
            <ul className="space-y-2">
              {internships.map((internship) => (
                <li key={internship.id} className="text-gray-900">
                  <a
                    href={internship.pdf}
                    download={`${internship.company}_intern_shortlist`}
                    className="text-sky-500 hover:text-sky-600 hover:underline underline-offset-4 decoration-2 decoration-sky-400 transition-all"
                  >
                    {internship.company} - {internship.position} (
                    {internship.date.toLocaleDateString("en-US", options)})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="mt-8">
        <PInsights />
      </div>
    </div>
  );
};

export default Home;