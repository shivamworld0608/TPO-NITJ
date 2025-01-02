import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import authroutes from "./routes/auth.js";
import interviewroutes from "./routes/interview.js";
import oaroutes from "./routes/oa.js";
import profileroutes from "./routes/profile.js";
import jobapplicationroutes from "./routes/jobapplication.js";

/* import applicationroutes from "./routes/application.js"; */
 import formTemplateroutes from "./routes/formTemplate.js"; 
/* import applicationformroutes from "./routes/applicationform.js"; */

const app = express();
dotenv.config();
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));

app.use(cookieParser());
app.use(express.json());

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
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
})


app.get('/check-auth', authenticate, (req, res) => {
  res.status(200).json({ message: 'Authenticated', user: req.user });
});

app.use('/auth', authroutes);
app.use('/interview', interviewroutes);
app.use('/oa',oaroutes);
app.use('/jobapplication',jobapplicationroutes);
app.use('/profile',authenticate, profileroutes);

app.use('/api', formTemplateroutes);
/* app.use('/applicationform',applicationformroutes); */

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
