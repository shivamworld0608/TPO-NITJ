import express from 'express';
const router = express.Router();
import {createIssue,getUserIssues,getAllIssues,resolveIssue,getUnresolvedIssues} from '../controller/reqhelp.js';

router.post('/create',createIssue);
router.get('/get-all-issue',getAllIssues);
router.get('/get-unresolved',getUnresolvedIssues);
router.get('/get-own-issue',getUserIssues);
router.put('/resolve/:issueId/:detailId',resolveIssue);


export default router;