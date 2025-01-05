//for student
//get job application
//apply for job application

//for tpo
//approve job application
//reject job application

import { trusted } from "mongoose";
import JobProfile from "../models/jobprofile.js";
import Student from "../models/user_model/student.js";

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

export const getapprovedJobProfilestoprofessors = async (req, res) => {
  try {
    const jobs = await JobProfile.find({ Approved_Status: true });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getnotapprovedJobProfilestoprofessors = async (req, res) => {
  try {
    const jobs = await JobProfile.find({ Approved_Status: false });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* export const appliedstudenttojob = async (req, res) => {
    try {
        const { job_id } = req.params;
        const job = await JobProfile.find({ job_id });
        res.status(200).json(job.applied);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
 */

// Approve Job Application
export const approveJobProfile = async (req, res) => {
  try {
    const { job_id } = req.params;
    const approvedJob = await JobProfile.findByIdAndUpdate(
      job_id,
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
    const { job_id } = req.params;
    const deletedJob = await JobProfile.findByIdAndDelete(job_id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job application deleted successfully", deletedJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//eligibilty of any student

export const checkEligibility = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { _id } = req.params;
    const student = await Student.findById({_id:studentId});
    const job = await JobProfile.findById(_id);
    console.log("Job:", job);
    console.log("Student:", student);

    if (!student || !job) {
      return res.status(404).json({ message: "Student or Job Application not found" });
    }
    const {
      department_allowed,
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
