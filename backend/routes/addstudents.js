import express from "express";
const router=express.Router();

import {addStudent} from "../controller/add-students.js";

router.post("/",addStudent);

export default router;