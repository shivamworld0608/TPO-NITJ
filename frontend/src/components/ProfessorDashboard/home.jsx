import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Graph from "../StudentDashboard/homeInsightsGraph";
import RecentPlacements from "../StudentDashboard/recentplacements";
import Calendar from "../StudentDashboard/calender";
import { FaUserTie, FaBuilding, FaMoneyBillAlt } from "react-icons/fa";
import { FaBell, FaTimes, FaCircle } from "react-icons/fa";
import Notification from "./Notification";

const LoadingSkeleton = () => (
  <div className="h-full w-full animate-pulse space-y-2">
    <div className="h-8 bg-current opacity-10 rounded-md w-24"></div>
    <div className="h-4 bg-current opacity-10 rounded-md w-32"></div>
    <div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
      -translate-x-full animate-[shimmer_2s_infinite] border-t border-white/10"
    ></div>
  </div>
);

const StatCard = ({
  value,
  label,
  bgColor,
  borderColor,
  textColor,
  icon: Icon,
  isLoading,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div
      className={`
      ${bgColor} 
      ${borderColor} 
      rounded-xl 
      p-6 
      ${textColor} 
      shadow-lg 
      relative 
      overflow-hidden
      transition-all 
      duration-300 
      ease-in-out
      ${isTransitioning ? "scale-[1.02]" : "scale-100"}
      hover:shadow-xl
    `}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div
          className={`
          transform 
          transition-all 
          duration-300 
          ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}
        `}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${textColor} bg-opacity-20`}>
              <Icon className="w-6 h-6" /> {/* Render the icon */}
            </div>
            <div>
              <div className="text-3xl font-bold">
                {value === 0 ? "N/A" : value}
              </div>
              <div className={`${textColor}/80 text-sm mt-1`}>{label}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CardSkeleton = () => (
  <div className="space-y-3 p-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="animate-pulse space-y-2 p-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    ))}
  </div>
);

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudentsPlaced: 0,
    companiesVisited: 0,
    averagePackage: 0,
  });

  const [placements, setPlacements] = useState([]);

  const internships = [
    { company: "Expedia", role: "Software Engineer", date: "January 13, 2024" },
    {
      company: "Accenture",
      role: "Software Engineer",
      date: "January 12, 2024",
    },
    { company: "Company A", role: "Data Analyst", date: "January 10, 2024" },
    {
      company: "Company B",
      role: "Backend Developer",
      date: "January 9, 2024",
    },
  ];

  const fetchPlacements = async () => {
    setLoading(true);
    try {
      const apiUrl = `${
        import.meta.env.REACT_APP_BASE_URL
      }/placements/insights`;
      const response = await axios.get(apiUrl);
      setStats(response.data);
    } catch (error) {
    } finally {
      // Simulate minimum loading time for better UX
      setTimeout(() => setLoading(false), 800);
    }
  };
  const recentplacements = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/placements/last-seven-days`,
        { withCredentials: true }
      );
      setPlacements(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  useEffect(() => {
    recentplacements();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto font-sans">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ">
          <StatCard
            value={stats.totalStudentsPlaced}
            label="Total Placements"
            bgColor="bg-[#ffead6]"
            borderColor="border-2 border-[#e4bca0]"
            textColor="text-[#b87748]"
            icon={FaUserTie} // Pass the icon
            isLoading={loading}
          />
          <StatCard
            value={stats.companiesVisited}
            label="Companies Visited"
            bgColor="bg-[#f3e5fa]"
            borderColor="border-2 border-[#d3b8e3]"
            textColor="text-[#a578c0]"
            icon={FaBuilding} // Pass the icon
            isLoading={loading}
          />
          <StatCard
            value={
              stats.average_ctc != 0
                ? stats.average_ctc >= 100
                  ? `${(stats.average_ctc / 100).toFixed(2)} Cr`
                  : `${stats.average_ctc} LPA`
                : "N/A"
            }
            label="Average Package"
            bgColor="bg-[#d7f7e5]"
            borderColor="border-2 border-[#b3d4c2]"
            textColor="text-[#6a987b]"
            icon={FaMoneyBillAlt} // Pass the icon
            isLoading={loading}
          />
        </div>

        <div className="grid  gap-6 mb-6">
          {/* Recent Placements Card */}

          {/* <RecentPlacements placements={placements} loading={loading} /> */}

          {/* Recent Internships Card */}
     
        </div>
        <div className="flex gap-3">
          <h1 className="text-custom-blue font-bold text-4xl mt-15 mb-6">
            Placement
          </h1>
          <h1 className="text-black font-bold text-4xl mt-15 mb-6">Calendar</h1>
        </div>
        {/* <Notification/> */}
        <Calendar />
        <Graph />
      </div>
    </div>
  );
};

export default Home;