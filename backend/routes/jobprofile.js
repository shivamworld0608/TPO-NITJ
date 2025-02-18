import express from "express";
const router=express.Router();

import {toggleEditingAllowed,getEditingAllowedStatus,incompletedJobProfile,updateInterviewLink,updategdLink,updateOthersLink, updateoaLink , checkEligibility, getJobProfiletostudent,getJobProfiledetails, getJobsByRecruiter,createJobProfile,createJobProfilecopy,updateJob,deleteJob,getJobProfilesForProfessors,approveJobProfile,rejectJobProfile,addshortlistStudents,eligibleinthis,viewshortlisting,getspecificJobProfilesForProfessors, completedJobProfile, getAllCompanies } from "../controller/jobprofile.js";

router.get("/", getAllCompanies);
router.get("/eligibility/:_id/", checkEligibility);
router.get("/getjobs", getJobProfiletostudent);



router.post("/createjob", createJobProfile);
router.post("/createjobcopy", createJobProfilecopy);
router.put("/updatejob/:_id", updateJob);
router.delete("/deletejob/:_id", deleteJob);
router.get("/recruiter/getjobs/:company", getJobsByRecruiter);


router.get("/professor/getjobs", getJobProfilesForProfessors);
router.get("/professor/getjobs/:id", getspecificJobProfilesForProfessors);
router.put("/approvejob/:_id", approveJobProfile);
router.put("/incompletejob/:_id", incompletedJobProfile);
router.put("/completejob/:_id", completedJobProfile);
router.put("/rejectjob/:_id", rejectJobProfile);
router.post("/add-shortlist-students", addshortlistStudents);


router.post("/eligible_students",eligibleinthis);
router.post("/shortlisted_students",viewshortlisting);
router.post("/set-interview-links",updateInterviewLink );
router.post("/set-gd-links",updategdLink );
router.post("/set-oa-links",updateoaLink );
router.post("/set-others-links",updateOthersLink );


router.get("/editing-allowed-status/:company",getEditingAllowedStatus );
router.put("/toggle-editing",toggleEditingAllowed );


router.get("/:_id", getJobProfiledetails);
export default router;