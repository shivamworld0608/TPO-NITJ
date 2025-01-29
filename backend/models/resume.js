import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true, 
        required: true 
    },
    name: {
        type:String,
        required:true,
    },
    contact: {
      github: String,
      linkedin: String,
      email: String,
      phone: String,
    },
    education: [{
      institution: String,
      location: String,
      degree: String,
      percentage: String,
      duration: String,
    }],
    experience: [{
      title: String,
      company: String,
      description: [String],
      techStack: [String],
      duration: String,
    }],
    projects: [{
      name: String,
      description: [String],
      techStack: [String],
      link: String,
    }],
    skills: [{
      category: String,
      skills:[String],
    }],
    achievements: [{
      title: String,
      description: String,
      link:String,
    }],
    interests: [String],
    coursework: [String],
    responsibilities: [{
      role: String,
      description: String,
    }]
  });
  
const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;