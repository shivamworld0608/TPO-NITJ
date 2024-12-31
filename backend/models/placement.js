import mongoose from "mongoose";

const PlacementSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
    },
    company_logo: {
      type: String,
    },
    placement_type: {
      type: String,
      enum: ["Tech", "Non-Tech"],
    },
    batch:{
        type:String
    },
    shortlisted_students: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
        rollno: {
          type: String,
        },
        email:{
            type:String
        },
        department: {
          type: String,
          enum: ['CSE', 'ECE', 'EE', 'ME', 'CE', 'IT', 'CH','ICE','BT','TT','IPE'],
        },
      }
    ]
  },
  { timestamps: true }
);

const Placement = mongoose.model("Placement", PlacementSchema);

export default Placement;
