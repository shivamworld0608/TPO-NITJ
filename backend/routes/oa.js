import express from "express";
const router=express.Router();

import {  getOADetails,
    checkShortlistStatus,
    getTodayShortlistsGroupedByCompany,
    getEligibleUpcomingOAs,
    getEligiblePastOAs,} from "../controller/oa.js";

router.get("/details/:jobId/", getOADetails);
router.get("/check-shortlist-status/:userId/:job_id/", checkShortlistStatus);
router.get("/today-shortlists", getTodayShortlistsGroupedByCompany);
router.get("/eligible-upcoming", getEligibleUpcomingOAs);
router.get("/eligible-past/:userId", getEligiblePastOAs);

export default router;