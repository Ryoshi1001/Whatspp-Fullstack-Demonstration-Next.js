import express, { Router } from 'express'
import { checkUser } from '../controllers/AuthController.js';

const router = Router(); 

router.get('/check-user', checkUser); 

export default router; 