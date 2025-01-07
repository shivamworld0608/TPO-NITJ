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
      enum:['FTE','Intern','6m Intern'],
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
            enum: [ "OA", "Interview", "GD"],
          },
/*           current_step_id: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "Hiring_Workflow.step_type",
          },
          next_step_id: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "Hiring_Workflow.step_type",
          }, */
          details: {
            type: mongoose.Schema.Types.Mixed, // To allow dynamic fields for each step type
          },
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
              "CSE",
              "ECE",
              "EE",
              "ME",
              "CE",
              "IT",
              "CH",
              "ICE",
              "BT",
              "TT",
              "IPE",
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
        course_allowed: {
          type: String,
          enum: ["BTech", "MTech", "MBA"],
        },
      },
    },
    job_class: {
      type: String,
      enum: ["Below Dream", "Dream", "Super Dream"],
    },
    Current_Eligible_Students:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
  }],
    Approved_Status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const JobProfile = mongoose.model("JobProfile", JobProfileSchema);

export default JobProfile;
