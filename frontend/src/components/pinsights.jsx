import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PlacementInsights = () => {
  const [filter, setFilter] = useState("department");

  // Data for Charts
  const departmentData = {
    labels: ["CSE", "IT", "ECE", "EE", "ICE", "ME", "IPE", "Chemical", "TT", "BT"],
    datasets: [
      {
        label: "Offers",
        data: [150, 120, 100, 80, 70, 50, 40, 30, 20, 15],
        backgroundColor: [
          "#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#673AB7",
          "#009688", "#E91E63", "#607D8B", "#3F51B5", "#795548"
        ],
      },
    ],
  };

  const packageData = {
    labels: ["<5 LPA", "5-10 LPA", "10-15 LPA", "15-20 LPA", ">20 LPA"],
    datasets: [
      {
        label: "Number of Offers",
        data: [120, 200, 80, 50, 20],
        backgroundColor: ["#FF5722", "#FFC107", "#4CAF50", "#2196F3", "#673AB7"],
      },
    ],
  };

  const renderChart = () => {
    if (filter === "department") {
      return (
        <div style={{ height: "200px", width: "100%" }}>
          <Bar data={departmentData} options={{ plugins: { legend: { display: true } } }} />
        </div>
      );
    }
    if (filter === "packages") {
      return (
        <div style={{ height: "200px", width: "100%" }}>
          <Doughnut data={packageData} options={{ plugins: { legend: { display: false } } }} />
        </div>
      );
    }
  };

  const renderPackageColors = () => {
    return packageData.labels.map((label, idx) => (
      <div key={idx} className="flex items-center mb-2">
        <div
          className="w-4 h-4 mr-2"
          style={{ backgroundColor: packageData.datasets[0].backgroundColor[idx] }}
        />
        <span>{label}</span>
      </div>
    ));
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-bold mb-4">Placement Insights</h2>
      <div className="mb-4">
        <button
          onClick={() => setFilter("department")}
          className={`px-4 py-2 mr-2 rounded ${filter === "department" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Department-wise
        </button>
        <button
          onClick={() => setFilter("packages")}
          className={`px-4 py-2 rounded ${filter === "packages" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Package Range
        </button>
      </div>

      {filter === "packages" && (
        <div className="flex flex-row">
          <div className="w-1/3 pr-4">
            <h3 className="font-semibold mb-4">Color Scheme</h3>
            {renderPackageColors()}
          </div>
          <div className="w-2/3">
            {renderChart()}
          </div>
        </div>
      )}

      {filter !== "packages" && renderChart()}
    </div>
  );
};

export default PlacementInsights;
