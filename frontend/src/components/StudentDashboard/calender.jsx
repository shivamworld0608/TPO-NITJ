// components/Calendar.jsx
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import Jobdetail from "./Jobdetail";

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0));
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isJobDetailVisible, setJobDetailVisible] = useState(false);

  const handleBack = () => {
    setJobDetailVisible(false);
    setTimeout(() => setSelectedJobId(null), 300); // Delay unmounting for transition
  };

  const fetchEvents = async (year, month) => {
    try {
      setLoading(true);
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);

      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/job-events`,
        {
          withCredentials: true,
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        }
      );

      if (response.data.success) {
        setEvents(response.data.events);
      } else {
        setError("Failed to fetch events");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const navigateMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction)
    );
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    const onEventClick = (jobId) => {
      setSelectedJobId(jobId);
      setJobDetailVisible(true);
    };

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-32 border border-gray-200"></div>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dayEvents = events[dateString] || [];

      days.push(
        <div
          key={day}
          className="h-32 border border-gray-200 p-2 overflow-y-auto"
        >
          <div className="font-bold mb-1">{day}</div>
          {dayEvents.map((event, idx) => (
            <div
              key={idx}
              className={`p-1 mb-1 rounded text-xs ${
                event.type === "internship"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
              onClick={() => onEventClick(event._id)}
            >
              <div className="font-semibold">{event.company}</div>
              <div>{event.type}</div>
              <div>{event.role}</div>
              <div>{event.time}</div>
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            <h2 className="text-2xl font-bold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(-1)}
              disabled={loading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(1)}
              disabled={loading}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading && <div className="text-center py-4">Loading events...</div>}
        {error && (
          <div className="text-red-500 text-center py-4">Error: {error}</div>
        )}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-semibold p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
            <div className="mt-4 flex gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-blue-100 mr-2"></div>
                <span className="text-sm">Internships</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-green-100 mr-2"></div>
                <span className="text-sm">Placements</span>
              </div>
            </div>
          </>
        )}
      </CardContent>

      {selectedJobId && (
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90 transition-opacity duration-300 ${
            isJobDetailVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mx-auto px-4 py-6 transform transition-transform duration-300 scale-95">
            <Jobdetail job_id={selectedJobId} onBack={handleBack} />
          </div>
        </div>
      )}
    </Card>
  );
};

export default CalendarComponent;
