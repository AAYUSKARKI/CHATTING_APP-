import {useState} from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import Messages from './Messages'
import { setmessage } from '../Redux/Message'

function Messagecontainer() {

  const dispatch = useDispatch()

  const {user} = useSelector((state: any) => state.user)
  const {selecteduser} = useSelector((state: any) => state.selecteduser)
  const {message:messages} = useSelector((state: any) => state.message)
  const[message,setMessage]=useState()

  const handleChange=(e:any)=>{
    setMessage(e.target.value)
  }

  const handleSubmit= async(e:any)=>{
    e.preventDefault()
    try {
      console.log('receiver id is',selecteduser._id)
      console.log('sender id is',user.user._id)
      const res = await axios.post("http://localhost:7000/api/v1/chats/createmessage",{
        message,
        senderid:user.user._id,
        receiverid:selecteduser._id
      })
      console.log(res.data.data,'message sent response from server') 
      dispatch(setmessage([...messages,res.data.data]))
      toast.success(res.data.message)
    } catch (error: any) {
      console.log(error,'error')
      toast.error(error.message)
    }
  }
  return (
    <>
    <div className='bg-slate-400 h-[450px] overflow-auto w-full '>
        <Messages/>
        <form className='flex items-center justify-center sticky bottom-0' onSubmit={handleSubmit}>
            <input type='text' onChange={handleChange} value={message} placeholder='message' className='p-2 border border-fuchsia-700 w-full'/>
            <button type='submit' className='p-2 border border-fuchsia-700 text-green-400 bg-red-600'>Send</button>
        </form>
    </div>
    </>
  )
}

export default Messagecontainer