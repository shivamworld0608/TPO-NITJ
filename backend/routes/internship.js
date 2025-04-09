import express from "express";
import { getAllInternships, getCombinedInsights, getFilteredInternships, getLastSevenDaysInternships, getInternshipsInsights, getTodayInternships } from "../controller/internship.js";
const router=express.Router();

router.get("/today",getTodayInternships);
router.get("/last-seven-days",getLastSevenDaysInternships);
router.get("/",getAllInternships);
router.get("/filter",getFilteredInternships);
router.get("/insights",getInternshipsInsights);
router.get("/cominsights",getCombinedInsights);

export default router;