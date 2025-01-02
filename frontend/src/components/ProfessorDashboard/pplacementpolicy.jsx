import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaRegClock } from "react-icons/fa";

const PlacementPolicy = () => {
  const [isEligible, setIsEligible] = useState(true); // Dummy state for eligibility check

  const eligibilityCriteria = [
    { label: "Minimum CGPA", value: "6.5" },
    { label: "No Backlogs", value: "Yes" },
    { label: "Minimum Attendance", value: "75%" },
    { label: "Stream-Specific Requirements", value: "No" },
  ];

  const selectionProcess = [
    "Online Test: Assessment of aptitude, technical, and reasoning skills.",
    "Group Discussion (GD): Evaluation of communication skills and teamwork.",
    "Technical Interview: In-depth technical interview based on domain knowledge.",
    "HR Interview: Behavioral assessment and cultural fitment."
  ];

  const placementStatistics = [
    { label: "Total Companies Visited", value: "50+" },
    { label: "Average Salary (in LPA)", value: "6.8" },
    { label: "Highest Salary (in LPA)", value: "25" },
    { label: "Percentage of Students Placed", value: "85%" },
  ];

  return (
    <div className="sm:p-6 bg-gray-100 space-y-6">
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Placement Policy</h2>

        <div className="flex items-center mb-4">
          <FaCheckCircle className="text-green-500 mr-2" />
          <p className="text-lg font-medium">Eligibility Criteria</p>
        </div>

        <div className="space-y-4">
          {eligibilityCriteria.map((criteria, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-700">{criteria.label}</span>
              <span className="text-gray-600">{criteria.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <h3 className="text-xl font-semibold mb-4">Selection Process</h3>
        <div className="space-y-2">
          {selectionProcess.map((step, index) => (
            <div key={index} className="flex items-center text-sm space-x-2">
              <FaRegClock className="text-gray-500" />
              <p className="text-gray-600">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <h3 className="text-xl font-semibold mb-4">Placement Statistics</h3>
        <div className="space-y-4">
          {placementStatistics.map((stat, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-700">{stat.label}</span>
              <span className="text-gray-600">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <h3 className="text-xl font-semibold mb-4">Eligibility Status</h3>
        <div className="flex items-center">
          {isEligible ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center text-green-500"
            >
              <FaCheckCircle className="mr-2" />
              <p className="text-lg font-medium">You are eligible for placements!</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center text-red-500"
            >
              <FaTimesCircle className="mr-2" />
              <p className="text-lg font-medium">You are not eligible for placements yet.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacementPolicy;
