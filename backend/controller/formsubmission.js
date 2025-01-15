import FormSubmission from '../models/FormSubmission.js';
import JobProfile from '../models/jobprofile.js';

// Submit a form (by student)
export const submitForm = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { jobId, fields, resumeUrl } = req.body;
    const formSubmission = new FormSubmission({
      jobId,
      studentId,
      fields,
      resumeUrl
    });
    await formSubmission.save();
    await JobProfile.findOneAndUpdate(
      { _id: jobId },
      { $addToSet: { Applied_Students: studentId } },
      { new: true }
    );
    await JobProfile.findOneAndUpdate(
      {
        _id: jobId,
        "Hiring_Workflow.0": { $exists: true },
      },
      {
        $addToSet: { "Hiring_Workflow.0.eligible_students": studentId },
      },
      { new: true }
    );
    res.status(201).json({ message: 'Form submitted successfully', formSubmission });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit form', error: err.message });
  }
};


// Get Submissions Controller
export const getFormSubmissions = async (req, res) => {
    const { jobId } = req.params;
  
    if (!jobId) {
      return res.status(400).json({ message: 'jobId is required.' });
    }
  
    try {
      const submissions = await FormSubmission.find({ jobId })
        .populate('studentId', 'name email rollno department');
      res.status(200).json(submissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      res.status(500).json({ message: 'Failed to fetch form submissions.' });
    }
  };

  export const getFormSubmissionstorecruiter = async (req, res) => {
    const { jobId } = req.params;
      try {
        const submissions = await FormSubmission.find({ jobId, visible: true })
        .populate('studentId', 'name email rollno department');
        res.status(200).json(submissions);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ message: 'Failed to fetch form submissions.' });
      }
  }
  
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

  export const deleteAllFormSubmissions = async (req, res) => {
    try {
      await FormSubmission.deleteMany({jobId: req.params.jobId});
      res.status(200).json({ message: 'All form submissions deleted successfully.' });
    } catch (error) {
      console.error('Error deleting form submissions:', error);
      res.status(500).json({ message: 'Failed to delete form submissions.' });
    }
  };


  export const makeVisible = async (req, res) => {
    const { jobId } = req.params;
    try {
      const updatedSubmissions = await FormSubmission.updateMany(
        { jobId },
        { $set: { visible: true } }
      );
      res.status(200).json(updatedSubmissions);
    } catch (error) {
      console.error('Error making form submissions visible:', error);
      res.status(500).json({ message: 'Failed to make form submissions visible.' });
    }
  };