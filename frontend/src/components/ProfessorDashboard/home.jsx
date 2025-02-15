import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Graph from "../StudentDashboard/homeInsightsGraph";
import RecentPlacements from "../StudentDashboard/recentplacements";
import Calendar from "../StudentDashboard/calender";
import { FaUserTie, FaBuilding, FaMoneyBillAlt } from "react-icons/fa";
import { FaBell, FaTimes, FaCircle } from "react-icons/fa";

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
  const [stats, setStats] = useState({
    totalStudentsPlaced: 0,
    companiesVisited: 0,
    averagePackage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/notification`,
        { withCredentials: true }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);


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
      const apiUrl = `${import.meta.env.REACT_APP_BASE_URL
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
      const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/placements/last-seven-days`, { withCredentials: true });
      setPlacements(response.data);

    }
    catch (error) {

    }
  }

  useEffect(() => {
    fetchPlacements();
  }, []);

  useEffect(() => {
    recentplacements();
  }, []);

  const NotificationCard = ({ isLoading }) => {
    const listRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [startScroll, setStartScroll] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // Toggle expand state
  
    // Delay before auto-scroll starts
    useEffect(() => {
      if (!isLoading) {
        const timer = setTimeout(() => setStartScroll(true), 1000);
        return () => clearTimeout(timer);
      }
    }, [isLoading]);
  
    // Smooth scrolling effect
    useEffect(() => {
      let scrollInterval;
      if (!isLoading && startScroll && !isHovered) {
        scrollInterval = requestAnimationFrame(() => {
          if (listRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
              listRef.current.scrollTop = 0; // Reset scroll
            } else {
              listRef.current.scrollTop += 1; // Scroll down
            }
          }
        });
      }
      return () => cancelAnimationFrame(scrollInterval);
    }, [isLoading, startScroll, isHovered]);
  
    const items = notifications;
  
    return (
      <div className="fixed right-6 bottom-6 z-50">
        {/* Notification Bubble */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-custom-blue text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {notifications.length}
            </span>
          )}
        </button>
  
        {/* Expandable Popover */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Popover Header */}
            <div className="px-6 py-4 bg-custom-blue text-white">
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
  
            {/* Notification List */}
            <div
              ref={listRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`h-64 ${
                items.length > 2
                  ? "scrollbar-thin scrollbar-thumb-custom-blue scrollbar-track-transparent hover:scrollbar-track-gray-100"
                  : ""
              } overflow-y-auto [&::-webkit-scrollbar]{width:4px} [&::-webkit-scrollbar-thumb]{min-height:40px}`}
            >
              <div className="space-y-3 p-4">
                {isLoading ? (
                  <CardSkeleton />
                ) : (
                  <>
                    {notifications.length > 0 ? (
                      notifications.map((notification) => {
                        const notificationDate = new Date(notification.timestamp);
                        const today = new Date();
                        const isToday =
                          notificationDate.getDate() === today.getDate() &&
                          notificationDate.getMonth() === today.getMonth() &&
                          notificationDate.getFullYear() === today.getFullYear();
  
                        return (
                          <div
                            key={notification._id}
                            className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200 border-l-4 border-custom-blue"
                          >
                            <div className="flex items-center">
                              <p className="text-sm text-gray-800 flex-grow">
                                {notification.message}
                              </p>
                              {isToday && (
                                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(notification.timestamp).toLocaleString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="p-6 bg-white rounded-lg text-center">
                          <div className="flex justify-center mb-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-12 w-12 text-custom-blue animate-bounce"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-800 font-medium">
                            No notifications available.
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            You're all caught up!
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto font-sans">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 h-32">
  <StatCard
    value={stats.totalStudentsPlaced}
    label="Total Placements"
    bgColor="bg-blue-50"
    borderColor="border-2 border-blue-100"
    textColor="text-blue-700"
    icon={FaUserTie} // Pass the icon
    isLoading={loading}
  />
  <StatCard
    value={stats.companiesVisited}
    label="Companies Visited"
    bgColor="bg-purple-50"
    borderColor="border-2 border-purple-100"
    textColor="text-purple-700"
    icon={FaBuilding} // Pass the icon
    isLoading={loading}
  />
  <StatCard
    value={
      stats.averagePackage != 0
        ? stats.averagePackage >= 10000000
          ? `${(stats.averagePackage / 10000000).toFixed(2)} Cr`
          : `${(stats.averagePackage / 100000).toFixed(2)} LPA`
        : "N/A"
    }
    label="Average Package"
    bgColor="bg-green-50"
    borderColor="border-2 border-green-100"
    textColor="text-green-700"
    icon={FaMoneyBillAlt} // Pass the icon
    isLoading={loading}
  />
  </div>

        <div className="grid  gap-6 mb-6">
          {/* Notifications Card */}
          <NotificationCard isLoading={loading} />

          {/* Recent Placements Card */}

          <RecentPlacements placements={placements} loading={loading} />


          {/* Recent Internships Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl h-[320px]">
  {/* Header */}
  <div className="px-6 py-4 bg-custom-blue text-white">
    <h2 className="text-xl font-semibold">Recent Internships</h2>
  </div>

  {/* Content */}
  <div
    className={`p-6 h-[calc(100%-72px)] ${
      internships.length > 2
        ? "overflow-y-auto scrollbar-thin scrollbar-thumb-[#3b82f6] scrollbar-track-gray-200"
        : "overflow-y-hidden"
    }`}
  >
    {loading ? (
      <CardSkeleton />
    ) : internships.length === 0 ? (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="p-6 bg-white rounded-lg text-center w-full max-w-md mx-auto shadow-sm">
          {/* Icon */}
          <div className="flex justify-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-custom-blue animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          {/* Message */}
          <p className="text-sm text-gray-800 font-medium">
            No Recent Internships
          </p>
          <p className="text-xs text-gray-500 mt-1">You're all caught up!</p>
        </div>
      </div>
    ) : (
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

        {/* Internships as Timeline Items */}
        {internships.map((internship, index) => (
          <div
            key={index}
            className="group relative pl-8 pb-6"
          >
            {/* Timeline Dot */}
            <div className="absolute left-0 top-1 h-3 w-3 bg-custom-blue rounded-full border-2 border-white transform -translate-x-1/2"></div>

            {/* Internship Details */}
            <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-custom-blue hover:border-purple-600">
              <div className="text-gray-800 font-medium mb-1">
                {internship.company}
              </div>
              <div className="text-sm text-gray-600">{internship.role}</div>
              <div className="text-xs text-gray-500 mt-1">
                {internship.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
        </div>
        <div className="flex gap-3">

        <h1 className="text-custom-blue font-bold text-4xl mt-20 mb-6">Placement</h1>
        <h1 className="text-black font-bold text-4xl mt-20 mb-6">Calendar</h1>
        </div>
              <Calendar/>
        <Graph />
      </div>
    </div>
  );
};

export default Home;
