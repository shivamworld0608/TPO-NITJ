import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import Jobdetail from "./Jobdetail";


const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isJobDetailVisible, setJobDetailVisible] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [isDatePopupVisible, setDatePopupVisible] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsWideScreen(window.innerWidth > 625);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    if (isJobDetailVisible || isDatePopupVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isJobDetailVisible, isDatePopupVisible]);

  const handleBack = () => {
    setJobDetailVisible(false);
    setTimeout(() => setSelectedJobId(null), 300); 
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

  const isToday = (year, month, day) => {
    const today = new Date();
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    const onEventClick = (jobId) => {
      setSelectedJobId(jobId);
      setJobDetailVisible(true);
    };

    const onDateClick = (dayEvents) => {
      setSelectedDateEvents(dayEvents);
      setDatePopupVisible(true);
    };

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="sm:h-32 h-20 border border-gray-200"
        ></div>
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
      const isCurrentDay = isToday(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );

      days.push(
        <div
          key={day}
          className={`sm:h-32 h-20 border border-gray-200 sm:p-2 pl-1 pt-1 overflow-y-auto cursor-pointer ${
            isCurrentDay ? "bg-blue-100": ""
          }`}          onClick={() => (!isWideScreen && dayEvents.length > 0 ? onDateClick(dayEvents) : null)}
        >
          <div className="font-bold mb-1">{day}</div>
         { isCurrentDay ? <div className="text-xs text-blue-800">Today</div> : ""}

          {isWideScreen
            ? dayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className={`sm:h-full sm:w-full w-fit h-5 sm:p-1 mb-1 rounded text-xs cursor-pointer ${
                    event.type === "internship"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                  onClick={() => onEventClick(event._id)}
                >
                  <div className="font-semibold">{event.company}</div>
                  <div className="sm:block hidden">{event.type}</div>
                  <div className="sm:block hidden">{event.role}</div>
                  <div className="sm:block hidden">{event.time}</div>
                </div>
              ))
            : dayEvents.map((event, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 sm:p-1 mb-1 rounded text-xs cursor-pointer ${
                  event.type === "internship"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                
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
            <div className="grid grid-cols-7 sm:gap-1">{renderCalendar()}</div>
          </>
        )}
      </CardContent>

      {/* Popup for Job Details */}
      {selectedJobId && (
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90 transition-opacity duration-300 ${
            isJobDetailVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 1000 }}
        >
          <div className="h-[90vh] p-5 bg-white shadow-lg rounded-lg overflow-y-auto">
            <Jobdetail job_id={selectedJobId} onBack={handleBack} />
          </div>
        </div>
      )}

      {/* Popup for Date Events (Mobile View) */}
      {isDatePopupVisible && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 999 }}
        >
          <div className="bg-white rounded-lg p-5 w-11/12 max-w-lg">
            <h3 className="text-lg font-bold mb-4">Events on Selected Day</h3>
            {selectedDateEvents.map((event, idx) => (
              <div
                key={idx}
                className={`p-3 mb-2 rounded cursor-pointer ${
                  event.type === "internship"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
                onClick={() => {
                  setSelectedJobId(event._id);
                  setDatePopupVisible(false);
                  setJobDetailVisible(true);
                }}
              >
                <div className="font-semibold">{event.company}</div>
                <div>{event.type}</div>
              </div>
            ))}
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => setDatePopupVisible(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CalendarComponent;
