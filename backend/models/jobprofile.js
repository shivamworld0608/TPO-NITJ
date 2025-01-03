  import mongoose from "mongoose";

const JobProfileSchema = new mongoose.Schema({
  recruiter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
  },
   job_id: {
     type: String,
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
   jobtype: {
     type: String,
     enum:['Tech','Non-Tech'],
   },
   job_salary:{
     type: {
      ctc: {
        type: String,
      },
      base_salary: {
        type: String,
     }
   }},
   deadline: {
     type: Date,
   },
   Hiring_Workflow: {
    type: [
      {
        step_type: {
          type: String,
          enum: ['Online Assessment', 'Technical Interview', 'HR Interview', 'Group Discussion', 'Final Announcement'],
        },
        step_name: {
          type: String,
        },
        description: {
          type: String,
        },
        tentative_date: {
          type: Date,
        },
      },
    ],
    default: [],
   },
   eligibility_criteria: {
    type: {
      department_allowed: [{
        type: String,
        enum: ['CSE', 'ECE', 'EE', 'ME', 'CE', 'IT', 'CH','ICE','BT','TT','IPE'],
      }],
      gender_allowed: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'Any'],
        default: 'Any',
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
  }},
  job_category: {
      type: String,
      enum: ['Below Dream', 'Dream', 'Super Dream'],
  },
   Applied_Students: {
     type: [String],
   },
   Approved_Status: {
     type: Boolean,
  }
}, { timestamps: true });

  const JobProfile = mongoose.model('JobProfile', JobProfileSchema);

  export default JobProfile;
  
