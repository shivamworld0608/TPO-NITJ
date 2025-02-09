//jobprofile
import JobProfile from "../models/jobprofile.js";

export const getAllJobProfiles = async (req, res) => {
  try {
    console.log("hello");
    const jobProfiles = await JobProfile.find().populate("Applied_Students");
    res.status(200).json(jobProfiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job profiles", error });
  }
};

export const updateJobProfile = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      const updatedProfile = await JobProfile.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedProfile) {
        return res.status(404).json({ message: "Job profile not found" });
      }
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: "Error updating job profile", error });
    }
  };

  export const deleteJobProfile = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedProfile = await JobProfile.findByIdAndDelete(id);
      if (!deletedProfile) {
        return res.status(404).json({ message: "Job profile not found" });
      }
      res.status(200).json({ message: "Job profile deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting job profile", error });
    }
  };

  export const bulkDeleteJobProfiles = async (req, res) => {
    const { ids } = req.body;
  
    try {
      await JobProfile.deleteMany({ _id: { $in: ids } });
      res.status(200).json({ message: "Bulk deletion successful" });
    } catch (error) {
      res.status(500).json({ message: "Error during bulk deletion", error });
    }
  };

  export const toggleJobProfileVisibility = async (req, res) => {
    const { id } = req.params;
    const { show } = req.body;
  
    try {
      const updatedProfile = await JobProfile.findByIdAndUpdate(
        id,
        { show: !show },
        { new: true }
      );
      if (!updatedProfile) {
        return res.status(404).json({ message: "Job profile not found" });
      }
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: "Error toggling visibility", error });
    }
  };