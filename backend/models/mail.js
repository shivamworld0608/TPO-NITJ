import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  recipients: {
    type: [String],
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: ["Inbox", "Sent", "Pending", "Draft"],
    default: "Inbox",
  },
  senderType: {
    type: String,
    enum: ["Student", "Professor", "Recruiter"],
    required: true,
  },
  recipientType: {
    type: String,
    enum: ["Student", "Professor", "Recruiter"],
    required: true,
  },
  metadata: {
    batch: String, // For filtering students by batch
    course: String, // For filtering students by course
    department: String, // For filtering students or professors by department
    company: String, // For filtering recruiters by company
  },
});

const Mail = mongoose.model("Mail", mailSchema);

export default Mail;