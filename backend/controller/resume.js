import Resume from "../models/resume";

export const saveResume=  async (req, res) => {
    try {
      const newResume = new Resume(req.body);
      await newResume.save();
      res.status(201).json(newResume);
    } catch (error) {
      res.status(400).json(error);
    }
  };

export const CreateResume= async (req, res) => {
    try {
      const updatedResume = await Resume.findOneAndUpdate(
        { studentId: req.params.studentId },
        req.body,
        { new: true }
      );
      if (!updatedResume) return res.status(404).json({ message: "Resume not found" });
      res.json(updatedResume);
    } catch (error) {
      res.status(500).json(error);
    }
  };

export const DeleteResume=async (req, res) => {
    try {
      const deletedResume = await Resume.findOneAndDelete({ studentId: req.params.studentId });
      if (!deletedResume) return res.status(404).json({ message: "Resume not found" });
      res.json({ message: "Deleted Successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  };