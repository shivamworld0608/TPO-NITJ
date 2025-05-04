import express from 'express';
import { getPlacementReports, getFilterOptions } from '../controller/pplacementReport.js';
const router = express.Router();
console.log("pplacementReportRoute loaded"); 
router.get('/placement-reports', getPlacementReports);
router.get('/placement-report-filters', getFilterOptions);
export default router;