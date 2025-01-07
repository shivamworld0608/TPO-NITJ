import mongoose from "mongoose";

const OASchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobProfile",
  },
  company_name: {
    type: String,
    required: true,
  },
  company_logo: {
      type: String,
  },
  oa_date: {
      type: Date,
  },
  oa_login_time: {
    type: String,
    required: true,
  },
  oa_duration: {
    type: String,
  },
  oa_info: {
    type: String,
  },
  oa_link: {
    type: String,
  },
  eligible_students: [
    {
      name: {
        type: String,
        required: true,
      },
      email:{
          type:String
      },
    }
  ],
  shortlisted_students: [
    {
      name: {
        type: String,
        required: true,
      },
      email:{
          type:String
      },
    }
  ]
}, { timestamps: true });

const OA = mongoose.model('OA', OASchema);

export default OA;
