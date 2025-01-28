import express from 'express';
const router = express.Router();
import {getStudentAnalytics,Studentprofileupdate} from '../controller/studentanalysis.js';

router.get('/get',getStudentAnalytics);
router.post('/profile-update',Studentprofileupdate);

export default router;