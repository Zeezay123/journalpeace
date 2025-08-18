import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { create, getJournal, updateJournal, deleteJournal } from '../controllers/journals.controller.js'


const router = express.Router()


router.post('/create', verifyToken, create)
router.put('/updatejournal/:journalId/:userId', verifyToken, updateJournal)
router.get('/getjournals', verifyToken, getJournal)
router.delete('/deletejournal/:journalId/:userId', verifyToken, deleteJournal)


export default router