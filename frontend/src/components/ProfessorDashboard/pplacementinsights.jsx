// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
// import { FaFileExcel, FaSpinner, FaFilter } from 'react-icons/fa';
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdInfo } from 'react-icons/md';

// const PPlacementReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [filterOptions, setFilterOptions] = useState({
//     batches: ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"],
//     degrees: ["B.Tech", "M.Tech", "MBA", "M.Sc", "PHD"],
//     departments: []
//   });
//   const [filters, setFilters] = useState({
//     batch: '',
//     degree: '',
//     department: '',
//     type: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   useEffect(() => {
//     fetchFilterOptions();
//   }, []);

//   useEffect(() => {
//     if (filters.type === 'internship') {
//       setFilterOptions(prev => ({
//         ...prev,
//         departments: [
//           "Biotechnology", "Chemical Engineering", "Civil Engineering", "Computer Science & Engineering",
//           "Data Science and Engineering", "Electrical Engineering", "Electronics & Communication Engineering",
//           "Electronics and VLSI Engineering", "Industrial and Production Engineering", "Information Technology",
//           "Instrumentation and Control Engineering", "Mathematics and Computing", "Mechanical Engineering",
//           "Textile Technology", "Structural and Construction Engineering", "Geotechnical and Geo-Environmental Engineering",
//           "Information Security", "Electric Vehicle Design", "Signal Processing and Machine Learning", "VLSI Design",
//           "Industrial Engineering and Data Analytics", "Manufacturing Technology With Machine Learning", "Data Analytics",
//           "Control and Instrumentation", "Machine Intelligence and Automation", "Design Engineering",
//           "Thermal and Energy Engineering", "Textile Engineering and Management", "Renewable Energy",
//           "Artificial Intelligence", "Power Systems and Reliability", "Finance", "Human Resource", "Marketing",
//           "Chemistry", "Mathematics", "Physics"
//         ]
//       }));
//     } else if (filters.type === 'placement') {
//       setFilterOptions(prev => ({
//         ...prev,
//         departments: [
//           "CSE", "ECE", "EE", "ME", "CE", "IT", "CH", "ICE", "BT", "TT", "IPE", "DS", "VLSI", "AI", "HM"
//         ]
//       }));
//     } else {
//       fetchFilterOptions();
//     }
//   }, [filters.type]);

//   const fetchFilterOptions = async () => {
//     try {
//       const response = await axios.get('/api/placement-report-filters');
//       if (response.data.success) {
//         if (!filters.type) {
//           setFilterOptions(prev => ({
//             ...prev,
//             departments: response.data.filterOptions.departments
//           }));
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching filter options:", error);
//     }
//   };

//   const fetchReportData = async (currentFilters) => {
//     setLoading(true);
//     try {
//       const { batch, degree, department, type } = currentFilters;
//       const queryParams = new URLSearchParams();
//       if (batch) queryParams.append('batch', batch);
//       if (degree) queryParams.append('degree', degree);
//       if (department) queryParams.append('department', department);
//       if (type) queryParams.append('type', type);

//       const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/pplacementReport/placement-reports?${queryParams.toString()}`);
//       if (response.data.success) {
//         const processedData = processDoubleplacedStudents(response.data.results);
//         setReportData(processedData);
//         setCurrentPage(1);
//       }
//     } catch (error) {
//       console.error("Error fetching report data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const processDoubleplacedStudents = (data) => {
//     const rollNoMap = {};
    
//     data.forEach(student => {
//       if (!rollNoMap[student.roll_no]) {
//         rollNoMap[student.roll_no] = { count: 1, records: [student] };
//       } else {
//         rollNoMap[student.roll_no].count += 1;
//         rollNoMap[student.roll_no].records.push(student);
//       }
//     });
    
//     return data.map(student => ({
//       ...student,
//       isDoublePlaced: rollNoMap[student.roll_no].count > 1
//     }));
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: value,
//       ...(name === 'degree' && { department: '' })
//     }));    
//   };

//   const resetFilters = () => {
//     setFilters({
//       batch: '',
//       degree: '',
//       department: '',
//       type: ''
//     });
//     setReportData([]);
//     setCurrentPage(1);
//   };

