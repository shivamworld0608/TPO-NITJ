import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  timing: {
    type: String,
  },
  speaker: {
    type: String,
  },
  department: {
    type: [String],
    default: ['ALL']
  },
  link: {
    type: String,
    trim: true
  },
  image: {
    type: String,
  },
  venue: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;