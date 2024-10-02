//controller for adding a message

import getPrismaInstance from "../utils/PrismaClient.js";

//controller for adding messages
export const addMessage = async(req, res, next) => {
  try {
    const prisma = getPrismaInstance()
    //get message
    const { message, to, from } = req.body; 
    //check if user is online, if user online messageStatus: delivered not sent. 
    const getUser = onlineUsers.get(to); 

    if (message && from && to) {
      const newMessage = await prisma.messages.create({
        data: {
          message, 
          sender: {connect:{id:parseInt(from)}}, 
          receiver: {connect: {id: parseInt(to)}}, 
          //ticks for showing delivered or sent depending on if user is online in chat component
          messageStatus: getUser ? "delivered" : "sent",  
        },
        include: { sender: true, receiver: true }, 
      }); 
      return res.status(201).send({ msg: newMessage })
    }
    return res.status(400).send("From, to and Message is required")
  } catch (error) {
    next(error)
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