import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: String,
  departments: {
    type:[ String],
    default:[]
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

const Department = mongoose.model('Department', departmentSchema);

export default Department;