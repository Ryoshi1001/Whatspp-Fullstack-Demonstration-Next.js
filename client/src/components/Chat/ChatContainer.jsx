import { useStateProvider } from '@/context/StateContext'
import React from 'react'

const ChatContainer = () => {
  const [{messages, currentChatUser, userInfo}] = useStateProvider(); 
  return (
    <div className='w-full h-[80vh] relative flex-grow overflow-auto custom-scrollbar'>


      <div className='bg-fixed bg-chat-background w-full h-full absolute left-0 top-0 -z-10 opacity-5'
      ></div>

        <div className='flex w-full'>
          <div className='flex flex-col justify-end w-full gap-1 overflow-auto mx-10 my-6 z-20 relative left-0 bottom-0'>
            {messages.map((message, index) => {
              return (
               <div
               key={message.id}
               className={`flex ${message.senderId === currentChatUser.id ? "justify-start" : "justify-end"} mt-2 z-10 opacity-95 relative`}
               >
                {message.type === "text" && (
                  <div
                  className={`text-white px-2 py-[10px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${message.senderId === currentChatUser.id ? "bg-incoming-background" : "bg-outgoing-background"}`}
                  >
                    <span className='break-all'>{message.message}</span>
                  </div>
                )}
               </div>
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default ChatContainer