import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bar, Doughnut } from "react-chartjs-2";
import { FaBriefcase, FaUniversity, FaUsers, FaDollarSign } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PlacementInsights = () => {
  const [data, setData] = useState({
    // Placement Trends
    placementTrends: {
      labels: ["2019", "2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Students Placed",
          data: [350, 400, 450, 500, 550], // Sample data
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    // Salary Distribution
    salaryDistribution: {
      labels: ["< 5 LPA", "5-10 LPA", "10-15 LPA", "15-20 LPA", "> 20 LPA"],
      datasets: [
        {
          label: "Number of Students",
          data: [100, 200, 150, 80, 20], // Sample data
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    // Top Companies
    topCompanies: [
      "Google",
      "Amazon",
      "Microsoft",
      "Facebook",
      "Goldman Sachs",
    ],
    // Skills in Demand
    skillsInDemand: [
      "Machine Learning",
      "Data Science",
      "Full Stack Development",
      "Cloud Computing",
      "Artificial Intelligence",
    ],
  });

  return (
    <div className="p-6 bg-gray-50">
      <motion.div
        className="bg-white p-6 shadow-lg rounded-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Placement Insights</h2>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-6 rounded-md flex items-center justify-between">
            <FaBriefcase className="text-3xl" />
            <div>
              <p className="text-xl">Total Placements</p>
              <p className="text-2xl font-bold">550</p>
            </div>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-md flex items-center justify-between">
            <FaUniversity className="text-3xl" />
            <div>
              <p className="text-xl">Top Companies</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-md flex items-center justify-between">
            <FaUsers className="text-3xl" />
            <div>
              <p className="text-xl">Students Applied</p>
              <p className="text-2xl font-bold">700</p>
            </div>
          </div>
          <div className="bg-orange-500 text-white p-6 rounded-md flex items-center justify-between">
            <FaDollarSign className="text-3xl" />
            <div>
              <p className="text-xl">Average Salary</p>
              <p className="text-2xl font-bold">12 LPA</p>
            </div>
          </div>
        </div>

        {/* Placement Trends Graph */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Placement Trends Over the Years</h3>
          <div className="w-full max-w-xs mx-auto">
            <Bar data={data.placementTrends} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>

        {/* Salary Distribution Graph */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Salary Distribution</h3>
          <div className="w-full max-w-xs mx-auto">
            <Doughnut data={data.salaryDistribution} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>

        {/* Top Companies */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Top Companies Hiring</h3>
          <ul className="list-disc pl-5">
            {data.topCompanies.map((company, index) => (
              <li key={index} className="text-lg">{company}</li>
            ))}
          </ul>
        </div>

        {/* Skills in Demand */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Skills in Demand</h3>
          <ul className="list-disc pl-5">
            {data.skillsInDemand.map((skill, index) => (
              <li key={index} className="text-lg">{skill}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default PlacementInsights;
