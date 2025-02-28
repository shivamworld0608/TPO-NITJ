import mongoose from "mongoose";

const recuiterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  company: {
    type: String,
  },
  designation: {
    type: String,
  },
  otp:{
   type:String
  },
}, { timestamps: true });

const Recuiter = mongoose.model('Recuiter', recuiterSchema);

export default Recuiter;
