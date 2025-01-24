import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbackData = { ...ratings, comment };
    console.log("Feedback Submitted: ", feedbackData);
    alert("Feedback submitted successfully!");
    // You can replace the console.log with an API call to submit feedback
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-2xl rounded-md">
      <h2 className="text-3xl font-bold mb-4 text-center text-custom-blue">Feedback Form</h2>

      {/* Technical Skill Rating */}
      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Rate Technical Skills</label>
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
        <label className="block text-md font-medium mb-2">Rate Communication Skills</label>
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
        <label className="block text-md font-medium mb-2">Rate Overall Experience with NITJ Community</label>
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
