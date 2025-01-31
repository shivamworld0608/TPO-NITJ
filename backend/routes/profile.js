import express from 'express';
const router = express.Router();
import {sprofile,updatesProfile,handlesProfilePhoto,changepass} from '../controller/profile.js';
import upload from '../utils/multer.js';

router.get('/get',sprofile);
router.put('/update',updatesProfile);
router.post('/change-pass',changepass);
router.put('/update-picture', upload.single("file"),handlesProfilePhoto);

export default router;