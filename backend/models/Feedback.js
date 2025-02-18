import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  company:{
    type:String,
  },
  technicalSkill: {
    type: Number,
    min: 0,
    max: 5,
  },
  communicationSkill: {
    type: Number,
    min: 0,
    max: 5,
  },
  overallExperience: {
    type: Number,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
  }},
 {timestamps: true},
);

export default mongoose.model('Feedback', FeedbackSchema);