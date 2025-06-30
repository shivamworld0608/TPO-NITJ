import Devteam from '../../models/devteam.js';
import fs from 'fs';
import path from 'path';

export const getAllDevelopers = async (req, res) => {
  try {
    const developerProfiles = await Devteam.find();
    res.status(200).json(developerProfiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching developer profiles", error });
  }
};

export const updateDeveloperProfile = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
try {
  const existingProfile = await Devteam.findById(id);
  if (!existingProfile) {
    return res.status(404).json({ message: "Developer profile not found" });
  }
  if (req.file) {
   if (existingProfile.image) {
        const oldImagePath = path.join(process.cwd(), existingProfile.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Failed to delete old image:", err.message);
          }
        });
      }
    updateData.image = `/uploads/developers/${req.file.filename}`;
  }
  const updatedProfile = await Devteam.findByIdAndUpdate(id, updateData, {
    new: true,
  });
    if (!updatedProfile) {
      return res.status(404).json({ message: "Developer profile not found" });
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Error updating developer profile", error });
  }
};

export const deleteDeveloperProfiles = async (req, res) => {
  const { developerIds } = req.body;

  // Validation
  if (!developerIds || !Array.isArray(developerIds) || developerIds.length === 0) {
    return res.status(400).json({ message: "Invalid developer IDs provided" });
  }

  try {
    // Delete multiple developers
    const deleteResult = await Devteam.deleteMany({ 
      _id: { $in: developerIds } 
    });

    // Check for successful deletion
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ 
        message: "No developer profiles found to delete" 
      });
    }

    // Return success response with deletion details
    res.status(200).json({ 
      message: `Successfully deleted ${deleteResult.deletedCount} developer profile(s)`,
      deletedCount: deleteResult.deletedCount
    });
  } catch (error) {
    console.error('Error deleting developer profiles:', error);
    res.status(500).json({ 
      message: "Error deleting developer profiles", 
      error: error.message 
    });
  }
};

export const addNewDeveloper = async (req, res) => {
  try {
    const developerData = req.body;
    if (req.file) {
      developerData.image = `/uploads/developers/${req.file.filename}`;
    }
    const newDeveloper = new Devteam(developerData);
    const savedDeveloper = await newDeveloper.save();
    res.status(201).json(savedDeveloper);
  } catch (error) {
    res.status(500).json({ message: "Error creating developer profile", error });
  }
};