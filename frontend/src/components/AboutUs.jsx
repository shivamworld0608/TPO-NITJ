import React from "react";
import { FaRocket, FaEye, FaHandshake, FaChalkboardTeacher, FaUsers } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-t from-white via-blue-200 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            About <span className="text-custom-blue">Us</span>
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-sm lg:text-lg">
            The Training and Placement Office (TPO) at our institute is dedicated to providing students with 
            the skills, resources, and opportunities to successfully enter the professional world. Our team works 
            tirelessly to build strong connections with industry leaders and guide students towards fulfilling career paths.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Mission */}
          <div className="bg-white border shadow-md p-8 hover:shadow-lg hover:scale-105 transform hover:shadow-gray-500/50 hover:ring-4 hover:ring-gray-300 transition-all duration-300">
            <div className="flex items-center justify-center mb-6 text-gray-600">
              <FaRocket className="text-5xl sm:text-6xl hover:text-gray-500 transition-all duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-3 sm:text-3xl">
              Our Mission
            </h3>
            <p className="text-gray-600 text-base sm:text-md lg:text-md">
              To bridge the gap between academia and industry by providing our students with the resources 
              to excel in professional environments. We aim to create a nurturing ecosystem for career growth, 
              skill development, and successful placements.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white border shadow-md p-8 hover:shadow-lg hover:scale-105 transform hover:shadow-green-500/50 hover:ring-4 hover:ring-green-300 transition-all duration-300">
            <div className="flex items-center justify-center mb-6 text-green-600">
              <FaEye className="text-5xl sm:text-6xl hover:text-green-400 transition-all duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-3 sm:text-3xl">
              Our Vision
            </h3>
            <p className="text-gray-600 text-base sm:text-md lg:text-md">
              To be the leading catalyst for student placements, known for our strong collaborations with top companies 
              and our commitment to creating a sustainable career ecosystem that empowers students to thrive in any industry.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white border shadow-md p-8 hover:shadow-lg hover:scale-105 transform hover:shadow-amber-400/50 hover:ring-4 hover:ring-amber-300 transition-all duration-300">
            <div className="flex items-center justify-center mb-6 text-amber-600">
              <FaHandshake className="text-5xl sm:text-6xl hover:text-amber-400 transition-all duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-3 sm:text-3xl">
              Our Values
            </h3>
            <p className="text-gray-600 text-base sm:text-md lg:text-md">
              We believe in fostering a culture of integrity, excellence, and collaboration. Our values emphasize 
              the importance of personal and professional growth, ensuring that every student is equipped with 
              the necessary skills to succeed in the global workforce.
            </p>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-2">
          {/* Guidance */}
          <div className="bg-white border shadow-md p-8 hover:shadow-lg hover:scale-105 transform hover:shadow-blue-500/50 hover:ring-4 hover:ring-blue-300 transition-all duration-300">
            <div className="flex items-center justify-center mb-6 text-blue-600">
              <FaChalkboardTeacher className="text-5xl sm:text-6xl hover:text-blue-400 transition-all duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-3 sm:text-3xl">
              Our Guidance
            </h3>
            <p className="text-gray-600 text-base sm:text-md lg:text-md">
              The TPO provides continuous support, helping students with career counseling, resume building, interview preparation, 
              and networking opportunities. We guide students through the entire recruitment process, ensuring they are prepared 
              for the competitive job market.
            </p>
          </div>

          {/* Collaboration */}
          <div className="bg-white border shadow-md p-8 hover:shadow-lg hover:scale-105 transform hover:shadow-teal-500/50 hover:ring-4 hover:ring-teal-300 transition-all duration-300">
            <div className="flex items-center justify-center mb-6 text-teal-600">
              <FaUsers className="text-5xl sm:text-6xl hover:text-teal-400 transition-all duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-3 sm:text-3xl">
              Our Collaborations
            </h3>
            <p className="text-gray-600 text-base sm:text-md lg:text-md">
              We have established strong partnerships with top-tier companies and industry leaders across diverse sectors. 
              These collaborations open up a world of opportunities for our students, from internships to full-time job placements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
