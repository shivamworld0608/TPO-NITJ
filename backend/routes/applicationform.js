/* import express from "express";
const router=express.Router();

import {  getInterviewDetails,
    checkShortlistStatus,
    getTodayShortlistsGroupedByCompany,
    getEligibleUpcomingInterviews,
    getEligiblePastInterviews,} from "../controller/interview.js";

router.get("/details/:jobId/:interviewCode", getInterviewDetails);
router.get("/check-shortlist-status/:userId/:job_id/:interview_code", checkShortlistStatus);
router.get("/today-shortlists", getTodayShortlistsGroupedByCompany);
router.get("/eligible-upcoming/:userId", getEligibleUpcomingInterviews);
router.get("/eligible-past/:userId", getEligiblePastInterviews);

export default router; */