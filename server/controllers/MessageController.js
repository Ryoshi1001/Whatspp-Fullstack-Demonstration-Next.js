//controller for adding a message

import getPrismaInstance from "../utils/PrismaClient.js";
import {renameSync} from 'fs'

//controller for adding messages
export const addMessage = async(req, res, next) => {
  try {
    const prisma = getPrismaInstance()
    const { message, to, from } = req.body; 

    if (!message || !from || !to) {
      return res.status(400).json({ error: "From, to and Message are required" });
    }

    const newMessage = await prisma.messages.create({
      data: {
        message, 
        sender: {connect:{id:parseInt(from)}}, 
        receiver: {connect: {id: parseInt(to)}}, 
        messageStatus: "sent",  
      },
      include: { sender: true, receiver: true }, 
    }); 

    return res.status(201).json({ msg: newMessage })
  } catch (error) {
    console.error("Error creating message:", error)
    return res.status(500).json({ error: error.message || "An error occurred while processing your request" });
  }
}

//controller for getting messages
export const getMessages = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance(); 
    const { from, to } = req.params; 
    //getting all messages with findMany() from prisma
    //using conditions Where and OR, senderId is "from" & "to" and receiverID is "to" and "from" so all messages back and forth between user and currentChatuser
    //Also order by ascending ID's
    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          {
            senderId: parseInt(from), 
            receiverId: parseInt(to), 
          }, 
          {
            senderId: parseInt(to), 
            receiverId: parseInt(from)
          }
        ]
      }, 
      orderBy: {
        id: "asc", 
      }
    })

    //array made checking and looping through messages from query: checking if status is not read and senderId is form "to" then mark message as "read"
    const unreadMessages = []; 
    messages.forEach = (message, index) => {
      if (
        message.messageStatus !== "read" && 
        message.senderId === parseInt(to)
      ) {
        messages[index].messageStatus = "read"; 
        unreadMessages.push(message.id)
      }
    }

    //updating messages to read from delivered or sent
    await prisma.messages.updateMany({
      where: {
        id: {in:unreadMessages}
      }, 
      data: {
        messageStatus: "read", 
      }, 
    })
    res.status(200).json({ messages })
  } catch (error) {
    console.log("getMessages Controller Error:", error); 
    next(error); 
  }
}


//controller for addingImageMessage: for sending images in text chat
export const addImageMessage = async (req, res, next) => {
  try {
    if(req.file) {
      const date = Date.now(); 
      let fileName = "uploads/images/" + date + req.file.originalname; 
      console.log(fileName, req.file.path)
      renameSync(req.file.path, fileName)
      const prisma = getPrismaInstance()
      const {from, to} = req.query; 

      if(from && to) {
        const message = await prisma.messages.create({
          data: {
            message: fileName, 
            sender: { connect: { id: parseInt(from) } }, 
            receiver: { connect: { id: parseInt(to) } }, 
            type: "image"
          }
        }); 
        return res.status(201).json({message})
      }
      return res.status(400).send("From, to is required.")
    }
    return res.status(400).send("Image is required")
  } catch (error) {
    console.error(error)
    next(error)
  }
}