//   const applyFilters = () => {
//     fetchReportData(filters);
//   };

//   const exportToExcel = () => {
//     if (reportData.length === 0) return;
    
//     const exportData = reportData.map(item => ({
//       'Sr.No': item.sr_no,
//       'Roll No.': item.roll_no,
//       'Name': item.name,
//       'Branch': item.branch,
//       'Gender': item.gender,
//       'Category': item.category,
//       'Date Result': item.date_result,
//       'Profile': item.profile,
//       'Company': item.company,
//       'Package (LPA)': item.package,
//       'Student Status': item.student_status,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Placement Reports');
    
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
//     const date = new Date().toISOString().split('T')[0];
//     saveAs(data, `Placement_Report_${date}.xlsx`);
//   };

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = reportData.slice(indexOfFirstRow, indexOfLastRow);

//   const totalPages = Math.max(1, Math.ceil(reportData.length / rowsPerPage));

//   const doublePlacedClass = "bg-blue-50 border-l-4 border-blue-400";

//   return (
//     <div className="font-sans p-6 min-h-screen">
//       {loading && <div className="flex justify-center py-10"><FaSpinner className="animate-spin text-custom-blue text-4xl" /></div>}

//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-gray-200 pb-4">
//           <h2 className="text-3xl font-bold mb-4 md:mb-0">Placement <span className='text-custom-blue'>Reports</span></h2>
//           <button
//             onClick={exportToExcel}
//             className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all transform hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={reportData.length === 0}
//           >
//             <FaFileExcel /> Export to Excel
//           </button>
//         </div>

//         {/* Enhanced Filters Section */}
//         <div className="bg-gray-50 p-5 rounded-lg mb-8 border border-gray-200 shadow-sm">
//           <div className="flex items-center mb-4">
//             <FaFilter className="text-custom-blue mr-2" />
//             <h3 className="text-xl font-semibold text-custom-blue">Filters</h3>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//              {/* Type */}
//            <div>
//               <label className="block text-gray-700 font-medium mb-2">Type</label>
//               <select
//                 name="type"
//                 value={filters.type}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#204080] focus:border-[#204080] appearance-none bg-white pl-4 pr-10 bg-no-repeat bg-right"
//                 style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' fill='none' viewBox='0 0 12 6'%3E%3Cpath fill='%23204080' d='M0 0L6 6L12 0H0Z'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '12px 6px'}}
//               >
//                 <option value="">Select Type</option>
//                 <option value="placement">Placement</option>
//                 <option value="internship">Internship</option>
//               </select>
//             </div>
//             {/* Batch */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Batch</label>
//               <select
//                 name="batch"
//                 value={filters.batch}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#204080] focus:border-[#204080] appearance-none bg-white pl-4 pr-10 bg-no-repeat bg-right"
//                 style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' fill='none' viewBox='0 0 12 6'%3E%3Cpath fill='%23204080' d='M0 0L6 6L12 0H0Z'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '12px 6px'}}
//               >
//                 <option value="">Select Batch</option>
//                 {filterOptions.batches.map(batch => (
//                   <option key={batch} value={batch}>{batch}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Degree */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Course</label>
//               <select
//                 name="degree"
//                 value={filters.degree}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#204080] focus:border-[#204080] appearance-none bg-white pl-4 pr-10 bg-no-repeat bg-right"
//                 style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' fill='none' viewBox='0 0 12 6'%3E%3Cpath fill='%23204080' d='M0 0L6 6L12 0H0Z'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '12px 6px'}}
//               >
//                 <option value="">Select Course</option>
//                 {filterOptions.degrees.map(degree => (
//                   <option key={degree} value={degree}>{degree}</option>
//                 ))}
//               </select>
//             </div>


