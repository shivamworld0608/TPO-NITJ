import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-5xl">
            Contact Us
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base lg:text-lg">
            We’d love to hear from you! Reach out to us through any of the
            channels below.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Phone */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center mb-4 text-blue-500">
              <FaPhoneAlt className="text-4xl sm:text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 sm:text-2xl">
              Call Us
            </h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            +91-0181-5037855, 2690301, 2690453, 3082000
            </p>
          </div>

          {/* Email */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center mb-4 text-green-500">
              <FaEnvelope className="text-4xl sm:text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 sm:text-2xl">
              Email Us
            </h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            ctp@nitj.ac.in
            </p>
          </div>

          {/* Address */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center mb-4 text-yellow-500">
              <FaMapMarkerAlt className="text-4xl sm:text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 sm:text-2xl">
              Visit Us
            </h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            G.T Road, Amritsar Bypass, Jalandhar, Punjab, India-144008
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 sm:p-8 lg:p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 sm:text-3xl">
            Send Us a Message
          </h3>
          <form className="grid gap-4">
            <div>
              <label className="block text-gray-700 text-sm sm:text-base">
                Your Name
              </label>
              <input
                type="text"
                className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm sm:text-base">
                Your Email
              </label>
              <input
                type="email"
                className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm sm:text-base">
                Message
              </label>
              <textarea
                className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows="4"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
