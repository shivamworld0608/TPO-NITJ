import mongoose from "mongoose";

const PlacementSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobProfile",
    },
    company_name: {
      type: String,
    },
    company_logo: {
      type: String,
    },
    placement_offer_mode:{
      type:String,
      enum:['Off-Campus','On-Campus'],
      default:'On-Campus',
    },
    placement_type: {
      type: String,
      enum:['Intern','Intern+PPO','Intern+FTE','FTE'],
    },
    placement_category:{
      type:String,
      enum: ['Tech', 'Non-Tech','Tech+Non-Tech'],
    },
    placement_sector:{
      type:String,
      enum:['PSU','Private'],
      default:'Private'
   },
    batch:{
        type:String,
        enum:['2022','2023','2024','2025','2026','2027','2028','2029','2030']
    },
    degree: {
      type:String,
      enum:["B.Tech","M.Tech","MBA","M.Sc.","PHD","B.Sc.-B.Ed."]
    },
    ctc:{
      type:String,
    },
    base_salary:{
      type:String,
    },
    role:{
      type:String,
    },
    result_date: {
      type: Date,
    },
    shortlisted_students: [
      {
        studentId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'Student'
        },
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
          enum: [ 
            "INTEGRATED TEACHER EDUCATION PROGRAMME", "BIO TECHNOLOGY", "CHEMICAL ENGINEERING", "CIVIL ENGINEERING", 
            "COMPUTER SCIENCE AND ENGINEERING", "ELECTRICAL ENGINEERING", "ELECTRONICS AND COMMUNICATION ENGINEERING", 
            "INDUSTRIAL AND PRODUCTION ENGINEERING", "INFORMATION TECHNOLOGY", "INSTRUMENTATION AND CONTROL ENGINEERING", 
            "MECHANICAL ENGINEERING", "TEXTILE TECHNOLOGY", "DATA SCIENCE AND ENGINEERING", "ELECTRONICS AND VLSI ENGINEERING", 
            "MATHEMATICS AND COMPUTING", "CHEMISTRY", "MATHEMATICS", "PHYSICS", "ARTIFICIAL INTELLIGENCE", 
            "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)", "CONTROL AND INSTRUMENTATION ENGINEERING", 
            "DATA ANALYTICS", "DESIGN ENGINEERING", "ELECTRIC VEHICLE DESIGN", "GEOTECHNICAL AND GEO-ENVIRONMENTAL ENGINEERING", 
            "INDUSTRIAL ENGINEERING AND DATA ANALYTICS", "POWER SYSTEMS AND RELIABILITY", "RENEWABLE ENERGY", 
            "SIGNAL PROCESSING AND MACHINE LEARNING", "STRUCTURAL AND CONSTRUCTION ENGINEERING", "TEXTILE ENGINEERING AND MANAGEMENT", 
            "VLSI DESIGN", "MACHINE INTELLIGENCE AND AUTOMATION", "THERMAL AND ENERGY ENGINEERING", "HUMANITIES AND MANAGEMENT"
            // "Biotechnology","Chemical Engineering","Civil Engineering","Computer Science & Engineering","Data Science and Engineering","Electrical Engineering",
            // "Electronics & Communication Engineering","Electronics and VLSI Engineering","Industrial and Production Engineering",
            // "Information Technology","Instrumentation and Control Engineering","Mathematics and Computing","Mechanical Engineering",
            // "Textile Technology","Structural and Construction Engineering","Geotechnical and Geo-Environmental Engineering",
            // "Information Security","Electric Vehicle Design","Signal Processing and Machine Learning","VLSI Design","Industrial Engineering and Data Analytics",
            // "Manufacturing Technology With Machine Learning","Data Analytics","Control and Instrumentation","Machine Intelligence and Automation",
            // "Mathematics and Computing","Design Engineering","Thermal and Energy Engineering","Textile Engineering and Management","Renewable Energy",
            // "Artificial Intelligence","Power Systems and Reliability","Finance","Human Resource","Marketing","Chemistry","Mathematics",
            // "Physics"
          ],
        },
        category:{
          type:String,
        }
      }
    ],
    visibility: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Placement = mongoose.model("Placement", PlacementSchema);
export default Placement;