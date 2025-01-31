import express from 'express';
import {CreateOrUpdateResume,DeleteResume,GetResumeData } from '../controller/resume.js ';
const router = express.Router();

router.post("/",CreateOrUpdateResume);
router.get('/getresumedata',GetResumeData)
router.delete("/deleteresume", DeleteResume);

export default router;