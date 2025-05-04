import mongoose from "mongoose";

const JobProfileSchema = new mongoose.Schema(
  {
    recruiter_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    job_id: {
      type: String,
    },
    job_type: {
      type: String,
      enum:['2m Intern','6m Intern','11m Intern','Intern+PPO','Intern+FTE','FTE'],
    },
    company_name: {
      type: String,
    },
    company_logo: {
      type: String,
    },
    job_role: {
      type: String,
    },
    jobdescription: {
      type: String,
    },
    joblocation: {
      type: String,
    },
    job_category: {
      type: String,
      enum: ['Tech', 'Non-Tech','Tech+Non-Tech'],
    },
    job_salary: {
      type: {
        ctc: {
          type: String,
        },
        base_salary: {
          type: String,
        },
      },
    },
    deadline: {
      type: Date,
    },
    Hiring_Workflow: {
      type: [
        {
          step_type: {
            type: String,
            /* enum: ["Resume Shortlisting", "OA", "Interview", "GD","Others"], */
          },
          details: {
            type: mongoose.Schema.Types.Mixed,
          },
          eligible_students: {
            type: [{
              type: mongoose.Schema.Types.ObjectId,
              ref: "Student",
            }],
            default: []
          },
          absent_students: {
            type: [{
              type: mongoose.Schema.Types.ObjectId,
              ref: "Student",
            }],
            default: []
          },
          shortlisted_students: {
            type: [{
              type: mongoose.Schema.Types.ObjectId,
              ref: "Student",
            }],
            default: []
          }
        },
      ],
      default: [],
    },
    eligibility_criteria: {
      type: {
        department_allowed: [
          {
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
              // "Physics",
            ],
          },
        ],
        gender_allowed: {
          type: String,
          enum: ["Male", "Female", "Other", "Any"],
          default: "Any",
        },
        eligible_batch: {
          type: String,
        },
        minimum_cgpa: {
          type: Number,
          min: 0.0,
          max: 10.0,
          default: 0.0,
        },
        active_backlogs: {
          type: Boolean,
        },
        history_backlogs:{
          type:Boolean,
        },
        course_allowed: {
          type: String,
          enum: ["B.Tech", "M.Tech", "MBA" , "M.Sc." , "PHD","B.Sc.-B.Ed."],
        },
      },
    },
    job_class: {
      type: String,
      enum: ["Below Dream", "Dream", "Super Dream"],
    },
    Applied_Students:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
  }],
    Approved_Status: {
      type: Boolean,
      default: false
    },
    completed:{
      type:Boolean,
      default:false
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    recruiter_editing_allowed:{
      type:Boolean,
      default:false
    },
    auditLogs: [
      {
        editedBy: {
          type: mongoose.Schema.Types.ObjectId,
        },
        email: {
          type: String,
        },
        changes: {
          type: mongoose.Schema.Types.Mixed,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  { timestamps: true }
);

const JobProfile = mongoose.model("JobProfile", JobProfileSchema);

export default JobProfile;
