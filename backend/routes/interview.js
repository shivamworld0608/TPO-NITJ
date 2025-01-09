import express from "express";
const router=express.Router();

import {
    getEligibleUpcomingInterviews,
    getEligiblePastInterviews,} from "../controller/interview.js";

router.get("/eligible-upcoming", getEligibleUpcomingInterviews);
router.get("/eligible-past", getEligiblePastInterviews);

export default router;