import FormTemplate from '../models/FormTemplate.js';
import FormSubmission from '../models/FormSubmission.js';
import Student from '../models/user_model/student.js';

export const checkapplicationformtemplateexists = async (req, res) => {
  try {
    const { jobId } = req.params;
    const formTemplate = await FormTemplate.findOne({ jobId });
    if (!formTemplate) {
      return res.status(404).json({exist:false, message: 'Form Template not found' });
    }
    res.status(200).json({exist:true, message: 'Form Template exists', formTemplate });
  } catch (err) {
    res.status(500).json({ message: 'Error checking form template', error: err.message });
  }
}

export const createFormTemplate = async (req, res) => {
  try {
    const { title, jobId, fields } = req.body;
    const formTemplate = new FormTemplate({ title, jobId, fields });
    await formTemplate.save();
    res.status(201).json({ message: 'Form Template created successfully', formTemplate });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create form template', error: err.message });
  }
};

export const deleteFormTemplate = async (req, res) => {
  try {
    const { jobId } = req.params;
    const deletedFormTemplate = await FormTemplate.findOneAndDelete(jobId);
    if (!deletedFormTemplate) {
      return res.status(404).json({ message: 'Form Template not found' });
    }
    res.status(200).json({ message: 'Form Template deleted successfully', deletedFormTemplate });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete form template', error: err.message });
  }
};

/* export const updateFormTemplate = async (req, res) => {
  try {
    const { jobId } = req.params;
    const {title, fields } = req.body;
 
    const formTemplate = await FormTemplate.findOneAndUpdate(
      { jobId },
      { title,fields },
      { new: true }
    );
 
    if (!formTemplate) {
      return res.status(404).json({ message: 'Form Template not found' });
    }
    res.status(200).json({ message: 'Form Template updated successfully', formTemplate });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update form template', error: err.message });
  }
}; */

export const updateFormTemplate = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { title, fields } = req.body;
    const existingFormTemplate = await FormTemplate.findOne({ jobId });

    if (!existingFormTemplate) {
      return res.status(404).json({ message: 'Form Template not found' });
    }
    const updatedFormTemplate = await FormTemplate.findOneAndUpdate(
      { jobId },
      { title, fields },
      { new: true }
    );
    const oldFields = existingFormTemplate.fields;
    const newFields = updatedFormTemplate.fields;

    const fieldNameChanges = [];

    oldFields.forEach((oldField, index) => {
      const newField = newFields[index];
      if (oldField.fieldName !== newField.fieldName) {
        fieldNameChanges.push({
          oldFieldName: oldField.fieldName,
          newFieldName: newField.fieldName
        });
      }
    });

    if (fieldNameChanges.length > 0) {
      for (const change of fieldNameChanges) {
        await FormSubmission.updateMany(
          { jobId, 'fields.fieldName': change.oldFieldName },
          { $set: { 'fields.$.fieldName': change.newFieldName } }
        );
      }
    }
    res.status(200).json({ message: 'Form Template updated successfully', formTemplate: updatedFormTemplate });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update form template', error: err.message });
  }
};

// Get a form template by ID
export const getFormTemplate = async (req, res) => {
  try {
    const { jobId } = req.params;
    const formTemplate = await FormTemplate.findOne({ jobId });
    if (!formTemplate) {
      return res.status(404).json({ message: 'Form Template not found' });
    }
    res.status(200).json(formTemplate);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching form template', error: err.message });
  }
};







//I will change its directory later
export const getStudent = async (req, res) => {
    const _id=req.user.userId
    try {
      const student = await Student.findById(_id);
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json(student);
    } catch (error) {
      console.error('Error fetching student:', error);
      res.status(500).json({ message: 'Server error while fetching student' });
    }
  };


