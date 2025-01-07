import mongoose from "mongoose";

const PPTSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobProfile",
  },
  company_name: {
    type: String,
    required: true,
  },
  company_logo: {
    type:String,
  },
  ppt_date: {
      type: Date,
  },
  ppt_time: {
    type: String,
  },
  ppt_link: {
    type: String,
  },
  eligible_students:[
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
}, { timestamps: true });

const PPT = mongoose.model('PPT', PPTSchema);

export default PPT;
