import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Editor from "../ckeditor";
import parse from "html-react-parser";

const SharedExperience = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [currentUserExperiences, setCurrentUserExperiences] = useState([]);
  const [otherExperiences, setOtherExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/sharedexperience`,
          { withCredentials: true }
        );
        setEligible(response.data.eligible || false);
        setCurrentUserExperiences(response.data.currentUserExperiences || []);
        setOtherExperiences(response.data.otherExperiences || []);
      } catch (err) {
        setError(err.message || "Failed to load experiences.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const handleEdit = (experience) => {
    setSelectedExperience(experience);
    setShowEditor(true);
  };
  const handleDelete = async(experience) => {
    await axios.delete(
      `${import.meta.env.REACT_APP_BASE_URL}/sharedexperience/delete/${experience._id}`,)
  };

  const handleViewDetails = (experience) => {
    setSelectedExperience(experience);
  };

  const handleBack = () => {
    setSelectedExperience(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading experiences...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (showEditor) {
    return (
      <Editor
        experience={selectedExperience}
        onClose={() => {
          setShowEditor(false);
          setSelectedExperience(null);
        }}
      />
    );
  }

  if (selectedExperience) {
    return (
      <div className="p-6 bg-white min-h-screen">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 mb-4"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-4xl font-bold mb-4">{selectedExperience.title || "Untitled Experience"}</h1>
        <p className="text-black mb-1 mt-4">By: {selectedExperience.author?.name || "Anonymous"}</p>
        <p className="text-gray-600 mb-6">
          {new Date(selectedExperience.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <div className="prose max-w-none">{parse(selectedExperience.content)}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
        Shared Interview Experiences
      </h1>

      {/* Current User Experiences Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Experiences</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Add Experience Card */}
          {eligible && (
            <div
              onClick={() => setShowEditor(true)}
              className="bg-white border-dashed border-4 border-gray-300 rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl transition-transform hover:scale-105 duration-300 text-custom-blue text-7xl"
            >
              +
            </div>
          )}

          {/* Render Current User Experiences */}
          {currentUserExperiences.map((experience) => (
            <div
              key={experience._id}
              className="bg-white border-2 border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 hover:border-blue-400 duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleViewDetails(experience)}
            >
              <h4 className="text-md font-medium text-gray-700 text-center px-4">
                {experience.title || "Untitled Experience"}
              </h4>
              <div className="text-sm text-gray-600 text-center space-y-1 p-4">
                <p>
                  {new Date(experience.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <span className="text-blue-500 font-medium hover:text-green-500 mx-4" onClick={() => handleEdit(experience)}>Edit</span>
                <span className="text-blue-500 font-medium hover:text-red-500" onClick={() => handleDelete(experience)}>Delete</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Users' Experiences Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Others Experiences</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {otherExperiences.map((experience) => (
            <div
              key={experience._id}
              className="bg-white border-2 border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 hover:border-blue-400 duration-300 cursor-pointer overflow-hidden py-4"
              onClick={() => handleViewDetails(experience)}
            >
              <h4 className="text-md font-medium text-gray-700 text-center px-4">
                {experience.title || "Untitled Experience"}
              </h4>
              <div className="text-sm text-gray-600 text-center space-y-1 p-4">
                <p>By: {experience.author.name || "Anonymous"}</p>
                <p>
                  {new Date(experience.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SharedExperience;
