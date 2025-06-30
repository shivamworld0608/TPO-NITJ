// import Header from "../components/header";
// import Footer from "../components/footer";
// import { useState } from "react";
// import PropTypes from "prop-types";

// import Logo from "../assets/nitj-logo.png";

// function Card({ title, content, link, downloadName, index }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const toggleReadMore = () => setIsExpanded(!isExpanded);
//   const contentThreshold = 150;
//   const isContentLong = content.length > contentThreshold;

//   return (
//     <div className="group overflow-hidden my-5 bg-white shadow-lg hover:shadow-2xl hover:scale-[1.05] hover:rotate-1 transition-all duration-300 border border-gray-200 hover:border-custom-blue cursor-pointer flex-col">
//       <a
//         href={link}
//         download={downloadName}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <div className="relative overflow-hidden p-8 flex flex-col items-center text-center gap-4 flex-[1]">
//           <img
//             className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
//             src={Logo}
//           />
//           <div className="z-[100] absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
//           <div className="z-[100] flex-shrink-0 flex items-center justify-center bg-white text-custom-blue rounded-full w-14 h-14 shadow-lg font-bold text-2xl">
//             {String(index).padStart(2, "0")}
//           </div>
//           <h3 className="z-[100] text-2xl font-bold text-white leading-tight group-hover:text-white transition-all duration-300">
//             {title}
//           </h3>
//         </div>
//       </a>

//       <div className="p-8 bg-gray-50">
//         <p
//           className={`text-gray-700 leading-relaxed text-lg transition-colors duration-300 ${
//             isExpanded ? "" : "line-clamp-3"
//           }`}
//         >
//           {isExpanded ? content : `${content.substring(0, contentThreshold)}`}
//         </p>

//         {isContentLong && (
//           <button
//             onClick={toggleReadMore}
//             className="mt-4 text-custom-blue hover:text-blue-400 font-semibold transition-colors duration-300"
//           >
//             {isExpanded ? "Read Less" : "Read More"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// Card.propTypes = {
//   title: PropTypes.string.isRequired,
//   content: PropTypes.string.isRequired,
//   link: PropTypes.string.isRequired,
//   downloadName: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
// };

// export default function Downloads() {
//   const availableDownloads = [
//     {
//       title: "Placement Brochure",
//       content:
//         "Download the latest placement brochure for detailed information.",
//       link: "https://v1.nitj.ac.in/nitj_files/links/pb1_68544.pdf",
//       downloadName: "placement-brochure.pdf",
//     },
//     {
//       title: "Placement Policy",
//       content: "Understand the placement policy and guidelines.",
//       link: "/downloads/placement-policy.pdf",
//       downloadName: "placement-policy.pdf",
//     },
//     {
//       title: "Student Handbook",
//       content: "A comprehensive guide for students regarding placements.",
//       link: "https://nitj.ac.in/files/1691135109355-New%20UG%20Regulations%20(164%20credits)%2020%20Jun%202023.pdf",
//       downloadName: "student-handbook.pdf",
//     },
//   ];

//   return (
//     <>
//       <Header />
//       <div className="rounded-2xl bg-white-100 mt-12 mb-20">
//         <div className="max-w-7xl mx-auto px-6 space-y-16">
//           <div className="space-y-6 max-w-4xl mx-auto text-center">
//             <h1 className="text-3xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
//               Download <span className="text-custom-blue">Resources</span>
//             </h1>
//           </div>

//           <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {availableDownloads.map(({ title, content, link }, index) => (
//               <Card
//                 key={index}
//                 title={title}
//                 content={content}
//                 link={link}
//                 index={index + 1}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
import { useState, useEffect } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';

export default function DepartmentCards() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch brochures from backend
  useEffect(() => {
    const fetchBrochures = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/brochure/get`, {
          withCredentials: true, // Include cookies for authentication
        });
        // Map backend data to component's expected structure
        const fetchedDepartments = response.data.data.map((brochure) => ({
          id: brochure._id,
          name: brochure.department_name,
          website: brochure.department_link,
          pdfUrl: brochure.brochure_link, // e.g., /Uploads/brochures/<filename>.pdf
          pdfName: `${brochure.department_name.replace(/\s+/g, '_').toLowerCase()}_Brochure.pdf`, // Format as <department_name>_Brochure.pdf
        }));
        setDepartments(fetchedDepartments);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching brochures:', err);
        setError('Failed to load brochures. Please try again later.');
        setLoading(false);
      }
    };

    fetchBrochures();
  }, []);

  // Download PDF from backend
  const downloadPDF = async (pdfUrl, filename) => {
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}${pdfUrl}`, {
        responseType: 'blob', // Handle binary data
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Failed to download PDF. Please try again.');
    }
  };



  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-16 text-gray-800">
         Institute & Departmental <span className="text-custom-blue">Brochures</span>
        </h1>

        {loading && departments.length === 0 ? (
 <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-blue"></div>
  </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : departments.length === 0 ? (
          <div className="text-center text-gray-600">No brochures available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full shadow-md hover:shadow-xl min-w-[250px]"
                style={{
                  transform: hoveredCard === dept.id ? 'translateY(-4px)' : 'none',
                }}
                onMouseEnter={() => setHoveredCard(dept.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Top accent bar */}
                <div className="h-2 bg-custom-blue w-full" />
                
                <div className="p-6 flex flex-col flex-grow">
                  {/* Department name with proper wrapping */}
                 <h2 className="text-md font-bold  mb-4 whitespace-nowrap overflow-hidden text-ellipsis">

                    {dept.name}
                  </h2>
                  
                  {/* Spacer to push buttons to bottom */}
                  <div className="flex-grow" />
                  
                  {/* Action buttons with improved spacing */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => downloadPDF(dept.pdfUrl, dept.pdfName)}
                      className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg bg-custom-blue hover:bg-blue-700 transition-all duration-300 text-white font-medium text-sm"
                      title={`Download ${dept.pdfName}`}
                    >
                      <Download size={16} className="mr-2" />
                      <span>Download</span>
                    </button>
                    <a
                      href={dept.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg bg-white border border-custom-blue text-custom-blue hover:bg-blue-50 transition-all duration-300 font-medium text-sm"
                      title="Visit Department Website"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      <span>Visit</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}