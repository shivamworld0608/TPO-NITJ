import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
  job_id: {
    type: String,
    required: true,
  },
  interview_code: {
      type: String,
      enum:['1', '2', '3', '4', '5'],
  },
  company_name: {
    type: String,
    required: true,
  },
  company_logo: {
    type:String,
  },
  interview_date: {
      type: Date,
  },
  interview_time: {
    type: String,
  },
  interview_type: {
    type: String,
  },
  important_guidelines: {
      type: String,
  },
  interview_link: {
    type: String,
  },
  notification: {
      type: String,
  },
  result_date: {
      type: Date,
  },
  eligible_students: [
    {
      name: {
        type: String,
        required: true,
      },
      rollno: {
        type: String,
      },
      email:{
          type:String
      },
      department: {
        type: String,
        enum:['CSE', 'ECE', 'EE', 'ME', 'CE', 'IT', 'CH','ICE','BT','TT','IPE'],
      },
    }
  ],
  shortlisted_students: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      rollno: {
        type: String,
      },
      email:{
          type:String
      },
      department: {
        type: String,
        enum:['CSE', 'ECE', 'EE', 'ME', 'CE', 'IT', 'CH','ICE','BT','TT','IPE'],
      },
    }
  ]
}, { timestamps: true });

const Interview = mongoose.model('Interview', InterviewSchema);

export default Interview;
