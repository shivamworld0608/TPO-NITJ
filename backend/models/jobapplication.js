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
   jobtitle: {
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
   deadline: {
     type: String,
     required: true,
   },
   Status: {
     type: String,
     enum:['Live','Past','Upcoming'],
   },
   Hiring_Workflow: {
       type: String,
   },
   eligibility_criteria: {
    type: {
      branches_allowed: {
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
        type: boolean,
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
     type: boolean,
  }
}, { timestamps: true });

  const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);

  export default JobApplication;
  
