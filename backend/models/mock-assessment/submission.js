import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
    attempt: { type: mongoose.Schema.Types.ObjectId, ref: 'AssessmentAttempt', required: true },
    questionIndex: { type: Number, required: true },
    code: { type: String, required: true },
    language: { type: String, enum: ['cpp', 'java', 'python'], required: true },
    submissionTime: { type: Date, default: Date.now },
    result: { type: String, enum: ['accepted', 'wrong', 'error'], default: 'wrong' },
    score: { type: Number, default: 0 },
    plagiarismFlag: { type: Boolean, default: false }
  });
  
  const Submission = mongoose.model('Submission', SubmissionSchema);
  export default Submission;