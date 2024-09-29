//controller for adding a message

import getPrismaInstance from "../utils/PrismaClient.js";

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