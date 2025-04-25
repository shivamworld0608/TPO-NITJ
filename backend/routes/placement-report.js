import express from "express";
import { getPlacementReportPDF } from "../controller/placement-report.js";

const router = express.Router();

router.get("/", getPlacementReportPDF);
export default router;
