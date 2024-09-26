// https://www.youtube.com/watch?v=keYFkLycaDg 
// 39 mins
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

//importing routes
import AuthRoutes from '../server/routes/AuthRoute.js'

dotenv.config()
const app = express(); 

app.use = cors(); 
app.use = express.json()

//use routes in app
app.use('/api/auth', AuthRoutes); 




const PORT = process.env.PORT; 

const server = app.listen((PORT) => {
  console.log(`SERVER RUNNING ON PORT:${PORT}`)
})