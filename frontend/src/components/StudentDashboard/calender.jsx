import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download,
  FileText,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "../ProfessorDashboard/Notification";
import jsPDF from "jspdf";  

const CalendarComponent = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [isDatePopupVisible, setDatePopupVisible] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);
  const [viewMode, setViewMode] = useState("month");
  const [isDownloading, setIsDownloading] = useState(false);

   
  const calendarRef = useRef(null);

  useEffect(() => {
    const checkWidth = () => setIsWideScreen(window.innerWidth > 625);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isDatePopupVisible ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDatePopupVisible]);

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
            type: filterType !== "all" ? filterType : undefined,
          },
        },
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
  }, [currentDate, filterType, refreshKey]);

  const navigateCalendar = (direction) => {
    if (viewMode === "month") {
       
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + direction),
      );
    } else {
       
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7 * direction);
      setCurrentDate(newDate);
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const refreshCalendar = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const navigateToJobPage = (jobId) => {
    navigate(`/sdashboard/jobs/${jobId}`);
  };

   
  const downloadCalendarEventsPDF = async () => {
    try {
      setIsDownloading(true);

       
      const downloadToast = document.createElement("div");
      downloadToast.className =
        "fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md z-50";
      downloadToast.textContent = "Preparing PDF...";
      document.body.appendChild(downloadToast);

       
      const monthYear = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

       
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageHeight = pdf.internal.pageSize.height;
      let yPosition = 20;
      const lineHeight = 10;

       
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text(`Placement Calendar - ${monthYear}`, 105, yPosition, {
        align: "center",
      });
      yPosition += lineHeight;

       
      if (filterType !== "all") {
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "italic");
        pdf.text(`Filter: ${filterType} Events`, 105, yPosition, {
          align: "center",
        });
        yPosition += lineHeight;
      }

       
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(
        `Generated on: ${new Date().toLocaleDateString()}`,
        105,
        yPosition,
        { align: "center" },
      );
      pdf.setTextColor(0, 0, 0);
      yPosition += lineHeight;

       
      const allMonthEvents = [];
      Object.keys(events).forEach((dateKey) => {
        const dayEvents = events[dateKey] || [];
        const filteredEvents =
          filterType === "all"
            ? dayEvents
            : dayEvents.filter((event) => event.type === filterType);

        filteredEvents.forEach((event) => {
          allMonthEvents.push({ ...event, date: dateKey });
        });
      });

      allMonthEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text("Upcoming Events:", 20, yPosition);
      yPosition += lineHeight;

      if (allMonthEvents.length === 0) {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.text("No events scheduled for this month.", 20, yPosition);
        yPosition += lineHeight;
      }

       
      const eventsByDate = {};
      allMonthEvents.forEach((event) => {
        if (!eventsByDate[event.date]) eventsByDate[event.date] = [];
        eventsByDate[event.date].push(event);
      });

       
      Object.keys(eventsByDate)
        .sort()
        .forEach((dateStr) => {
          const dateObj = new Date(dateStr);
          const formattedDate = `${dateObj.getDate()} ${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

           
          if (yPosition > pageHeight - 30) {
            pdf.addPage();
            yPosition = 20;
          }

           
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(11);
          pdf.setTextColor(0, 0, 0);
          pdf.text(formattedDate, 20, yPosition);
          yPosition += lineHeight;

           
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);

          eventsByDate[dateStr].forEach((event) => {
             
            if (yPosition > pageHeight - 30) {
              pdf.addPage();
              yPosition = 20;
            }

             
            let color;
            if (event.type === "Internship")
              color = [180, 210, 255];  
            else if (event.type === "PPO")
              color = [200, 180, 255];  
            else color = [180, 255, 200];  

            pdf.setFillColor(color[0], color[1], color[2]);
            pdf.roundedRect(25, yPosition - 4, 160, 18, 2, 2, "F");

             
            pdf.setTextColor(0, 0, 0);
            pdf.setFont("helvetica", "bold");
            pdf.text(`• ${event.company} - ${event.type}`, 30, yPosition);

            pdf.setFont("helvetica", "normal");
            pdf.text(`Role: ${event.role}`, 35, yPosition + 5);
            if (event.time) {
              pdf.text(`Time: ${event.time}`, 35, yPosition + 10);
            }

            yPosition += lineHeight * 2.5;
          });

          yPosition += lineHeight / 2;
        });

       
      const legendY = pageHeight - 20;
      pdf.setFillColor(180, 210, 255);
      pdf.rect(20, legendY, 10, 5, "F");
      pdf.setFont("helvetica", "normal");
      pdf.text("Internship", 35, legendY + 4);

      pdf.setFillColor(200, 180, 255);
      pdf.rect(70, legendY, 10, 5, "F");
      pdf.text("PPO", 85, legendY + 4);

      pdf.setFillColor(180, 255, 200);
      pdf.rect(120, legendY, 10, 5, "F");
      pdf.text("Full-Time", 135, legendY + 4);

       
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        "Placement Calendar - Generated by the Placement Portal",
        105,
        pageHeight - 10,
        { align: "center" },
      );

       
      pdf.save(`Placement-Calendar-${monthYear}.pdf`);

       
      downloadToast.className =
        "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md z-50";
      downloadToast.textContent = "PDF downloaded!";

      setTimeout(() => {
        document.body.removeChild(downloadToast);
      }, 3000);
    } catch (err) {
      console.error("Error creating PDF:", err);

       
      const errorToast = document.createElement("div");
      errorToast.className =
        "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md z-50";
      errorToast.textContent = "Failed to create PDF";
      document.body.appendChild(errorToast);

      setTimeout(() => {
        document.body.removeChild(errorToast);
      }, 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const formatDate = (year, month, day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

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

    const onDateClick = (dayEvents) => {
      setSelectedDateEvents(dayEvents);
      setDatePopupVisible(true);
    };

     
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="sm:h-36 h-24 bg-gray-50 border border-gray-100 rounded-lg"
        ></div>,
      );
    }

     
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );
      const dayEvents = events[dateString] || [];
      const filteredEvents =
        filterType === "all"
          ? dayEvents
          : dayEvents.filter((event) => event.type === filterType);

      const isCurrentDay = isToday(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );

      days.push(
        <div
          key={day}
          className={`sm:h-36 h-24 border border-gray-100 bg-white rounded-lg shadow-sm sm:p-3 p-2 overflow-y-auto cursor-pointer transition-all duration-200 hover:shadow-md ${
            isCurrentDay
              ? "bg-gradient-to-br from-blue-50 to-blue-100 ring-2 ring-blue-300"
              : ""
          }`}
          onClick={() =>
            !isWideScreen && filteredEvents.length > 0
              ? onDateClick(filteredEvents)
              : null
          }
        >
          <div className="font-semibold text-gray-800 mb-1">{day}</div>
          {isCurrentDay && (
            <div className="text-xs font-medium text-custom-blue">Today</div>
          )}
          {isWideScreen
            ? filteredEvents.map((event, idx) => (
                <div
                  key={idx}
                  className={`sm:p-2 p-1 mb-1 rounded-lg text-xs cursor-pointer shadow-sm transition-all duration-150 hover:scale-105 ${
                    event.type === "Internship"
                      ? "bg-blue-200 text-blue-800 border border-blue-300"  
                      : event.type === "PPO"
                        ? "bg-purple-200 text-purple-800 border border-purple-300"  
                        : "bg-green-200 text-green-800 border border-green-300"  
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToJobPage(event._id);
                  }}
                >
                  <div className="font-semibold truncate">{event.company}</div>
                  <div className="sm:block hidden ">{event.type}</div>
                  <div className="sm:block hidden truncate">{event.role}</div>
                  <div className="sm:block hidden text-gray-600">
                    {event.time}
                  </div>
                </div>
              ))
            : filteredEvents.map((event, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full mb-1 ${
                    event.type === "Internship"
                      ? "bg-blue-200 text-blue-800 border border-blue-300"  
                      : event.type === "PPO"
                        ? "bg-green-200 text-green-800 border border-green-300"  
                        : "bg-blue-400 text-white border border-blue-600"  
                  }`}
                />
              ))}
        </div>,
      );
    }
    return days;
  };

  const getWeekEvents = () => {
     
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      const dateString = formatDate(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
      );
      weekDays.push({
        date: day,
        events: events[dateString] || [],
      });
    }
    return weekDays;
  };

  const renderWeekView = () => {
    const weekDays = getWeekEvents();

    return (
      <div className="flex flex-col space-y-4">
        {weekDays.map((dayData, idx) => {
          const day = dayData.date;
          const isCurrentDay = isToday(
            day.getFullYear(),
            day.getMonth(),
            day.getDate(),
          );
          const dayName = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ][day.getDay()];

          return (
            <div
              key={idx}
              className={`p-4 rounded-lg shadow-sm border ${isCurrentDay ? "bg-blue-50 border-blue-300" : "bg-white border-gray-100"}`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-800">
                  {dayName}, {day.getDate()}{" "}
                  {
                    [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ][day.getMonth()]
                  }
                </h3>
                {isCurrentDay && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                    Today
                  </span>
                )}
              </div>

              {dayData.events.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No events</p>
              ) : (
                <div className="space-y-2">
                  {dayData.events
                    .filter(
                      (event) =>
                        filterType === "all" || event.type === filterType,
                    )
                    .map((event, eventIdx) => (
                      <div
                        key={eventIdx}
                        className={`p-3 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-all duration-150 ${
                          event.type === "internship"
                            ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900"
                            : "bg-gradient-to-r from-green-100 to-green-200 text-green-900"
                        }`}
                        onClick={() => navigateToJobPage(event._id)}
                      >
                        <div className="font-semibold">{event.company}</div>
                        <div className="text-sm flex justify-between">
                          <span>{event.role}</span>
                          <span>{event.time}</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
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
    <div className="relative">
      <Card
        ref={calendarRef}
        className="max-w-6xl mx-auto shadow-xl rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 to-white"
      >
        <CardHeader className="bg-custom-blue text-white p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6" />
              <h2 className="text-2xl font-bold tracking-tight">
                {viewMode === "month"
                  ? `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                  : `Week of ${new Date(
                      new Date(currentDate).setDate(
                        currentDate.getDate() - currentDate.getDay(),
                      ),
                    ).getDate()} ${
                      monthNames[
                        new Date(
                          new Date(currentDate).setDate(
                            currentDate.getDate() - currentDate.getDay(),
                          ),
                        ).getMonth()
                      ]
                    }`}
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center bg-white rounded-full p-1 overflow-hidden shadow-md">
                <button
                  className={`rounded-full px-3 py-1 text-sm ${viewMode === "month" ? "bg-blue-600 text-white" : "text-custom-blue"}`}
                  onClick={() => setViewMode("month")}
                >
                  Month
                </button>
                <button
                  className={`rounded-full px-3 py-1 text-sm ${viewMode === "week" ? "bg-blue-600 text-white" : "text-custom-blue"}`}
                  onClick={() => setViewMode("week")}
                >
                  Week
                </button>
              </div>

              <select
                className="w-32 bg-white text-custom-blue rounded-full py-1 px-3 shadow-md border border-gray-200"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Events</option>
                <option value="Internship">Internships</option>
                <option value="Full-Time">Full-time</option>
                <option value="PPO">PPO</option>
              </select>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToToday}
                  className="bg-white text-custom-blue rounded-full shadow-md"
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateCalendar(-1)}
                  disabled={loading}
                  className="bg-white text-custom-blue rounded-full shadow-md"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateCalendar(1)}
                  disabled={loading}
                  className="bg-white text-custom-blue rounded-full shadow-md"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshCalendar}
                  className="bg-white text-custom-blue rounded-full shadow-md"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadCalendarEventsPDF}
                  disabled={loading || isDownloading}
                  className="bg-white text-custom-blue rounded-full shadow-md hover:bg-blue-50"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  {isWideScreen ? "Download Month's Calendar" : ""}
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block w-8 h-8 border-4 border-t-custom-blue border-r-custom-blue border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-500">Loading events...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
              <p className="font-medium">Error: {error}</p>
              <Button
                variant="outline"
                className="mt-2 border-red-300 text-red-600 hover:bg-red-50"
                onClick={refreshCalendar}
              >
                Try Again
              </Button>
            </div>
          )}

          {!loading && !error && viewMode === "month" && (
            <>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-semibold text-gray-700 p-2 bg-gray-100 rounded-lg"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>
              <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
            </>
          )}

          {!loading && !error && viewMode === "week" && renderWeekView()}
        </CardContent>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              {/* Internship */}
              <div className="w-4 h-4 rounded-full bg-blue-400 border border-blue-400"></div>
              <span className="text-sm text-gray-600">Internship</span>

              {/* PPO */}
              <div className="w-4 h-4 rounded-full bg-purple-200 border border-purple-400 ml-3"></div>
              <span className="text-sm text-gray-600">PPO</span>

              {/* Full-time */}
              <div className="w-4 h-4 rounded-full bg-green-400 border border-green-600 ml-3"></div>
              <span className="text-sm text-gray-600">Full-time</span>
            </div>

            {/* Download button in footer for better visibility on mobile */}
            <Button
              variant="outline"
              size="sm"
              onClick={downloadCalendarEventsPDF}
              disabled={loading || isDownloading}
              className="sm:hidden bg-custom-blue text-white rounded-full shadow-md hover:bg-blue-600 flex items-center gap-2"
            >
              <FileText className="h-4 w-4 mr-1" />
              Download Events PDF
            </Button>
          </div>
        </div>

        {/* Mobile Date Events Popup */}
        {isDatePopupVisible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            onClick={() => setDatePopupVisible(false)}
          >
            <div
              className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-xl transform transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Events on Selected Day
              </h3>
              {selectedDateEvents.length === 0 ? (
                <p className="text-gray-500 italic">No events for this day</p>
              ) : (
                selectedDateEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className={`p-3 mb-3 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all duration-150 ${
                      event.type === "internship"
                        ? "bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900"
                        : "bg-gradient-to-r from-green-200 to-green-300 text-green-900"
                    }`}
                    onClick={() => {
                      setDatePopupVisible(false);
                      navigateToJobPage(event._id);
                    }}
                  >
                    <div className="font-semibold truncate">
                      {event.company}
                    </div>
                    <div className="text-sm">{event.role}</div>
                    <div className="text-xs mt-1">{event.time}</div>
                  </div>
                ))
              )}
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
