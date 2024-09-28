import React from 'react'
import Avatar from '../common/Avatar'
import { useStateProvider } from '@/context/StateContext';
import { BsFillChatLeftTextFill, BsThreeDotsVertical} from 'react-icons/bs'

const ChatListHeader = () => {
  const [{userInfo}, dispatch] = useStateProvider(); 
  console.log({userInfo})
  return (
    <div className='flex justify-between items-center h-16 px-4 py-3'>
      <div className='cursor-pointer'>
        <Avatar 
        type={"sm"} 
        image={userInfo?.profileImage}/>
      </div>
      <div className='flex gap-6'>
        <BsFillChatLeftTextFill
        className='text-panel-header-icon cursor-pointer text-xl'/>
        <>
        <BsThreeDotsVertical
        className='text-panel-header-icon cursor-pointer text-xl'/>
        </>
      </div>
    </div>
  )
}

export default ChatListHeader