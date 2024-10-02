// https://www.youtube.com/watch?v=keYFkLycaDg 
// 5:22 mins
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'

//importing routes
import AuthRoutes from './routes/AuthRoute.js'
import MessageRoutes from './routes/MessageRoutes.js'
import { Server } from 'socket.io'

const app = express(); 

// app.use(cors());


app.use(cors({
  origin: 'http://localhost:3000', // or whatever your client's URL is
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json())

//use routes in app
//add routes for auth routes
app.use('/api/auth', AuthRoutes)
//add routes for messages
app.use('/api/messages', MessageRoutes)

const PORT = process.env.PORT; 

const server = app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT:${PORT}`)
})

//if hosting online change origin also for app 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
  }, 
})

//maintaining sockets and users global
//maintain online offline of users here
//each entry is only one time
global.onlineUsers = new Map()

//new connection request: this function runs
//gets socket, set socket in global.chatsocket
//.on socket user calls add-user gets userId from front end sets userId and socket.id into global onlineUsers
io.on("connection", (socket) => {
  global.chatSocket = socket; 
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id); 
  })
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to); 
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-received", {
        from: data.from, 
        message: data.message, 
      })
    }
  })
})

