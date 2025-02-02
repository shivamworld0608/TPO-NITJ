import FormSubmission from '../models/FormSubmission.js';
import JobProfile from '../models/jobprofile.js';
import mongoose from 'mongoose';

// Fetch existing submission for a job and student
export const getSubmissionbystudent = async (req, res) => {
  try {
    const { jobId } = req.params;
    const studentId = req.user.userId; // Assuming user ID is available in req.user

    const submission = await FormSubmission.findOne({
      jobId: new mongoose.Types.ObjectId(jobId),
      studentId: new mongoose.Types.ObjectId(studentId),
    });
    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submission', error: err.message });
  }
};

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

export const withdrawApplication = async (req, res) => {
  try {
    console.log("hello");
    const studentId = req.user.userId;
    const { jobId } = req.body;
    console.log(jobId);

    // Delete the form submission
    const deletedSubmission = await FormSubmission.findOneAndDelete({ jobId, studentId });
    
    if (!deletedSubmission) {
      console.log("checking 2");
      return res.status(404).json({ message: 'Application not found' });
    }

    // Remove student from Applied_Students in JobProfile
    await JobProfile.findOneAndUpdate(
      { _id: jobId },
      { $pull: { Applied_Students: studentId } },
      { new: true }
    );
    // Remove student from eligible_students in Hiring_Workflow
    await JobProfile.findOneAndUpdate(
      {
        _id: jobId,
        "Hiring_Workflow.0": { $exists: true },
      },
      {
        $pull: { "Hiring_Workflow.0.eligible_students": studentId },
      },
      { new: true }
    );

    res.status(200).json({ message: 'Application withdrawn successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to withdraw application', error: err.message });
  }
};

export const editApplication = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { jobId, fields, resumeUrl } = req.body;

    // Find and update the form submission
    const updatedSubmission = await FormSubmission.findOneAndUpdate(
      { jobId, studentId },
      { fields, resumeUrl },
      { new: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ message: 'Application updated successfully', updatedSubmission });
  } catch (err) {
    res.status(500).json({ message: 'Failed to edit application', error: err.message });
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

     console.log(submissions);
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
        console.log(submissions);
        res.status(200).json(submissions);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ message: 'Failed to fetch form submissions.' });
      }
  }
  
  export const deleteFormSubmission = async (req, res) => {
    const { id } = req.params;
    try {
      const submission = await FormSubmission.findById(id);
      if (!submission) {
        return res.status(404).json({ message: 'Submission not found.' });
      }
      const { jobId, studentId } = submission;
      await FormSubmission.findByIdAndDelete(id);
      await JobProfile.findOneAndUpdate(
        { _id: jobId },
        { $pull: { Applied_Students: studentId } },
        { new: true }
      );
      await JobProfile.findOneAndUpdate(
        { _id: jobId, "Hiring_Workflow.0": { $exists: true } },
        { $pull: { "Hiring_Workflow.0.eligible_students": studentId } },
        { new: true }
      );
      res.status(200).json({ message: 'Submission deleted successfully.' });
    } catch (error) {
      console.error('Error deleting submission:', error);
      res.status(500).json({ message: 'Failed to delete submission.' });
    }
  };

  export const deleteAllFormSubmissions = async (req, res) => {
    const { jobId } = req.params;
  
    try {
      const submissions = await FormSubmission.find({ jobId });
      const studentIds = submissions.map(submission => submission.studentId);
      await FormSubmission.deleteMany({ jobId });
      await JobProfile.findOneAndUpdate(
        { _id: jobId },
        { $pull: { Applied_Students: { $in: studentIds } } },
        { new: true }
      );
      await JobProfile.findOneAndUpdate(
        { _id: jobId, "Hiring_Workflow.0": { $exists: true } },
        { $pull: { "Hiring_Workflow.0.eligible_students": { $in: studentIds } } },
        { new: true }
      );
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