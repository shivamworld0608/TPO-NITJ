import express from "express";
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises'; // For async file operations
import { existsSync, mkdirSync } from 'fs'; // Import synchronous methods
const router = express.Router();

import {createNOC, getAllNOCs, getNOCById, updateNOC, deleteNOC, uploadOfferLetter, getAllNOCstoprofessors} from '../controller/noc.js';

const uploadDir = path.join(process.cwd(), 'uploads', 'offer-letters');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/offer-letters/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

router.post('/', createNOC);
router.get('/', getAllNOCs);
router.get('/getonp', getAllNOCstoprofessors);
router.post('/upload-offer-letter/:id', upload.single('offerLetter'), uploadOfferLetter);
router.get('/:id', getNOCById);
router.put('/:id', updateNOC);
router.delete('/:id', deleteNOC);

export default router;