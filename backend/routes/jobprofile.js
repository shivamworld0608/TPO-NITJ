import express from "express";
const router=express.Router();

import { checkEligibility, getJobProfiletostudent,getJobProfiledetails, getJobsByRecruiter,createJobProfile,createJobProfilecopy,updateJob,deleteJob,getJobProfilesForProfessors,approveJobProfile,rejectJobProfile,addshortlistStudents  } from "../controller/jobprofile.js";

router.get("/eligibility/:_id/", checkEligibility);
router.get("/getjobs", getJobProfiletostudent);
router.get("/:_id", getJobProfiledetails);


router.post("/createjob", createJobProfile);
router.post("/createjobcopy", createJobProfilecopy);
router.put("/updatejob/:_id", updateJob);
router.delete("/deletejob/:_id", deleteJob);
router.get("/recruiter/getjobs", getJobsByRecruiter);


router.get("/professor/getjobs", getJobProfilesForProfessors);
router.put("/approvejob/:_id", approveJobProfile);
router.put("/rejectjob/:_id", rejectJobProfile);
router.post("/add-shortlist-students", addshortlistStudents);

export default router;