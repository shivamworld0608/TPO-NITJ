import mongoose from "mongoose";

const formSubmissionSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobProfile',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  fields: [{
    fieldName: String,
    value: String,
    isAutoFilled: Boolean,
    studentPropertyPath: String
  }],
  resumeUrl: {
    type: String,
  },
  visible: {
    type: Boolean,
    default: false
  }
});

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

export default FormSubmission;