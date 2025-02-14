import Feedback from '../models/Feedback.js';
import Recuiter from '../models/user_model/recuiter.js';

export const createFeedback = async (req, res) => {
  try {
    const {
      technicalSkill, 
      communicationSkill, 
      overallExperience, 
      comment 
    } = req.body;
    const userId=req.user.userId;
    const recruiter=await Recuiter.findById(userId).select('company');
    const company=recruiter.company;
    console.log(recruiter.company);
    const newFeedback = new Feedback({
      company,
      technicalSkill,
      communicationSkill,
      overallExperience,
      comment
    });

    const savedFeedback = await newFeedback.save();

    res.status(201).json({
      success: true,
      data: savedFeedback
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getFeedbackByStudent = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ 
      studentName: req.params.studentName 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};