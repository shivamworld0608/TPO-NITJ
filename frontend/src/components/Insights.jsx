// import React, { useState, useEffect } from "react";

// const Insights = () => {

//   const dummyData = [
//     {
//       _id: "1",
//       company_name: "TCS",
//       company_logo: "https://via.placeholder.com/150",
//       placement_type: "Tech",
//       year: "2023",
//       degree: "BTECH",
//       shortlisted_students: [
//         {
//           name: "Amit Sharma",
//           image: "https://via.placeholder.com/100",
//           email: "amit.sharma@example.com",
//           gender: "Male",
//           department: "CSE",
//         },
//         {
//           name: "Priya Nair",
//           image: "https://via.placeholder.com/100",
//           email: "priya.nair@example.com",
//           gender: "Female",
//           department: "ECE",
//         },
//       ],
//     },
//     {
//       _id: "2",
//       company_name: "Google",
//       company_logo: "https://via.placeholder.com/150",
//       placement_type: "Tech",
//       year: "2024",
//       degree: "MTECH",
//       shortlisted_students: [
//         {
//           name: "Rohit Verma",
//           image: "https://via.placeholder.com/100",
//           email: "rohit.verma@example.com",
//           gender: "Male",
//           department: "IT",
//         },
//         {
//           name: "Meera Iyer",
//           image: "https://via.placeholder.com/100",
//           email: "meera.iyer@example.com",
//           gender: "Female",
//           department: "CSE",
//         },
//       ],
//     },
//     {
//       _id: "3",
//       company_name: "Microsoft",
//       company_logo: "https://via.placeholder.com/150",
//       placement_type: "Tech",
//       year: "2023",
//       degree: "MBA",
//       shortlisted_students: [
//         {
//           name: "Ankita Roy",
//           image: "https://via.placeholder.com/100",
//           email: "ankita.roy@example.com",
//           gender: "Female",
//           department: "HM",
//         },
//         {
//           name: "Sanjay Gupta",
//           image: "https://via.placeholder.com/100",
//           email: "sanjay.gupta@example.com",
//           gender: "Male",
//           department: "ME",
//         },
//       ],
//     },
//     {
//       _id: "4",
//       company_name: "Amazon",
//       company_logo: "https://via.placeholder.com/150",
//       placement_type: "Tech",
//       year: "2024",
//       degree: "BTECH",
//       shortlisted_students: [
//         {
//           name: "Neha Kapoor",
//           image: "https://via.placeholder.com/100",
//           email: "neha.kapoor@example.com",
//           gender: "Female",
//           department: "CE",
//         },
//         {
//           name: "Vikram Singh",
//           image: "https://via.placeholder.com/100",
//           email: "vikram.singh@example.com",
//           gender: "Male",
//           department: "CSE",
//         },
//       ],
//     },
//     {
//       _id: "5",
//       company_name: "Infosys",
//       company_logo: "https://via.placeholder.com/150",
//       placement_type: "Tech",
//       year: "2023",
//       degree: "BTECH",
//       shortlisted_students: [
//         {
//           name: "Arjun Rao",
//           image: "https://via.placeholder.com/100",
//           email: "arjun.rao@example.com",
//           gender: "Male",
//           department: "ME",
//         },
//         {
//           name: "Ritika Desai",
//           image: "https://via.placeholder.com/100",
//           email: "ritika.desai@example.com",
//           gender: "Female",
//           department: "IT",
//         },
//       ],
//     },
//     {
//       _id: "6",
//       company_name: "Wipro",
//       company_logo: "https://via.placeholder.com/150",
//       placement_type: "Tech",
//       year: "2023",
//       degree: "MTECH",
//       shortlisted_students: [
//         {
//           name: "Karan Patel",
//           image: "https://via.placeholder.com/100",
//           email: "karan.patel@example.com",
//           gender: "Male",
//           department: "ECE",
//         },
//         {
//           name: "Simran Ahuja",
//           image: "https://via.placeholder.com/100",
//           email: "simran.ahuja@example.com",
//           gender: "Female",
//           department: "CSE",
//         },
//       ],
//     },
//     {
//       _id: "7",
//       company_name: "Mahindra & Mahindra",
//       company_logo: "https://via.placeholder.com/150",
//       placement_type: "Non-Tech",
//       year: "2023",
//       degree: "MBA",
//       shortlisted_students: [
//         {
//           name: "Aditya Joshi",
//           image: "https://via.placeholder.com/100",
//           email: "aditya.joshi@example.com",
//           gender: "Male",
//           department: "HM",
//         },
//         {
//           name: "Pooja Gupta",
//           image: "https://via.placeholder.com/100",
//           email: "pooja.gupta@example.com",
//           gender: "Female",
//           department: "ECE",
//         },
//       ],
//     },
//     {
//       _id: "8",
//       company_name: "Deloitte",
//       company_logo: "https://via.placeholder.com/150",
//       placement_type: "Non-Tech",
//       year: "2024",
//       degree: "MBA",
//       shortlisted_students: [
//         {
//           name: "Siddharth Malhotra",
//           image: "https://via.placeholder.com/100",
//           email: "siddharth.malhotra@example.com",
//           gender: "Male",
//           department: "Finance",
//         },
//         {
//           name: "Rhea Singh",
//           image: "https://via.placeholder.com/100",
//           email: "rhea.singh@example.com",
//           gender: "Female",
//           department: "HR",
//         },
//       ],
//     },
//     {
//       _id: "9",
//       company_name: "Accenture",
//       company_logo: "https://via.placeholder.com/150",
//       placement_type: "Tech",
//       year: "2023",
//       degree: "MTECH",
//       shortlisted_students: [
//         {
//           name: "Akash Bhatia",
//           image: "https://via.placeholder.com/100",
//           email: "akash.bhatia@example.com",
//           gender: "Male",
//           department: "IT",
//         },
//         {
//           name: "Naina Kapoor",
//           image: "https://via.placeholder.com/100",
//           email: "naina.kapoor@example.com",
//           gender: "Female",
//           department: "CSE",
//         },
//       ],
//     },
//     {
//       _id: "10",
//       company_name: "Flipkart",
//       company_logo: "https://via.placeholder.com/150",
//       placement_type: "Tech",
//       year: "2024",
//       degree: "BTECH",
//       shortlisted_students: [
//         {
//           name: "Rahul Mehta",
//           image: "https://via.placeholder.com/100",
//           email: "rahul.mehta@example.com",
//           gender: "Male",
//           department: "DS",
//         },
//         {
//           name: "Sneha Menon",
//           image: "https://via.placeholder.com/100",
//           email: "sneha.menon@example.com",
//           gender: "Female",
//           department: "AI",
//         },
//       ],
//     },
//   ];
  
//   const [filters, setFilters] = useState({
//     company_name: "",
//     placement_type: "",
//     year: "",
//     degree: "",
//     gender: "",
//     department: "",
//   });

//   const [placements, setPlacements] = useState(dummyData);
//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     studentsPlaced: 0,
//     placementPercentage: 0,
//   });

//   // Function to update placement stats
//   useEffect(() => {
//     const totalStudents = dummyData.reduce(
//       (acc, placement) => acc + placement.shortlisted_students.length,
//       0
//     );
//     const studentsPlaced = placements.reduce(
//       (acc, placement) => acc + placement.shortlisted_students.length,
//       0
//     );
//     const placementPercentage =
//       totalStudents > 0
//         ? ((studentsPlaced / totalStudents) * 100).toFixed(2)
//         : 0;

//     setStats({
//       totalStudents,
//       studentsPlaced,
//       placementPercentage,
//     });
//   }, [placements]);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
  
//     const updatedFilters = { ...filters, [name]: value };
  
//     setFilters(updatedFilters);
  
//     const filteredPlacements = dummyData
//       .map((placement) => {
//         // Filter shortlisted students based on gender and department filters
//         const filteredStudents = placement.shortlisted_students.filter(
//           (student) =>
//             (!updatedFilters.gender ||
//               student.gender.toLowerCase() ===
//                 updatedFilters.gender.toLowerCase()) &&
//             (!updatedFilters.department ||
//               student.department.toLowerCase() ===
//                 updatedFilters.department.toLowerCase())
//         );
  
//         // Return the placement with the filtered students
//         return {
//           ...placement,
//           shortlisted_students: filteredStudents,
//         };
//       })
//       // Exclude cards with no matching students
//       .filter((placement) => placement.shortlisted_students.length > 0)
//       .filter((placement) => {
//         // Apply other filters (company_name, placement_type, year, degree)
//         const matchesCompanyName =
//           !updatedFilters.company_name ||
//           placement.company_name
//             .toLowerCase()
//             .includes(updatedFilters.company_name.toLowerCase());
  
//         const matchesPlacementType =
//           !updatedFilters.placement_type ||
//           placement.placement_type.toLowerCase() ===
//             updatedFilters.placement_type.toLowerCase();
  
//         const matchesYear =
//           !updatedFilters.year || placement.year === updatedFilters.year;
  
//         const matchesDegree =
//           !updatedFilters.degree ||
//           placement.degree.toLowerCase() === updatedFilters.degree.toLowerCase();
  
//         return (
//           matchesCompanyName &&
//           matchesPlacementType &&
//           matchesYear &&
//           matchesDegree
//         );
//       });
  
//     setPlacements(filteredPlacements);
//   };
  

//   const handleClearFilters = () => {
//     setFilters({
//       company_name: "",
//       placement_type: "",
//       year: "",
//       degree: "",
//       gender: "",
//       department: "",
//     });
//     setPlacements(dummyData);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-8">
//       <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//         Placement Insights
//       </h1>


//       {/* Filters Section */}
//       <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filters</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {/* Company Name Filter */}
//           <div>
//             <label className="block text-gray-600 font-medium">Company Name</label>
//             <input
//               type="text"
//               name="company_name"
//               value={filters.company_name}
//               onChange={handleFilterChange}
//               className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               placeholder="e.g., Google"
//             />
//           </div>


//           {/* Year Filter */}
//           <div>
//             <label className="block text-gray-600 font-medium">Year</label>
//             <select
//               name="year"
//               value={filters.year}
//               onChange={handleFilterChange}
//               className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             >
//               <option value="">All</option>
//               {["2022","2023", "2024", "2025","2026","2027","2028","2029","2030"].map((yr) => (
//                 <option key={yr} value={yr}>
//                   {yr}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Department Filter */}
//           <div>
//             <label className="block text-gray-600 font-medium">Department</label>
//             <select
//               name="department"
//               value={filters.department}
//               onChange={handleFilterChange}
//               className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             >
//               <option value="">All</option>
//               {['CSE', 'ECE', 'EE', 'ME', 'CE', 'IT', 'CH','ICE','BT','TT','IPE','DS','VLSI','AI','HM'].map((dept) => (
//                 <option key={dept} value={dept}>
//                   {dept}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Placement Type Filter */}
//           <div>
//             <label className="block text-gray-600 font-medium">Placement Type</label>
//             <select
//               name="placement_type"
//               value={filters.placement_type}
//               onChange={handleFilterChange}
//               className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             >
//               <option value="">All</option>
//               <option value="Tech">Tech</option>
//               <option value="Non-Tech">Non-Tech</option>
//             </select>
//           </div>

//           {/* Degree Filter */}
//           <div>
//             <label className="block text-gray-600 font-medium">Degree</label>
//             <select
//               name="degree"
//               value={filters.degree}
//               onChange={handleFilterChange}
//               className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             >
//               <option value="">All</option>
//               <option value="BTECH">BTECH</option>
//               <option value="MTECH">MTECH</option>
//               <option value="MBA">MBA</option>
//             </select>
//           </div>

//           {/* Gender Filter */}
//           <div>
//             <label className="block text-gray-600 font-medium">Gender</label>
//             <select
//               name="gender"
//               value={filters.gender}
//               onChange={handleFilterChange}
//               className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             >
//               <option value="">All</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//         </div>


//         {/* Clear Filters Button */}
//         <div className="mt-4">
//           <button
//             onClick={handleClearFilters}
//             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* Big Buttons Section */}
//       <div className="flex justify-center gap-4 mb-8">
//         <button className="w-1/3 bg-blue-100 border-4 border-blue-500 text-blue-600 font-semibold py-4 rounded-lg shadow-md hover:bg-blue-200">
//           Students Placed: {stats.studentsPlaced}
//         </button>
//         <button className="w-1/3 bg-blue-100 border-4 border-blue-500 text-blue-600 font-semibold py-4 rounded-lg shadow-md hover:bg-blue-200">
//           Total Students: {stats.totalStudents}
//         </button>
//         <button className="w-1/3 bg-blue-100 border-4 border-blue-500 text-blue-600 font-semibold py-4 rounded-lg shadow-md hover:bg-blue-200">
//           Placement %: {stats.placementPercentage}%
//         </button>
//       </div>

//       {/* Insights Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {placements.length > 0 ? (
//           placements.map((placement) => (
//             <div
//               key={placement._id}
//               className="bg-white shadow-md rounded-lg p-6"
//             >
//               <div className="flex items-center space-x-4 mb-4">
//                 <img
//                   src={placement.company_logo}
//                   alt={placement.company_name}
//                   className="w-16 h-16 rounded-full"
//                 />
//                 <h2 className="text-xl font-semibold text-gray-700">
//                   {placement.company_name}
//                 </h2>
//               </div>
//               <p className="text-gray-500">
//                 {placement.placement_type} | {placement.year} |{" "}
//                 {placement.degree}
//               </p>
//               <h3 className="text-gray-600 font-medium mt-4">
//                 Shortlisted Students:
//               </h3>
//               <ul className="mt-2 space-y-2">
//                 {placement.shortlisted_students.map((student, index) => (
//                   <li
//                     key={`${placement._id}-${index}`}
//                     className="flex items-center space-x-4"
//                   >
//                     <img
//                       src={student.image}
//                       alt={student.name}
//                       className="w-10 h-10 rounded-full"
//                     />
//                     <div>
//                       <p className="text-gray-700 font-medium">
//                         {student.name}
//                       </p>
//                       <p className="text-gray-500 text-sm">
//                         {student.department}
//                       </p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center col-span-full">
//             No placements found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Insights;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Insights = () => {

  const dummyData = [
    {
      _id: "1",
      company_name: "TCS",
      company_logo: "https://via.placeholder.com/150",
      placement_type: "Tech",
      year: "2023",
      degree: "BTECH",
      shortlisted_students: [
        {
          name: "Amit Sharma",
          image: "https://via.placeholder.com/100",
          email: "amit.sharma@example.com",
          gender: "Male",
          department: "CSE",
        },
        {
          name: "Priya Nair",
          image: "https://via.placeholder.com/100",
          email: "priya.nair@example.com",
          gender: "Female",
          department: "ECE",
        },
      ],
    },
    {
      _id: "2",
      company_name: "Google",
      company_logo: "https://via.placeholder.com/150",
      placement_type: "Tech",
      year: "2024",
      degree: "MTECH",
      shortlisted_students: [
        {
          name: "Rohit Verma",
          image: "https://via.placeholder.com/100",
          email: "rohit.verma@example.com",
          gender: "Male",
          department: "IT",
        },
        {
          name: "Meera Iyer",
          image: "https://via.placeholder.com/100",
          email: "meera.iyer@example.com",
          gender: "Female",
          department: "CSE",
        },
      ],
    },
    {
      _id: "3",
      company_name: "Microsoft",
      company_logo: "https://via.placeholder.com/150",
      placement_type: "Tech",
      year: "2023",
      degree: "MBA",
      shortlisted_students: [
        {
          name: "Ankita Roy",
          image: "https://via.placeholder.com/100",
          email: "ankita.roy@example.com",
          gender: "Female",
          department: "HM",
        },
        {
          name: "Sanjay Gupta",
          image: "https://via.placeholder.com/100",
          email: "sanjay.gupta@example.com",
          gender: "Male",
          department: "ME",
        },
      ],
    },
    {
      _id: "4",
      company_name: "Amazon",
      company_logo: "https://via.placeholder.com/150",
      placement_type: "Tech",
      year: "2024",
      degree: "BTECH",
      shortlisted_students: [
        {
          name: "Neha Kapoor",
          image: "https://via.placeholder.com/100",
          email: "neha.kapoor@example.com",
          gender: "Female",
          department: "CE",
        },
        {
          name: "Vikram Singh",
          image: "https://via.placeholder.com/100",
          email: "vikram.singh@example.com",
          gender: "Male",
          department: "CSE",
        },
      ],
    },
    {
      _id: "5",
      company_name: "Infosys",
      company_logo: "https://via.placeholder.com/150",
      placement_type: "Tech",
      year: "2023",
      degree: "BTECH",
      shortlisted_students: [
        {
          name: "Arjun Rao",
          image: "https://via.placeholder.com/100",
          email: "arjun.rao@example.com",
          gender: "Male",
          department: "ME",
        },
        {
          name: "Ritika Desai",
          image: "https://via.placeholder.com/100",
          email: "ritika.desai@example.com",
          gender: "Female",
          department: "IT",
        },
      ],
    },
    {
      _id: "6",
      company_name: "Wipro",
      company_logo: "https://via.placeholder.com/150",
      placement_type: "Tech",
      year: "2023",
      degree: "MTECH",
      shortlisted_students: [
        {
          name: "Karan Patel",
          image: "https://via.placeholder.com/100",
          email: "karan.patel@example.com",
          gender: "Male",
          department: "ECE",
        },
        {
          name: "Simran Ahuja",
          image: "https://via.placeholder.com/100",
          email: "simran.ahuja@example.com",
          gender: "Female",
          department: "CSE",
        },
      ],
    },
    {
      _id: "7",
      company_name: "Mahindra & Mahindra",
      company_logo: "https://via.placeholder.com/150",
      placement_type: "Non-Tech",
      year: "2023",
      degree: "MBA",
      shortlisted_students: [
        {
          name: "Aditya Joshi",
          image: "https://via.placeholder.com/100",
          email: "aditya.joshi@example.com",
          gender: "Male",
          department: "HM",
        },
        {
          name: "Pooja Gupta",
          image: "https://via.placeholder.com/100",
          email: "pooja.gupta@example.com",
          gender: "Female",
          department: "ECE",
        },
      ],
    },
    {
      _id: "8",
      company_name: "Deloitte",
      company_logo: "https://via.placeholder.com/150",
      placement_type: "Non-Tech",
      year: "2024",
      degree: "MBA",
      shortlisted_students: [
        {
          name: "Siddharth Malhotra",
          image: "https://via.placeholder.com/100",
          email: "siddharth.malhotra@example.com",
          gender: "Male",
          department: "Finance",
        },
        {
          name: "Rhea Singh",
          image: "https://via.placeholder.com/100",
          email: "rhea.singh@example.com",
          gender: "Female",
          department: "HR",
        },
      ],
    },
    {
      _id: "9",
      company_name: "Accenture",
      company_logo: "https://via.placeholder.com/150",
      placement_type: "Tech",
      year: "2023",
      degree: "MTECH",
      shortlisted_students: [
        {
          name: "Akash Bhatia",
          image: "https://via.placeholder.com/100",
          email: "akash.bhatia@example.com",
          gender: "Male",
          department: "IT",
        },
        {
          name: "Naina Kapoor",
          image: "https://via.placeholder.com/100",
          email: "naina.kapoor@example.com",
          gender: "Female",
          department: "CSE",
        },
      ],
    },
    {
      _id: "10",
      company_name: "Flipkart",
      company_logo: "https://via.placeholder.com/150",
      placement_type: "Tech",
      year: "2024",
      degree: "BTECH",
      shortlisted_students: [
        {
          name: "Rahul Mehta",
          image: "https://via.placeholder.com/100",
          email: "rahul.mehta@example.com",
          gender: "Male",
          department: "DS",
        },
        {
          name: "Sneha Menon",
          image: "https://via.placeholder.com/100",
          email: "sneha.menon@example.com",
          gender: "Female",
          department: "AI",
        },
      ],
    },
  ];

  const [filters, setFilters] = useState({
    company_name: "",
    placement_type: "",
    year: "",
    degree: "",
    gender: "",
    department: "",
  });

  const [placements, setPlacements] = useState(dummyData);
  const [stats, setStats] = useState({
    totalStudents: 0,
    studentsPlaced: 0,
    placementPercentage: 0,
  });

  // Function to fetch placements (fallback to dummyData if API fails)
  const fetchPlacements = async (updatedFilters) => {
    try {
      // Construct query parameters from filters
      const queryParams = new URLSearchParams(
        Object.entries(updatedFilters).filter(([_, value]) => value !== "")
      ).toString();

      const apiUrl = `https://your-backend-api/placements?${queryParams}`;

      const response = await axios.get(apiUrl);
      setPlacements(response.data);
    } catch (error) {
      console.error("Failed to fetch data from API. Falling back to dummy data.");
      // Fallback to dummy data
      const filteredPlacements = applyFilters(dummyData, updatedFilters);
      setPlacements(filteredPlacements);
    }
  };

  // Apply filters locally (for fallback with dummy data)
  const applyFilters = (data, updatedFilters) => {
    return data
      .map((placement) => {
        const filteredStudents = placement.shortlisted_students.filter(
          (student) =>
            (!updatedFilters.gender ||
              student.gender.toLowerCase() ===
                updatedFilters.gender.toLowerCase()) &&
            (!updatedFilters.department ||
              student.department.toLowerCase() ===
                updatedFilters.department.toLowerCase())
        );

        return {
          ...placement,
          shortlisted_students: filteredStudents,
        };
      })
      .filter((placement) => placement.shortlisted_students.length > 0)
      .filter((placement) => {
        const matchesCompanyName =
          !updatedFilters.company_name ||
          placement.company_name
            .toLowerCase()
            .includes(updatedFilters.company_name.toLowerCase());

        const matchesPlacementType =
          !updatedFilters.placement_type ||
          placement.placement_type.toLowerCase() ===
            updatedFilters.placement_type.toLowerCase();

        const matchesYear =
          !updatedFilters.year || placement.year === updatedFilters.year;

        const matchesDegree =
          !updatedFilters.degree ||
          placement.degree.toLowerCase() === updatedFilters.degree.toLowerCase();

        return (
          matchesCompanyName &&
          matchesPlacementType &&
          matchesYear &&
          matchesDegree
        );
      });
  };

  // Fetch placements whenever filters are updated
  useEffect(() => {
    fetchPlacements(filters);
  }, [filters]);

  // Update stats whenever placements change
  useEffect(() => {
    const totalStudents = dummyData.reduce(
      (acc, placement) => acc + placement.shortlisted_students.length,
      0
    );
    const studentsPlaced = placements.reduce(
      (acc, placement) => acc + placement.shortlisted_students.length,
      0
    );
    const placementPercentage =
      totalStudents > 0
        ? ((studentsPlaced / totalStudents) * 100).toFixed(2)
        : 0;

    setStats({
      totalStudents,
      studentsPlaced,
      placementPercentage,
    });
  }, [placements]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      company_name: "",
      placement_type: "",
      year: "",
      degree: "",
      gender: "",
      department: "",
    });
    fetchPlacements({}); // Fetch all placements from backend or fallback to all dummy data
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Placement Insights
      </h1>


      {/* Filters Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Company Name Filter */}
          <div>
            <label className="block text-gray-600 font-medium">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={filters.company_name}
              onChange={handleFilterChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="e.g., Google"
            />
          </div>


          {/* Year Filter */}
          <div>
            <label className="block text-gray-600 font-medium">Year</label>
            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">All</option>
              {["2022","2023", "2024", "2025","2026","2027","2028","2029","2030"].map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-gray-600 font-medium">Department</label>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">All</option>
              {['CSE', 'ECE', 'EE', 'ME', 'CE', 'IT', 'CH','ICE','BT','TT','IPE','DS','VLSI','AI','HM'].map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Placement Type Filter */}
          <div>
            <label className="block text-gray-600 font-medium">Placement Type</label>
            <select
              name="placement_type"
              value={filters.placement_type}
              onChange={handleFilterChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">All</option>
              <option value="Tech">Tech</option>
              <option value="Non-Tech">Non-Tech</option>
            </select>
          </div>

          {/* Degree Filter */}
          <div>
            <label className="block text-gray-600 font-medium">Degree</label>
            <select
              name="degree"
              value={filters.degree}
              onChange={handleFilterChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">All</option>
              <option value="BTECH">BTECH</option>
              <option value="MTECH">MTECH</option>
              <option value="MBA">MBA</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <label className="block text-gray-600 font-medium">Gender</label>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>


        {/* Clear Filters Button */}
        <div className="mt-4">
          <button
            onClick={handleClearFilters}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Big Buttons Section */}
      <div className="flex justify-center gap-4 mb-8">
        <button className="w-1/3 bg-blue-100 border-4 border-blue-500 text-blue-600 font-semibold py-4 rounded-lg shadow-md hover:bg-blue-200">
          Students Placed: {stats.studentsPlaced}
        </button>
        <button className="w-1/3 bg-blue-100 border-4 border-blue-500 text-blue-600 font-semibold py-4 rounded-lg shadow-md hover:bg-blue-200">
          Total Students: {stats.totalStudents}
        </button>
        <button className="w-1/3 bg-blue-100 border-4 border-blue-500 text-blue-600 font-semibold py-4 rounded-lg shadow-md hover:bg-blue-200">
          Placement %: {stats.placementPercentage}%
        </button>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placements.length > 0 ? (
          placements.map((placement) => (
            <div
              key={placement._id}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={placement.company_logo}
                  alt={placement.company_name}
                  className="w-16 h-16 rounded-full"
                />
                <h2 className="text-xl font-semibold text-gray-700">
                  {placement.company_name}
                </h2>
              </div>
              <p className="text-gray-500">
                {placement.placement_type} | {placement.year} |{" "}
                {placement.degree}
              </p>
              <h3 className="text-gray-600 font-medium mt-4">
                Shortlisted Students:
              </h3>
              <ul className="mt-2 space-y-2">
                {placement.shortlisted_students.map((student, index) => (
                  <li
                    key={`${placement._id}-${index}`}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-gray-700 font-medium">
                        {student.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {student.department}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No placements found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Insights;