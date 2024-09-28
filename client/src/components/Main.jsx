import React, { useEffect, useState } from 'react';
import ChatList from './Chatlist/ChatList';
import Empty from './Empty';
import { useRouter } from 'next/router';
import { useStateProvider } from '@/context/StateContext';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { firebaseAuth } from '@/utils/FirebaseConfig';
import { CHECK_USER_ROUTE } from '@/utils/ApiRoutes';
import { reducerCases } from '@/context/constants';
import Chat from './Chat/Chat';

const Main = () => {
  //checking for userInfo in Main first because undefined in nested ChatList: problem with loading avatar in child component. Using method from Firebase: onAuthStateChanged(firebaseAth, ) like a useEffect Hook for Firebase.
  const router = useRouter();
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [{ userInfo }, dispatch] = useStateProvider();

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

          if (!data.status) {
            router.push('/login');
          }
          console.log("cions",  {data} );

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

  return (
    <>
      <div className="grid grid-cols-main w-screen h-screen max-h-screen max-w-screen overflow-hidden">
        <ChatList />
        {/* <Empty /> */}
        <Chat/>
      </div>
    </>
  );
};

export default Main;
