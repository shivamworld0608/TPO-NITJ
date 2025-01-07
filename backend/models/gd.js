import mongoose from "mongoose";

const GDSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobProfile",
  },
  interview_name: {
      type: String,
  },
  company_name: {
    type: String,
    required: true,
  },
  company_logo: {
    type:String,
  },
  gd_date: {
      type: Date,
  },
  gd_link: {
    type: String,
  },
  gd_time: {
    type: String,
  },
  gd_info: {
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

const GD = mongoose.model('GD', GDSchema);

export default GD;
