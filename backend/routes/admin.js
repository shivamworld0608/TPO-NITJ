import express from "express";
const router = express.Router();
import {
  getAllJobProfiles,
  updateJobProfile,
  deleteJobProfile,
  bulkDeleteJobProfiles,
  toggleJobProfileVisibility,
  getAllStudents,
  updateStudentProfile,
  deleteStudentProfiles,
  addNewStudent,
  getAllRecruiters,
  updateRecruiterProfile,
  deleteRecruiterProfiles,
  addNewRecruiter
} from "../controller/admin.js";
//job profile routes
router.get("/jobprofiles", getAllJobProfiles);
router.put("/jobprofiles/:id", updateJobProfile);
router.delete("/jobprofiles/:id", deleteJobProfile);
router.post("/jobprofiles/bulk-delete", bulkDeleteJobProfiles);
router.put("/jobprofiles/:id/toggle-visibility", toggleJobProfileVisibility);
//student profile routes
router.get("/students", getAllStudents);
router.put("/students/:id",updateStudentProfile);
router.post("/students",addNewStudent);
router.delete("/students", deleteStudentProfiles);
//recruiter profile routes
router.get("/recruiters", getAllRecruiters);
router.put("/recruiters/:id",updateRecruiterProfile);
router.post("/recruiters",addNewRecruiter);
router.delete("/recruiters", deleteRecruiterProfiles);

export default router;