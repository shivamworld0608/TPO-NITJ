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
    year:{
        type:String,
        enum:['2022','2023','2024','2025','2026','2027','2028','2029','2030']
    },
    degree: {
      type:String,
      enum:['BTECH','MTECH','MBA']
    },
    ctc:{
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
        email:{
            type:String
        },
        gender:{
          type:String,
          enum:['Male','Female','Other']
        },
        department: {
          type: String,
          enum: ['CSE', 'ECE', 'EE', 'ME', 'CE', 'IT', 'CH','ICE','BT','TT','IPE','DS','VLSI','AI','HM'],
        },
      }
    ]
  },
  { timestamps: true }
);

const Placement = mongoose.model("Placement", PlacementSchema);
export default Placement;
