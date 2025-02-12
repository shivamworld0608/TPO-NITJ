import express from "express";
const router=express.Router();

import {LockedResendOTP,LockedverifyOTP,sendOtp,verifyOtp,resetPassword,login,logout,ssignup,rsignup,psignup} from "../controller/auth.js";

router.post("/login",login);
router.post('/logout',logout);
router.post('/send-otp',sendOtp);
router.post('/verify-otp',verifyOtp);
router.post('/locked-verify-otp',LockedverifyOTP);
router.post('/locked-resend-otp',LockedResendOTP);
router.post('/reset-password',resetPassword);
router.post("/student/signup",ssignup);
router.post("/professor/signup",psignup);
router.post("/recuiter/signup",rsignup);

export default router;