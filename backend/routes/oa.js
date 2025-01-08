import express from "express";
const router=express.Router();

import {
    /* getTodayShortlistsGroupedByCompany, */
    getEligibleUpcomingOAs,
    getEligiblePastOAs,} from "../controller/oa.js";
/* router.get("/today-shortlists", getTodayShortlistsGroupedByCompany); */
router.get("/eligible-upcoming", getEligibleUpcomingOAs);
router.get("/eligible-past", getEligiblePastOAs);

export default router;