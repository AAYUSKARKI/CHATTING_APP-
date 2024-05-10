import { configureStore as ConfigureStore } from "@reduxjs/toolkit"
import UserReducer from './Userslice'
import Otheruser from './Otheruser'
import MessageReducer from './Message'
import selectedUser from './Selecteduser'
const store = ConfigureStore({
    reducer: {
        user: UserReducer,
        otheruser: Otheruser,
        message: MessageReducer,
        selecteduser: selectedUser
    }
})

export default store