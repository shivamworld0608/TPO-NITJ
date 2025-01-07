import React from "react";
import Header from "./header";
import Footer from "./footer";

const TpoMessage = () => {
  return (
    <>
      <div className="mt-72 top-20">
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg overflow-hidden shadow-lg mt-20 mb-40">
          <div className="flex flex-col md:flex-row">
            {/* Left side with image and name */}
            <div className="md:w-1/3 relative bg-gray-900 text-white">
              <img
                src="src/assets/tpo.jpg"
                alt="Director portrait"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 to-transparent">
                <h2 className="text-2xl font-bold">Dr. Ajay Gupta</h2>
                <p className="text-gray-300">CTP Head, NIT Jalandhar</p>
              </div>
            </div>

            {/* Right side with message */}
            <div className="md:w-2/3 p-8 flex flex-col justify-between">
              {/* Quote icon */}
              <div className="text-gray-300 text-6xl mb-4">"</div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800">
                  <span className="text-custom-blue font-semibold">Message </span>from Head,
                </h3>

                <div className="space-y-4 text-gray-600">
                  <p>
                  It gives me great pride and joy to share this message on behalf of our institution. In these dynamic and evolving times, the unwavering support and strength of our alumni community stand as a true testament to the values and legacy of our college, guiding us toward continued growth and excellence.
                  </p>

                  <p>
                    From the bottom of my heart, thank you for being such a vital,
                    vibrant part of our community. Together, hand in hand, we will
                    continue to build upon the legacy of excellence that defines
                    our university and illuminates the path for future
                    generations.
                  </p>
                </div>

                <div className="pt-6">
                  <p className="text-gray-800 font-medium">
                    With warmest regards and deepest gratitude,
                  </p>
                  <p className="text-gray-800 font-bold">
                    Dr. Ajay Gupta
                  </p>
                  <p className="text-gray-600">CTP Head, NIT Jalandhar</p>
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
