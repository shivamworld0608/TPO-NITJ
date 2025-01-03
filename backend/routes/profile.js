import express from 'express';
const router = express.Router();
import {sprofile,updatesProfile,handlesProfilePhoto} from '../controller/profile.js';
import upload from '../utils/multer.js';

router.get('/get',sprofile);
router.put('/update',updatesProfile);
router.put('/update-picture', upload.single("file"),handlesProfilePhoto);

export default router;