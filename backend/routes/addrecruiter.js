import express from "express";
const router=express.Router();

import {addrecruiter, getrecruiter,deleterecruiter,updaterecruiter} from "../controller/add-recruiter.js";

router.post("/add",addrecruiter);
router.get('/get', getrecruiter);
router.delete('/delete/:id', deleterecruiter);
router.put('/update/:id', updaterecruiter);

export default router;