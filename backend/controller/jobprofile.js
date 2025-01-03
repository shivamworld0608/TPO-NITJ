//for recuiter
//create,edit,delete job application

//for student
//get job application
//apply for job application

//for tpo
//approve job application
//reject job application

import { trusted } from "mongoose";
import JobApplication from "../models/jobprofile.js";
import Student from "../models/user_model/student.js";

// Recruiter Controllers
// Create Job Application
export const createJobApplication = async (req, res) => {
    try {
        const newJob = new JobApplication(req.body);
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit Job Application
export const editJobApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedJob = await JobApplication.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedJob) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(updatedJob);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Job Application
export const deleteJobApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedJob = await JobApplication.findByIdAndDelete(id);
        if (!deletedJob) return res.status(404).json({ message: "Job not found" });
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
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
    const jobApplications = await JobApplication.find({Approved_Status:true});
    const applied = [];
    const notApplied = [];
    const liveButNotApplied = [];

    const currentDate = new Date();

    jobApplications.forEach((job) => {
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
        const { job_id } = req.params;
        const job = await JobApplication.find({ job_id });
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getapprovedJobApplicationstoprofessors = async (req, res) => {
    try {
        const jobs = await JobApplication.find({Approved_Status: true});
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getnotapprovedJobApplicationstoprofessors = async (req, res) => {
    try {
        const jobs = await JobApplication.find({Approved_Status: false});
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


/* export const appliedstudenttojob = async (req, res) => {
    try {
        const { job_id } = req.params;
        const job = await JobApplication.find({ job_id });
        res.status(200).json(job.applied);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
 */

// Approve Job Application
export const approveJobApplication = async (req, res) => {
    try {
        const { job_id } = req.params;
        const approvedJob = await JobApplication.findByIdAndUpdate(
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
export const rejectJobApplication = async (req, res) => {
    try {
        const { job_id } = req.params;
        const deletedJob = await JobApplication.findByIdAndDelete(job_id);

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
    const { studentId, jobId } = req.params;
    const student = await Student.findById(studentId);
    const jobApplication = await JobApplication.findById(jobId);

    if (!student || !jobApplication) {
      return res.status(404).json({ message: "Student or Job Application not found" });
    }
    const {
      department_allowed,
      gender_allowed,
      eligible_batch,
      minimum_cgpa,
      active_backlogs,
    } = jobApplication.eligibility_criteria;
y
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
    const jobCategoryIndex = jobCategoryOrder.indexOf(jobApplication.job_category);

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
