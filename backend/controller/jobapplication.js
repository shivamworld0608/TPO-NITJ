//for recuiter
//create job application
//edit job application
//delete job application

//for student
//get job application
//apply for job application

//for tpo
//approve job application
//reject job application

import JobApplication from "../models/jobapplication.js";

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
export const getJobApplications = async (req, res) => {
    try {
        const jobs = await JobApplication.find({Approved_Status: true});
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getJobApplicationsdetails = async (req, res) => {
    try {
        const { job_id } = req.params;
        const job = await JobApplication.find({ job_id });
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Apply for Job Application
export const applyForJobApplication = async (req, res) => {
    try {
        const { id } = req.params; // Job ID
        const { studentId } = req.body; // Student ID from request body

        const job = await JobApplication.findById(id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        if (job.Applied_Students.includes(studentId)) {
            return res.status(400).json({ message: "Student has already applied for this job" });
        }

        job.Applied_Students.push(studentId);
        await job.save();

        res.status(200).json({ message: "Application successful", job });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// TPO Controllers

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


