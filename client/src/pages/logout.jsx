import { reducerCases } from '@/context/constants';
import { useStateProvider } from '@/context/StateContext'
import { firebaseAuth } from '@/utils/FirebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Logout = () => {
  const [{socket, userInfo}, dispatch] = useStateProvider(); 
  const router = useRouter(); 

  useEffect(() => {
    socket.current.emit("signout", userInfo.id)
    dispatch({
      type: reducerCases.SET_USER_INFO, 
      userInfo: undefined, 
    }); 
    signOut(firebaseAuth); 
    router.push("/login")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return (
    <div className='bg-conversation-panel-background'>
    </div>
  )
}

export default Logout