import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["JOB_CREATED", "STUDENT_SHORTLISTED"],
  },
  message: {
    type: String,
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobProfile",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
  batch:{
    type:String,
  }
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;