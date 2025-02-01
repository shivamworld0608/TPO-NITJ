import express from "express";
const router=express.Router();

import {
    approveJAF,
    createJobAnnouncementForm,getjaf,
    rejectJAF,
    updateJAF
    } from "../controller/jaf.js";

router.post("/create", createJobAnnouncementForm);
router.get("/get",getjaf);
router.put("/approvejaf/:_id", approveJAF);
router.put("/rejectjaf/:_id", rejectJAF);
router.put("/updatejaf/:_id", updateJAF);

export default router;