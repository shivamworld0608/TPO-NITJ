import express from 'express';
import { getBrochures, addBrochure, updateBrochure, deleteBrochure } from '../controller/Brochure.js';

const router = express.Router();

router.get('/get', getBrochures);
router.post('/add', addBrochure);
router.put('/update/:id', updateBrochure);
router.delete('/delete', deleteBrochure);

export default router;