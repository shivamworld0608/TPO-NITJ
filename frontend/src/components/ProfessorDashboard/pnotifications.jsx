import React, { useState } from "react";
import { FaBell, FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes, FaSearch } from "react-icons/fa";

// Sample Notification Data
const notificationsData = [
  {
    id: 1,
    type: "success",
    message: "You have successfully applied for the job!",
    timestamp: new Date().getTime() - 3600000, // 1 hour ago
    read: false,
  },
  {
    id: 2,
    type: "error",
    message: "Failed to submit your application. Please try again.",
    timestamp: new Date().getTime() - 7200000, // 2 hours ago
    read: false,
  },
  {
    id: 3,
    type: "info",
    message: "Your interview has been scheduled for tomorrow.",
    timestamp: new Date().getTime() - 10800000, // 3 hours ago
    read: true,
  },
  {
    id: 4,
    type: "warning",
    message: "Your job application deadline is approaching soon.",
    timestamp: new Date().getTime() - 86400000, // 1 day ago
    read: true,
  },
  {
    id: 5,
    type: "success",
    message: "Your interview was successful! Great job!",
    timestamp: new Date().getTime() - 5000000, // Just now
    read: false,
  },
];

const NotificationItem = ({ notification, onMarkAsRead, onDelete, onToggleRead }) => {
  const { type, message, timestamp, read } = notification;

  // Function to calculate time ago
  const timeAgo = (time) => {
    const seconds = Math.floor((new Date().getTime() - time) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  const getNotificationIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      case "error":
        return <FaExclamationCircle className="text-red-500" />;
      case "info":
        return <FaInfoCircle className="text-blue-500" />;
      case "warning":
        return <FaExclamationCircle className="text-yellow-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  return (
    <div
      className={`flex items-start p-4 mb-4 rounded-md border-2 transition-all duration-300 ${
        read ? "bg-gray-100" : "bg-white"
      } ${read ? "border-gray-300" : "border-blue-500"}`}
      style={{
        transform: read ? "scale(1)" : "scale(1.05)",
        opacity: read ? "1" : "0.95",
      }}
    >
      <div className="flex-shrink-0">{getNotificationIcon()}</div>
      <div className="ml-3 flex-1">
        <p className="text-sm">{message}</p>
        <p className="text-xs text-gray-500">{timeAgo(timestamp)}</p>
      </div>
      <div className="flex items-center ml-3 space-x-2">
        <button
          onClick={() => onToggleRead(notification.id)}
          className="text-blue-500 hover:text-blue-600"
        >
          {read ? "Mark as Unread" : "Mark as Read"}
        </button>
        <button
          onClick={() => onDelete(notification.id)}
          className="text-red-500 hover:text-red-600"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

const PNotifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest or oldest

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  // Toggle read/unread status of a notification
  const handleToggleRead = (id) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, read: !notif.read } : notif
    );
    setNotifications(updatedNotifications);
  };

  // Delete a notification
  const handleDeleteNotification = (id) => {
    const updatedNotifications = notifications.filter((notif) => notif.id !== id);
    setNotifications(updatedNotifications);
  };

  // Sort notifications by timestamp
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (sortBy === "newest") return b.timestamp - a.timestamp;
    return a.timestamp - b.timestamp;
  });

  // Filter notifications based on the search term
  const filteredNotifications = sortedNotifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <div className="sm:p-6 w-full flex flex-col space-y-4 bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded-md w-full">
        <h2 className="text-2xl font-semibold mb-4 flex justify-between items-center">
          Notifications
          {unreadCount > 0 && (
            <span className="bg-blue-500 text-white px-2 py-1 text-xs rounded-full">
              {unreadCount} Unread
            </span>
          )}
        </h2>

        {/* Search Bar */}
        <div className="mb-4 flex items-center">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            className="ml-2 p-2 border rounded-md w-full"
            placeholder="Search Notifications"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Sort By Dropdown */}
        <div className="mb-4 text-right">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Mark All as Read Button */}
        <div className="mb-4 text-right">
          <button
            onClick={handleMarkAllAsRead}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Mark All as Read
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={(id) => {
                  const updatedNotifications = notifications.map((notif) =>
                    notif.id === id ? { ...notif, read: true } : notif
                  );
                  setNotifications(updatedNotifications);
                }}
                onDelete={handleDeleteNotification}
                onToggleRead={handleToggleRead}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No notifications found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PNotifications;
