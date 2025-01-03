import express from "express";
const router=express.Router();

import {getAllDevelopers} from "../controller/devteam.js";

router.get("/get",getAllDevelopers);

export default router;