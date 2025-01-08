import express from "express";
const router=express.Router();

import {
   /*  getTodayShortlistsGroupedByCompany, */
    getEligibleUpcomingInterviews,
    getEligiblePastInterviews,} from "../controller/interview.js";

/* router.get("/today-shortlists", getTodayShortlistsGroupedByCompany); */
router.get("/eligible-upcoming", getEligibleUpcomingInterviews);
router.get("/eligible-past", getEligiblePastInterviews);

export default router;