//             {/* Department */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Branch</label>
//               <select
//                 name="department"
//                 value={filters.department}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#204080] focus:border-[#204080] appearance-none bg-white pl-4 pr-10 bg-no-repeat bg-right"
//                 style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' fill='none' viewBox='0 0 12 6'%3E%3Cpath fill='%23204080' d='M0 0L6 6L12 0H0Z'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '12px 6px'}}
//               >
//                 <option value="">Select Branch</option>
//                 {filterOptions.departments.map(dept => (
//                   <option key={dept} value={dept}>{dept}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-4 mt-6">
//             <button
//               onClick={applyFilters}
//               className="bg-custom-blue text-white px-6 py-2.5 rounded-lg hover:bg-custom-blue-300 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 hover:shadow-md"
//             >
//               {loading ? (
//                 <>
//                   <FaSpinner className="animate-spin" /> Processing...
//                 </>
//               ) : (
//                 'Apply Filters'
//               )}
//             </button>
//             <button
//               onClick={resetFilters}
//               className="bg-gray-400 text-white px-6 py-2.5 rounded-lg hover:bg-gray-500 transition-all transform hover:-translate-y-0.5 hover:shadow-md"
//             >
//               Reset
//             </button>
//           </div>
//         </div>

//         {/* Double-placed students */}
//         {reportData.length > 0 && (
//           <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 mb-4  shadow-sm">
//             <div className="bg-custom-blue text-white p-2 rounded-full mr-3">
//               <MdInfo size={18} />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-custom-blue font-semibold">Double Placement Highlight</span>
//               <span className="text-gray-700 text-sm">Students with multiple placements/internships are highlighted in blue</span>
//             </div>
//           </div>
//         )}

//         {/* Table*/}
//         <div className="overflow-x-auto rounded-lg shadow-sm" style={{scrollbarWidth: 'thin', scrollbarColor: '#204080 #f1f1f1'}}>
//           <table className="w-full min-w-[1000px]">
//             <thead>
//               <tr className="bg-custom-blue text-white">
//                 <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Sr No</th>
//                 <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Roll No</th>
//                 <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Name</th>
//                 <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Branch</th>
//                 <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Gender</th>
//                 <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Category</th>
//                 <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Date Result</th>
//                 <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Profile</th>
//                 <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Company</th>
//                 <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Package(LPA)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRows.length > 0 ? (
//                 currentRows.map((item, index) => (
//                   <tr 
//                     key={index} 
//                     className={`${item.isDoublePlaced ? doublePlacedClass : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
//                     title={item.isDoublePlaced ? "Student with multiple placements/internships" : ""}
//                   >
//                     <td className="py-3 px-4 border-b border-gray-200 text-center">{indexOfFirstRow + index + 1}</td>
//                     <td className="py-3 px-4 border-b border-gray-200 text-center">{item.roll_no}</td>
//                     <td className="py-3 px-4 border-b border-gray-200 text-center">{item.name}</td>
//                     <td className="py-3 px-4 border-b border-gray-200 text-center">{item.branch}</td>
//                     <td className="py-3 px-4 border-b border-gray-200 text-center">{item.gender}</td>
//                     <td className="py-3 px-4 border-b border-gray-200 text-center">{item.category}</td>
//                     <td className="py-3 px-4 border-b border-gray-200 text-center">{item.date_result}</td>
//                     <td className="py-3 px-4 border-b border-gray-200 text-center">{item.profile}</td>
//                     <td className="py-3 px-4 border-b border-gray-200 text-center">{item.company}</td>
//                     <td className="py-3 px-4 border-b border-gray-200 text-center">{item.package}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="11" className="text-center text-gray-500 py-8">
//                     <div className="flex flex-col items-center">
//                       <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
//                       </svg>
//                       <p>No records found</p>
//                       <p className="text-xs text-gray-400 mt-1">Apply filters to view data</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/*Pagination */}
//         <div className="flex justify-center items-center mt-8 gap-2">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="flex items-center justify-center min-w-[40px] px-3 py-2 bg-[#204080] text-white rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400 transform hover:-translate-y-0.5 disabled:hover:transform-none"
//             aria-label="Previous page"
//           >
//             <MdKeyboardArrowLeft size={20} />
//           </button>
          
//           <div className="bg-gray-100 px-4 py-2 rounded-lg font-semibold text-gray-700 border border-gray-200">
//             Page {currentPage} of {totalPages}
//           </div>
          
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="flex items-center justify-center min-w-[40px] px-3 py-2 bg-[#204080] text-white rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400 transform hover:-translate-y-0.5 disabled:hover:transform-none"
//             aria-label="Next page"
//           >
//             <MdKeyboardArrowRight size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default PPlacementReport;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FaFileExcel, FaSpinner, FaFilter } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdInfo } from 'react-icons/md';

