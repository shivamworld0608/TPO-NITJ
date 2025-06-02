import mongoose from 'mongoose';

const NOCIdTrackerSchema = new mongoose.Schema({
  date: { type: String, required: true }, // e.g. "310525"
  lastNumber: { type: Number, default: 1898 },
});

const NOCIdTracker = mongoose.model('NOCIdTracker', NOCIdTrackerSchema);
export default NOCIdTracker;
