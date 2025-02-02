import JobProfile from "../models/jobprofile.js";
import Student from "../models/user_model/student.js";
import FormSubmission from '../models/FormSubmission.js';
import Placement from '../models/placement.js';
import mongoose from "mongoose";
export const createJobProfilecopy = async (req, res) => {
  try {
    const recruiter_id = req.user.userId;
    const {
      job_id,
      company_name,
      company_logo,
      job_role,
      jobdescription,
      joblocation,
      job_type,
      job_category,
      ctc,
      base_salary,
      deadline,
      Hiring_Workflow,
      department_allowed,
      gender_allowed,
      eligible_batch,
      minimum_cgpa,
      course_allowed,
      active_backlogs,
      history_backlogs,
    } = req.body;

    console.log(recruiter_id);

    const processedWorkflow = Hiring_Workflow.map(step => {
      const processedStep = {
        step_type: step.step_type,
        details: {},
        eligible_students: step.eligible_students || [],
        shortlisted_students: step.shortlisted_students || []
      };

      switch (step.step_type) {
        case 'OA':
          processedStep.details = {
            oa_date: step.details?.oa_date || '',
            oa_login_time: step.details?.oa_login_time || '',
            oa_duration: step.details?.oa_duration || '',
            oa_info: step.details?.oa_info || '',
            oa_link: step.details?.oa_link || ''
          };
          break;

        case 'Interview':
          processedStep.details = {
            interview_type: step.details?.interview_type || '',
            interview_date: step.details?.interview_date || '',
            interview_time: step.details?.interview_time || '',
            interview_info: step.details?.interview_info || '',
            interview_link: [],
          };
          break;

        case 'GD':
          processedStep.details = {
            gd_date: step.details?.gd_date || '',
            gd_time: step.details?.gd_time || '',
            gd_info: step.details?.gd_info || '',
            gd_link: [],
          };
          break;

        case 'Others':
          processedStep.details = {
            others_round_name:step.details?.others_round_name||'',
            others_date: step.details?.others_date || '',
            others_login_time: step.details?.others_login_time || '',
            others_duration: step.details?.others_duration || '',
            others_info: step.details?.others_info || '',
            others_link: step.details?.others_link || ''
          };
          break;

        default:
          throw new Error(`Invalid step type: ${step.step_type}`);
      }
      return processedStep;
    });

    let job_class;
    if (ctc < 10) {
      job_class = "Below Dream";
    } else if (ctc >= 10 && ctc < 20) {
      job_class = "Dream";
    } else if (ctc >= 20) {
      job_class = "Super Dream";
    } else {
      throw new Error("Invalid CTC value");
    }

    const jobProfile = new JobProfile({
      recruiter_id,
      job_id,
      company_name,
      company_logo,
      job_role,
      jobdescription,
      joblocation,
      job_type,
      job_category,
      job_salary: {
        ctc,
        base_salary
      },
      Hiring_Workflow: processedWorkflow,
      eligibility_criteria: {
        department_allowed,
        gender_allowed,
        eligible_batch,
        minimum_cgpa,
        active_backlogs,
        history_backlogs,
        course_allowed
      },
      job_class,
      deadline,
    });

    const savedProfile = await jobProfile.save();
    console.log(savedProfile);
    
    return res.status(201).json({ 
      message: "Job profile created successfully!", 
      data: savedProfile 
    });

  } catch (error) {
    console.error("Error creating job profile:", error);
    return res.status(500).json({ 
      message: "Failed to create job profile.", 
      error: error.message 
    });
  }
};


