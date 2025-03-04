import express from "express";
const router = express.Router();
import { createAssessment, getAssessments, getAssessmentResults } from '../controller/mock-assessment/professor.js';
import {runCode,incrementCopyPaste, getAssessmentById,updateAttemptStatus,getUpcomingAssessments, getOngoingAssessments, getAttemptedAssessments, getAttempt,getSubmissions,startAssessment, submitCode, logTabSwitch} from '../controller/mock-assessment/student.js';


//for professor dashboard
router.post('/assessments', createAssessment);
router.get('/assessments',getAssessments);
router.get('/assessments/:id/results', getAssessmentResults);


//home page routes on student dashboard
router.get('/assessments/upcoming', getUpcomingAssessments);
router.get('/assessments/ongoing', getOngoingAssessments);
router.get('/assessments/attempted', getAttemptedAssessments);


//starting any assessment on home screen
router.post('/assessments/:id/start', startAssessment);


router.get('/attempts/:id', getAttempt); 
router.get('/assessments/:id', getAssessmentById); // Correctly under student routes
router.put('/attempts/:id', updateAttemptStatus);
router.get('/attempts/:id/submissions', getSubmissions);
router.post('/attempts/submit',submitCode);
router.post('/attempts/run',runCode);
router.post('/attempts/tab-switch', logTabSwitch);
router.post('/attempts/copy-paste', incrementCopyPaste);
export default router;