import express from 'express';
import { 
  createFeedback, 
  getAllFeedback, 
  getFeedbackByStudent,
  deleteFeedback 
} from '../controller/feedbackController.js';

const router = express.Router();

router.post('/', createFeedback);
router.get('/', getAllFeedback);
router.get('/student/:studentName', getFeedbackByStudent);
router.delete('/:id', deleteFeedback);

export default router;