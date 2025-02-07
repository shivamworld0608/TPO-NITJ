import express from "express";
import { getNotifications } from "../controller/notification.js";

const router = express.Router();

router.get("/", getNotifications);

export default router;