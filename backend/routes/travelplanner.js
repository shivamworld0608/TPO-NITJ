import express from 'express';
const router = express.Router();
import {createtp,gettp} from '../controller/travelplanner.js';

router.post('/create',createtp);
router.get('/get',gettp);

export default router;