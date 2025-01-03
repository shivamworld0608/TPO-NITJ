import FormTemplate from '../models/FormTemplate.js';
import Student from '../models/user_model/student.js';

// Create a new form template
export const createFormTemplate = async (req, res) => {
  try {
    const { title, jobId, recruiterId, fields } = req.body;
    const formTemplate = new FormTemplate({ title, jobId, recruiterId, fields });
    await formTemplate.save();
    res.status(201).json({ message: 'Form Template created successfully', formTemplate });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create form template', error: err.message });
  }
};

// Get a form template by ID
export const getFormTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const formTemplate = await FormTemplate.findById(id);
    if (!formTemplate) {
      return res.status(404).json({ message: 'Form Template not found' });
    }
    res.status(200).json(formTemplate);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching form template', error: err.message });
  }
};

export const getStudent = async (req, res) => {
    const { id } = req.params;
    try {
      const student = await Student.findById(id);
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json(student);
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ message: 'Server error while fetching student' });
    }
  };

// Update a form template (used by TPO for configuration)
export const updateFormTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { fields } = req.body;

    const formTemplate = await FormTemplate.findByIdAndUpdate(
      id,
      { fields },
      { new: true }
    );
    if (!formTemplate) {
      return res.status(404).json({ message: 'Form Template not found' });
    }
    res.status(200).json({ message: 'Form Template updated successfully', formTemplate });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update form template', error: err.message });
  }
};
