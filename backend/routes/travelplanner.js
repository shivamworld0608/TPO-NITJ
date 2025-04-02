import express from 'express';
const router = express.Router();
import {createtp,gettp, getTravelPlanner, updatefoodtp, updateroomtp, updatevehicletp} from '../controller/travelplanner.js';

router.post('/create',createtp);
router.get('/get',gettp);
router.post('/food',updatefoodtp);
router.post('/room',updateroomtp);
router.post('/vehicle',updatevehicletp);
router.get('/getttp',getTravelPlanner);

export default router;