import express from "express";
import { startCron, stopCron } from "../controllers/tasksController.js";

const router = express.Router();

router.post("/start", startCron);
router.post("/stop", stopCron);

export default router;
