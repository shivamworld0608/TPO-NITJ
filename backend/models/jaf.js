import mongoose from "mongoose";

const HrContactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  designation: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  phone: {
    type: String,
  }
});

const DesignationSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  stipend: {
    type: String,
  },
  ctc: {
    type: String,
  },
});

const JobAnnouncementFormSchema = new mongoose.Schema({
  recruiterId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recruiter',
  },
  organizationName: {
    type: String,
  },
  websiteUrl: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Government', 'PSU', 'Private', 'MNC', 'Startup', 'NGO']
  },
  sector: {
    type: String,
    enum: ['Core Engineering', 'IT', 'R&D', 'Analytics', 'Finance', 'Marketing', 'Networking', 'Educational',"Others"]
  },
  placementType: {
    type: [String],
    enum: ['Virtual Placement', 'Campus Placement']
  },

  bTechPrograms: {
    type:[String],
    enum:['Computer Science & Engineering','Electronics & Communication Engineering','Instrumentation and Control Engineering','Electrical Engineering','Information Technology','Biotechnology','Chemical Engineering','Civil Engineering','Industrial & Production Engineering','Mechanical Engineering','Textile Technology'],
  },
  
  mTechPrograms: {
   type:[String],
   enum:["Computer Science & Engineering", "Information Security","Electronics & Communication Engineering", "VLSI Design","Machine Intelligence and Automation","Artificial Intelligence","Biotechnology","Chemical Engineering","Structural and Construction Engineering","Geotechnical -GEO-Environmental Engineering","Industrial Engineering","Manufacturing Technology","Design Engineering","Thermal Engineering","Renewable Energy","Textile Engineering & Management"] 
  },
  
  mbaProgramSpecializations: {
    type: [String],
    enum: ['Finance','Marketing','HR']
  },
  
  scienceStreamsSpecializations: {
    type: [String],
    enum:['Physics','Chemistry','Mathematics']
  },
  
  phdPrograms:{
    type: [String],
    enum:["Computer Science & Engineering",
    "Electronics & Communication Engineering",
    "Information Technology",
    "Electrical Engineering",
    "Instrumentation and Control Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Industrial and Production Engineering",
    "Textile Technology",
    "Humanities & Management",
    "Mathematics",
    "Physics",
    "Chemistry",]
  },
  requiredSkills: {
    type: String,
    required: true
  },

  designations: [DesignationSchema],

  jobLocation: {
    type: [String],
    enum: ['India', 'Abroad']
  },
  specificLocations: String,

  bond: {
    type:Boolean
  },

  selectionProcess:{
    type: [String],
    enum: [    "Short Listing from resume / Database",
      "CGPA",
      "Aptitude test",
      "Technical test",
      "Group Discussion/Activity",
      "Personal Interview",]
  },
  additionalSelectionDetails:{
    type:String
  },
  summerInternshipOpportunities:{
    type:Boolean,
  },
  hrContacts: [HrContactSchema],
  postalAddress:{
    type:String
  },
  approved_status:{
    type:Boolean
  }
}, {
  timestamps: true
});

const JobAnnouncementForm = mongoose.model('JobAnnouncementForm', JobAnnouncementFormSchema);

export default JobAnnouncementForm;