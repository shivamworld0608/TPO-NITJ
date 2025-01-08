import express from "express";
const router=express.Router();

import {
    submitExperience,
    getAllExperiences,
    getExperience,
    updateExperience,
    deleteExperience
    } from "../controller/sharedexperience.js";


router.get('/', getAllExperiences);
router.get('/:id', getExperience);

router.post('/submit', submitExperience);
router.put('/:id', updateExperience);
router.delete('/:id', deleteExperience);

export default router;