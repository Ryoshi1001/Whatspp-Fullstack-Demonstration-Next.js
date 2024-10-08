import React, { useEffect, useRef, useState } from 'react';
import ChatList from './Chatlist/ChatList';
import Empty from './Empty';
import { useRouter } from 'next/router';
import { useStateProvider } from '@/context/StateContext';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { firebaseAuth } from '@/utils/FirebaseConfig';
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE, HOST } from '@/utils/ApiRoutes';
import { reducerCases } from '@/context/constants';
import Chat from './Chat/Chat';
import { io } from 'socket.io-client';
import SearchMessages from './Chat/SearchMessages';

const Main = () => {
  //checking for userInfo in Main first because undefined in nested ChatList: problem with loading avatar in child component. Using method from Firebase: onAuthStateChanged(firebaseAth, ) like a useEffect Hook for Firebase.
  const router = useRouter();
  const [{ userInfo, currentChatUser, messagesSearch }, dispatch] =
    useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [socketEvent, setSocketEvent] = useState(false);
  //ref for socket io
  const socket = useRef();

  useEffect(() => {
    if (redirectLogin) {
      router.push('/login');
    }
  }, [redirectLogin]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (currentUser) => {
        if (!currentUser) {
          setRedirectLogin(true);
        }

        if (!userInfo && currentUser?.email) {
          const { data } = await axios.post(CHECK_USER_ROUTE, {
            email: currentUser.email,
          });

          console.log(data);

          if (!data.status) {
            router.push('/login');
          }

          if (data.data) {
            const {
              id,
              name,
              email,
              profilePicture: profileImage,
              status,
            } = data.data;
            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: {
                id,
                name,
                email,
                profileImage,
                status,
              },
            });
          }
        }
      }
    );

    return () => unsubscribe();
  }, [userInfo, dispatch]);

  //useEffect when have userInfo: import io from socket.io.client
  //HOST from apiRoutes
  //store socket in reducers
  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        transports: ['websocket'],
      });
      socket.current.on('connect', () => {
        console.log('Socket connected:', socket.current.connected);
        socket.current.emit('add-user', userInfo.id);
      });
      socket.current.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
      dispatch({
        type: reducerCases.SET_SOCKET,
        socket,
      });
    }
  }, [userInfo]);

  //check if socket.current has value and is false
  // if (socket.current && !socket.current)

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on('msg-receive', (data) => {
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data,
            fromSelf: false,
          },
        });
      });
      setSocketEvent(true);
    }
  }, [socket.current, dispatch]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const {
          data: { messages },
        } = await axios.get(
          `${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`
        );
        dispatch({
          type: reducerCases.SET_MESSAGES,
          messages,
        });
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    if (currentChatUser?.id && userInfo?.id) {
      getMessages();
    }
  }, [currentChatUser]);

  return (
    <>
      <div className="grid grid-cols-main w-screen h-screen max-h-screen max-w-screen overflow-hidden">
        <ChatList />
        {currentChatUser ? (
          <div className={messagesSearch ? "grid grid-cols-2" : "grid-cols-2"}>
            <Chat />
            {
            messagesSearch && <SearchMessages/> 
            }
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default Main;
