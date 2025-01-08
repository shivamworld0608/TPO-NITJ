import React from "react";
import PInsights from "../ProfessorDashboard/pinsights.jsx";

let notifications = [
  { id: 1, message: "TPO meeting scheduled for 2023-11-10 at 10:00 AM" },
  { id: 2, message: "New internship opportunities available at Company X" },
  { id: 3, message: "New internship opportunities available at Company Y" },
  { id: 4, message: "New internship opportunities available at Company Z" },
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
      <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center tracking-wide mb-8">
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

// import React, { useEffect, useState } from "react";
// import axios from "axios"; // To make API calls
// import PInsights from "../ProfessorDashboard/pinsights.jsx";

// let notifications = [
//   { id: 1, message: "TPO meeting scheduled for 2023-11-10 at 10:00 AM" },
//   { id: 2, message: "New internship opportunities available at Company X" },
//   { id: 3, message: "New internship opportunities available at Company Y" },
//   { id: 4, message: "New internship opportunities available at Company Z" },
// ];

// let internships = [
//   {
//     id: 1,
//     company: "Accenture",
//     position: "Software Engineer",
//     pdf: "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-download-10-mb.pdf",
//     date: new Date("2024-01-12"),
//   },
//   {
//     id: 2,
//     company: "Expedia",
//     position: "Software Engineer",
//     pdf: "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-download-10-mb.pdf",
//     date: new Date("2024-01-13"),
//   },
// ];

// const Home = () => {
//   const [placements, setPlacements] = useState([]); // State to store placements
//   const [loading, setLoading] = useState(true); // Loading state for API call
//   const [error, setError] = useState(null); // State to store errors

//   useEffect(() => {
//     // Fetch placements from the API
//     const fetchPlacements = async () => {
//       try {
//         setLoading(true); // Set loading state to true when API call starts
//         const response = await axios.get("/placements/last-seven-days");
//         setPlacements(response.data); // Set the fetched data to the placements state
//       } catch (err) {
//         setError("Failed to fetch placements."); // Set error state if API fails
//       } finally {
//         setLoading(false); // Set loading state to false once API call is complete
//       }
//     };

//     fetchPlacements();
//   }, []); // Empty dependency array to run this effect only once

//   const options = { year: "numeric", month: "long", day: "numeric" };

//   return (
//     <div className="p-6 min-h-screen">
//       {/* Header */}
//       <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center tracking-wide mb-8">
//         Welcome to{" "}
//         <span className="bg-custom-blue text-transparent bg-clip-text">
//           Student Dashboard
//         </span>
//       </h1>
//       <br />

//       {/* Grid Layout for Sections */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Notifications Card */}
//         <div className="flex flex-col overflow-hidden rounded-xl bg-light-purple shadow-xl border-t-4 border-b-4 border-accent border-custom-blue h-full w-full transition-transform transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)]">
//           <div className="flex flex-col p-4">
//             <h3 className="text-xl font-semibold mb-4">Notifications</h3>
//             <ul className="space-y-2">
//               {notifications.map((notification) => (
//                 <li key={notification.id} className="text-gray-900">
//                   {notification.message}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Placements Card */}
//         <div className="flex flex-col overflow-hidden rounded-xl bg-light-purple shadow-xl-shadow-custom-blue border-t-4 border-b-4 border-accent border-custom-blue h-full w-full transition-transform transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)]">
//           <div className="flex flex-col p-4">
//             <h3 className="text-xl font-semibold mb-4">Recent Placements</h3>
//             {loading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p>{error}</p>
//             ) : (
//               <ul className="space-y-2">
//                 {placements.map((placement) => (
//                   <li key={placement._id} className="text-gray-900">
//                     <a
//                       href={placement.pdf}
//                       download={`${placement.company_name}_placement_shortlist`}
//                       className="text-sky-500 hover:text-sky-600 hover:underline underline-offset-4 decoration-2 decoration-sky-400 transition-all"
//                     >
//                       {placement.company_name} - {placement.position} (
//                       {new Date(placement.createdAt).toLocaleDateString(
//                         "en-US",
//                         options
//                       )})
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>

//         {/* Internships Card */}
//         <div className="flex flex-col overflow-hidden rounded-xl bg-light-purple shadow-xl border-t-4 border-b-4 border-accent border-custom-blue h-full w-full transition-transform transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)]">
//           <div className="flex flex-col p-4">
//             <h3 className="text-xl font-semibold mb-4">Recent Internships</h3>
//             <ul className="space-y-2">
//               {internships.map((internship) => (
//                 <li key={internship.id} className="text-gray-900">
//                   <a
//                     href={internship.pdf}
//                     download={`${internship.company}_intern_shortlist`}
//                     className="text-sky-500 hover:text-sky-600 hover:underline underline-offset-4 decoration-2 decoration-sky-400 transition-all"
//                   >
//                     {internship.company} - {internship.position} (
//                     {internship.date.toLocaleDateString("en-US", options)})
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Insights Section */}
//       <div className="mt-8">
//         <PInsights />
//       </div>
//     </div>
//   );
// };

// export default Home;