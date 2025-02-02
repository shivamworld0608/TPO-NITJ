import express from "express";
const router=express.Router();

import {
    getEligibleUpcomingOAs,
    getEligiblePastOAs,} from "../controller/oa.js";

router.get("/eligible-upcoming", getEligibleUpcomingOAs);
router.get("/eligible-past", getEligiblePastOAs);

export default router;