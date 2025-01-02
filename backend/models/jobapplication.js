import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
   job_id: {
     type: String,
     required: true,
   },
   company_name: {
     type: String,
     required: true,
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
     type: String,
     required: true,
   },
   Status: {
     type: String,
     enum:['Live','Past','Upcoming'],
   },
   Hiring_Workflow: {
    type: [
      {
        step_name: {
          type: String,
          required: true,
        },
        step_type: {
          type: String,
          required: true,
          enum: ['Online Assessment', 'Technical Interview', 'HR Interview', 'Group Discussion', 'Final Announcement', 'Other'],
        },
        description: {
          type: String,
        },
        tentative_date: {
          type: Date,
          required: true,
        },
      },
    ],
    default: [],
   },
   eligibility_criteria: {
    type: {
      department_allowed: {
        type: [String],
        enum: ['CSE', 'ECE', 'EE', 'ME', 'CE', 'IT', 'CH','ICE','BT','TT','IPE'],
      },
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

  const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);

  export default JobApplication;
  