const btechdepartmentOptions = [
  {
    label: "BIO TECHNOLOGY",
    options: [{ value: "BIO TECHNOLOGY", label: "BIO TECHNOLOGY" }],
  },
  {
    label: "CHEMICAL ENGINEERING",
    options: [{ value: "CHEMICAL ENGINEERING", label: "CHEMICAL ENGINEERING" }],
  },
  {
    label: "CIVIL ENGINEERING",
    options: [{ value: "CIVIL ENGINEERING", label: "CIVIL ENGINEERING" }],
  },
  {
    label: "COMPUTER SCIENCE AND ENGINEERING",
    options: [
      {
        value: "COMPUTER SCIENCE AND ENGINEERING",
        label: "COMPUTER SCIENCE AND ENGINEERING",
      },
      {
        value: "DATA SCIENCE AND ENGINEERING",
        label: "DATA SCIENCE AND ENGINEERING",
      },
    ],
  },
  {
    label: "ELECTRICAL ENGINEERING",
    options: [
      { value: "ELECTRICAL ENGINEERING", label: "ELECTRICAL ENGINEERING" },
    ],
  },
  {
    label: "ELECTRONICS AND COMMUNICATION ENGINEERING",
    options: [
      {
        value: "ELECTRONICS AND COMMUNICATION ENGINEERING",
        label: "ELECTRONICS AND COMMUNICATION ENGINEERING",
      },
      {
        value: " ELECTRONICS AND VLSI ENGINEERING",
        label: "ELECTRONICS AND VLSI ENGINEERING",
      },
    ],
  },
  {
    label: "INDUSTRIAL AND PRODUCTION ENGINEERING",
    options: [
      {
        value: "INDUSTRIAL AND PRODUCTION ENGINEERING",
        label: "INDUSTRIAL AND PRODUCTION ENGINEERING",
      },
    ],
  },
  {
    label: "INFORMATION TECHNOLOGY",
    options: [
      { value: "INFORMATION TECHNOLOGY", label: "INFORMATION TECHNOLOGY" },
    ],
  },
  {
    label: "INSTRUMENTATION AND CONTROL ENGINEERING",
    options: [
      {
        value: "INSTRUMENTATION AND CONTROL ENGINEERING",
        label: "INSTRUMENTATION AND CONTROL ENGINEERING",
      },
    ],
  },
  {
    label: "MATHEMATICS AND COMPUTING",
    options: [
      {
        value: "MATHEMATICS AND COMPUTING",
        label: "MATHEMATICS AND COMPUTING",
      },
    ],
  },
  {
    label: "MECHANICAL ENGINEERING",
    options: [
      { value: "MECHANICAL ENGINEERING", label: "MECHANICAL ENGINEERING" },
    ],
  },
  {
    label: "TEXTILE TECHNOLOGY",
    options: [{ value: "TEXTILE TECHNOLOGY", label: "TEXTILE TECHNOLOGY" }],
  },
];

