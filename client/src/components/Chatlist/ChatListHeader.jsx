import React from 'react'
import Avatar from '../common/Avatar'
import { useStateProvider } from '@/context/StateContext';
import { BsFillChatLeftTextFill, BsThreeDotsVertical} from 'react-icons/bs'
import axios from 'axios';
import { reducerCases } from '@/context/constants';

const ChatListHeader = () => {
  const [{userInfo}, dispatch] = useStateProvider(); 

  const handleAllContactsPage = async () => {
    dispatch({
      type: reducerCases.SET_ALL_CONTACTS_PAGE, 
    
    })
  }

  return (
    <div className='flex justify-between items-center h-16 px-4 py-3'>
      <div className='cursor-pointer'>
        <Avatar 
        type={"sm"} 
        image={userInfo?.profileImage}
        />
      </div>
      <div className='flex gap-6'>
        <BsFillChatLeftTextFill
        className='text-panel-header-icon cursor-pointer text-xl'
        title='New Chat'
        onClick={handleAllContactsPage}/>
        <>
        <BsThreeDotsVertical
        className='text-panel-header-icon cursor-pointer text-xl'
        title='Menu'/>
        </>
      </div>
    </div>
  )
}

export default ChatListHeader