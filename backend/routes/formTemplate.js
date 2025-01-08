import express from 'express';
import {
  checkapplicationformtemplateexists,
  createFormTemplate,
  deleteFormTemplate,
  getFormTemplate,
  updateFormTemplate,
  getStudent
} from '../controller/template.js';
import {
  submitForm,
  getFormSubmissions,
  getFormSubmissionstorecruiter,
  deleteFormSubmission,
  deleteAllFormSubmissions,
  makeVisible
} from '../controller/formsubmission.js';

const router = express.Router();

// for recruiter and recruiter
router.get('/check-aft-exist/:jobId',checkapplicationformtemplateexists);
router.post('/form-templates', createFormTemplate); // Recruiter and tpo creates template
router.put('/delete-form-template/:jobId', deleteFormTemplate);
router.put('/form-templates/:jobId', updateFormTemplate); // TPO configures auto-fill


// for student
router.get('/form-templates/:jobId', getFormTemplate); // Fetch specific form template
router.get('/students', getStudent);
router.post('/form-submissions', submitForm);


//professor form template edit, delete, create


//professor form submission
router.get('/form-submissions/:jobId', getFormSubmissions);
router.delete('/form-submissions/:id', deleteFormSubmission);
router.delete('/form-submissions/delete-all/:jobId', deleteAllFormSubmissions);
router.patch('/form-submissions/make-visible/:jobId', makeVisible);

//recruiter form submission
router.get('/form-submissions/recruiter/:jobId', getFormSubmissionstorecruiter);


export default router;
