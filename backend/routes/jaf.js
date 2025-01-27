import express from "express";
const router=express.Router();

import {
    createJobAnnouncementForm,getjaf
    } from "../controller/jaf.js";

router.post("/create", createJobAnnouncementForm);
router.get("/get",getjaf);

export default router;