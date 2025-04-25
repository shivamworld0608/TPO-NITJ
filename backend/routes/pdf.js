import express from "express";
import upload from "../utils/multer.js";
const router = express.Router();
import {
  uploadPDF,
  getAllPDFs,
  downloadPDF,
  deletePDF,
} from "../controller/pdf.js";

router.post("/upload", upload.single("pdf"), uploadPDF);
router.get("/", getAllPDFs);
router.get("/download/:id", downloadPDF);
router.delete("/:id", deletePDF);

export default router;
