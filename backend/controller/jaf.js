 import JobAnnouncementForm from "../models/jaf";
export default createJobAnnouncementForm = async (req, res) => {
  try {
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