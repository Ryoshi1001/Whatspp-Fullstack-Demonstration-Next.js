import React from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { FaMicrophone } from 'react-icons/fa'
import { ImAttachment } from 'react-icons/im'
import { MdSend } from 'react-icons/md'
const MessageBar = () => {
  return (
    <div
    className='bg-panel-header-background h-20 px-4 flex items-center justify-center gap-6 relative'>
      <>
      <div className="flex items-center justify-center gap-6">
        <BsEmojiSmile className='text-panel-header-icon cursor-pointer text-xl' title='Emoji'/>
        <ImAttachment className='text-panel-header-icon cursor-pointer text-xl' title='Attach File'/>
      </div>
      <div className='w-full rounded-lg h-10 flex items-center'>
        <input type="text" placeholder='Type a message' className='bg-input-background text-sm focus:outline-none text-white px-5 h-10 rounded-lg py-4 w-full' />
      </div>
      <div className='w-10 items-center justify-center'>
        <button>
          <MdSend className='text-panel-header-icon cursor-pointer text-xl' title='Send Message'/>
          {/* <FaMicrophone className='text-panel-header-icon cursor-pointer text-xl' title='Record'/> */}
        </button>

      </div>
      </>
    </div>
  )
}

export default MessageBar