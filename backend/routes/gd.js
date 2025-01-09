import express from "express";
const router=express.Router();

import {
    getEligibleUpcomingGDs,
    getEligiblePastGDs,} from "../controller/gd.js";

router.get("/eligible-upcoming", getEligibleUpcomingGDs);
router.get("/eligible-past", getEligiblePastGDs);

export default router;