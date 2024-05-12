// socket.js
import { io } from 'socket.io-client'

// Create a singleton instance of the socket
const socket = io('https://chat-backend-for-deploy.onrender.com')

export default socket
