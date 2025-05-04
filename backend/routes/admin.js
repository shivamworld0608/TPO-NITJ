import express from "express";
const router = express.Router();
import {
  addJobProfile,
  getAllJobProfiles,
  updateJobProfile,
  deleteJobProfile,
  bulkDeleteJobProfiles,
  toggleJobProfileVisibility,
  getAllStudents,
  updateStudentProfile,
  deleteStudentProfiles,
  deactivateStudentProfiles,
  addNewStudent,
  getAllRecruiters,
  updateRecruiterProfile,
  deleteRecruiterProfiles,
  addNewRecruiter,
  getAllProfessors,
  updateProfessorProfile,
  deleteProfessorProfiles,
  addNewProfessor,
  getProfessorById,
} from "../controller/admin.js";
//job profile routes
router.post("/jobprofiles", addJobProfile);
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
router.patch("/students/deactivate/:id", deactivateStudentProfiles);
//recruiter profile routes
router.get("/recruiters", getAllRecruiters);
router.put("/recruiters/:id",updateRecruiterProfile);
router.post("/recruiters",addNewRecruiter);
router.delete("/recruiters", deleteRecruiterProfiles);
//professor profile routes
router.get("/professors", getAllProfessors);
router.put("/professors/:id",updateProfessorProfile);
router.post("/professors",addNewProfessor);
router.delete("/professors", deleteProfessorProfiles);
router.get("/professors/:id", getProfessorById);

export default router;