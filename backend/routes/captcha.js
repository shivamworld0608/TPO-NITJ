import express from "express";
const router=express.Router();

import {getCaptchaChallenge,verifyCaptchaSolution} from "../controller/captchaController.js";

router.get("/challenge", getCaptchaChallenge);
router.post("/verify", verifyCaptchaSolution);

export default router;

