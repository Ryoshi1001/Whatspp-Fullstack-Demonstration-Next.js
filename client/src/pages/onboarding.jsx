import Image from 'next/image'
import React from 'react'

const onboarding = () => {
  return (
    <div className='flex flex-col h-screen w-screen bg-panel-header-background justify-center items-center text-white'>
      <div className='flex items-center justify-center gap-2'>
        <Image
        src="/whatsapp.gif"
        width={300}
        height={300}
        alt='whatsapp logo animation'
        priority={true}
        />
        <span className='text-7xl'>Whatsapp</span>
      </div>
      <h2 className='text-2xl'>Create your profile</h2>
      <div className='flex gap-6 mt-6'>
        <div className='flex flex-col items-center justify-center mt-5 gap6'>
          
        </div>
      </div>
    </div>
  )
}

export default onboarding