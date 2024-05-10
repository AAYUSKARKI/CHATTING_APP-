import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'
import socket from './utils/socket'

const App = () => {

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
    })
  }, [])
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App