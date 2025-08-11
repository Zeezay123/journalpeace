import express from 'express'
import {updateFaculty, createFaculty, deleteFaculty, getFaculty} from '../controllers/faculty.controller.js'
import { verifyToken } from '../utils/verifyUser.js'


const router = express.Router()

//getFaculty

router.post('/create', verifyToken, createFaculty)
router.get('/getfaculty', getFaculty)

router.delete('/deletefaculty/:facultyId/:userId', verifyToken, deleteFaculty)
router.put('/updatefaculty/:facultyId/:userId', verifyToken, updateFaculty)

export default router;