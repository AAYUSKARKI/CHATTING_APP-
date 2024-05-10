// socket.js
import { io } from 'socket.io-client'

// Create a singleton instance of the socket
const socket = io('http://localhost:7000')

export default socket
