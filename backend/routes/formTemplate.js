import express from 'express';
import {
  createFormTemplate,
  getFormTemplate,
  updateFormTemplate,
  getStudent
} from '../controller/template.js';
import {
  submitForm,
  getFormSubmissions,
  deleteFormSubmission
} from '../controller/formsubmission.js';

const router = express.Router();

// Form Template Routes
router.post('/form-templates', createFormTemplate); // Recruiter creates template
router.get('/form-templates/:jobId', getFormTemplate); // Fetch specific form template
router.put('/form-templates/:id', updateFormTemplate); // TPO configures auto-fill

router.get('/students', getStudent);

// Form Submission Routes
router.post('/form-submissions', submitForm); // Student submits form
router.get('/form-submissions/:jobId', getFormSubmissions);
router.delete('/form-submissions/:id', deleteFormSubmission);

export default router;
