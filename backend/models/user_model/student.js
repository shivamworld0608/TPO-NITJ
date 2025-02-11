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
    enum: [
              "Biotechnology","Chemical Engineering","Civil Engineering","Computer Science & Engineering","Data Science and Engineering","Electrical Engineering",
              "Electronics & Communication Engineering","Electronics and VLSI Engineering","Industrial and Production Engineering",
              "Information Technology","Instrumentation and Control Engineering","Mathematics and Computing","Mechanical Engineering",
              "Textile Technology","Structural and Construction Engineering","Geotechnical and Geo-Environmental Engineering",
              "Information Security","Electric Vehicle Design","Signal Processing and Machine Learning","VLSI Design","Industrial Engineering and Data Analytics",
              "Manufacturing Technology With Machine Learning","Data Analytics","Control and Instrumentation","Machine Intelligence and Automation",
              "Mathematics and Computing","Design Engineering","Thermal and Energy Engineering","Textile Engineering and Management","Renewable Energy",
              "Artificial Intelligence","Power Systems and Reliability","Finance","Human Resource","Marketing","Chemistry","Mathematics",
              "Physics",
          ]
  },
  year: {
    type: String,
  },
  batch: {
    type: String,
  },
  course:{
    type:String,
    enum:["B.Tech","M.Tech","MBA","M.Sc","PHD"]
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
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;
