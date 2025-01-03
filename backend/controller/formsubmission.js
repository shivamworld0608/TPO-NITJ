import FormSubmission from '../models/FormSubmission.js';

// Submit a form (by student)
export const submitForm = async (req, res) => {
  try {
    const { formTemplateId, studentId, fields } = req.body;
    console.log("Form Submission:", formTemplateId, studentId, fields);
    const formSubmission = new FormSubmission({
      formTemplateId,
      studentId,
      fields,
    
    });
  console.log("Form Submission:", formSubmission);
    await formSubmission.save();
    console.log("after saving");
    res.status(201).json({ message: 'Form submitted successfully', formSubmission });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit form', error: err.message });
  }
};


// Get Submissions Controller
export const getFormSubmissions = async (req, res) => {
    const { formTemplateId } = req.params;
    console.log("Form Template ID:", formTemplateId);
  
    if (!formTemplateId) {
      return res.status(400).json({ message: 'FormTemplateId is required.' });
    }
  
    try {
      const submissions = await FormSubmission.find({ formTemplateId })
        .populate('studentId', 'name email rollno department');
      res.status(200).json(submissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      res.status(500).json({ message: 'Failed to fetch form submissions.' });
    }
  };
  
  // Delete Submission Controller
  export const deleteFormSubmission = async (req, res) => {
    const { id } = req.params;
  
    try {
      const submission = await FormSubmission.findByIdAndDelete(id);
  
      if (!submission) {
        return res.status(404).json({ message: 'Submission not found.' });
      }
  
      res.status(200).json({ message: 'Submission deleted successfully.' });
    } catch (error) {
      console.error('Error deleting submission:', error);
      res.status(500).json({ message: 'Failed to delete submission.' });
    }
  };