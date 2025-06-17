import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controller/Event.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;