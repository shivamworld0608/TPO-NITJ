import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: 'details.onModel', // Dynamically determine the model
        },
        onModel: {
          type: String,
          required: true,
          enum: ['Student', 'Recruiter'], // Allowed models
        },
        description: {
          type: String,
        },
        status: {
          type: String,
          enum: ['Pending', 'Resolved'],
          default: 'Pending',
        },
        comment:{
          type:String
        },
        raisedAt: {
          type: Date,
          default: Date.now,
        },
        resolvedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Professor',
          default: null,
        },
        resolvedAt: {
          type: Date,
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model('Issue', IssueSchema);
export default Issue ;
