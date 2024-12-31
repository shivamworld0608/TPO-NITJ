import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
  rollno: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  year: {
    type: String,
  },
  semester: {
    type: String,
    },
  phone: {
    type: String,
    },
  address: {
    type: String,
    },
  cgpa: {
    type: String,
   },
  gender: {
    type:String,
  },
  active_backlogs: {
    type: Boolean,
  },
  image: {
    type: String,
    },
  placementstatus: {
        type: String,
        enum: ["notplaced", "below dream", "dream", "super dream" ],
    }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;
