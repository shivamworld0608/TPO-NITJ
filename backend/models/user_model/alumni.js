import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  facultyId: {
    type: String,
    required: true,
  },
  Company: {
    type: String,
    required: true,
  },
  otp:{
   type:String
  }
}, { timestamps: true });

const Alumni = mongoose.model('Alumni', alumniSchema);

export default Alumni;
