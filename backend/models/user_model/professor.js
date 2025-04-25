import mongoose from "mongoose";

const professorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
   otp:{
    type:String
   }
}, { timestamps: true });

const Professor = mongoose.model('Professor', professorSchema);

export default Professor;
