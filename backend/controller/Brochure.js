import Brochure from '../models/Brochure.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises'; // For async file operations
import { existsSync, mkdirSync } from 'fs'; // Import synchronous methods

// Ensure the uploads/brochures directory exists
const uploadDir = path.join(process.cwd(), 'Uploads', 'brochures');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Get all brochures
export const getBrochures = async (req, res) => {
  try {
    const brochures = await Brochure.find();
    res.status(200).json({
      success: true,
      count: brochures.length,
      data: brochures,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching brochures',
      error: error.message,
    });
  }
};

// Add new brochure with file upload
export const addBrochure = [
  upload.single('brochure_file'),
  async (req, res) => {
    try {
      const { department_name, department_link } = req.body;

      // Validate required fields
      if (!department_name || !department_link || !req.file) {
        return res.status(400).json({
          success: false,
          message: 'All fields and PDF file are required',
        });
      }

      const brochure_link = `/Uploads/brochures/${req.file.filename}`;
      console.log('Saving file to:', path.join(uploadDir, req.file.filename)); // Debug log

      const newBrochure = await Brochure.create({
        department_name,
        department_link,
        brochure_link,
      });

      res.status(201).json({
        success: true,
        data: newBrochure,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error creating brochure',
        error: error.message,
      });
    }
  },
];

// Update existing brochure
export const updateBrochure = [
  upload.single('brochure_file'),
  async (req, res) => {
    try {
      const brochureId = req.params.id;
      const { department_name, department_link } = req.body;
      const updateData = { department_name, department_link };

      // Find the existing brochure
      const existingBrochure = await Brochure.findById(brochureId);
      if (!existingBrochure) {
        return res.status(404).json({
          success: false,
          message: 'Brochure not found',
        });
      }

      // If a new file is uploaded, delete the old file and update brochure_link
      if (req.file) {
        if (existingBrochure.brochure_link) {
          const oldFilePath = path.join(process.cwd(), existingBrochure.brochure_link.slice(1));
          try {
            await fs.access(oldFilePath);
            await fs.unlink(oldFilePath);
            console.log(`Deleted old file: ${oldFilePath}`);
          } catch (err) {
            if (err.code === 'ENOENT') {
              console.warn(`Old file not found, skipping deletion: ${oldFilePath}`);
            } else {
              console.error(`Error deleting old file ${oldFilePath}:`, err);
            }
          }
        }
        updateData.brochure_link = `/Uploads/brochures/${req.file.filename}`;
        console.log('Updating file to:', path.join(uploadDir, req.file.filename));
      }

      const updatedBrochure = await Brochure.findByIdAndUpdate(
        brochureId,
        updateData,
        { new: true, runValidators: true }
      );

      res.status(200).json({
        success: true,
        data: updatedBrochure,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error updating brochure',
        error: error.message,
      });
    }
  },
];

// Delete brochure
export const deleteBrochure = async (req, res) => {
  try {
    const { brochureIds } = req.body;

    if (!Array.isArray(brochureIds) || brochureIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No brochure IDs provided',
      });
    }

    // Delete files from storage
    const brochures = await Brochure.find({ _id: { $in: brochureIds } });
    for (const brochure of brochures) {
      if (brochure.brochure_link) {
        const filePath = path.join(process.cwd(), brochure.brochure_link.slice(1));
        try {
          await fs.access(filePath);
          await fs.unlink(filePath);
          console.log(`Deleted file: ${filePath}`);
        } catch (err) {
          if (err.code === 'ENOENT') {
            console.warn(`File not found, skipping deletion: ${filePath}`);
          } else {
            console.error(`Error deleting file ${filePath}:`, err);
          }
        }
      }
    }

    const result = await Brochure.deleteMany({ _id: { $in: brochureIds } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} brochure(s) deleted successfully`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting brochures',
      error: error.message,
    });
  }
};