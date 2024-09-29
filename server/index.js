// https://www.youtube.com/watch?v=keYFkLycaDg 
// 4:10 mins
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'

//importing routes
import AuthRoutes from './routes/AuthRoute.js'
import MessageRoutes from './routes/MessageRoutes.js'

const app = express(); 

//more detailed cors
// // app.use(cors())
// const corsOptions = {
//   origin: 'http://localhost:3000', // assuming your React app runs on port 3000
//   credentials: true,
//   optionsSuccessStatus: 200
// };

app.use(cors());

//more detailed cors
// app.use(cors({
//   origin: 'http://localhost:3000', // or whatever your client's URL is
//   methods: ['GET', 'POST'],
//   credentials: true
// }));

app.use(express.json())

//use routes in app
//add routes for auth routes
app.use('/api/auth', AuthRoutes)
//add routes for messages
app.use('api/messages', MessageRoutes)

const PORT = process.env.PORT; 

const server = app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT:${PORT}`)
})

//maintaining sockets and users global
//maintain online offline of users here
global.onlineUsers = new Map()