import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { setStatus } from './Redux/status'
import { useDispatch } from 'react-redux'
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'
import socket from './utils/socket'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    socket.on('connect', () => {
      dispatch(setStatus('online'))
      console.log('connected')
    })

    socket.on('disconnect', () => {
      dispatch(setStatus('offline'))
      console.log('disconnected')
    })
  }, [])
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/chat' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App