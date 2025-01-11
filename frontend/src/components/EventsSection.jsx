import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faFilter,
  faRoadBarrier,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";

function EventsSection() {
  const scrollRefEvents = useRef(null);
  const scrollRefAnnouncements = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("all");
  const [isFilter, setIsFilter] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false)
  function scrollLeft(ref) {
    const scrollElement = ref.current;
    if (scrollElement) {
      scrollElement.scrollBy({
        left: 50,
        behavior: "smooth",
      });
    }
  }
  function scrollRight(ref) {
    const scrollElement = ref.current;
    if (scrollElement) {
      scrollElement.scrollBy({
        left: -50,
        behavior: "smooth",
      });
    }
  }
  const eventList = [
    {
      id: 1,
      title: "Tech Conference 2025",
      date: new Date(2025, 10, 5),
      location: "Online",
      description: "Join the largest tech conference of the year!",
      category: "Conference",
      image: "https://nitj.ac.in/files/1736402875155-6-11.jpg",
    },
    {
      id: 2,
      title: "Tech Conference 2025",
      date: new Date(2024, 11, 1),
      location: "Online",
      description: "Join the largest tech conference of the year!",
      category: "Conference",
      image: "https://nitj.ac.in/files/1736402875155-6-11.jpg",
    },
    {
      id: 3,
      title: "Tech Conference 2025",
      date: new Date(2024, 12, 25),
      location: "Online",
      description: "Join the largest tech conference of the year!",
      category: "Conference",
      image: "https://nitj.ac.in/files/1736402875155-6-11.jpg",
    },
    {
      id: 4,
      title: "Tech Conference 2025",
      date: new Date(2024, 12, 25),
      location: "Online",
      description: "Join the largest tech conference of the year!",
      category: "Conference",
      image: "https://nitj.ac.in/files/1736402875155-6-11.jpg",
    },
    {
      id: 5,
      title: "Tech Conference 2025",
      date: new Date(2024, 12, 25),
      location: "Online",
      description: "Join the largest tech conference of the year!",
      category: "Conference",
      image: "https://nitj.ac.in/files/1736402875155-6-11.jpg",
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Web Development Workshop",
      date: new Date(2024, 12, 25),
      time: "10:00 AM - 4:00 PM",
      location: "Auditorium, NITJ",
      description:
        "Hands-on workshop on modern web development practices using React and Tailwind CSS.",
      category: "Workshop",
    },
    {
      id: 2,
      title: "Placement Drive: Infosys",
      date: new Date(2024, 12, 25),
      time: "9:00 AM",
      location: "Placement Hall, NITJ",
      description:
        "Infosys is conducting a placement drive for final-year students. Registration is mandatory.",
      category: "Placement Drive",
    },
    {
      id: 3,
      title: "AI/ML Bootcamp",
      date: new Date(2024, 12, 25),
      time: "9:00 AM - 5:00 PM",
      location: "Online (Zoom)",
      description:
        "A 3-day bootcamp focused on building projects using AI/ML frameworks like TensorFlow and PyTorch.",
      category: "Bootcamp",
    },
    {
      id: 4,
      title: "Alumni Talk Series",
      date: new Date(2024, 12, 25),
      time: "5:00 PM",
      location: "Seminar Hall, NITJ",
      description:
        "Hear inspiring stories from successful NITJ alumni and their career journeys.",
      category: "Talk",
    },
    {
      id: 5,
      title: "Cultural Fest: NITJ Beats 2025",
      date: new Date(2024, 12, 25),
      time: "All Day",
      location: "NITJ Campus",
      description:
        "Join us for the annual cultural fest featuring music, dance, and drama performances.",
      category: "Cultural Event",
    },
    {
      id: 6,
      title: "GATE Preparation Seminar",
      date: new Date(2024, 12, 25),
      time: "11:00 AM - 1:00 PM",
      location: "Lecture Hall 2, NITJ",
      description: "Expert guidance and tips for cracking the GATE exam.",
      category: "Seminar",
    },
    {
      id: 7,
      title: "Hackathon: CodeSprint 2025",
      date: new Date(2024, 12, 25),
      time: "24 Hours",
      location: "Computer Lab, NITJ",
      description:
        "A 24-hour hackathon for coding enthusiasts. Form teams and solve real-world problems.",
      category: "Hackathon",
    },
    {
      id: 8,
      title: "Yoga for Mental Wellness",
      date: new Date(2024, 12, 25),
      time: "6:00 AM - 7:30 AM",
      location: "Sports Ground, NITJ",
      description:
        "A morning yoga session to promote mental and physical well-being.",
      category: "Wellness",
    },
  ];

  const isEventDate = (date) =>
    eventList.some(
      (event) => date.toDateString() === event.date.toDateString()
    );

  const filterEvents =
    filter === "all"
      ? eventList
      : eventList.filter(
          (event) => event.date.toDateString() === selectedDate.toDateString()
        );

  const filterAnnouncements = filter === "all"?announcements
  : announcements.filter(
      (event) => event.date.toDateString() === selectedDate.toDateString()
    );
  return (
    <>
      <div className="container sm:p-16 p-5">
        <div className="w-fit p-3 text-4xl font-bold mb-5 text-center m-auto">
          <span>Events & </span>
          <span className="text-sky-700">Announcements</span>
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={() => setIsFilter(!isFilter)} className="flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faFilter} className="w-6 h-6" /><span className="text-xl font-semibold">Filter</span>
          </button>

          {isFilter && (
            <div className="flex flex-row w-fit gap-3">
              <div>
                <input
                  type="radio"
                  id="allEvents"
                  name="eventFilter"
                  onChange={() => {setFilter("all");setShowCalendar(false);}}
                  checked={filter === "all"}
                />
                <label htmlFor="allEvents"> All Events</label>
              </div>
              <div className="relative">
                <button onClick={() => {setFilter("date"); setShowCalendar(!showCalendar);}}><FontAwesomeIcon icon={faCalendar} /></button>
                <div className={`absolute -ml-48 z-10 bg-white p-4 shadow rounded transition-all duration-500 ${showCalendar?"scale-100 opacity-100":"scale-0 opacity-0"}`}>
                  <h2 className="text-lg font-bold mb-4">Calendar</h2>
                  <Calendar
                    value={selectedDate}
                    onChange={(date)=>{setSelectedDate(date); setShowCalendar(false)}}
                    tileContent={({ date, view }) =>
                      view === "month" && isEventDate(date) ? (
                        <div className="flex justify-center items-center">
                          <span className="bg-blue-700 text-white rounded-full px-2 py-1 text-xs">
                            Event
                          </span>
                        </div>
                      ) : null
                    }
                    className="react-calendar"
                  />
                  <div className="text-red-700 font-semibold">Select Date to see Events</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="events grid sm:grid-cols-2 grid-cols-1 gap-12 items-center justify-center ">
          <div className="flex flex-col gap-5">
            <div className="p-5 relative">
              <button
                className="absolute right-0 top-1/2 z-0"
                onClick={() => scrollLeft(scrollRefEvents)}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <button
                className="absolute left-0 top-1/2 z-0"
                onClick={() => scrollRight(scrollRefEvents)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <div
                className={`scroll w-full flex flex-row items-center ${
                  filterEvents.length == 0 ? "justify-center" : ""
                } gap-5 overflow-x-scroll scrollbar-hide p-5 `}
                ref={scrollRefEvents}
              >
                {filterEvents.length > 0 ? (
                  filterEvents.map(
                    ({
                      id,
                      title,
                      date,
                      location,
                      description,
                      category,
                      image,
                    }) => (
                      <div
                        key={id}
                        className="flex-shrink-0 lg:w-3/4 w-full flex flex-col gap-3 bg-white shadow-lg shadow-sky-700 rounded-lg "
                      >
                        <div
                          className="w-full h-60 rounded-lg"
                          style={{
                            backgroundImage: `url(${image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                        <div className="flex flex-col gap-2 p-2">
                          <div className="text-lg font-bold">{title}</div>
                          <div className="text-lg">
                            Mode/Location: {location}
                          </div>
                          <div className="text-base">"{description}"</div>
                          <div className="text-base">
                            Date:{" "}
                            {date.getDate() +
                              "/" +
                              (date.getMonth() + 1) +
                              "/" +
                              date.getFullYear()}
                          </div>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <FontAwesomeIcon
                      icon={faRoadBarrier}
                      className="text-red-600 w-10 h-10"
                    />
                    <div className="text-3xl font-semibold text-center text-gray-700">
                      No Events on selected Date
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative border-dotted border-sky-700 border-2 rounded-2xl p-5 h-fit flex flex-col gap-5">
            <div className="font-semibold text-lg underline text-sky-700">
              Upcoming Events/Announcements
            </div>
            <button
                className="absolute right-1 top-1/2 z-0"
                onClick={() => scrollLeft(scrollRefAnnouncements)}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <button
                className="absolute left-1 top-1/2 z-0"
                onClick={() => scrollRight(scrollRefAnnouncements)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            <div
              className="flex overflow-scroll scrollbar-hide gap-2 h-80 items-center p-5"
              ref={scrollRefAnnouncements}
            >
              {filterAnnouncements.length > 0? filterAnnouncements.map(
                ({ id, title, date, location, description, category }) => (
                  <div
                    key={id}
                    className="flex-shrink-0 lg:w-3/4 w-full h-full flex flex-col gap-3 bg-white shadow-lg shadow-sky-700 rounded-lg "
                  >
                    <div className="flex flex-col gap-2 p-2">
                      <div className="text-lg font-bold">{title}</div>
                      <div className="text-lg">Mode/Location: {location}</div>
                      <div className="text-base">"{description}"</div>
                      <div className="text-base">
                        Date:{" "}
                        {date.getDate() +
                          "/" +
                          (date.getMonth() + 1) +
                          "/" +
                          date.getFullYear()}
                      </div>
                    </div>
                  </div>
                )
              ):(
                <div className="flex flex-col items-center justify-center">
                  <FontAwesomeIcon
                    icon={faRoadBarrier}
                    className="text-red-600 w-10 h-10"
                  />
                  <div className="text-3xl font-semibold text-center text-gray-700">
                    No Announcements for selected Date
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <style>
          {`
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none; 
        scrollbar-width: none; 
      }
        
    `}
        </style>
      </div>
    </>
  );
}

export default EventsSection;
