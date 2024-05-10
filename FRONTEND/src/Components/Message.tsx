import React from 'react'
import { useSelector } from 'react-redux'
function Message({messages} : any) {

  console.log('message from props',messages)
  const {message} = useSelector((state: any) => state.message)
  const {selecteduser} = useSelector((state: any) => state.selecteduser)

  console.log('message from hook',message)
  console.log('selected user for sending message',selecteduser)
  console.log('message sent by receiver',message)
  
  return (
    <>
    <div className={selecteduser?._id==messages.receiverid?'chat chat-start':'chat chat-end'}>
    <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src={selecteduser?.avatar} />
    </div>
  </div>
  <div className="chat-bubble">{messages.message}</div>
</div>
    </>
  )
}

export default Message