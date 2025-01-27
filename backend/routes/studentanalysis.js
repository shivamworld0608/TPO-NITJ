import express from 'express';
const router = express.Router();
import {getStudentAnalytics} from '../controller/studentanalysis.js';

router.get('/get',getStudentAnalytics);

export default router;