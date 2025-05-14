// import React, { useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { Input } from '../ui/input';
// import { Select } from '../ui/select';
// import { Button } from '../ui/button';
// import { X, Pencil, Save, Search, Filter, UserCog, GraduationCap, User, Loader2 } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

// import Notification from "./Notification";

// const StudentAnalyticsDashboard = () => {
//   const [filters, setFilters] = useState({
//     department: "",
//     course: "",
//     batch: "",
//     cgpa: "",
//     gender: "",
//     rollno: "",
//     debarred: "",
//     active_backlogs: "",
//     backlogs_history: "",
//     name: "",
//     placementstatus: "",
//     category: "",
//     internshipstatus: "",
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [editedStudent, setEditedStudent] = useState(null);
//   const [sortField, setSortField] = useState("name");
//   const [sortDirection, setSortDirection] = useState("asc");
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleEditClick = (student) => {
//     setEditMode(true);
//     setEditedStudent({ ...student });
//   };

//   const handleApplyFilters = async () => {
//     try {
//       setLoading(true);
//       // Prepare query parameters from filters
//       const queryParams = new URLSearchParams();
//       Object.entries(filters).forEach(([key, value]) => {
//         if (value && value !== "All") {
//           queryParams.append(key, value);
//         }
//       });

//       const response = await axios.get(
//         `${import.meta.env.REACT_APP_BASE_URL}/student-analysis/get?${queryParams.toString()}`,
//         { withCredentials: true }
//       );
//       setData(response.data.data || []);
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to fetch students.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearFilters = () => {
//     setFilters({
//       department: "",
//       course: "",
//       batch: "",
//       cgpa: "",
//       gender: "",
//       debarred: "",
//       active_backlogs: "",
//       backlogs_history: "",
//       rollno: "",
//       name: "",
//       placementstatus: "",
//       category: "",
//       internshipstatus: "",
//     });
//   };

//   const handleSaveClick = async () => {
//     try {
//       await axios.put(
//         `${
//           import.meta.env.REACT_APP_BASE_URL
//         }/student-analysis/profile-update/${editedStudent._id}`,
//         editedStudent,
//         { withCredentials: true }
//       );
//       // Update data locally instead of refetching
//       setData((prevData) =>
//         prevData.map((student) =>
//           student._id === editedStudent._id ? { ...editedStudent } : student
//         )
//       );
//       setEditMode(false);
//     } catch (err) {
//       setError(
//         err.response?.data?.error || "Failed to update student details."
//       );
//     }
//   };

//   const handleChange = (field, value) => {
//     if (!editedStudent) return;

//     setEditedStudent((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const cgpaOptions = [
//     { value: "All", label: "All" },
//     { value: "> 9.0", label: "> 9.0" },
//     { value: "> 8.5", label: "> 8.5" },
//     { value: "> 8.0", label: "> 8.0" },
//     { value: "> 7.5", label: "> 7.5" },
//     { value: "> 7.0", label: "> 7.0" },
//     { value: "> 6.5", label: "> 6.5" },
//     { value: "> 6.0", label: "> 6.0" },
//     { value: "> 5.5", label: "> 5.5" },
//     { value: "> 5.0", label: "> 5.0" },
//   ];

//   const genderOptions = [
//     { value: "All", label: "All" },
//     { value: "Male", label: "Male" },
//     { value: "Female", label: "Female" },
//     { value: "Other", label: "Other" },
//   ];

//   const batchOptions = [
//     { value: "All", label: "All" },
//     { value: "2025", label: "2025" },
//     { value: "2026", label: "2026" },
//     { value: "2027", label: "2027" },
//     { value: "2028", label: "2028" },
//   ];

//   const placementStatusOptions = [
//     { value: "All", label: "All" },
//     { value: "Not Placed", label: "Not Placed" },
//     { value: "Below Dream", label: "Below Dream" },
//     { value: "Dream", label: "Dream" },
//     { value: "Super Dream", label: "Super Dream" },
//   ];

//   const backlogOptions = [
//     { value: true, label: "Yes" },
//     { value: false, label: "No" },
//   ];

//   const categoryOptions = [
//     { value: "All", label: "All" },
//     { value: "General", label: "General" },
//     { value: "GEN-EWS", label: "GEN-EWS" },
//     { value: "SC", label: "SC" },
//     { value: "ST", label: "ST" },
//     { value: "OBC-NCL", label: "OBC-NCL" },
//   ];

//   const internshipStatusOptions = [
//     { value: "All", label: "All" },
//     { value: "No Intern", label: "No Intern" },
//     { value: "2m Intern", label: "2m Intern" },
//     { value: "6m Intern", label: "6m Intern" },
//     { value: "11m Intern", label: "11m Intern" },
//   ];

//   const [departmentOptions, setDepartmentOptions] = useState([]);

//   const courseOptions = [
//     { value: "All", label: "All" },
//     { value: "B.Tech", label: "B.Tech" },
//     { value: "M.Tech", label: "M.Tech" },
//     { value: "MBA", label: "MBA" },
//     { value: "M.Sc.", label: "M.Sc." },
//    /*  { value: "PHD", label: "PHD" }, */
//   ];

//   const btechdepartmentOptions = [
//     {
//       label: "BIO TECHNOLOGY",
//       options: [{ value: "BIO TECHNOLOGY", label: "BIO TECHNOLOGY" }],
//     },
//     {
//       label: "CHEMICAL ENGINEERING",
//       options: [{ value: "CHEMICAL ENGINEERING", label: "CHEMICAL ENGINEERING" }],
//     },
//     {
//       label: "CIVIL ENGINEERING",
//       options: [{ value: "CIVIL ENGINEERING", label: "CIVIL ENGINEERING" }],
//     },
//     {
//       label: "COMPUTER SCIENCE AND ENGINEERING",
//       options: [
//         {
//           value: "COMPUTER SCIENCE AND ENGINEERING",
//           label: "COMPUTER SCIENCE AND ENGINEERING",
//         },
//         {
//           value: "DATA SCIENCE AND ENGINEERING",
//           label: "DATA SCIENCE AND ENGINEERING",
//         },
//       ],
//     },
//     {
//       label: "ELECTRICAL ENGINEERING",
//       options: [
//         { value: "ELECTRICAL ENGINEERING", label: "ELECTRICAL ENGINEERING" },
//       ],
//     },
//     {
//       label: "ELECTRONICS AND COMMUNICATION ENGINEERING",
//       options: [
//         {
//           value: "ELECTRONICS AND COMMUNICATION ENGINEERING",
//           label: "ELECTRONICS AND COMMUNICATION ENGINEERING",
//         },
//         {
//           value: "ELECTRONICS AND VLSI ENGINEERING",
//           label: "ELECTRONICS AND VLSI ENGINEERING",
//         },
//       ],
//     },
//     {
//       label: "INDUSTRIAL AND PRODUCTION ENGINEERING",
//       options: [
//         {
//           value: "INDUSTRIAL AND PRODUCTION ENGINEERING",
//           label: "INDUSTRIAL AND PRODUCTION ENGINEERING",
//         },
//       ],
//     },
//     {
//       label: "INFORMATION TECHNOLOGY",
//       options: [
//         { value: "INFORMATION TECHNOLOGY", label: "INFORMATION TECHNOLOGY" },
//       ],
//     },
//     {
//       label: "INSTRUMENTATION AND CONTROL ENGINEERING",
//       options: [
//         {
//           value: "INSTRUMENTATION AND CONTROL ENGINEERING",
//           label: "INSTRUMENTATION AND CONTROL ENGINEERING",
//         },
//       ],
//     },
//     {
//       label: "MATHEMATICS AND COMPUTING",
//       options: [
//         {
//           value: "MATHEMATICS AND COMPUTING",
//           label: "MATHEMATICS AND COMPUTING",
//         },
//       ],
//     },
//     {
//       label: "MECHANICAL ENGINEERING",
//       options: [
//         { value: "MECHANICAL ENGINEERING", label: "MECHANICAL ENGINEERING" },
//       ],
//     },
//     {
//       label: "TEXTILE TECHNOLOGY",
//       options: [{ value: "TEXTILE TECHNOLOGY", label: "TEXTILE TECHNOLOGY" }],
//     },
//   ];

//   const mtechdepartmentOptions = [
//     {
//       label: "BIO TECHNOLOGY",
//       options: [{ value: "BIO TECHNOLOGY", label: "BIO TECHNOLOGY" }],
//     },
//     {
//       label: "CHEMICAL ENGINEERING",
//       options: [{ value: "CHEMICAL ENGINEERING", label: "CHEMICAL ENGINEERING" }],
//     },
//     {
//       label: "CIVIL ENGINEERING",
//       options: [
//         {
//           value: "STRUCTURAL AND CONSTRUCTION ENGINEERING",
//           label: "STRUCTURAL AND CONSTRUCTION ENGINEERING",
//         },
//         {
//           value: "GEOTECHNICAL AND GEO-ENVIRONMENTAL ENGINEERING",
//           label: "GEOTECHNICAL AND GEO-ENVIRONMENTAL ENGINEERING",
//         },
//       ],
//     },
//     {
//       label: "COMPUTER SCIENCE AND ENGINEERING",
//       options: [
//         {
//           value: "COMPUTER SCIENCE AND ENGINEERING",
//           label: "COMPUTER SCIENCE AND ENGINEERING",
//         },
//         { value: "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)", label: "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)" },
//         {
//           value: "DATA SCIENCE AND ENGINEERING",
//           label: "DATA SCIENCE AND ENGINEERING",
//         },
//       ],
//     },
//     {
//       label: "ELECTRICAL ENGINEERING",
//       options: [
//         { value: "ELECTRIC VEHICLE DESIGN", label: "ELECTRIC VEHICLE DESIGN" },
//       ],
//     },
//     {
//       label: "ELECTRONICS AND COMMUNICATION ENGINEERING",
//       options: [
//         {
//           value: "SIGNAL PROCESSING AND MACHINE LEARNING",
//           label: "SIGNAL PROCESSING AND MACHINE LEARNING",
//         },
//         { value: "VLSI DESIGN", label: "VLSI DESIGN" },
//       ],
//     },
//     {
//       label: "INDUSTRIAL AND PRODUCTION ENGINEERING",
//       options: [
//         {
//           value: "INDUSTRIAL ENGINEERING AND DATA ANALYTICS",
//           label: "INDUSTRIAL ENGINEERING AND DATA ANALYTICS",
//         }
//       ],
//     },
//     {
//       label: "INFORMATION TECHNOLOGY",
//       options: [{ value: "DATA ANALYTICS", label: "DATA ANALYTICS" }],
//     },
//     {
//       label: "CONTROL AND INSTRUMENTATION ENGINEERING",
//       options: [
//         {
//           value: "CONTROL AND INSTRUMENTATION ENGINEERING",
//           label: "CONTROL AND INSTRUMENTATION ENGINEERING",
//         },
//         {
//           value: "MACHINE INTELLIGENCE AND AUTOMATION",
//           label: "MACHINE INTELLIGENCE AND AUTOMATION",
//         },
//       ],
//     },
//     {
//       label: "MATHEMATICS AND COMPUTING",
//       options: [
//         {
//           value: "MATHEMATICS AND COMPUTING",
//           label: "MATHEMATICS AND COMPUTING",
//         },
//       ],
//     },
//     {
//       label: "MECHANICAL ENGINEERING",
//       options: [
//         { value: "DESIGN ENGINEERING", label: "DESIGN ENGINEERING" },
//         {
//           value: "THERMAL AND ENERGY ENGINEERING",
//           label: "THERMAL AND ENERGY ENGINEERING",
//         },
//       ],
//     },
//     {
//       label: "TEXTILE TECHNOLOGY",
//       options: [
//         {
//           value: "TEXTILE TECHNOLOGY",
//           label: "TEXTILE TECHNOLOGY",
//         },
//         {
//           value: "TEXTILE ENGINEERING AND MANAGEMENT",
//           label: "TEXTILE ENGINEERING AND MANAGEMENT",
//         },
//       ],
//     },
//     {
//       label: "RENEWABLE ENERGY",
//       options: [{ value: "RENEWABLE ENERGY", label: "RENEWABLE ENERGY" }],
//     },
//     {
//       label: "ARTIFICIAL INTELLIGENCE",
//       options: [
//         { value: "ARTIFICIAL INTELLIGENCE", label: "ARTIFICIAL INTELLIGENCE" },
//       ],
//     },
//     {
//       label: "POWER SYSTEMS AND RELIABILITY",
//       options: [
//         {
//           value: "POWER SYSTEMS AND RELIABILITY",
//           label: "POWER SYSTEMS AND RELIABILITY",
//         },
//       ],
//     },
//   ];

//   const mbadepartmentOptions = [
//     {value:"HUMANITIES AND MANAGEMENT", label:"HUMANITIES AND MANAGEMENT"},
//   ];

//   const mscdepartmentOptions = [
//     { value: "CHEMISTRY", label: "CHEMISTRY" },
//     { value: "MATHEMATICS", label: "MATHEMATICS" },
//     { value: "PHYSICS", label: "PHYSICS" },
//   ];

//   const phddepartmentOptions = [];

//   const allDepartments = [
//     ...btechdepartmentOptions.flatMap((group) => group.options),
//     ...mtechdepartmentOptions.flatMap((group) => group.options),
//     ...mbadepartmentOptions,
//     ...mscdepartmentOptions,
//     ...phddepartmentOptions,
//   ];

//   const uniqueDepartments = [
//     ...new Set(allDepartments.map((dept) => dept.value)),
//   ];

//   const sortedUniqueDepartments = uniqueDepartments.sort((a, b) =>
//     a.localeCompare(b)
//   );

//   const formattedDepartments = sortedUniqueDepartments.map((dept) => ({
//     value: dept,
//     label: dept,
//   }));

//   React.useEffect(() => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       department: "",
//     }));

//     switch (filters.course) {
//       case "B.Tech":
//         setDepartmentOptions(btechdepartmentOptions);
//         break;
//       case "M.Tech":
//         setDepartmentOptions(mtechdepartmentOptions);
//         break;
//       case "MBA":
//         setDepartmentOptions(mbadepartmentOptions);
//         break;
//       case "M.Sc.":
//         setDepartmentOptions(mscdepartmentOptions);
//         break;
//       case "PHD":
//         setDepartmentOptions(phddepartmentOptions);
//         break;
//       default:
//         setDepartmentOptions(formattedDepartments);
//         break;
//     }
//   }, [filters.course]);

//   const filteredStudents = data.filter((student) => {
//     return (
//       (filters.department === "" ||
//         filters.department === "All" ||
//         student.department === filters.department) &&
//       (filters.course === "" ||
//         filters.course === "All" ||
//         student.course === filters.course) &&
//       (filters.batch === "" ||
//         filters.batch === "All" ||
//         student.batch === filters.batch) &&
//       (filters.cgpa === "" ||
//         filters.cgpa === "All" ||
//         parseFloat(student.cgpa) >
//           parseFloat(filters.cgpa.replace("> ", ""))) &&
//       (filters.placementstatus === "" ||
//         filters.placementstatus === "All" ||
//         student.placementstatus === filters.placementstatus) &&
//       (filters.gender === "" ||
//         filters.gender === "All" ||
//         student.gender === filters.gender) &&
//       (filters.debarred === "" ||
//         filters.debarred === "All" ||
//         student.debarred === (filters.debarred === "true")) &&
//       (filters.active_backlogs === "" ||
//         filters.active_backlogs === "All" ||
//         student.active_backlogs === (filters.active_backlogs === "true")) &&
//       (filters.backlogs_history === "" ||
//         filters.backlogs_history === "All" ||
//         student.backlogs_history === (filters.backlogs_history === "true")) &&
//       (filters.name === "" ||
//         student.name.toLowerCase().includes(filters.name.toLowerCase())) &&
//       (filters.rollno === "" ||
//         student.rollno.toLowerCase().includes(filters.rollno.toLowerCase())) &&
//       (filters.category === "" ||
//         filters.category === "All" ||
//         student.category === filters.category) &&
//       (filters.internshipstatus === "" ||
//         filters.internshipstatus === "All" ||
//         student.internshipstatus === filters.internshipstatus)
//     );
//   });

//   const getAssessmentData = (student) => {
//     if (!student) return [];

//     return Object.entries(student.assessments).map(([type, data]) => ({
//       name: type.charAt(0).toUpperCase() + type.slice(1),
//       total: data.total,
//       shortlisted: data.shortlisted,
//       rejected: data.rejected,
//       absent: data.absent,
//     }));
//   };

//   const getAssessmentStats = (student) => {
//     if (!student?.assessments) return null;

//     const stats = {
//       total: 0,
//       shortlisted: 0,
//       rejected: 0,
//       absent: 0,
//     };

//     Object.values(student.assessments).forEach((assessment) => {
//       stats.total += assessment.total || 0;
//       stats.shortlisted += assessment.shortlisted || 0;
//       stats.rejected += assessment.rejected || 0;
//       stats.absent += assessment.absent || 0;
//     });

//     stats.successRate = ((stats.shortlisted / stats.total) * 100).toFixed(1);

//     return stats;
//   };

//   if (error) {
//     return <div className="p-6 text-red-500">Error: {error}</div>;
//   }

//   const sortedStudents = [...filteredStudents].sort((a, b) => {
//     if (sortField === "name") {
//       return sortDirection === "asc"
//         ? a.name.localeCompare(b.name)
//         : b.name.localeCompare(a.name);
//     } else if (sortField === "cgpa") {
//       return sortDirection === "asc"
//         ? parseFloat(a.cgpa) - parseFloat(b.cgpa)
//         : parseFloat(b.cgpa) - parseFloat(a.cgpa);
//     }
//     return 0;
//   });

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortDirection("asc");
//     }
//   };

//   const handleDialogClose = () => {
//     setEditMode(false);
//     setEditedStudent(null);
//   };

//   return (
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             Student <span className="text-custom-blue">Analytics</span>
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Track and manage student performance and placement data
//           </p>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="bg-white rounded-lg p-3 shadow-sm">
//             {loading ? (
//               <div className="flex items-center gap-2">
//                 <Loader2 className="h-6 w-6 animate-spin text-custom-blue" />
//                 <span className="text-sm text-gray-600">Loading...</span>
//               </div>
//             ) : (
//               <>
//                 <div className="text-2xl font-bold text-custom-blue">{filteredStudents.length}</div>
//                 <div className="text-sm text-gray-600">Total Students</div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Filters Section */}
//       <Card className="shadow-lg border-0">
//         <CardHeader>
//           <CardTitle className="text-lg flex items-center gap-2">
//             <Filter className="h-5 w-5" />
//             Filter Students
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Course
//               </label>
//               <Select
//                 options={courseOptions}
//                 value={filters.course}
//                 onValueChange={(value) =>
//                   setFilters({ ...filters, course: value })
//                 }
//                 className="w-full"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Department
//               </label>
//               <Select
//                 options={departmentOptions}
//                 value={filters.department}
//                 onValueChange={(value) =>
//                   setFilters({ ...filters, department: value })
//                 }
//                 className="w-full"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">Batch</label>
//               <Select
//                 options={batchOptions}
//                 value={filters.batch}
//                 onValueChange={(value) =>
//                   setFilters({ ...filters, batch: value })
//                 }
//                 className="w-full"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">CGPA</label>
//               <Select
//                 options={cgpaOptions}
//                 value={filters.cgpa}
//                 onValueChange={(value) =>
//                   setFilters({ ...filters, cgpa: value })
//                 }
//                 className="w-full"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Placement Status
//               </label>
//               <Select
//                 options={placementStatusOptions}
//                 value={filters.placementstatus}
//                 onValueChange={(value) =>
//                   setFilters({ ...filters, placementstatus: value })
//                 }
//                 className="w-full"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Debarred
//               </label>
//               <Select
//                 options={backlogOptions}
//                 value={filters.debarred}
//                 onValueChange={(value) =>
//                   setFilters({ ...filters, debarred: value })
//                 }
//                 className="w-full"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Active Backlogs
//               </label>
//               <Select
//                 options={backlogOptions}
//                 value={filters.active_backlogs}
//                 onValueChange={(value) =>
//                   setFilters({ ...filters, active_backlogs: value })
//                 }
//                 className="w-full"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Backlogs History
//               </label>
//               <Select
//                 options={backlogOptions}
//                 value={filters.backlogs_history}
//                 onValueChange={(value) =>
//                   setFilters({ ...filters, backlogs_history: value })
//                 }
//                 className="w-full"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Gender
//               </label>
//               <Select
//                 options={genderOptions}
//                 value={filters.gender}
//                 onValueChange={(value) =>
//                   setFilters({ ...filters, gender: value })
//                 }
//                 className="w-full"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Category
//               </label>
//               <Select
//                 options={categoryOptions}
//                 value={filters.category}
//                 onValueChange={(value) =>
//                   setFilters({ ...filters, category: value })
//                 }
//                 className="w-full"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Internship Status
//               </label>
//               <Select
//                 options={internshipStatusOptions}
//                 value={filters.internshipstatus}
//                 onValueChange={(value) =>
//                   setFilters({ ...filters, internshipstatus: value })
//                 }
//                 className="w-full"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Search Name
//               </label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search by name..."
//                   value={filters.name}
//                   onChange={(e) =>
//                     setFilters({ ...filters, name: e.target.value })
//                   }
//                   className="pl-10"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Roll Number
//               </label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search by roll no..."
//                   value={filters.rollno}
//                   onChange={(e) =>
//                     setFilters({ ...filters, rollno: e.target.value })
//                   }
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-4 flex justify-end gap-4">
//             <Button
//               variant="outline"
//               className="flex items-center gap-2"
//               onClick={clearFilters}
//             >
//               <X className="h-4 w-4" />
//               Clear Filters
//             </Button>
//             <Button
//               className="flex items-center gap-2 bg-custom-blue text-white hover:bg-blue-700"
//               onClick={handleApplyFilters}
//               disabled={loading}
//             >
//               {loading ? (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Filter className="h-4 w-4" />
//               )}
//               Apply Filters
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="flex items-center gap-4 mb-4">
//         <span className="text-sm font-medium text-gray-700">Sort by:</span>
//         <Button
//           variant="outline"
//           className={`flex items-center gap-2 ${
//             sortField === "name" ? "bg-blue-50" : ""
//           }`}
//           onClick={() => handleSort("name")}
//         >
//           Name
//           {sortField === "name" && (
//             <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
//           )}
//         </Button>
//         <Button
//           variant="outline"
//           className={`flex items-center gap-2 ${
//             sortField === "cgpa" ? "bg-blue-50" : ""
//           }`}
//           onClick={() => handleSort("cgpa")}
//         >
//           CGPA
//           {sortField === "cgpa" && (
//             <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
//           )}
//         </Button>
//       </div>

//       {/* Students Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {sortedStudents.map((student) => (
//           <Dialog
//             key={student._id}
//             onOpenChange={(open) => {
//               if (!open) {
//                 handleDialogClose();
//               }
//             }}
//           >
//             <DialogTrigger asChild>
//               <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-400  hover:scale-105 hover:bg-white">
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <div className="flex items-center gap-2">
//                         <UserCog className="h-5 w-5 text-gray-400" />

//                         <h3 className="font-bold text-lg  text-gray-900">
//                           {student.name}
//                         </h3>
//                       </div>
//                       <p className="text-sm text-gray-500 mt-1">
//                         {student.rollno}
//                       </p>
//                       <span className="text-sm text-gray-600">
//                         {student.course}
//                       </span>
//                     </div>
//                     <GraduationCap className="h-6 w-6 text-blue-500" />
//                   </div>

//                   <div className="mt-2 space-y-2">
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm text-gray-600">
//                         {student.department}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm text-gray-600">
//                         Batch: {student.batch}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm text-gray-600">
//                         CGPA: {student.cgpa}
//                       </span>
//                     </div>
//                   </div>

//                   <div
//                     className={`mt-4 inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                       student.placementstatus === "Super Dream"
//                         ? "bg-green-100 text-green-800"
//                         : student.placementstatus === "Dream"
//                         ? "bg-blue-100 text-blue-800"
//                         : student.placementstatus === "Below Dream"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-gray-600 text-gray-100"
//                     }`}
//                   >
//                     {student.placementstatus}
//                   </div>
//                 </CardContent>
//               </Card>
//             </DialogTrigger>

//             {/* Student Details Dialog */}
//             <DialogContent className="max-w-6xl max-h-[90vh] p-0">
//               <div className="overflow-y-auto max-h-[90vh] px-6">
//                 <DialogHeader className="sticky top-0 bg-white py-4 z-10">
//                   <div className="flex flex-col  gap-4 sm:flex-row sm:justify-between">
//                     {/* Title Section - Centered */}
//                     <DialogTitle className="text-2xl font-bold flex items-center gap-2 justify-center lg:items-center lg:justify-center">
//                       <User className="h-6 w-6 text-blue-500" />
//                       {student.name}
//                     </DialogTitle>

//                     {/* Button Section - Stacked on Small Screens, Inline on Larger Screens */}
//                     <Button
//                       variant="outline"
//                       className="flex items-center gap-2 hover:scale-105 focus:outline-none"
//                       onClick={() =>
//                         editMode ? handleSaveClick() : handleEditClick(student)
//                       }
//                     >
//                       {editMode ? (
//                         <>
//                           <Save className="h-4 w-4" />
//                           Save Changes
//                         </>
//                       ) : (
//                         <>
//                           <Pencil className="h-4 w-4" />
//                           Edit Details
//                         </>
//                       )}
//                     </Button>
//                   </div>
//                 </DialogHeader>

//                 <div className="mt-6 ">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 overflow-x-hidden">
//                     {/* Left Column */}
//                     <div className="space-y-6">
//                       <Card className="border-0 shadow-sm">
//                         <CardHeader>
//                           <CardTitle className="text-lg">
//                             Personal Information
//                           </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                           <div>
//                             <label className="text-sm font-medium text-gray-700">
//                               Name
//                             </label>
//                             {editMode ? (
//                               <Input
//                                 value={editedStudent.name}
//                                 onChange={(e) =>
//                                   handleChange("name", e.target.value)
//                                 }
//                                 className="mt-1"
//                               />
//                             ) : (
//                               <p className="mt-1 text-gray-900">
//                                 {student.name}
//                               </p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="text-sm font-medium text-gray-700">
//                               Email
//                             </label>
//                             {editMode ? (
//                               <Input
//                                 value={editedStudent.email}
//                                 onChange={(e) =>
//                                   handleChange("email", e.target.value)
//                                 }
//                                 className="mt-1"
//                               />
//                             ) : (
//                               <p className="mt-1 text-gray-900">
//                                 {student.email}
//                               </p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="text-sm font-medium text-gray-700">
//                               Phone
//                             </label>
//                             {editMode ? (
//                               <Input
//                                 value={editedStudent.phone}
//                                 onChange={(e) =>
//                                   handleChange("phone", e.target.value)
//                                 }
//                                 className="mt-1"
//                               />
//                             ) : (
//                               <p className="mt-1 text-gray-900">
//                                 {student.phone}
//                               </p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="text-sm font-medium text-gray-700">
//                               Roll Number
//                             </label>
//                             {editMode ? (
//                               <Input
//                                 value={editedStudent.rollno}
//                                 onChange={(e) =>
//                                   handleChange("rollno", e.target.value)
//                                 }
//                                 className="mt-1"
//                               />
//                             ) : (
//                               <p className="mt-1 text-gray-900">
//                                 {student.rollno}
//                               </p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="text-sm font-medium text-gray-700">
//                               Category
//                             </label>
//                             {editMode ? (
//                               <Select
//                                 options={categoryOptions}
//                                 value={editedStudent.category}
//                                 onValueChange={(value) =>
//                                   handleChange("category", value)
//                                 }
//                                 className="mt-1"
//                               />
//                             ) : (
//                               <p className="mt-1 text-gray-900">
//                                 {student.category}
//                               </p>
//                             )}
//                           </div>
//                         </CardContent>
//                       </Card>
//                     </div>

//                     {/* Right Column */}
//                     <div className="space-y-6">
//                       <Card className="border-0 shadow-sm">
//                         <CardHeader>
//                           <CardTitle className="text-lg">
//                             Placement Details
//                           </CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                           <div>
//                             <label className="text-sm font-medium text-gray-700">
//                               Placement Status
//                             </label>
//                             {editMode ? (
//                               <Select
//                                 options={placementStatusOptions}
//                                 value={editedStudent.placementstatus}
//                                 onValueChange={(value) =>
//                                   handleChange("placementstatus", value)
//                                 }
//                                 className="mt-1"
//                               />
//                             ) : (
//                               <div
//                                 className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                                   student.placementstatus === "Super Dream"
//                                     ? "bg-green-100 text-green-800"
//                                     : student.placementstatus === "Dream"
//                                     ? "bg-blue-100 text-blue-800"
//                                     : student.placementstatus === "Below Dream"
//                                     ? "bg-yellow-100 text-yellow-800"
//                                     : "bg-gray-100 text-gray-800"
//                                 }`}
//                               >
//                                 {student.placementstatus}
//                               </div>
//                             )}
//                           </div>
//                           <div>
//                             <label className="text-sm font-medium text-gray-700">
//                               Debarred
//                             </label>
//                             {editMode ? (
//                               <Select
//                                 options={backlogOptions}
//                                 value={editedStudent.debarred}
//                                 onValueChange={(value) =>
//                                   handleChange("debarred", value)
//                                 }
//                                 className="mt-1"
//                               />
//                             ) : (
//                               <p className="mt-1 text-gray-900">
//                                 {student.debarred ? "Yes" : "No"}
//                               </p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="text-sm font-medium text-gray-700">
//                               Internship Status
//                             </label>
//                             {editMode ? (
//                               <Select
//                                 options={internshipStatusOptions}
//                                 value={editedStudent.internshipstatus}
//                                 onValueChange={(value) =>
//                                   handleChange("internshipstatus", value)
//                                 }
//                                 className="mt-1"
//                               />
//                             ) : (
//                               <p className="mt-1 text-gray-900">
//                                 {student.internshipstatus}
//                               </p>
//                             )}
//                           </div>
//                         </CardContent>
//                       </Card>
//                       <Card className="border-0 shadow-sm"></Card>
//                     </div>
//                   </div>
//                   <Card className="border-0 shadow-sm">
//                     <CardHeader>
//                       <CardTitle className="text-lg">
//                         Academic Details
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {/* Department */}
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">
//                             Department
//                           </label>
//                           {editMode ? (
//                             <Select
//                               options={departmentOptions}
//                               value={editedStudent.department}
//                               onValueChange={(value) =>
//                                 handleChange("department", value)
//                               }
//                               className="mt-1"
//                             />
//                           ) : (
//                             <p className="mt-1 text-gray-900">
//                               {student.department}
//                             </p>
//                           )}
//                         </div>

//                         {/* Course */}
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">
//                             Course
//                           </label>
//                           {editMode ? (
//                             <Select
//                               options={courseOptions}
//                               value={editedStudent.course}
//                               onValueChange={(value) =>
//                                 handleChange("course", value)
//                               }
//                               className="mt-1"
//                             />
//                           ) : (
//                             <p className="mt-1 text-gray-900">
//                               {student.course}
//                             </p>
//                           )}
//                         </div>

//                         {/* CGPA */}
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">
//                             CGPA
//                           </label>
//                           {editMode ? (
//                             <Input
//                               type="number"
//                               min="0"
//                               max="10"
//                               step="0.01"
//                               value={editedStudent.cgpa}
//                               onChange={(e) =>
//                                 handleChange("cgpa", e.target.value)
//                               }
//                               className="mt-1"
//                             />
//                           ) : (
//                             <p className="mt-1 text-gray-900">{student.cgpa}</p>
//                           )}
//                         </div>

//                         {/* Batch */}
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">
//                             Batch
//                           </label>
//                           {editMode ? (
//                             <Select
//                               options={batchOptions}
//                               value={editedStudent.batch}
//                               onValueChange={(value) =>
//                                 handleChange("batch", value)
//                               }
//                               className="mt-1"
//                             />
//                           ) : (
//                             <p className="mt-1 text-gray-900">
//                               {student.batch}
//                             </p>
//                           )}
//                         </div>

//                         {/* Active Backlogs */}
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">
//                             Active Backlog
//                           </label>
//                           {editMode ? (
//                             <Select
//                               options={backlogOptions}
//                               value={editedStudent.active_backlogs}
//                               onValueChange={(value) =>
//                                 handleChange("active_backlogs", value)
//                               }
//                               className="mt-1"
//                             />
//                           ) : (
//                             <p className="mt-1 text-gray-900">
//                               {student.active_backlogs ? "Yes" : "No"}
//                             </p>
//                           )}
//                         </div>

//                         {/* Backlogs History */}
//                         <div>
//                           <label className="text-sm font-medium text-gray-700">
//                             Backlogs History
//                           </label>
//                           {editMode ? (
//                             <Select
//                               options={backlogOptions}
//                               value={editedStudent.backlogs_history}
//                               onValueChange={(value) =>
//                                 handleChange("backlogs_history", value)
//                               }
//                               className="mt-1"
//                             />
//                           ) : (
//                             <p className="mt-1 text-gray-900">
//                               {student.backlogs_history ? "Yes" : "No"}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <CardHeader>
//                     <CardTitle className="text-lg">
//                       Assessment Performance
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     {/* Stats Grid */}
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                       <div className="bg-blue-50 rounded-lg p-4">
//                         <div className="text-blue-600 text-sm font-medium">
//                           Total Assessments
//                         </div>
//                         <div className="mt-2 flex items-baseline">
//                           <div className="text-2xl font-bold text-blue-700">
//                             {getAssessmentStats(student)?.total || 0}
//                           </div>
//                           <div className="ml-2 text-sm text-blue-600">
//                             tests
//                           </div>
//                         </div>
//                       </div>

//                       <div className="bg-green-50 rounded-lg p-4">
//                         <div className="text-green-600 text-sm font-medium">
//                           Shortlisted
//                         </div>
//                         <div className="mt-2 flex items-baseline">
//                           <div className="text-2xl font-bold text-green-700">
//                             {getAssessmentStats(student)?.shortlisted || 0}
//                           </div>
//                           <div className="ml-2 text-sm text-green-600">
//                             ({getAssessmentStats(student)?.successRate || 0}%)
//                           </div>
//                         </div>
//                       </div>

//                       <div className="bg-red-50 rounded-lg p-4">
//                         <div className="text-red-600 text-sm font-medium">
//                           Rejected
//                         </div>
//                         <div className="mt-2 flex items-baseline">
//                           <div className="text-2xl font-bold text-red-700">
//                             {getAssessmentStats(student)?.rejected || 0}
//                           </div>
//                           <div className="ml-2 text-sm text-red-600">tests</div>
//                         </div>
//                       </div>

//                       <div className="bg-amber-50 rounded-lg p-4">
//                         <div className="text-amber-600 text-sm font-medium">
//                           Absent
//                         </div>
//                         <div className="mt-2 flex items-baseline">
//                           <div className="text-2xl font-bold text-amber-700">
//                             {getAssessmentStats(student)?.absent || 0}
//                           </div>
//                           <div className="ml-2 text-sm text-amber-600">
//                             tests
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Chart */}
//                     <div className="h-72  p-0">
//                       <ResponsiveContainer width="100%" height="100%">
//                         <BarChart data={getAssessmentData(student)}>
//                           <CartesianGrid strokeDasharray="3 3" />
//                           <XAxis dataKey="name" />
//                           <YAxis />
//                           <Tooltip />
//                           <Bar dataKey="total" fill="#6366f1" name="Total" />
//                           <Bar
//                             dataKey="shortlisted"
//                             fill="#22c55e"
//                             name="Shortlisted"
//                           />
//                           <Bar
//                             dataKey="rejected"
//                             fill="#ef4444"
//                             name="Rejected"
//                           />
//                           <Bar dataKey="absent" fill="#f59e0b" name="Absent" />
//                         </BarChart>
//                       </ResponsiveContainer>
//                     </div>

//                     {/* Assessment Type Breakdown */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
//                       {Object.entries(student?.assessments || {}).map(
//                         ([type, data]) => (
//                           <div
//                             key={type}
//                             className="p-6 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center text-center"
//                           >
//                             {/* Heading */}
//                             <div className="font-semibold text-lg capitalize mb-4">
//                               {type}
//                             </div>

//                             {/* Centered Status Row */}
//                             <div className="flex flex-wrap justify-center items-center gap-6 text-sm w-full">
//                               <div className="flex items-center">
//                                 <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
//                                 <span className="text-gray-600">
//                                   Total: {data.total}
//                                 </span>
//                               </div>
//                               <div className="flex items-center">
//                                 <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
//                                 <span className="text-gray-600">
//                                   Passed: {data.shortlisted}
//                                 </span>
//                               </div>
//                               <div className="flex items-center">
//                                 <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
//                                 <span className="text-gray-600">
//                                   Failed: {data.rejected}
//                                 </span>
//                               </div>
//                               <div className="flex items-center">
//                                 <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
//                                 <span className="text-gray-600">
//                                   Absent: {data.absent}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   </CardContent>
//                   {/* Applications Section */}
//                   <Card className="mt-6 border-0 shadow-sm">
//                     <CardHeader>
//                       <CardTitle className="text-lg">Applied Jobs</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {student.applications.jobProfiles.map((job, index) => (
//                           <Card
//                             key={index}
//                             className="p-4 border border-gray-100"
//                           >
//                             <h4 className="font-semibold text-gray-900">
//                               {job.company_name}
//                             </h4>
//                             <p className="text-gray-600 mt-1">{job.job_role}</p>
//                             <div className="flex gap-2 mt-2">
//                               <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//                                 {job.job_type}
//                               </span>
//                               <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
//                                 {job.job_class}
//                               </span>
//                             </div>
//                           </Card>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>
//             </DialogContent>
//           </Dialog>
//         ))}
//       </div>
//       <Notification />
//     </div>
//   );
// };

// export default StudentAnalyticsDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import Select from 'react-select';
import { Button } from '../ui/button';
import { X, Pencil, Save, Search, Filter, UserCog, GraduationCap, User, Loader2, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'react-hot-toast';
import Notification from "./Notification";

const StudentAnalyticsDashboard = () => {
  const [filters, setFilters] = useState({
    department: "",
    course: "",
    batch: "",
    cgpa: "",
    gender: "",
    rollno: "",
    debarred: "",
    active_backlogs: "",
    backlogs_history: "",
    name: "",
    placementstatus: "",
    category: "",
    internshipstatus: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [offerEditMode, setOfferEditMode] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);
  const [editedOfferTracker, setEditedOfferTracker] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobProfiles, setJobProfiles] = useState([]);

  const handleEditClick = (student) => {
    setEditMode(true);
    setEditedStudent({ ...student });
  };

  const handleOfferEditClick = (student) => {
    setOfferEditMode(true);
    setEditedOfferTracker({
      studentId: student._id,
      offer: student?.offers.map(o => ({ ...o, jobId: o.jobId || null })) || []
    });
  };

  const handleApplyFilters = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "All") {
          queryParams.append(key, value);
        }
      });

      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/student-analysis/get?${queryParams.toString()}`,
        { withCredentials: true }
      );
      setData(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      department: "",
      course: "",
      batch: "",
      cgpa: "",
      gender: "",
      debarred: "",
      active_backlogs: "",
      backlogs_history: "",
      rollno: "",
      name: "",
      placementstatus: "",
      category: "",
      internshipstatus: "",
    });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `${import.meta.env.REACT_APP_BASE_URL}/student-analysis/profile-update/${editedStudent._id}`,
        editedStudent,
        { withCredentials: true }
      );
      setData((prevData) =>
        prevData.map((student) =>
          student._id === editedStudent._id ? { ...editedStudent } : student
        )
      );
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update student details.");
    }
  };

  const handleOfferSaveClick = async () => {
    try {
      await axios.put(
        `${import.meta.env.REACT_APP_BASE_URL}/student-analysis/offer-tracker-update/${editedOfferTracker.studentId}`,
        editedOfferTracker,
        { withCredentials: true }
      );
      setData((prevData) =>
        prevData.map((student) =>
          student._id === editedOfferTracker.studentId
            ? { ...student, offers: editedOfferTracker.offer }
            : student
        )
      );
      setOfferEditMode(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update offer tracker.");
    }
  };

  const handleOfferCancelClick = () => {
    setOfferEditMode(false);
    setEditedOfferTracker(null);
  };

  const handleChange = (field, value) => {
    if (!editedStudent) return;
    setEditedStudent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOfferChange = (index, field, value) => {
    if (!editedOfferTracker) return;
    const newOffers = [...editedOfferTracker.offer];
    newOffers[index] = { ...newOffers[index], [field]: value === '' ? null : value };
    setEditedOfferTracker((prev) => ({
      ...prev,
      offer: newOffers,
    }));
  };

  const addNewOffer = () => {
    const newOffer = {
      offer_type: null,
      offer_category: null,
      offer_sector: null,
      jobId: null
    };

    if (!newOffer.offer_type || !newOffer.offer_category || !newOffer.offer_sector) {
      toast.error("Please select Offer Type, Offer Category, and Offer Sector");
      return;
    }

    setEditedOfferTracker((prev) => ({
      ...prev,
      offer: [...prev.offer, newOffer]
    }));
  };

  const removeOffer = (index) => {
    setEditedOfferTracker((prev) => ({
      ...prev,
      offer: prev.offer.filter((_, i) => i !== index)
    }));
  };

  const cgpaOptions = [
    { value: "All", label: "All" },
    { value: "> 9.0", label: "> 9.0" },
    { value: "> 8.5", label: "> 8.5" },
    { value: "> 8.0", label: "> 8.0" },
    { value: "> 7.5", label: "> 7.5" },
    { value: "> 7.0", label: "> 7.0" },
    { value: "> 6.5", label: "> 6.5" },
    { value: "> 6.0", label: "> 6.0" },
    { value: "> 5.5", label: "> 5.5" },
    { value: "> 5.0", label: "> 5.0" },
  ];

  const genderOptions = [
    { value: "All", label: "All" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const batchOptions = [
    { value: "All", label: "All" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
    { value: "2028", label: "2028" },
    { value: "2029", label: "2029" },
    { value: "2030", label: "2030" },
    { value: "2031", label: "2031" },
  ];

  const placementStatusOptions = [
    { value: "All", label: "All" },
    { value: "Not Placed", label: "Not Placed" },
    { value: "Below Dream", label: "Below Dream" },
    { value: "Dream", label: "Dream" },
    { value: "Super Dream", label: "Super Dream" },
  ];

  const backlogOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const categoryOptions = [
    { value: "All", label: "All" },
    { value: "General", label: "General" },
    { value: "GEN-EWS", label: "GEN-EWS" },
    { value: "OBC", label: "OBC" },
    { value: "OBC-NCL", label: "OBC-NCL" },
    { value: "SC", label: "SC" },
    { value: "ST", label: "ST" },
  ];

  const internshipStatusOptions = [
    { value: "All", label: "All" },
    { value: "No Intern", label: "No Intern" },
    { value: "2m Intern", label: "2m Intern" },
    { value: "6m Intern", label: "6m Intern" },
    { value: "11m Intern", label: "11m Intern" },
  ];

  const offerTypeOptions = [
    { value: "Intern", label: "Intern" },
    { value: "Intern+PPO", label: "Intern+PPO" },
    { value: "Intern+FTE", label: "Intern+FTE" },
    { value: "FTE", label: "FTE" },
  ];

  const offerCategoryOptions = [
    { value: "Not Considered", label: "Not Considered" },
    { value: "Below Dream", label: "Below Dream" },
    { value: "Dream", label: "Dream" },
    { value: "Super Dream", label: "Super Dream" },
  ];

  const offerSectorOptions = [
    { value: "PSU", label: "PSU" },
    { value: "Private", label: "Private" },
  ];

  const [departmentOptions, setDepartmentOptions] = useState([]);

  const courseOptions = [
    { value: "All", label: "All" },
    { value: "B.Tech", label: "B.Tech" },
    { value: "M.Tech", label: "M.Tech" },
    { value: "MBA", label: "MBA" },
    { value: "M.Sc.", label: "M.Sc." },
  ];

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
          value: "ELECTRONICS AND VLSI ENGINEERING",
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
        { value: "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)", label: "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)" },
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
        }
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
    {
      label: "HUMANITIES AND MANAGEMENT",
      options: [{ value: "HUMANITIES AND MANAGEMENT", label: "HUMANITIES AND MANAGEMENT" }],
    },
  ];

  const mscdepartmentOptions = [
    {
      label: "CHEMISTRY",
      options: [{ value: "CHEMISTRY", label: "CHEMISTRY" }],
    },
    {
      label: "MATHEMATICS",
      options: [{ value: "MATHEMATICS", label: "MATHEMATICS" }],
    },
    {
      label: "PHYSICS",
      options: [{ value: "PHYSICS", label: "PHYSICS" }],
    },
  ];

  const phddepartmentOptions = [];

  const allDepartments = [
    ...btechdepartmentOptions,
    ...mtechdepartmentOptions,
    ...mbadepartmentOptions,
    ...mscdepartmentOptions,
    ...phddepartmentOptions,
  ];

  // Custom styles for react-select
  const customSelectStyles = {
    groupHeading: (provided) => ({
      ...provided,
      fontWeight: 'bold',
      fontSize: '14px',
      color: '#1f2937', // gray-800
      padding: '8px 12px',
    }),
    option: (provided, state) => ({
      ...provided,
      fontWeight: 'normal', // All options in normal weight
      paddingLeft: state.isNested ? '24px' : '12px', // Indent nested options
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#f3f4f6' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
    }),
    control: (provided) => ({
      ...provided,
      borderColor: '#d1d5db',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
  };

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      department: "",
    }));

    // Format department options to mark nested options
    const formatDepartmentOptions = (departments) => {
      return departments.map(group => ({
        label: group.label,
        options: group.options.map(opt => ({
          ...opt,
          isNested: opt.value !== group.label, // Mark options that are not the main department as nested
        })),
      }));
    };

    switch (filters.course) {
      case "B.Tech":
        setDepartmentOptions(formatDepartmentOptions(btechdepartmentOptions));
        break;
      case "M.Tech":
        setDepartmentOptions(formatDepartmentOptions(mtechdepartmentOptions));
        break;
      case "MBA":
        setDepartmentOptions(formatDepartmentOptions(mbadepartmentOptions));
        break;
      case "M.Sc.":
        setDepartmentOptions(formatDepartmentOptions(mscdepartmentOptions));
        break;
      case "PHD":
        setDepartmentOptions(formatDepartmentOptions(phddepartmentOptions));
        break;
      default:
        setDepartmentOptions(formatDepartmentOptions(allDepartments));
        break;
    }
  }, [filters.course]);

  useEffect(() => {
    const fetchJobProfiles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/job-profiles`,
          { withCredentials: true }
        );
        setJobProfiles(response.data.data || []);
      } catch (err) {
        console.error('Failed to fetch job profiles:', err);
      }
    };
    fetchJobProfiles();
  }, []);

  const filteredStudents = data.filter((student) => {
    return (
      (filters.department === "" ||
        filters.department === "All" ||
        student.department === filters.department) &&
      (filters.course === "" ||
        filters.course === "All" ||
        student.course === filters.course) &&
      (filters.batch === "" ||
        filters.batch === "All" ||
        student.batch === filters.batch) &&
      (filters.cgpa === "" ||
        filters.cgpa === "All" ||
        parseFloat(student.cgpa) >
          parseFloat(filters.cgpa.replace("> ", ""))) &&
      (filters.placementstatus === "" ||
        filters.placementstatus === "All" ||
        student.placementstatus === filters.placementstatus) &&
      (filters.gender === "" ||
        filters.gender === "All" ||
        student.gender === filters.gender) &&
      (filters.debarred === "" ||
        filters.debarred === "All" ||
        student.debarred === (filters.debarred === "true")) &&
      (filters.active_backlogs === "" ||
        filters.active_backlogs === "All" ||
        student.active_backlogs === (filters.active_backlogs === "true")) &&
      (filters.backlogs_history === "" ||
        filters.backlogs_history === "All" ||
        student.backlogs_history === (filters.backlogs_history === "true")) &&
      (filters.name === "" ||
        student.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.rollno === "" ||
        student.rollno.toLowerCase().includes(filters.rollno.toLowerCase())) &&
      (filters.category === "" ||
        filters.category === "All" ||
        student.category === filters.category) &&
      (filters.internshipstatus === "" ||
        filters.internshipstatus === "All" ||
        student.internshipstatus === filters.internshipstatus)
    );
  });

  const getAssessmentData = (student) => {
    if (!student) return [];

    return Object.entries(student.assessments).map(([type, data]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      total: data.total,
      shortlisted: data.shortlisted,
      rejected: data.rejected,
      absent: data.absent,
    }));
  };

  const getAssessmentStats = (student) => {
    if (!student?.assessments) return null;

    const stats = {
      total: 0,
      shortlisted: 0,
      rejected: 0,
      absent: 0,
    };

    Object.values(student.assessments).forEach((assessment) => {
      stats.total += assessment.total || 0;
      stats.shortlisted += assessment.shortlisted || 0;
      stats.rejected += assessment.rejected || 0;
      stats.absent += assessment.absent || 0;
    });

    stats.successRate = ((stats.shortlisted / stats.total) * 100).toFixed(1);

    return stats;
  };

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortField === "cgpa") {
      return sortDirection === "asc"
        ? parseFloat(a.cgpa) - parseFloat(b.cgpa)
        : parseFloat(b.cgpa) - parseFloat(a.cgpa);
    }
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDialogClose = () => {
    setEditMode(false);
    setOfferEditMode(false);
    setEditedStudent(null);
    setEditedOfferTracker(null);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Student <span className="text-custom-blue">Analytics</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Track and manage student performance and placement data
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-custom-blue" />
                <span className="text-sm text-gray-600">Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold text-custom-blue">{filteredStudents.length}</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </>
            )}
          </div>
        </div>
      </div>

      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Course</label>
              <Select
                options={courseOptions}
                value={courseOptions.find(opt => opt.value === filters.course) || null}
                onChange={(option) => setFilters({ ...filters, course: option ? option.value : "" })}
                className="w-full"
                placeholder="Select Course"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <Select
                options={departmentOptions}
                value={departmentOptions.flatMap(group => group.options).find(opt => opt.value === filters.department) || null}
                onChange={(option) => setFilters({ ...filters, department: option ? option.value : "" })}
                styles={customSelectStyles}
                className="w-full"
                placeholder="Select Department"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Batch</label>
              <Select
                options={batchOptions}
                value={batchOptions.find(opt => opt.value === filters.batch) || null}
                onChange={(option) => setFilters({ ...filters, batch: option ? option.value : "" })}
                className="w-full"
                placeholder="Select Batch"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">CGPA</label>
              <Select
                options={cgpaOptions}
                value={cgpaOptions.find(opt => opt.value === filters.cgpa) || null}
                onChange={(option) => setFilters({ ...filters, cgpa: option ? option.value : "" })}
                className="w-full"
                placeholder="Select CGPA"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Placement Status</label>
              <Select
                options={placementStatusOptions}
                value={placementStatusOptions.find(opt => opt.value === filters.placementstatus) || null}
                onChange={(option) => setFilters({ ...filters, placementstatus: option ? option.value : "" })}
                className="w-full"
                placeholder="Select Placement Status"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Debarred</label>
              <Select
                options={backlogOptions}
                value={backlogOptions.find(opt => opt.value === filters.debarred) || null}
                onChange={(option) => setFilters({ ...filters, debarred: option ? option.value : "" })}
                className="w-full"
                placeholder="Select Debarred Status"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Active Backlogs</label>
              <Select
                options={backlogOptions}
                value={backlogOptions.find(opt => opt.value === filters.active_backlogs) || null}
                onChange={(option) => setFilters({ ...filters, active_backlogs: option ? option.value : "" })}
                className="w-full"
                placeholder="Select Active Backlogs"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Backlogs History</label>
              <Select
                options={backlogOptions}
                value={backlogOptions.find(opt => opt.value === filters.backlogs_history) || null}
                onChange={(option) => setFilters({ ...filters, backlogs_history: option ? option.value : "" })}
                className="w-full"
                placeholder="Select Backlogs History"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Gender</label>
              <Select
                options={genderOptions}
                value={genderOptions.find(opt => opt.value === filters.gender) || null}
                onChange={(option) => setFilters({ ...filters, gender: option ? option.value : "" })}
                className="w-full"
                placeholder="Select Gender"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <Select
                options={categoryOptions}
                value={categoryOptions.find(opt => opt.value === filters.category) || null}
                onChange={(option) => setFilters({ ...filters, category: option ? option.value : "" })}
                className="w-full"
                placeholder="Select Category"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Internship Status</label>
              <Select
                options={internshipStatusOptions}
                value={internshipStatusOptions.find(opt => opt.value === filters.internshipstatus) || null}
                onChange={(option) => setFilters({ ...filters, internshipstatus: option ? option.value : "" })}
                className="w-full"
                placeholder="Select Internship Status"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search Name</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name..."
                  value={filters.name}
                  onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Roll Number</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by roll no..."
                  value={filters.rollno}
                  onChange={(e) => setFilters({ ...filters, rollno: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={clearFilters}
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
            <Button
              className="flex items-center gap-2 bg-custom-blue text-white hover:bg-blue-700"
              onClick={handleApplyFilters}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Filter className="h-4 w-4" />
              )}
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <Button
          variant="outline"
          className={`flex items-center gap-2 ${sortField === "name" ? "bg-blue-50" : ""}`}
          onClick={() => handleSort("name")}
        >
          Name
          {sortField === "name" && (
            <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
          )}
        </Button>
        <Button
          variant="outline"
          className={`flex items-center gap-2 ${sortField === "cgpa" ? "bg-blue-50" : ""}`}
          onClick={() => handleSort("cgpa")}
        >
          CGPA
          {sortField === "cgpa" && (
            <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedStudents.map((student) => (
          <Dialog
            key={student._id}
            onOpenChange={(open) => {
              if (!open) {
                handleDialogClose();
              }
            }}
          >
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-400 hover:scale-105 hover:bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <UserCog className="h-5 w-5 text-gray-400" />
                        <h3 className="font-bold text-lg text-gray-900">{student.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{student.rollno}</p>
                      <span className="text-sm text-gray-600">{student.course}</span>
                    </div>
                    <GraduationCap className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{student.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Batch: {student.batch}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">CGPA: {student.cgpa}</span>
                    </div>
                  </div>
                  <div
                    className={`mt-4 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      student.placementstatus === "Super Dream"
                        ? "bg-green-100 text-green-800"
                        : student.placementstatus === "Dream"
                        ? "bg-blue-100 text-blue-800"
                        : student.placementstatus === "Below Dream"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-600 text-gray-100"
                    }`}
                  >
                    {student.placementstatus}
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-600">
                      Offers: {student.offers?.length || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] p-0">
              <div className="overflow-y-auto max-h-[90vh] px-6">
                <DialogHeader className="sticky top-0 bg-white py-4 z-10">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2 justify-center lg:items-center lg:justify-center">
                      <User className="h-6 w-6 text-blue-500" />
                      {student.name}
                    </DialogTitle>
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 hover:scale-105 focus:outline-none mr-4"
                        onClick={() => editMode ? handleSaveClick() : handleEditClick(student)}
                      >
                        {editMode ? (
                          <>
                            <Save className="h-4 w-4" />
                            Save Profile
                          </>
                        ) : (
                          <>
                            <Pencil className="h-4 w-4" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogHeader>
                <div className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 overflow-x-hidden">
                    <div className="space-y-6">
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Name</label>
                              <p className="mt-1 text-gray-900">{student.name}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            {editMode ? (
                              <Input
                                value={editedStudent.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">{student.email}</p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Phone</label>
                            {editMode ? (
                              <Input
                                value={editedStudent.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">{student.phone}</p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Roll Number</label>
                              <p className="mt-1 text-gray-900">{student.rollno}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            {editMode ? (
                              <Select
                                options={categoryOptions}
                                value={categoryOptions.find(opt => opt.value === editedStudent.category) || null}
                                onChange={(option) => handleChange("category", option ? option.value : "")}
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">{student.category}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="space-y-6">
                      <Card className="border-0 shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">Placement Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Placement Status</label>
                            {editMode ? (
                              <Select
                                options={placementStatusOptions}
                                value={placementStatusOptions.find(opt => opt.value === editedStudent.placementstatus) || null}
                                onChange={(option) => handleChange("placementstatus", option ? option.value : "")}
                                className="mt-1"
                              />
                            ) : (
                              <div
                                className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                  student.placementstatus === "Super Dream"
                                    ? "bg-green-100 text-green-800"
                                    : student.placementstatus === "Dream"
                                    ? "bg-blue-100 text-blue-800"
                                    : student.placementstatus === "Below Dream"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {student.placementstatus}
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Internship Status</label>
                            {editMode ? (
                              <Select
                                options={internshipStatusOptions}
                                value={internshipStatusOptions.find(opt => opt.value === editedStudent.internshipstatus) || null}
                                onChange={(option) => handleChange("internshipstatus", option ? option.value : "")}
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">{student.internshipstatus}</p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Debarred</label>
                            {editMode ? (
                              <Select
                                options={backlogOptions}
                                value={backlogOptions.find(opt => opt.value === editedStudent.debarred) || null}
                                onChange={(option) => handleChange("debarred", option ? option.value : "")}
                                className="mt-1"
                              />
                            ) : (
                              <p className="mt-1 text-gray-900">{student.debarred ? "Yes" : "No"}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <Card className="mt-6 border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Academic Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Department</label>
                          <p className="mt-1 text-gray-900">{student.department}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Course</label>
                          <p className="mt-1 text-gray-900">{student.course}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">CGPA</label>
                          <p className="mt-1 text-gray-900">{student.cgpa}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Batch</label>
                          <p className="mt-1 text-gray-900">{student.batch}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Active Backlog</label>
                          <p className="mt-1 text-gray-900">{student.active_backlogs ? "Yes" : "No"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Backlogs History</label>
                          <p className="mt-1 text-gray-900">{student.backlogs_history ? "Yes" : "No"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="mt-6 border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5" />
                          Offer Tracker
                        </div>
                        {!offerEditMode && (
                          <Button
                            variant="outline"
                            className="flex items-center gap-2 hover:scale-105 focus:outline-none"
                            onClick={() => handleOfferEditClick(student)}
                          >
                            <Pencil className="h-4 w-4" />
                            Edit Offers
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {offerEditMode ? (
                        <div className="space-y-6">
                          {editedOfferTracker?.offer.map((offer, index) => (
                            <div key={index} className="border p-4 rounded-lg space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-semibold">Offer {index + 1}</h4>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className='text-red-600'
                                  onClick={() => removeOffer(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Offer Type</label>
                                  <Select
                                    options={offerTypeOptions}
                                    value={offerTypeOptions.find(opt => opt.value === offer.offer_type) || null}
                                    onChange={(option) => handleOfferChange(index, 'offer_type', option ? option.value : "")}
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Offer Category</label>
                                  <Select
                                    options={offerCategoryOptions}
                                    value={offerCategoryOptions.find(opt => opt.value === offer.offer_category) || null}
                                    onChange={(option) => handleOfferChange(index, 'offer_category', option ? option.value : "")}
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Offer Sector</label>
                                  <Select
                                    options={offerSectorOptions}
                                    value={offerSectorOptions.find(opt => opt.value === offer.offer_sector) || null}
                                    onChange={(option) => handleOfferChange(index, 'offer_sector', option ? option.value : "")}
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="space-y-4">
                            <div className="border p-4 rounded-lg space-y-4">
                              <h4 className="font-semibold">New Offer</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Offer Type *</label>
                                  <Select
                                    options={offerTypeOptions}
                                    value={null}
                                    onChange={(option) => {
                                      if (option && option.value !== "Select Offer Type") {
                                        setEditedOfferTracker((prev) => ({
                                          ...prev,
                                          newOffer: {
                                            ...prev.newOffer,
                                            offer_type: option.value
                                          }
                                        }));
                                      }
                                    }}
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Offer Category *</label>
                                  <Select
                                    options={offerCategoryOptions}
                                    value={null}
                                    onChange={(option) => {
                                      if (option && option.value !== "Select Offer Category") {
                                        setEditedOfferTracker((prev) => ({
                                          ...prev,
                                          newOffer: {
                                            ...prev.newOffer,
                                            offer_category: option.value
                                          }
                                        }));
                                      }
                                    }}
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Offer Sector *</label>
                                  <Select
                                    options={offerSectorOptions}
                                    value={null}
                                    onChange={(option) => {
                                      if (option && option.value !== "Select Offer Sector") {
                                        setEditedOfferTracker((prev) => ({
                                          ...prev,
                                          newOffer: {
                                            ...prev.newOffer,
                                            offer_sector: option.value
                                          }
                                        }));
                                      }
                                    }}
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <Button
                                className="bg-custom-blue text-white"
                                onClick={() => {
                                  const newOffer = editedOfferTracker?.newOffer;
                                  if (!newOffer?.offer_type || !newOffer?.offer_category || !newOffer?.offer_sector) {
                                    toast.error("Please select Offer Type, Offer Category, and Offer Sector");
                                    return;
                                  }
                                  setEditedOfferTracker((prev) => ({
                                    ...prev,
                                    offer: [
                                      ...prev.offer,
                                      {
                                        offer_type: newOffer.offer_type,
                                        offer_category: newOffer.offer_category,
                                        offer_sector: newOffer.offer_sector,
                                        jobId: null
                                      }
                                    ],
                                    newOffer: {
                                      offer_type: null,
                                      offer_category: null,
                                      offer_sector: null,
                                      jobId: null
                                    }
                                  }));
                                }}
                              >
                                Add New Offer
                              </Button>
                              <Button
                                className="bg-green-500 text-white"
                                onClick={handleOfferSaveClick}
                              >
                                Save
                              </Button>
                              <Button
                                variant="outline"
                                onClick={handleOfferCancelClick}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {student?.offers?.length > 0 ? (
                            student.offers.map((offer, index) => (
                              <Card key={index} className="p-4 border border-gray-100">
                                <h4 className="font-semibold">Offer {index + 1}</h4>
                                <p className="text-gray-600 mt-1">Type: {offer.offer_type}</p>
                                <p className="text-gray-600">Category: {offer.offer_category}</p>
                                <p className="text-gray-600">Sector: {offer.offer_sector}</p>
                                {offer.jobId ? (
                                  <p className="text-gray-600">
                                    Job: {jobProfiles.find(job => job._id === offer.jobId)?.company_name || 'N/A'} - 
                                    {jobProfiles.find(job => job._id === offer.jobId)?.job_role || 'N/A'}
                                  </p>
                                ) : (
                                  <p className="text-gray-600">Job: None</p>
                                )}
                              </Card>
                            ))
                          ) : (
                            <p className="text-gray-600">No offers recorded</p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  <Card className="mt-6 border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Assessment Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="text-blue-600 text-sm font-medium">Total Assessments</div>
                          <div className="mt-2 flex items-baseline">
                            <div className="text-2xl font-bold text-blue-700">{getAssessmentStats(student)?.total || 0}</div>
                            <div className="ml-2 text-sm text-blue-600">tests</div>
                          </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="text-green-600 text-sm font-medium">Shortlisted</div>
                          <div className="mt-2 flex items-baseline">
                            <div className="text-2xl font-bold text-green-700">{getAssessmentStats(student)?.shortlisted || 0}</div>
                            <div className="ml-2 text-sm text-green-600">({getAssessmentStats(student)?.successRate || 0}%)</div>
                          </div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-4">
                          <div className="text-red-600 text-sm font-medium">Rejected</div>
                          <div className="mt-2 flex items-baseline">
                            <div className="text-2xl font-bold text-red-700">{getAssessmentStats(student)?.rejected || 0}</div>
                            <div className="ml-2 text-sm text-red-600">tests</div>
                          </div>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-4">
                          <div className="text-amber-600 text-sm font-medium">Absent</div>
                          <div className="mt-2 flex items-baseline">
                            <div className="text-2xl font-bold text-amber-700">{getAssessmentStats(student)?.absent || 0}</div>
                            <div className="ml-2 text-sm text-amber-600">tests</div>
                          </div>
                        </div>
                      </div>
                      <div className="h-72 p-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={getAssessmentData(student)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#6366f1" name="Total" />
                            <Bar dataKey="shortlisted" fill="#22c55e" name="Shortlisted" />
                            <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                            <Bar dataKey="absent" fill="#f59e0b" name="Absent" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                        {Object.entries(student?.assessments || {}).map(([type, data]) => (
                          <div
                            key={type}
                            className="p-6 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center text-center"
                          >
                            <div className="font-semibold text-lg capitalize mb-4">{type}</div>
                            <div className="flex flex-wrap justify-center items-center gap-6 text-sm w-full">
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                                <span className="text-gray-600">Total: {data.total}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                                <span className="text-gray-600">Passed: {data.shortlisted}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                                <span className="text-gray-600">Failed: {data.rejected}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                                <span className="text-gray-600">Absent: {data.absent}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="mt-6 border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Applied Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {student.applications.jobProfiles.map((job, index) => (
                          <Card key={index} className="p-4 border border-gray-100">
                            <h4 className="font-semibold text-gray-900">{job.company_name}</h4>
                            <p className="text-gray-600 mt-1">{job.job_role}</p>
                            <div className="flex gap-2 mt-2">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{job.job_type}</span>
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{job.job_class}</span>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      <Notification />
    </div>
  );
};

export default StudentAnalyticsDashboard;