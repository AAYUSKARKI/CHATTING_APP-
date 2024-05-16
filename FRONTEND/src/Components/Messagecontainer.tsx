import {useState} from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { MdOutlineCancel } from "react-icons/md";
import Messages from './Messages'
import socket from '../utils/socket'
import { setmessage } from '../Redux/Message'
import { IoCloudUploadOutline } from "react-icons/io5";

function Messagecontainer() {

  const dispatch = useDispatch()

  const {theme} = useSelector((state: any) => state.theme)

  const {user} = useSelector((state: any) => state.user)
  const {selecteduser} = useSelector((state: any) => state.selecteduser)
  const {message:messages} = useSelector((state: any) => state.message)
  const[message,setMessage]=useState('')
const[userTyping,setUserTyping]=useState('')
  const[file,setFile]=useState('')
  const[filePreview,setFilepreview]=useState('')

  const handleFile=(e:any)=>{
    setFile(e.target.files[0])
    const reader = new FileReader()
        reader.onloadend = () => {
            setFilepreview(reader.result as string)
        }

        reader.readAsDataURL(e.target.files[0])
  }

  const handleFocus=(e:any)=>{
    e.preventDefault()
    socket.emit('feedback',user.user.username)
    socket.on('typing',(data)=>{
      console.log(data,'is the data')
       setUserTyping(data)
    })
  }
  socket.on('typing',(data)=>{
    console.log(data,'is the data')
     setUserTyping(data)
  })
  const handleChange=(e:any)=>{
    setMessage(e.target.value)
  }

  console.log(userTyping,'is the user typing')

  const handleSubmit= async(e:any)=>{
    e.preventDefault()
    try {

      const formdata = new FormData()
      formdata.append('message',message)
      formdata.append('senderid',user.user._id)
      formdata.append('receiverid',selecteduser._id)
      formdata.append('file',file)

      console.log('receiver id is',selecteduser._id)
      console.log('sender id is',user.user._id)
      const res = await axios.post("https://chat-backend-for-deploy.onrender.com/api/v1/chats/createmessage", formdata)
      console.log('message sent response from server',res.data.data)
      dispatch(setmessage([...messages,res.data.data]))
      setMessage('')
      // toast.success(res.data.message)
    } catch (error: any) {
      console.log(error,'error')
      toast.error(error.message)
    }
  }
  return (
    <>{
      selecteduser?
    <div className={`${theme=='light'?'theme-light':'theme-dark'}`}>
      <div className='bg-green-700 flex justify-center items-center'>
        <h1 className='text-white text-2xl'>{selecteduser.username}</h1>
        {
          userTyping && <h1>{userTyping} is typing a message</h1>
        }
        <img src={selecteduser.avatar}  className=' avatar w-10 rounded-full' />
      </div>
    <div className='bg-slate-400 h-[450px] overflow-auto sm:w-[450px] '>
        <Messages/>
        {
                            filePreview ? 
                            <><div className='flex items-center justify-center'>
                            <div className='avatar w-24 h-24 rounded-md overflow-hidden flex items-center justify-center'>
                                <img src={filePreview} alt="Avatar Preview" className='w-full h-full object-cover' />
                            </div></div></> : null
                        }
        <form className='flex items-center justify-center sticky bottom-0' onSubmit={handleSubmit}>
            <label htmlFor="file" className='cursor-pointer'>
            {
                            filePreview ? 
                            <MdOutlineCancel className='text-red-500 text-4xl' onClick={() =>{setFilepreview("") ;setFile("")}}/> 
                            : <IoCloudUploadOutline className='text-blue-500 text-4xl' />
                        }
            <input type='file' id='file' onChange={handleFile} className='hidden'/>
            </label> 
            <input type='text' name='message' onFocus={handleFocus} onChange={handleChange} value={message} placeholder='message' className='p-2 border border-fuchsia-700 w-full'/>
            <button type='submit' className='p-2 border border-fuchsia-700 text-green-400 bg-red-600'>Send</button>
        </form>
    </div>
    </div>:
    <>
    <div className='flex items-center justify-center bg-slate-950 h-[400px] w-[250px] border border-red-700'>
    <h1 className='text-3xl text-white'>WELCOME {user.user.username}</h1>
    </div>
    </>
}
    </>
  )
}

export default Messagecontainer