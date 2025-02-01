import mongoose from "mongoose";

const JobProfileSchema = new mongoose.Schema(
  {
    recruiter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recuiter",
    },
    job_id: {
      type: String,
    },
    job_type: {
      type: String,
      enum:['2m Intern','6m Intern','Intern+PPO','Intern+FTE','FTE'],
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
      enum: ['Tech', 'Non-Tech'],
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
            enum: ["Resume Shortlisting", "OA", "Interview", "GD","Other"],
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
             'Computer Science & Engineering','Electronics & Communication Engineering','Instrumentation and Control Engineering','Electrical Engineering','Information Technology','Biotechnology','Chemical Engineering','Civil Engineering','Industrial & Production Engineering','Mechanical Engineering','Textile Technology',
              "Information Security",
              "CSE_DS",
              "CSE_AI",
              "ECE_SPML",
              "ECE_VLSI",
              "EE_EVD",
              "CE_SCE",
              "CE_GEO",
              "ME_DE",
              "IT_DA",
              "CH",
              "IPE_DA",
              "Textile Engineering & Management",
              "BT",
              "RE",
              "Finance",
              "Marketing",
              "HR",
              "Physics",
              "Chemistry",
              "Mathematics"
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
          enum: ["B.Tech", "M.Tech", "MBA" , "M.Sc" , "PHD"],
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
  },
  { timestamps: true }
);

const JobProfile = mongoose.model("JobProfile", JobProfileSchema);

export default JobProfile;
