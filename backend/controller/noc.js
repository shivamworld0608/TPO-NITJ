import mongoose from 'mongoose';
import NOC from '../models/noc.js';
import NOCIdTracker from '../models/nocidtracker.js';

function getTodayDateString() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yy = String(today.getFullYear()).slice(2);
  return `${dd}${mm}${yy}`; // e.g. 310525
}

export const createNOC = async (req, res) => {
  console.log("req.body", req.body);
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const dateStr = getTodayDateString();

    let tracker = await NOCIdTracker.findOne({ date: dateStr }).session(session);
    if (!tracker) {
      tracker = await NOCIdTracker.create([{ date: dateStr, lastNumber: 1898 }], { session });
      tracker = tracker[0];
    }

    tracker.lastNumber += 1;
    await tracker.save({ session });

    const nocId = `NITJ/CTP/${dateStr}/${tracker.lastNumber}`;
    const studentId = req.user.userId;

    const newNOC = new NOC({ ...req.body, nocId, studentId });
    await newNOC.save({ session });

    await session.commitTransaction();
    res.status(201).json(newNOC);
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};
export const uploadOfferLetter = async (req, res) => {
  try {
    const nocId = req.params.id;
    const noc = await NOC.findById(nocId);
    
    if (!noc) {
      return res.status(404).json({ message: 'NOC not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ message: 'Only PDF files are allowed' });
    }

    // Assuming the file is stored on the server, update the offerLetter field with the file path
    const filePath = `/uploads/offer-letters/${req.file.filename}`;
    
    noc.offerLetter = filePath;
    await noc.save();
   console.log("filePath", filePath);
    res.status(200).json({ 
      message: 'Offer letter uploaded successfully',
      offerLetter: filePath 
    });
  } catch (error) {
    console.error('Error uploading offer letter:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllNOCs = async (req, res) => {
  try {
    const nocs = await NOC.find();
    res.status(200).json(nocs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllNOCstoprofessors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const nocs = await NOC.find()
      .skip(skip)
      .limit(limit);
    
    const total = await NOC.countDocuments();

    res.status(200).json({
      nocs,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNOCById = async (req, res) => {
  try {
    const noc = await NOC.findById(req.params.id);
    if (!noc) return res.status(404).json({ message: 'NOC not found' });
    res.status(200).json(noc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateNOC = async (req, res) => {
  try {
    const updatedNOC = await NOC.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNOC) return res.status(404).json({ message: 'NOC not found' });
    res.status(200).json(updatedNOC);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteNOC = async (req, res) => {
  try {
    const deletedNOC = await NOC.findByIdAndDelete(req.params.id);
    if (!deletedNOC) return res.status(404).json({ message: 'NOC not found' });
    res.status(200).json({ message: 'NOC deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
