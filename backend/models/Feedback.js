import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  technicalSkill: {
    type: Number,
    min: 1,
    max: 5,
  },
  communicationSkill: {
    type: Number,
    min: 1,
    max: 5,
  },
  overallExperience: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  }},
 {timestamps: true},
);

export default mongoose.model('Feedback', FeedbackSchema);