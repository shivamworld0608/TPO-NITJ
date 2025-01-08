import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import arrow icon from react-icons

export default function Oacard(props) {
    const {
        company_name,
        company_logo,
        oa_date,
        oa_login_time,
        oa_duration,
        oa_info,
        oa_link,
    } = props;

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="w-full max-w-lg mx-auto border border-custom-blue bg-white rounded-lg shadow-lg p-6 transition-all transform duration-300 hover:shadow-2xl hover:scale-105">
                {/* <img src="" alt="Company logo" /> */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{company_name}</h2>
                <div className="mt-4 space-y-4">
                    <div className="text-sm text-gray-500 flex items-center">
                        <span className="font-medium text-gray-800 mr-2">OA Date:</span>
                        <span className="font-medium text-gray-500">{oa_date}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                        <span className="font-medium text-gray-800 mr-2">OA Login Time:</span>
                        <span className="font-medium text-gray-500">{oa_login_time}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                        <span className="font-medium text-gray-800 mr-2">OA Duration:</span>
                        <span className="font-medium text-gray-500">{oa_duration}</span>
                    </div>
                    {oa_link && (
                        <div className="text-sm text-gray-500 flex items-center">
                            <span className="font-medium text-gray-800 mr-2">OA Link:</span>
                            <a href={oa_link} target="_blank" rel="noopener noreferrer" className="border border-custom-blue rounded-lg p-1 text-custom-blue hover:bg-custom-blue hover:text-white">
                                Start
                            </a>
                        </div>
                    )}
                </div>
                <button
                    className="mt-6 w-full bg-custom-blue text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none"
                    onClick={toggleModal}
                >
                    Show OA Info
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                            onClick={toggleModal}
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">OA Guidelines & Info</h3>
                        <p className="text-gray-600">{oa_info}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
