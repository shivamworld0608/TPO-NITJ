import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronRight,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

/*     // Prevent multiple submissions
    if (isSubmitting) return; */
    console.log("hello",isSubmitting);
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/contactus/submit`,
        formData
      );

      toast.success("We will contact you soon!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission failed:", error);
      toast.error("Failed to submit. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 px-6 bg-gradient-to-b from-white via-blue-100 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-center">
            Contact <span className="text-custom-blue">Us</span>
          </h2>
          <p className="mt-4 text-gray-700 text-base sm:text-sm lg:text-lg">
            We would love to hear from you! Reach out to us through any of the
            channels below.
          </p>
        </div>
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-300"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Your Phone (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-2 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Designation
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm transition duration-300"
                required
              >
                <option value="">Select your designation</option>
                <option value="Student">Student</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Professor">Professor</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-700 text-sm font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-300"
                rows="5"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            <div className="flex justify-end items-center mt-6 space-x-4 sm:col-span-2">
              <button
                type="submit"
                className={`z-10 flex items-center justify-center gap-2 py-3 px-8 
    bg-gradient-to-r from-custom-blue to-blue-700 text-white font-semibold 
    rounded-full shadow-md hover:bg-gradient-to-l transition-all duration-300 
    focus:outline-none focus:ring-2 focus:ring-blue-400 
    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"} <FaChevronRight />
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ContactUs;
