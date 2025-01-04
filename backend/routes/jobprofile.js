import express from "express";
const router=express.Router();

import { checkEligibility, getJobProfiletostudent,getJobProfiledetails, getJobsByRecruiter,createJobProfile,updateJob,deleteJob } from "../controller/jobprofile.js";

router.get("/eligibility/:jobId/:studentId", checkEligibility);
router.get("/getjobs", getJobProfiletostudent);
router.get("/:_id", getJobProfiledetails);
router.post("/createjob", createJobProfile);
router.put("/updatejob/:_id", updateJob);
router.delete("/deletejob/:_id", deleteJob);
router.get("/recruiter/getjobs", getJobsByRecruiter);

export default router;