const mtechdepartmentOptions = [
  {
    label: "BIO TECHNOLOGY",
    options: [{ value: "BIO TECHNOLOGY", label: "BIO TECHNOLOGY" }],
  },
  {
    label: "CHEMICAL ENGINEERING",
    options: [{ value: "CHEMICAL ENGINEERING", label: "CHEMICAL ENGINEERING" }],
  },
  {
    label: "CIVIL ENGINEERING",
    options: [
      {
        value: "STRUCTURAL AND CONSTRUCTION ENGINEERING",
        label: "STRUCTURAL AND CONSTRUCTION ENGINEERING",
      },
      {
        value: "GEOTECHNICAL AND GEO-ENVIRONMENTAL ENGINEERING",
        label: "GEOTECHNICAL AND GEO-ENVIRONMENTAL ENGINEERING",
      },
    ],
  },
  {
    label: "COMPUTER SCIENCE AND ENGINEERING",
    options: [
      {
        value: "COMPUTER SCIENCE AND ENGINEERING",
        label: "COMPUTER SCIENCE AND ENGINEERING",
      },
      {
        value: "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)",
        label: "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)",
      },
      {
        value: "DATA SCIENCE AND ENGINEERING",
        label: "DATA SCIENCE AND ENGINEERING",
      },
    ],
  },
  {
    label: "ELECTRICAL ENGINEERING",
    options: [
      { value: "ELECTRIC VEHICLE DESIGN", label: "ELECTRIC VEHICLE DESIGN" },
    ],
  },
  {
    label: "ELECTRONICS AND COMMUNICATION ENGINEERING",
    options: [
      {
        value: "SIGNAL PROCESSING AND MACHINE LEARNING",
        label: "SIGNAL PROCESSING AND MACHINE LEARNING",
      },
      { value: "VLSI DESIGN", label: "VLSI DESIGN" },
    ],
  },
  {
    label: "INDUSTRIAL AND PRODUCTION ENGINEERING",
    options: [
      {
        value: "INDUSTRIAL ENGINEERING AND DATA ANALYTICS",
        label: "INDUSTRIAL ENGINEERING AND DATA ANALYTICS",
      },
    ],
  },
  {
    label: "INFORMATION TECHNOLOGY",
    options: [{ value: "DATA ANALYTICS", label: "DATA ANALYTICS" }],
  },
  {
    label: "CONTROL AND INSTRUMENTATION ENGINEERING",
    options: [
      {
        value: "CONTROL AND INSTRUMENTATION ENGINEERING",
        label: "CONTROL AND INSTRUMENTATION ENGINEERING",
      },
      {
        value: "MACHINE INTELLIGENCE AND AUTOMATION",
        label: "MACHINE INTELLIGENCE AND AUTOMATION",
      },
    ],
  },
  {
    label: "MATHEMATICS AND COMPUTING",
    options: [
      {
        value: "MATHEMATICS AND COMPUTING",
        label: "MATHEMATICS AND COMPUTING",
      },
    ],
  },
  {
    label: "MECHANICAL ENGINEERING",
    options: [
      { value: "DESIGN ENGINEERING", label: "DESIGN ENGINEERING" },
      {
        value: "THERMAL AND ENERGY ENGINEERING",
        label: "THERMAL AND ENERGY ENGINEERING",
      },
    ],
  },
  {
    label: "TEXTILE TECHNOLOGY",
    options: [
      {
        value: "TEXTILE TECHNOLOGY",
        label: "TEXTILE TECHNOLOGY",
      },
      {
        value: "TEXTILE ENGINEERING AND MANAGEMENT",
        label: "TEXTILE ENGINEERING AND MANAGEMENT",
      },
    ],
  },
  {
    label: "RENEWABLE ENERGY",
    options: [{ value: "RENEWABLE ENERGY", label: "RENEWABLE ENERGY" }],
  },
  {
    label: "ARTIFICIAL INTELLIGENCE",
    options: [
      { value: "ARTIFICIAL INTELLIGENCE", label: "ARTIFICIAL INTELLIGENCE" },
    ],
  },
  {
    label: "POWER SYSTEMS AND RELIABILITY",
    options: [
      {
        value: "POWER SYSTEMS AND RELIABILITY",
        label: "POWER SYSTEMS AND RELIABILITY",
      },
    ],
  },
];

const mbadepartmentOptions = [
  { value: "HUMANITIES AND MANAGEMENT", label: "HUMANITIES AND MANAGEMENT" },
];

const mscdepartmentOptions = [
  { value: "CHEMISTRY", label: "CHEMISTRY" },
  { value: "MATHEMATICS", label: "MATHEMATICS" },
  { value: "PHYSICS", label: "PHYSICS" },
];

const phddepartmentOptions = [];

