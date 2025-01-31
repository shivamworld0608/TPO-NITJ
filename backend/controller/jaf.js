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
      phdPrograms,
      requiredSkills,
      designations,
      jobLocation,
      specificLocations,
      bond,
      selectionProcess,
      additionalSelectionDetails,
      summerInternshipOpportunities,
      hrContacts,
      postalAddress,
      approved_status
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
      phdPrograms,
      requiredSkills,
      designations,
      jobLocation,
      specificLocations,
      bond,
      selectionProcess,
      additionalSelectionDetails,
      summerInternshipOpportunities,
      hrContacts,
      postalAddress,
      approved_status,
    });
      const savedJobAnnouncement = await newJobAnnouncement.save();
      res.status(201).json({
      message: 'Job Announcement Form created successfully',
      data: savedJobAnnouncement
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error creating Job Announcement Form',
      error: error.message
    });
  }
};

export const getjaf= async (req, res) => {
  try{
       const approved_jaf=await JobAnnouncementForm.find({approved_status:true});
       const notapproved_jaf=await JobAnnouncementForm.find({approved_status:false});
       res.status(200).json({approved_jaf, notapproved_jaf});
  }
  catch(error){
    res.status(400).json({message:'Error fetching Job Announcement Form',error:error.message});
  }
}