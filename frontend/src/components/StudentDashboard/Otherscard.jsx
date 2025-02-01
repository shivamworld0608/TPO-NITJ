import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Otherscard(props) {
  const {
    company_name,
    others_date,
    others_round_name,
    others_time,
    others_info,
    others_link,
    was_shortlisted,
  } = props;

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="w-full max-w-lg mx-auto border border-custom-blue bg-white rounded-lg shadow-lg p-6 transition-all transform duration-300 hover:shadow-2xl hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {company_name}
        </h2>
        <div className="mt-4 space-y-4">
          <div className="text-sm text-gray-500 flex items-center">
            <span className="font-medium text-gray-800 mr-2">Round Name:</span>
            <span className="font-medium text-gray-500">
              {others_round_name || "na"}
            </span>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <span className="font-medium text-gray-800 mr-2">Date:</span>
            <span className="font-medium text-gray-500">
              {" "}
              {others_date
                ? new Date(others_date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Not Provided"}
            </span>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <span className="font-medium text-gray-800 mr-2">Time:</span>
            <span className="font-medium text-gray-500">{others_time}</span>
          </div>
          {others_link && (
            <div className="text-sm text-gray-500 flex items-center">
              <span className="font-medium text-gray-800 mr-2">
                Others Link:
              </span>
              <a
                href={others_link}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-custom-blue rounded-lg p-1 text-custom-blue hover:bg-custom-blue hover:text-white"
              >
                Start
              </a>
            </div>
          )}
          {was_shortlisted && (
            <div className="text-sm text-gray-500 flex items-center">
              {was_shortlisted}
            </div>
          )}
        </div>
        <button
          className="mt-6 w-full bg-custom-blue text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none"
          onClick={toggleModal}
        >
          Show Others Info
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={toggleModal}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Others Guidelines & Info
            </h3>
            <p className="text-gray-600">{others_info}</p>
          </div>
        </div>
      )}
    </div>
  );
}
