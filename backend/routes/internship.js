import express from "express";
import { getLastSevenDaysInternships } from "../controller/internship.js";
const router=express.Router();

router.get("/last-seven-days",getLastSevenDaysInternships);

export default router;