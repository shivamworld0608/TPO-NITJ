import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Notification() {
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
    <div>
       <NotificationCard isLoading={loading} />
    </div>
  )
}
