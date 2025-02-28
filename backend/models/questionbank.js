import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    trim: true,
  },
  sourceLinks: [{
    type: String,
    trim: true,
  }],
  answer: {
    type: String,
    trim: true,
  },
  which_role:{
    type:String,
  }
});

const studentContributionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  questions: [questionSchema],
});

const questionBankSchema = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true,
  },
  contributions: [studentContributionSchema],
});

const QuestionBank = mongoose.model('QuestionBank', questionBankSchema);

export default QuestionBank;