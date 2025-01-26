import express from 'express';
const router = express.Router();
import {createIssue} from '../controller/reqhelp.js';

router.post('/create',createIssue);

export default router;