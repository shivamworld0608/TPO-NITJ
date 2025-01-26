import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  filename: {
    type: String,
  },
  filepath: {
    type: String,
  },
  thumbnail: {
    type: String
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  size: {
    type: Number,
  },
  downloads: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor'
  }
});

export default mongoose.model('PDF', pdfSchema);