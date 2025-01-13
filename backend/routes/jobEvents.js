// routes/jobEvents.js
import express from 'express';
import { getJobEvents, createJobProfile } from '../controller/jobevents.js';

const router = express.Router();

router.get('/', getJobEvents);
router.post('/', createJobProfile);


export default router;