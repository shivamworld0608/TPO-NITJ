import mongoose from "mongoose";

const professorSchema = new mongoose.Schema({
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
  department: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Professor = mongoose.model('Professor', professorSchema);

export default Professor;
