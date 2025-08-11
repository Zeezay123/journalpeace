import express from 'express'
import {createCourse, updateCourse, deleteCourse, getCourse} from '../controllers/course.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router();

router.post("/create", verifyToken, createCourse);
router.get("/getcourse", getCourse);
router.put("/:courseId", verifyToken, updateCourse);
router.delete("/:courseId", verifyToken, deleteCourse);

export default router;