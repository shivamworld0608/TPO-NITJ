import mongoose from "mongoose";

const OASchema = new mongoose.Schema({
  job_id: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  company_logo: {
      type: String,
  },
  test_date: {
      type: Date,
  },
  login_time: {
    type: String,
    required: true,
  },
  test_duration: {
    type: String,
    required: true,
  },
  test_pattern: {
    type: String,
    required: true,
  },
  important_guidelines: {
      type: String,
      required: true,
  },
  test_link: {
    type: String,
    required: true,
  },
  notification: {
      type: String,
      required: true
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

const OA = mongoose.model('OA', OASchema);

export default OA;
