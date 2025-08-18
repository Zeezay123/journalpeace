import express from "express";
import { createFocus, getAllfocus, getFocus } from "../controllers/focus.controller.js";
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router();

// Create/Update Setting
router.post("/", verifyToken, createFocus);

// Get Setting by key
router.get("/:key", getFocus);

// Get all settings
router.get("/",verifyToken,getAllfocus);

export default router;
