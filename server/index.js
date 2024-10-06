// https://www.youtube.com/watch?v=keYFkLycaDg 
// 7:31 mins
// nextjs tailwind socket io firebase express nodejs prisma postgresql
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'

//importing routes
import AuthRoutes from './routes/AuthRoute.js'
import MessageRoutes from './routes/MessageRoutes.js'

const app = express(); 

app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:3000', // or whatever your client's URL is
//   methods: ['GET', 'POST'],
//   credentials: true
// }));

app.use(express.json())

//provides images form uploads pointing route to directory also audio
app.use("/uploads/images", express.static("uploads/images"))
app.use("/uploads/recordings", express.static("uploads/recordings"))

//use routes in app
//add routes for auth routes
app.use('/api/auth', AuthRoutes)
//add routes for messages
app.use('/api/messages', MessageRoutes)

const PORT = process.env.PORT || 3005; 

const server = app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT:${PORT}`)
})

//if hosting online change origin also for app 
const io = new Server(server, {
  cors: {
      origin: "http://localhost:3000", // Your React app's URL
      methods: ["GET", "POST"],
      credentials: true,
  },
});

//maintaining sockets and users global
//maintain online offline of users here
//each entry is only one time
global.onlineUsers = new Map()


//new connection request: this function runs
//gets socket, set socket in global.chatsocket
//.on socket user calls add-user gets userId from front end sets userId and socket.id into global onlineUsers
// io.on("connection", (socket) => {
//   global.chatSocket = socket; 
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id); 
//   })
//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to); 
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-receive", {
//         from: data.from, 
//         message: data.message, 
//       })
//       console.log("Message forwarded to recipient:", data);

//     }
//   })
// })

io.on("connection", (socket) => {
  console.log("New client connected");
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    console.log("User added:", userId);
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", {
        from: data.from,
        message: data.message,
      });
      console.log("Message forwarded to recipient:", data);
    } else {
      console.log("Recipient not found or offline:", data.to);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // Remove the disconnected user from onlineUsers
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        console.log("User removed from online list:", userId);
        break;
      }
    }
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});
