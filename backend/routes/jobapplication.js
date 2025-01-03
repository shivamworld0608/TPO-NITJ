import express from "express";
const router=express.Router();

import { checkEligibility } from "../controller/jobapplication.js";

router.get("/eligibility/:jobId/:studentId", checkEligibility);

export default router;