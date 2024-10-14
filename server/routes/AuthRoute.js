import express from 'express'
import { checkUser, generateToken, getAllUsers, onBoardUser } from '../controllers/AuthController.js';

const router = express.Router(); 

//router for checkUser
router.post('/check-user', checkUser); 
//router for onboarding
router.post('/onboard-user', onBoardUser)
//router for getting all users in ChatContainer
router.get('/get-contacts', getAllUsers)

//route for tokens with ZegoCloud
router.get("/generate-token/:userId", generateToken)

export default router; 