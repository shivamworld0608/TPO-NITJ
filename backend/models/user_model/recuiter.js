import mongoose from "mongoose";

const recuiterSchema = new mongoose.Schema({
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
  company: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  allowed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Recuiter = mongoose.model('Recuiter', recuiterSchema);

export default Recuiter;
