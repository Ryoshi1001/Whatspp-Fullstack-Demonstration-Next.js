import Image from 'next/image'
import React from 'react'
import SearchBar from './Chatlist/SearchBar'
import List from './Chatlist/List'

const Empty = () => {
  return (
    <>
    <div className='w-full  border-l border-conversation-border bg-panel-header-background flex flex-col h-[100vh] border-b-4 border-b-icon-green items-center justify-center'>
      <Image src={"/whatsapp.gif"} alt='whatsapp drawing' width={300} height={300} priority={true} unoptimized/>
    </div>
    <SearchBar/>
    <List/>
    </>
  )
}

export default Empty