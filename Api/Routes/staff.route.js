// routes/staff.routes.js
import express from "express";
import {
  getStaff,          // Get all staff
  getRoleSection,   // Get a specific staff section
  updateStaff,       // Update all staff (admin only)
  updateRoleSection
} from "../controllers/staff.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Get all staff
router.get("/", getStaff);

// Get a specific staff section (e.g., "vc", "teachers", etc.)
router.get("/:section", getRoleSection);

// Update all staff (admin only)
router.put("/", verifyToken, updateStaff);

// Update a specific staff section (admin only)
router.put("/:section", verifyToken, updateRoleSection);

export default router;
