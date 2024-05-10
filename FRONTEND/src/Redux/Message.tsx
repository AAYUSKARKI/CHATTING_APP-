import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: []
}

 const MessageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setmessage: (state, action) => {
            state.message = action.payload
        }
    }
 })

 export const {setmessage} = MessageSlice.actions

 export default MessageSlice.reducer