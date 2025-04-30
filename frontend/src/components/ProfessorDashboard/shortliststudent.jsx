// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { FaArrowLeft } from 'react-icons/fa';
// import * as XLSX from 'xlsx';

// const ShortlistStudents = ({ jobId, stepIndex, onClose }) => {
//   const [students, setStudents] = useState([]);
//   const [uploadMethod, setUploadMethod] = useState('shortlist');
//   const [loading, setLoading] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);

//   useEffect(() => {
//     if (uploadMethod === 'shortlist') {
//       const fetchEligibleStudents = async () => {
//         setLoading(true);
//         try {
//           const response = await axios.post(
//             `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/eligible_students`,
//             { jobId, stepIndex },
//             { withCredentials: true }
//           );
//           const updatedStudents = response.data.eligibleStudents
//             .map((student) => ({
//               ...student,
//             }))
//             .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
//           setStudents(updatedStudents);
//         } catch (err) {
//           console.error('Error fetching eligible students:', err);
//           toast.error('Failed to fetch eligible students');
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchEligibleStudents();
//     }
//   }, [uploadMethod, jobId, stepIndex]);

//   const handleCheckboxChange = (index, field) => {
//     const updatedStudents = [...students];
//     updatedStudents[index][field] = !updatedStudents[index][field];
//     if (field === 'shortlisted' && updatedStudents[index].shortlisted) {
//       updatedStudents[index].absent = false;
//     } else if (field === 'absent' && updatedStudents[index].absent) {
//       updatedStudents[index].shortlisted = false;
//     }
//     setStudents(updatedStudents);
//   };

//   const handleBulkAction = (action) => {
//     const updatedStudents = students.map((student) => ({
//       ...student,
//       shortlisted: action === 'shortlist',
//       absent: action === 'absent',
//     }));
//     setStudents(updatedStudents);
//   };

//   const handleExcelUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       try {
//         const workbook = XLSX.read(event.target.result, { type: 'binary' });
//         const firstSheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[firstSheetName];
//         const data = XLSX.utils.sheet_to_json(worksheet);

//         const transformedData = data.map((row) => ({
//           name: row.name || row.Name || '',
//           email: row.email || row.Email || '',
//           shortlisted: row.shortlisted || false,
//           absent: row.absent || false,
//         })).filter((student) => student.name && student.email);

//         if (transformedData.length === 0) {
//           toast.error('No valid data found in Excel file. Ensure columns are named "name" and "email".');
//           return;
//         }

//         setStudents(transformedData);
//         toast.success(`Successfully loaded ${transformedData.length} students`);
//       } catch (error) {
//         console.error('Error processing Excel file:', error);
//         toast.error('Error processing Excel file. Please check the format.');
//       }
//     };

//     reader.onerror = () => {
//       toast.error('Error reading file');
//     };

//     reader.readAsBinaryString(file);
//   };

//   const downloadTemplate = () => {
//     const ws = XLSX.utils.json_to_sheet([{ name: '', email: '', shortlisted: '', absent: '' }]);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Students');
//     XLSX.writeFile(wb, 'student_template.xlsx');
//   };

//   const handleInitialSubmit = () => {
//     const shortlistedStudents = students.filter(
//       (student) => student.shortlisted || student.absent || uploadMethod !== 'shortlist'
//     );
//     if (shortlistedStudents.length === 0) {
//       toast.error('No students have been added or shortlisted');
//       return;
//     }
//     setShowConfirmModal(true);
//   };

//   const handleFinalSubmit = async () => {
//     const shortlistedStudents = students.filter(
//       (student) => student.shortlisted || student.absent || uploadMethod !== 'shortlist'
//     );
//     setLoading(true);
//     try {
//       await axios.post(
//         `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/add-shortlist-students`,
//         { jobId, stepIndex, students: shortlistedStudents },
//         { withCredentials: true }
//       );
//       toast.success('Students processed successfully!');
//       setShowConfirmModal(false);
//       onClose();
//     } catch (error) {
//       console.error('Error submitting students:', error);
//       toast.error('Failed to submit students.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="mt-2 ml-4">
//         <button className="flex items-center text-blue-600 hover:text-blue-800" onClick={onClose}>
//           <FaArrowLeft className="mr-2" />
//         </button>
//       </div>
//       <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl">
//         {/* Upload Method Toggle */}
//         <div className="mb-6 flex justify-center space-x-4">
//           <button
//             className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//               uploadMethod === 'shortlist' ? 'bg-custom-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//             onClick={() => setUploadMethod('shortlist')}
//           >
//             Select Manually
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//               uploadMethod === 'excel' ? 'bg-custom-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//             onClick={() => setUploadMethod('excel')}
//           >
//             Upload Excel
//           </button>
//         </div>

