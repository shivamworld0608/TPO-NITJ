import AssessmentAttempt from "../../models/mock-assessment/assessmentAttempt.js";
import Assessment from "../../models/mock-assessment/assessmentSchema.js";

// Create Assessment
/* export const createAssessment = async (req, res) => {
    const { title, description, startTime, endTime, duration, questions } = req.body;
    try {
      const assessment = new Assessment({
        title,
        description,
        startTime,
        endTime,
        duration,
        questions,
        createdBy: req.user.userId
      });
      await assessment.save();
      res.status(201).json(assessment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
   */

  export const createAssessment = async (req, res) => {
    const { title, description, startTime, endTime, duration, questions } = req.body;
  
    // Validate question format
    for (const question of questions) {
      if (!question.functionName || !question.returnType || !Array.isArray(question.arguments)) {
        return res.status(400).json({ message: 'Invalid question format' });
      }
      for (const arg of question.arguments) {
        if (!arg.name || !arg.type) {
          return res.status(400).json({ message: 'Invalid argument format' });
        }
      }
    }
  
    try {
      const assessment = new Assessment({
        title,
        description,
        startTime,
        endTime,
        duration,
        questions,
        createdBy: req.user.userId
      });
      await assessment.save();
      res.status(201).json(assessment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get All Assessments (Professor)
export const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ createdBy: req.user.userId});
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Assessment Results
export const getAssessmentResults = async (req, res) => {
  try {
    const assessment=req.params.id;
    const attempts = await AssessmentAttempt.find({ assessment })
      .populate('student', 'name email')
      .sort({ totalScore: -1 });
    // Calculate ranks
    attempts.forEach((attempt, index) => {
      attempt.rank = index + 1;
      attempt.save();
    });
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};