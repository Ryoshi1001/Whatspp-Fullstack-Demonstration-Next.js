import { PrismaClient } from "@prisma/client"

//usable prisma instance: to check db for email? in login? 

let prismaInstance = null; 

function getPrismaInstance() {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient()
  }
  return prismaInstance; 
}

export default getPrismaInstance; 