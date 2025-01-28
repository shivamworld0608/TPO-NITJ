import express from 'express';
const router = express.Router();
import {getStudentAnalytics,Studentprofileupdate} from '../controller/studentanalysis.js';

router.get('/get',getStudentAnalytics);
router.put('/profile-update/:id',Studentprofileupdate);

export default router;