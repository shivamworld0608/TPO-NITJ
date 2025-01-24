import mongoose from 'mongoose';

const hrContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

const designationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ctc: { type: String, required: true }
});

const programSelectionSchema = new mongoose.Schema({
  programName: { type: String, required: true },
  isSelected: { type: Boolean, default: false },
  specializations: [{
    name: { type: String },
    isSelected: { type: Boolean, default: false }
  }]
});

const jobAnnouncementSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Government', 'PSU', 'Private', 'MNC', 'Startup', 'NGO']
  },
  sector: { 
    type: String, 
    required: true,
    enum: ['Core Engineering', 'IT', 'R&D', 'Analytics', 'Finance', 'Marketing', 'Networking', 'Educational']
  },
  participationType: {
    virtualPlacement: { type: Boolean, default: false },
    campusPlacement: { type: Boolean, default: false }
  },

  selectedPrograms: {
    btech: [programSelectionSchema],
    mtech: [programSelectionSchema],
    mba: [programSelectionSchema],
    msc: [programSelectionSchema]
  },

  skillSetRequired: { type: String, required: true },

  designations: [designationSchema],
  jobLocation: {
    india: { type: Boolean, default: false },
    abroad: { type: Boolean, default: false },
    locations: [String]
  },
  bond: {
    required: { type: Boolean, default: false },
    details: String
  },
  selectionProcess: {
    shortlisting: { type: Boolean, default: false },
    cgpa: { type: Boolean, default: false },
    aptitudeTest: { type: Boolean, default: false },
    technicalTest: { type: Boolean, default: false },
    groupDiscussion: { type: Boolean, default: false },
    personalInterview: { type: Boolean, default: false },
    additionalDetails: String
  },
  summerInternshipOffered: { type: Boolean, default: false },

  hrContacts: [hrContactSchema],

  signature: { type: String },

  academicYear: { type: String, required: true },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'approved', 'rejected'],
    default: 'draft'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add pre-save middleware to update the updatedAt field
jobAnnouncementSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const JobAnnouncement = mongoose.model('JobAnnouncement', jobAnnouncementSchema);
export default JobAnnouncement;