import express from 'express'
import { checkUser, onBoardUser } from '../controllers/AuthController.js';

const router = express.Router(); 

//router for checkUser
router.post('/check-user', checkUser); 
//router for onboarding
router.post('/onboard-user', onBoardUser)

export default router; 