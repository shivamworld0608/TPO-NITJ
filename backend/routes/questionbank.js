import express from 'express';
const router = express.Router();
import {addQuestion,getQuestionsByCompany, getQuestions} from '../controller/questionbank.js';

router.post('/add-question',addQuestion);
router.get('/get-question', getQuestions);
router.get('/get-question/:companyName',getQuestionsByCompany);

export default router;