 import JobAnnouncementForm from "../models/jaf.js";

export const createJobAnnouncementForm = async (req, res) => {
  try {
    const recruiterId=req.user.userId;
    const {
      organizationName,
      websiteUrl,
      category, 
      sector,
      placementType,
      bTechPrograms,
      mTechPrograms,
      mbaProgramSpecializations,
      scienceStreamsSpecializations,
      phdProgramSpecializations,
      requiredSkills,
      designations,
      jobLocation,
      specificLocations,
      bond,
      selectionProcess,
      additionalSelectionDetails,
      summerInternshipOpportunities,
      hrContacts,
      postalAddress
    } = req.body;

    const newJobAnnouncement = new JobAnnouncementForm({
      recruiterId,
      organizationName,
      websiteUrl,
      category, 
      sector,
      placementType,
      bTechPrograms,
      mTechPrograms,
      mbaProgramSpecializations,
      scienceStreamsSpecializations,
      phdProgramSpecializations,
      requiredSkills,
      designations,
      jobLocation,
      specificLocations,
      bond,
      selectionProcess,
      additionalSelectionDetails,
      summerInternshipOpportunities,
      hrContacts,
      postalAddress
    });
      const savedJobAnnouncement = await newJobAnnouncement.save();
      res.status(201).json({
      message: 'Job Announcement Form created successfully',
      data: savedJobAnnouncement
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating Job Announcement Form',
      error: error.message
    });
  }
}; 