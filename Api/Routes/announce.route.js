// routes/announce.routes.js
import express from "express";
import {
  create,
  getAnnounce,
  updateAnnounce,
} from "../controllers/announce.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Get the announcement (public)
router.get("/", getAnnounce);

// Create new announcement (admin only)
router.post("/", verifyToken, create);

// Update the announcement (admin only)
router.put("/", verifyToken, updateAnnounce);

export default router;
