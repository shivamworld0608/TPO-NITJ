import express from "express";
import { getAllPlacements, getCombinedInsights, getFilteredPlacements, getLastSevenDaysPlacements, getPlacementInsights, getTodayPlacements } from "../controller/placement.js";
const router=express.Router();

router.get("/today",getTodayPlacements);
router.get("/last-seven-days",getLastSevenDaysPlacements);
router.get("/",getAllPlacements);
router.get("/filter",getFilteredPlacements);
router.get("/insights",getPlacementInsights);
router.get("/cominsights",getCombinedInsights);

export default router;