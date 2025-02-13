import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String,
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

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
