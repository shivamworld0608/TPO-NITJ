import mongoose from "mongoose";

const OfferTrackerSchema = new mongoose.Schema(
  {
   studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    offer:[{
        offer_type:{
            type:String,
            enum:['Intern','Intern+PPO','Intern+FTE','FTE']
        },
        offer_category:{
            type:String,
            enum:['Not Considered','Below Dream','Dream','Super Dream']
        },
        offer_sector:{
            type:String,
            enum:['PSU','Private'],
            default:'Private'
        },
        jobId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobProfile",
        }
    }]
  },
  { timestamps: true }
);

const OfferTracker = mongoose.model("OfferTracker", OfferTrackerSchema);

export default OfferTracker;
