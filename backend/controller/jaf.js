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
 
    res.status(400).json({
      message: 'Error creating Job Announcement Form',
      error: error.message
    });
  }
};

export const getjaf= async (req, res) => {
  try{
       const approved_jaf=await JobAnnouncementForm.find({approved_status:true});
       const notApproved_jaf=await JobAnnouncementForm.find({approved_status:false});
       res.status(200).json({approved:approved_jaf, notApproved:notApproved_jaf});
  }
  catch(error){
    res.status(400).json({message:'Error fetching Job Announcement Form',error:error.message});
  }
}

export const approveJAF = async (req, res) => {
  try {
 
    const { _id } = req.params;
 
    const approvedJAF = await JobAnnouncementForm.findByIdAndUpdate(
      _id,
      { approved_status: true },
      { new: true }
    );
    if (!approvedJAF) return res.status(404).json({ message: "JAF not found" });
    res.status(200).json({ message: "JAF approved successfully", approvedJAF });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const rejectJAF = async (req, res) => {
  try {
    const {_id } = req.params;
    const deletedJAF = await JobAnnouncementForm.findByIdAndDelete(_id);

    if (!deletedJAF) {
      return res.status(404).json({ message: "JAF not found" });
    }

    res.status(200).json({ message: "JAF application deleted successfully", deletedJAF });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateJAF = async (req, res) => {
  try {
    const { _id } = req.params;
    const jaf = await JobAnnouncementForm.findById(_id);
    if (!jaf) {
      return res.status(404).json({ success: false, message: 'JAF not found' });
    }
    const updatedJAF = await JobAnnouncementForm.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'JAF updated successfully', jaf: updatedJAF });
  } catch (error) {
    console.error('Error updating JAF:', error.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};