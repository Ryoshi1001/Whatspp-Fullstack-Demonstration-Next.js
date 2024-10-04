import { useStateProvider } from '@/context/StateContext';
import CalculateTime from '@/utils/CalculateTime';
import React, { useEffect } from 'react';
import MessageStatus from '../common/MessageStatus';
import { reducerCases } from '@/context/constants';

const ChatContainer = () => {
  const [{ messages, currentChatUser, userInfo, socket }, dispatch] =
    useStateProvider();

    console.log("Rendered messages:", messages);
  useEffect(() => {
    if (socket.current) {
      const handleNewMessage = (data) => {
        console.log('Message received:', data);
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data.message,
            fromSelf: data.from === userInfo.id,
          },
        });
      };

      socket.current.on('msg-receive', handleNewMessage);

      return () => {
        socket.current.off('msg-receive', handleNewMessage);
      };
    }
  }, [socket, dispatch, userInfo]);

  return (
  <div className="w-full h-[80vh] relative flex-grow overflow-auto custom-scrollbar">
    <div className="bg-fixed bg-chat-background w-full h-full absolute left-0 top-0 -z-10 opacity-5"></div>

    <div className="flex w-full">
      <div className="flex flex-col justify-end w-full gap-1 overflow-auto mx-10 my-6 z-20 relative left-0 bottom-0">
        {messages.map((message) => (
          <div
            key={message.id} // Use message.id directly since it is present
            className={`${
              message.senderId === currentChatUser.id ? 'justify-start' : 'justify-end'
            } mt-2 z-10 opacity-95 relative flex`}
          >
            {message.type === 'text' && (
              <div
                className={`text-white px-2 py-[10px] text-sm rounded-md flex gap-2 items-end max-w-[45%] 
                ${
                  message.senderId === currentChatUser.id
                    ? 'bg-incoming-background'
                    : 'bg-outgoing-background'
                }`}
              >
                <span className="break-all">{message.message}</span>
                <div className="flex gap-1 items-end">
                  <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                    {CalculateTime(message.createdAt)}
                  </span>
                  {message.senderId === userInfo.id && (
                    <MessageStatus messageStatus={message.messageStatus} />
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default ChatContainer;
