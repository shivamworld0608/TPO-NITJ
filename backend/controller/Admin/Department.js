import Department from "../../models/user_model/department.js";

export const getAllDepartments = async (req, res) => {
  try {
    const DepartmentProfiles = await Department.find();
    res.status(200).json(DepartmentProfiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Department profiles", error });
  }
}

export const updateDepartmentProfile = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProfile = await Department.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedProfile) {
      return res.status(404).json({ message: "Department profile not found" });
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Error updating Department profile", error });
  }
};

export const deleteDepartmentProfiles = async (req, res) => {
    console.log("Deleting Department profiles...");
  const { DepartmentIds } = req.body;

  // Validation
  if (!DepartmentIds || !Array.isArray(DepartmentIds) || DepartmentIds.length === 0) {
    return res.status(400).json({ message: "Invalid Department IDs provided" });
  }

  try {
    //for any amount of delete
    const deleteResult = await Department.deleteMany({ 
      _id: { $in: DepartmentIds } 
    });

    //Checking for successful delete
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ 
        message: "No Department profiles found to delete" 
      });
    }

    //return success response with details of deletion
    res.status(200).json({ 
      message: `Successfully deleted ${deleteResult.deletedCount} Department profile(s)`,
      deletedCount: deleteResult.deletedCount
    });
  } catch (error) {
    console.error('Error deleting Department profiles:', error);
    res.status(500).json({ 
      message: "Error deleting Department profiles", 
      error: error.message 
    });
  }
};

export const addNewDepartment = async (req, res) => {
  try {
    //create a new Department document
    const newDepartment = new Department(req.body);

    //save the new Department to the database
    const savedDepartment = await newDepartment.save();

    //respond with the created student
    res.status(201).json(savedDepartment);
  } catch (error) {
    //handle validation errors or database errors
    if (error.name === 'ValidationError') {
      //if there are validation errors
      return res.status(400).json({ 
        message: "Invalid Department data", 
        errors: error.errors 
      });
    }

    //handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({ 
        message: "A Department with this identifier already exists" 
      });
    }

    //server error for other types of errors
    res.status(500).json({ 
      message: "Error creating new Department profile", 
      error: error.message 
    });
  }
};

export const getDepartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const DepartmentProfile = await Department.findById(id);
    if (!DepartmentProfile) {
      return res.status(404).json({ message: "Department profile not found" });
    }
    res.status(200).json(DepartmentProfile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Department profile", error });
  }
};
