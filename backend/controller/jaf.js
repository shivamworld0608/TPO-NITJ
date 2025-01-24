import JobAnnouncement from '../models/JobAnnouncement.js';

export const jobAnnouncementController = {
  create: async (req, res) => {
    try {
      const announcement = new JobAnnouncement(req.body);
      const savedAnnouncement = await announcement.save();
      res.status(201).json(savedAnnouncement);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all job announcements with pagination
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const announcements = await JobAnnouncement.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await JobAnnouncement.countDocuments();

      res.status(200).json({
        announcements,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalAnnouncements: total
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get single job announcement by ID
  getById: async (req, res) => {
    try {
      const announcement = await JobAnnouncement.findById(req.params.id);
      if (!announcement) {
        return res.status(404).json({ message: 'Job announcement not found' });
      }
      res.status(200).json(announcement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update job announcement
  update: async (req, res) => {
    try {
      const announcement = await JobAnnouncement.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!announcement) {
        return res.status(404).json({ message: 'Job announcement not found' });
      }
      res.status(200).json(announcement);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete job announcement
  delete: async (req, res) => {
    try {
      const announcement = await JobAnnouncement.findByIdAndDelete(req.params.id);
      if (!announcement) {
        return res.status(404).json({ message: 'Job announcement not found' });
      }
      res.status(200).json({ message: 'Job announcement deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Search job announcements
  search: async (req, res) => {
    try {
      const { query } = req.query;
      const announcements = await JobAnnouncement.find({
        $or: [
          { organizationName: { $regex: query, $options: 'i' } },
          { sector: { $regex: query, $options: 'i' } },
          { 'designations.title': { $regex: query, $options: 'i' } }
        ]
      });
      res.status(200).json(announcements);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Filter job announcements
  filter: async (req, res) => {
    try {
      const { sector, category, academicYear } = req.query;
      const filterQuery = {};

      if (sector) filterQuery.sector = sector;
      if (category) filterQuery.category = category;
      if (academicYear) filterQuery.academicYear = academicYear;

      const announcements = await JobAnnouncement.find(filterQuery);
      res.status(200).json(announcements);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update announcement status
  updateStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const announcement = await JobAnnouncement.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );
      if (!announcement) {
        return res.status(404).json({ message: 'Job announcement not found' });
      }
      res.status(200).json(announcement);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export default jobAnnouncementController;