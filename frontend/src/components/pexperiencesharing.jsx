import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTimes, FaThumbtack } from "react-icons/fa";

// Sample data for shared experiences
const sampleExperiences = [
  {
    id: 1,
    name: "Alice Johnson",
    title: "My First Coding Project",
    description: "I started my journey with a simple website. It was an amazing experience to learn HTML and CSS.",
    timestamp: new Date().getTime() - 3600000, // 1 hour ago
  },
  {
    id: 2,
    name: "Bob Smith",
    title: "Learning React",
    description: "Learning React was a turning point in my development journey. The component-based structure is powerful.",
    timestamp: new Date().getTime() - 7200000, // 2 hours ago
  },
  {
    id: 3,
    name: "Charlie Brown",
    title: "Building a Full Stack Application",
    description: "Building a full stack application was challenging, but with perseverance, I managed to connect the front-end with the back-end.",
    timestamp: new Date().getTime() - 10800000, // 3 hours ago
  },
];

const ExperienceItem = ({ experience, onDelete }) => {
  const { name, title, description, timestamp } = experience;

  // Function to calculate time ago
  const timeAgo = (time) => {
    const seconds = Math.floor((new Date().getTime() - time) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  return (
    <motion.div
      className="flex items-start p-4 mb-4 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mr-4">
        <FaThumbtack className="text-blue-500" />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{name}</p>
        <p className="text-lg font-bold">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500">{timeAgo(timestamp)}</p>
      </div>
      <div className="ml-4">
        <button
          onClick={() => onDelete(experience.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTimes className="text-xl" />
        </button>
      </div>
    </motion.div>
  );
};

const ExperienceSharing = () => {
  const [experiences, setExperiences] = useState(sampleExperiences);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [newExperience, setNewExperience] = useState({ name: "", title: "", description: "" });

  // Handle new experience submission
  const handleSubmitExperience = () => {
    const newExperienceObj = {
      id: experiences.length + 1,
      name: newExperience.name,
      title: newExperience.title,
      description: newExperience.description,
      timestamp: new Date().getTime(),
    };
    setExperiences([...experiences, newExperienceObj]);
    setIsAddingExperience(false);
    setNewExperience({ name: "", title: "", description: "" });
  };

  // Delete an experience
  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="p-6 w-full bg-gray-50">
      <div className="bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4 flex justify-between items-center">
          Experience Sharing
          <button
  onClick={() => setIsAddingExperience(true)}
  className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-md hover:bg-blue-600 transition-all"
>
  <FaPlus className="mr-1" />
  Share Experience
</button>

        </h2>

        {/* Add Experience Modal */}
        {isAddingExperience && (
          <div className="p-6 bg-white shadow-md rounded-md mb-4">
            <h3 className="text-xl font-semibold">Share Your Experience</h3>
            <div className="mt-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-2 border rounded-md mb-2"
                value={newExperience.name}
                onChange={(e) => setNewExperience({ ...newExperience, name: e.target.value })}
              />
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="w-full p-2 border rounded-md mb-2"
                value={newExperience.title}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
              />
              <textarea
                name="description"
                placeholder="Describe your experience"
                className="w-full p-2 border rounded-md mb-2"
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleSubmitExperience}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  onClick={() => setIsAddingExperience(false)}
                  className="ml-4 text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Experience List */}
        <div className="space-y-4">
          {experiences.length > 0 ? (
            experiences.map((experience) => (
              <ExperienceItem
                key={experience.id}
                experience={experience}
                onDelete={handleDeleteExperience}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No experiences shared yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSharing;
