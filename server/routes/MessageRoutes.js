import express from 'express'
import multer from 'multer'
import { addAudioMessage, addImageMessage, addMessage, getMessages } from '../controllers/MessageController.js'


const router = express.Router()

const uploadImage = multer({ dest: 'uploads/images'})
//upload for audio with multer
const upload = multer({ dest: "uploads/recordings"})

router.post('/add-message', addMessage)
//getMessages route
router.get('/get-messages/:from/:to', getMessages)

//route for adding image files from messageBar.jsx using photoPickerChange() and adding multer for file handling here next to router plus addImageMessage controller for route
router.post('/add-image-message', uploadImage.single("image"), addImageMessage)

//route for adding audio messages and sending from messageBar
router.post('/add-audio-message', upload.single("audio"), addAudioMessage)

export default router;     