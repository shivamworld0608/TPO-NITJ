import React, { useState } from "react";

export default function InterviewCard({
    company_name,
    interview_date,
    interview_time,
    interview_info,
    interview_link,
    interview_type,
    was_selected,
}) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal((prev) => !prev);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="w-full max-w-lg mx-auto border border-custom-blue bg-white rounded-lg shadow-lg p-6 transition-all transform duration-300 hover:shadow-2xl hover:scale-105">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{company_name}</h2>
                <div className="mt-4 space-y-4">
                <div className="text-sm text-gray-500 flex items-center">
                        <span className="font-medium text-gray-800 mr-2">Interview Type:</span>
                        <span>{interview_type || "Not Provided"}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                        <span className="font-medium text-gray-800 mr-2">Interview Date:</span>
                        <span>{interview_date || "Not Provided"}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                        <span className="font-medium text-gray-800 mr-2">Interview Time:</span>
                        <span>{interview_time || "Not Provided"}</span>
                    </div>

                    {interview_link && (
                        <div className="text-sm text-gray-500 flex items-center">
                            <span className="font-medium text-gray-800 mr-2">Interview Link:</span>
                            <a
                                href={interview_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-custom-blue rounded-lg p-1 text-custom-blue hover:bg-custom-blue hover:text-white"
                            >
                                Join
                            </a>
                        </div>
                    )}
                    <div className="text-sm text-gray-500 flex items-center">
                        <span className="font-medium text-gray-800 mr-2">Selection Status:</span>
                        <span>
                            {was_selected
                                ? "You have been selected!"
                                : "Not selected yet or awaiting results."}
                        </span>
                    </div>
                </div>
                <button
                    className="mt-6 w-full bg-custom-blue text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none"
                    onClick={toggleModal}
                >
                    Show Details
                </button>
            </div>

            {showModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    aria-hidden={!showModal}
                >
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                            onClick={toggleModal}
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <h3
                            className="text-lg font-bold text-gray-800 mb-4"
                            id="modal-title"
                        >
                            Interview Details
                        </h3>
                        <p className="text-gray-600">{interview_info || "No additional information provided."}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
