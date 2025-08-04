import express from 'express';
import { google, signup, signin } from '../controllers/signup.controller.js';

// Authentication routes - Base URL: /api/auth
const router = express.Router();

// User registration
router.post('/signup', signup)

// User login
router.post('/signin', signin)

// Google OAuth authentication
router.post('/google', google);

export default router;
