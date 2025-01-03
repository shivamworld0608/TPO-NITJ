import React from "react";
import Oadetails from "./Oadetails";
import { FaArrowLeft } from "react-icons/fa"; // Import arrow icon from react-icons

export default function Oacard(props) {
    const {
        job_id,
        test_date,
        company_name,
        result_date,
        isVisible,
        onShowDetails,
        onHideDetails,
    } = props;

    return (
        <div className="container mx-auto px-4 py-6">
            {isVisible ? (
                <div className="relative bg-white rounded-lg shadow-xl p-6 transition-all transform duration-300 hover:shadow-2xl">
                    {/* Back Arrow */}
                    <button
                        className="absolute top-4 left-4 text-custom-blue text-2xl hover:text-blue-600 focus:outline-none"
                        onClick={onHideDetails}
                    >
                        <FaArrowLeft />
                    </button>

                    {/* Details Content */}
                    <Oadetails job_id={job_id} />
                </div>
            ) : (
              <div className="w-full max-w-lg mx-auto border border-custom-blue bg-white rounded-lg shadow-lg p-6 transition-all transform duration-300 hover:shadow-2xl hover:scale-105">
                  {/* <img src="" alt="Company logo" /> */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{company_name}</h2>
                    <p className="text-lg text-gray-600 mt-2">{job_id}</p>
                    <div className="mt-4 space-y-4">
                        <div className="text-sm text-gray-500 flex items-center">
                            <span className="font-medium text-gray-800 mr-2">OA Date:</span>
                            <span className="font-medium text-gray-500">{test_date}</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                            <span className="font-medium text-gray-800 mr-2">Result Date:</span>
                            <span className="font-medium text-gray-500">{result_date || "To be announced"}</span>
                        </div>
                    </div>
                    <button
                        className="mt-6 w-full bg-custom-blue text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none"
                        onClick={onShowDetails}
                    >
                        Show Details
                    </button>
                </div>
            )}
        </div>
    );
}
