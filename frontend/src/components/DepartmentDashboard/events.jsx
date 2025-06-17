import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Select from "react-select";

// Department options same as DepartmentManager with ALL option
const departmentOptions = [
  {
    label: "ALL",
    options: [{ value: "ALL", label: "ALL" }],
  },
  {
    label: "BIO TECHNOLOGY",
    options: [{ value: "BIO TECHNOLOGY", label: "BIO TECHNOLOGY" }],
  },
  {
    label: "CHEMICAL ENGINEERING",
    options: [{ value: "CHEMICAL ENGINEERING", label: "CHEMICAL ENGINEERING" }],
  },
  {
    label: "CIVIL ENGINEERING",
    options: [
      { value: "CIVIL ENGINEERING", label: "CIVIL ENGINEERING" },
      { value: "STRUCTURAL AND CONSTRUCTION ENGINEERING", label: "STRUCTURAL AND CONSTRUCTION ENGINEERING" },
      { value: "GEOTECHNICAL AND GEO-ENVIRONMENTAL ENGINEERING", label: "GEOTECHNICAL AND GEO-ENVIRONMENTAL ENGINEERING" },
    ],
  },
  {
    label: "COMPUTER SCIENCE AND ENGINEERING",
    options: [
      { value: "COMPUTER SCIENCE AND ENGINEERING", label: "COMPUTER SCIENCE AND ENGINEERING" },
      { value: "DATA SCIENCE AND ENGINEERING", label: "DATA SCIENCE AND ENGINEERING" },
      { value: "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)", label: "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)" },
    ],
  },
  {
    label: "ELECTRICAL ENGINEERING",
    options: [
      { value: "ELECTRICAL ENGINEERING", label: "ELECTRICAL ENGINEERING" },
      { value: "ELECTRIC VEHICLE DESIGN", label: "ELECTRIC VEHICLE DESIGN" },
    ],
  },
  {
    label: "ELECTRONICS AND COMMUNICATION ENGINEERING",
    options: [
      { value: "ELECTRONICS AND COMMUNICATION ENGINEERING", label: "ELECTRONICS AND COMMUNICATION ENGINEERING" },
      { value: "ELECTRONICS AND VLSI ENGINEERING", label: "ELECTRONICS AND VLSI ENGINEERING" },
      { value: "SIGNAL PROCESSING AND MACHINE LEARNING", label: "SIGNAL PROCESSING AND MACHINE LEARNING" },
      { value: "VLSI DESIGN", label: "VLSI DESIGN" },
    ],
  },
  {
    label: "INDUSTRIAL AND PRODUCTION ENGINEERING",
    options: [
      { value: "INDUSTRIAL AND PRODUCTION ENGINEERING", label: "INDUSTRIAL AND PRODUCTION ENGINEERING" },
      { value: "INDUSTRIAL ENGINEERING AND DATA ANALYTICS", label: "INDUSTRIAL ENGINEERING AND DATA ANALYTICS" },
    ],
  },
  {
    label: "INFORMATION TECHNOLOGY",
    options: [
      { value: "INFORMATION TECHNOLOGY", label: "INFORMATION TECHNOLOGY" },
      { value: "DATA ANALYTICS", label: "DATA ANALYTICS" },
    ],
  },
  {
    label: "INSTRUMENTATION AND CONTROL ENGINEERING",
    options: [
      { value: "INSTRUMENTATION AND CONTROL ENGINEERING", label: "INSTRUMENTATION AND CONTROL ENGINEERING" },
      { value: "CONTROL AND INSTRUMENTATION ENGINEERING", label: "CONTROL AND INSTRUMENTATION ENGINEERING" },
      { value: "MACHINE INTELLIGENCE AND AUTOMATION", label: "MACHINE INTELLIGENCE AND AUTOMATION" },
    ],
  },
  {
    label: "MATHEMATICS AND COMPUTING",
    options: [{ value: "MATHEMATICS AND COMPUTING", label: "MATHEMATICS AND COMPUTING" }],
  },
  {
    label: "MECHANICAL ENGINEERING",
    options: [
      { value: "MECHANICAL ENGINEERING", label: "MECHANICAL ENGINEERING" },
      { value: "DESIGN ENGINEERING", label: "DESIGN ENGINEERING" },
      { value: "THERMAL AND ENERGY ENGINEERING", label: "THERMAL AND ENERGY ENGINEERING" },
    ],
  },
  {
    label: "TEXTILE TECHNOLOGY",
    options: [
      { value: "TEXTILE TECHNOLOGY", label: "TEXTILE TECHNOLOGY" },
      { value: "TEXTILE ENGINEERING AND MANAGEMENT", label: "TEXTILE ENGINEERING AND MANAGEMENT" },
    ],
  },
  {
    label: "RENEWABLE ENERGY",
    options: [{ value: "RENEWABLE ENERGY", label: "RENEWABLE ENERGY" }],
  },
  {
    label: "ARTIFICIAL INTELLIGENCE",
    options: [{ value: "ARTIFICIAL INTELLIGENCE", label: "ARTIFICIAL INTELLIGENCE" }],
  },
  {
    label: "POWER SYSTEMS AND RELIABILITY",
    options: [{ value: "POWER SYSTEMS AND RELIABILITY", label: "POWER SYSTEMS AND RELIABILITY" }],
  },
  {
    label: "HUMANITIES AND MANAGEMENT",
    options: [{ value: "HUMANITIES AND MANAGEMENT", label: "HUMANITIES AND MANAGEMENT" }],
  },
  {
    label: "CHEMISTRY",
    options: [{ value: "CHEMISTRY", label: "CHEMISTRY" }],
  },
  {
    label: "MATHEMATICS",
    options: [{ value: "MATHEMATICS", label: "MATHEMATICS" }],
  },
  {
    label: "PHYSICS",
    options: [{ value: "PHYSICS", label: "PHYSICS" }],
  },
];

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    timing: "",
    speaker: "",
    department: ["ALL"],
    link: "",
    venue:"",
    image: null, // Changed to null for file input
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });
  const [showForm, setShowForm] = useState(false); // New state for form visibility

  // Fetch Events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/events`, {
        withCredentials: true,
      });
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      showToast("Failed to fetch events. Try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle Department Change
  const handleDepartmentChange = (selectedOptions) => {
    setForm({
      ...form,
      department: selectedOptions ? selectedOptions.map((option) => option.value) : ["ALL"],
    });
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({
        ...prev,
        image: files[0] || null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Validate Form
  const validateForm = () => {
    const requiredFields = ["title", "description", "date", "timing", "speaker", "department"];
    return requiredFields.every((field) =>
      field === "department" ? form[field].length > 0 : form[field].toString().trim() !== ""
    );
  };

  // Show Toast
  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "info" }), 3000);
  };

  // Reset Form
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      date: "",
      timing: "",
      speaker: "",
      department: ["ALL"],
      link: "",
      venue: "",
      image: null,
    });
    setEditingId(null);
    setShowForm(false);
  };

  // Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Please fill out all required fields!", "error");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("date", form.date);
    formData.append("timing", form.timing);
    formData.append("speaker", form.speaker);
    formData.append("department", JSON.stringify(form.department));
    formData.append("link", form.link);
    formData.append("venue", form.venue);
    if (form.image) {
      console.log("File to be uploaded:", form.image);
      formData.append("image", form.image);
    }
  //  for (let [key, value] of formData.entries()) {
  //   console.log(`FormData ${key}:`, value instanceof File ? value.name : value);
  // }
    try {
      if (editingId) {
        await axios.put(`${import.meta.env.REACT_APP_BASE_URL}/events/${editingId}`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Event updated successfully!", "success");
      } else {
        await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/events`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Event created successfully!", "success");
      }
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error("Error submitting event:", error);
      showToast(error.response?.data?.message || "Failed to save event. Try again!", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${import.meta.env.REACT_APP_BASE_URL}/events/${id}`, {
        withCredentials: true,
      });
      showToast("Event deleted successfully!", "success");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      showToast("Failed to delete event. Try again!", "error");
    }
  };

  // Edit
  const handleEdit = (event) => {
    setForm({
      title: event.title || "",
      description: event.description || "",
      date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
      timing: event.timing || "",
      speaker: event.speaker || "",
      department: event.department || ["ALL"],
      link: event.link || "",
      venue: event.venue || "",
      image: null, // Reset image for editing
    });
    setEditingId(event._id);
    setShowForm(true);
  };

  // Toggle Form
  const toggleForm = () => {
    setShowForm(true);
    setForm({
    title: "",
    description: "",
    date: "",
    timing: "",
    speaker: "",
    department: ["ALL"],
    link: "",
    venue: "",
    image: null,
  });
  setEditingId(null);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg animate-fade-in-out z-[1000] ${
            toast.type === "error"
              ? "bg-white border border-red-500 text-red-500"
              : toast.type === "success"
              ? "bg-white border border-green-500 text-green-500"
              : "bg-white border border-custom-blue text-custom-blue"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header and Create Button */}
    {!showForm && ( <> <div className="flex justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold flex items-center space-x-3 text-gray-900">
          <span>Event <span className="text-custom-blue">& Workshops</span></span>
        </h2>
        <button
          onClick={toggleForm}
          className="flex items-center space-x-2 px-4 py-2 bg-custom-blue text-white rounded-lg shadow-md hover:bg-custom-blue transition duration-300"
        >
          <FaPlus />
          <span>Create Event</span>
        </button>
      </div>
       {/* Event List */}
    <div className="space-y-6 animate-fade-in">
  {loading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ) : events.length === 0 ? (
    <div className="text-center py-16 bg-gray-50 rounded-2xl">
      <div className="text-gray-400 text-6xl mb-4">📅</div>
      <p className="text-gray-700 text-xl font-semibold">No events found</p>
      <p className="text-gray-500 text-base mt-2">Create your first event to get started</p>
    </div>
  ) : (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {events.map((event) => (
        <div
          key={event._id}
          className="group bg-white rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          {/* Image Section */}
          <div className="relative w-full h-56 overflow-hidden">
            {event.image ? (
              <img
                src={`${import.meta.env.REACT_APP_BASE_URL}${event.image}`}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl text-blue-300 mb-3">🎪</div>
                  <span className="text-blue-500 font-semibold text-sm">No Image Available</span>
                </div>
              </div>
            )}
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {event.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {event.description}
            </p>

            {/* Event Details Grid */}
            <div className="space-y-3 mb-6">
              {/* Date & Time Row */}
              <div className="flex items-center justify-between text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  {/* <div className="w-2 h-2 bg-blue-400 rounded-full"></div> */}
                  <span className="font-medium">
                   📅 {new Date(event.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <span className="text-gray-500 font-medium">⏰ {event.timing}</span>
              </div>

              {/* Venue Row */}
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                {/* <div className="w-2 h-2 bg-green-400 rounded-full"></div> */}
                <span className="font-medium">📍</span>
                <span className="text-gray-500 truncate">{event.venue || 'TBD'}</span>
              </div>

              {/* Speaker Row */}
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                {/* <div className="w-2 h-2 bg-purple-400 rounded-full"></div> */}
                <span className="font-medium">Speaker:</span>
                <span className="text-gray-500 truncate">{event.speaker}</span>
              </div>

              {/* Department Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {event.department.map((dept, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full border border-blue-200 hover:bg-blue-200 transition-colors duration-200"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleEdit(event)}
                className="flex-1 flex items-center justify-center space-x-2 text-sm font-semibold text-blue-600 hover:text-white hover:bg-blue-500 px-4 py-2.5 rounded-lg border border-blue-200 hover:border-blue-500 transition-all duration-200"
              >
                <FaEdit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="flex-1 flex items-center justify-center space-x-2 text-sm font-semibold text-red-600 hover:text-white hover:bg-red-500 px-4 py-2.5 rounded-lg border border-red-200 hover:border-red-500 transition-all duration-200"
              >
                <FaTrash className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div></> )}

      {/* Form */}
      {showForm && (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 border border-gray-200 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              {editingId ? "Edit" : "Create"} <span className="text-custom-blue">Event</span>
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-600 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-custom-blue focus:border-custom-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Speaker <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="speaker"
                  value={form.speaker}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-custom-blue focus:border-custom-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-custom-blue focus:border-custom-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Timing <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="timing"
                  value={form.timing}
                  onChange={handleChange}
                  placeholder="e.g., 10:00 AM - 12:00 PM"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-custom-blue focus:border-custom-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Department Allowed <span className="text-red-500">*</span>
                </label>
                <Select
                  options={departmentOptions}
                  isMulti
                  onChange={handleDepartmentChange}
                  value={departmentOptions
                    .flatMap((group) => group.options)
                    .filter((option) => form.department.includes(option.value))}
                  className="mt-1 block w-full border-2 p-1.5 border-gray-200 rounded-xl focus:outline-none focus:border-custom-blue focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Event Link</label>
                <input
                  type="url"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-custom-blue focus:border-custom-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-custom-blue focus:border-custom-blue"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-custom-blue focus:border-custom-blue"
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-3 rounded-md transition duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-custom-blue text-white hover:bg-blue-dark"
              }`}
            >
              {isSubmitting ? "Submitting..." : editingId ? "Update Event" : "Create Event"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventManager;