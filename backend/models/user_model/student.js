import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    // enum: [
    //           "INTEGRATED TEACHER EDUCATION PROGRAMME", "BIO TECHNOLOGY", "CHEMICAL ENGINEERING", "CIVIL ENGINEERING", 
    //           "COMPUTER SCIENCE AND ENGINEERING", "ELECTRICAL ENGINEERING", "ELECTRONICS AND COMMUNICATION ENGINEERING", 
    //           "INDUSTRIAL AND PRODUCTION ENGINEERING", "INFORMATION TECHNOLOGY", "INSTRUMENTATION AND CONTROL ENGINEERING", 
    //           "MECHANICAL ENGINEERING", "TEXTILE TECHNOLOGY", "DATA SCIENCE AND ENGINEERING", "ELECTRONICS AND VLSI ENGINEERING", 
    //           "MATHEMATICS AND COMPUTING", "CHEMISTRY", "MATHEMATICS", "PHYSICS", "ARTIFICIAL INTELLIGENCE", 
    //           "COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)", "CONTROL AND INSTRUMENTATION ENGINEERING", 
    //           "DATA ANALYTICS", "DESIGN ENGINEERING", "ELECTRIC VEHICLE DESIGN", "GEOTECHNICAL AND GEO-ENVIRONMENTAL ENGINEERING", 
    //           "INDUSTRIAL ENGINEERING AND DATA ANALYTICS", "POWER SYSTEMS AND RELIABILITY", "RENEWABLE ENERGY", 
    //           "SIGNAL PROCESSING AND MACHINE LEARNING", "STRUCTURAL AND CONSTRUCTION ENGINEERING", "TEXTILE ENGINEERING AND MANAGEMENT", 
    //           "VLSI DESIGN", "MACHINE INTELLIGENCE AND AUTOMATION", "THERMAL AND ENERGY ENGINEERING", "HUMANITIES AND MANAGEMENT"
    //       ]
  },
  batch: {
    type: String,
  },
  course:{
    type:String,
    enum:["B.Tech","M.Tech","MBA","M.Sc.","PHD","B.Sc.-B.Ed."]
  },
  address: {
    type: String,
    },
  cgpa: {
    type: String,
   },
  gender: {
    type:String,
     enum: ['Male', 'Female', 'Other'],
  },
  category:{
    type:String,
    enum: ['General','GEN-EWS', 'SC', 'ST', 'OBC-NCL','OBC'],
  },
  active_backlogs: {
    type: Boolean,
    default:false,
  },
  backlogs_history: {
    type: Boolean,
    default:false,
  },
  debarred:{
    type:Boolean,
    default:false,
  },
  disability:{
    type:Boolean,
    default:false,
  },
  image: {
    type: String,
    },
  placementstatus: {
        type: String,
        enum: ['Not Placed','Below Dream', 'Dream', 'Super Dream'  ],
        default:'Not Placed',
    },
  internshipstatus: {
        type: String,
        enum: ['No Intern','2m Intern', '6m Intern', '11m Intern'],
        default:'No Intern',
  },
  account_deactivate:{
       type:Boolean,
       default:false,
   },
   otp:{
    type:String
   }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;
