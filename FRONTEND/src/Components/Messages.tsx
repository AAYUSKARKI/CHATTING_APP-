import useGetmessage from '../Hooks/useGetmessage'
import { setmessage } from '../Redux/Message'
import socket from '../utils/socket'
import Message from './Message'
import { useSelector, useDispatch } from 'react-redux'
import Tone from '../../public/tone.mp3'
import { useEffect } from 'react'
function Messages() {

  const dispatch = useDispatch()

  const audio = new Audio(Tone)
  useGetmessage()

  
  const {message} = useSelector((state: any) => state.message)
  socket.on("new-message", (data) => {
    console.log(data,'socket data from backend')
    dispatch(setmessage([...message, data]))
    setTimeout(() => {
      audio.play()
    }, 5000);
})
useEffect(() => {
  audio.play();
}, [audio]);
  console.log('message for mapping',message)
  return (
    <>
    {message?.map((message:any)=>(
        <Message key={message._id} messages={message}/>
    ))}
    </>
  )
}

export default Messages