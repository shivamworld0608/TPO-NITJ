import mongoose from "mongoose";

const AssessmentAttemptSchema = new mongoose.Schema({
    assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment'},
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    startTime: { type: Date },
    endTime: { type: Date },
    status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
    totalScore: { type: Number, default: 0 },
    rank: { type: Number },
    tabSwitches: { type: Number, default: 0 },
    copyPaste:{type:Number, default: 0},
  });
  
  const AssessmentAttempt = mongoose.model('AssessmentAttempt', AssessmentAttemptSchema);
  export default AssessmentAttempt;