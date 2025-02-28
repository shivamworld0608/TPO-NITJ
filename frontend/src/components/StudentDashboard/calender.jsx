import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import Jobdetail from "./Jobdetail";
import Notification from "../ProfessorDashboard/Notification";

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
    const checkWidth = () => setIsWideScreen(window.innerWidth > 625);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isJobDetailVisible || isDatePopupVisible ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
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
        { withCredentials: true, params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() } }
      );
      if (response.data.success) setEvents(response.data.events);
      else setError("Failed to fetch events");
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
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction));
  };

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const formatDate = (year, month, day) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const isToday = (year, month, day) => {
    const today = new Date();
    return year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
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

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="sm:h-36 h-24 bg-gray-50 border border-gray-100 rounded-lg"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = events[dateString] || [];
      const isCurrentDay = isToday(currentDate.getFullYear(), currentDate.getMonth(), day);

      days.push(
        <div
          key={day}
          className={`sm:h-36 h-24 border border-gray-100 bg-white rounded-lg shadow-sm sm:p-3 p-2 overflow-y-auto cursor-pointer transition-all duration-200 hover:shadow-md ${
            isCurrentDay ? "bg-gradient-to-br from-blue-50 to-blue-100 ring-2 ring-blue-300" : ""
          }`}
          onClick={() => (!isWideScreen && dayEvents.length > 0 ? onDateClick(dayEvents) : null)}
        >
          <div className="font-semibold text-gray-800 mb-1">{day}</div>
          {isCurrentDay && <div className="text-xs font-medium text-custom-blue">Today</div>}
          {isWideScreen
            ? dayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className={`sm:p-2 p-1 mb-1 rounded-lg text-xs cursor-pointer shadow-sm transition-all duration-150 hover:scale-105 ${
                    event.type === "internship"
                      ? "bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900"
                      : "bg-gradient-to-r from-green-200 to-green-300 text-green-900"
                  }`}
                  onClick={() => onEventClick(event._id)}
                >
                  <div className="font-semibold truncate">{event.company}</div>
                  <div className="sm:block hidden">{event.type}</div>
                  <div className="sm:block hidden truncate">{event.role}</div>
                  <div className="sm:block hidden text-gray-600">{event.time}</div>
                </div>
              ))
            : dayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full mb-1 ${
                    event.type === "internship" ? "bg-blue-400" : "bg-green-400"
                  }`}
                />
              ))}
        </div>
      );
    }
    return days;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div className="relative">
      <Card className="max-w-6xl mx-auto shadow-xl rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <CardHeader className="bg-custom-blue text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6" />
              <h2 className="text-2xl font-bold tracking-tight">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth(-1)}
                disabled={loading}
                className="bg-white text-custom-blue rounded-full shadow-md"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth(1)}
                disabled={loading}
                className="bg-white text-custom-blue rounded-full shadow-md"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {loading && <div className="text-center py-4 text-gray-500 animate-pulse">Loading events...</div>}
          {error && <div className="text-red-500 text-center py-4 font-medium">Error: {error}</div>}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-semibold text-gray-700 p-2 bg-gray-100 rounded-lg">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
            </>
          )}
        </CardContent>

        {/* Job Detail Popup */}
        {selectedJobId && (
          <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 ${
              isJobDetailVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{ zIndex: 1000 }}
          >
            <div className="h-[90vh] w-full max-w-2xl p-6 bg-white rounded-2xl shadow-2xl overflow-y-auto transform transition-all duration-300 scale-95">
              <Jobdetail job_id={selectedJobId} onBack={handleBack} />
            </div>
          </div>
        )}

        {/* Mobile Date Events Popup */}
        {isDatePopupVisible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
            style={{ zIndex: 999 }}
          >
            <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-xl transform transition-all duration-300 scale-95">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Events on Selected Day</h3>
              {selectedDateEvents.map((event, idx) => (
                <div
                  key={idx}
                  className={`p-3 mb-3 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all duration-150 ${
                    event.type === "internship"
                      ? "bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900"
                      : "bg-gradient-to-r from-green-200 to-green-300 text-green-900"
                  }`}
                  onClick={() => {
                    setSelectedJobId(event._id);
                    setDatePopupVisible(false);
                    setJobDetailVisible(true);
                  }}
                >
                  <div className="font-semibold truncate">{event.company}</div>
                  <div className="text-sm">{event.type}</div>
                </div>
              ))}
              <Button
                variant="outline"
                className="mt-4 w-full rounded-full bg-custom-blue text-white transition-all"
                onClick={() => setDatePopupVisible(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Card>
      <Notification />
    </div>
  );
};

export default CalendarComponent;