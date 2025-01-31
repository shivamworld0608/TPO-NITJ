import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
  companyName: { type: String },
  contactNo: { type: String },
  email: { type: String},
  contacted: { type: Boolean},
  notes: { type: String, default: '' },
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', ConversationSchema);

export default Conversation;