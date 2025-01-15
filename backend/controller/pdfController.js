// controllers/pdfController.js
import PDF from '../models/pdf.js';
import path from 'path';
import { promises as fs } from 'fs';
import multer from 'multer';

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/pdfs');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newPDF = new PDF({
      title: req.body.title,
      description: req.body.description || '',
      filename: req.file.filename,
      filepath: req.file.path,
      size: req.file.size,
      thumbnail: req.body.thumbnail || '',
      uploadedBy: req.user.id // Add user ID from auth middleware
    });

    await newPDF.save();
    res.status(201).json(newPDF);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPDFs = async (req, res) => {
  try {
    const pdfs = await PDF.find()
      .sort({ uploadDate: -1 })
      .populate('uploadedBy', 'name email'); // Populate user details
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPDFById = async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id)
      .populate('uploadedBy', 'name email');
    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }
    res.json(pdf);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadPDF = async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);
    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    // Increment download count
    pdf.downloads += 1;
    await pdf.save();

    res.download(pdf.filepath, pdf.filename);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePDF = async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);
    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    // Check if user has permission to delete
    if (pdf.uploadedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this PDF' });
    }

    // Delete file from storage
    await fs.unlink(pdf.filepath);
    // Delete from database
    await PDF.findByIdAndDelete(req.params.id);

    res.json({ message: 'PDF deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

