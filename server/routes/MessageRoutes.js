import express from 'express'
import { addMessage, getMessages } from '../controllers/MessageController.js'


const router = express.Router()

router.post('/add-message', addMessage)
//getMessages route
router.get('/get-messages/:from/:to', getMessages)

export default router;     