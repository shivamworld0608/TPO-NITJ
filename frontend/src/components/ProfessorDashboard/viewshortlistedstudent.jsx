// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { FaArrowLeft, FaFileExcel } from 'react-icons/fa';
// import * as XLSX from 'xlsx';

// const ViewShortlistStudents = ({ jobId, stepIndex, onClose }) => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false); // Added loading state

//   useEffect(() => {
//     const fetchEligibleStudents = async () => {
//       setLoading(true); // Start loading
//       try {
//         const response = await axios.post(
//           `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/shortlisted_students`,
//           { jobId, stepIndex },
//           { withCredentials: true }
//         );
//         const updatedStudents = response.data.shortlistedStudents.map((student) => ({
//           ...student,
//         }));
//         setStudents(updatedStudents);
//       } catch (err) {
//         console.error('Error fetching shortlisted students:', err);
//         toast.error('Failed to fetch shortlisted students');
//       } finally {
//         setLoading(false); // End loading
//       }
//     };
//     fetchEligibleStudents();
//   }, [jobId, stepIndex]);

//   const handleDownloadExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(students);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Shortlisted Students');
//     XLSX.writeFile(workbook, 'shortlisted_students.xlsx');
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl">
//       {/* Header Section */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center space-x-3">
//           <button
//             onClick={onClose}
//             className="p-2 rounded-full transition-colors"
//             aria-label="Go back"
//           >
//             <FaArrowLeft className="text-gray-700 text-xl" />
//           </button>
//           <h2 className="text-2xl font-bold text-gray-800">Shortlisted Students</h2>
//         </div>
//         <button
//           onClick={handleDownloadExcel}
//           className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
//         >
//           <FaFileExcel className="mr-2" />
//           Download Excel
//         </button>
//       </div>

//       {/* Loading State */}
//       {loading ? (
//         <div className="text-center py-8">
//           <p className="text-gray-600">Loading students...</p>
//         </div>
//       ) : students.length > 0 ? (
//         <div className="overflow-x-auto mb-6">
//           <table className="w-full text-sm text-left text-gray-500 border-collapse">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-100">
//               <tr>
//                 <th className="px-1 py-3 border text-center">SNo.</th>
//                 <th className="px-4 py-3 border">Name</th>
//                 <th className="px-4 py-3 border">Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student, index) => (
//                 <tr
//                   key={index}
//                   className="bg-white border-b hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="px-1 py-3 border text-center">{index + 1}.</td>
//                   <td className="px-4 py-3 border">{student.name}</td>
//                   <td className="px-4 py-3 border">{student.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="text-center py-8">
//           <p className="text-gray-600">No shortlisted students found.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewShortlistStudents;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const ViewShortlistStudents = ({ jobId, stepIndex, onClose }) => {
  const [students, setStudents] = useState([]);
  const [starredFields, setStarredFields] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEligibleStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/shortlisted_students`,
          { jobId, stepIndex },
          { withCredentials: true }
        );
        const { shortlistedStudents, starredFields } = response.data;
        const updatedStudents = shortlistedStudents.map((student) => ({
          ...student,
        }));
        setStudents(updatedStudents);
        setStarredFields(starredFields || []);
      } catch (err) {
        console.error('Error fetching shortlisted students:', err);
        toast.error('Failed to fetch shortlisted students');
      } finally {
        setLoading(false);
      }
    };
    fetchEligibleStudents();
  }, [jobId, stepIndex]);

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Shortlisted Students');
    XLSX.writeFile(workbook, 'shortlisted_students.xlsx');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors"
            aria-label="Go back"
          >
            <FaArrowLeft className="text-gray-700 text-xl" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Shortlisted Students</h2>
        </div>
        <button
          onClick={handleDownloadExcel}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          <FaFileExcel className="mr-2" />
          Download Excel
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading students...</p>
        </div>
      ) : students.length > 0 ? (
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-1 py-3 border text-center">SNo.</th>
                <th className="px-4 py-3 border">Name</th>
                {starredFields.map((field, index) => (
                  <th key={index} className="px-4 py-3 border">{field.fieldName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={index}
                  className="bg-white border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-1 py-3 border text-center">{index + 1}.</td>
                  <td className="px-4 py-3 border">{student.name}</td>
                  {starredFields.map((field, fieldIndex) => (
                    <td key={fieldIndex} className="px-4 py-3 border">
                      {student[field.fieldName]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No shortlisted students found.</p>
        </div>
      )}
    </div>
  );
};

export default ViewShortlistStudents;