//         {/* Improved Upload Excel Section */}
//         {uploadMethod === 'excel' && (
//           <div className="mb-6 bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Student Data</h3>
//             <p className="text-sm text-gray-600 mb-4">
//               Upload an Excel file with columns: "name", "email", "shortlisted", "absent".
//             </p>
//             <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
//               <input
//                 type="file"
//                 accept=".xlsx, .xls"
//                 onChange={handleExcelUpload}
//                 className="w-full sm:w-auto file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-custom-blue file:text-white hover:file:bg-blue-600"
//               />
//               <button
//                 className="w-full sm:w-auto bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                 onClick={downloadTemplate}
//               >
//                 Download Template
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Shortlist Table */}
//         {uploadMethod === 'shortlist' && (
//           <div className="overflow-x-auto mb-6">
//             {loading ? (
//               <div className="text-center py-8">
//                 <p className="text-gray-600">Loading students...</p>
//               </div>
//             ) : students.length > 0 ? (
//               <>
//                 <div className="mb-4 flex justify-end space-x-4">
//                   <button
//                     className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                     onClick={() => handleBulkAction('shortlist')}
//                   >
//                     Shortlist All
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                     onClick={() => handleBulkAction('absent')}
//                   >
//                     Mark All Absent
//                   </button>
//                 </div>
//                 <table className="w-full text-sm text-left text-gray-500 border-collapse">
//                   <thead className="text-xs text-gray-700 uppercase bg-gray-100">
//                     <tr>
//                       <th className="px-1 py-2 border text-center">SNo.</th>
//                       <th className="px-4 py-2 border">Name</th>
//                       <th className="px-4 py-2 border">Email</th>
//                       <th className="px-4 py-2 border text-center">Shortlisted</th>
//                       <th className="px-4 py-2 border text-center">Absent</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {students.map((student, index) => (
//                       <tr key={index} className="bg-white border-b">
//                         <td className="px-1 py-2 border text-center">{index + 1}.</td>
//                         <td className="px-4 py-2 border">{student.name}</td>
//                         <td className="px-4 py-2 border">{student.email}</td>
//                         <td className="px-4 py-2 border text-center">
//                           <input
//                             type="checkbox"
//                             checked={student.shortlisted}
//                             onChange={() => handleCheckboxChange(index, 'shortlisted')}
//                           />
//                         </td>
//                         <td className="px-4 py-2 border text-center">
//                           <input
//                             type="checkbox"
//                             checked={student.absent}
//                             onChange={() => handleCheckboxChange(index, 'absent')}
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </>
//             ) : (
//               <div className="text-center py-8">
//                 <p className="text-gray-600">No eligible students found.</p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Submit and Cancel Buttons */}
//         <div className="mt-8 flex justify-end space-x-4">
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded-lg"
//             onClick={handleInitialSubmit}
//             disabled={loading}
//           >
//             Proceed
//           </button>
//           <button
//             className="bg-gray-500 text-white px-4 py-2 rounded-lg"
//             onClick={onClose}
//             disabled={loading}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">Confirm Shortlisted Students</h2>
//             <p className="mb-4">Please review the selected students before submitting:</p>
//             <table className="w-full text-sm text-left text-gray-500 border-collapse mb-6">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-100">
//                 <tr>
//                   <th className="px-1 py-2 border text-center">SNo.</th>
//                   <th className="px-4 py-2 border">Name</th>
//                   <th className="px-4 py-2 border">Email</th>
//                   <th className="px-4 py-2 border text-center">Shortlisted</th>
//                   <th className="px-4 py-2 border text-center">Absent</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students
//                   .filter((student) => student.shortlisted || student.absent || uploadMethod !== 'shortlist')
//                   .map((student, index) => (
//                     <tr key={index} className="bg-white border-b">
//                       <td className="px-4 py-2 border text-center">{index + 1}.</td>
//                       <td className="px-4 py-2 border">{student.name}</td>
//                       <td className="px-4 py-2 border">{student.email}</td>
//                       <td className="px-4 py-2 border text-center">
//                         {student.shortlisted ? 'Yes' : 'No'}
//                       </td>
//                       <td className="px-4 py-2 border text-center">
//                         {student.absent ? 'Yes' : 'No'}
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//             <div className="flex space-x-4">
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg"
//                 onClick={handleFinalSubmit}
//                 disabled={loading}
//               >
//                 {loading ? 'Submitting...' : 'Confirm & Submit'}
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded-lg"
//                 onClick={() => setShowConfirmModal(false)}
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ShortlistStudents;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const ShortlistStudents = ({ jobId, stepIndex, onClose }) => {
  const [students, setStudents] = useState([]);
  const [starredFields, setStarredFields] = useState([]);
  const [uploadMethod, setUploadMethod] = useState('shortlist');
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (uploadMethod === 'shortlist') {
      const fetchEligibleStudents = async () => {
        setLoading(true);
        try {
          const response = await axios.post(
            `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/eligible_students`,
            { jobId, stepIndex },
            { withCredentials: true }
          );
          const { eligibleStudents, starredFields } = response.data;
          const updatedStudents = eligibleStudents
            .map((student) => ({
              ...student,
            }))
            .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
          setStudents(updatedStudents);
          setStarredFields(starredFields || []);
        } catch (err) {
          console.error('Error fetching eligible students:', err);
          toast.error('Failed to fetch eligible students');
        } finally {
          setLoading(false);
        }
      };
      fetchEligibleStudents();
    }
  }, [uploadMethod, jobId, stepIndex]);

  const handleCheckboxChange = (index, field) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = !updatedStudents[index][field];
    if (field === 'shortlisted' && updatedStudents[index].shortlisted) {
      updatedStudents[index].absent = false;
    } else if (field === 'absent' && updatedStudents[index].absent) {
      updatedStudents[index].shortlisted = false;
    }
    setStudents(updatedStudents);
  };

  const handleBulkAction = (action) => {
    const updatedStudents = students.map((student) => ({
      ...student,
      shortlisted: action === 'shortlist',
      absent: action === 'absent',
    }));
    setStudents(updatedStudents);
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const transformedData = data.map((row) => {
          const student = {
            name: row.name || row.Name || '',
            shortlisted: row.shortlisted || false,
            absent: row.absent || false,
          };
          starredFields.forEach(field => {
            student[field.fieldName] = row[field.fieldName] || '';
          });
          return student;
        }).filter((student) => student.name);

        if (transformedData.length === 0) {
          toast.error('No valid data found in Excel file. Ensure columns include "name" and starred fields.');
          return;
        }

        setStudents(transformedData);
        toast.success(`Successfully loaded ${transformedData.length} students`);
      } catch (error) {
        console.error('Error processing Excel file:', error);
        toast.error('Error processing Excel file. Please check the format.');
      }
    };

    reader.onerror = () => {
      toast.error('Error reading file');
    };

    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    const templateData = [{
      name: '',
      ...starredFields.reduce((acc, field) => ({
        ...acc,
        [field.fieldName]: ''
      }), {}),
      shortlisted: '',
      absent: ''
    }];
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'student_template.xlsx');
  };

  const handleInitialSubmit = () => {
    const shortlistedStudents = students.filter(
      (student) => student.shortlisted || student.absent || uploadMethod !== 'shortlist'
    );
    if (shortlistedStudents.length === 0) {
      toast.error('No students have been added or shortlisted');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleFinalSubmit = async () => {
    const shortlistedStudents = students.filter(
      (student) => student.shortlisted || student.absent || uploadMethod !== 'shortlist'
    );
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/add-shortlist-students`,
        { jobId, stepIndex, students: shortlistedStudents },
        { withCredentials: true }
      );
      toast.success('Students processed successfully!');
      setShowConfirmModal(false);
      onClose();
    } catch (error) {
      console.error('Error submitting students:', error);
      toast.error('Failed to submit students.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-2 ml-4">
        <button className="flex items-center text-blue-600 hover:text-blue-800" onClick={onClose}>
          <FaArrowLeft className="mr-2" />
        </button>
      </div>
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl">
        {/* Upload Method Toggle */}
        <div className="mb-6 flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              uploadMethod === 'shortlist' ? 'bg-custom-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setUploadMethod('shortlist')}
          >
            Select Manually
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              uploadMethod === 'excel' ? 'bg-custom-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setUploadMethod('excel')}
          >
            Upload Excel
          </button>
        </div>

        {/* Improved Upload Excel Section */}
        {uploadMethod === 'excel' && (
          <div className="mb-6 bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Student Data</h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload an Excel file with columns: "name", {starredFields.map(f => `"${f.fieldName}"`).join(', ')}, "shortlisted", "absent".
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleExcelUpload}
                className="w-full sm:w-auto file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-custom-blue file:text-white hover:file:bg-blue-600"
              />
              <button
                className="w-full sm:w-auto bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={downloadTemplate}
              >
                Download Template
              </button>
            </div>
          </div>
        )}

        {/* Shortlist Table */}
        {uploadMethod === 'shortlist' && (
          <div className="overflow-x-auto mb-6">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading students...</p>
              </div>
            ) : students.length > 0 ? (
              <>
                <div className="mb-4 flex justify-end space-x-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleBulkAction('shortlist')}
                  >
                    Shortlist All
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleBulkAction('absent')}
                  >
                    Mark All Absent
                  </button>
                </div>
                <table className="w-full text-sm text-left text-gray-500 border-collapse">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th className="px-1 py-2 border text-center">SNo.</th>
                      <th className="px-4 py-2 border">Name</th>
                      {starredFields.map((field, index) => (
                        <th key={index} className="px-4 py-2 border">{field.fieldName}</th>
                      ))}
                      <th className="px-4 py-2 border text-center">Shortlisted</th>
                      <th className="px-4 py-2 border text-center">Absent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index} className="bg-white border-b">
                        <td className="px-1 py-2 border text-center">{index + 1}.</td>
                        <td className="px-4 py-2 border">{student.name}</td>
                        {starredFields.map((field, fieldIndex) => (
                          <td key={fieldIndex} className="px-4 py-2 border">
                            {student[field.fieldName]}
                          </td>
                        ))}
                        <td className="px-4 py-2 border text-center">
                          <input
                            type="checkbox"
                            checked={student.shortlisted}
                            onChange={() => handleCheckboxChange(index, 'shortlisted')}
                          />
                        </td>
                        <td className="px-4 py-2 border text-center">
                          <input
                            type="checkbox"
                            checked={student.absent}
                            onChange={() => handleCheckboxChange(index, 'absent')}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No eligible students found.</p>
              </div>
            )}
          </div>
        )}

        {/* Submit and Cancel Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={handleInitialSubmit}
            disabled={loading}
          >
            Proceed
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Confirm Shortlisted Students</h2>
            <p className="mb-4">Please review the selected students before submitting:</p>
            <table className="w-full text-sm text-left text-gray-500 border-collapse mb-6">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-1 py-2 border text-center">SNo.</th>
                  <th className="px-4 py-2 border">Name</th>
                  {starredFields.map((field, index) => (
                    <th key={index} className="px-4 py-2 border">{field.fieldName}</th>
                  ))}
                  <th className="px-4 py-2 border text-center">Shortlisted</th>
                  <th className="px-4 py-2 border text-center">Absent</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter((student) => student.shortlisted || student.absent || uploadMethod !== 'shortlist')
                  .map((student, index) => (
                    <tr key={index} className="bg-white border-b">
                      <td className="px-4 py-2 border text-center">{index + 1}.</td>
                      <td className="px-4 py-2 border">{student.name}</td>
                      {starredFields.map((field, fieldIndex) => (
                        <td key={fieldIndex} className="px-4 py-2 border">
                          {student[field.fieldName]}
                        </td>
                      ))}
                      <td className="px-4 py-2 border text-center">
                        {student.shortlisted ? 'Yes' : 'No'}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        {student.absent ? 'Yes' : 'No'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="flex space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleFinalSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Confirm & Submit'}
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowConfirmModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShortlistStudents;