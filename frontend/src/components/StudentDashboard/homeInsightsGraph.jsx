// import React, { useState, useEffect } from "react";
// import { Bar, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// );

// const GraphSkeleton = () => (
//   <div className="relative h-64 w-full animate-pulse bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
//     <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto my-4"></div>
//     <div className="h-full w-full flex flex-col items-center justify-center space-y-3">
//       <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
//       <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
//       <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
//     </div>
//     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
//   </div>
// );

// const PlacementInsights = () => {
//   const [departmentData, setDepartmentData] = useState(null);
//   const [packageData, setPackageData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Enhanced color palettes with gradients
//   const chartColors = {
//     departments: [
//       '#2563eb', // Blue
//       '#7c3aed', // Purple
//       '#db2777', // Pink
//       '#059669', // Emerald
//       '#ea580c', // Orange
//       '#0284c7', // Light Blue
//       '#7e22ce', // Purple
//       '#be185d', // Pink
//       '#047857', // Green
//       '#d97706', // Amber
//       '#0369a1', // Sky
//       '#6d28d9', // Violet
//       '#be123c', // Rose
//       '#15803d', // Green
//       '#b45309'  // Orange
//     ],
//     packages: [
//       'rgba(37, 99, 235, 0.9)',   // Success - Blue
//       'rgba(124, 58, 237, 0.9)',  // Medium - Purple
//       'rgba(219, 39, 119, 0.9)'   // High - Pink
//     ]
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.REACT_APP_BASE_URL}/placements/cominsights`
//         );
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();

//         const allDepartments = [
//           "CSE", "ECE", "EE", "ME", "CE", "IT", "CH", "ICE", "BT", "TT", 
//           "IPE", "DS", "VLSI", "AI", "HM",
//         ];

//         const departmentDataMap = data.departmentWise.reduce((acc, item) => {
//           acc[item._id] = item.count;
//           return acc;
//         }, {});

//         const departmentDataWithZeroes = allDepartments.map(department => ({
//           _id: department,
//           count: departmentDataMap[department] || 0,
//         }));

//         setDepartmentData({
//           labels: departmentDataWithZeroes.map((item) => item._id),
//           datasets: [{
//             label: "Offers",
//             data: departmentDataWithZeroes.map((item) => item.count),
//             backgroundColor: chartColors.departments,
//             borderWidth: 2,
//             borderColor: '#ffffff',
//             hoverBorderWidth: 3,
//             hoverBorderColor: '#ffffff',
//           }],
//         });

//         const allPackageRanges = ["<10 LPA", "10-20 LPA", ">20 LPA"];
//         const packageDataMap = data.packageWise.reduce((acc, item) => {
//           acc[item._id] = item.count;
//           return acc;
//         }, {});

//         const packageDataWithZeroes = allPackageRanges.map(range => ({
//           _id: range,
//           count: packageDataMap[range] || 0,
//         }));

//         setPackageData({
//           labels: packageDataWithZeroes.map((item) => item._id),
//           datasets: [{
//             label: "Number of Offers",
//             data: packageDataWithZeroes.map((item) => item.count),
//             backgroundColor: chartColors.packages,
//             borderWidth: 3,
//             borderColor: '#ffffff',
//             hoverBorderWidth: 4,
//             hoverBorderColor: '#ffffff',
//           }],
//         });
//       } catch (error) {
//         console.error("Error fetching placement insights:", error.message);
//       } finally {
//         setTimeout(() => setLoading(false), 800);
//       }
//     };

//     fetchData();
//   }, []);

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           padding: 20,
//           usePointStyle: true,
//           font: {
//             size: 12,
//             family: "'Inter', sans-serif",
//             weight: '500'
//           }
//         }
//       },
//       tooltip: {
//         backgroundColor: 'rgba(17, 24, 39, 0.9)',
//         padding: 12,
//         titleFont: {
//           size: 14,
//           family: "'Inter', sans-serif",
//           weight: '600'
//         },
//         bodyFont: {
//           size: 13,
//           family: "'Inter', sans-serif"
//         },
//         borderColor: 'rgba(255, 255, 255, 0.1)',
//         borderWidth: 1
//       }
//     },
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl p-6 mt-6">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-3">
//         Placement Insights
//       </h2>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
//           <h3 className="font-medium text-gray-700 mb-4 text-center">
//             Package Distribution
//           </h3>
//           <div className="h-72 flex justify-center items-center">
//             {loading ? (
//               <GraphSkeleton />
//             ) : (
//               <Doughnut 
//                 data={packageData} 
//                 options={{
//                   ...chartOptions,
//                   cutout: '65%',
//                   plugins: {
//                     ...chartOptions.plugins,
//                     legend: {
//                       ...chartOptions.plugins.legend,
//                       position: 'bottom'
//                     }
//                   }
//                 }} 
//               />
//             )}
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
//           <h3 className="font-medium text-gray-700 mb-4 text-center">
//             Department-wise Placements
//           </h3>
//           <div className="h-72 flex justify-center items-center">
//             {loading ? (
//               <GraphSkeleton />
//             ) : (
//               <Bar 
//                 data={departmentData} 
//                 options={{
//                   ...chartOptions,
//                   scales: {
//                     y: {
//                       beginAtZero: true,
//                       grid: {
//                         color: 'rgba(0, 0, 0, 0.05)'
//                       },
//                       ticks: {
//                         font: {
//                           family: "'Inter', sans-serif",
//                           size: 11
//                         }
//                       }
//                     },
//                     x: {
//                       grid: {
//                         display: false
//                       },
//                       ticks: {
//                         font: {
//                           family: "'Inter', sans-serif",
//                           size: 11
//                         }
//                       }
//                     }
//                   }
//                 }} 
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlacementInsights;
import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const GraphSkeleton = () => (
  <div className="relative h-64 w-full animate-pulse bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
    <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto my-4"></div>
    <div className="h-full w-full flex flex-col items-center justify-center space-y-3">
      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
      <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
      <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
  </div>
);

const PlacementInsights = () => {
  const [selectedCourse, setSelectedCourse] = useState("BTech");
  const [departmentData, setDepartmentData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const chartColors = {
    departments: [
      '#2563eb', '#7c3aed', '#db2777', '#059669', '#ea580c',
      '#0284c7', '#7e22ce', '#be185d', '#047857', '#d97706',
      '#0369a1', '#6d28d9', '#be123c', '#15803d', '#b45309'
    ],
    packages: [
      'rgba(37, 99, 235, 0.9)',
      'rgba(124, 58, 237, 0.9)',
      'rgba(219, 39, 119, 0.9)'
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.REACT_APP_BASE_URL}/placements/cominsights?course=${selectedCourse}`
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        // Department Data Processing
        const departments = selectedCourse === "BTech"
          ? ["CSE", "ECE", "EE", "ME", "CE", "IT", "CH", "ICE", "BT", "TT", "IPE"]
          : ["DS", "VLSI", "AI", "HM"];

        const departmentDataMap = data.departmentWise.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {});

        const departmentDataWithZeroes = departments.map(department => ({
          _id: department,
          count: departmentDataMap[department] || 0,
        }));

        setDepartmentData({
          labels: departmentDataWithZeroes.map((item) => item._id),
          datasets: [{
            label: "Offers",
            data: departmentDataWithZeroes.map((item) => item.count),
            backgroundColor: chartColors.departments,
            borderWidth: 2,
            borderColor: '#ffffff',
          }],
        });

        // Package Data Processing
        const allPackageRanges = ["<10 LPA", "10-20 LPA", ">20 LPA"];
        const packageDataMap = data.packageWise.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {});

        const packageDataWithZeroes = allPackageRanges.map(range => ({
          _id: range,
          count: packageDataMap[range] || 0,
        }));

        setPackageData({
          labels: packageDataWithZeroes.map((item) => item._id),
          datasets: [{
            label: "Number of Offers",
            data: packageDataWithZeroes.map((item) => item.count),
            backgroundColor: chartColors.packages,
            borderWidth: 3,
            borderColor: '#ffffff',
          }],
        });

      } catch (error) {
        console.error("Error fetching placement insights:", error.message);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchData();
  }, [selectedCourse]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: { beginAtZero: true },
      x: { grid: { display: false } }
    }
  };

  const doughnutOptions = {
    ...chartOptions,
    cutout: '65%',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl p-6 mt-6">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
        <h2 className="text-xl font-semibold text-gray-800">Placement Insights</h2>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-36 px-3 py-2 rounded-lg border-2  border-custom-blue text-custom-blue font-medium shadow-md outline-none 
              hover:shadow-lg transition-all duration-300 
              focus:ring-offset-2 cursor-pointer"
        >
          <option value="BTech" className="text-gray-800 bg-white">Btech</option>
          <option value="MTech" className="text-gray-800 bg-white">Mtech</option>
        </select>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Package Distribution Chart */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="font-medium text-gray-700 mb-4 text-center">Package Distribution</h3>
          <div className="h-72 flex justify-center items-center">
            {loading || !packageData ? (
              <GraphSkeleton />
            ) : (
              <Doughnut data={packageData} options={doughnutOptions} />
            )}
          </div>
        </div>

        {/* Department-wise Placements Chart */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="font-medium text-gray-700 mb-4 text-center">Department-wise Placements</h3>
          <div className="h-72 flex justify-center items-center">
            {loading || !departmentData ? (
              <GraphSkeleton />
            ) : (
              <Bar data={departmentData} options={barChartOptions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementInsights;
