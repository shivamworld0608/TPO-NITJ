import express from "express";
const router=express.Router();

import {submitContactForm,getContactForms} from "../controller/contactus.js";

router.post("/submit",submitContactForm);
router.get("/get",getContactForms);

export default router;