const PPlacementReport = () => {
  const [reportData, setReportData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    batches: ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"],
    degrees: ["B.Tech", "M.Tech", "MBA", "M.Sc", "PHD"],
    departments: []
  });
  const [filters, setFilters] = useState({
    batch: '',
    degree: '',
    department: '',
    type: ''
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    if (filters.degree) {
      let departments = [];
      // Populate departments based on selected degree
      switch (filters.degree) {
        case 'B.Tech':
          departments = btechdepartmentOptions.flatMap(group => group.options.map(opt => opt.value));
          break;
        case 'M.Tech':
          departments = mtechdepartmentOptions.flatMap(group => group.options.map(opt => opt.value));
          break;
        case 'MBA':
          departments = mbadepartmentOptions.map(opt => opt.value);
          break;
        case 'M.Sc':
          departments = mscdepartmentOptions.map(opt => opt.value);
          break;
        case 'PHD':
          departments = phddepartmentOptions.map(opt => opt.value);
          break;
        default:
          departments = [];
      }
      setFilterOptions(prev => ({
        ...prev,
        departments
      }));
    } else {
      setFilterOptions(prev => ({
        ...prev,
        departments: []
      }));
      setFilters(prev => ({
        ...prev,
        department: ''
      }));
    }
  }, [filters.degree]);

  const fetchFilterOptions = async () => {
    try {
      const response = await axios.get('/api/placement-report-filters');
      if (response.data.success) {
        setFilterOptions(prev => ({
          ...prev,
          departments: response.data.filterOptions.departments
        }));
      }
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const fetchReportData = async (currentFilters) => {
    setLoading(true);
    try {
      const { batch, degree, department, type } = currentFilters;
      const queryParams = new URLSearchParams();
      if (batch) queryParams.append('batch', batch);
      if (degree) queryParams.append('degree', degree);
      if (department) queryParams.append('department', department);
      if (type) queryParams.append('type', type);

      const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/pplacementReport/placement-reports?${queryParams.toString()}`);
      if (response.data.success) {
        const processedData = processDoubleplacedStudents(response.data.results);
        setReportData(processedData);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const processDoubleplacedStudents = (data) => {
    const rollNoMap = {};
    
    data.forEach(student => {
      if (!rollNoMap[student.roll_no]) {
        rollNoMap[student.roll_no] = { count: 1, records: [student] };
      } else {
        rollNoMap[student.roll_no].count += 1;
        rollNoMap[student.roll_no].records.push(student);
      }
    });
    
    return data.map(student => ({
      ...student,
      isDoublePlaced: rollNoMap[student.roll_no].count > 1
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'degree' && { department: '' })
    }));    
  };

  const resetFilters = () => {
    setFilters({
      batch: '',
      degree: '',
      department: '',
      type: ''
    });
    setReportData([]);
    setCurrentPage(1);
  };

  const applyFilters = () => {
    fetchReportData(filters);
  };

  const exportToExcel = () => {
    if (reportData.length === 0) return;
    
    const exportData = reportData.map(item => ({
      'Sr.No': item.sr_no,
      'Roll No.': item.roll_no,
      'Name': item.name,
      'Branch': item.branch,
      'Gender': item.gender,
      'Category': item.category,
      'Date Result': item.date_result,
      'Profile': item.profile,
      'Company': item.company,
      'Package (LPA)': item.package,
      'Student Status': item.student_status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Placement Reports');
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    const date = new Date().toISOString().split('T')[0];
    saveAs(data, `Placement_Report_${date}.xlsx`);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = reportData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.max(1, Math.ceil(reportData.length / rowsPerPage));

  const doublePlacedClass = "bg-blue-50 border-l-4 border-blue-400";

  return (
    <div className="font-sans p-1 min-h-screen">
      {loading && <div className="flex justify-center py-10"><FaSpinner className="animate-spin text-custom-blue text-4xl" /></div>}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-bold mb-4 md:mb-0">Placement <span className='text-custom-blue'>Reports</span></h2>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all transform hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={reportData.length === 0}
          >
            <FaFileExcel /> Export to Excel
          </button>
        </div>

        {/* Enhanced Filters Section */}
        <div className="bg-gray-50 p-5 rounded-lg mb-8 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-4">
            <FaFilter className="text-custom-blue mr-2" />
            <h3 className="text-xl font-semibold text-custom-blue">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#204080] focus:border-[#204080] appearance-none bg-white pl-4 pr-10 bg-no-repeat bg-right"
                style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' fill='none' viewBox='0 0 12 6'%3E%3Cpath fill='%23204080' d='M0 0L6 6L12 0H0Z'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '12px 6px'}}
              >
                <option value="">Select Type</option>
                <option value="placement">Placement</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            {/* Batch */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Batch</label>
              <select
                name="batch"
                value={filters.batch}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#204080] focus:border-[#204080] appearance-none bg-white pl-4 pr-10 bg-no-repeat bg-right"
                style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' fill='none' viewBox='0 0 12 6'%3E%3Cpath fill='%23204080' d='M0 0L6 6L12 0H0Z'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '12px 6px'}}
              >
                <option value="">Select Batch</option>
                {filterOptions.batches.map(batch => (
                  <option key={batch} value={batch}>{batch}</option>
                ))}
              </select>
            </div>
            {/* Degree */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Course</label>
              <select
                name="degree"
                value={filters.degree}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#204080] focus:border-[#204080] appearance-none bg-white pl-4 pr-10 bg-no-repeat bg-right"
                style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' fill='none' viewBox='0 0 12 6'%3E%3Cpath fill='%23204080' d='M0 0L6 6L12 0H0Z'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '12px 6px'}}
              >
                <option value="">Select Course</option>
                {filterOptions.degrees.map(degree => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>
            {/* Department */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Branch</label>
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                disabled={!filters.degree}
                className={`w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#204080] focus:border-[#204080] appearance-none bg-white pl-4 pr-10 bg-no-repeat bg-right ${!filters.degree ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' fill='none' viewBox='0 0 12 6'%3E%3Cpath fill='%23204080' d='M0 0L6 6L12 0H0Z'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '12px 6px'}}
              >
                <option value="">Select Branch</option>
                {filterOptions.departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={applyFilters}
              className="bg-custom-blue text-white px-6 py-2.5 rounded-lg hover:bg-custom-blue-300 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 hover:shadow-md"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Processing Snowden
                </>
              ) : (
                'Apply Filters'
              )}
            </button>
            <button
              onClick={resetFilters}
              className="bg-gray-400 text-white px-6 py-2.5 rounded-lg hover:bg-gray-500 transition-all transform hover:-translate-y-0.5 hover:shadow-md"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Double-placed students */}
        {reportData.length > 0 && (
          <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 mb-4 shadow-sm">
            <div className="bg-custom-blue text-white p-2 rounded-full mr-3">
              <MdInfo size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-custom-blue font-semibold">Double Placement Highlight</span>
              <span className="text-gray-700 text-sm">Students with multiple placements/internships are highlighted in blue</span>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-sm" style={{scrollbarWidth: 'thin', scrollbarColor: '#204080 #f1f1f1'}}>
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-custom-blue text-white">
                <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Sr No</th>
                <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Roll No</th>
                <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Name</th>
                <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Branch</th>
                <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Gender</th>
                <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Category</th>
                <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Date Result</th>
                <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Profile</th>
                <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Company</th>
                <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Package(LPA)</th>
                <th className="py-3 px-4 text-center font-semibold border-b-2 bg-custom-blue whitespace-nowrap w-[5%]">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`${item.isDoublePlaced ? doublePlacedClass : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    title={item.isDoublePlaced ? "Student with multiple placements/internships" : ""}
                  >
                    <td className="py-3 px-4 border-b border-gray-200 text-center">{indexOfFirstRow + index + 1}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-center">{item.roll_no}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-center">{item.name}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-center">{item.branch}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-center">{item.gender}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-center">{item.category}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-center">{item.date_result}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-center">{item.profile}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-center">{item.company}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-center">{item.package}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-center">{item.student_status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center text-gray-500 py-8">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                      <p>No records found</p>
                      <p className="text-xs text-gray-400 mt-1">Apply filters to view data</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center min-w-[40px] px-3 py-2 bg-[#204080] text-white rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400 transform hover:-translate-y-0.5 disabled:hover:transform-none"
            aria-label="Previous page"
          >
            <MdKeyboardArrowLeft size={20} />
          </button>
          
          <div className="bg-gray-100 px-4 py-2 rounded-lg font-semibold text-gray-700 border border-gray-200">
            Page {currentPage} of {totalPages}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center min-w-[40px] px-3 py-2 bg-[#204080] text-white rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400 transform hover:-translate-y-0.5 disabled:hover:transform-none"
            aria-label="Next page"
          >
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PPlacementReport;