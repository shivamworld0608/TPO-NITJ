import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title:{
    type:String,
  },
  link:{
    type:String
  },
  description:{
    type:String,
  },
});

const Course = mongoose.model('Course', courseSchema);
export default Course;