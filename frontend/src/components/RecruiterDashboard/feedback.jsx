import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from 'axios';

            // ... your component code ...

const FeedbackForm = () => {
  const [ratings, setRatings] = useState({
    technicalSkill: 0,
    communicationSkill: 0,
    overallExperience: 0,
  });

  const [comment, setComment] = useState("");

  const handleRatingChange = (field, value) => {
    setRatings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const feedbackData = { 
        ...ratings, 
        comment 
      };

      // Send feedback data to backend
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/feedback`, feedbackData,{withCredentials:true} );
      // Reset form after successful submission
      setRatings({
        technicalSkill: 0,
        communicationSkill: 0,
        overallExperience: 0
      });
      setComment("");
      
      // Show success message from backend
      alert(response.data.message || "Feedback submitted successfully!");
    } catch (error) {
      // Handle submission error
      alert(error.response?.data?.error || "Failed to submit feedback");
      console.error("Submission error:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-2xl rounded-md">
      <h2 className="text-3xl font-bold mb-4 text-center text-custom-blue">Feedback Form</h2>

      {/* Technical Skill Rating */}
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Rate Students Technical Skills</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl ${
                star <= ratings.technicalSkill ? "text-yellow-500" : "text-gray-200"
              }`}
              onClick={() => handleRatingChange("technicalSkill", star)}
            />
          ))}
        </div>
      </div>

      {/* Communication Skill Rating */}
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Rate Student Communication Skills</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl ${
                star <= ratings.communicationSkill ? "text-yellow-500" : "text-gray-200"
              }`}
              onClick={() => handleRatingChange("communicationSkill", star)}
            />
          ))}
        </div>
      </div>

      {/* Overall Experience Rating */}
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Rate Overall Experience with our NITJ Community</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl ${
                star <= ratings.overallExperience ? "text-yellow-500" : "text-gray-200"
              }`}
              onClick={() => handleRatingChange("overallExperience", star)}
            />
          ))}
        </div>
      </div>

      {/* Comment Section */}
      <div className="mb-6">
        <label className="block text-md font-medium mb-2">Additional Comments</label>
        <textarea
          className="w-full p-3 border rounded-md focus:outline focus:outline-custom-blue"
          rows="4"
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-custom-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;