import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const TpoMessage = () => {
  return (
    <>
      <div className="flex flex-col justify-center align-center p-4">
          <div className="max-w-7xl w-full mx-auto">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-full relative group overflow-hidden rounded-full">
                <img
                  src="/headPhoto2.png"
                  alt="Director portrait"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
              <div className="md:w-2/3 p-8 flex flex-col justify-between">
                <div className="text-gray-500 text-6xl mb-6 transform animate__animated animate__fadeIn animate__delay-1s">
                  <FaQuoteLeft />
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold text-gray-800 hover:text-custom-blue transition-colors duration-300">
                    <span className="text-custom-blue">Message </span>from the Head
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
          <div className="max-w-7xl w-full mx-auto">
            <div className="flex flex-col-reverse md:flex-row">
              <div className="md:w-2/3 p-8 flex flex-col justify-between">
                <div className="text-gray-500 text-6xl mb-6 transform animate__animated animate__fadeIn animate__delay-1s">
                  <FaQuoteLeft />
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold text-gray-800 hover:text-custom-blue transition-colors duration-300">
                    <span className="text-custom-blue">Message </span>from the Head
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
              <div className="md:w-1/3 h-full relative group overflow-hidden rounded-full">
                <img
                  src="/headPhoto2.png"
                  alt="Director portrait"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default TpoMessage;
