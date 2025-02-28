import express from "express";
const router=express.Router();

import {addrecruiter, getrecruiter} from "../controller/add-recruiter.js";

router.post("/add",addrecruiter);
router.post('/get', getrecruiter);

export default router;