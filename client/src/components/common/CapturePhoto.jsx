import React, { useEffect, useRef } from 'react'
import { IoClose } from 'react-icons/io5';


function CapturePhoto({ setImage, hide }) {
  const videoRef = useRef(null); 

  //when capturePhoto component is loaded
  useEffect(() => {
    let stream; 
    //starting camera by navigator.mediaDevices.getUserMedia() setting live video feed into the videoRef: which can be the <video/> element in the return below for this component
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true, 
          audio: false, 
        })
        videoRef.current.srcObject=stream; 
      } catch (error) {
        console.error("Error getting media device", error)
      }
    }
    startCamera(); 
    //return: stops the camera when component is unmounted
    return () => {
      stream?.getTracks().forEach((track) => track.stop())
    }; 
  }, []); 

  //onclick: gets current video and takes screenshot and saves it into a canvas element and convert the image in base64 and convert the image into a DataURL 
  const capturePhoto = () => {
    const canvas = document.createElement("canvas")
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0, 300, 150); 
    setImage(canvas.toDataURL("image/jpeg"))
    hide(false)
  }

  return (
    <div
    className='absolute  h-fit w-3/4 left-auto right-auto top-auto bottom-auto sm:absolute sm:h-4/6 sm:w-2/6 sm:top-1/4 bg-gray-900 gap-3 rounded-lg flex justify-center items-center pt-2
    '
    >
      <div className='flex flex-col w-full gap-4 justify-center items-center'>
      <div
          className="pt-2 pr-2 cursor-pointer flex flex-col justify-center"
          onClick={() => hide(false)}
        >
          <IoClose w={10} h={10} className="cursor-pointer" />
        </div>
        <div className='flex justify-center'>
          <video src="" id='video' width={400} autoPlay ref={videoRef}></video>
        </div>
        <button className='h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light p-2 mb-10'
        onClick={capturePhoto}
        ></button>
      </div>
    </div>
  )
}

export default CapturePhoto