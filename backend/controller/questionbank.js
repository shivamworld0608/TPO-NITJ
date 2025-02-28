import QuestionBank from "../models/questionbank.js";
import JobProfile from "../models/jobprofile.js";


export const addQuestion = async (req, res) => {
    try {
      let { companyName, contributions } = req.body;
  
      if (typeof companyName !== 'string') {
        return res.status(400).json({ error: 'Invalid companyName: must be a string' });
      }
      companyName = companyName.trim().toLowerCase().replace(/\s+/g, ' ');
      const studentId = req.user.userId;
      let questionBank = await QuestionBank.findOne({ 
        companyName: { $regex: `^${companyName}$`, $options: 'i' } 
      });
  
      if (!questionBank) {
        questionBank = new QuestionBank({ companyName, contributions: [] });
      }
  
      let contributionObj = questionBank.contributions.find(
        (contrib) => contrib.studentId.toString() === studentId
      );
  
      if (!contributionObj) {
        contributionObj = { studentId, questions: [] };
        questionBank.contributions.push(contributionObj);
      }
  
      const contributionIndex = questionBank.contributions.findIndex(
        (contrib) => contrib.studentId.toString() === studentId
      );
  
      contributions.forEach(({ question, sourceLinks = [], answer, which_role }) => {
        contributionObj.questions.push({
          question: question.trim().replace(/\s+/g, ' '),
          sourceLinks,
          answer: answer.trim().replace(/\s+/g, ' '),
          which_role: which_role ? which_role.trim().replace(/\s+/g, ' ') : 'Not specified', // Handle the common role
        });
      });
  
      questionBank.contributions[contributionIndex] = contributionObj;
      questionBank.markModified('contributions');
  
      await questionBank.save();
  
      res.status(201).json({ message: 'Questions added successfully', questionBank });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add questions', message: error.message });
    }
  };

export const getQuestions = async (req, res) => {
    try {
      const questionBank = await QuestionBank.find().populate('contributions.studentId', 'name');
      let eligible = false;
      const studentId=req.user.userId;
      const jobs = await JobProfile.find({
          'Hiring_Workflow': {
              $elemMatch: {
                  step_type: 'Interview',
                  eligible_students: { $in: [studentId] },
              },
          },
      });
      if (jobs.length > 0) {
        eligible = true;
    }
      res.status(200).json({eligible,questionBank});
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch questions', message: error.message });
    }
  };

  export const getQuestionsByCompany = async (req, res) => {
    try {
      const { companyName } = req.params;
      const questionBank = await QuestionBank.findOne({ companyName }).populate('contributions.studentId','name');
  
      if (!questionBank) {
        return res.status(404).json({ message: 'No questions found for this company' });
      }
  
      res.status(200).json(questionBank);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch questions', message: error.message });
    }
  };