export const createJobProfile = async (req, res) => {
  try {
    const recruiter_id = req.user.userId;
    const {
      job_id,
      company_name,
      company_logo,
      job_role,
      jobdescription,
      joblocation,
      jobtype,
      ctc,
      base_salary,
      deadline,
      Hiring_Workflow,
      department_allowed,
      gender_allowed,
      eligible_batch,
      minimum_cgpa,
      active_backlogs,
      history_backlogs,
    } = req.body;

    const newJob = new JobProfile({
      recruiter_id,
      job_id,
      company_name,
      company_logo,
      job_role,
      jobdescription,
      joblocation,
      jobtype,
      ctc,
      base_salary,
      deadline: new Date(deadline),
      Hiring_Workflow,
      eligibility_criteria:{department_allowed, gender_allowed, eligible_batch, minimum_cgpa, active_backlogs,history_backlogs},
    });
    await newJob.save();
    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      job: newJob,
    });
  } catch (error) {
    console.error('Error creating job:', error.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


export const getJobsByRecruiter = async (req, res) => {
  try {
    const recruiterId = req.user.userId;
    const jobs = await JobProfile.find({ recruiter_id: recruiterId }); // Query to find jobs by recruiter
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { _id } = req.params;
    const job = await JobProfile.findById(_id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    const updatedJob = await JobProfile.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Job updated successfully', job: updatedJob });
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
    const JobProfiles = await JobProfile.find({ Approved_Status: true });
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
    const approvedJobs = await JobProfile.find({ Approved_Status: true });
    const notApprovedJobs = await JobProfile.find({ Approved_Status: false });
    console.log("approvedJobs", approvedJobs);
    res.status(200).json({
      approved: approvedJobs,
      notApproved: notApprovedJobs,
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
    console.log("Approving job...");
    const { _id } = req.params;
    console.log("id", _id);
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


export const checkEligibility = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { _id } = req.params;
    const student = await Student.findById({_id:studentId});
    const job = await JobProfile.findById(_id);
    if (!student || !job) {
      return res.status(404).json({ message: "Student or Job Application not found" });
    }
    const {
      department_allowed,
      course_allowed,
      gender_allowed,
      eligible_batch,
      minimum_cgpa,
      active_backlogs,
      history_backlogs,
    } = job.eligibility_criteria;

    if (!department_allowed.includes(student.department)) {
      return res.json({ eligible: false, reason: "Department not eligible" });
    }

    if (gender_allowed !== "Any" && gender_allowed !== student.gender) {
      return res.json({ eligible: false, reason: "Gender not eligible" });
    }

    if (course_allowed && course_allowed !== student.course) {
      return res.json({ eligible: false, reason: "Course not eligible" });
    }
    if (eligible_batch && eligible_batch !== student.batch) {
      return res.json({ eligible: false, reason: "Batch not eligible" });
    }

    if (minimum_cgpa && student.cgpa < minimum_cgpa) {
      return res.json({ eligible: false, reason: "CGPA below required minimum" });
    }

    if (active_backlogs !== undefined && student.active_backlogs !== active_backlogs) {
      return res.json({ eligible: false, reason: "Active backlogs do not meet criteria" });
    }

    if (history_backlogs !== undefined && student.backlogs_history !== history_backlogs) {
      return res.json({ eligible: false, reason: "Backlogs History do not meet criteria" });
    }

    const jobClassOrder = ["notplaced", "Below Dream", "Dream", "Super Dream"];
    const studentClassIndex = jobClassOrder.indexOf(student.placementstatus);
    const jobClassIndex = jobClassOrder.indexOf(job.job_class);

    if (
      studentClassIndex !== -1 &&
      student.placementstatus !== "notplaced" &&
      jobClassIndex <= studentClassIndex
    ) {
      return res.json({
        eligible: false,
        reason: "Student can only apply for higher job categories than their current placement status",
      });
    }
    const currentDate = new Date();
    const isDeadlineOver = job.deadline && currentDate > job.deadline;
    const hasApplied = job.Applied_Students.includes(studentId);
    return res.json({ eligible: true, reason: "Eligible to apply", applied: hasApplied,isDeadlineOver });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addshortlistStudents = async (req, res) => {
  try {
    const { jobId, stepIndex, students } = req.body;

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
      const formSubmission = await FormSubmission.findOne({
        jobId: jobId,
        'fields.value': student.email,
      });

      if (formSubmission) {
        const studentId = formSubmission.studentId;

        if (student.absent) {
          if (step.shortlisted_students.includes(studentId)) {
            step.shortlisted_students = step.shortlisted_students.filter(
              (id) => id.toString() !== studentId.toString()
            );
          }
          if (!step.absent_students.includes(studentId)) {
            absentIds.push(studentId);
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
        }
      } else {
        console.error(`FormSubmission not found for email: ${student.email}`);
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
    } else {
      const placementData = [];
      for (const studentId of studentIds) {
        const student = await Student.findById(studentId);
        if (student) {
          student.placementstatus = job.job_class;
          await student.save();
          placementData.push({
            studentId: studentId,
            name: student.name,
            image: student.image || '',
            email: student.email,
            gender: student.gender,
            department: student.department,
          });
        } else {
          console.error(`Student not found for ID: ${studentId}`);
        }
      }

      const placement = new Placement({
        company_name: job.company_name,
        company_logo: job.company_logo,
        placement_type: job.job_category,
        batch: job.eligibility_criteria?.eligible_batch,
        degree: job.eligibility_criteria?.course_allowed,
        shortlisted_students: placementData,
        ctc: job.job_salary?.ctc || 'N/A',
      });

      await placement.save();
    }

    await job.save();

    res.status(200).json({ message: 'Students processed successfully.' });
  } catch (error) {
    console.error('Error shortlisting students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const eligibleinthis = async (req, res) => {
  try {
    const { jobId, stepIndex } = req.body;
    const jobProfile = await JobProfile.findById(jobId);
    if (!jobProfile) {
      return res.status(404).json({ error: 'Job profile not found' });
    }
    const eligible_studentsid = jobProfile.Hiring_Workflow[stepIndex]?.eligible_students;
    const submissions = await FormSubmission.find({
      studentId: { $in: eligible_studentsid },
      jobId,
    });
    const eligibleStudents = submissions.map(submission => {
      const nameField = submission.fields.find(field => field.fieldName === 'Name');
      const emailField = submission.fields.find(field => field.fieldName === 'Email');

      return {
        studentId:submission.studentId,
        name: nameField ? nameField.value : submission.studentId.name,
        email: emailField ? emailField.value : submission.studentId.email,
      };

    });
    res.status(200).json({ eligibleStudents });
  } catch (error) {
    console.error('Error in eligibleinthis:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const viewshortlisting=async(req,res)=>{
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
      const emailField = submission.fields.find(field => field.fieldName === 'Email');

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
      const { email, interviewLink } = student;
      const formSubmission = await FormSubmission.findOne({
        jobId: jobId,
        'fields.value': email,
      });

      if (!formSubmission) {
        return {
          email,
          status: 'error',
          message: 'Student form submission not found'
        };
      }
      const studentId = formSubmission.studentId;
      const existingLinkIndex = step.details.interview_link.findIndex(
        (link) => link.studentId.toString() === studentId.toString()
      );
      if (existingLinkIndex !== -1) {
        step.details.interview_link[existingLinkIndex].interviewLink = interviewLink;
      } else {
        step.details.interview_link.push({
          studentId,
          interviewLink,
        });
      }

      return {
        email,
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
      const { email, gdLink } = student;
      const formSubmission = await FormSubmission.findOne({
        jobId: jobId,
        'fields.value': email,
      });

      if (!formSubmission) {
        return {
          email,
          status: 'error',
          message: 'Student form submission not found'
        };
      }
      const studentId = formSubmission.studentId;
      const existingLinkIndex = step.details.gd_link.findIndex(
        (link) => link.studentId.toString() === studentId.toString()
      );
      if (existingLinkIndex !== -1) {
        step.details.gd_link[existingLinkIndex].gdLink = gdLink;
      } else {
        step.details.gd_link.push({
          studentId,
          gdLink,
        });
      }

      return {
        email,
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