import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import arrow icon from react-icons
import Editor from "../ckeditor";

const SharedExperience = () => {
  const [ShowEditor, setShowEditor] = useState(false);
  const dummyExperiences = [
    {
      _id: "1",
      interview_id: {
        company_name: "Google",
        company_logo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png",
      },
      user: {
        name: "Raghav Kukkar",
      },
      title: "My Google Interview Experience",
      description:
        "The interview was insightful and challenging. I learned a lot from the process. The questions were focused on algorithms, system design, and problem-solving.",
      date: "2024-12-30T10:00:00Z",
    },
    {
      _id: "2",
      interview_id: {
        company_name: "Microsoft",
        company_logo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
      },
      user: {
        name: "Ankit Sharma",
      },
      title: "Microsoft SDE Internship",
      description:
        "The interview process was smooth, and the interviewers were friendly. Questions were based on data structures, behavioral questions, and coding exercises.",
      date: "2024-12-29T14:30:00Z",
    },
  ];

  const [experiences, setExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/experiences");
        const data = await response.json();

        if (response.ok && data.success) {
          setExperiences(data.data);
        } else {
          console.error("Failed to fetch experiences", data.message);
          setExperiences(dummyExperiences);
        }
      } catch (error) {
        console.error("Error:", error);
        setExperiences(dummyExperiences);
      }
    };

    fetchExperiences();
  }, []);

  if(ShowEditor){
    return <Editor />
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
        Shared Interview Experiences
      </h1>

      {/* Conditional Rendering */}
      {selectedExperience ? (
        <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-4xl mx-auto relative">
          {/* Back Button */}
          <button className="absolute top-4 left-4 text-custom-blue text-2xl hover:text-blue-600 focus:outline-none"
            onClick={() => setSelectedExperience(null)}>
            <FaArrowLeft />
          </button>

          {/* Detailed Content */}
          <div className="text-center">
            {/* Company Logo */}
            {selectedExperience.interview_id.company_logo && (
              <img
                src={selectedExperience.interview_id.company_logo}
                alt={selectedExperience.interview_id.company_name}
                className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg"
              />
            )}

            {/* Company Name */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedExperience.interview_id.company_name}
            </h2>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">
              {selectedExperience.title}
            </h3>

            {/* Description */}
            <p className="text-justify text-gray-600 text-lg leading-relaxed mb-6">
              {selectedExperience.description}
            </p>

            {/* Footer with Name and Date */}
            <div className="text-sm text-gray-500">
              <span className="block mb-1">
                By: {selectedExperience.user.name}
              </span>
              <span>
                {new Date(selectedExperience.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Add Experience Card */}
          <div onClick={() => setShowEditor(true)} className="bg-white border-dashed border-4 border-gray-300 rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl transition-transform hover:scale-105 duration-300 text-custom-blue text-7xl">
            +
          </div>

          {/* Render Experience Cards */}
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="bg-white border-2 border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 hover:border-blue-400 duration-300 cursor-pointer overflow-hidden"
              onClick={() => setSelectedExperience(experience)}
            >
              {/* Company Name and Logo */}
              <div className="flex flex-col items-center p-4">
                {experience.interview_id.company_logo && (
                  <img
                    src={experience.interview_id.company_logo}
                    alt={experience.interview_id.company_name}
                    className="w-20 h-20 rounded-full mb-3 shadow-sm"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {experience.interview_id.company_name}
                </h3>
              </div>

              {/* Experience Title */}
              <h4 className="text-md font-medium text-gray-700 text-center px-4">
                {experience.title}
              </h4>

              {/* Name and Date */}
              <div className="text-sm text-gray-600 text-center space-y-1 p-4">
                <p>By: {experience.user.name}</p>
                <p>
                  {new Date(experience.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-blue-500 font-medium hover:underline">
                  Read More →
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedExperience;
