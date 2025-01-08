import express from "express";
import { getAllPlacements, getFilteredPlacements, getLastSevenDaysPlacements, getTodayPlacements } from "../controller/placement.js";
const router=express.Router();

router.get("/today",getTodayPlacements);
router.get("/last-seven-days",getLastSevenDaysPlacements);
router.get("/",getAllPlacements);
router.get("/filter",getFilteredPlacements);

export default router;