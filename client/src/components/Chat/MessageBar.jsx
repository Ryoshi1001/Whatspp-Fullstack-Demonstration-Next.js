import { reducerCases } from '@/context/constants';
import { useStateProvider } from '@/context/StateContext';
import { ADD_MESSAGE_ROUTE } from '@/utils/ApiRoutes';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { MdSend } from 'react-icons/md';

const MessageBar = () => {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (socket && socket.current) {
      socket.current.on('connect', () => {
        console.log('Connected to WebSocket');
      });

      socket.current.on('disconnect', () => {
        console.log('Disconnected from WebSocket');
      });
    }
  }, [socket]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.id,
        from: userInfo?.id, 
        message,
      });
  
      socket.current.emit('send-msg', {
        to: currentChatUser?.id, 
        from: userInfo?.id, 
        message: data.msg, 
      });
      console.log("Message sent:", data.msg);


      
      dispatch({
        type: reducerCases.ADD_MESSAGE,
        newMessage: {
          ...data.msg,
          fromSelf: true,
        },
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    const inputElement = document.querySelector('input[type="text"]');
    if (inputElement) {
      inputElement.addEventListener('focus', () => {
        if (socket && socket.current) {
          socket.current.emit('cursor-focus', { userId: userInfo.id });
        }
      });

      inputElement.addEventListener('blur', () => {
        if (socket && socket.current) {
          socket.current.emit('cursor-blur', { userId: userInfo.id });
        }
      });
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', () => {});
        inputElement.removeEventListener('blur', () => {});
      }
    };
  }, [userInfo]);
  

  return (
    <div className='bg-panel-header-background h-20 px-4 flex items-center justify-center gap-6 relative'>
      <div className="flex items-center justify-center gap-6">
        <BsEmojiSmile className='text-panel-header-icon cursor-pointer text-xl' title='Emoji'/>
        <ImAttachment className='text-panel-header-icon cursor-pointer text-xl' title='Attach File'/>
      </div>
      <div className='w-full rounded-lg h-10 flex items-center'>
        <input
          type="text"
          placeholder='Type a message'
          className='bg-input-background text-sm focus:outline-none text-white px-5 h-10 rounded-lg py-4 w-full'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>
      <div className='w-10 items-center justify-center'>
        <button onClick={sendMessage}>
          <MdSend className='text-panel-header-icon cursor-pointer text-xl' title='Send Message'/>
        </button>
      </div>
    </div>
  );
};

export default MessageBar;