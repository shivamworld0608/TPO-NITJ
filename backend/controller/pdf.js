import PDF from '../models/pdf.js';
import fs from 'fs';

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
      uploadedBy: req.user.userId
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
    fs.unlinkSync(pdf.filepath);
    await PDF.findByIdAndDelete(req.params.id);

    res.json({ message: 'PDF deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

