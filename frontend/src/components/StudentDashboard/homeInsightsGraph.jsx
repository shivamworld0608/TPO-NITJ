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

const PlacementInsights = () => {
  const [departmentData, setDepartmentData] = useState(null);
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}/placements/cominsights`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
  
        // All possible departments (hardcoded)
        const allDepartments = [
          "CSE", "ECE", "EE", "ME", "CE", "IT", "CH", "ICE", "BT", "TT", "IPE", "DS", "VLSI", "AI", "HM"
        ];
  
        // Process the department data to ensure every department is included
        const departmentDataMap = data.departmentWise.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {});
  
        // Add missing departments with count 0
        const departmentDataWithZeroes = allDepartments.map(department => ({
          _id: department,
          count: departmentDataMap[department] || 0,
        }));
  
        setDepartmentData({
          labels: departmentDataWithZeroes.map((item) => item._id),
          datasets: [
            {
              label: "Offers",
              data: departmentDataWithZeroes.map((item) => item.count),
              backgroundColor: [
                "#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#673AB7",
                "#009688", "#E91E63", "#607D8B", "#3F51B5", "#795548",
              ],
            },
          ],
        });
  
        // Ensure that all package ranges are included
        const allPackageRanges = [
          "<10 LPA",
          "10-20 LPA",
          ">20 LPA"
        ];
  
        // Process the package data
        const packageDataMap = data.packageWise.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {});
  
        // Add missing package ranges with count 0
        const packageDataWithZeroes = allPackageRanges.map(range => ({
          _id: range,
          count: packageDataMap[range] || 0,
        }));
  
        setPackageData({
          labels: packageDataWithZeroes.map((item) => item._id),
          datasets: [
            {
              label: "Number of Offers",
              data: packageDataWithZeroes.map((item) => item.count),
              backgroundColor: ["#FF5722", "#FFC107", "#4CAF50"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching placement insights:", error.message);
      }
    };
  
    fetchData();
  }, []);

  const renderChart = (filter) => {
    if (filter === "department" && departmentData) {
      return (
        <div style={{ height: "300px", width: "100%" }}>
          <Bar
            data={departmentData}
            options={{
              plugins: {
                legend: { display: false },
                title: {
                  display: true,
                  text: "Offers by Department",
                  font: { size: 16 },
                },
              },
              responsive: true,
            }}
          />
        </div>
      );
    }
    if (filter === "packages" && packageData) {
      return (
        <div style={{ height: "300px", width: "100%" }}>
          <Doughnut
            data={packageData}
            options={{
              plugins: {
                legend: { display: false },
                title: {
                  display: true,
                  text: "Offers by Package Range",
                  font: { size: 16 },
                },
              },
              responsive: true,
            }}
          />
        </div>
      );
    }
    return <p>Loading...</p>;
  };

  const renderPackageColors = () => {
    if (!packageData) return null;
    return packageData.labels.map((label, idx) => (
      <div key={idx} className="flex items-center mb-2">
        <div
          className="w-4 h-4 mr-2"
          style={{
            backgroundColor: packageData.datasets[0].backgroundColor[idx],
          }}
        />
        <span>{label}</span>
      </div>
    ));
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-bold mb-4">Placement Insights</h2>
      <div className="flex flex-col md:flex-row">
        {/* Package Range Colors Section */}
        <div className="w-full md:w-1/3 pr-4 mb-4 md:mb-0">
          <h3 className="font-semibold mb-4">Package Range Colors</h3>
          {renderPackageColors()}
        </div>
        
        {/* Package Chart Section */}
        <div className="w-full md:w-2/3 lg:w-1/2 mb-4 md:mb-0">{renderChart("packages")}</div>

        {/* Department Chart Section */}
        <div className="w-full md:w-2/3 lg:w-1/2">{renderChart("department")}</div>
      </div>
    </div>
  );
};

export default PlacementInsights;
