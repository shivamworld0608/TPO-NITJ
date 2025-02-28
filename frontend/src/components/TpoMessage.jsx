import React from "react";
import Header from "./header";
import { FaQuoteLeft } from "react-icons/fa";

const TpoMessage = () => {
  return (
    <>
      <div className="mt-24 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden shadow-2xl mt-20 mb-40">
          <div className="flex flex-col md:flex-row">
            {/* Left side with image and name */}
            <div className="md:w-1/3 relative group">
              <img
                src="/headPhoto2.png"
                alt="Director portrait"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-800 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-3xl font-semibold text-white mb-2 transform group-hover:translate-x-2 transition-transform duration-300">
                  Dr. Ajay Gupta
                </h2>
                <p className="text-lg text-gray-200">CTP Head, NIT Jalandhar</p>
              </div>
            </div>

            {/* Right side with message */}
            <div className="md:w-2/3 p-8 flex flex-col justify-between bg-gradient-to-t from-gray-100 via-gray-50 to-white">
              {/* Quote icon */}
              <div className="text-gray-500 text-6xl mb-6 transform animate__animated animate__fadeIn animate__delay-1s">
                <FaQuoteLeft />
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                  <span className="text-blue-600">Message </span>from the Head
                </h3>

                <div className="space-y-4 text-gray-700">
                  <p>
                    It gives me great pride and joy to share this message on behalf of our institution. In these dynamic and evolving times, the unwavering support and strength of our alumni community stand as a true testament to the values and legacy of our college, guiding us toward continued growth and excellence.
                  </p>

                  <p>
                    From the bottom of my heart, thank you for being such a vital, vibrant part of our community. Together, hand in hand, we will continue to build upon the legacy of excellence that defines our university and illuminates the path for future generations.
                  </p>
                </div>

                <div className="pt-6">
                  <p className="text-gray-800 font-medium text-lg">
                    With warmest regards and deepest gratitude,
                  </p>
                  <p className="text-gray-800 font-semibold text-xl mt-2">
                    Dr. Ajay Gupta
                  </p>
                  <p className="text-gray-600 text-lg">CTP Head, NIT Jalandhar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default TpoMessage;
