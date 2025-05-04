import express from 'express';
const router = express.Router();
import {getStudentAnalytics,Studentprofileupdate,updateOfferTracker} from '../controller/studentanalysis.js';

router.get('/get',getStudentAnalytics);
router.put('/profile-update/:id',Studentprofileupdate);
router.put('/offer-tracker-update/:id', updateOfferTracker);
export default router;