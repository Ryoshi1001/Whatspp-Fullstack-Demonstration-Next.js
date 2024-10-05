import express from 'express'
import multer from 'multer'
import { addImageMessage, addMessage, getMessages } from '../controllers/MessageController.js'


const router = express.Router()

const uploadImage = multer({ dest: 'uploads/images'})

router.post('/add-message', addMessage)
//getMessages route
router.get('/get-messages/:from/:to', getMessages)

//route for adding image files from messageBar.jsx using photoPickerChange() and adding multer for file handling here next to router plus addImageMessage controller for route
router.post('/add-image-message', uploadImage.single("image"), addImageMessage)

export default router;     