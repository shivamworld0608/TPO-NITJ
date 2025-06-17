import Event from '../models/Event.js';
import multer from 'multer';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { promises as fs } from 'fs'; // Import fs promises for unlink

// Ensure the uploads/events directory exists
const uploadDir = path.join(process.cwd(), 'uploads', 'events');
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

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  console.log('File received in fileFilter:', file); // Debug
  if (!file || !file.originalname) {
    console.log('No file provided, skipping');
    return cb(null, false);
  }
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    console.log('File accepted:', file.originalname);
    return cb(null, true);
  }
  console.log('File rejected:', file.originalname);
  cb(new Error('Only .jpg, .jpeg, and .png files are allowed!'));
};

const upload = multer({
  storage,
  fileFilter,
});

export const getEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.status(200).json(events);
};

export const createEvent = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const { title, description, date, timing, speaker, department, link, venue} = req.body;

    // Parse department if it's a JSON string
    let parsedDepartment = department;
    if (typeof department === 'string') {
      try {
        parsedDepartment = JSON.parse(department);
      } catch (e) {
        parsedDepartment = [department];
      }
    }

    // Validate department array
    if (!Array.isArray(parsedDepartment) || parsedDepartment.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Department must be a non-empty array',
      });
    }

    const eventData = {
      title,
      description,
      date: new Date(date),
      timing,
      speaker,
      department: parsedDepartment,
      link: link || '',
      venue: venue || '',
      image: req.file ? `/uploads/events/${req.file.filename}` : '',
    };

    const event = await Event.create(eventData);
    res.status(201).json(event);
  });
};

export const updateEvent = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    const { id } = req.params;
    const { title, description, date, timing, speaker, department, link, venue } = req.body;

    // Parse department if it's a JSON string
    let parsedDepartment = department;
    if (typeof department === 'string') {
      try {
        parsedDepartment = JSON.parse(department);
      } catch (e) {
        parsedDepartment = [department];
      }
    }

    // Validate department array
    if (!Array.isArray(parsedDepartment) || parsedDepartment.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Department must be a non-empty array',
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Update fields
    event.title = title;
    event.description = description;
    event.date = new Date(date);
    event.timing = timing;
    event.speaker = speaker;
    event.department = parsedDepartment;
    event.venue = venue || '';
    event.link = link || '';
    if (req.file) {
      // Optionally delete old image if a new one is uploaded
      if (event.image) {
        const oldImagePath = path.join(process.cwd(), event.image);
        if (existsSync(oldImagePath)) {
          await fs.unlink(oldImagePath);
        }
      }
      event.image = `/uploads/events/${req.file.filename}`;
    }

    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  });
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  // Delete the image file if it exists
  if (event.image) {
    const imagePath = path.join(process.cwd(), event.image);
    if (existsSync(imagePath)) {
      await fs.unlink(imagePath);
    }
  }

  await event.deleteOne();
  res.status(200).json({ message: 'Event deleted successfully' });
};

export const getEventbyStudent = async (req, res) => {
  const { department } = req.query;

  if (!department) {
    return res.status(400).json({ success: false, message: 'Department is required' });
  }

  // Find events that match the department or have 'ALL' in their department array
  const events = await Event.find({
    $or: [
      { department: { $in: [department] } },
      { department: { $in: ['ALL'] } }
    ]
  });

  if (!events || events.length === 0) {
    return res.status(404).json({ success: false, message: 'No events found' });
  }

  res.status(200).json(events);
}