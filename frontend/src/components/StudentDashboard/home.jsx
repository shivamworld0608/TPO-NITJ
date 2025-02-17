import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Graph from "./homeInsightsGraph";
import RecentPlacements from "./recentplacements";
import Notification from "../ProfessorDashboard/Notification";

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
      rounded-lg 
      p-6 
      ${textColor} 
      shadow-md 
      relative 
      overflow-hidden
      transition-all 
      duration-300 
      ease-in-out
      ${isTransitioning ? "scale-[1.02]" : "scale-100"}
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
          <div className="text-2xl font-bold">
            {value === 0 ? "N/A" : value}
          </div>
          <div className={`${textColor}/90 text-sm`}>{label}</div>
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

const StudentDashboard = () => {
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


  const [placements,setPlacements]=useState([]);

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
  const recentplacements=async()=>{
    setLoading(true);
    try {
      const response=await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/placements/last-seven-days`,{withCredentials:true});
      setPlacements(response.data);
 
  }
  catch(error){
 
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

    // Initial pause before starting scroll
    useEffect(() => {
      if (!isLoading) {
        const timer = setTimeout(() => {
          setStartScroll(true);
        }, 1000); // 2 second initial pause

        return () => clearTimeout(timer);
      }
    }, [isLoading]);

    // Scrolling effect with hover pause
    useEffect(() => {
      if (!isLoading && startScroll && !isHovered) {
        const interval = setInterval(() => {
          if (listRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listRef.current;

            if (scrollTop + clientHeight >= scrollHeight) {
              // Reset to top after reaching bottom
              setTimeout(() => {
                if (listRef.current) {
                  listRef.current.scrollTop = 0;
                }
              }, 20);
            } else {
              listRef.current.scrollTop += 1;
            }
          }
        }, 50);

        return () => clearInterval(interval);
      }
    }, [isLoading, startScroll, isHovered]);



    const items =
      notifications;

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl h-[320px] w-full max-w-3xl">
        <div className="px-4 py-3 bg-custom-blue text-white">
          <h2 className="text-lg font-medium">Notifications</h2>
        </div>

        <div
          ref={listRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`h-[calc(100%-48px)] ${
            items.length > 2
              ? "scrollbar-thin scrollbar-thumb-custom-blue scrollbar-track-transparent hover:scrollbar-track-gray-100"
              : ""
          } overflow-y-auto [&::-webkit-scrollbar]{width:4px} [&::-webkit-scrollbar-thumb]{min-height:40px}`}
        >
          <div className="space-y-0.5">
            {isLoading ? (
              <CardSkeleton />
            ) : (
              <div className="space-y-2 px-1 py-1">
  {notifications.length > 0 ? (
    notifications.map((notification) => {
      const notificationDate = new Date(notification.timestamp);
      const today = new Date();
      const isToday = 
        notificationDate.getDate() === today.getDate() &&
        notificationDate.getMonth() === today.getMonth() &&
        notificationDate.getFullYear() === today.getFullYear();
      
       return ( <div
        key={notification._id}
        className="px-4 py-3 bg-white rounded-lg hover:bg-blue-50 transition-colors duration-200 border-l-3 border hover:border-custom-blue relative"
      >
        <div className="flex items-center">
          <p className="text-sm text-gray-800 flex-grow">{notification.message}</p>
          {isToday && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              New
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(notification.timestamp).toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })}
        </p>
      </div>
    )})
  ) : (
    <div className="min-h-[250px] flex items-center justify-center">
      <div className="p-6 bg-white rounded-lg text-center w-full max-w-md mx-auto">
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
        <p className="text-sm text-gray-800 font-medium">No notifications available.</p>
        <p className="text-xs text-gray-500 mt-1">You're all caught up!</p>
      </div>
    </div>
  )}
</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto font-sans">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard
            value={stats.totalStudentsPlaced}
            label="Total Placements"
            bgColor="bg-[#ffead6]"
            borderColor="border-2 border-[#e4bca0]"
            textColor="text-[#b87748]"
            isLoading={loading}
          />
          <StatCard
            value={stats.companiesVisited}
            label="Companies Visited"
            bgColor="bg-[#f3e5fa]"
            borderColor="border-2 border-[#d3b8e3]"
            textColor="text-[#a578c0]"
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
            bgColor="bg-[#d7f7e5]"
            borderColor="border-2 border-[#b3d4c2]"
            textColor="text-[#6a987b]"
            isLoading={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Notifications Card */}
          <NotificationCard isLoading={loading} />

          {/* Recent Placements Card */}

         <RecentPlacements placements={placements} loading={loading} />

         
          {/* Recent Internships Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl h-[320px]">
            <div className="px-4 py-3 bg-custom-blue text-white">
              <h2 className="text-lg font-medium">Recent Internships</h2>
            </div>
            <div
              className={`p-4 h-[calc(100%-48px)] ${
                internships.length > 2
                  ? "overflow-y-auto scrollbar-thin scrollbar-thumb-custom-blue scrollbar-track-gray-200"
                  : "overflow-y-hidden"
              }`}
            >
              {loading ? (
                <CardSkeleton />
              ) : (
                <div className="space-y-4">
                  {internships.map((internship, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-gray-100 rounded transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="text-gray-800 font-medium mb-1">
                        {internship.company}
                      </div>
                      <div className="text-sm text-gray-600">
                        {internship.role}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {internship.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <Notification/>
        <Graph />
      </div>
    </div>
  );
};

export default StudentDashboard;
