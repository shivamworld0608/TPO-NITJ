import express from "express";
const router=express.Router();

import {
  sendEmails} from "../controller/nodemailer.js";

router.post("/send-emails", sendEmails);

export default router;