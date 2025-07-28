import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();

// create a router for user-related routes 

router.get('/test', test )

export default router;