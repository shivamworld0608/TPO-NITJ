import express from "express";
const router = express.Router();

import multer from "multer";
import path from "path";
import fs from "fs";


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
import {
  getAllDepartments,
  updateDepartmentProfile,
  deleteDepartmentProfiles,
  addNewDepartment,
  getDepartmentById,
} from "../controller/Admin/Department.js";

import{
  getAllDevelopers,
  updateDeveloperProfile,
  deleteDeveloperProfiles,
  addNewDeveloper,
} from "../controller/Admin/Devteam.js";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/developers";
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  }
});

const upload = multer({ storage });


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
//department profile routes
router.get("/departments", getAllDepartments);
router.put("/departments/:id", updateDepartmentProfile);
router.delete("/departments", deleteDepartmentProfiles);
router.post("/departments", addNewDepartment);
router.get("/departments/:id", getDepartmentById);

//developer profile routes
router.get("/devteam", getAllDevelopers);
router.put("/devteam/:id",upload.single("imageFile"), updateDeveloperProfile);
router.delete("/devteam", deleteDeveloperProfiles);
router.post("/devteam",upload.single("imageFile"), addNewDeveloper);

export default router;