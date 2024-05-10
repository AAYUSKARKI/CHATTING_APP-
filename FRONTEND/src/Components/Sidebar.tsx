import React from 'react'
import { useSelector } from 'react-redux'
import Otherusers from './Otherusers'
function Sidebar() {
  const {user} = useSelector((state:any)=>state.user)
  return (
    <div className='bg-slate-400 h-[450px] overflow-auto w-48 '>
        <Otherusers />
    </div>
  )
}

export default Sidebar