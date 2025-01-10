import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Display success toast
    toast.success("Your message has been sent successfully!");
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      message: "",
    });
  };

  return (
    <section className="py-12 px-6 bg-gradient-to-b from-white via-blue-100 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-center">
            Contact <span className="text-custom-blue">Us</span>
          </h2>
          <p className="mt-4 text-gray-700 text-base sm:text-lg lg:text-xl">
            We would love to hear from you! Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Contact options (Phone, Email, Address) */}
          {/* Code omitted for brevity */}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 sm:p-12">
          <h3 className="text-3xl text-center font-bold mb-6 sm:text-4xl">
            Send Us <span className="text-custom-blue">Message</span>
          </h3>
          <form className="grid gap-6 sm:grid-cols-2" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 text-sm font-medium">Your Name</label>
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
              <label className="block text-gray-700 text-sm font-medium">Your Email</label>
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
              <label className="block text-gray-700 text-sm font-medium">Your Phone (Optional)</label>
              <input
        type="number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full mt-2 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        placeholder="Enter your phone number"
        required
      />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm transition duration-300"
                required
              >
                <option value="">Select your department</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EE">EE</option>
                <option value="ICE">ICE</option>
                <option value="ME">ME</option>
                <option value="IPE">IPE</option>
                <option value="TT">TT</option>
                <option value="BT">BT</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-700 text-sm font-medium">Message</label>
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
                type="reset"
                onClick={() => setFormData({ name: "", email: "", phone: "", department: "", message: "" })}
                className="py-3 px-8 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-full shadow-md hover:bg-gradient-to-l transition-all duration-300 focus:outline-none focus:ring-red-200 "
              >
                Clear
              </button>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 py-3 px-8 bg-gradient-to-r from-custom-blue to-blue-700 text-white font-semibold rounded-full shadow-md hover:bg-gradient-to-l transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Submit <FaChevronRight />
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
