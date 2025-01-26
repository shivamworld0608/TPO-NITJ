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
    enum: ['Core Engineering', 'IT', 'R&D', 'Analytics', 'Finance', 'Marketing', 'Networking', 'Educational']
  },
  placementType: {
    type: [String],
    enum: ['Virtual Placement', 'Campus Placement']
  },

  bTechPrograms: [{
    type:[String],
    enum:['Computer Science & Engineering','Electronics & Communication Engineering','Instrumentation and Control Engineering','Electrical Engineering','Information Technology','Biotechnology','Chemical Engineering','Civil Engineering','Industrial & Production Engineering','Mechanical Engineering','Textile Technology'],
  }],
  
  mTechPrograms: {
   type:[String],
  /*  enum:['Computer Science & Engineering','Information Security','Data Science','Artificial Intelligence','Signal Processing and Machine Learning','VLSI Design','Electric Vehicle Design','Data Analytics','Biotechnology','Chemical Engineering','Structural and Construction Engineering','Geotechnical – GEO-Environmental Engineering','Industrial Engineering & Data Analytics',''] */
  },
  
  mbaProgramSpecializations: {
    type: [String],
    enum: ['Finance','Marketing','HR']
  },
  
  scienceStreamsSpecializations: {
    type: [String],
    enum:['Physics','Chemistry','Mathematics']
  },
  
  phdProgramSpecializations:{
    type: [String],
  /*   enum:[] */
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
    /* enum: ['Written Test', 'Interview', 'Group Discussion'] */
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