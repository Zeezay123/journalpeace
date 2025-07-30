import express from 'express';
import { google,signup,signin} from '../controllers/signup.controller.js';



// create a router for signup-related routes
const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google);




export default router;