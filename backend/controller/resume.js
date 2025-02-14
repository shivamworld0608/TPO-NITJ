import Resume from "../models/resume.js";

export const CreateOrUpdateResume = async (req, res) => {
  try {
      const studentId = req.user.userId;
      const resumeData = { ...req.body, student_id: studentId };

      let existingResume = await Resume.findOne({ student_id: studentId });

      if (existingResume) {
          existingResume = await Resume.findOneAndUpdate(
              { student_id: studentId },
              { $set: resumeData },
              { new: true, runValidators: true }
          );
          return res.status(200).json(existingResume);
      } else {
          const newResume = new Resume(resumeData);
          await newResume.save();
          return res.status(201).json(newResume);
      }
  } catch (error) {
    console.error("Error in CreateOrUpdateResume:", error);
    res.status(400).json({ error: error.message });
    
  }
};

export const DeleteResume=async (req, res) => {
    try {
      const deletedResume = await Resume.findOneAndDelete({ student_id: req.user.userId });
      if (!deletedResume) return res.status(404).json({ message: "Resume not found" });
      res.json({ message: "Deleted Successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  };

export const GetResumeData= async (req, res) => {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    

        const dataResume = await Resume.findOne({ student_id: req.user.userId });

        if (!dataResume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.status(200).json({ data: dataResume });
    } catch (error) {
        console.error("Error fetching resume data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}