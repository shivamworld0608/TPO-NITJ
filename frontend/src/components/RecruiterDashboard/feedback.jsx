import React, { useState, useEffect } from "react";
import { FaStar, FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import toast from "react-hot-toast";

const FeedbackForm = () => {
  const [ratings, setRatings] = useState({
    technicalSkill: 0,
    communicationSkill: 0,
    overallExperience: 0,
  });
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingFeedback, setExistingFeedback] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/feedback/get`,
          { withCredentials: true }
        );
        setExistingFeedback(response.data.data);
        setRatings({
          technicalSkill: response.data.data.technicalSkill,
          communicationSkill: response.data.data.communicationSkill,
          overallExperience: response.data.data.overallExperience,
        });
        setComment(response.data.data.comment);
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error("Error fetching feedback:", error);
        }
      }
    };
    fetchFeedback();
  }, []);

  const handleRatingChange = (field, value) => {
    if (!isEditMode && existingFeedback) return;
    setRatings((prev) => ({ ...prev, [field]: prev[field] === value ? 0 : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const feedbackData = { ...ratings, comment };
      const url = `${import.meta.env.REACT_APP_BASE_URL}/feedback`;
      const response = existingFeedback
        ? await axios.put(url, feedbackData, { withCredentials: true })
        : await axios.post(url, feedbackData, { withCredentials: true });
      if (!existingFeedback) {
        setExistingFeedback(response.data.data);
      }
      setIsEditMode(false);
      toast.success(response.data.message || "Feedback saved successfully!");
    } catch (error) {
      alert(error.response?.data?.error || "Error saving feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setRatings({
      technicalSkill: existingFeedback.technicalSkill,
      communicationSkill: existingFeedback.communicationSkill,
      overallExperience: existingFeedback.overallExperience,
    });
    setComment(existingFeedback.comment);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-2xl rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-center text-custom-blue">Feedback Form</h2>
        {existingFeedback && (
          <div>
            {!isEditMode ? (
              <button
                type="button"
                onClick={() => setIsEditMode(true)}
                className="text-custom-blue hover:text-blue-600 transition"
              >
                <FaEdit size={24} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <IoClose size={24} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Rate Students Technical Skills</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl ${
                star <= ratings.technicalSkill ? "text-yellow-500" : "text-gray-200"
              } ${(!isEditMode && existingFeedback) ? "cursor-not-allowed opacity-70" : ""}`}
              onClick={() => handleRatingChange("technicalSkill", star)}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Rate Student Communication Skills</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl ${
                star <= ratings.communicationSkill ? "text-yellow-500" : "text-gray-200"
              } ${(!isEditMode && existingFeedback) ? "cursor-not-allowed opacity-70" : ""}`}
              onClick={() => handleRatingChange("communicationSkill", star)}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-md font-medium mb-2">Rate Overall Experience with our NITJ Community</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl ${
                star <= ratings.overallExperience ? "text-yellow-500" : "text-gray-200"
              } ${(!isEditMode && existingFeedback) ? "cursor-not-allowed opacity-70" : ""}`}
              onClick={() => handleRatingChange("overallExperience", star)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-md font-medium mb-2">Additional Comments</label>
        <textarea
          className="w-full p-3 border rounded-md focus:outline focus:outline-custom-blue"
          rows="4"
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!isEditMode && existingFeedback}
        />
      </div>

      {(!existingFeedback || isEditMode) && (
        <button
          type="submit"
          className="w-full bg-custom-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : existingFeedback ? "Update Feedback" : "Submit Feedback"}
        </button>
      )}
    </form>
  );
};

export default FeedbackForm;