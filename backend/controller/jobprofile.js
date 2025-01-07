import JobProfile from "../models/jobprofile.js";
import Student from "../models/user_model/student.js";
import FormSubmission from '../models/FormSubmission.js';
import Placement from '../models/placement.js';
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
    } = req.body;

    console.log(recruiter_id);

    // Process and validate Hiring_Workflow
    const processedWorkflow = Hiring_Workflow.map(step => {
      const processedStep = {
        step_type: step.step_type,
        details: {},
        eligible_students: step.eligible_students || [],
        shortlisted_students: step.shortlisted_students || []
      };

      // Initialize details based on step type
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
            interview_link: step.details?.interview_link || ''
          };
          break;

        case 'GD':
          processedStep.details = {
            gd_date: step.details?.gd_date || '',
            gd_time: step.details?.gd_time || '',
            gd_info: step.details?.gd_info || '',
            gd_link: step.details?.gd_link || ''
          };
          break;

        default:
          throw new Error(`Invalid step type: ${step.step_type}`);
      }

      return processedStep;
    });

    // Create job profile with processed workflow
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
        course_allowed
      },
      deadline,
    });

    // Save the job profile
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
      eligibility_criteria:{department_allowed, gender_allowed, eligible_batch, minimum_cgpa, active_backlogs},
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
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ success: false, message: 'No jobs found for this recruiter' });
    }
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

// Student Controllers

// Get Job Applications

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

// Approve Job Application
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


// Reject Job Application
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

    if (student.cgpa < minimum_cgpa) {
      return res.json({ eligible: false, reason: "CGPA below required minimum" });
    }

    if (active_backlogs !== undefined && student.active_backlogs !== active_backlogs) {
      return res.json({ eligible: false, reason: "Active backlogs do not meet criteria" });
    }

    const jobCategoryOrder = ["notplaced", "Below Dream", "Dream", "Super Dream"];
    const studentCategoryIndex = jobCategoryOrder.indexOf(student.placementstatus);
    const jobCategoryIndex = jobCategoryOrder.indexOf(job.job_category);

    if (
      studentCategoryIndex !== -1 &&
      student.placementstatus !== "notplaced" &&
      jobCategoryIndex <= studentCategoryIndex
    ) {
      return res.json({
        eligible: false,
        reason: "Student can only apply for higher job categories than their current placement status",
      });
    }
    return res.json({ eligible: true, reason: "Eligible to apply" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const addshortlistStudents = async (req, res) => {
  try {
    const { jobId, stepIndex, students } = req.body;

    // Find the job by ID
    const job = await JobProfile.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const step = job.Hiring_Workflow[stepIndex];
    if (!step) {
      return res.status(400).json({ error: 'Invalid step index' });
    }

    // Find student IDs from FormSubmission using email
    const studentIds = [];
    for (const student of students) {
      const formSubmission = await FormSubmission.findOne({
        jobId: jobId,
        'fields.value': student.email,
      });

      if (formSubmission) {
        studentIds.push(formSubmission.studentId);
      } else {
        console.error(`FormSubmission not found for email: ${student.email}`);
      }
    }

    // Add student IDs to the current step's shortlisted_students array
    step.shortlisted_students.push(...studentIds);

    if (job.Hiring_Workflow[stepIndex + 1]) {
      // Add student IDs to the next step's eligible_students array
      job.Hiring_Workflow[stepIndex + 1].eligible_students.push(...studentIds);
    } else {
      // If no next step, prepare data for Placement model
      const placementData = [];
      for (const studentId of studentIds) {
        const student = await Student.findById(studentId);
        if (student) {
          placementData.push({
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

      // Create a new placement entry
      const placement = new Placement({
        company_name: job.company_name,
        company_logo: job.company_logo,
        placement_type: job.job_category,
        batch: job.eligibility_criteria?.eligible_batch,
        degree: job.eligibility_criteria?.course_allowed,
        shortlisted_students: placementData,
        ctc: job.job_salary?.ctc || 'N/A', // Include CTC
      });

      await placement.save();
    }

    // Save the updated job
    await job.save();

    res.status(200).json({ message: 'Students shortlisted successfully.' });
  } catch (error) {
    console.error('Error shortlisting students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
