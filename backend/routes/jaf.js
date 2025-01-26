import express from "express";
const router=express.Router();

import {
    createJobAnnouncementForm
    } from "../controller/jaf.js";

router.post("/create", createJobAnnouncementForm);

export default router;