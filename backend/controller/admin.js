//jobprofile
import JobProfile from "../models/jobprofile.js";
import Student from "../models/user_model/student.js";
import Recuiter from "../models/user_model/recuiter.js";


//for the job profile management
export const getAllJobProfiles = async (req, res) => {
  try {
 
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

  
//for student management
export const getAllStudents = async (req, res) => {
  try {
 
    const studentProfiles = await Student.find();
    res.status(200).json(studentProfiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student profiles", error });
  }
};

export const updateStudentProfile = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProfile = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedProfile) {
      return res.status(404).json({ message: "Student profile not found" });
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Error updating student profile", error });
  }
};

export const deleteStudentProfiles = async (req, res) => {
  const { studentIds } = req.body;

  // Validation
  if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
    return res.status(400).json({ message: "Invalid student IDs provided" });
  }

  try {
    //for any amount of delete
    const deleteResult = await Student.deleteMany({ 
      _id: { $in: studentIds } 
    });

    //Checking for successful delete
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ 
        message: "No student profiles found to delete" 
      });
    }

    //return success response with details of deletion
    res.status(200).json({ 
      message: `Successfully deleted ${deleteResult.deletedCount} student profile(s)`,
      deletedCount: deleteResult.deletedCount
    });
  } catch (error) {
    console.error('Error deleting student profiles:', error);
    res.status(500).json({ 
      message: "Error deleting student profiles", 
      error: error.message 
    });
  }
};

export const deactivateStudentProfiles = async (req, res) => {
  const studentId = req.params.id;
  const {deactivate} = req.body;

  // Validation
  if (!studentId|| studentId.length === 0) {
    return res.status(400).json({ message: "Invalid student ID provided" });
  }

  try {
    //for any amount of delete
    const deactivatedProfile = await Student.findByIdAndUpdate(studentId, 
      {account_deactivate:deactivate},
      {new:true}
    )

    //Checking for successful delete
    if (!deactivatedProfile) {
      return res.status(404).json({ 
        message: "No student profiles found to delete" 
      });
    }

    //return success response with details of deletion
    res.status(200).json({ 
      message: `Successfully deactivated ${deactivatedProfile}`
    });
  } catch (error) {
    console.error('Error deactivating student profiles:', error);
    res.status(500).json({ 
      message: "Error deactivating student profiles", 
      error: error.message 
    });
  }
};

export const addNewStudent = async (req, res) => {
  try {
    // Create a new student document using the request body
    const newStudent = new Student(req.body);

    // Save the new student to the database
    const savedStudent = await newStudent.save();

    // Respond with the created student and 201 (Created) status
    res.status(201).json(savedStudent);
  } catch (error) {
    // Handle validation errors or database errors
    if (error.name === 'ValidationError') {
      // If there are validation errors (e.g., required fields missing)
      return res.status(400).json({ 
        message: "Invalid student data", 
        errors: error.errors 
      });
    }

    // Handle duplicate key errors (if you have unique constraints)
    if (error.code === 11000) {
      return res.status(409).json({ 
        message: "A student with this identifier already exists" 
      });
    }

    // Generic server error for other types of errors
    res.status(500).json({ 
      message: "Error creating new student profile", 
      error: error.message 
    });
  }
};


//for recruiter management
export const getAllRecruiters = async (req, res) => {
  try {
 
    const recruiterProfiles = await Recuiter.find();
    res.status(200).json(recruiterProfiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student profiles", error });
  }
};

export const updateRecruiterProfile = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProfile = await Recuiter.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedProfile) {
      return res.status(404).json({ message: "Recruiter profile not found" });
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Error updating recruiter profile", error });
  }
};

export const deleteRecruiterProfiles = async (req, res) => {
  const { recruiterIds } = req.body;

  // Validation
  if (!recruiterIds || !Array.isArray(recruiterIds) || recruiterIds.length === 0) {
    return res.status(400).json({ message: "Invalid recruiter IDs provided" });
  }

  try {
    //for any amount of delete
    const deleteResult = await Recuiter.deleteMany({ 
      _id: { $in: recruiterIds } 
    });

    //Checking for successful delete
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ 
        message: "No recruiter profiles found to delete" 
      });
    }

    //return success response with details of deletion
    res.status(200).json({ 
      message: `Successfully deleted ${deleteResult.deletedCount} recruiter profile(s)`,
      deletedCount: deleteResult.deletedCount
    });
  } catch (error) {
    console.error('Error deleting recruiter profiles:', error);
    res.status(500).json({ 
      message: "Error deleting recruiter profiles", 
      error: error.message 
    });
  }
};

export const addNewRecruiter = async (req, res) => {
  try {
    //create a new recruiter document
    const newRecruiter = new Recuiter(req.body);

    //save the new recruiter to the database
    const savedRecruiter = await newRecruiter.save();

    //respond with the created student
    res.status(201).json(savedRecruiter);
  } catch (error) {
    //handle validation errors or database errors
    if (error.name === 'ValidationError') {
      //if there are validation errors
      return res.status(400).json({ 
        message: "Invalid recruiter data", 
        errors: error.errors 
      });
    }

    //handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({ 
        message: "A recruiter with this identifier already exists" 
      });
    }

    //server error for other types of errors
    res.status(500).json({ 
      message: "Error creating new recruiter profile", 
      error: error.message 
    });
  }
};