import Recuiter from "../models/user_model/recuiter.js";

export const addrecruiter = async (req, res) => {
    const { email } = req.body;
    try {
      const existingRecruiter = await Recuiter.findOne({ email });
      if (existingRecruiter) {
        console.log(existingRecruiter);
        return res.status(401).json({ message: "Email already exists" });
      }
      const recruiter = new Recuiter(req.body);
      await recruiter.save();
      res.status(201).json(recruiter);
    } catch (error) {
      console.error("Error adding recruiter:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const getrecruiter = async (req, res) => {
    const recruiters = await Recuiter.find();
    res.json(recruiters);
  };

  export const deleterecruiter = async (req, res) => {
    const { id } = req.params;
    try {
      const recruiter = await Recuiter.findByIdAndDelete(id);
      if (!recruiter) {
        return res.status(404).json({ message: "Recruiter not found" });
      }
      res.status(200).json({ message: "Recruiter deleted successfully" });
    } catch (error) {
      console.error("Error deleting recruiter:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const updaterecruiter = async (req, res) => {
    const { id } = req.params;
    try {
      const recruiter = await Recuiter.findByIdAndUpdate(id, req.body, { new: true });
      if (!recruiter) {
        return res.status(404).json({ message: "Recruiter not found" });
      }
      res.status(200).json(recruiter);
    } catch (error) {
      console.error("Error updating recruiter:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  