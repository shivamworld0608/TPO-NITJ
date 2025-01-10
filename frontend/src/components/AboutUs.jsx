import React from "react";
import { FaRocket, FaEye, FaHandshake } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-5xl">
            About Us
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base lg:text-lg">
            We are passionate about creating cutting-edge solutions to empower
            businesses and individuals. Our goal is to transform ideas into
            impactful realities.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Mission */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center mb-4 text-blue-500">
              <FaRocket className="text-4xl sm:text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-2 sm:text-2xl">
              Our Mission
            </h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
              To deliver innovative solutions that drive growth, sustainability,
              and positive change for businesses worldwide.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center mb-4 text-green-500">
              <FaEye className="text-4xl sm:text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-2 sm:text-2xl">
              Our Vision
            </h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
              To be a global leader in providing technology solutions that make
              a lasting impact across industries.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center mb-4 text-yellow-500">
              <FaHandshake className="text-4xl sm:text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-2 sm:text-2xl">
              Our Values
            </h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
              We value integrity, innovation, and excellence in every aspect of
              our work, ensuring client satisfaction and long-term success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
