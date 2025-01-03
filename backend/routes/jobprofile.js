import express from "express";
const router=express.Router();

import { checkEligibility, getJobProfiletostudent,getJobProfiledetails } from "../controller/jobprofile.js";

router.get("/eligibility/:jobId/:studentId", checkEligibility);
router.get("/getjobs", getJobProfiletostudent);
router.get("/:jobId", getJobProfiledetails);

export default router;