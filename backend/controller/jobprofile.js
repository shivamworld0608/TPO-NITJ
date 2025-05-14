import JobProfile from "../models/jobprofile.js";
import Student from "../models/user_model/student.js";
import Professor from "../models/user_model/professor.js";
import Recuiter from "../models/user_model/recuiter.js";
import FormSubmission from '../models/FormSubmission.js';
import FormTemplate from '../models/FormTemplate.js';
import Placement from '../models/placement.js';
import Internship from "../models/internship.js";
import Notification from "../models/notification.js"; 
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Feedback from "../models/Feedback.js";
import JobAnnouncementForm from "../models/jaf.js";
import axios from "axios";
import OfferTracker from "../models/offertracker.js";
import Recruiter from "../models/user_model/recuiter.js";
import GuestHouseBooking from "../models/travel_planner/room.js";
import VehicleRequisition from "../models/travel_planner/vehicle.js";


export const getAllCompanies = async (req, res) => {
  try {
    const companiesFromJobProfiles = await JobProfile.find().select('company_name -_id'); // Fetch only company_name, exclude _id
    const companiesFromRecruiters = await Recuiter.find().distinct('company'); // Fetch unique company names from Recuiter model

    // Combine and send unique company names
    const allCompanies = [...new Set([...companiesFromJobProfiles.map(company => company.company_name), ...companiesFromRecruiters])];

    res.status(200).json(allCompanies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// export const createJobProfilecopy = async (req, res) => {
//   try {
//     const recruiter_id = req.user.userId;
//     const {
//       job_id,
//       company_name,
//       company_logo,
//       job_role,
//       jobdescription,
//       joblocation,
//       job_type,
//       job_category,
//       ctc,
//       base_salary,
//       deadline,
//       Hiring_Workflow,
//       department_allowed,
//       gender_allowed,
//       eligible_batch,
//       minimum_cgpa,
//       course_allowed,
//       active_backlogs,
//       history_backlogs,
//     } = req.body;

//     const tpo= await Professor.findById(recruiter_id);
//     let Approved_Status;
//     if(tpo){
//       Approved_Status=true;
//     }
//     else{
//       Approved_Status=false;
//     }
//     const processedWorkflow = Hiring_Workflow.map(step => {
//       const processedStep = {
//         step_type: step.step_type,
//         details: {},
//         eligible_students: step.eligible_students || [],
//         shortlisted_students: step.shortlisted_students || []
//       };

//       switch (step.step_type) {
//         case 'OA':
//           processedStep.details = {
//             oa_date: step.details?.oa_date || '',
//             oa_login_time: step.details?.oa_login_time || '',
//             oa_duration: step.details?.oa_duration || '',
//             oa_info: step.details?.oa_info || '',
//             oa_link: [],
//           };
//           break;

//         case 'Interview':
//           processedStep.details = {
//             interview_type: step.details?.interview_type || '',
//             interview_date: step.details?.interview_date || '',
//             interview_time: step.details?.interview_time || '',
//             interview_info: step.details?.interview_info || '',
//             interview_link: [],
//           };
//           break;

//         case 'GD':
//           processedStep.details = {
//             gd_date: step.details?.gd_date || '',
//             gd_time: step.details?.gd_time || '',
//             gd_info: step.details?.gd_info || '',
//             gd_link: [],
//           };
//           break;

//         case 'Others':
//           processedStep.details = {
//             others_round_name:step.details?.others_round_name||'',
//             others_date: step.details?.others_date || '',
//             others_login_time: step.details?.others_login_time || '',
//             others_duration: step.details?.others_duration || '',
//             others_info: step.details?.others_info || '',
//             others_link:[],
//           };
//           break;

//         case 'Resume Shortlisting':
//           processedStep.details = {};
//           break;

//         default:
//           throw new Error(`Invalid step type: ${step.step_type}`);
//       }
//       return processedStep;
//     });

//     let job_class;
//     if (ctc < 5) {
//       job_class = "Below Dream";
//     } else if (ctc >= 5 && ctc < 12) {
//       job_class = "Dream";
//     } else if (ctc >= 12) {
//       job_class = "Super Dream";
//     } else {
//       throw new Error("Invalid CTC value");
//     }

//     const jobProfile = new JobProfile({
//       recruiter_id,
//       job_id,
//       company_name,
//       company_logo,
//       job_role,
//       jobdescription,
//       joblocation,
//       job_type,
//       job_category,
//       job_salary: {
//         ctc,
//         base_salary
//       },
//       Hiring_Workflow: processedWorkflow,
//       eligibility_criteria: {
//         department_allowed,
//         gender_allowed,
//         eligible_batch,
//         minimum_cgpa,
//         active_backlogs,
//         history_backlogs,
//         course_allowed
//       },
//       job_class,
//       deadline,
//       Approved_Status,
//     });

//     const savedProfile = await jobProfile.save();

//     const notification = new Notification({
//       type: "JOB_CREATED",
//       message: `New job profile created for ${company_name} - ${job_role}`,
//       jobId: savedProfile._id,
//     });

//     await notification.save();

//     return res.status(201).json({ 
//       message: "Job profile created successfully!", 
//       data: savedProfile 
//     });

//   } catch (error) {
//     console.error("Error creating job profile:", error);
//     return res.status(500).json({ 
//       message: "Failed to create job profile.", 
//       error: error.message 
//     });
//   }
// };
// export const createJobProfilecopy = async (req, res) => {
//   try {
//     // Extract recruiter ID from authenticated user
//     const recruiter_id = req.user.userId;

//     // Destructure request body
//     const {
//       job_id,
//       company_name,
//       company_logo,
//       job_role,
//       jobdescription,
//       joblocation,
//       job_type,
//       job_category,
//       ctc,
//       base_salary,
//       deadline,
//       Hiring_Workflow,
//       eligibility_criteria,
//     } = req.body;

//     // Check if the recruiter is a TPO (Professor)
//     const tpo = await Professor.findById(recruiter_id);
//     const Approved_Status = !!tpo;

//     // Process Hiring Workflow
//     const processedWorkflow = Hiring_Workflow.map((step) => {
//       const processedStep = {
//         step_type: step.step_type,
//         details: {},
//         eligible_students: step.eligible_students || [],
//         absent_students: [], // Added to match schema
//         shortlisted_students: step.shortlisted_students || [],
//       };

//       switch (step.step_type) {
//         case "OA":
//           processedStep.details = {
//             oa_date: step.details?.oa_date || "",
//             oa_login_time: step.details?.oa_login_time || "",
//             oa_duration: step.details?.oa_duration || "",
//             oa_info: step.details?.oa_info || "",
//             oa_link: [],
//           };
//           break;

//         case "Interview":
//           processedStep.details = {
//             interview_type: step.details?.interview_type || "",
//             interview_date: step.details?.interview_date || "",
//             interview_time: step.details?.interview_time || "",
//             interview_info: step.details?.interview_info || "",
//             interview_link: [],
//           };
//           break;

//         case "GD":
//           processedStep.details = {
//             gd_date: step.details?.gd_date || "",
//             gd_time: step.details?.gd_time || "",
//             gd_info: step.details?.gd_info || "",
//             gd_link: [],
//           };
//           break;

//         case "Others":
//           processedStep.details = {
//             others_round_name: step.details?.others_round_name || "",
//             others_date: step.details?.others_date || "",
//             others_login_time: step.details?.others_login_time || "",
//             others_duration: step.details?.others_duration || "",
//             others_info: step.details?.others_info || "",
//             others_link: [],
//           };
//           break;

//         case "Resume Shortlisting":
//           processedStep.details = {};
//           break;

//         default:
//           // Log unknown step type but continue processing
//           console.warn(`Unknown step type: ${step.step_type}`);
//           processedStep.details = step.details || {};
//       }
//       return processedStep;
//     });

//     // Determine job_class based on CTC
//     let job_class;
//     if (ctc < 5) {
//       job_class = "Below Dream";
//     } else if (ctc >= 5 && ctc < 12) {
//       job_class = "Dream";
//     } else if (ctc >= 12) {
//       job_class = "Super Dream";
//     } else {
//       job_class = "Below Dream"; // Default for invalid/undefined CTC
//     }

//     // Create new JobProfile
//     const jobProfile = new JobProfile({
//       recruiter_id,
//       job_id: job_id || "",
//       company_name: company_name || "",
//       company_logo: company_logo || "",
//       job_role: job_role || "",
//       jobdescription: jobdescription || "",
//       joblocation: joblocation || "",
//       job_type: job_type || "",
//       job_category: job_category || "",
//       job_salary: {
//         ctc: ctc || 0,
//         base_salary: base_salary || "",
//       },
//       Hiring_Workflow: processedWorkflow || [],
//       eligibility_criteria: eligibility_criteria || [], // Store as array of objects
//       job_class,
//       deadline: deadline || new Date(),
//       Approved_Status,
//       Applied_Students: [], // Initialize empty array
//       completed: false,
//       visibility: true,
//       recruiter_editing_allowed: false,
//       auditLogs: [], // Initialize empty array
//     });

//     // Save JobProfile to database
//     const savedProfile = await jobProfile.save();

//     // Create and save notification
//     const notification = new Notification({
//       type: "JOB_CREATED",
//       message: `New job profile created for ${company_name || "Unknown Company"} - ${job_role || "Unknown Role"}`,
//       jobId: savedProfile._id,
//     });
//     await notification.save();

//     return res.status(201).json({
//       message: "Job profile created successfully!",
//       data: savedProfile,
//     });
//   } catch (error) {
//     console.error("Error creating job profile:", {
//       message: error.message,
//       stack: error.stack,
//     });
//     return res.status(500).json({
//       message: "Failed to create job profile.",
//       error: error.message,
//     });
//   }
// };

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email to a single student
const sendEmailToStudent = async (student, jobProfile) => {
    const deadlineDateTime = new Date(jobProfile.deadline).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short", 
    timeZone: "Asia/Kolkata", 
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: student.email,
    subject: `New Job Opportunity: ${jobProfile.job_role} at ${jobProfile.company_name}`,
    html: `
      <h3>Dear ${student.name},</h3>
      <p>We are excited to inform you about a new job opportunity!</p>
      <p><strong>Company:</strong> ${jobProfile.company_name}</p>
      <p><strong>Job Role:</strong> ${jobProfile.job_role}</p>
      <p><strong>Location:</strong> ${jobProfile.joblocation}</p>
      <p><strong>CTC:</strong> ${jobProfile.job_salary.ctc} LPA</p>
      <p><strong>Deadline to Apply:</strong> ${deadlineDateTime}</p>
      <p>Please login to <a href="https://ctp.nitj.ac.in">TPO NITJ Portal</a> to apply and view more details.</p>
      <p>Best regards,<br>TPO-NITJ</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${student.email}`);
  } catch (error) {
    console.error(`Failed to send email to ${student.email}:`, error);
  }
};
export const createJobProfilecopy = async (req, res) => {
  try {
    // Extract recruiter ID from authenticated user
    const recruiter_id = req.user.userId;

    // Destructure request body
    const {
      job_id,
      company_name,
      company_logo,
      job_role,
      jobdescription,
      joblocation,
      job_type,
      internship_duration,
      job_category,
      job_sector,
      ctc,
      base_salary,
      stipend,
      deadline,
      Hiring_Workflow,
      eligibility_criteria,
    } = req.body;

    // Check if the recruiter is a TPO (Professor)
    const tpo = await Professor.findById(recruiter_id);
    const Approved_Status = !!tpo;

    // Process Hiring Workflow
    const processedWorkflow = Hiring_Workflow.map((step) => {
      const processedStep = {
        step_type: step.step_type,
        details: {},
        eligible_students: step.eligible_students || [],
        absent_students: [], // Added to match schema
        shortlisted_students: step.shortlisted_students || [],
      };

      switch (step.step_type) {
        case "OA":
          processedStep.details = {
            oa_date: step.details?.oa_date || "",
            oa_login_time: step.details?.oa_login_time || "",
            oa_duration: step.details?.oa_duration || "",
            oa_info: step.details?.oa_info || "",
            oa_link: [],
          };
          break;

        case "Interview":
          processedStep.details = {
            interview_type: step.details?.interview_type || "",
            interview_date: step.details?.interview_date || "",
            interview_time: step.details?.interview_time || "",
            interview_info: step.details?.interview_info || "",
            interview_link: [],
          };
          break;

        case "GD":
          processedStep.details = {
            gd_date: step.details?.gd_date || "",
            gd_time: step.details?.gd_time || "",
            gd_info: step.details?.gd_info || "",
            gd_link: [],
          };
          break;

        case "Others":
          processedStep.details = {
            others_round_name: step.details?.others_round_name || "",
            others_date: step.details?.others_date || "",
            others_login_time: step.details?.others_login_time || "",
            others_duration: step.details?.others_duration || "",
            others_info: step.details?.others_info || "",
            others_link: [],
          };
          break;

        case "Resume Shortlisting":
          processedStep.details = {};
          break;

        default:
          console.warn(`Unknown step type: ${step.step_type}`);
          processedStep.details = step.details || {};
      }
      return processedStep;
    });

    // Determine job_class based on CTC
    let job_class;
    if (ctc < 5) {
      job_class = "Below Dream";
    } else if (ctc >= 5 && ctc < 12) {
      job_class = "Dream";
    } else if (ctc >= 12) {
      job_class = "Super Dream";
    } else {
      job_class = "Below Dream"; // Default for invalid/undefined CTC
    }
   console.log(job_class);
    // Create new JobProfile
    const jobProfile = new JobProfile({
      recruiter_id,
      job_id: job_id || "",
      company_name: company_name || "",
      company_logo: company_logo || "",
      job_role: job_role || "",
      jobdescription: jobdescription || "",
      joblocation: joblocation || "",
      job_type: job_type || "",
      internship_duration: internship_duration || "N/A",
      job_category: job_category || "",
      job_sector: job_sector || "Private",
      job_salary: {
        ctc: ctc || 0,
        base_salary: base_salary || "",
        stipend: stipend || "",
      },
      Hiring_Workflow: processedWorkflow || [],
      eligibility_criteria: eligibility_criteria || [],
      job_class,
      deadline: deadline || new Date(),
      Approved_Status,
      Applied_Students: [],
      completed: false,
      visibility: true,
      recruiter_editing_allowed: false,
      auditLogs: [],
    });

    // Save JobProfile to database
    const savedProfile = await jobProfile.save();

    //sending mail to eligible students
    const eligibleStudents = await Promise.all(
      eligibility_criteria.map(async (criteria) => {
        const query = {
          course: criteria.course_allowed,
          department: { $in: criteria.department_allowed },
          batch: criteria.eligible_batch,
          // active_backlogs: criteria.active_backlogs,
          // backlogs_history: criteria.history_backlogs,
          // cgpa: { $gte: criteria.minimum_cgpa },
          // account_deactivate: false,
        };
        return await Student.find(query).select("name email");
      })
    );

    // Flatten the array of students and remove duplicates (if any)
    const uniqueStudents = [];
    const studentEmails = new Set();
    eligibleStudents.flat().forEach((student) => {
      if (!studentEmails.has(student.email)) {
        studentEmails.add(student.email);
        uniqueStudents.push(student);
      }
    });

    // Send email to each eligible student
    await Promise.all(
      uniqueStudents.map(async (student) => {
        await sendEmailToStudent(student, savedProfile);
      })
    );

    // Create and save notification
    const notification = new Notification({
      type: "JOB_CREATED",
      message: `New job profile created for ${company_name || "Unknown Company"} - ${job_role || "Unknown Role"}`,
      jobId: savedProfile._id,
    });
    await notification.save();

    return res.status(201).json({
      message: "Job profile created successfully!",
      data: savedProfile,
    });
  } catch (error) {
    console.error("Error creating job profile:", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({
      message: "Failed to create job profile.",
      error: error.message,
    });
  }
};


export const getJobsByRecruiter = async (req, res) => {
  try {
/*     const recruiterId = req.user.userId; */
    const company = req.params.company;
    const jobs = await JobProfile.find({company_name: company });
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const toggleEditingAllowed = async (req, res) => {
  try {
    const {_id}=req.body;
    const job = await JobProfile.findById(_id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job Profile not found" });
    }
    job.recruiter_editing_allowed = !job.recruiter_editing_allowed;
    await job.save();
    res.status(200).json({ 
      success: true, 
      editing_allowed: job.recruiter_editing_allowed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getEditingAllowedStatus = async (req, res) => {
  try {
    const company=req.params.company;
    const recruiter = await Recuiter.findOne({ company });
    if (!recruiter) {
      return res.status(404).json({ success: false, message: "Recruiter not found" });
    }
    res.status(200).json({ success: true, editing_allowed: recruiter.editing_allowed  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { _id } = req.params;
    console.log(_id);
    const recruiter = await Recuiter.findById(userId);
    const professor = await Professor.findById(userId);
    const user = recruiter || professor;
    const job = await JobProfile.findById(_id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const oldJob = job.toObject();
    const updateData = req.body;

    // This function compares only the keys in newObj (updateData).
    const detectNestedChanges = (oldObj, newObj) => {
      let diff = {};

      Object.keys(newObj).forEach(key => {
        const oldValue = oldObj ? oldObj[key] : undefined;
        const newValue = newObj[key];

        // If both values are arrays, compare added/removed items.
        if (Array.isArray(newValue) && Array.isArray(oldValue)) {
          const added = newValue.filter(item => !oldValue.includes(item));
          const removed = oldValue.filter(item => !newValue.includes(item));
          if (added.length > 0 || removed.length > 0) {
            diff[key] = { added, removed };
          }
        }
        // If both values are objects (but not arrays), compare recursively.
        else if (
          newValue &&
          typeof newValue === 'object' &&
          !Array.isArray(newValue)
        ) {
          const nestedDiff = detectNestedChanges(oldValue, newValue);
          if (Object.keys(nestedDiff).length > 0) {
            diff[key] = nestedDiff;
          }
        }
        // For all other types, log the change if values differ.
        else if (oldValue !== newValue) {
          diff[key] = { oldValue, newValue };
        }
      });

      return diff;
    };

    // Compute differences only for the fields present in updateData.
    const changes = detectNestedChanges(oldJob, updateData);

    if (Object.keys(changes).length > 0) {
      // Update the job document.
      const updatedJob = await JobProfile.findByIdAndUpdate(
        _id,
        updateData,
        { new: true }
      );

      // Log only the actual changes.
      updatedJob.auditLogs.push({
        editedBy: user._id,
        email: user.email,
        changes,
        timestamp: new Date(),
      });

      await updatedJob.save();
    }

    res.status(200).json({ 
      success: true, 
      message: 'Job updated successfully', 
      job: await JobProfile.findById(_id) 
    });
  } catch (error) {
    console.error('Error updating job:', error.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


export const deleteJob = async (req, res) => {
  try {
    const { _id } = req.params;
    await JobProfile.findByIdAndDelete(_id);
    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const getJobProfiletostudent = async (req, res) => {
  try {
    const studentId = req.user.userId;
    if (!studentId) {
      return res.status(400).json({ message: "User ID is missing in the request." });
    }
    const student = await Student.findById({_id:studentId});
    let batch;
    try {
      const rollNumbers = [student.rollno];
      const course = student.course;
      const response = await axios.post(`${process.env.ERP_SERVER}`, rollNumbers);
      const erpStudents = response.data.data;
      const erpData = erpStudents[0];
      const erpBatch = erpData.batch;
      const courseDurations = {
        "B.Tech": 4,
        "M.Tech": 2,
        "B.Sc.-B.Ed.": 4,
        "MBA": 2,
        "M.Sc.": 2
        };
       const adjustment = courseDurations[course] || 0; // Default to 0 if course not found
       const adjustedBatch = String(Number(erpBatch) + adjustment);
      batch = adjustedBatch;
    } catch (erpError) {
      console.error("ERP server error, falling back to database batch:", erpError);
      batch = student.batch;
    }
    const JobProfiles = await JobProfile.find({
      Approved_Status: true,
      'eligibility_criteria.eligible_batch': batch
  });
  
    const applied = [];
    const notApplied = [];
    const liveButNotApplied = [];

    const currentDate = new Date();

    JobProfiles.forEach((job) => {
      const isApplied = job.Applied_Students.includes(studentId);
      const isLive = new Date(job.deadline) > currentDate;

      if (isApplied) {
        applied.push(job);
      } else if (!isApplied && isLive) {
        liveButNotApplied.push(job);
      } else {
        notApplied.push(job);
      }
    });

    return res.status(200).json({
      applied,
      notApplied,
      liveButNotApplied,
    });
  } catch (error) {
    console.error("Error fetching job status:", error);
    return res.status(500).json({ message: "An error occurred while fetching job status." });
  }
};

export const getJobProfiledetails = async (req, res) => {
  try {
    const { _id } = req.params;
    const job = await JobProfile.findById(_id);
    res.status(200).json({job});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getJobProfilesForProfessors = async (req, res) => {
  try {
    const approvedJobs = await JobProfile.find({ Approved_Status: true, completed:false });
    const notApprovedJobs = await JobProfile.find({ Approved_Status: false });
    const completed= await JobProfile.find({completed:true});
    const feedbacks = await Feedback.find({});
    const feedbackByCompany = feedbacks.reduce((acc, feedback) => {
      acc[feedback.company] = feedback;
      return acc;
    }, {});

   const jafs = await JobAnnouncementForm.find({});
    const jafByCompany = jafs.reduce((acc, jaf) => {
      acc[jaf.organizationName] = jaf;
      return acc;
    }, {});
    const guestHouseBookings = await GuestHouseBooking.find({}).sort({ updatedAt: -1 });
    const vehicleRequisitions = await VehicleRequisition.find({}).sort({ updatedAt: -1 });
    res.status(200).json({
      approved: approvedJobs,
      notApproved: notApprovedJobs,
      completed:completed,
      feedbackByCompany,
      jafByCompany,
      guestHouseBookings,
      vehicleRequisitions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getspecificJobProfilesForProfessors = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await JobProfile.findById(id);
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveJobProfile = async (req, res) => {
  try {
    const { _id } = req.params;
 
    const approvedJob = await JobProfile.findByIdAndUpdate(
      _id,
      { Approved_Status: true },
      { new: true }
    );
    if (!approvedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job approved successfully", approvedJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const completedJobProfile = async (req, res) => {
  try {
    const { _id } = req.params;
    const completedJob = await JobProfile.findByIdAndUpdate(
      _id,
      { completed: true },
      { new: true }
    );
    if (!completedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job completed successfully", completedJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const incompletedJobProfile = async (req, res) => {
  try {
    const { _id } = req.params;
    const incompletedJob = await JobProfile.findByIdAndUpdate(
      _id,
      { completed: false },
      { new: true }
    );
    if (!incompletedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job incompleted successfully", incompletedJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const rejectJobProfile = async (req, res) => {
  try {
    const {_id } = req.params;
    const deletedJob = await JobProfile.findByIdAndDelete(_id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job application deleted successfully", deletedJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// export const checkEligibility = async (req, res) => {
//   try {
//     const studentId = req.user.userId;
//     const { _id } = req.params;
//     const student = await Student.findById({_id:studentId});
//     const job = await JobProfile.findById(_id);
//     if (!student || !job) {
//       return res.status(404).json({ message: "Student or Job Application not found" });
//     }

//     let updatedStudent;
//     try {
//       const rollNumbers = [student.rollno];
//       const course = student.course;
//       const response = await axios.post(`${process.env.ERP_SERVER}`, rollNumbers);
//       const erpStudents = response.data.data;
//       const erpData = erpStudents[0];
//       const erpBatch = erpData.batch;
//       const courseDurations = {
//         "B.Tech": 4,
//         "M.Tech": 2,
//         "B.Sc.-B.Ed.": 4,
//         "MBA": 2,
//         "M.Sc.": 2
//         };
//        const adjustment = courseDurations[course] || 0; // Default to 0 if course not found
//        const adjustedBatch = String(Number(erpBatch) + adjustment);
//       updatedStudent = {
//         ...student.toObject(),
//         cgpa: erpData.cgpa,
//         batch: adjustedBatch,
//         active_backlogs: erpData.active_backlogs === 'true',  // Convert string to boolean
//         backlogs_history: erpData.backlogs_history === 'true' // Convert string to boolean
//       };
//     } catch (erpError) {
//       console.error("ERP server error, falling back to database data:", erpError);
//       updatedStudent = student.toObject();
//     }

//     const {
//       department_allowed,
//       course_allowed,
//       gender_allowed,
//       eligible_batch,
//       minimum_cgpa,
//       active_backlogs,
//       history_backlogs,
//     } = job.eligibility_criteria;

//     if (!department_allowed.includes(updatedStudent.department)) {
//       return res.json({ eligible: false, reason: "Department not eligible" });
//     }

//     if (gender_allowed !== "Any" && gender_allowed !== updatedStudent.gender) {
//       return res.json({ eligible: false, reason: "Gender not eligible" });
//     }

//     if (course_allowed && course_allowed !== updatedStudent.course) {
//       return res.json({ eligible: false, reason: "Course not eligible" });
//     }
//     if (eligible_batch && eligible_batch !== updatedStudent.batch) {
//       return res.json({ eligible: false, reason: "Batch not eligible" });
//     }

//     if (minimum_cgpa && updatedStudent.cgpa < minimum_cgpa) {
//       return res.json({ eligible: false, reason: "CGPA below required minimum" });
//     }

//     if (active_backlogs !== undefined) {
//       if (active_backlogs === false && updatedStudent.active_backlogs !== false) {
//         return res.json({ eligible: false, reason: "Active backlogs do not meet criteria" });
//       }
//     }
    
//     if (history_backlogs !== undefined) {
//       if (history_backlogs === false && updatedStudent.backlogs_history !== false) {
//         return res.json({ eligible: false, reason: "Backlogs History do not meet criteria" });
//       }
//     }
//    const jobType = job.job_type;
//     const isInternship = ['2m Intern', '6m Intern', '11m Intern', 'Intern+PPO', 'Intern+FTE'].includes(jobType);
//     const isPlacement = jobType === 'FTE' || jobType === 'Intern+FTE';

//     if(isInternship){
//       if(student.internshipstatus!=="No Intern"){
//         return res.json({ eligible: false, reason: "Already You have Internship" });
//       }
//     }

//    if(isPlacement){
//     const jobClassOrder = ["notplaced", "Below Dream", "Dream", "Super Dream"];
//     const studentClassIndex = jobClassOrder.indexOf(updatedStudent.placementstatus);
//   /*   const jobClassIndex = jobClassOrder.indexOf(job.job_class); */
//   let jobClassIndex;
//      if(job.ctc>=20){
//        jobClassIndex = 3;
//      }
//      else if(job.ctc<4.5){
//        jobClassIndex = 0;
//      }
//      else if((student.course=="B.Tech"|| student.course=="M.Tech") && (student.department=="COMPUTER SCIENCE AND ENGINEERING"||student.department=="INFORMATION TECHNOLOGY")){
//        if(job.ctc>=10 && job.ctc<20){
//          jobClassIndex = 2;
//        }
//        else{
//          jobClassIndex = 1;
//        }
//      }
//      else if((student.course=="B.Tech"|| student.course=="M.Tech") && (student.department=="ELECTRONICS AND COMMUNICATION ENGINEERING"|| student.department=="INSTRUMENTATION AND CONTROL ENGINEERING"||student.department=="ELECTRONICS AND VLSI ENGINEERING"||student.department=="ELECTRICAL ENGINEERING")){
//       if(job.ctc>=8 && job.ctc<20){
//         jobClassIndex = 2;
//       }
//       else{
//         jobClassIndex = 1;
//       }
//      }
//      else if(student.course=="B.Tech"|| student.course=="M.Tech"){
//       if(job.ctc>=6 && job.ctc<20){
//         jobClassIndex = 2;
//       }
//       else{
//         jobClassIndex = 1;
//       }
//      }
//      else if(student.course=="MBA"){
//       if(job.ctc>=5 && job.ctc<20){
//         jobClassIndex = 2;
//       }
//       else{
//         jobClassIndex = 1;
//       }
//      }
//      else if(student.course=="M.Sc."){
//       if(job.ctc>=6 && job.ctc<20){
//         jobClassIndex = 2;
//       }
//       else{
//         jobClassIndex = 1;
//       }
//      }
     
//     if (
//       studentClassIndex !== -1 &&
//       updatedStudent.placementstatus !== "notplaced" &&
//       jobClassIndex <= studentClassIndex
//     ) {
//       return res.json({
//         eligible: false,
//         reason: "Student can only apply for higher job categories than their current placement status",
//       });
//     }
//    }
//     const currentDate = new Date();
//     const isDeadlineOver = job.deadline && currentDate > job.deadline;
//     const hasApplied = job.Applied_Students.includes(studentId);
//     return res.json({ eligible: true, reason: "Eligible to apply", applied: hasApplied,isDeadlineOver });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


function checkEligible(offerHistory, targetOfferType, targetCategory,jobSector) {
  const eligibilityMatrix = {
    'Below Dream': {
      'Intern':{
        'Below Dream': [],
        "Dream": ['Intern+FTE', 'FTE'],
        "Super Dream": ['Intern+FTE', 'FTE']
      },
      'Intern+PPO': {
        'Below Dream': [],
        "Dream": ['Intern+FTE', 'FTE'],
        "Super Dream": ['Intern+FTE', 'FTE']
      },
      'FTE': {
        'Below Dream': [],
        "Dream": ['Intern+FTE', 'FTE'],
        "Super Dream": ["Intern+FTE", 'FTE']
      },
      'Intern+FTE': {
        'Below Dream': [],
        "Dream": ['Intern+FTE', 'FTE'],
        "Super Dream": ['Intern+FTE', 'FTE']
      }
    },
    "Dream": {
      'Intern+PPO': {
        'Below Dream': [],
        "Dream": ["FTE"],
        "Super Dream": ['Intern+FTE', 'FTE', 'Intern+PPO']
      },
      'FTE': {
        'Below Dream': [],
        "Dream": [],
        "Super Dream": ['Intern+FTE', 'FTE', 'Intern+PPO']
      },
      'Intern+FTE': {
        'Below Dream': [],
        "Dream": [],
        "Super Dream": ['Intern+FTE', 'FTE', 'Intern+PPO']
      }
    },
    "Super Dream": {
      'Intern+PPO': {
        'Below Dream': [],
        "Dream": ['FTE'],
        "Super Dream": ['FTE']
      },
      'FTE': {
        'Below Dream': [],
        "Dream": [],
        "Super Dream": []
      },
      'Intern+FTE': {
        'Below Dream': [],
        "Dream": [],
        "Super Dream": []
      }
    }
  };
      // Check if student has Intern+FTE or FTE offer in Super Dream category
  const hasSuperDreamOffer = offerHistory.some(
    offer => 
      (offer.offer_type === 'Intern+FTE' || offer.offer_type === 'FTE') &&
      offer.offer_category === 'Super Dream'
  );

  // If student has Super Dream Intern+FTE or FTE offer, they are ineligible
  if (hasSuperDreamOffer && jobSector === 'PSU' && targetCategory === 'Dream') {
    return "Not eligible";
  }

  // Bypass eligibility matrix check for PSU Dream jobs if no Super Dream Intern+FTE or FTE offer
  if (jobSector === 'PSU' && targetCategory === 'Dream') {
    return "Eligible";
  }
  console.log("no problem upto here",offerHistory);
  console.log(targetOfferType, targetCategory);
   // Iterate through all previous offers, and if any makes the student ineligible, return false
   for (const offer of offerHistory) {
    const { offer_type, offer_category } = offer;
    console.log(offer_type, offer_category);
    const eligibleOffers = (
      eligibilityMatrix?.[offer_category]?.[offer_type]?.[targetCategory] || []
    );
    if (!eligibleOffers.includes(targetOfferType)) {
      return "Not eligible";
    }
  }

  return "Eligible";
}


export const checkEligibility = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { _id } = req.params;
    const student = await Student.findById(studentId);
    const job = await JobProfile.findById(_id);
    if (!student || !job) {
      return res.status(404).json({ message: "Student or Job Application not found" });
    }

    let updatedStudent;
    try {
      const rollNumbers = [student.rollno];
      const course = student.course;
      const response = await axios.post(`${process.env.ERP_SERVER}`, rollNumbers);
      const erpStudents = response.data.data;
      const erpData = erpStudents[0];
      const erpBatch = erpData.batch;
      const courseDurations = {
        "B.Tech": 4,
        "M.Tech": 2,
        "B.Sc.-B.Ed.": 4,
        "MBA": 2,
        "M.Sc.": 2
      };
      const adjustment = courseDurations[course] || 0;
      const adjustedBatch = String(Number(erpBatch) + adjustment);
      updatedStudent = {
        ...student.toObject(),
        cgpa: erpData.cgpa,
        batch: adjustedBatch,
        active_backlogs: erpData.active_backlogs === 'true',
        backlogs_history: erpData.backlogs_history === 'true'
      };
    } catch (erpError) {
      console.error("ERP server error, falling back to database data:", erpError);
      updatedStudent = student.toObject();
    }

    const eligibilityCriteria = job.eligibility_criteria;
    let isEligible = false;
    let maxFailureDepth = -1; // Tracks the deepest failure across all criteria
    let deepestIneligibilityReason = "No matching eligibility criteria found";

    // Define the order of checks and their corresponding reasons
    const checkOrder = [
      { key: 'batch', reason: 'Batch not eligible' },
      { key: 'course', reason: 'Course not eligible' },
      { key: 'department', reason: 'Department not eligible' },
      { key: 'gender', reason: 'Gender not eligible' },
      { key: 'cgpa', reason: 'CGPA below required minimum' },
      { key: 'active_backlogs', reason: 'Active backlogs do not meet criteria' },
      { key: 'history_backlogs', reason: 'Backlogs history do not meet criteria' }
    ];

    for (const criteria of eligibilityCriteria) {
      const {
        department_allowed,
        course_allowed,
        gender_allowed,
        eligible_batch,
        minimum_cgpa,
        active_backlogs,
        history_backlogs
      } = criteria;

      let currentFailureDepth = -1;
      let currentIneligibilityReason = '';

      // Check eligibility in the defined order
      if (eligible_batch && eligible_batch !== updatedStudent.batch) {
        currentFailureDepth = 0; // Batch check failed
        currentIneligibilityReason = checkOrder[0].reason;
      } else if (course_allowed && course_allowed !== updatedStudent.course) {
        currentFailureDepth = 1; // Course check failed
        currentIneligibilityReason = checkOrder[1].reason;
      } else if (!department_allowed.includes(updatedStudent.department)) {
        currentFailureDepth = 2; // Department check failed
        currentIneligibilityReason = checkOrder[2].reason;
      } else if (gender_allowed !== "Any" && gender_allowed !== updatedStudent.gender) {
        currentFailureDepth = 3; // Gender check failed
        currentIneligibilityReason = checkOrder[3].reason;
      } else if (minimum_cgpa && updatedStudent.cgpa < minimum_cgpa) {
        currentFailureDepth = 4; // CGPA check failed
        currentIneligibilityReason = checkOrder[4].reason;
      } else if (active_backlogs !== undefined && active_backlogs === false && updatedStudent.active_backlogs !== false) {
        currentFailureDepth = 5; // Active backlogs check failed
        currentIneligibilityReason = checkOrder[5].reason;
      } else if (history_backlogs !== undefined && history_backlogs === false && updatedStudent.backlogs_history !== false) {
        currentFailureDepth = 6; // History backlogs check failed
        currentIneligibilityReason = checkOrder[6].reason;
      } else {
        isEligible = true;
        break;
      }
      if (currentFailureDepth > maxFailureDepth) {
        maxFailureDepth = currentFailureDepth;
        deepestIneligibilityReason = currentIneligibilityReason;
      }
    }

    if (!isEligible) {
      return res.json({ eligible: false, reason: deepestIneligibilityReason });
    }

    const studentOfferHistory=await OfferTracker.findOne({studentId});

    if(studentOfferHistory?.offer.length==2){
      return res.json({ eligible: false, reason: "You have already Two Offers" });
    }

    const hasPSUDreamOffer = studentOfferHistory?.offer?.some(o =>(o.offer_category === 'Dream' || o.offer_category === 'Super Dream') && o.offer_sector === 'PSU');
    if (hasPSUDreamOffer) {
      return res.json({ eligible: false, reason: "You have already PSU Dream Offer" });
    }
    
    const jobType = job.job_type;
    const jobSector = job.job_sector;
    let jobCategory=null;

    if(jobType === "Intern" || (jobType === "Intern+PPO" && job.job_salary.ctc==0 ) ){
      if(studentOfferHistory?.offer.length>0){
        return res.json({ eligible: false, reason: "You have already some Offer" });
      }
    }
    else{
      const jobClassOrder = ["Not Considered", "Below Dream", "Dream", "Super Dream"];
      let jobClassIndex;
      if (job.job_salary.ctc >= 20) {
        jobClassIndex = 3;
      } 
      else if (job.job_salary.ctc < 4.5) {
        jobClassIndex = 0;
      } 
      else if ((student.course === "B.Tech" || student.course === "M.Tech") && (student.department === "COMPUTER SCIENCE AND ENGINEERING" || student.department === "INFORMATION TECHNOLOGY"|| student.department ==="COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)" || student.department ==="DATA SCIENCE AND ENGINEERING" || student.department ==="ARTIFICIAL INTELLIGENCE"|| student.department==="DATA ANALYTICS")) {
        if (job.job_salary.ctc >= 10 && job.job_salary.ctc < 20) {
          jobClassIndex = 2;
        } else {
          jobClassIndex = 1;
        }
      }
      else if ((student.course === "B.Tech" || student.course === "M.Tech") && 
                 (student.department === "ELECTRONICS AND COMMUNICATION ENGINEERING" || 
                  student.department === "INSTRUMENTATION AND CONTROL ENGINEERING" || 
                  student.department === "ELECTRONICS AND VLSI ENGINEERING" || 
                  student.department === "ELECTRICAL ENGINEERING"||
                  student.department === "CONTROL AND INSTRUMENTATION ENGINEERING")) {
        if (job.job_salary.ctc >= 8 && job.job_salary.ctc < 20) {
          jobClassIndex = 2;
        } else {
          jobClassIndex = 1;
        }
      } else if (student.course === "B.Tech" || student.course === "M.Tech") {
        if (job.job_salary.ctc >= 6 && job.job_salary.ctc < 20) {
          jobClassIndex = 2;
        } else {
          jobClassIndex = 1;
        }
      } else if (student.course === "MBA") {
        if (job.job_salary.ctc >= 5 && job.job_salary.ctc < 20) {
          jobClassIndex = 2;
        } else {
          jobClassIndex = 1;
        }
      } else if (student.course === "M.Sc.") {
        if (job.job_salary.ctc >= 6 && job.job_salary.ctc < 20) {
          jobClassIndex = 2;
        } else {
          jobClassIndex = 1;
        }
      }
      jobCategory=jobClassOrder[jobClassIndex];
      const offerHistory = studentOfferHistory?.offer || [];
      const offerEligibility = checkEligible(offerHistory, jobType, jobCategory,jobSector);
      if (offerEligibility !== "Eligible") {
        return res.json({
          eligible: false,
          reason: "You are not eligible according to our Placement Policy",
        });
      }    
    }
     
    const currentDate = new Date();
    const isDeadlineOver = job.deadline && currentDate > job.deadline;
    const hasApplied = job.Applied_Students.includes(studentId);
    return res.json({ eligible: true, reason: "Eligible to apply", applied: hasApplied, isDeadlineOver });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const addshortlistStudents = async (req, res) => {
  try {
    const { jobId, stepIndex, students } = req.body;
    console.log(students);

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ error: 'Invalid job ID' });
    }

    const job = await JobProfile.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (stepIndex < 0 || stepIndex >= job.Hiring_Workflow.length) {
      return res.status(400).json({ error: 'Invalid step index' });
    }

    const step = job.Hiring_Workflow[stepIndex];
    if (!step) {
      return res.status(400).json({ error: 'Step not found' });
    }

    const studentIds = [];
    const absentIds = [];

    for (const student of students) {
      const studentId = student.studentId;

      if (student.absent) {
        if (step.shortlisted_students.includes(studentId)) {
          step.shortlisted_students = step.shortlisted_students.filter(
            (id) => id.toString() !== studentId.toString()
          );
        }
        if (!step.absent_students.includes(studentId)) {
          absentIds.push(studentId);
        }
        for (let i = stepIndex + 1; i < job.Hiring_Workflow.length; i++) {
          const nextStep = job.Hiring_Workflow[i];
          nextStep.eligible_students = nextStep.eligible_students.filter(
            (id) => id.toString() !== studentId.toString()
          );
          nextStep.shortlisted_students = nextStep.shortlisted_students.filter(
            (id) => id.toString() !== studentId.toString()
          );
          nextStep.absent_students = nextStep.absent_students.filter(
            (id) => id.toString() !== studentId.toString()
          );
        }
      } else if (student.shortlisted) {
        if (step.absent_students.includes(studentId)) {
          step.absent_students = step.absent_students.filter(
            (id) => id.toString() !== studentId.toString()
          );
        }
        if (!step.shortlisted_students.includes(studentId)) {
          studentIds.push(studentId);
        }
      } else {
        if (step.shortlisted_students.includes(studentId)) {
          step.shortlisted_students = step.shortlisted_students.filter(
            (id) => id.toString() !== studentId.toString()
          );
        }
        if (step.absent_students.includes(studentId)) {
          step.absent_students = step.absent_students.filter(
            (id) => id.toString() !== studentId.toString()
          );
        }
        for (let i = stepIndex + 1; i < job.Hiring_Workflow.length; i++) {
          const nextStep = job.Hiring_Workflow[i];
          nextStep.eligible_students = nextStep.eligible_students.filter(
            (id) => id.toString() !== studentId.toString()
          );
          nextStep.shortlisted_students = nextStep.shortlisted_students.filter(
            (id) => id.toString() !== studentId.toString()
          );
          nextStep.absent_students = nextStep.absent_students.filter(
            (id) => id.toString() !== studentId.toString()
          );
        }
      }
    }

    step.shortlisted_students.push(...studentIds);
    step.absent_students.push(...absentIds);

    if (job.Hiring_Workflow[stepIndex + 1]) {
      const nextStep = job.Hiring_Workflow[stepIndex + 1];
      for (const studentId of studentIds) {
        if (!nextStep.eligible_students.includes(studentId)) {
          nextStep.eligible_students.push(studentId);
        }
      }
    }
    else {
      const jobType = job.job_type;
      const jobSector= job.job_sector;
      const createInternship = ['Intern', 'Intern+PPO', 'Intern+FTE'].includes(jobType);
      const createPlacement = ['Intern+FTE', 'FTE'].includes(jobType);
      const jobClassOrder = ["notplaced", "Below Dream", "Dream", "Super Dream"];
      let internshipDuration = job.internship_duration || 'N/A';

      // Group students by batch and degree
      const studentGroups = {};
      const studentsToRemove = new Set();

      for (const student of students) {
        const studentId = student.studentId;
        const dbStudent = await Student.findById(studentId);


        if (dbStudent) {
          const key = `${dbStudent.batch}-${dbStudent.course}`;

          if (!studentGroups[key]) {
            studentGroups[key] = {
              batch: dbStudent.batch,
              degree: dbStudent.course,
              students: [],
              jobId: jobId
            };
          }

          if (student.shortlisted) {
            studentGroups[key].students.push({
              studentId: studentId,
              name: dbStudent.name,
              image: dbStudent.image || '',
              email: dbStudent.email || 'N/A',
              gender: dbStudent.gender,
              department: dbStudent.department,
              category: dbStudent.category || 'N/A',
            });

            let jobClassIndex;
            if(jobType === "Intern" || (jobType === "Intern+PPO" && job.job_salary.ctc==0 ) ){
                 jobClassIndex=1;
            }
            else{
              if (job.job_salary.ctc >= 20) {
                jobClassIndex = 3;
              } 
              else if (job.job_salary.ctc < 4.5) {
                jobClassIndex = 0;
              } 
              else if ((dbStudent.course === "B.Tech" || dbStudent.course === "M.Tech") && (dbStudent.department === "COMPUTER SCIENCE AND ENGINEERING" || dbStudent.department === "INFORMATION TECHNOLOGY"|| dbStudent.department ==="COMPUTER SCIENCE AND ENGINEERING (INFORMATION SECURITY)" || dbStudent.department ==="DATA SCIENCE AND ENGINEERING" || dbStudent.department ==="ARTIFICIAL INTELLIGENCE"|| dbStudent.department==="DATA ANALYTICS")) {
                if (job.job_salary.ctc >= 10 && job.job_salary.ctc < 20) {
                  jobClassIndex = 2;
                } else {
                  jobClassIndex = 1;
                }
              }
              else if ((dbStudent.course === "B.Tech" || dbStudent.course === "M.Tech") && 
                         (dbStudent.department === "ELECTRONICS AND COMMUNICATION ENGINEERING" || 
                          dbStudent.department === "INSTRUMENTATION AND CONTROL ENGINEERING" || 
                          dbStudent.department === "ELECTRONICS AND VLSI ENGINEERING" || 
                          dbStudent.department === "ELECTRICAL ENGINEERING"||
                          dbStudent.department === "CONTROL AND INSTRUMENTATION ENGINEERING")) {
                if (job.job_salary.ctc >= 8 && job.job_salary.ctc < 20) {
                  jobClassIndex = 2;
                } else {
                  jobClassIndex = 1;
                }
              } else if (dbStudent.course === "B.Tech" || dbStudent.course === "M.Tech") {
                if (job.job_salary.ctc >= 6 && job.job_salary.ctc < 20) {
                  jobClassIndex = 2;
                } else {
                  jobClassIndex = 1;
                }
              } else if (dbStudent.course === "MBA") {
                if (job.job_salary.ctc >= 5 && job.job_salary.ctc < 20) {
                  jobClassIndex = 2;
                } else {
                  jobClassIndex = 1;
                }
              } else if (dbStudent.course === "M.Sc.") {
                if (job.job_salary.ctc >= 6 && job.job_salary.ctc < 20) {
                  jobClassIndex = 2;
                } else {
                  jobClassIndex = 1;
                }
              }
            }

            if(createInternship){
              dbStudent.internshipstatus=internshipDuration;
            }
            if(createPlacement){
            dbStudent.placementstatus = jobClassOrder[jobClassIndex];
            }
            await dbStudent.save();

            let offerTracker = await OfferTracker.findOne({ studentId });
            if (!offerTracker) {
              offerTracker = new OfferTracker({ studentId, offer: [] });
            }

            const offerCategory = jobClassIndex === 0 ? 'Not Considered' : 
                                jobClassIndex === 1 ? 'Below Dream' : 
                                jobClassIndex === 2 ? 'Dream' : 'Super Dream';
            
            const offerExists = offerTracker.offer.some(
              offer => offer.jobId.toString() === jobId.toString()
            );

            if (!offerExists) {
              offerTracker.offer.push({
                offer_type: jobType,
                offer_category: offerCategory,
                offer_sector: jobSector,
                jobId: jobId
              });
              await offerTracker.save();
            }
          } else {
            // Track students to remove and remove from OfferTracker
            studentsToRemove.add(`${key}-${studentId}`);
            
            let offerTracker = await OfferTracker.findOne({ studentId });
            if (offerTracker) {
              offerTracker.offer = offerTracker.offer.filter(
                offer => offer.jobId != null && offer.jobId.toString() !== jobId.toString()
              );
              if (offerTracker.offer.length === 0) {
                await OfferTracker.deleteOne({ studentId });
              } else {
                await offerTracker.save();
              }
            }
          }
        } else {
          console.error(`Student not found for ID: ${studentId}`);
        }
      }

      // Process each batch-degree combination
      for (const key in studentGroups) {
        const group = studentGroups[key];
        const placementData = group.students;

        // Check for existing Internship
        if (createInternship) {
          let internship = await Internship.findOne({
            jobId: group.jobId,
            batch: group.batch,
            degree: group.degree
          });

          if (internship) {
            const existingStudentIds = new Set(
              internship.shortlisted_students.map(s => s.studentId.toString())
            );
            
            const newStudents = placementData.filter(
              student => !existingStudentIds.has(student.studentId.toString())
            );
            
            if (studentsToRemove.size > 0) {
              internship.shortlisted_students = internship.shortlisted_students.filter(
                student => !studentsToRemove.has(`${key}-${student.studentId.toString()}`)
              );
            }
            
            internship.shortlisted_students.push(...newStudents);
            internship.result_date = new Date();
            await internship.save();
          } else {
            const internship = new Internship({
              jobId: group.jobId,
              company_name: job.company_name,
              company_logo: job.company_logo || '',
              internship_offer_mode: 'On-Campus',
              internship_type: job.job_type,
              internship_category: job.job_category,
              internship_duration: internshipDuration,
              internship_sector: job.job_sector,
              batch: group.batch,
              degree: group.degree,
              stipend: job.job_salary?.stipend || 'N/A',
              role: job.job_role || '',
              result_date: new Date(),
              shortlisted_students: placementData,
            });
            await internship.save();
          }
        }

        // Check for existing Placement
        if (createPlacement) {
          console.log("placement create ho rhi hai");
          let placement = await Placement.findOne({
            jobId: group.jobId,
            batch: group.batch,
            degree: group.degree
          });

          if (placement) {
            const existingStudentIds = new Set(
              placement.shortlisted_students.map(s => s.studentId.toString())
            );
            
            const newStudents = placementData.filter(
              student => !existingStudentIds.has(student.studentId.toString())
            );
            
            if (studentsToRemove.size > 0) {
              placement.shortlisted_students = placement.shortlisted_students.filter(
                student => !studentsToRemove.has(`${key}-${student.studentId.toString()}`)
              );
            }
            
            placement.shortlisted_students.push(...newStudents);
            placement.result_date = new Date();
            await placement.save();
          } else {
            const placement = new Placement({
              jobId: group.jobId,
              company_name: job.company_name,
              company_logo: job.company_logo || '',
              placement_type: job.job_type,
              placement_category: job.job_category,
              placement_offer_mode: 'On-Campus',
              placement_sector: job.job_sector,
              batch: group.batch,
              degree: group.degree,
              ctc: job.job_salary?.ctc || 'N/A',
              base_salary: job.job_salary?.base_salary || 'N/A',
              role: job.job_role || '',
              result_date: new Date(),
              shortlisted_students: placementData,
            });
            await placement.save();
          }
        }
      }
    }

    await job.save();
    
    // const notification = new Notification({
    //   type: "STUDENT_SHORTLISTED",
    //   message: `${students.length} students shortlisted for ${job.company_name} - ${job.job_role}`,
    //   jobId: job._id,
    // });

    // await notification.save();

    res.status(200).json({ message: 'Students processed successfully.' });
  } catch (error) {
    console.error('Error shortlisting students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// export const addshortlistStudents = async (req, res) => {
//   try {
//     const { jobId, stepIndex, students } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(jobId)) {
//       return res.status(400).json({ error: 'Invalid job ID' });
//     }

//     const job = await JobProfile.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ error: 'Job not found' });
//     }

//     if (stepIndex < 0 || stepIndex >= job.Hiring_Workflow.length) {
//       return res.status(400).json({ error: 'Invalid step index' });
//     }

//     const step = job.Hiring_Workflow[stepIndex];
//     if (!step) {
//       return res.status(400).json({ error: 'Step not found' });
//     }

//     const studentIds = [];
//     const absentIds = [];

//     for (const student of students) {
//         const studentId = student.studentId;

//         if (student.absent) {
//           if (step.shortlisted_students.includes(studentId)) {
//             step.shortlisted_students = step.shortlisted_students.filter(
//               (id) => id.toString() !== studentId.toString()
//             );
//           }
//           if (!step.absent_students.includes(studentId)) {
//             absentIds.push(studentId);
//           }
//           for (let i = stepIndex + 1; i < job.Hiring_Workflow.length; i++) {
//             const nextStep = job.Hiring_Workflow[i];
//             nextStep.eligible_students = nextStep.eligible_students.filter(
//               (id) => id.toString() !== studentId.toString()
//             );
//             nextStep.shortlisted_students = nextStep.shortlisted_students.filter(
//               (id) => id.toString() !== studentId.toString()
//             );
//             nextStep.absent_students = nextStep.absent_students.filter(
//               (id) => id.toString() !== studentId.toString()
//             );
//           }
//         } else if (student.shortlisted) {
//           if (step.absent_students.includes(studentId)) {
//             step.absent_students = step.absent_students.filter(
//               (id) => id.toString() !== studentId.toString()
//             );
//           }
//           if (!step.shortlisted_students.includes(studentId)) {
//             studentIds.push(studentId);
//           }
//         } else {
//           if (step.shortlisted_students.includes(studentId)) {
//             step.shortlisted_students = step.shortlisted_students.filter(
//               (id) => id.toString() !== studentId.toString()
//             );
//           }
//           if (step.absent_students.includes(studentId)) {
//             step.absent_students = step.absent_students.filter(
//               (id) => id.toString() !== studentId.toString()
//             );
//           }
//         }
//     }

//     step.shortlisted_students.push(...studentIds);
//     step.absent_students.push(...absentIds);

//     if (job.Hiring_Workflow[stepIndex + 1]) {
//       const nextStep = job.Hiring_Workflow[stepIndex + 1];
//       for (const studentId of studentIds) {
//         if (!nextStep.eligible_students.includes(studentId)) {
//           nextStep.eligible_students.push(studentId);
//         }
//       }
//     } 
//       else {
//         const placementData = [];
//         const jobType = job.job_type;
//         const createInternship = ['Intern', 'Intern+PPO', 'Intern+FTE'].includes(jobType);
//         const createPlacement = ['Intern+FTE','FTE'].includes(jobType);
//         const jobClassOrder = ["notplaced", "Below Dream", "Dream", "Super Dream"];
//         let internshipDuration = job.internship_duration || 'N/A';


//         for (const studentId of studentIds) {
//           const student = await Student.findById(studentId);
//           if (student) {
//             if(createInternship){
//               student.internshipstatus=internshipDuration;
//             }

//             if(createPlacement){
//               let jobClassIndex;
//               if(job.ctc>=20){
//                 jobClassIndex = 3;
//               }
//               else if(job.ctc<4.5){
//                 jobClassIndex = 0;
//               }
//               else if((student.course=="B.Tech"|| student.course=="M.Tech") && (student.department=="COMPUTER SCIENCE AND ENGINEERING"||student.department=="INFORMATION TECHNOLOGY")){
//                 if(job.ctc>=10 && job.ctc<20){
//                   jobClassIndex = 2;
//                 }
//                 else{
//                   jobClassIndex = 1;
//                 }
//               }
//               else if((student.course=="B.Tech"|| student.course=="M.Tech") && (student.department=="ELECTRONICS AND COMMUNICATION ENGINEERING"|| student.department=="INSTRUMENTATION AND CONTROL ENGINEERING"||student.department=="ELECTRONICS AND VLSI ENGINEERING"||student.department=="ELECTRICAL ENGINEERING")){
//                if(job.ctc>=8 && job.ctc<20){
//                  jobClassIndex = 2;
//                }
//                else{
//                  jobClassIndex = 1;
//                }
//               }
//               else if(student.course=="B.Tech"|| student.course=="M.Tech"){
//                if(job.ctc>=6 && job.ctc<20){
//                  jobClassIndex = 2;
//                }
//                else{
//                  jobClassIndex = 1;
//                }
//               }
//               else if(student.course=="MBA"){
//                if(job.ctc>=5 && job.ctc<20){
//                  jobClassIndex = 2;
//                }
//                else{
//                  jobClassIndex = 1;
//                }
//               }
//               else if(student.course=="M.Sc."){
//                if(job.ctc>=6 && job.ctc<20){
//                  jobClassIndex = 2;
//                }
//                else{
//                  jobClassIndex = 1;
//                }
//               }
//               student.placementstatus=jobClassOrder[jobClassIndex];
//             }

//             await student.save();
//             placementData.push({
//               studentId: studentId,
//               name: student.name,
//               image: student.image || '',
//               email: student.email || 'N/A',
//               gender: student.gender,
//               department: student.department,
//               category: student.category || 'N/A',
//             });
//           } else {
//             console.error(`Student not found for ID: ${studentId}`);
//           }
//         }
  
//         if (createInternship) {
//           const internship = new Internship({
//             company_name: job.company_name,
//             company_logo: job.company_logo || '',
//             internship_offer_mode: 'On-Campus',
//             internship_type: job.job_category,
//             internship_duration: internshipDuration,
//             batch: job.eligibility_criteria?.eligible_batch,
//             degree: job.eligibility_criteria?.course_allowed,
//             stipend: job.job_salary?.stipend || 'N/A',
//             role: job.job_role || '',
//             result_date: new Date(),
//             shortlisted_students: placementData,
//           });
//           await internship.save();
//         }
  
//         if (createPlacement) {
//           const placement = new Placement({
//             company_name: job.company_name,
//             company_logo: job.company_logo || '',
//             placement_type: job.job_category,
//             placement_offer_mode: 'On-Campus',
//             batch: job.eligibility_criteria?.eligible_batch,
//             degree: job.eligibility_criteria?.course_allowed,
//             ctc: job.job_salary?.ctc || 'N/A',
//             base_salary: job.job_salary?.base_salary || 'N/A',
//             role: job.job_role || '',
//             result_date: new Date(),
//             shortlisted_students: placementData,
//           });
//           await placement.save();
//         }
//       }

//     await job.save();
    
//     const notification = new Notification({
//       type: "STUDENT_SHORTLISTED",
//       message: `${students.length} students shortlisted for ${job.company_name} - ${job.job_role}`,
//       jobId: job._id,
//     });

//     await notification.save();

//     res.status(200).json({ message: 'Students processed successfully.' });
//   } catch (error) {
//     console.error('Error shortlisting students:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

/* export const eligibleinthis = async (req, res) => {
  try {
    const { jobId, stepIndex } = req.body;
    const jobProfile = await JobProfile.findById(jobId);
    if (!jobProfile) {
      return res.status(404).json({ error: 'Job profile not found' });
    }

    const step = jobProfile.Hiring_Workflow[stepIndex];
    if (!step) {
      return res.status(404).json({ error: 'Step not found' });
    }

    const eligible_studentsid = step.eligible_students;
    const shortlisted_studentsid = step.shortlisted_students || [];
    const absent_studentsid = step.absent_students || [];

    const submissions = await FormSubmission.find({
      studentId: { $in: eligible_studentsid },
      jobId,
    });

    const eligibleStudents = submissions.map(submission => {
      const nameField = submission.fields.find(field => field.fieldName === 'Name');
      const emailField = submission.fields.find(field => field.fieldName === 'Email');

      const studentId = submission.studentId;
      const isShortlisted = shortlisted_studentsid.includes(studentId);
      const isAbsent = absent_studentsid.includes(studentId);
      console.log(submission.studentId.name);

      return {
        studentId,
        name: nameField ? nameField.value : submission.studentId.name,
        email: emailField ? emailField.value : submission.studentId.email,
        shortlisted: isShortlisted,
        absent: isAbsent,
      };
    });

    res.status(200).json({ eligibleStudents });
  } catch (error) {
    console.error('Error in eligibleinthis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; */


// export const eligibleinthis = async (req, res) => {
//   try {
//     const { jobId, stepIndex } = req.body;
//     const jobProfile = await JobProfile.findById(jobId);
//     if (!jobProfile) {
//       return res.status(404).json({ error: 'Job profile not found' });
//     }

//     const step = jobProfile.Hiring_Workflow[stepIndex];
//     if (!step) {
//       return res.status(404).json({ error: 'Step not found' });
//     }

//     const eligible_studentsid = step.eligible_students;
//     const shortlisted_studentsid = step.shortlisted_students || [];
//     const absent_studentsid = step.absent_students || [];
//     const students = await Student.find({ _id: { $in: eligible_studentsid } }, 'name');
//     const submissions = await FormSubmission.find(
//       { studentId: { $in: eligible_studentsid }, jobId },
//       'studentId fields'
//     );
//     const emailMap = {};
//     submissions.forEach(submission => {
//       const emailField = submission.fields.find(field => field.fieldType === 'email');
//       if (emailField) {
//         emailMap[submission.studentId.toString()] = emailField.value;
//       }
//     });
//     const eligibleStudents = students.map(student => ({
//       studentId: student._id,
//       name: student.name,
//       email: emailMap[student._id.toString()] || '', // Email from FormSubmission or empty string
//       shortlisted: shortlisted_studentsid.includes(student._id.toString()),
//       absent: absent_studentsid.includes(student._id.toString()),
//     }));
//     res.status(200).json({ eligibleStudents });
//   } catch (error) {
//     console.error('Error in eligibleinthis:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


export const eligibleinthis = async (req, res) => {
  try {
    const { jobId, stepIndex } = req.body;
    const jobProfile = await JobProfile.findById(jobId);
    if (!jobProfile) {
      return res.status(404).json({ error: 'Job profile not found' });
    }

    const step = jobProfile.Hiring_Workflow[stepIndex];
    if (!step) {
      return res.status(404).json({ error: 'Step not found' });
    }

    const eligible_studentsid = step.eligible_students;
    const shortlisted_studentsid = step.shortlisted_students || [];
    const absent_studentsid = step.absent_students || [];

    // Fetch the form template to get starred fields
    const formTemplate = await FormTemplate.findOne({ jobId });
    if (!formTemplate) {
      return res.status(404).json({ error: 'Form template not found' });
    }

    // Get fieldNames of starred fields
    const starredFields = formTemplate.fields
      .filter(field => field.fieldStar)
      .map(field => ({
        fieldName: field.fieldName,
        fieldType: field.fieldType
      }));

    const students = await Student.find({ _id: { $in: eligible_studentsid } }, 'name');
    const submissions = await FormSubmission.find(
      { studentId: { $in: eligible_studentsid }, jobId },
      'studentId fields'
    );

    // Map submissions to include values of starred fields
    const fieldValuesMap = {};
    submissions.forEach(submission => {
      const studentId = submission.studentId.toString();
      fieldValuesMap[studentId] = {};
      starredFields.forEach(starredField => {
        const field = submission.fields.find(f => f.fieldName === starredField.fieldName);
        fieldValuesMap[studentId][starredField.fieldName] = field ? field.value : '';
      });
    });

    const eligibleStudents = students.map(student => {
      const studentId = student._id.toString();
      const studentData = {
        studentId,
        name: student.name,
        shortlisted: shortlisted_studentsid.includes(studentId),
        absent: absent_studentsid.includes(studentId),
      };

      // Add starred field values
      starredFields.forEach(starredField => {
        studentData[starredField.fieldName] = fieldValuesMap[studentId]?.[starredField.fieldName] || '';
      });

      return studentData;
    });

    res.status(200).json({ 
      eligibleStudents,
      starredFields // Include starred fields in response for dynamic rendering
    });
  } catch (error) {
    console.error('Error in eligibleinthis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/* export const viewshortlisting=async(req,res)=>{
  try {
    const { jobId, stepIndex } = req.body;
    const jobProfile = await JobProfile.findById(jobId);
    if (!jobProfile) {
      return res.status(404).json({ error: 'Job profile not found' });
    }
    const shortlisted_studentsid = jobProfile.Hiring_Workflow[stepIndex]?.shortlisted_students;
    const submissions = await FormSubmission.find({
      studentId: { $in: shortlisted_studentsid },
      jobId,
    });
    const shortlistedStudents = submissions.map(submission => {
      const nameField = submission.fields.find(field => field.fieldName === 'Name');
      const emailField = submission.fields.find(field => field.fieldType === 'Email');

      return {
        name: nameField ? nameField.value : submission.studentId.name,
        email: emailField ? emailField.value : submission.studentId.email,
      };
    });
    res.status(200).json({ shortlistedStudents });
  } catch (error) {
    console.error('Error in eligibleinthis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; */

// export const viewshortlisting = async (req, res) => {
//   try {
//     const { jobId, stepIndex } = req.body;
//     const jobProfile = await JobProfile.findById(jobId);
//     if (!jobProfile) {
//       return res.status(404).json({ error: 'Job profile not found' });
//     }

//     const step = jobProfile.Hiring_Workflow[stepIndex];
//     if (!step) {
//       return res.status(404).json({ error: 'Step not found' });
//     }

//     const shortlisted_studentsid = step.shortlisted_students || [];
//     const students = await Student.find(
//       { _id: { $in: shortlisted_studentsid } },
//       'name'
//     );
//     const submissions = await FormSubmission.find(
//       { studentId: { $in: shortlisted_studentsid }, jobId },
//       'studentId fields'
//     );

//     const emailMap = {};
//     submissions.forEach(submission => {
//       const emailField = submission.fields.find(field => field.fieldType === 'Email');
//       if (emailField) {
//         emailMap[submission.studentId.toString()] = emailField.value;
//       }
//     });

//     const shortlistedStudents = students.map(student => ({
//       studentId: student._id,
//       name: student.name, // Name from Student model
//       email: emailMap[student._id.toString()] || '', // Email from FormSubmission or empty string
//     }));

//     res.status(200).json({ shortlistedStudents });
//   } catch (error) {
//     console.error('Error in viewshortlisting:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

export const viewshortlisting = async (req, res) => {
  try {
    const { jobId, stepIndex } = req.body;
    const jobProfile = await JobProfile.findById(jobId);
    if (!jobProfile) {
      return res.status(404).json({ error: 'Job profile not found' });
    }

    const step = jobProfile.Hiring_Workflow[stepIndex];
    if (!step) {
      return res.status(404).json({ error: 'Step not found' });
    }

    const shortlisted_studentsid = step.shortlisted_students || [];

    // Fetch the form template to get starred fields
    const formTemplate = await FormTemplate.findOne({ jobId });
    if (!formTemplate) {
      return res.status(404).json({ error: 'Form template not found' });
    }

    // Get fieldNames of starred fields
    const starredFields = formTemplate.fields
      .filter(field => field.fieldStar)
      .map(field => ({
        fieldName: field.fieldName,
        fieldType: field.fieldType
      }));

    const students = await Student.find(
      { _id: { $in: shortlisted_studentsid } },
      'name'
    );
    const submissions = await FormSubmission.find(
      { studentId: { $in: shortlisted_studentsid }, jobId },
      'studentId fields'
    );

    // Map submissions to include values of starred fields
    const fieldValuesMap = {};
    submissions.forEach(submission => {
      const studentId = submission.studentId.toString();
      fieldValuesMap[studentId] = {};
      starredFields.forEach(starredField => {
        const field = submission.fields.find(f => f.fieldName === starredField.fieldName);
        fieldValuesMap[studentId][starredField.fieldName] = field ? field.value : '';
      });
    });

    const shortlistedStudents = students.map(student => {
      const studentId = student._id.toString();
      const studentData = {
        studentId,
        name: student.name,
      };

      // Add starred field values
      starredFields.forEach(starredField => {
        studentData[starredField.fieldName] = fieldValuesMap[studentId]?.[starredField.fieldName] || '';
      });

      return studentData;
    });

    res.status(200).json({ 
      shortlistedStudents,
      starredFields // Include starred fields in response for dynamic rendering
    });
  } catch (error) {
    console.error('Error in viewshortlisting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateInterviewLink = async (req, res) => {
  try {
    const { jobId, stepIndex, students } = req.body;
    const jobProfile = await JobProfile.findById(jobId);
    if (!jobProfile) {
      return res.status(404).json({ message: "Job profile not found" });
    }
    const step = jobProfile.Hiring_Workflow[stepIndex];
    if (!step) {
      return res.status(404).json({ message: "Step not found in the hiring workflow" });
    }
    if (!step.details.interview_link) {
      step.details.interview_link = [];
    }
    const updatePromises = students.map(async (student) => {
      const { studentId, interviewLink, visibility } = student;
      const existingLinkIndex = step.details.interview_link.findIndex(
        (link) => link.studentId.toString() === studentId.toString()
      );
      if (existingLinkIndex !== -1) {
        step.details.interview_link[existingLinkIndex].interviewLink = interviewLink;
        step.details.interview_link[existingLinkIndex].visibility = visibility; // Update visibility
      } else {
        step.details.interview_link.push({
          studentId,
          interviewLink,
          visibility: visibility // Add visibility field
        });
      }

      return {
        status: 'success',
        message: 'Interview link updated successfully'
      };
    });
    const results = await Promise.all(updatePromises);
    jobProfile.markModified(`Hiring_Workflow.${stepIndex}.details`);
    await jobProfile.save();
    return res.status(200).json({
      message: "Interview links processing completed",
      results,
      data: step.details.interview_link
    });

  } catch (error) {
    console.error("Error updating interview links:", error);
    return res.status(500).json({
      message: "Failed to update interview links.",
      error: error.message
    });
  }
};


export const updategdLink = async (req, res) => {
  try {
    const { jobId, stepIndex, students } = req.body;
    const jobProfile = await JobProfile.findById(jobId);
    if (!jobProfile) {
      return res.status(404).json({ message: "Job profile not found" });
    }
    const step = jobProfile.Hiring_Workflow[stepIndex];
    if (!step) {
      return res.status(404).json({ message: "Step not found in the hiring workflow" });
    }
    if (!step.details.gd_link) {
      step.details.gd_link = [];
    }
    const updatePromises = students.map(async (student) => {
      const { studentId, gdLink, visibility } = student;
      const existingLinkIndex = step.details.gd_link.findIndex(
        (link) => link.studentId.toString() === studentId.toString()
      );
      if (existingLinkIndex !== -1) {
        step.details.gd_link[existingLinkIndex].gdLink = gdLink;
        step.details.gd_link[existingLinkIndex].visibility = visibility;
      } else {
        step.details.gd_link.push({
          studentId,
          gdLink,
          visibility
        });
      }

      return {
        status: 'success',
        message: 'GD link updated successfully'
      };
    });
    const results = await Promise.all(updatePromises);
    jobProfile.markModified(`Hiring_Workflow.${stepIndex}.details`);
    await jobProfile.save();
    return res.status(200).json({
      message: "GD links processing completed",
      results,
      data: step.details.gd_link
    });

  } catch (error) {
    console.error("Error updating gd links:", error);
    return res.status(500).json({
      message: "Failed to update gd links.",
      error: error.message
    });
  }
};


export const updateoaLink = async (req, res) => {
  try {
    const { jobId, stepIndex, students } = req.body;
    const jobProfile = await JobProfile.findById(jobId);
    if (!jobProfile) {
      return res.status(404).json({ message: "Job profile not found" });
    }
    const step = jobProfile.Hiring_Workflow[stepIndex];
    if (!step) {
      return res.status(404).json({ message: "Step not found in the hiring workflow" });
    }
    if (!step.details.oa_link) {
      step.details.oa_link = [];
    }
    const updatePromises = students.map(async (student) => {
      const { studentId, oaLink, visibility } = student;
      const existingLinkIndex = step.details.oa_link.findIndex(
        (link) => link.studentId.toString() === studentId.toString()
      );
      if (existingLinkIndex !== -1) {
        step.details.oa_link[existingLinkIndex].oaLink = oaLink;
        step.details.oa_link[existingLinkIndex].visibility = visibility;
      } else {
        step.details.oa_link.push({
          studentId,
          oaLink,
          visibility
        });
      }
       return {
        status: 'success',
        message: 'OA link updated successfully'
      };
    });
    const results = await Promise.all(updatePromises);
    jobProfile.markModified(`Hiring_Workflow.${stepIndex}.details`);
    await jobProfile.save();
    return res.status(200).json({
      message: "OA links processing completed",
      results,
      data: step.details.oa_link
    });
   } catch (error) {
    console.error("Error updating oa links:", error);
    return res.status(500).json({
      message: "Failed to update oa links.",
      error: error.message
    });
  }
};

export const updateOthersLink = async (req, res) => {
  try {
    const { jobId, stepIndex, students } = req.body;
    const jobProfile = await JobProfile.findById(jobId);
    if (!jobProfile) {
      return res.status(404).json({ message: "Job profile not found" });
    }
    const step = jobProfile.Hiring_Workflow[stepIndex];
    if (!step) {
      return res.status(404).json({ message: "Step not found in the hiring workflow" });
    }
    if (!step.details.others_link) {
      step.details.others_link = [];
    }
    const updatePromises = students.map(async (student) => {
      const { studentId, othersLink, visibility } = student;
      const existingLinkIndex = step.details.others_link.findIndex(
        (link) => link.studentId.toString() === studentId.toString()
      );
      if (existingLinkIndex !== -1) {
        step.details.others_link[existingLinkIndex].othersLink = othersLink;
        step.details.others_link[existingLinkIndex].visibility = visibility;
      } else {
        step.details.others_link.push({
          studentId,
          othersLink,
          visibility
        });
      }
       return {
        status: 'success',
        message: 'Others link updated successfully'
      };
    });
    const results = await Promise.all(updatePromises);
    jobProfile.markModified(`Hiring_Workflow.${stepIndex}.details`);
    await jobProfile.save();
    return res.status(200).json({
      message: "Others links processing completed",
      results,
      data: step.details.others_link
    });
   } catch (error) {
    console.error("Error updating others links:", error);
    return res.status(500).json({
      message: "Failed to update others links.",
      error: error.message
    });
  }
};