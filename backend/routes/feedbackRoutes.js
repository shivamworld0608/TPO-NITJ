import express from 'express';
import { 
  createFeedback, 
  updateFeedback,
  getFeedback,
  getAllFeedback, 
  getFeedbackByStudent,
  deleteFeedback 
} from '../controller/feedbackController.js';

const router = express.Router();

router.post('/', createFeedback);
router.put('/', updateFeedback);
router.get('/get', getFeedback);
router.get('/', getAllFeedback);
router.get('/student/:studentName', getFeedbackByStudent);
router.delete('/:id', deleteFeedback);

export default router;