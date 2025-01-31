import PDF from '../models/pdf.js';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

export const uploadPDF = async (req, res) => {
  const pdf = req.file.path;
  try {
    const uploadedFile = await cloudinary.uploader.upload(pdf, {
      resource_type: "raw",
      folder: "pdfs",
    });

    fs.unlinkSync(pdf);
    const newPDF = new PDF({
      title: req.body.title,
      filename: req.file.filename,
      filepath: uploadedFile.secure_url,
      size: req.file.size,
      uploadedBy: req.user.userId,
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
      .populate('uploadedBy', 'name email');
    res.json(pdfs);
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
    pdf.downloads += 1;
    await pdf.save();
    res.json({ url: pdf.filepath });
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
    await PDF.findByIdAndDelete(req.params.id);
    res.json({ message: 'PDF deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

