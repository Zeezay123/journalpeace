import express from 'express';
import { signup } from '../controllers/signup.controller.js';

// create a router for signup-related routes
const router = express.Router();

router.post('/signup',signup)

export default router;