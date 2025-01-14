// routes/pdfRoutes.js
import express from 'express';
import { 
  uploadPDF, 
  getAllPDFs, 
  getPDFById, 
  downloadPDF, 
  deletePDF,
  upload 
} from '../controller/pdfController.js';

const router = express.Router();

// PDF routes
router.post('/upload', upload.single('pdf'), uploadPDF);
router.get('/', getAllPDFs);
router.get('/:id', getPDFById);
router.get('/download/:id', downloadPDF);
router.delete('/:id', deletePDF);

export default router;