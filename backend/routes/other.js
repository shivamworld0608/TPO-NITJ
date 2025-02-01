import express from "express";
const router = express.Router();

import {
    getEligibleUpcomingOthers,
    getEligiblePastOthers,
} from "../controller/others.js";

router.get("/eligible-upcoming", getEligibleUpcomingOthers);
router.get("/eligible-past", getEligiblePastOthers);

export default router;
