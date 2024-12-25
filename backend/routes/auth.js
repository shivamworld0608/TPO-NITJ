import express from "express";
const router=express.Router();

import {login,logout,ssignup,rsignup,psignup} from "../controller/auth.js";

router.post("/login",login);
router.post('/logout',logout);
router.post("/student/signup",ssignup);
router.post("/professor/signup",psignup);
router.post("/recuiter/signup",rsignup);

export default router;