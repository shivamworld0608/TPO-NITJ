import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Editor from "./ckeditor";
import parse from "html-react-parser";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import BouncingLoader from "../BouncingLoader";

const SharedExperience = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [currentUserExperiences, setCurrentUserExperiences] = useState([]);
  const [otherExperiences, setOtherExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("myExperiences");

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

  const handleDelete = async (experience) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.REACT_APP_BASE_URL}/sharedexperience/${experience._id}`,
            { withCredentials: true }
          );
          setCurrentUserExperiences((prev) =>
            prev.filter((exp) => exp._id !== experience._id)
          );
          toast.success("Experience deleted successfully!");
        } catch (err) {
          toast.error(err.message || "Failed to delete experience.");
        }
      }
    });
  };

  const handleViewDetails = (experience) => {
    setSelectedExperience(experience);
  };

  const handleBack = () => {
    setSelectedExperience(null);
  };

  if (loading) return <BouncingLoader size="medium" text="Loading..." />;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <Editor
        experience={selectedExperience}
        editing={true}
        onClose={() => {
          setIsEditing(false);
          setSelectedExperience(null);
        }}
      />
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
      <>
      {/* Tabs */}
      <div className="flex justify-between items-center bg-white p-4 rounded-t-lg ">
          <h2 className="text-3xl font-semibold text-custom-blue capitalize underline underline-offset-8">
        {activeTab === "myExperiences" ? "My Experiences" : "Other Experiences"}
      </h2>
      <div className="flex border border-gray-300 rounded-3xl bg-white">
          {/* Active Tab Heading */}
        <button
          className={`px-4 py-2 rounded-3xl ${
            activeTab === "myExperiences" ? "bg-custom-blue text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("myExperiences")}
        >
          My Experiences
        </button>
        <button
          className={`px-4 py-2 rounded-3xl ${
            activeTab === "otherExperiences" ? "bg-custom-blue text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("otherExperiences")}
        >
          Other Experiences
        </button>
      </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-6">
      {activeTab === "myExperiences" && (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {eligible && (
              <div
                onClick={() => setShowEditor(true)}
                className="bg-white border-dashed border-4 border-gray-300 rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl transition-transform hover:scale-105 duration-300 text-custom-blue text-7xl p-4"
              >
                +
              </div>
            )}
            {currentUserExperiences.map((experience) => (
              <div
                key={experience._id}
                className="bg-white border-2 border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 hover:border-blue-400 duration-300 cursor-pointer overflow-hidden p-1"
                onClick={() => handleViewDetails(experience)}
              >
                <h4 className="text-md font-medium text-gray-700 text-center px-4">
                  {experience.title || "Untitled Experience"}
                </h4>
                <div className="text-sm text-gray-600 text-center space-y-1 p-2">
                  <p>
                    {new Date(experience.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <span
                    className="text-custom-blue font-medium hover:text-green-500 mx-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedExperience(experience);
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </span>
                  <span
                    className="text-custom-blue font-medium hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(experience);
                    }}
                  >
                    Delete
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "otherExperiences" && (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {otherExperiences.map((experience) => (
              <div
                key={experience._id}
                className="bg-white border border-custom-blue rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 hover:border-blue-400 duration-300 cursor-pointer overflow-hidden py-4"
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
      )}
      </div>
    </>
  );
};

export default SharedExperience;
