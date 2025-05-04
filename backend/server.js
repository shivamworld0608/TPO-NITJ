import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
/* import configureWebSocket from "./utils/websocket.js"; */
import http from "http";

import authroutes from "./routes/auth.js";
import interviewroutes from "./routes/interview.js";
import oaroutes from "./routes/oa.js";
import gdroutes from "./routes/gd.js";
import profileroutes from "./routes/profile.js";
import devteamroutes from "./routes/devteam.js";
import jobprofileroutes from "./routes/jobprofile.js";
import formTemplateroutes from "./routes/formTemplate.js";
import sharedexperienceroutes from "./routes/sharedexperience.js";
import placementroutes from "./routes/placement.js";
import internshiptroutes from "./routes/internship.js";
import reqhelproutes from "./routes/reqhelp.js";
import jobEventroutes from "./routes/jobEvents.js"
import pdfroutes from "./routes/pdf.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import jafRoutes from "./routes/jaf.js";
import travelplannerRoutes from "./routes/travelplanner.js";
import studentanalysisRoutes from "./routes/studentanalysis.js";
import companiesanalysisRoutes from "./routes/companiesanalysis.js";
import contactusRoutes from "./routes/contactus.js";
import conversationRoutes from "./routes/conversation.js";
/* import mailboxRoutes from "./routes/mailbox.js"; */
import pplacementReportroutes from "./routes/pplacementReportRoute.js";
import resumeroutes from "./routes/resume.js"
import otherRoutes from "./routes/other.js";
import notificationRoutes from "./routes/notification.js";
import studentsRoutes from "./routes/addstudents.js";
import nodemailerRoutes from "./routes/nodemailer.js";
import adminRoutes from "./routes/admin.js";
import captchaRoutes from "./routes/captcha.js";
import addRecruiterRoutes from "./routes/addrecruiter.js";
import questionbankRoutes from "./routes/questionbank.js";
import mockassessmentRoutes from "./routes/mock-assessement.js"

import { mkdir } from 'fs/promises';
try {
  await mkdir('uploads/pdfs', { recursive: true });
} catch (err) {
  console.error('Error creating uploads directory:', err);
}


const app = express();
/* const server = http.createServer(app);
configureWebSocket(server); */


dotenv.config();
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
app.use(cookieParser());
app.use(express.json());

/* const client = redis.createClient();
 

// Connect to Redis (using async/await pattern)
/* (async () => {
  await client.connect();
 
})(); */

const authenticate = (req, res, next) => {
 
    const token = req.cookies?.token;
    if (!token) {
 
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
 
    }
    catch (err) {
      return res.status(401).json({ message: 'Invalid or Expired token' });

    }
  };

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
 
})
.catch((err)=>{
 
})


app.get('/check-auth', authenticate, (req, res) => {
  res.status(200).json({ message: 'Authenticated', user: req.user, userType:req.user.userType });
});

app.use('/uploads', express.static('uploads'));

app.use('/auth', authroutes);
app.use('/interview',authenticate, interviewroutes);
app.use('/oa',authenticate,oaroutes);
app.use('/gd',authenticate,gdroutes);
app.use('/profile',authenticate, profileroutes);
app.use('/devteam',devteamroutes);
app.use('/jobprofile',authenticate,jobprofileroutes);
app.use('/sharedexperience',authenticate,sharedexperienceroutes);
app.use("/placements",placementroutes);
app.use('/pplacementReport', pplacementReportroutes);
app.use("/internships",internshiptroutes);
app.use("/reqhelp",authenticate,reqhelproutes);
app.use("/job-events",jobEventroutes);
app.use("/feedback",authenticate,feedbackRoutes);
app.use("/jaf",authenticate,jafRoutes);
app.use("/travel-planner",authenticate,travelplannerRoutes);
app.use("/student-analysis",studentanalysisRoutes);
app.use("/companies-analysis",authenticate,companiesanalysisRoutes);
app.use('/api/pdfs', authenticate, pdfroutes);
app.use('/api',authenticate, formTemplateroutes);
app.use('/contactus',contactusRoutes);
app.use('/conversations',authenticate,conversationRoutes);
/* app.use('/mailbox',authenticate,mailboxRoutes); */
app.use('/resume',authenticate, resumeroutes);
app.use('/others',authenticate, otherRoutes);
app.use('/notification',authenticate,notificationRoutes);
app.use('/add-student',authenticate,studentsRoutes);
app.use('/nodemailer',authenticate,nodemailerRoutes);
app.use('/admin',authenticate,adminRoutes);
app.use('/captcha',captchaRoutes);
app.use('/add-recruiter', authenticate, addRecruiterRoutes);
app.use('/question-bank', authenticate, questionbankRoutes);
app.use('/mock-assessment',authenticate,mockassessmentRoutes);
app.use('/attempt/:assessment',authenticate,mockassessmentRoutes);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log("App running on port: ", port);
});