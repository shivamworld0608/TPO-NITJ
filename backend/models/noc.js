import mongoose from "mongoose";

const NOCSchema = new mongoose.Schema({
  studentId: { type: String, required: true }, // Student ID
  nocId: { type: String, required: true }, // NOC ID
  companyName: { type: String, required: true }, // Company name (in which the interns plan to apply)
  dateSubmitted: { type: Date, required: true }, // Date of application of NOC to CTP
  respondentEmail: { type: String, required: true }, // Respondent Email
  salutation: { type: String, enum: ['Mr.', 'Ms.'], required: true }, // Salutation
  studentName: { type: String, required: true }, // Name of the student
  rollNo: { type: String, required: true }, // Roll No.
  batch: { type: String },
  course: {
    type: String,
     enum:["B.Tech","M.Tech","MBA","M.Sc.","PHD","B.Sc.-B.Ed."]
  }, // Graduate in
  year: {
    type: String,
    enum: ['1st', '2nd', '3rd'],
  }, // Year
  semester: {
    type: String,
    enum: ['2nd', '4th', '6th'],
  }, // Semester
  department: {
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
    ],
    required: true,
  }, // Department
  internshipFrom: { type: Date, required: true }, // Internship start date
  internshipTo: { type: Date, required: true }, // Internship end date
  internshipDuration: {
    type: String,
    enum: [
      'more than 30 days',
      'more than 30 days and less than 45 days',
      'more than 45 days less than 60 days',
      'more than 60 days'
    ],
    required: true,
  }, // Days (total internship days)
  contactPersonName: { type: String, required: true }, // Name of contact person from company
  contactPersonDesignation: { type: String, required: true }, // Designation
  contactPersonPhone: { type: String, required: true }, // Contact No.
  contactPersonEmail: { type: String, required: true }, // Email

  offerLetter: { type: String }, // Offer Letter
}, { timestamps: true });

const NOC = mongoose.model('NOC', NOCSchema);
export default NOC;
